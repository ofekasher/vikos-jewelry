"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { translations, type Lang } from "./i18n";

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.en;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("vikos-lang") as Lang | null;
    if (saved === "he" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  // Keep <html> dir + lang in sync
  useEffect(() => {
    document.documentElement.dir  = translations[lang].dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("vikos-lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
// Shorthand: const t = useT(); — gives the full translation object for current lang
export const useT = () => useContext(LanguageContext).t;
