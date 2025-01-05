import React from "react";
import { useLang } from "../../contexts/LangContext";
import type { Lang } from "../../contexts/LangContext";
const LanguageSwitch: React.FC = () => {
  const { currentLang, setLang } = useLang();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value as Lang);
  };
  return (
    <div className="relative inline-block text-left">
      <select
        value={currentLang}
        onChange={handleChange}
        className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="zh-CN">简体中文</option>
        <option value="zh-TW">繁體中文</option>
        <option value="en-US">English</option>
      </select>
    </div>
  );
};
export default LanguageSwitch;
