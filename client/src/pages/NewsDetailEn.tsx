import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function NewsDetailEn() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch news details
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Should call API to fetch single news item
        // Using mock data for now
        const mockNews = {
          id: id,
          title: "UVS Launches Next-Generation AI Assistant Platform",
          category: "Product Release",
          author: "Technical Team",
          publishedAt: new Date().toISOString(),
          imageUrl: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-3_1770192011000_na1fn_aW90LWJn.png",
          summary: "UVS Intelligent Technology introduces next-generation AI assistant platform integrating advanced artificial intelligence technologies.",
          content: `
            <h2>Product Overview</h2>
            <p>UVS Intelligent Technology is proud to introduce the next-generation AI assistant platform, representing years of research and development in the field of artificial intelligence. The platform integrates the most advanced natural language processing, computer vision, and machine learning technologies.</p>
            
            <h2>Core Features</h2>
            <ul>
              <li>Multimodal AI Capabilities: Supports multiple input formats including text, images, videos, and code</li>
              <li>Intelligent Model Selection: Automatically selects the optimal model based on user queries</li>
              <li>Real-time Streaming Responses: Provides fast and smooth user experience</li>
              <li>Security and Privacy Protection: Employs end-to-end encryption and data privacy safeguards</li>
            </ul>
            
            <h2>Application Scenarios</h2>
            <p>The platform is widely used in enterprise intelligent customer service, content creation, code development, data analysis, and more. We have established partnerships with multiple enterprises to provide customized AI solutions.</p>
            
            <h2>Technical Architecture</h2>
            <p>The platform adopts microservices architecture supporting high concurrency and elastic scaling. Backend uses Node.js and Express, frontend employs React 19, database uses MySQL, and integrates tRPC for type-safe API calls.</p>
            
            <h2>Future Outlook</h2>
            <p>We will continue investing in R&D to launch more innovative features. We plan to introduce enterprise-grade APIs, private deployment solutions, and industry-specific models this year.</p>
          `,
          relatedNews: [
            { id: 2, title: "UVS Secures Series A Funding", category: "Company News" },
            { id: 3, title: "AI Applications in Manufacturing", category: "Technical Article" },
          ]
        };
        setNews(mockNews);
      } catch (error) {
        console.error("Failed to fetch news:", error);
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
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-gray-400">News not found</div>
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
              Home
            </a>
            <a href={`/${language}/about`} className="text-gray-300 hover:text-white transition">
              About Us
            </a>
            <a href={`/${language}/ai-hub`} className="text-gray-300 hover:text-white transition">
              AI Assistant
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

      {/* Back Button */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => setLocation(`/${language}/news`)}
            variant="outline"
            className="flex items-center gap-2 text-gray-300 border-gray-600 hover:border-purple-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
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
                  <span>{new Date(news.publishedAt).toLocaleDateString('en-US')}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="ml-auto text-gray-400 border-gray-600 hover:border-purple-500"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
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
            <h2 className="text-3xl font-bold text-white mb-12">Related News</h2>
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
            <p>&copy; 2026 UVS Intelligent Technology Co., Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
