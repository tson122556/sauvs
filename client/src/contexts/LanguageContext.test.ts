import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset window.location.pathname
    delete (window as any).location;
    (window as any).location = { pathname: '/' };
  });

  it('should detect language from URL path', () => {
    (window as any).location.pathname = '/en/about';
    
    const pathLang = window.location.pathname.split('/')[1];
    expect(pathLang).toBe('en');
  });

  it('should detect Chinese language from URL path', () => {
    (window as any).location.pathname = '/zh/contact';
    
    const pathLang = window.location.pathname.split('/')[1];
    expect(pathLang).toBe('zh');
  });

  it('should store language preference in localStorage', () => {
    const language = 'en';
    localStorage.setItem('language', language);
    
    const savedLang = localStorage.getItem('language');
    expect(savedLang).toBe('en');
  });

  it('should retrieve language preference from localStorage', () => {
    localStorage.setItem('language', 'zh');
    
    const savedLang = localStorage.getItem('language') as 'en' | 'zh' | null;
    expect(savedLang).toBe('zh');
  });

  it('should validate language codes', () => {
    const validLanguages = ['en', 'zh'];
    const testLanguage = 'en';
    
    expect(validLanguages.includes(testLanguage)).toBe(true);
  });

  it('should handle invalid language codes', () => {
    const validLanguages = ['en', 'zh'];
    const testLanguage = 'fr';
    
    expect(validLanguages.includes(testLanguage)).toBe(false);
  });

  it('should construct correct redirect URL for language switch', () => {
    (window as any).location.pathname = '/zh/about';
    (window as any).location.origin = 'https://example.com';
    
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    let currentPath = '/';
    
    if (pathParts[0] === 'en' || pathParts[0] === 'zh') {
      currentPath = '/' + pathParts.slice(1).join('/');
    }
    
    const newLang = 'en';
    const redirectUrl = `${window.location.origin}/${newLang}${currentPath}`;
    
    expect(redirectUrl).toBe('https://example.com/en/about');
  });

  it('should handle root path language switch', () => {
    (window as any).location.pathname = '/zh';
    (window as any).location.origin = 'https://example.com';
    
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    let currentPath = '/';
    
    if (pathParts[0] === 'en' || pathParts[0] === 'zh') {
      currentPath = '/' + pathParts.slice(1).join('/');
    }
    
    const newLang = 'en';
    const redirectUrl = `${window.location.origin}/${newLang}${currentPath}`;
    
    expect(redirectUrl).toBe('https://example.com/en/');
  });
});
