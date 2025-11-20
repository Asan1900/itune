import React, { ReactNode } from 'react';
import { LanguageContext, useLanguageSettings } from '@/hooks/useLanguage';
import { translations } from '@/i18n/translations';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguageSettings();

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      availableLanguages,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}