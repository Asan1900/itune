export interface TuningNote {
  note: string;
  octave: number;
  frequency: number;
}

export type InstrumentType = 'guitar' | 'guitar-12' | 'ukulele' | 'mandolin' | 'banjo';

export interface Tuning {
  id: string;
  name: string;
  notes: TuningNote[];
  description?: string;
  instrument: InstrumentType;
  stringCount: number;
}

export interface TuningHistory {
  stringIndex: number;
  targetNote: string;
  accuracy: number;
  timestamp: number;
}

export interface UserSettings {
  selectedTuningId: string;
  selectedInstrument: InstrumentType;
  theme: 'dark' | 'retro' | 'amoled' | 'neon' | 'forest' | 'sunset' | 'ocean' | 'vintage';
  customTunings: Tuning[];
  tuningHistory: TuningHistory[];
}

export const PRESET_TUNINGS: Tuning[] = [
  // Гитара 6-струнная
  {
    id: 'standard-e',
    name: 'Standard E',
    description: 'Стандартный строй (E A D G B E)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'E', octave: 2, frequency: 82.41 },
      { note: 'A', octave: 2, frequency: 110.00 },
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'E', octave: 4, frequency: 329.63 },
    ],
  },
  {
    id: 'drop-d',
    name: 'Drop D',
    description: 'Пониженный строй (D A D G B E)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'D', octave: 2, frequency: 73.42 },
      { note: 'A', octave: 2, frequency: 110.00 },
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'E', octave: 4, frequency: 329.63 },
    ],
  },
  {
    id: 'half-step-down',
    name: 'Half-Step Down',
    description: 'На полтона ниже (Eb Ab Db Gb Bb Eb)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'Eb', octave: 2, frequency: 77.78 },
      { note: 'Ab', octave: 2, frequency: 103.83 },
      { note: 'Db', octave: 3, frequency: 138.59 },
      { note: 'Gb', octave: 3, frequency: 185.00 },
      { note: 'Bb', octave: 3, frequency: 233.08 },
      { note: 'Eb', octave: 4, frequency: 311.13 },
    ],
  },
  {
    id: 'dadgad',
    name: 'DADGAD',
    description: 'Альтернативный строй (D A D G A D)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'D', octave: 2, frequency: 73.42 },
      { note: 'A', octave: 2, frequency: 110.00 },
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'A', octave: 3, frequency: 220.00 },
      { note: 'D', octave: 4, frequency: 293.66 },
    ],
  },
  {
    id: 'open-d',
    name: 'Open D',
    description: 'Открытый строй D (D A D F# A D)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'D', octave: 2, frequency: 73.42 },
      { note: 'A', octave: 2, frequency: 110.00 },
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'F#', octave: 3, frequency: 185.00 },
      { note: 'A', octave: 3, frequency: 220.00 },
      { note: 'D', octave: 4, frequency: 293.66 },
    ],
  },
  {
    id: 'open-c',
    name: 'Open C',
    description: 'Открытый строй C (C G C G C E)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'C', octave: 2, frequency: 65.41 },
      { note: 'G', octave: 2, frequency: 98.00 },
      { note: 'C', octave: 3, frequency: 130.81 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'C', octave: 4, frequency: 261.63 },
      { note: 'E', octave: 4, frequency: 329.63 },
    ],
  },
  {
    id: 'open-e',
    name: 'Open E',
    description: 'Открытый строй E (E B E G# B E)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'E', octave: 2, frequency: 82.41 },
      { note: 'B', octave: 2, frequency: 123.47 },
      { note: 'E', octave: 3, frequency: 164.81 },
      { note: 'G#', octave: 3, frequency: 207.65 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'E', octave: 4, frequency: 329.63 },
    ],
  },
  {
    id: 'drop-c',
    name: 'Drop C',
    description: 'Пониженный строй Drop C (C G C F A D)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'C', octave: 2, frequency: 65.41 },
      { note: 'G', octave: 2, frequency: 98.00 },
      { note: 'C', octave: 3, frequency: 130.81 },
      { note: 'F', octave: 3, frequency: 174.61 },
      { note: 'A', octave: 3, frequency: 220.00 },
      { note: 'D', octave: 4, frequency: 293.66 },
    ],
  },
  {
    id: 'double-drop-d',
    name: 'Double Drop D',
    description: 'Двойной Drop D (D A D G B D)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'D', octave: 2, frequency: 73.42 },
      { note: 'A', octave: 2, frequency: 110.00 },
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'D', octave: 4, frequency: 293.66 },
    ],
  },
  {
    id: 'whole-step-down',
    name: 'Whole Step Down',
    description: 'На тон ниже (D G C F A D)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'D', octave: 2, frequency: 73.42 },
      { note: 'G', octave: 2, frequency: 98.00 },
      { note: 'C', octave: 3, frequency: 130.81 },
      { note: 'F', octave: 3, frequency: 174.61 },
      { note: 'A', octave: 3, frequency: 220.00 },
      { note: 'D', octave: 4, frequency: 293.66 },
    ],
  },
  {
    id: 'drop-b',
    name: 'Drop B',
    description: 'Экстремально низкий строй (B F# B E G# C#)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'B', octave: 1, frequency: 61.74 },
      { note: 'F#', octave: 2, frequency: 92.50 },
      { note: 'B', octave: 2, frequency: 123.47 },
      { note: 'E', octave: 3, frequency: 164.81 },
      { note: 'G#', octave: 3, frequency: 207.65 },
      { note: 'C#', octave: 4, frequency: 277.18 },
    ],
  },
  {
    id: 'celtic',
    name: 'Celtic (DADGAD)',
    description: 'Кельтский строй (D A D G A D)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'D', octave: 2, frequency: 73.42 },
      { note: 'A', octave: 2, frequency: 110.00 },
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'A', octave: 3, frequency: 220.00 },
      { note: 'D', octave: 4, frequency: 293.66 },
    ],
  },
  {
    id: 'nashville',
    name: 'Nashville Tuning',
    description: 'Нэшвиллский строй (E A D G B E октавы)',
    instrument: 'guitar',
    stringCount: 6,
    notes: [
      { note: 'E', octave: 3, frequency: 164.81 },
      { note: 'A', octave: 3, frequency: 220.00 },
      { note: 'D', octave: 4, frequency: 293.66 },
      { note: 'G', octave: 4, frequency: 392.00 },
      { note: 'B', octave: 4, frequency: 493.88 },
      { note: 'E', octave: 5, frequency: 659.25 },
    ],
  },

  // Гитара 12-струнная
  {
    id: 'standard-12-string',
    name: 'Standard 12-String',
    description: 'Стандартный 12-струнный строй',
    instrument: 'guitar-12',
    stringCount: 12,
    notes: [
      // Нижние октавы (басовые струны)
      { note: 'E', octave: 2, frequency: 82.41 },
      { note: 'E', octave: 3, frequency: 164.81 },
      { note: 'A', octave: 2, frequency: 110.00 },
      { note: 'A', octave: 3, frequency: 220.00 },
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'D', octave: 4, frequency: 293.66 },
      // Верхние унисоны
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'E', octave: 4, frequency: 329.63 },
      { note: 'E', octave: 4, frequency: 329.63 },
    ],
  },

  // Укулеле
  {
    id: 'ukulele-standard',
    name: 'Ukulele Standard',
    description: 'Стандартный строй укулеле (G C E A)',
    instrument: 'ukulele',
    stringCount: 4,
    notes: [
      { note: 'G', octave: 4, frequency: 392.00 },
      { note: 'C', octave: 4, frequency: 261.63 },
      { note: 'E', octave: 4, frequency: 329.63 },
      { note: 'A', octave: 4, frequency: 440.00 },
    ],
  },
  {
    id: 'ukulele-baritone',
    name: 'Baritone Ukulele',
    description: 'Баритон укулеле (D G B E)',
    instrument: 'ukulele',
    stringCount: 4,
    notes: [
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'E', octave: 4, frequency: 329.63 },
    ],
  },

  // Мандолина
  {
    id: 'mandolin-standard',
    name: 'Mandolin Standard',
    description: 'Стандартный строй мандолины (G D A E)',
    instrument: 'mandolin',
    stringCount: 8,
    notes: [
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'D', octave: 4, frequency: 293.66 },
      { note: 'D', octave: 4, frequency: 293.66 },
      { note: 'A', octave: 4, frequency: 440.00 },
      { note: 'A', octave: 4, frequency: 440.00 },
      { note: 'E', octave: 5, frequency: 659.25 },
      { note: 'E', octave: 5, frequency: 659.25 },
    ],
  },

  // Банджо
  {
    id: 'banjo-open-g',
    name: 'Banjo Open G',
    description: 'Открытый строй банджо 5-струн (G D G B D)',
    instrument: 'banjo',
    stringCount: 5,
    notes: [
      { note: 'G', octave: 4, frequency: 392.00 }, // 5-я струна (короткая)
      { note: 'D', octave: 3, frequency: 146.83 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'D', octave: 4, frequency: 293.66 },
    ],
  },
  {
    id: 'banjo-c-tuning',
    name: 'Banjo C Tuning',
    description: 'Строй банджо C (G C G B D)',
    instrument: 'banjo',
    stringCount: 5,
    notes: [
      { note: 'G', octave: 4, frequency: 392.00 },
      { note: 'C', octave: 3, frequency: 130.81 },
      { note: 'G', octave: 3, frequency: 196.00 },
      { note: 'B', octave: 3, frequency: 246.94 },
      { note: 'D', octave: 4, frequency: 293.66 },
    ],
  },
];