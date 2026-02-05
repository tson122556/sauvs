import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Cpu, Network } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
  const [, setLocation] = useLocation();

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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">极</span>
            </div>
            <span className="text-lg font-bold text-white">极紫星</span>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href="/" className="text-gray-300 hover:text-white transition">
              首页
            </a>
            <a href="/about" className="text-white">
              关于我们
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white transition">
              联系我们
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={() => setLocation("/contact")}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              联系我们
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            关于极紫星
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            极紫星智慧科技有限公司致力于人工智能、智能机器人、物联网技术创新和时空同步飞行器的研发和应用
          </p>
        </motion.div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold mb-6 text-white">公司简介</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                极紫星智慧科技有限公司是一家专注于前沿科技研发与应用的创新企业。我们汇聚了来自全球顶尖大学和科技公司的精英团队，致力于推动人工智能、智能机器人、物联网和时空同步飞行器等领域的技术突破。
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                我们的使命是通过技术创新，为各社会组织、企业和个人提供极致的东方智慧解决方案，推动各社会组织、企业和个人向未来产业数字化转型。
              </p>
              <Button
                onClick={() => setLocation("/contact")}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                了解更多 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20 p-6">
                <Zap className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">创新驱动</h3>
                <p className="text-sm text-gray-400">
                  以技术创新为核心，不断推动行业发展
                </p>
              </Card>
              <Card className="bg-slate-800/50 border-cyan-500/20 p-6">
                <Cpu className="h-8 w-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">智能科技</h3>
                <p className="text-sm text-gray-400">
                  专注于 AI、机器人、IoT 等前沿领域
                </p>
              </Card>
              <Card className="bg-slate-800/50 border-purple-500/20 p-6">
                <Network className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">全球合作</h3>
                <p className="text-sm text-gray-400">
                  与全球顶尖机构携手共进
                </p>
              </Card>
              <Card className="bg-slate-800/50 border-cyan-500/20 p-6">
                <Zap className="h-8 w-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">卓越成就</h3>
                <p className="text-sm text-gray-400">
                  为客户创造极致的价值体验
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              合作伙伴
            </h2>

            {/* International Tech Companies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded"></div>
                <h3 className="text-2xl font-semibold text-white">国际科技企业</h3>
                <div className="flex-1 h-px bg-slate-700/50"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/eaJsCEVwYATkRPfo.jpg" alt="Google" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wrqNyZUhOkIFdGRP.png" alt="Huawei" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rZjYjnVugZVdMdMm.jpg" alt="NVIDIA" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/paQBRtEPVVDsKaUG.jpg" alt="Tesla" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/vdIfFIxMkZeYECcU.jpg" alt="Meta" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hDujRGvBsJLoeiqd.png" alt="Boston Dynamics" className="h-16 w-auto" />
                </div>
              </div>
            </div>

            {/* Chinese Tech Companies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded"></div>
                <h3 className="text-2xl font-semibold text-white">中国科技企业</h3>
                <div className="flex-1 h-px bg-slate-700/50"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/DWRtZoVSLRrFtKOi.png" alt="Alibaba" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/xISTsJJSCDSZSqUV.png" alt="Baidu" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UtngVcEqsPPIYCZN.png" alt="Xiaomi" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/RVxCRODMBYovFfdR.png" alt="JD" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/zHvKuhnitFEJhDie.png" alt="Tencent" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/oFMjzeGhLYEPeOda.jpg" alt="DJI" className="h-16 w-auto" />
                </div>
              </div>
            </div>

            {/* Emerging Tech Companies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded"></div>
                <h3 className="text-2xl font-semibold text-white">新兴科技企业</h3>
                <div className="flex-1 h-px bg-slate-700/50"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/paluIHNcpiCRrKVy.png" alt="DeepSeek" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tfxzXVIvOpmBrkoL.png" alt="Moore Threads" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SDlWCGjYdrncvpId.jpg" alt="CATL" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jQamhtrkiLjgucvQ.png" alt="BYD" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/lwKKJnmYnISHaZcR.png" alt="CITIC Group" className="h-16 w-auto" />
                </div>
              </div>
            </div>

            {/* Government & Finance Organizations */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded"></div>
                <h3 className="text-2xl font-semibold text-white">政府与金融机构</h3>
                <div className="flex-1 h-px bg-slate-700/50"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                <div className="flex items-center justify-center h-24 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/FaDsfepYmWleIWxI.png" alt="科创中国" className="h-24 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/qFvtRWRZNGCBFJEP.png" alt="Microsoft" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/NoWmIdgPjiCuiszH.png" alt="新 Logo" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/whgQezFxaTRPtMVQ.png" alt="中国电信" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/pduUmnIayXBaRucN.png" alt="中国光华科技基金会" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/BYQYwyFQgnIlMynj.png" alt="学联" className="h-16 w-auto" />
                </div>
              </div>
            </div>

            {/* International Universities */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded"></div>
                <h3 className="text-2xl font-semibold text-white">国际顶尖高校</h3>
                <div className="flex-1 h-px bg-slate-700/50"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/OYahgRPyOzCRfQjU.png" alt="团会" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wpqJltNezbnJCHFJ.svg" alt="剑桥大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jXZgUnwHgWNTvFoR.png" alt="牛津大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ZIcMalCTYPNIspYs.svg" alt="麻省理工学院" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tUivsGlOeJcfNRsk.png" alt="哈佛大学" className="h-16 w-auto" />
                </div>
              </div>
            </div>

            {/* Chinese Universities & Research Institutions */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded"></div>
                <h3 className="text-2xl font-semibold text-white">国内高校与研究机构</h3>
                <div className="flex-1 h-px bg-slate-700/50"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/yRQJFSjiJMiWNswJ.png" alt="中国科学技术大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ayidXxkWNjqtNIXa.png" alt="WAIC" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/FbIBIASJDDwOjZdb.png" alt="北京大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/HffQiHOQqmqrIMNJ.png" alt="上海交通大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UohzNHucYHXIbIVK.png" alt="西安交通大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/LegKpTgvKOdhDmNK.png" alt="天津大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/QutnuHkFhDIqDaBU.svg" alt="浙江大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/FcCWcofvRmQzoFnm.svg" alt="中国科学院" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/lycimjpCbFokWvcp.png" alt="哈尔滨工业大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rsaQvxvsSwwGxBOE.png" alt="复旦大学" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SlmERcDRcItGNNjx.png" alt="南京大学" className="h-16 w-auto" />
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-12">
              我们期待与全球合作伙伴携手，共同推动智慧科技的发展和应用
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">产品中心</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">人工智能应用</a></li>
                <li><a href="#" className="hover:text-white transition">智能机器人</a></li>
                <li><a href="#" className="hover:text-white transition">物联网解决方案</a></li>
                <li><a href="#" className="hover:text-white transition">时空同步飞行器</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">解决方案</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">企业数字化</a></li>
                <li><a href="#" className="hover:text-white transition">智能制造</a></li>
                <li><a href="#" className="hover:text-white transition">智慧城市</a></li>
                <li><a href="#" className="hover:text-white transition">金融科技</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">技术服务</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">技术咨询</a></li>
                <li><a href="#" className="hover:text-white transition">系统集成</a></li>
                <li><a href="#" className="hover:text-white transition">技术支持</a></li>
                <li><a href="#" className="hover:text-white transition">金融科技</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">关于我们</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/about" className="hover:text-white transition">公司简介</a></li>
                <li><a href="#" className="hover:text-white transition">新闻资讯</a></li>
                <li><a href="#" className="hover:text-white transition">加入我们</a></li>
                <li><a href="/contact" className="hover:text-white transition">联系我们</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">极</span>
              </div>
              <span className="text-gray-400 text-sm">© 2024 极紫星智慧科技有限公司 版权所有</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
