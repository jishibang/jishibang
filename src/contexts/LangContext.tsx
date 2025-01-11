import React, { createContext, useContext, useState } from 'react';

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  zh: {
    'app.name': '急事帮',
    'home.title': '欢迎来到急事帮',
    'home.subtitle': '找到您需要的服务',
    'header.login': '登录',
    'header.register': '注册',
    'header.logout': '退出',
    'header.profile': '个人中心',
    'header.switchLang': '切换语言',
    'footer.about': '关于我们',
    'footer.contact': '联系我们',
    'footer.terms': '服务条款',
    'footer.privacy': '隐私政策',
    'footer.rights': '保留所有权利',
    'footer.description': '急事帮是您身边的生活服务平台，为您提供便捷、可靠的服务。',
    'footer.phone': '电话',
    'footer.email': '邮箱',
    'footer.address': '地址',
    'footer.links': '快速链接',
    'footer.aboutUs': '关于我们',
    'footer.contactUs': '联系我们',
    'footer.help': '帮助中心',
    'footer.join': '加入我们',
  },
  en: {
    'app.name': 'Quick Help',
    'home.title': 'Welcome to Quick Help',
    'home.subtitle': 'Find the service you need',
    'header.login': 'Login',
    'header.register': 'Register',
    'header.logout': 'Logout',
    'header.profile': 'Profile',
    'header.switchLang': 'Switch Language',
    'footer.about': 'About Us',
    'footer.contact': 'Contact Us',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.rights': 'All rights reserved',
    'footer.description': 'Quick Help is your local service platform, providing convenient and reliable services.',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.address': 'Address',
    'footer.links': 'Quick Links',
    'footer.aboutUs': 'About Us',
    'footer.contactUs': 'Contact Us',
    'footer.help': 'Help Center',
    'footer.join': 'Join Us',
  },
};

interface LangContextType {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'zh',
  setLang: () => {},
  t: (key: string) => key,
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState('zh');

  const t = (key: string) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);

export default LangContext;