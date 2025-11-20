import { useEffect, useRef, useState } from 'react';
import { useTuningSettings } from './useTuningSettings';
import { useAudioSettings } from './useAudioSettings';

export interface AudioAnalysisResult {
  frequency: number;
  note: string;
  octave: number;
  cents: number;
  isActive: boolean;
}

export interface AudioAnalysisReturn extends AudioAnalysisResult {
  detectedStringIndex: number | null;
  start: () => Promise<void>;
  stop: () => void;
}

// Note frequencies for standard tuning (A4 = 440Hz)
const noteFrequencies = [
  { note: 'C', frequency: 261.63 },
  { note: 'C#', frequency: 277.18 },
  { note: 'D', frequency: 293.66 },
  { note: 'D#', frequency: 311.13 },
  { note: 'E', frequency: 329.63 },
  { note: 'F', frequency: 349.23 },
  { note: 'F#', frequency: 369.99 },
  { note: 'G', frequency: 392.00 },
  { note: 'G#', frequency: 415.30 },
  { note: 'A', frequency: 440.00 },
  { note: 'A#', frequency: 466.16 },
  { note: 'B', frequency: 493.88 },
];

// Autocorrelation algorithm for pitch detection
function autoCorrelate(buffer: Float32Array, sampleRate: number, noiseThreshold: number): number {
  const SIZE = buffer.length;
  const rms = Math.sqrt(buffer.reduce((sum, val) => sum + val * val, 0) / SIZE);

  // If signal is too quiet, return -1
  if (rms < noiseThreshold) return -1;

  let r1 = 0;
  let r2 = SIZE - 1;
  const threshold = 0.2;

  // Trim silence from beginning and end
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      r1 = i;
      break;
    }
  }

  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      r2 = SIZE - i;
      break;
    }
  }

  const trimmedBuffer = buffer.slice(r1, r2);
  const c = new Array(trimmedBuffer.length).fill(0);

  // Autocorrelation
  for (let i = 0; i < trimmedBuffer.length; i++) {
    for (let j = 0; j < trimmedBuffer.length - i; j++) {
      c[i] = c[i] + trimmedBuffer[j] * trimmedBuffer[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;

  let maxval = -1;
  let maxpos = -1;

  for (let i = d; i < trimmedBuffer.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;

  // Parabolic interpolation for better accuracy
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];

  const a = (x1 - 2 * x2 + x3) / 2;
  const b = (x3 - x1) / 2;

  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
}

function frequencyToNote(frequency: number): { note: string; octave: number; cents: number } {
  const A4 = 440;
  const semitoneRatio = Math.pow(2, 1 / 12);

  // Calculate how many semitones from A4
  const semitonesFromA4 = Math.round(12 * Math.log2(frequency / A4));

  // Get the exact note
  const noteIndex = (9 + semitonesFromA4) % 12; // A4 is index 9
  const octave = 4 + Math.floor((9 + semitonesFromA4) / 12);

  const exactFrequency = A4 * Math.pow(semitoneRatio, semitonesFromA4);
  const cents = Math.round(1200 * Math.log2(frequency / exactFrequency));

  return {
    note: noteFrequencies[noteIndex].note,
    octave,
    cents
  };
}

export function useAudioAnalysis(): AudioAnalysisReturn {
  const { getCurrentTuning, addTuningHistory } = useTuningSettings();
  const { settings } = useAudioSettings();
  const [result, setResult] = useState<AudioAnalysisResult>({
    frequency: 0,
    note: '',
    octave: 0,
    cents: 0,
    isActive: false
  });
  const [detectedStringIndex, setDetectedStringIndex] = useState<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null);

  const initAudio = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
          deviceId: settings.deviceId !== 'default' ? { exact: settings.deviceId } : undefined
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      gainNodeRef.current = audioContextRef.current.createGain();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current.fftSize = 4096;
      analyserRef.current.smoothingTimeConstant = 0.8;

      // Apply sensitivity
      gainNodeRef.current.gain.value = settings.sensitivity;

      // Connect: Mic -> Gain -> Analyser
      microphoneRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyserRef.current);

      setResult(prev => ({ ...prev, isActive: true }));
      startAnalysis();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setResult(prev => ({ ...prev, isActive: false }));
    }
  };

  // Update gain when sensitivity changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = settings.sensitivity;
    }
  }, [settings.sensitivity]);

  // Restart audio if deviceId changes and we are active
  useEffect(() => {
    if (result.isActive && audioContextRef.current) {
      stopAnalysis();
      initAudio();
    }
  }, [settings.deviceId]);

  const startAnalysis = () => {
    const analyzeAudio = () => {
      if (!analyserRef.current || !audioContextRef.current) return;

      const bufferLength = analyserRef.current.fftSize;
      const buffer = new Float32Array(bufferLength);
      analyserRef.current.getFloatTimeDomainData(buffer);

      const frequency = autoCorrelate(buffer, audioContextRef.current.sampleRate, settings.noiseThreshold);

      if (frequency > 50 && frequency < 2000) {
        const noteData = frequencyToNote(frequency);

        // Auto-detect string based on current tuning
        const currentTuning = getCurrentTuning();
        let stringIndex = null;

        if (currentTuning) {
          const distances = currentTuning.notes.map((tuningNote, index) => ({
            index,
            distance: Math.abs(frequency - tuningNote.frequency)
          }));

          const closest = distances.reduce((min, curr) =>
            curr.distance < min.distance ? curr : min
          );

          // Only consider it a match if within reasonable range (within 100 cents)
          const cents = Math.abs(1200 * Math.log2(frequency / currentTuning.notes[closest.index].frequency));
          if (cents < 100) {
            stringIndex = closest.index;

            // Add to history if accuracy is reasonable and string detection is stable
            if (Math.abs(noteData.cents) < 50 && stringIndex === detectedStringIndex) {
              addTuningHistory({
                stringIndex,
                targetNote: currentTuning.notes[stringIndex].note,
                accuracy: Math.abs(noteData.cents)
              });
            }
          }
        }

        setDetectedStringIndex(stringIndex);
        setResult({
          frequency: Math.round(frequency * 100) / 100,
          note: noteData.note,
          octave: noteData.octave,
          cents: noteData.cents,
          isActive: true
        });
      }

      animationFrameRef.current = requestAnimationFrame(analyzeAudio);
    };

    analyzeAudio();
  };

  const stopAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    setResult(prev => ({ ...prev, isActive: false }));
  };

  useEffect(() => {
    return () => {
      stopAnalysis();
    };
  }, []);

  return {
    ...result,
    detectedStringIndex,
    start: initAudio,
    stop: stopAnalysis
  };
}