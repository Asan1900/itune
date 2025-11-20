import { useState } from 'react';
import { Tab, TabPlayback } from '@/types/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTuningSettings } from '@/hooks/useTuningSettings';
import { cn } from '@/lib/utils';

interface TabFretboardProps {
  tab: Tab;
  playback: TabPlayback;
  onNoteClick?: (string: number, fret: number) => void;
  highlightCurrentPosition?: boolean;
}

export const TabFretboard = ({ 
  tab, 
  playback, 
  onNoteClick,
  highlightCurrentPosition = true 
}: TabFretboardProps) => {
  const [startFret, setStartFret] = useState(0);
  const [visibleFrets, setVisibleFrets] = useState(12);
  const { getCurrentTuning } = useTuningSettings();
  
  const currentTuning = getCurrentTuning();
  const stringNotes = currentTuning ? currentTuning.notes.map(n => n.note) : ['E', 'A', 'D', 'G', 'B', 'E'];
  
  const fretNumbers = Array.from({ length: visibleFrets + 1 }, (_, i) => startFret + i);
  const fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
  const doubleFretMarkers = [12, 24];

  // Get notes that should be highlighted for current position
  const getCurrentNotes = () => {
    if (!highlightCurrentPosition || !playback.isPlaying) return [];
    
    const currentSection = tab.sections[playback.currentSection];
    if (!currentSection) return [];
    
    const currentMeasure = currentSection.measures[playback.currentMeasure];
    if (!currentMeasure) return [];
    
    // This is a simplified version - in a real implementation,
    // you'd parse the actual tab notes for the current beat
    return [];
  };

  const currentNotes = getCurrentNotes();

  const getNoteAtFret = (stringIndex: number, fret: number) => {
    const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const openNote = stringNotes[stringIndex];
    const openIndex = chromatic.indexOf(openNote);
    const noteIndex = (openIndex + fret) % 12;
    return chromatic[noteIndex];
  };

  const isNoteHighlighted = (stringIndex: number, fret: number) => {
    return currentNotes.some(note => note.string === stringIndex + 1 && note.fret === fret);
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Гриф</h3>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setStartFret(Math.max(0, startFret - 1))}
            disabled={startFret === 0}
          >
            ←
          </Button>
          
          <Badge variant="outline">
            {startFret === 0 ? 'Открытые' : `${startFret} лад`} - {startFret + visibleFrets} лад
          </Badge>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => setStartFret(startFret + 1)}
            disabled={startFret + visibleFrets >= 24}
          >
            →
          </Button>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-amber-600/30 to-amber-800/40 rounded-lg p-4 shadow-inner">
        {/* Fretboard neck background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700/20 via-amber-600/30 to-amber-700/20 rounded-lg" />
        
        {/* Fret markers */}
        <div className="flex justify-center mb-3 relative z-10">
          {fretNumbers.map((fret) => (
            <div key={fret} className="flex-1 text-center relative h-6">
              {fretMarkers.includes(fret) && fret > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {doubleFretMarkers.includes(fret) ? (
                    <div className="flex flex-col gap-0.5">
                      <div className="w-2 h-2 rounded-full bg-amber-200 shadow-sm border border-amber-300" />
                      <div className="w-2 h-2 rounded-full bg-amber-200 shadow-sm border border-amber-300" />
                    </div>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-amber-200 shadow-sm border border-amber-300" />
                  )}
                </div>
              )}
              <span className="text-xs text-amber-100 font-medium relative z-10 bg-amber-900/60 px-1 rounded">
                {fret}
              </span>
            </div>
          ))}
        </div>

        {/* Fretboard */}
        <div className="space-y-2 relative z-10">
          {stringNotes.map((stringNote, stringIndex) => (
            <div key={stringIndex} className="flex items-center">
              {/* Tuning peg */}
              <div className="w-12 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-l-lg border border-gray-500 flex items-center justify-center shadow-md mr-2">
                <span className="text-xs font-bold text-gray-200">{stringNote}</span>
              </div>
              
              {/* String line and frets */}
              <div className="flex-1 relative h-8">
                {/* String line with realistic thickness */}
                <div 
                  className={cn(
                    "absolute top-1/2 left-0 right-0 transform -translate-y-1/2 shadow-sm",
                    // Low E and A strings (thicker)
                    stringIndex >= 4 ? "h-1 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 rounded-full" :
                    // D and G strings (medium)
                    stringIndex >= 2 ? "h-0.5 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full" :
                    // B and high E strings (thinner)
                    "h-px bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                  )} 
                />
                
                {/* Frets */}
                <div className="flex h-full">
                  {fretNumbers.map((fret) => (
                    <div key={fret} className="flex-1 relative h-full">
                      {/* Fret wire with realistic metallic look */}
                      {fret > startFret && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 shadow-sm rounded-full" />
                      )}
                      
                      {/* Nut for open strings */}
                      {fret === 0 && startFret === 0 && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-100 via-white to-gray-100 shadow-md" />
                      )}
                      
                      {/* Note position */}
                      <button
                        className={cn(
                          "w-full h-full flex items-center justify-center transition-all hover:bg-primary/20 relative group rounded-sm",
                          isNoteHighlighted(stringIndex, fret) && "bg-primary/30",
                          fret === 0 && "hover:bg-amber-400/20"
                        )}
                        onClick={() => onNoteClick?.(stringIndex + 1, fret)}
                      >
                        {/* Note name tooltip */}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-card text-card-foreground text-xs rounded px-2 py-1 absolute -top-10 z-20 whitespace-nowrap shadow-lg border border-border">
                          {getNoteAtFret(stringIndex, fret)}
                        </span>
                        
                        {/* Fingertip indicator for highlighted notes */}
                        {isNoteHighlighted(stringIndex, fret) && (
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg animate-pulse border border-pink-300" />
                        )}
                        
                        {/* Subtle hover indicator */}
                        <div className="opacity-0 group-hover:opacity-30 w-3 h-3 rounded-full bg-primary transition-opacity" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tuning info */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Строй: {currentTuning?.name || 'Standard E'} ({stringNotes.reverse().join(' - ')})
        </div>
      </div>
    </Card>
  );
};