import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import { useTuningSettings } from '@/hooks/useTuningSettings';
import { useLanguage } from '@/hooks/useLanguage';
import { useEffect } from 'react';

const THEMES = [
  { id: 'dark', nameKey: 'theme.dark', descKey: 'theme.desc.dark' },
  { id: 'retro', nameKey: 'theme.retro', descKey: 'theme.desc.retro' },
  { id: 'amoled', nameKey: 'theme.amoled', descKey: 'theme.desc.amoled' },
  { id: 'neon', nameKey: 'theme.neon', descKey: 'theme.desc.neon' },
  { id: 'forest', nameKey: 'theme.forest', descKey: 'theme.desc.forest' },
  { id: 'sunset', nameKey: 'theme.sunset', descKey: 'theme.desc.sunset' },
  { id: 'ocean', nameKey: 'theme.ocean', descKey: 'theme.desc.ocean' },
  { id: 'vintage', nameKey: 'theme.vintage', descKey: 'theme.desc.vintage' },
] as const;

export function ThemeSelector() {
  const { settings, setTheme } = useTuningSettings();
  const { t } = useLanguage();
  const selectedTheme = THEMES.find(theme => theme.id === settings.theme);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Palette className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('theme.title')}</h3>
      </div>

      <Select value={settings.theme} onValueChange={setTheme}>
        <SelectTrigger className="w-full h-auto p-4 flex flex-col items-start gap-2 text-left">
          <div className="flex items-center gap-2 w-full">
            <span className="font-medium text-base">
              {selectedTheme ? t(selectedTheme.nameKey) : settings.theme}
            </span>
          </div>
          {selectedTheme && (
            <div className="text-sm text-muted-foreground w-full">
              {t(selectedTheme.descKey)}
            </div>
          )}
        </SelectTrigger>
        <SelectContent>
          {THEMES.map((theme) => (
            <SelectItem key={theme.id} value={theme.id}>
              <div>
                <div className="font-medium">{t(theme.nameKey)}</div>
                <div className="text-xs text-muted-foreground">{t(theme.descKey)}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

  );
}