import { useState, useEffect, useRef } from 'react';
import { Tab, TabSettings, TabPlayback } from '@/types/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Pause, Square, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';
import { InteractiveButton } from '@/components/InteractiveButton';

interface TabViewerProps {
  tab: Tab;
  playback: TabPlayback;
  settings: TabSettings;
  onPlaybackChange: (playback: Partial<TabPlayback>) => void;
  onPositionClick?: (section: number, measure: number, beat: number) => void;
}

export const TabViewer = ({
  tab,
  playback,
  settings,
  onPlaybackChange,
  onPositionClick
}: TabViewerProps) => {
  const { t } = useLanguage();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [metronome, setMetronome] = useState<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (settings.autoScroll && playback.isPlaying && scrollAreaRef.current) {
      const currentElement = scrollAreaRef.current.querySelector('.current-measure');
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [playback.currentMeasure, settings.autoScroll, playback.isPlaying]);

  // Metronome and playback
  useEffect(() => {
    if (playback.isPlaying) {
      const interval = (60 / (playback.tempo * playback.speed)) * 1000;
      const timer = setInterval(() => {
        const currentSection = tab.sections[playback.currentSection];
        if (!currentSection) return;

        const currentMeasure = currentSection.measures[playback.currentMeasure];
        if (!currentMeasure) return;

        const beatsPerMeasure = currentMeasure.timeSignature?.numerator || 4;

        if (playback.currentBeat >= beatsPerMeasure - 1) {
          // Next measure
          if (playback.currentMeasure >= currentSection.measures.length - 1) {
            // Next section or stop
            if (playback.currentSection >= tab.sections.length - 1) {
              onPlaybackChange({ isPlaying: false, currentSection: 0, currentMeasure: 0, currentBeat: 0 });
            } else {
              onPlaybackChange({ currentSection: playback.currentSection + 1, currentMeasure: 0, currentBeat: 0 });
            }
          } else {
            onPlaybackChange({ currentMeasure: playback.currentMeasure + 1, currentBeat: 0 });
          }
        } else {
          onPlaybackChange({ currentBeat: playback.currentBeat + 1 });
        }
      }, interval);

      setMetronome(timer);
      return () => clearInterval(timer);
    } else {
      if (metronome) {
        clearInterval(metronome);
        setMetronome(null);
      }
    }
  }, [playback.isPlaying, playback.tempo, playback.speed, playback.currentSection, playback.currentMeasure, playback.currentBeat, tab.sections, onPlaybackChange]);

  const handlePlayPause = () => {
    onPlaybackChange({ isPlaying: !playback.isPlaying });
  };

  const handleStop = () => {
    onPlaybackChange({
      isPlaying: false,
      currentSection: 0,
      currentMeasure: 0,
      currentBeat: 0
    });
  };

  const handlePrevMeasure = () => {
    if (playback.currentMeasure > 0) {
      onPlaybackChange({ currentMeasure: playback.currentMeasure - 1, currentBeat: 0 });
    } else if (playback.currentSection > 0) {
      const prevSection = tab.sections[playback.currentSection - 1];
      onPlaybackChange({
        currentSection: playback.currentSection - 1,
        currentMeasure: prevSection.measures.length - 1,
        currentBeat: 0
      });
    }
  };

  const handleNextMeasure = () => {
    const currentSection = tab.sections[playback.currentSection];
    if (playback.currentMeasure < currentSection.measures.length - 1) {
      onPlaybackChange({ currentMeasure: playback.currentMeasure + 1, currentBeat: 0 });
    } else if (playback.currentSection < tab.sections.length - 1) {
      onPlaybackChange({
        currentSection: playback.currentSection + 1,
        currentMeasure: 0,
        currentBeat: 0
      });
    }
  };

  const renderTabMeasure = (measure: any, measureIndex: number, sectionIndex: number) => {
    const isCurrent = sectionIndex === playback.currentSection && measureIndex === playback.currentMeasure;
    const strings = ['e', 'B', 'G', 'D', 'A', 'E'];
    const fretCount = 16; // Standard measure width

    return (
      <div
        key={`${sectionIndex}-${measureIndex}`}
        className={cn(
          "tab-measure border border-border/20 p-3 font-mono text-sm cursor-pointer hover:bg-accent/50 transition-colors rounded-md",
          isCurrent && "current-measure bg-primary/10 border-primary shadow-md"
        )}
        onClick={() => onPositionClick?.(sectionIndex, measureIndex, 0)}
      >
        {/* Measure number */}
        <div className="text-xs text-muted-foreground mb-2 text-center">
          {measureIndex + 1}
        </div>

        {/* Chord progression (if enabled) */}
        {settings.showChords && tab.chords?.[`${sectionIndex}-${measureIndex}`] && (
          <div className="mb-2 text-xs text-center text-primary font-semibold">
            {tab.chords[`${sectionIndex}-${measureIndex}`].join(' - ')}
          </div>
        )}

        {/* Tab strings */}
        {strings.map((string, stringIndex) => (
          <div key={string} className="flex items-center gap-1 h-6 relative">
            <span className="w-3 text-muted-foreground text-xs font-bold">{string}</span>
            <span className="text-muted-foreground">|</span>

            <div className="flex-1 relative bg-muted/20 rounded">
              {/* Tab line with frets */}
              <div className="flex items-center h-full">
                {Array.from({ length: fretCount }, (_, fretIndex) => (
                  <span
                    key={fretIndex}
                    className="flex-1 text-center text-muted-foreground border-r border-muted-foreground/20 last:border-r-0"
                  >
                    -
                  </span>
                ))}
              </div>

              {/* Notes overlay */}
              {measure.notes?.[stringIndex]?.map((note: any, noteIndex: number) => (
                <div
                  key={noteIndex}
                  className="absolute top-0 h-full flex items-center justify-center text-xs font-bold text-primary bg-primary/10 rounded border border-primary/30"
                  style={{
                    left: `${(noteIndex / fretCount) * 100}%`,
                    width: `${100 / fretCount}%`,
                  }}
                >
                  {note.fret}
                </div>
              ))}

              {/* Current position highlight */}
              {settings.highlightCurrentPosition && isCurrent && playback.currentBeat !== undefined && (
                <div
                  className="absolute top-0 h-full bg-accent/40 border-l-2 border-primary animate-pulse"
                  style={{
                    left: `${(playback.currentBeat / fretCount) * 100}%`,
                    width: '2px',
                  }}
                />
              )}
            </div>

            <span className="text-muted-foreground">|</span>
          </div>
        ))}

        {/* Time signature and tempo info */}
        {measureIndex === 0 && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            {measure.timeSignature ?
              `${measure.timeSignature.numerator}/${measure.timeSignature.denominator}` :
              '4/4'
            }
            {measure.tempo && ` • ${measure.tempo} BPM`}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Tab Header */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{tab.metadata.title}</h2>
            <p className="text-muted-foreground">{tab.metadata.artist}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{tab.metadata.difficulty}</Badge>
              <Badge variant="outline">{tab.metadata.genre}</Badge>
              <Badge variant="outline">{tab.metadata.tempo} BPM</Badge>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <InteractiveButton
                size="sm"
                variant="outline"
                onClick={handlePrevMeasure}
                disabled={playback.currentSection === 0 && playback.currentMeasure === 0}
              >
                <SkipBack className="h-4 w-4" />
              </InteractiveButton>

              <InteractiveButton
                size="sm"
                onClick={handlePlayPause}
                className="w-12"
              >
                {playback.isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </InteractiveButton>

              <InteractiveButton
                size="sm"
                variant="outline"
                onClick={handleStop}
              >
                <Square className="h-4 w-4" />
              </InteractiveButton>

              <InteractiveButton
                size="sm"
                variant="outline"
                onClick={handleNextMeasure}
                disabled={
                  playback.currentSection === tab.sections.length - 1 &&
                  playback.currentMeasure === tab.sections[playback.currentSection]?.measures.length - 1
                }
              >
                <SkipForward className="h-4 w-4" />
              </InteractiveButton>
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="h-4 w-4" />
              <span className="w-8">{Math.round(playback.speed * 100)}%</span>
              <Slider
                value={[playback.speed]}
                onValueChange={([speed]) => onPlaybackChange({ speed })}
                min={0.25}
                max={2}
                step={0.25}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Settings */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            size="sm"
            variant={settings.autoScroll ? "default" : "outline"}
            onClick={() => onPlaybackChange && settings.autoScroll !== undefined &&
              ((window as any).setTabSettings?.({ ...settings, autoScroll: !settings.autoScroll }) ||
                console.log('Auto-scroll:', !settings.autoScroll))}
          >
            {t('viewer.autoscroll')}
          </Button>
          <Button
            size="sm"
            variant={settings.showChords ? "default" : "outline"}
            onClick={() => onPlaybackChange && settings.showChords !== undefined &&
              ((window as any).setTabSettings?.({ ...settings, showChords: !settings.showChords }) ||
                console.log('Show chords:', !settings.showChords))}
          >
            {t('viewer.chords')}
          </Button>
          <Button
            size="sm"
            variant={settings.showLyrics ? "default" : "outline"}
            onClick={() => onPlaybackChange && settings.showLyrics !== undefined &&
              ((window as any).setTabSettings?.({ ...settings, showLyrics: !settings.showLyrics }) ||
                console.log('Show lyrics:', !settings.showLyrics))}
          >
            {t('viewer.lyrics')}
          </Button>
          <Button
            size="sm"
            variant={settings.highlightCurrentPosition ? "default" : "outline"}
            onClick={() => onPlaybackChange && settings.highlightCurrentPosition !== undefined &&
              ((window as any).setTabSettings?.({ ...settings, highlightCurrentPosition: !settings.highlightCurrentPosition }) ||
                console.log('Highlight position:', !settings.highlightCurrentPosition))}
          >
            {t('viewer.highlight')}
          </Button>
        </div>
      </Card>

      {/* Tab Content */}
      <Card className="p-4">
        <ScrollArea ref={scrollAreaRef} className="h-96">
          {tab.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {section.name && (
                <h3 className="text-lg font-semibold mb-2 text-primary">
                  [{section.name}]
                </h3>
              )}

              <div className="grid gap-2">
                {section.measures.map((measure, measureIndex) =>
                  renderTabMeasure(measure, measureIndex, sectionIndex)
                )}
              </div>

              {settings.showLyrics && tab.lyrics && (
                <div className="mt-4 p-2 bg-muted/50 rounded text-sm">
                  {Object.entries(tab.lyrics)
                    .filter(([key]) => parseInt(key) >= sectionIndex * 10 && parseInt(key) < (sectionIndex + 1) * 10)
                    .map(([key, lyrics]) => (
                      <p key={key} className="text-muted-foreground">{lyrics}</p>
                    ))
                  }
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </Card>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{t('viewer.measure')}:</span>
        <span className="text-foreground">
          {playback.currentSection + 1}.{playback.currentMeasure + 1}
        </span>
        <span>/</span>
        <span>
          {tab.sections.length}.{tab.sections[playback.currentSection]?.measures.length || 0}
        </span>
        {playback.isPlaying && (
          <Badge variant="outline" className="ml-2 animate-pulse">
            {t('viewer.playing')}
          </Badge>
        )}
      </div>
    </div>
  );
};