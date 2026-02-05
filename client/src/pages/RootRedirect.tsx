import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function RootRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // 检查本地存储中的语言偏好
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en' || savedLang === 'zh') {
      setLocation(`/${savedLang}`);
    } else {
      // 根据浏览器语言自动检测
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') {
        setLocation('/en');
      } else {
        setLocation('/zh');
      }
    }
  }, [setLocation]);

  return null;
}
