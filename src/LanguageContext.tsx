import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language, type Translations } from './i18n/translations';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const defaultContextValue: LanguageContextType = {
  language: 'ar',
  isRTL: true,
  t: translations.ar,
  toggleLanguage: () => {},
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('blotx_lang');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch {
      // ignore
    }
    return 'ar';
  });

  const isRTL = language === 'ar';
  const t = translations[language];

  useEffect(() => {
    try {
      localStorage.setItem('blotx_lang', language);
    } catch {
      // ignore
    }

    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);

    if (language === 'en') {
      document.body.classList.add('font-en');
      document.body.classList.remove('font-ar');
    } else {
      document.body.classList.add('font-ar');
      document.body.classList.remove('font-en');
    }
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, t, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  return context || defaultContextValue;
};
