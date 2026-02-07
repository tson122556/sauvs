import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function RootRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // 获取当前路径
    const currentPath = window.location.pathname;
    
    // 判断是否已经有语言前缀
    const hasLanguagePrefix = currentPath.startsWith('/zh') || currentPath.startsWith('/en');
    
    if (hasLanguagePrefix) {
      // 已经有语言前缀，不需要重定向
      return;
    }
    
    // 确定目标语言
    let targetLang = 'zh'; // 默认中文
    
    // 检查本地存储中的语言偏好
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en' || savedLang === 'zh') {
      targetLang = savedLang;
    } else {
      // 根据浏览器语言自动检测
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') {
        targetLang = 'en';
      }
    }
    
    // 构建新路径
    let newPath = currentPath === '/' ? `/${targetLang}` : `/${targetLang}${currentPath}`;
    setLocation(newPath);
  }, [setLocation]);

  return null;
}
