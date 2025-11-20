import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTuningSettings } from '@/hooks/useTuningSettings';
import { useLanguage } from '@/hooks/useLanguage';
import { TuningNote, InstrumentType } from '@/types/tuning';
import { toast } from 'sonner';

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7];

function calculateFrequency(note: string, octave: number): number {
  const A4_FREQ = 440;
  const noteIndex = NOTE_NAMES.indexOf(note);
  const semitonesFromA4 = (octave - 4) * 12 + (noteIndex - 9);
  return A4_FREQ * Math.pow(2, semitonesFromA4 / 12);
}

interface CustomTuningEditorProps {
  onClose: () => void;
}

export function CustomTuningEditor({ onClose }: CustomTuningEditorProps) {
  const { addCustomTuning } = useTuningSettings();
  const { t } = useLanguage();
  const [tuningName, setTuningName] = useState('');
  const [tuningDescription, setTuningDescription] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType>('guitar');
  const [notes, setNotes] = useState<TuningNote[]>([
    { note: 'E', octave: 2, frequency: 82.41 },
    { note: 'A', octave: 2, frequency: 110.00 },
    { note: 'D', octave: 3, frequency: 146.83 },
    { note: 'G', octave: 3, frequency: 196.00 },
    { note: 'B', octave: 3, frequency: 246.94 },
    { note: 'E', octave: 4, frequency: 329.63 },
  ]);

  const updateNote = (index: number, field: 'note' | 'octave', value: string | number) => {
    const newNotes = [...notes];
    if (field === 'note') {
      newNotes[index].note = value as string;
    } else {
      newNotes[index].octave = value as number;
    }
    newNotes[index].frequency = calculateFrequency(newNotes[index].note, newNotes[index].octave);
    setNotes(newNotes);
  };

  const addString = () => {
    if (notes.length < 7) {
      setNotes([...notes, { note: 'E', octave: 4, frequency: 329.63 }]);
    }
  };

  const removeString = (index: number) => {
    if (notes.length > 4) {
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  const saveTuning = () => {
    if (!tuningName.trim()) {
      toast.error(t('tuning.editor.error.name'));
      return;
    }

    const tuning = {
      id: `custom-${Date.now()}`,
      name: tuningName,
      description: tuningDescription || `${t('tuning.editor.defaultDesc')} (${notes.map(n => n.note + n.octave).join(' ')})`,
      instrument: selectedInstrument,
      stringCount: notes.length,
      notes: notes,
    };

    addCustomTuning(tuning);
    toast.success(t('tuning.editor.success'));
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('tuning.editor.title')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tuning-name">{t('tuning.editor.name')}</Label>
            <Input
              id="tuning-name"
              value={tuningName}
              onChange={(e) => setTuningName(e.target.value)}
              placeholder={t('tuning.editor.namePlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tuning-description">{t('tuning.editor.description')}</Label>
            <Input
              id="tuning-description"
              value={tuningDescription}
              onChange={(e) => setTuningDescription(e.target.value)}
              placeholder={t('tuning.editor.descPlaceholder')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instrument-type">{t('tuning.editor.instrumentType')}</Label>
            <Select value={selectedInstrument} onValueChange={(value: InstrumentType) => setSelectedInstrument(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="guitar">{t('instrument.guitar')}</SelectItem>
                <SelectItem value="guitar-12">{t('instrument.guitar-12')}</SelectItem>
                <SelectItem value="ukulele">{t('instrument.ukulele')}</SelectItem>
                <SelectItem value="mandolin">{t('instrument.mandolin')}</SelectItem>
                <SelectItem value="banjo">{t('instrument.banjo')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{t('tuning.editor.strings')}</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addString}
                  disabled={notes.length >= 7}
                >
                  {t('tuning.editor.addString')}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {notes.map((note, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-mono">
                    {index + 1}
                  </div>

                  <Select
                    value={note.note}
                    onValueChange={(value) => updateNote(index, 'note', value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NOTE_NAMES.map((noteName) => (
                        <SelectItem key={noteName} value={noteName}>
                          {noteName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={note.octave.toString()}
                    onValueChange={(value) => updateNote(index, 'octave', parseInt(value))}
                  >
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OCTAVES.map((octave) => (
                        <SelectItem key={octave} value={octave.toString()}>
                          {octave}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="text-sm text-muted-foreground font-mono flex-1">
                    {note.frequency.toFixed(2)} Hz
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeString(index)}
                    disabled={notes.length <= 4}
                    className="text-destructive hover:text-destructive"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t('tuning.editor.cancel')}
            </Button>
            <Button onClick={saveTuning} className="flex-1">
              {t('tuning.editor.save')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}