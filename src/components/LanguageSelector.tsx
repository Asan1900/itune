import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export function LanguageSelector() {
  const { currentLanguage, setLanguage, availableLanguages, t } = useLanguage();
  const selectedLang = availableLanguages.find(l => l.code === currentLanguage);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Languages className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">{t('language.title')}</h3>
      </div>

      <Select value={currentLanguage} onValueChange={setLanguage}>
        <SelectTrigger className="w-full h-auto p-4 flex flex-col items-start gap-2 text-left">
          <div className="flex items-center gap-2 w-full">
            <span className="font-medium text-base">
              {selectedLang?.nativeName || t('language.select')}
            </span>
          </div>
          {selectedLang && (
            <div className="text-sm text-muted-foreground w-full">
              {selectedLang.name}
            </div>
          )}
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center gap-2">
                <span>{language.nativeName}</span>
                <span className="text-muted-foreground text-xs">({language.name})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

  );
}