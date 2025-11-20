import React, { useEffect, useState } from 'react';
import { useAudioSettings } from '@/hooks/useAudioSettings';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Mic } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const AudioSettings = () => {
    const { settings, setDeviceId, setNoiseThreshold, setSensitivity } = useAudioSettings();
    const { t } = useLanguage();
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const selectedDevice = devices.find(d => d.deviceId === settings.deviceId) || (settings.deviceId === 'default' ? { label: 'Default', deviceId: 'default' } : null);

    useEffect(() => {
        const getDevices = async () => {
            try {
                // Request permission first to get labels
                await navigator.mediaDevices.getUserMedia({ audio: true });

                const allDevices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = allDevices.filter(device => device.kind === 'audioinput');
                setDevices(audioInputs);
            } catch (error) {
                console.error('Error getting devices:', error);
            }
        };

        getDevices();

        // Listen for device changes
        navigator.mediaDevices.addEventListener('devicechange', getDevices);
        return () => navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Mic className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{t('settings.audio.title') || 'Audio Settings'}</h3>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>{t('settings.audio.input') || 'Input Device'}</Label>
                    <Select value={settings.deviceId} onValueChange={setDeviceId}>
                        <SelectTrigger className="w-full h-auto p-4 flex flex-col items-start gap-2 text-left">
                            <div className="flex items-center gap-2 w-full">
                                <span className="font-medium text-base">
                                    {selectedDevice ? (selectedDevice.label || `Microphone ${selectedDevice.deviceId.slice(0, 5)}...`) : 'Select microphone'}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground w-full">
                                {t('settings.audio.input') || 'Input Device'}
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            {devices.map(device => (
                                <SelectItem key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>{t('settings.audio.sensitivity') || 'Microphone Sensitivity'}</Label>
                        <span className="text-sm text-muted-foreground">{Math.round(settings.sensitivity * 100)}%</span>
                    </div>
                    <Slider
                        value={[settings.sensitivity]}
                        min={0.1}
                        max={5.0}
                        step={0.1}
                        onValueChange={([value]) => setSensitivity(value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        {t('settings.audio.sensitivity.desc') || 'Adjust input gain. Increase if tuner doesn\'t pick up sound.'}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>{t('settings.audio.threshold') || 'Noise Gate Threshold'}</Label>
                        <span className="text-sm text-muted-foreground">{Math.round(settings.noiseThreshold * 1000)}</span>
                    </div>
                    <Slider
                        value={[settings.noiseThreshold]}
                        min={0.001}
                        max={0.1}
                        step={0.001}
                        onValueChange={([value]) => setNoiseThreshold(value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        {t('settings.audio.threshold.desc') || 'Minimum volume level to detect. Increase to ignore background noise.'}
                    </p>
                </div>
            </div>
        </div>
    );
};
