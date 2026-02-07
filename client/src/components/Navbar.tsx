import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: string;
}

export default function Navbar() {
  const [, setLocation] = useLocation();
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);

  // 获取新闻数据
  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      try {
        // 使用 NewsAPI 获取航空和无人机相关新闻
        const keywords = language === 'zh' ? '无人机 航空' : 'drone aviation aircraft';
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&sortBy=publishedAt&language=${language === 'zh' ? 'zh' : 'en'}&pageSize=5&apiKey=demo`
        );
        
        if (response.ok) {
          const data = await response.json();
          const formattedNews = data.articles?.slice(0, 5).map((article: any) => ({
            id: article.url,
            title: article.title,
            description: article.description || article.content?.substring(0, 100),
            url: article.url,
            image: article.urlToImage || 'https://via.placeholder.com/100',
            publishedAt: article.publishedAt,
            source: article.source.name,
          })) || [];
          setNews(formattedNews);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        // 使用本地示例数据作为备选
        setNews(getLocalNews());
      }
      setLoadingNews(false);
    };

    fetchNews();
  }, [language]);

  const getLocalNews = (): NewsItem[] => {
    if (language === 'zh') {
      return [
        {
          id: '1',
          title: '全球无人机市场规模持续增长',
          description: '根据最新市场研究报告，全球无人机市场在2024年保持强劲增长势头...',
          url: '#',
          image: 'https://via.placeholder.com/100',
          publishedAt: new Date().toISOString(),
          source: '科技新闻',
        },
        {
          id: '2',
          title: '航空航天企业加大研发投入',
          description: '多家国际航空航天企业宣布增加研发预算，重点投入新型飞行器开发...',
          url: '#',
          image: 'https://via.placeholder.com/100',
          publishedAt: new Date().toISOString(),
          source: '行业报告',
        },
      ];
    } else {
      return [
        {
          id: '1',
          title: 'Global Drone Market Shows Strong Growth',
          description: 'The global drone market continues to expand with increasing adoption in various industries...',
          url: '#',
          image: 'https://via.placeholder.com/100',
          publishedAt: new Date().toISOString(),
          source: 'Tech News',
        },
        {
          id: '2',
          title: 'Aerospace Companies Boost R&D Investments',
          description: 'Major aerospace companies announce increased funding for next-generation aircraft development...',
          url: '#',
          image: 'https://via.placeholder.com/100',
          publishedAt: new Date().toISOString(),
          source: 'Industry Report',
        },
      ];
    }
  };

  const menuItems = language === 'zh' 
    ? [
        { label: '首页', path: '/zh' },
        { label: '关于我们', path: '/zh/about' },
        { label: '联系我们', path: '/zh/contact' },
      ]
    : [
        { label: 'Home', path: '/en' },
        { label: 'About Us', path: '/en/about' },
        { label: 'Contact Us', path: '/en/contact' },
      ];

  const newsLabel = language === 'zh' ? '新闻' : 'News';
  const viewMoreLabel = language === 'zh' ? '查看全部' : 'View All';

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-purple-500/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLocation(`/${language}`)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">极</span>
            </div>
            <span className="text-lg font-bold text-white hidden sm:inline">
              {language === 'zh' ? '极紫星' : 'SAUVS'}
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                className="text-gray-300 hover:text-white transition duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* News Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-200 font-medium">
                {newsLabel}
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-0 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4">
                {loadingNews ? (
                  <div className="px-4 py-8 text-center text-gray-400">
                    {language === 'zh' ? '加载中...' : 'Loading...'}
                  </div>
                ) : news.length > 0 ? (
                  <>
                    {news.slice(0, 3).map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 hover:bg-slate-700 transition border-b border-slate-700 last:border-b-0"
                      >
                        <h4 className="text-sm font-semibold text-white line-clamp-2 hover:text-cyan-400">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">{item.source}</p>
                      </a>
                    ))}
                    <button
                      onClick={() => setLocation(`/${language}/news`)}
                      className="w-full px-4 py-3 text-center text-cyan-400 hover:text-cyan-300 font-semibold text-sm border-t border-slate-700"
                    >
                      {viewMoreLabel} →
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-400">
                    {language === 'zh' ? '暂无新闻' : 'No news available'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Language Switch & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <div className="flex gap-2">
              <Button
                variant={language === 'zh' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('zh')}
                className="text-xs"
              >
                中文
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="text-xs"
              >
                EN
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-2 pb-4"
            >
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    setLocation(item.path);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded transition"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile News */}
              <button
                onClick={() => {
                  setLocation(`/${language}/news`);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded transition"
              >
                {newsLabel}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
