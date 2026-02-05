import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export function SEOMeta({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonicalUrl,
}: SEOMetaProps) {
  const { language } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Set language meta tag
    let htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang !== language) {
      document.documentElement.setAttribute('lang', language);
    }

    // Set Open Graph tags
    if (ogTitle) {
      let ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (!ogTitleTag) {
        ogTitleTag = document.createElement('meta');
        ogTitleTag.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitleTag);
      }
      ogTitleTag.setAttribute('content', ogTitle);
    }

    if (ogDescription) {
      let ogDescTag = document.querySelector('meta[property="og:description"]');
      if (!ogDescTag) {
        ogDescTag = document.createElement('meta');
        ogDescTag.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescTag);
      }
      ogDescTag.setAttribute('content', ogDescription);
    }

    if (ogImage) {
      let ogImageTag = document.querySelector('meta[property="og:image"]');
      if (!ogImageTag) {
        ogImageTag = document.createElement('meta');
        ogImageTag.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageTag);
      }
      ogImageTag.setAttribute('content', ogImage);
    }

    // Set canonical URL
    if (canonicalUrl) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonicalUrl);
    }

    // Set hreflang tags
    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname.replace(/^\/(en|zh)/, '');

    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(tag => tag.remove());

    // Add hreflang for both languages
    const zhHreflang = document.createElement('link');
    zhHreflang.setAttribute('rel', 'alternate');
    zhHreflang.setAttribute('hreflang', 'zh');
    zhHreflang.setAttribute('href', `${baseUrl}/zh${currentPath}`);
    document.head.appendChild(zhHreflang);

    const enHreflang = document.createElement('link');
    enHreflang.setAttribute('rel', 'alternate');
    enHreflang.setAttribute('hreflang', 'en');
    enHreflang.setAttribute('href', `${baseUrl}/en${currentPath}`);
    document.head.appendChild(enHreflang);

    // Add x-default hreflang
    const xDefaultHreflang = document.createElement('link');
    xDefaultHreflang.setAttribute('rel', 'alternate');
    xDefaultHreflang.setAttribute('hreflang', 'x-default');
    xDefaultHreflang.setAttribute('href', `${baseUrl}/en${currentPath}`);
    document.head.appendChild(xDefaultHreflang);
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, language]);

  return null;
}
