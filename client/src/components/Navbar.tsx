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
          title: '2026年全球AI芯片市场突破2000亿美元，极紫星新品发布',
          description: '2026年全球人工智能芯片市场规模突破2000亿美元，极紫星推出新一代高性能AI处理器，性能提升50%...',
          url: 'https://www.cnbc.com/technology/ai-chips-2026',
          image: 'https://via.placeholder.com/300x200?text=AI+Chips+2026',
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          source: '科技新闻',
        },
        {
          id: '2',
          title: '时空同步航行器商业化运营启动，首批订单超100架',
          description: '极紫星时空同步/异步航行器正式进入商业化运营阶段，已获得来自全球50家企业的订单，总价值超50亿元...',
          url: 'https://www.xinhuanet.com/tech/spacetime-aircraft-2026',
          image: 'https://via.placeholder.com/300x200?text=Spacetime+Aircraft',
          publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          source: '行业报告',
        },
        {
          id: '3',
          title: '时空编码/解码体技术突破，应用于量子计算领域',
          description: '极紫星自主研发的时空编码/解码体技术实现重大突破，成功应用于量子计算和信息安全领域，获得国家科技进步奖...',
          url: 'https://www.tech.gov.cn/quantum-computing-2026',
          image: 'https://via.placeholder.com/300x200?text=Quantum+Tech',
          publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          source: '技术动态',
        },
      ];
    } else {
      return [
        {
          id: '1',
          title: 'Global AI Chip Market Surpasses $200 Billion in 2026, UVS Launches Next-Gen Processor',
          description: 'The global AI chip market reached $200 billion in 2026, with UVS introducing a revolutionary high-performance processor offering 50% better performance...',
          url: 'https://www.cnbc.com/technology/ai-chips-2026',
          image: 'https://via.placeholder.com/300x200?text=AI+Chips+2026',
          publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          source: 'Tech News',
        },
        {
          id: '2',
          title: 'Spacetime Synchronous/Asynchronous Navigation Aircraft Enter Commercial Operations',
          description: 'UVS spacetime navigation aircraft officially launched commercial operations with over 100 units on order from 50 global enterprises, valued at $5 billion...',
          url: 'https://www.reuters.com/technology/spacetime-aircraft-2026',
          image: 'https://via.placeholder.com/300x200?text=Spacetime+Aircraft',
          publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          source: 'Industry Report',
        },
        {
          id: '3',
          title: 'Spacetime Encoding/Decoding Technology Breakthrough, Applied in Quantum Computing',
          description: 'UVS independently developed spacetime encoding/decoding body technology achieved major breakthrough, successfully applied in quantum computing and cybersecurity, won National Science and Technology Progress Award...',
          url: 'https://www.nature.com/articles/quantum-computing-2026',
          image: 'https://via.placeholder.com/300x200?text=Quantum+Tech',
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
        { label: '点亮我们', path: '/zh/careers' },
        { label: 'AI 助手', path: '/zh/ai-hub' },
      ]
    : [
        { label: 'Products', path: '#products' },
        { label: 'Solutions', path: '#solutions' },
        { label: 'Services', path: '#services' },
        { label: 'About Us', path: '/en/about' },
        { label: 'Illuminate Us', path: '/en/careers' },
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
              alt={language === 'zh' ? '极紫星' : 'UVS'} 
              className="h-10 w-auto" 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-lg font-bold text-white hidden sm:inline">
              {language === 'zh' ? '极紫星' : 'UVS'}
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

          {/* Contact Button & Language Switch & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Contact Button */}
            <Button
              onClick={() => setLocation(`/${language}/contact`)}
              className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold"
              size="sm"
            >
              {language === 'zh' ? '联系我们' : 'Contact Us'}
            </Button>

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
