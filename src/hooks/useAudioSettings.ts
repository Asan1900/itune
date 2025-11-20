import { useState, useEffect, useCallback } from 'react';

export interface AudioSettings {
    deviceId: string;
    noiseThreshold: number; // 0 to 1 (amplitude)
    sensitivity: number; // 0 to 1 (microphone gain)
}

const STORAGE_KEY = 'itunenote-audio-settings';

const DEFAULT_SETTINGS: AudioSettings = {
    deviceId: 'default',
    noiseThreshold: 0.01, // Default RMS threshold
    sensitivity: 1.0, // Default gain (1.0 = no change)
};

export function useAudioSettings() {
    const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);

    // Load settings from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsedSettings = JSON.parse(saved);
                setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
            } catch (error) {
                console.error('Failed to parse saved audio settings:', error);
            }
        }
    }, []);

    // Save settings to localStorage
    const saveSettings = useCallback((newSettings: AudioSettings) => {
        setSettings(newSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    }, []);

    const setDeviceId = useCallback((deviceId: string) => {
        saveSettings({ ...settings, deviceId });
    }, [settings, saveSettings]);

    const setNoiseThreshold = useCallback((threshold: number) => {
        saveSettings({ ...settings, noiseThreshold: threshold });
    }, [settings, saveSettings]);

    const setSensitivity = useCallback((sensitivity: number) => {
        saveSettings({ ...settings, sensitivity });
    }, [settings, saveSettings]);

    return {
        settings,
        setDeviceId,
        setNoiseThreshold,
        setSensitivity,
    };
}
