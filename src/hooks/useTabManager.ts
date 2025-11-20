import { useState, useEffect, useCallback } from 'react';
import { Tab, TabLibraryFolder, TabProgress, TabPlayback, TabEditor, TabSettings } from '@/types/tabs';
import { useTuningSettings } from './useTuningSettings';
import { useHistory } from './useHistory';
import { toast } from 'sonner';

const DEFAULT_SETTINGS: TabSettings = {
  autoScroll: true,
  showFretNumbers: true,
  showChords: true,
  showLyrics: true,
  highlightCurrentPosition: true,
  fretboardView: false,
  practiceMode: false,
  mistakeHighlighting: true,
};

export const useTabManager = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [folders, setFolders] = useState<TabLibraryFolder[]>([]);
  const [progress, setProgress] = useState<TabProgress[]>([]);

  const {
    state: currentTab,
    set: setCurrentTabHistory,
    reset: resetCurrentTab,
    undo,
    redo,
    canUndo,
    canRedo
  } = useHistory<Tab | null>(null);

  const [playback, setPlayback] = useState<TabPlayback>({
    isPlaying: false,
    currentSection: 0,
    currentMeasure: 0,
    currentBeat: 0,
    tempo: 120,
    speed: 1.0,
  });
  const [editor, setEditor] = useState<TabEditor>({
    selectedMeasure: 0,
    selectedBeat: 0,
    selectedString: 1,
    tool: 'select',
  });
  const [settings, setSettings] = useState<TabSettings>(DEFAULT_SETTINGS);
  const { selectTuning, getAllTunings } = useTuningSettings();

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedTabs = localStorage.getItem('tabs');
      const savedFolders = localStorage.getItem('tab-folders');
      const savedProgress = localStorage.getItem('tab-progress');
      const savedSettings = localStorage.getItem('tab-settings');

      if (savedTabs) setTabs(JSON.parse(savedTabs));
      if (savedFolders) setFolders(JSON.parse(savedFolders));
      if (savedProgress) setProgress(JSON.parse(savedProgress));
      if (savedSettings) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
    } catch (error) {
      console.error('Error loading tab data:', error);
    }
  }, []);

  // Save data to localStorage
  const saveData = useCallback(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('tab-folders', JSON.stringify(folders));
    localStorage.setItem('tab-progress', JSON.stringify(progress));
    localStorage.setItem('tab-settings', JSON.stringify(settings));
  }, [tabs, folders, progress, settings]);

  useEffect(() => {
    saveData();
  }, [saveData]);

  // Sync currentTab changes to tabs list
  useEffect(() => {
    if (currentTab) {
      setTabs(prev => prev.map(tab =>
        tab.id === currentTab.id ? currentTab : tab
      ));
    }
  }, [currentTab]);

  // Tab management
  const addTab = useCallback((tab: Omit<Tab, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTab: Tab = {
      ...tab,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTabs(prev => [...prev, newTab]);
    toast.success(`Таб "${tab.metadata.title}" добавлен`);
    return newTab;
  }, []);

  const updateTab = useCallback((tabId: string, updates: Partial<Tab>) => {
    if (currentTab && currentTab.id === tabId) {
      setCurrentTabHistory({ ...currentTab, ...updates, updatedAt: Date.now() });
    } else {
      setTabs(prev => prev.map(tab =>
        tab.id === tabId
          ? { ...tab, ...updates, updatedAt: Date.now() }
          : tab
      ));
    }
    // Toast is annoying on every keystroke/update, maybe remove or debounce?
    // toast.success('Таб обновлен'); 
  }, [currentTab, setCurrentTabHistory]);

  const deleteTab = useCallback((tabId: string) => {
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    setProgress(prev => prev.filter(p => p.tabId !== tabId));
    if (currentTab?.id === tabId) {
      resetCurrentTab(null);
    }
    toast.success('Таб удален');
  }, [currentTab, resetCurrentTab]);

  const duplicateTab = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      const duplicate = {
        ...tab,
        metadata: {
          ...tab.metadata,
          title: `${tab.metadata.title} (копия)`,
        },
      };
      delete (duplicate as any).id;
      delete (duplicate as any).createdAt;
      delete (duplicate as any).updatedAt;
      addTab(duplicate);
    }
  }, [tabs, addTab]);

  // Folder management
  const createFolder = useCallback((name: string, parentId?: string) => {
    const folder: TabLibraryFolder = {
      id: Date.now().toString(),
      name,
      tabIds: [],
      parentId,
      createdAt: Date.now(),
    };
    setFolders(prev => [...prev, folder]);
    toast.success(`Папка "${name}" создана`);
    return folder;
  }, []);

  const addTabToFolder = useCallback((tabId: string, folderId: string) => {
    setFolders(prev => prev.map(folder =>
      folder.id === folderId
        ? { ...folder, tabIds: [...folder.tabIds, tabId] }
        : folder
    ));
  }, []);

  const deleteFolder = useCallback((folderId: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== folderId));
    toast.success('Папка удалена');
  }, []);

  const loadTab = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      resetCurrentTab(tab);
      setPlayback(prev => ({
        ...prev,
        tempo: tab.metadata.tempo,
        isPlaying: false,
        currentSection: 0,
        currentMeasure: 0,
        currentBeat: 0,
      }));
      toast.success(`Таб "${tab.metadata.title}" загружен`);
    }
  }, [tabs, resetCurrentTab]);

  // Progress tracking
  const updateProgress = useCallback((tabId: string, updates: Partial<TabProgress>) => {
    setProgress(prev => {
      const existing = prev.find(p => p.tabId === tabId);
      if (existing) {
        return prev.map(p => p.tabId === tabId ? { ...p, ...updates } : p);
      } else {
        return [...prev, {
          tabId,
          learnedSections: [],
          practiceTime: 0,
          lastPracticed: Date.now(),
          difficulty: 5,
          notes: '',
          bookmarkedMeasures: [],
          ...updates
        }];
      }
    });
  }, []);

  const getTabProgress = useCallback((tabId: string) => {
    return progress.find(p => p.tabId === tabId);
  }, [progress]);

  // Playback control
  const playTab = useCallback(() => {
    setPlayback(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pauseTab = useCallback(() => {
    setPlayback(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const stopTab = useCallback(() => {
    setPlayback(prev => ({
      ...prev,
      isPlaying: false,
      currentSection: 0,
      currentMeasure: 0,
      currentBeat: 0,
    }));
  }, []);

  const setPlaybackPosition = useCallback((section: number, measure: number, beat: number = 0) => {
    setPlayback(prev => ({
      ...prev,
      currentSection: section,
      currentMeasure: measure,
      currentBeat: beat,
    }));
  }, []);

  const updatePlayback = useCallback((updates: Partial<TabPlayback>) => {
    setPlayback(prev => ({ ...prev, ...updates }));
  }, []);

  const updateEditor = useCallback((updates: Partial<TabEditor>) => {
    setEditor(prev => ({ ...prev, ...updates }));
  }, []);

  const saveTab = useCallback(() => {
    if (currentTab) {
      updateTab(currentTab.id, currentTab);
      toast.success('Таб сохранен');
    }
  }, [currentTab, updateTab]);

  // File import/export
  const importTab = useCallback(async (file: File) => {
    try {
      const text = await file.text();
      let tabData: any;

      if (file.name.endsWith('.json')) {
        tabData = JSON.parse(text);
      } else if (file.name.endsWith('.txt')) {
        // Simple text tab parser
        tabData = parseTextTab(text, file.name);
      } else {
        throw new Error('Неподдерживаемый формат файла');
      }

      const newTab = addTab(tabData);
      resetCurrentTab(newTab);
      toast.success(`Таб "${tabData.metadata.title}" импортирован`);
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Ошибка импорта файла');
    }
  }, [addTab]);

  const exportTab = useCallback((tabId: string, format: 'json' | 'txt' = 'json') => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;

    let content: string;
    let filename: string;

    if (format === 'json') {
      content = JSON.stringify(tab, null, 2);
      filename = `${tab.metadata.title}.json`;
    } else {
      content = convertTabToText(tab);
      filename = `${tab.metadata.title}.txt`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [tabs]);

  const copyMeasure = useCallback(() => {
    if (!currentTab) return;

    const currentSection = currentTab.sections[0]; // Simplified for now
    const measure = currentSection?.measures[editor.selectedMeasure];

    if (measure) {
      setEditor(prev => ({ ...prev, clipboard: measure.notes }));
      toast.success('Measure copied');
    }
  }, [currentTab, editor.selectedMeasure]);

  const pasteMeasure = useCallback(() => {
    if (!currentTab || !editor.clipboard) return;

    const updatedSections = [...currentTab.sections];
    const currentSection = updatedSections[0]; // Simplified

    if (currentSection && currentSection.measures[editor.selectedMeasure]) {
      currentSection.measures[editor.selectedMeasure] = {
        ...currentSection.measures[editor.selectedMeasure],
        notes: JSON.parse(JSON.stringify(editor.clipboard)) // Deep copy
      };

      setCurrentTabHistory({ ...currentTab, sections: updatedSections, updatedAt: Date.now() });
      toast.success('Measure pasted');
    }
  }, [currentTab, editor.clipboard, editor.selectedMeasure, setCurrentTabHistory]);

  // Tuning integration
  const setTuningFromTab = useCallback((tab: Tab) => {
    const tunings = getAllTunings();
    const matchingTuning = tunings.find(t => t.id === tab.metadata.tuning);
    if (matchingTuning) {
      selectTuning(matchingTuning.id);
      toast.success(`Строй изменен на ${matchingTuning.name}`);
    }
  }, [getAllTunings, selectTuning]);

  return {
    // Data
    tabs,
    folders,
    progress,
    currentTab,
    playback,
    editor,
    settings,

    // Tab management
    addTab,
    updateTab,
    deleteTab,
    duplicateTab,
    setCurrentTab: resetCurrentTab,
    undo,
    redo,
    canUndo,
    canRedo,

    // Folder management
    createFolder,
    deleteFolder,
    addTabToFolder,
    loadTab,

    // Progress tracking
    updateProgress,
    getTabProgress,

    // Playback
    playTab,
    pauseTab,
    stopTab,
    setPlaybackPosition,
    setPlayback,
    updatePlayback,

    // Editor
    setEditor,
    updateEditor,
    saveTab,
    copyMeasure,
    pasteMeasure,

    // Settings
    setSettings,

    // Import/Export
    importTab,
    exportTab,

    // Tuning integration
    setTuningFromTab,
  };
};

// Helper functions
function parseTextTab(text: string, filename: string): Omit<Tab, 'id' | 'createdAt' | 'updatedAt'> {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const title = filename.replace(/\.[^/.]+$/, '');

  // Extract metadata from comments or first lines
  let artist = 'Unknown';
  let tempo = 120;
  let difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert' = 'intermediate';

  // Look for metadata in comments
  const metadataLines = lines.filter(line => line.startsWith('//') || line.startsWith('#'));
  metadataLines.forEach(line => {
    const content = line.replace(/^[#/]+\s*/, '').toLowerCase();
    if (content.includes('artist:') || content.includes('by ')) {
      artist = content.replace(/^.*?(artist:|by)\s*/i, '').trim();
    }
    if (content.includes('tempo:') || content.includes('bpm')) {
      const tempoMatch = content.match(/(\d+)\s*(bpm|tempo)/i);
      if (tempoMatch) tempo = parseInt(tempoMatch[1]);
    }
    if (content.includes('difficulty:')) {
      const diff = content.replace(/^.*?difficulty:\s*/i, '').trim();
      if (['beginner', 'intermediate', 'advanced', 'expert'].includes(diff)) {
        difficulty = diff as any;
      }
    }
  });

  // Parse tab sections
  const sections: any[] = [];
  let currentSection: any = null;
  let currentMeasure: any = null;
  const stringLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Section markers [Verse], [Chorus], etc.
    if (line.match(/^\[.*\]$/)) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        name: line.replace(/[\[\]]/g, ''),
        measures: []
      };
      stringLines.length = 0;
      continue;
    }

    // Tab lines starting with string names (e|B|G|D|A|E)
    if (line.match(/^[eEbBgGdDaA]\|/)) {
      stringLines.push(line);

      // If we have all 6 strings, process them
      if (stringLines.length === 6) {
        const measure = parseMeasureFromStrings(stringLines);
        if (!currentSection) {
          currentSection = { name: 'Main', measures: [] };
        }
        currentSection.measures.push(measure);
        stringLines.length = 0;
      }
    }
  }

  // Add final section
  if (currentSection && currentSection.measures.length > 0) {
    sections.push(currentSection);
  }

  // If no sections found, create a default one
  if (sections.length === 0) {
    sections.push({
      name: 'Main',
      measures: [{
        notes: [[], [], [], [], [], []],
        timeSignature: { numerator: 4, denominator: 4 },
        tempo: tempo,
      }]
    });
  }

  return {
    metadata: {
      title,
      artist,
      tuning: 'standard-e',
      difficulty,
      genre: 'Rock',
      tempo,
      timeSignature: { numerator: 4, denominator: 4 },
      tags: ['imported'],
    },
    sections,
    source: 'imported',
  };
}

function parseMeasureFromStrings(stringLines: string[]): any {
  const notes: any[][] = [[], [], [], [], [], []];

  stringLines.forEach((line, stringIndex) => {
    // Remove string name and pipes
    const tabPart = line.replace(/^[eEbBgGdDaA]\|/, '').replace(/\|$/, '');

    // Extract fret numbers
    const fretMatches = [...tabPart.matchAll(/(\d+)/g)];
    fretMatches.forEach((match, position) => {
      const fret = parseInt(match[1]);
      if (!isNaN(fret)) {
        notes[stringIndex].push({
          fret,
          string: stringIndex + 1,
          duration: 1,
        });
      }
    });
  });

  return {
    notes,
    timeSignature: { numerator: 4, denominator: 4 },
    tempo: 120,
  };
}

function convertTabToText(tab: Tab): string {
  // Convert tab back to text format - simplified version
  let output = `${tab.metadata.title} - ${tab.metadata.artist}\n`;
  output += `Tuning: ${tab.metadata.tuning}\n`;
  output += `Tempo: ${tab.metadata.tempo}\n\n`;

  tab.sections.forEach(section => {
    if (section.name) {
      output += `[${section.name}]\n`;
    }
    output += 'e|----|\n';
    output += 'B|----|\n';
    output += 'G|----|\n';
    output += 'D|----|\n';
    output += 'A|----|\n';
    output += 'E|----|\n\n';
  });

  return output;
}