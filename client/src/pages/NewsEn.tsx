import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function NewsEn() {
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
    { id: 'company', label: 'Company News' },
    { id: 'technology', label: 'Technology' },
    { id: 'industry', label: 'Industry' },
    { id: 'product', label: 'Product' },
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
              Home
            </a>
            <a href={`/${language}/about`} className="text-gray-300 hover:text-white transition">
              About
            </a>
            <a href={`/${language}/ai-hub`} className="text-gray-300 hover:text-white transition">
              AI Hub
            </a>
            <a href={`/${language}/news`} className="text-white transition font-semibold">
              News
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
              Contact Us
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
              News & Updates
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Stay Informed
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Get the latest news, technology articles, and industry insights from UVS Smart Technology
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
              All
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
            <div className="text-center text-gray-400">Loading...</div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg">No news available</p>
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
                            <span>{new Date(news.publishedAt).toLocaleDateString('en-US')}</span>
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
                        <span>Read More</span>
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
      <footer className="border-t border-purple-500/20 py-12 bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">About Us</h4>
              <p className="text-gray-400 text-sm">
                We focus on cutting-edge research and development of AI, intelligent robots, IoT, and space-time synchronized aircraft.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href={`/${language}`} className="hover:text-white transition">Home</a></li>
                <li><a href={`/${language}/about`} className="hover:text-white transition">About</a></li>
                <li><a href={`/${language}/ai-hub`} className="hover:text-white transition">AI Hub</a></li>
                <li><a href={`/${language}/contact`} className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Products</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href={`/${language}/product/ai`} className="hover:text-white transition">AI Applications</a></li>
                <li><a href={`/${language}/product/robot`} className="hover:text-white transition">Smart Robots</a></li>
                <li><a href={`/${language}/product/iot`} className="hover:text-white transition">IoT Solutions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>Phone: +86 15193876647</li>
                <li>Email: contact@jizixing.com</li>
                <li>Address: Xi'an High-Tech Zone</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Xi'an UVS Smart Technology Co., Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
