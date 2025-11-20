import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTuningSettings } from "@/hooks/useTuningSettings";
import { ChevronUp, ChevronDown, Target } from "lucide-react";
import { CircleTuner } from "./CircleTuner";
import { AutoModeToggle } from "./AutoModeToggle";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface TunerDisplayProps {
  frequency: number;
  note: string;
  octave: number;
  cents: number;
  isActive: boolean;
  detectedStringIndex?: number | null;
  onStringSelect?: (stringIndex: number) => void;
}

export function TunerDisplay({ frequency, note, octave, cents, isActive, detectedStringIndex, onStringSelect }: TunerDisplayProps) {
  const { getCurrentTuning } = useTuningSettings();
  const { t } = useLanguage();
  const currentTuning = getCurrentTuning();
  const [autoMode, setAutoMode] = useState(true);
  const [manualStringIndex, setManualStringIndex] = useState<number | null>(null);

  const getTuningStatus = () => {
    if (Math.abs(cents) <= 5) return 'accurate';
    if (Math.abs(cents) <= 20) return 'close';
    return 'off';
  };

  const getStatusColor = () => {
    const status = getTuningStatus();
    switch (status) {
      case 'accurate':
        return 'tuner-accurate';
      case 'close':
        return 'tuner-close';
      default:
        return 'tuner-off';
    }
  };

  const getGlowClass = () => {
    const status = getTuningStatus();
    switch (status) {
      case 'accurate':
        return 'tuner-glow-accurate';
      case 'close':
        return 'tuner-glow-close';
      default:
        return 'tuner-glow-off';
    }
  };

  // Get tuning hint
  const getTuningHint = () => {
    if (!isActive || !note || !currentTuning || detectedStringIndex === null) return null;

    const targetNote = currentTuning.notes[detectedStringIndex];
    const status = getTuningStatus();

    if (status === 'accurate') {
      return {
        icon: <Target className="w-4 h-4" />,
        text: `${t('common.string')} ${detectedStringIndex + 1}: ${t('tuner.status.accurate')}`,
        color: 'text-tuner-accurate'
      };
    }

    return {
      icon: cents > 0 ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />,
      text: `${t('common.string')} ${detectedStringIndex + 1} (${targetNote.note}${targetNote.octave}): ${cents > 0 ? t('tuner.hint.lower') : t('tuner.hint.raise')}`,
      color: status === 'close' ? 'text-tuner-close' : 'text-tuner-off'
    };
  };

  const tuningHint = getTuningHint();

  const activeStringIndex = autoMode ? detectedStringIndex : manualStringIndex;
  const targetNote = currentTuning && activeStringIndex !== null
    ? currentTuning.notes[activeStringIndex]
    : undefined;

  const handleStringClick = (stringIndex: number) => {
    if (!autoMode) {
      setManualStringIndex(stringIndex);
      onStringSelect?.(stringIndex);
    }
  };

  const handleAutoModeToggle = (enabled: boolean) => {
    setAutoMode(enabled);
    if (!enabled && manualStringIndex === null && currentTuning) {
      setManualStringIndex(0); // Select first string by default
    }
  };

  console.log('TunerDisplay render:', {
    currentTuning: !!currentTuning,
    autoMode,
    activeStringIndex,
    detectedStringIndex,
    manualStringIndex
  });

  return (
    <div className="space-y-8">
      {/* Debug info */}
      {/* <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
        {t('debug.info')}: currentTuning={currentTuning?.name || 'null'}, autoMode={autoMode.toString()}, activeString={activeStringIndex}
      </div> */}

      <div className="flex justify-center">
        <AutoModeToggle
          autoMode={autoMode}
          onToggle={handleAutoModeToggle}
        />
      </div>

      {/* Current Tuning Info */}
      {currentTuning && (
        <div className="text-center space-y-2 animate-fade-in">
          <h3 className="text-2xl font-semibold text-foreground">{currentTuning.name}</h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {currentTuning.notes.map((note, index) => (
              <Badge
                key={index}
                variant="outline"
                className={cn(
                  "text-sm font-mono px-3 py-1 border-primary/20",
                  activeStringIndex === index ? "bg-primary/20 border-primary text-primary" : "bg-card/50 text-muted-foreground"
                )}
                onClick={() => handleStringClick(index)}
              >
                {note.note}{note.octave}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Main Display Area */}
      <div className="flex justify-center items-center">
        {/* Central Tuning Indicator */}
        <div className="w-full max-w-2xl">
          <CircleTuner
            frequency={frequency}
            note={note}
            octave={octave}
            cents={cents}
            isActive={isActive}
          />
        </div>
      </div>
    </div>
  );
}