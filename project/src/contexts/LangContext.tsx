import React, { createContext, useContext, useState } from "react";
import enUS from "../locales/en-US";
import zhCN from "../locales/zh-CN";
import zhTW from "../locales/zh-TW";
export type Lang = "en-US" | "zh-CN" | "zh-TW";
type TranslationParams = Record<string, string | number>;
const translations = {
  "en-US": enUS,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
} as const;
const LangContext = createContext<{
  t: (key: string, params?: TranslationParams) => string;
  currentLang: Lang;
  setLang: (lang: Lang) => void;
}>({
  t: () => "",
  currentLang: "zh-CN",
  setLang: () => {},
});
export const LangProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLang, setCurrentLang] = useState<Lang>("zh-CN");
  const t = (key: string, params?: TranslationParams): string => {
    const keys = key.split(".");
    let value: any = translations[currentLang];
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value !== "string") {
      return key;
    }
    if (params) {
      return Object.entries(params).reduce(
        (str, [key, val]) => str.replace(`{${key}}`, String(val)),
        value
      );
    }
    return value;
  };
  return (
    <LangContext.Provider
      value={{
        t,
        currentLang,
        setLang: setCurrentLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
};
export const useLang = () => useContext(LangContext);
