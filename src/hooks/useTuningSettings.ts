import { useState, useEffect, useCallback } from 'react';
import { Tuning, UserSettings, TuningHistory, PRESET_TUNINGS } from '@/types/tuning';

const STORAGE_KEY = 'itunenote-tuner-settings';

const DEFAULT_SETTINGS: UserSettings = {
  selectedTuningId: 'standard-e',
  selectedInstrument: 'guitar',
  theme: 'dark',
  customTunings: [],
  tuningHistory: [],
};

export function useTuningSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = useCallback((newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  }, []);

  // Get all available tunings (preset + custom)
  const getAllTunings = useCallback((): Tuning[] => {
    return [...PRESET_TUNINGS, ...settings.customTunings];
  }, [settings.customTunings]);

  // Get tunings for specific instrument
  const getTuningsForInstrument = useCallback((instrument: UserSettings['selectedInstrument']): Tuning[] => {
    return getAllTunings().filter(t => t.instrument === instrument);
  }, [getAllTunings]);

  // Get current tuning
  const getCurrentTuning = useCallback((): Tuning | undefined => {
    return getAllTunings().find(t => t.id === settings.selectedTuningId);
  }, [getAllTunings, settings.selectedTuningId]);

  // Select tuning
  const selectTuning = useCallback((tuningId: string) => {
    const newSettings = { ...settings, selectedTuningId: tuningId };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Add custom tuning
  const addCustomTuning = useCallback((tuning: Tuning) => {
    const newSettings = {
      ...settings,
      customTunings: [...settings.customTunings, tuning],
    };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Remove custom tuning
  const removeCustomTuning = useCallback((tuningId: string) => {
    const newSettings = {
      ...settings,
      customTunings: settings.customTunings.filter(t => t.id !== tuningId),
    };
    // If we're removing the currently selected tuning, switch to standard
    if (settings.selectedTuningId === tuningId) {
      newSettings.selectedTuningId = 'standard-e';
    }
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Set theme
  const setTheme = useCallback((theme: UserSettings['theme']) => {
    const newSettings = { ...settings, theme };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Set instrument
  const setInstrument = useCallback((instrument: UserSettings['selectedInstrument']) => {
    const newSettings = { ...settings, selectedInstrument: instrument };
    // При смене инструмента выбираем первый подходящий строй
    const instrumentTunings = getAllTunings().filter(t => t.instrument === instrument);
    if (instrumentTunings.length > 0) {
      newSettings.selectedTuningId = instrumentTunings[0].id;
    }
    saveSettings(newSettings);
  }, [settings, saveSettings, getAllTunings]);

  // Add tuning history entry
  const addTuningHistory = useCallback((entry: Omit<TuningHistory, 'timestamp'>) => {
    const historyEntry: TuningHistory = {
      ...entry,
      timestamp: Date.now(),
    };

    const newHistory = [historyEntry, ...settings.tuningHistory]
      .slice(0, 100); // Keep only last 100 entries

    const newSettings = {
      ...settings,
      tuningHistory: newHistory,
    };
    saveSettings(newSettings);
  }, [settings, saveSettings]);

  // Get string accuracy for current tuning
  const getStringAccuracies = useCallback(() => {
    const currentTuning = getCurrentTuning();
    if (!currentTuning) return [];

    return currentTuning.notes.map((note, index) => {
      const recentHistory = settings.tuningHistory
        .filter(h => h.stringIndex === index)
        .slice(0, 5); // Last 5 attempts for this string

      if (recentHistory.length === 0) return null;

      const avgAccuracy = recentHistory.reduce((sum, h) => sum + h.accuracy, 0) / recentHistory.length;
      return Math.abs(avgAccuracy);
    });
  }, [getCurrentTuning, settings.tuningHistory]);

  return {
    settings,
    currentTuning: getCurrentTuning(),
    getAllTunings,
    getTuningsForInstrument,
    getCurrentTuning,
    selectTuning,
    addCustomTuning,
    removeCustomTuning,
    setTheme,
    setInstrument,
    addTuningHistory,
    getStringAccuracies,
  };
}