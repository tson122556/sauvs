import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Cpu, Network } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import SuccessStories from "@/components/SuccessStories";

/**
 * 设计哲学：科技未来主义
 * - 深紫色 + 科技蓝配色
 * - 视频动态背景、流光线条、几何图形
 * - 平滑滚动动画、悬停效果
 * - 非对称布局，避免中心对齐
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const { language } = useLanguage();

  const [, setLocation] = useLocation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <div className="pt-20"> {/* 为导航栏留出空间 */}

      {/* Hero Section with Video Background */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(0.6) contrast(1.1)",
          }}
        >
          <source
            src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/fyalRSakKkeOSuJS.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50" />

        {/* Hero content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              极紫星科技
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                点亮智慧未来
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-200 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
我们专注于人工智能、智能机器人、物联网与时空同步/异步航行器的前沿技术研发与集成应用。通过将这些技术深度整合，致力于为各社会组织及个人客户提供创新解决方案，赋能其在未来数字产业中的转型升级。
            </motion.p>

            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
              >
                了解更多<ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400/80 text-white hover:bg-purple-500/20 bg-slate-900/50"
              >
                获取方案
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0,
            }}
            style={{ top: "20%", left: "10%" }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
            animate={{
              y: [0, 100, 0],
              x: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1,
            }}
            style={{ bottom: "20%", right: "10%" }}
          />
        </div>
      </section>

      {/* Core Services Section */}
      <section id="products" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">核心业务</h2>
            <p className="text-gray-400 text-lg">
              我们提供全方位的智慧科技解决方案
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-5 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* AI Software */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 hover:border-purple-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-1_1770192013000_na1fn_YWktYXBwLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/QVHZWYJfLZBUUJdq.png" alt="AI应用" className="w-16 h-16 mb-4 group-hover:scale-110 transition" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                  <h3 className="text-xl font-bold text-white mb-3">人工智能应用</h3>
                  <p className="text-gray-400 mb-6">
                    专业的AI应用软件开发，提供智能化解决方案，赋能企业数字化转型。
                  </p>
                </div>
                <Button
                  onClick={() => setLocation(`/${language}/product/ai`)}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white mt-4 relative z-10"
                >
                  了解更多
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>

            {/* Smart Robots */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 hover:border-cyan-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-2_1770192014000_na1fn_cm9ib3QtYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/CyGnmUYzRSFavGGJ.png" alt="智能机器人" className="w-16 h-16 mb-4 group-hover:scale-110 transition" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                  <h3 className="text-xl font-bold text-white mb-3">智能机器人</h3>
                  <p className="text-gray-400 mb-6">
                    自主研发和销售智能机器人，提供工业和服务机器人解决方案。
                  </p>
                </div>
                <Button
                  onClick={() => setLocation(`/${language}/product/robot`)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white mt-4 relative z-10"
                >
                  了解更多
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>

            {/* IoT Solutions */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 hover:border-pink-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-3_1770192011000_na1fn_aW90LWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/LPJIpqQEjtYMyJmB.png" alt="物联网技术" className="w-16 h-16 mb-4 group-hover:scale-110 transition" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                  <h3 className="text-xl font-bold text-white mb-3">物联网技术</h3>
                  <p className="text-gray-400 mb-6">
                    提供物联网技术服务和研发，实现设备互联和智能控制。
                  </p>
                </div>
                <Button
                  onClick={() => setLocation(`/${language}/product/iot`)}
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white mt-4 relative z-10"
                >
                  了解更多
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>

            {/* Spacetech Aircraft */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/30 hover:border-blue-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-3_1770192011000_na1fn_aW90LWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/PMmXikHRGAMPGDyc.png" alt="时空同步/异步航行器" className="w-16 h-16 mb-4 group-hover:scale-110 transition" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                  <h3 className="text-xl font-bold text-white mb-3">时空同步/异步航行器</h3>
                  <p className="text-gray-400 mb-4">
                    前沿的时空同步/异步航行技术研发与应用，提供创新的航行与飞行解决方案。
                  </p>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full mb-4">
                    {language === "zh" ? "仅对合作伙伴开放" : "Partners Only"}
                  </div>
                </div>
                <Button
                  onClick={() => setLocation(`/${language}/contact`)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white mt-4 relative z-10"
                >
                  {language === "zh" ? "了解更多" : "Learn More"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>

            {/* Spacetime Encoding/Decoding Body */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 hover:border-indigo-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-3_1770192011000_na1fn_aW90LWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/bxDzpBbKhWogCvkF.png" alt="时空编码/解码体" className="w-16 h-16 mb-4 group-hover:scale-110 transition" />
                  <h3 className="text-xl font-bold text-white mb-3">时空编码/解码体</h3>
                  <p className="text-gray-400 mb-4">高级时空编码与解码技术，提供前沿的时空数据处理和转换解决方案。</p>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-full mb-4">
                    {language === "zh" ? "仅对合作伙伴开放" : "Partners Only"}
                  </div>
                </div>
                <Button
                  onClick={() => setLocation(`/${language}/contact`)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white mt-4 relative z-10"
                >
                  {language === "zh" ? "了解更多" : "Learn More"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">为什么选择我们</h2>
            <p className="text-gray-400 text-lg">
              专业的技术团队和领先的创新能力
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "技术领先",
                description: "拥有专业的研发团队，掌握最前沿的AI和物联网技术。",
                bg: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-4_1770192016000_na1fn_dGVjaC1sZWFkZXJzaGlwLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80",
              },
              {
                title: "方案定制",
                description: "根据客户需求提供个性化的解决方案和服务。",
                bg: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-5_1770192014000_na1fn_Y3VzdG9tLXNvbHV0aW9uLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80",
              },
              {
                title: "全方位支持",
                description: "提供从咨询、开发到维护的全生命周期技术支持。",
                bg: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-4_1770192016000_na1fn_dGVjaC1sZWFkZXJzaGlwLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80",
              },
              {
                title: "成熟体系",
                description: "建立了完善的质量管理和项目管理体系。",
                bg: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-5_1770192014000_na1fn_Y3VzdG9tLXNvbHV0aW9uLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="bg-slate-800/50 border-slate-700/50 p-6 h-full group relative overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                    backgroundImage: `url(${item.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <SuccessStories language={language as "zh" | "en"} />

      {/* CTA Section */}
      <section id="services" className="py-20 relative bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              准备好开启智慧未来了吗？
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              联系我们的专业团队，获取定制化的解决方案
            </p>
            <Button
              onClick={() => setLocation(`/${language}/contact`)}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
            >
              立即咨询 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-slate-800 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
                  alt="UVS" 
                  className="h-12 w-auto" 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    AI应用软件
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    智能机器人
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
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
                <li>地址：陕西省西安市雁塔区二环南路</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 极紫星智慧科技有限公司. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
