'use client';

import { createContext, useContext, useState } from 'react';
import ptContent from '../../content/pt.json';
import enContent from '../../content/en.json';

const content = { pt: ptContent, en: enContent };
const defaultLang = 'pt';
const FADE_MS = 260;

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(defaultLang);
  const [transitioning, setTransitioning] = useState(false);

  const setLang = (nextLang) => {
    if (nextLang === lang || transitioning) return;

    setTransitioning(true);
    setTimeout(() => {
      setLangState(nextLang);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitioning(false));
      });
    }, FADE_MS);
  };

  const t = content[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease`,
          pointerEvents: transitioning ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
