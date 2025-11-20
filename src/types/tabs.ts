export interface TabNote {
  fret: number;
  string: number; // 1-6 or 1-7 for guitar
  duration?: number;
  technique?: 'bend' | 'slide' | 'hammer' | 'pull' | 'vibrato' | 'palm-mute';
}

export interface TabMeasure {
  notes: TabNote[][];
  timeSignature?: { numerator: number; denominator: number };
  tempo?: number;
}

export interface TabSection {
  name?: string;
  measures: TabMeasure[];
  repeat?: number;
}

export interface TabMetadata {
  title: string;
  artist: string;
  album?: string;
  tuning: string; // tuning ID from tuning types
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  genre: string;
  tempo: number;
  timeSignature: { numerator: number; denominator: number };
  capo?: number;
  tags: string[];
}

export interface Tab {
  id: string;
  metadata: TabMetadata;
  sections: TabSection[];
  lyrics?: { [measureIndex: string]: string };
  chords?: { [measureIndex: string]: string[] };
  createdAt: number;
  updatedAt: number;
  source?: 'user' | 'imported' | 'ultimate-guitar' | 'songsterr';
}

export interface TabLibraryFolder {
  id: string;
  name: string;
  tabIds: string[];
  parentId?: string;
  createdAt: number;
}

export interface TabProgress {
  tabId: string;
  learnedSections: string[];
  practiceTime: number;
  lastPracticed: number;
  difficulty: number; // 1-10
  notes: string;
  bookmarkedMeasures: number[];
}

export interface TabPlayback {
  isPlaying: boolean;
  currentSection: number;
  currentMeasure: number;
  currentBeat: number;
  tempo: number;
  loop?: { start: number; end: number };
  speed: number; // 0.5 to 2.0
}

export interface TabEditor {
  selectedMeasure: number;
  selectedBeat: number;
  selectedString: number;
  tool: 'select' | 'note' | 'chord' | 'text';
  clipboard?: TabNote[][];
}

export interface TabSettings {
  autoScroll: boolean;
  showFretNumbers: boolean;
  showChords: boolean;
  showLyrics: boolean;
  highlightCurrentPosition: boolean;
  fretboardView: boolean;
  practiceMode: boolean;
  mistakeHighlighting: boolean;
}