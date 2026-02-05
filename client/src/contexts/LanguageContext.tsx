import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 获取当前路径的语言
    const pathLang = window.location.pathname.split('/')[1];
    if (pathLang === 'en' || pathLang === 'zh') {
      setLanguageState(pathLang as Language);
    } else {
      // 检查本地存储中的语言偏好
      const savedLang = localStorage.getItem('language') as Language | null;
      if (savedLang) {
        setLanguageState(savedLang);
      } else {
        // 根据浏览器语言自动检测
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'en') {
          setLanguageState('en');
        } else {
          setLanguageState('zh');
        }
      }
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // 获取当前页面路径（去掉语言前缀）
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    let currentPath = '/';
    
    if (pathParts[0] === 'en' || pathParts[0] === 'zh') {
      currentPath = '/' + pathParts.slice(1).join('/');
    } else {
      currentPath = '/' + pathParts.join('/');
    }
    
    // 重定向到新语言版本的相同页面
    window.location.href = `/${lang}${currentPath}`;
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
