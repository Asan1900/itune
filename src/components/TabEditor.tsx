import { useState, useEffect } from 'react';
import { Tab, TabEditor as TabEditorState, TabNote, TabPlayback } from '@/types/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InteractiveButton } from '@/components/InteractiveButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Save,
  Plus,
  Minus,
  Copy,
  Scissors,
  ClipboardPaste,
  Undo2,
  Redo2,
  Music,
  Volume2,
  Edit3,
  Type,
  MousePointer,
  Grid,
  Play,
  Pause,
  Square
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface TabEditorProps {
  tab: Tab;
  editor: TabEditorState;
  onTabUpdate: (updates: Partial<Tab>) => void;
  onEditorUpdate: (updates: Partial<TabEditorState>) => void;
  undo?: () => void;
  redo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  copyMeasure?: () => void;
  pasteMeasure?: () => void;
  playback?: TabPlayback;
  onPlaybackChange?: (updates: Partial<TabPlayback>) => void;
}

export const TabEditor = ({
  tab,
  editor,
  onTabUpdate,
  onEditorUpdate,
  undo,
  redo,
  canUndo,
  canRedo,
  copyMeasure,
  pasteMeasure,
  playback,
  onPlaybackChange
}: TabEditorProps) => {
  const { t } = useLanguage();
  const [editingMetadata, setEditingMetadata] = useState(false);
  const [tempMetadata, setTempMetadata] = useState(tab.metadata);

  const strings = ['e', 'B', 'G', 'D', 'A', 'E'];
  const tools = [
    { id: 'select', icon: MousePointer, label: t('editor.tools.select') },
    { id: 'note', icon: Music, label: t('editor.tools.note') },
    { id: 'chord', icon: Grid, label: t('editor.tools.chord') },
    { id: 'text', icon: Type, label: t('editor.tools.text') },
  ] as const;

  const currentSection = tab.sections[editor.selectedMeasure] || tab.sections[0];
  const currentMeasure = currentSection?.measures[0];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo?.();
        } else {
          undo?.();
        }
        e.preventDefault();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        redo?.();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleToolSelect = (tool: TabEditorState['tool']) => {
    onEditorUpdate({ tool });
  };

  const togglePlayback = () => {
    onPlaybackChange?.({ isPlaying: !playback?.isPlaying });
  };

  const stopPlayback = () => {
    onPlaybackChange?.({ isPlaying: false, currentMeasure: 0, currentBeat: 0 });
  };

  const handleStringSelect = (stringIndex: number) => {
    onEditorUpdate({ selectedString: stringIndex });
  };

  const handleFretInput = (fret: number) => {
    if (editor.tool === 'note') {
      // Add note logic here
      const newNote: TabNote = {
        fret,
        string: editor.selectedString,
        duration: 1,
      };

      // Update tab with new note
      const updatedSections = [...tab.sections];
      // Add note to current measure
      onTabUpdate({ sections: updatedSections });
    }
  };

  const addMeasure = () => {
    const newMeasure = {
      notes: [[]],
      timeSignature: { numerator: 4, denominator: 4 },
      tempo: tab.metadata.tempo,
    };

    const updatedSections = [...tab.sections];
    if (updatedSections[0]) {
      updatedSections[0].measures.push(newMeasure);
      onTabUpdate({ sections: updatedSections });
    }
  };

  const addSection = () => {
    const newSection = {
      name: `${t('editor.section')} ${tab.sections.length + 1}`,
      measures: [{
        notes: [[]],
        timeSignature: { numerator: 4, denominator: 4 },
        tempo: tab.metadata.tempo,
      }],
    };

    onTabUpdate({ sections: [...tab.sections, newSection] });
  };

  const saveMetadata = () => {
    onTabUpdate({ metadata: tempMetadata });
    setEditingMetadata(false);
  };

  const renderFretboard = () => {
    return (
      <Card className="p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">{t('editor.fretboard')}</h3>
        <div className="space-y-2 min-w-[600px]">
          {strings.map((string, stringIndex) => (
            <div
              key={string}
              className={cn(
                "flex items-center gap-2 p-2 rounded cursor-pointer transition-colors",
                editor.selectedString === stringIndex + 1 && "bg-primary/20"
              )}
              onClick={() => handleStringSelect(stringIndex + 1)}
            >
              <span className="w-4 text-sm font-mono">{string}</span>
              <div className="flex gap-1">
                {Array.from({ length: 13 }, (_, fret) => (
                  <button
                    key={fret}
                    className={cn(
                      "w-8 h-8 border rounded text-xs hover:bg-accent transition-colors",
                      fret === 0 ? "bg-muted" : "bg-background"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFretInput(fret);
                    }}
                  >
                    {fret || 'O'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderTabSheet = () => {
    return (
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t('editor.tablature')}</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={addMeasure}>
              <Plus className="h-4 w-4 mr-2" />
              {t('editor.measure')}
            </Button>
            <Button size="sm" variant="outline" onClick={addSection}>
              <Plus className="h-4 w-4 mr-2" />
              {t('editor.section')}
            </Button>
          </div>
        </div>

        <ScrollArea className="h-64">
          {tab.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">[{section.name || `${t('editor.section')} ${sectionIndex + 1}`}]</Badge>
                {section.repeat && (
                  <Badge variant="secondary">x{section.repeat}</Badge>
                )}
              </div>

              <div className="font-mono text-sm space-y-1 bg-muted/30 p-3 rounded">
                {strings.map((string, stringIndex) => (
                  <div key={string} className="flex items-center gap-2">
                    <span className="w-4 text-muted-foreground">{string}</span>
                    <span className="text-muted-foreground">|</span>
                    <div className="flex-1 min-h-[20px] border-b border-dashed border-muted-foreground/30 relative">
                      {/* Tab notes would be rendered here */}
                      {section.measures.map((measure, measureIndex) => (
                        <span key={measureIndex} className="inline-block w-12 text-center">
                          --
                        </span>
                      ))}
                    </div>
                    <span className="text-muted-foreground">|</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card className="p-4 overflow-x-auto">
        <div className="flex items-center gap-4 min-w-max">
          {/* Tools */}
          <div className="flex gap-1">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                size="sm"
                variant={editor.tool === tool.id ? "default" : "outline"}
                onClick={() => handleToolSelect(tool.id)}
              >
                <tool.icon className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">{tool.label}</span>
              </Button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Edit Actions */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={copyMeasure}
              title="Copy Measure"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" disabled>
              <Scissors className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={pasteMeasure}
              disabled={!editor.clipboard}
              title="Paste Measure"
            >
              <ClipboardPaste className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Playback Controls */}
          <div className="flex gap-1">
            <InteractiveButton
              size="sm"
              variant={playback?.isPlaying ? "default" : "outline"}
              onClick={togglePlayback}
              title={playback?.isPlaying ? "Pause" : "Play"}
            >
              {playback?.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </InteractiveButton>
            <InteractiveButton
              size="sm"
              variant="outline"
              onClick={stopPlayback}
              title="Stop"
            >
              <Square className="h-4 w-4" />
            </InteractiveButton>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Metadata */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditingMetadata(true)}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {t('editor.metadata.edit')}
          </Button>

          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            {t('editor.save')}
          </Button>
        </div>
      </Card>

      {/* Metadata Editor */}
      {editingMetadata && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">{t('editor.metadata.title')}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">{t('editor.metadata.name')}</Label>
                <Input
                  id="title"
                  value={tempMetadata.title}
                  onChange={(e) => setTempMetadata({ ...tempMetadata, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="artist">{t('editor.metadata.artist')}</Label>
                <Input
                  id="artist"
                  value={tempMetadata.artist}
                  onChange={(e) => setTempMetadata({ ...tempMetadata, artist: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="album">{t('editor.metadata.album')}</Label>
                <Input
                  id="album"
                  value={tempMetadata.album || ''}
                  onChange={(e) => setTempMetadata({ ...tempMetadata, album: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="genre">{t('editor.metadata.genre')}</Label>
                <Input
                  id="genre"
                  value={tempMetadata.genre}
                  onChange={(e) => setTempMetadata({ ...tempMetadata, genre: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="tempo">{t('editor.metadata.tempo')}</Label>
                <Input
                  id="tempo"
                  type="number"
                  value={tempMetadata.tempo}
                  onChange={(e) => setTempMetadata({ ...tempMetadata, tempo: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="difficulty">{t('editor.metadata.difficulty')}</Label>
                <Select
                  value={tempMetadata.difficulty}
                  onValueChange={(value: any) => setTempMetadata({ ...tempMetadata, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">{t('editor.difficulty.beginner')}</SelectItem>
                    <SelectItem value="intermediate">{t('editor.difficulty.intermediate')}</SelectItem>
                    <SelectItem value="advanced">{t('editor.difficulty.advanced')}</SelectItem>
                    <SelectItem value="expert">{t('editor.difficulty.expert')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={saveMetadata}>{t('editor.save')}</Button>
            <Button variant="outline" onClick={() => setEditingMetadata(false)}>
              {t('tuning.editor.cancel')}
            </Button>
          </div>
        </Card>
      )}

      {/* Main Editor */}
      <div className="grid lg:grid-cols-2 gap-4">
        {renderFretboard()}
        {renderTabSheet()}
      </div>

      {/* Properties Panel */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Свойства</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>{t('editor.properties.string')}</Label>
            <Select
              value={editor.selectedString.toString()}
              onValueChange={(value) => onEditorUpdate({ selectedString: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {strings.map((string, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    {string} ({index + 1})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t('editor.properties.technique')}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('editor.technique.normal')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('editor.technique.normal')}</SelectItem>
                <SelectItem value="bend">{t('editor.technique.bend')}</SelectItem>
                <SelectItem value="slide">{t('editor.technique.slide')}</SelectItem>
                <SelectItem value="hammer">{t('editor.technique.hammer')}</SelectItem>
                <SelectItem value="pull">{t('editor.technique.pull')}</SelectItem>
                <SelectItem value="vibrato">{t('editor.technique.vibrato')}</SelectItem>
                <SelectItem value="palm-mute">{t('editor.technique.palmmute')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t('editor.properties.duration')}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('editor.duration.4')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.25">{t('editor.duration.16')}</SelectItem>
                <SelectItem value="0.5">{t('editor.duration.8')}</SelectItem>
                <SelectItem value="1">{t('editor.duration.4')}</SelectItem>
                <SelectItem value="2">{t('editor.duration.2')}</SelectItem>
                <SelectItem value="4">{t('editor.duration.1')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
};