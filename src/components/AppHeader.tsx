import React from 'react';
import { useLanguage } from "@/hooks/useLanguage";

export const AppHeader = () => {
    const { t } = useLanguage();

    return (
        <div className="text-center mb-12 pt-12 animate-fade-in">
            <div className="relative inline-block">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-foreground">
                    {t('app.title')}
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl font-medium tracking-wide">
                    {t('app.subtitle')}
                </p>
            </div>
        </div>
    );
};
