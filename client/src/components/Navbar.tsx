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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  // 获取新闻数据
  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      try {
        // 尝试从 NewsAPI 获取航空和无人机相关新闻
        const keywords = language === 'zh' ? '无人机 航空' : 'drone aviation aircraft';
        
        // 注意：需要使用真实的 NewsAPI 密钥
        // 可以在环境变量中配置：VITE_NEWS_API_KEY
        const apiKey = import.meta.env.VITE_NEWS_API_KEY || 'demo';
        
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&sortBy=publishedAt&language=${language === 'zh' ? 'zh' : 'en'}&pageSize=5&apiKey=${apiKey}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.articles && data.articles.length > 0) {
            const formattedNews = data.articles.slice(0, 5).map((article: any) => ({
              id: article.url,
              title: article.title,
              description: article.description || article.content?.substring(0, 100),
              url: article.url,
              image: article.urlToImage || 'https://via.placeholder.com/100',
              publishedAt: article.publishedAt,
              source: article.source.name,
            }));
            setNews(formattedNews);
            setLoadingNews(false);
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch news from API:', error);
      }
      
      // 如果 API 失败或没有结果，使用本地新闻数据
      setNews(getLocalNews());
      setLoadingNews(false);
    };

    fetchNews();
  }, [language]);

  const getLocalNews = (): NewsItem[] => {
    if (language === 'zh') {
      return [
        {
          id: '1',
          title: '全球无人机市场规模持续增长，预计2024年达到300亿美元',
          description: '根据最新市场研究报告，全球无人机市场在2024年保持强劲增长势头，工业级无人机应用不断拓展...',
          url: 'https://example.com/news/1',
          image: 'https://via.placeholder.com/300x200?text=Drone+Market',
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          source: '科技新闻',
        },
        {
          id: '2',
          title: '航空航天企业加大研发投入，新型飞行器技术取得突破',
          description: '多家国际航空航天企业宣布增加研发预算，重点投入新型飞行器开发和空中交通管理系统...',
          url: 'https://example.com/news/2',
          image: 'https://via.placeholder.com/300x200?text=Aerospace+Innovation',
          publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          source: '行业报告',
        },
        {
          id: '3',
          title: '人工智能在无人机自主导航中的应用前景广阔',
          description: '最新研究表明，AI 技术与无人机的结合将推动自主飞行和智能决策能力的发展...',
          url: 'https://example.com/news/3',
          image: 'https://via.placeholder.com/300x200?text=AI+Drones',
          publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          source: '技术动态',
        },
      ];
    } else {
      return [
        {
          id: '1',
          title: 'Global Drone Market Reaches $30 Billion, Expected to Grow Further in 2024',
          description: 'Latest market research shows the global drone market maintaining strong growth momentum, with expanding industrial applications...',
          url: 'https://example.com/news/1',
          image: 'https://via.placeholder.com/300x200?text=Drone+Market',
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          source: 'Tech News',
        },
        {
          id: '2',
          title: 'Aerospace Companies Boost R&D Investment, Breakthrough in Next-Gen Aircraft',
          description: 'Major aerospace companies announce increased funding for next-generation aircraft development and air traffic management systems...',
          url: 'https://example.com/news/2',
          image: 'https://via.placeholder.com/300x200?text=Aerospace+Innovation',
          publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          source: 'Industry Report',
        },
        {
          id: '3',
          title: 'AI Applications in Autonomous Drone Navigation Show Promising Future',
          description: 'New research indicates the combination of AI technology with drones will drive autonomous flight and intelligent decision-making capabilities...',
          url: 'https://example.com/news/3',
          image: 'https://via.placeholder.com/300x200?text=AI+Drones',
          publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          source: 'Tech Updates',
        },
      ];
    }
  };

  const menuItems = language === 'zh' 
    ? [
        { label: '产品中心', path: '#products' },
        { label: '解决方案', path: '#solutions' },
        { label: '技术服务', path: '#services' },
        { label: '关于我们', path: '/zh/about' },
        { label: 'AI 助手', path: '/zh/ai-hub' },
      ]
    : [
        { label: 'Products', path: '#products' },
        { label: 'Solutions', path: '#solutions' },
        { label: 'Services', path: '#services' },
        { label: 'About Us', path: '/en/about' },
        { label: 'AI Assistant', path: '/en/ai-hub' },
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
            <motion.img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
              alt={language === 'zh' ? '极紫星' : 'SAUVS'} 
              className="h-10 w-auto" 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
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
              <div className="absolute left-0 mt-0 w-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {news.length > 0 ? (
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
                      className="w-full px-4 py-3 text-center text-cyan-400 hover:text-cyan-300 font-semibold text-sm border-t border-slate-700 hover:bg-slate-700 transition"
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
