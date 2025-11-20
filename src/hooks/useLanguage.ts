import { useState, useEffect, createContext, useContext } from 'react';

export type SupportedLanguage = 'ru' | 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it' | 'ja' | 'ko' | 'zh';

export interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  availableLanguages: { code: SupportedLanguage; name: string; nativeName: string }[];
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const useLanguageSettings = () => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('ru');

  const availableLanguages = [
    { code: 'ru' as const, name: 'Russian', nativeName: 'Русский' },
    { code: 'en' as const, name: 'English', nativeName: 'English' },
    { code: 'es' as const, name: 'Spanish', nativeName: 'Español' },
    { code: 'fr' as const, name: 'French', nativeName: 'Français' },
    { code: 'de' as const, name: 'German', nativeName: 'Deutsch' },
    { code: 'pt' as const, name: 'Portuguese', nativeName: 'Português' },
    { code: 'it' as const, name: 'Italian', nativeName: 'Italiano' },
    { code: 'ja' as const, name: 'Japanese', nativeName: '日本語' },
    { code: 'ko' as const, name: 'Korean', nativeName: '한국어' },
    { code: 'zh' as const, name: 'Chinese', nativeName: '中文' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language') as SupportedLanguage;
    if (saved && availableLanguages.some(lang => lang.code === saved)) {
      setCurrentLanguage(saved);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.slice(0, 2) as SupportedLanguage;
      if (availableLanguages.some(lang => lang.code === browserLang)) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  return {
    currentLanguage,
    setLanguage,
    availableLanguages,
  };
};