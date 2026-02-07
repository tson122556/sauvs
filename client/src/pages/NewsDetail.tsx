import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function NewsDetail() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 获取新闻详情
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 这里应该调用获取单条新闻的 API
        // 暂时使用模拟数据
        const mockNews = {
          id: id,
          title: "极紫星发布新一代 AI 助手平台",
          category: "产品发布",
          author: "技术团队",
          publishedAt: new Date().toISOString(),
          imageUrl: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-3_1770192011000_na1fn_aW90LWJn.png",
          summary: "极紫星智慧科技推出新一代 AI 助手平台，集成多种先进的人工智能技术。",
          content: `
            <h2>产品概述</h2>
            <p>极紫星智慧科技荣幸推出新一代 AI 助手平台，这是我们在人工智能领域多年研发的结晶。该平台集成了最先进的自然语言处理、计算机视觉和机器学习技术。</p>
            
            <h2>核心特性</h2>
            <ul>
              <li>多模态 AI 能力：支持文本、图像、视频、代码等多种输入格式</li>
              <li>智能模型选择：根据用户问题自动选择最优模型</li>
              <li>实时流式回答：提供快速、流畅的用户体验</li>
              <li>安全隐私保护：采用端到端加密和数据隐私保护</li>
            </ul>
            
            <h2>应用场景</h2>
            <p>该平台广泛应用于企业智能客服、内容创作、代码开发、数据分析等领域。我们已与多家企业建立合作关系，为其提供定制化的 AI 解决方案。</p>
            
            <h2>技术架构</h2>
            <p>平台采用微服务架构，支持高并发和弹性扩展。后端使用 Node.js 和 Express，前端采用 React 19，数据库使用 MySQL，并集成了 tRPC 进行类型安全的 API 调用。</p>
            
            <h2>未来展望</h2>
            <p>我们将继续投入研发，推出更多创新功能。计划在今年推出企业级 API、私有化部署方案和行业专用模型。</p>
          `,
          relatedNews: [
            { id: 2, title: "极紫星获得 A 轮融资", category: "公司动态" },
            { id: 3, title: "AI 技术在制造业的应用", category: "技术文章" },
          ]
        };
        setNews(mockNews);
      } catch (error) {
        console.error("获取新闻失败:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNews();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-gray-400">加载中...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-gray-400">新闻不存在</div>
      </div>
    );
  }

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

      {/* Back Button */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => setLocation(`/${language}/news`)}
            variant="outline"
            className="flex items-center gap-2 text-gray-300 border-gray-600 hover:border-purple-500"
          >
            <ArrowLeft className="w-4 h-4" />
            返回新闻列表
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {news.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400 text-sm">
              {news.category && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full">
                    {news.category}
                  </span>
                </div>
              )}
              {news.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{news.author}</span>
                </div>
              )}
              {news.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(news.publishedAt).toLocaleDateString('zh-CN')}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="ml-auto text-gray-400 border-gray-600 hover:border-purple-500"
              >
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
            </div>

            {/* Featured Image */}
            {news.imageUrl && (
              <div className="relative overflow-hidden rounded-lg mb-12 h-96 bg-slate-700">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            <Card className="bg-slate-800/50 border-purple-500/30 p-8">
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Related News */}
      {news.relatedNews && news.relatedNews.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-12">相关新闻</h2>
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {news.relatedNews.map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setLocation(`/${language}/news/${item.id}`)}
                >
                  <Card className="bg-slate-800/50 border-purple-500/30 hover:border-purple-500/60 p-6 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                      <Tag className="w-4 h-4" />
                      <span>{item.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition">
                      {item.title}
                    </h3>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-slate-800 py-12 relative z-10 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2026 极紫星智慧科技有限公司。保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
