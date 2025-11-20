import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Settings, Guitar } from 'lucide-react';
import { useTuningSettings } from '@/hooks/useTuningSettings';
import { useLanguage } from '@/hooks/useLanguage';
import { CustomTuningEditor } from './CustomTuningEditor';

export function TuningSelector() {
  const { getTuningsForInstrument, getCurrentTuning, selectTuning, settings } = useTuningSettings();
  const { t } = useLanguage();
  const [showEditor, setShowEditor] = useState(false);
  const currentTuning = getCurrentTuning();
  const allTunings = getTuningsForInstrument(settings.selectedInstrument);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Guitar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">{t('tuning.title')}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowEditor(true)}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>


      <Select value={settings.selectedTuningId} onValueChange={selectTuning}>
        <SelectTrigger className="flex-1 h-auto p-3 flex flex-col items-start gap-2 text-left">
          <div className="flex items-center gap-2 w-full">
            <span className="font-medium text-base">
              {currentTuning ? currentTuning.name : t('tuning.select')}
            </span>
          </div>
          {currentTuning && (
            <>
              <div className="text-sm text-muted-foreground w-full whitespace-normal">
                {currentTuning.description}
              </div>
              <div className="flex gap-1 flex-wrap mt-1 pointer-events-none">
                {currentTuning.notes.map((note, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="font-mono text-xs bg-primary/10 border-primary/20"
                  >
                    {note.note}{note.octave}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </SelectTrigger>
        <SelectContent>
          {allTunings.map((tuning) => (
            <SelectItem
              key={tuning.id}
              value={tuning.id}
              className="cursor-pointer focus:bg-primary/10 focus:text-primary data-[state=checked]:bg-primary/20 data-[state=checked]:text-primary"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{tuning.name}</span>
                {!tuning.description?.includes('Standard') && !tuning.description?.includes('Стандартный') && (
                  <Badge variant="secondary" className="text-xs bg-secondary/50">
                    {tuning.id.startsWith('custom-') ? t('tuning.custom') : t('tuning.alt')}
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>




      {showEditor && (
        <CustomTuningEditor onClose={() => setShowEditor(false)} />
      )}
    </div>
  );
}