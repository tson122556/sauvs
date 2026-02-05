import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded transition-colors ${
          language === 'en'
            ? 'text-purple-400 font-semibold'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <span className="text-gray-500">|</span>
      <button
        onClick={() => setLanguage('zh')}
        className={`px-2 py-1 rounded transition-colors ${
          language === 'zh'
            ? 'text-purple-400 font-semibold'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        中文
      </button>
    </div>
  );
}
