import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function News() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 获取新闻列表
  const { data: newsData, isLoading } = trpc.news.list.useQuery({
    limit: 20,
    offset: 0,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const newsItems = newsData || [];
  const filteredNews = selectedCategory
    ? newsItems.filter((item: any) => item.category === selectedCategory)
    : newsItems;

  const categories = [
    { id: 'company', label: '公司动态' },
    { id: 'technology', label: '技术文章' },
    { id: 'industry', label: '行业资讯' },
    { id: 'product', label: '产品发布' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLocation(`/${language}`)}
          >
            <motion.img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
              alt="UVS" 
              className="h-16 w-auto" 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href={`/${language}`} className="text-gray-300 hover:text-white transition">
              首页
            </a>
            <a href={`/${language}/about`} className="text-gray-300 hover:text-white transition">
              关于我们
            </a>
            <a href={`/${language}/ai-hub`} className="text-gray-300 hover:text-white transition">
              AI 助手
            </a>
            <a href={`/${language}/news`} className="text-white transition font-semibold">
              新闻资讯
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <LanguageSwitcher />
            <Button
              onClick={() => setLocation(`/${language}/contact`)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            >
              联系我们
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              新闻资讯
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                了解最新动态
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              获取极紫星智慧科技的最新新闻、技术文章和行业资讯
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b border-purple-500/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-lg transition ${
                selectedCategory === null
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-lg transition ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center text-gray-400">加载中...</div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg">暂无新闻资讯</p>
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredNews.map((news: any, index: number) => (
                <motion.div
                  key={news.id}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setLocation(`/${language}/news/${news.id}`)}
                >
                  <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-500/60 overflow-hidden transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    {news.imageUrl && (
                      <div className="relative overflow-hidden h-48 bg-slate-700">
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category and Date */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                        {news.category && (
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            <span>{news.category}</span>
                          </div>
                        )}
                        {news.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(news.publishedAt).toLocaleDateString('zh-CN')}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition">
                        {news.title}
                      </h3>

                      {/* Summary */}
                      {news.summary && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                          {news.summary}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition">
                        <span>阅读更多</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-slate-800 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
                  alt="UVS" 
                  className="h-12 w-auto" 
                />
                <span className="text-lg font-bold text-white">极紫星</span>
              </div>
              <p className="text-gray-400 text-sm">
                专注于人工智能、智能机器人、物联网技术创新、时空同步/异步航行器和时空编码/解码体的研发和应用
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">产品</h4>
              <ul className="space-y-2">
                <li>
                  <a href={`/${language}/product/ai`} className="text-gray-400 hover:text-white transition">
                    AI应用软件
                  </a>
                </li>
                <li>
                  <a href={`/${language}/product/robot`} className="text-gray-400 hover:text-white transition">
                    智能机器人
                  </a>
                </li>
                <li>
                  <a href={`/${language}/product/iot`} className="text-gray-400 hover:text-white transition">
                    物联网解决方案
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    时空同步/异步航行器
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    时空编码/解码体
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">服务</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    技术咨询
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    系统集成
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    技术支持
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    金融科技
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    智慧金融
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">联系</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>邮箱：satifuxie@gmail.com</li>
                <li>电话：(+86)1519387647</li>
                <li>地址：中国香港特别行政区沙田区科技大道东8号</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 极紫星智慧科技有限公司. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
