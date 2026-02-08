import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { language } = useLanguage();
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

  const generalProjects = [
    "人工智能应用软件开发",
    "人工智能公共服务平台技术咨询服务",
    "技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广",
    "信息系统集成服务",
    "智能控制系统集成",
    "智能机器人的研发",
    "智能机器人销售",
    "时空同步航行器设计与研发",
    "时空异步航行器设计与研发",
    "无人机设计",
    "无人机新型电机研发",
    "无人机系统集成",
    "无人机销售",
    "人工智能硬件销售",
    "计算机软硬件及辅助设备批发",
    "计算机软硬件及辅助设备零售",
    "数据处理和存储支持服务",
    "物联网技术服务",
    "物联网技术研发",
    "储能技术服务",
    "技术进出口",
    "机械设备租赁",
    "企业管理咨询",
    "信息咨询服务（不含许可类信息咨询服务）",
  ];

  const licensedProjects = [
    "互联网信息服务",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setLocation(`/${language}`)}
          >
            <motion.img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
              alt="UVS" 
              className="h-16 w-auto" 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-lg font-bold text-white">极紫星</span>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href={`/${language}#products`} className="text-gray-300 hover:text-white transition">
              产品中心
            </a>
            <a href={`/${language}#solutions`} className="text-gray-300 hover:text-white transition">
              解决方案
            </a>
            <a href={`/${language}#services`} className="text-gray-300 hover:text-white transition">
              技术服务
            </a>
            <a href={`/${language}/about`} className="text-white font-semibold">
              关于我们
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
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
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

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
              关于
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                极紫星科技
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
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
                onClick={() => setLocation("/contact")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
              >
                联系我们 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">公司信息</h2>
            <p className="text-gray-400 text-lg">
              完整的企业资质和经营范围
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Company Details */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">企业资质</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">公司名称</p>
                    <p className="text-white font-semibold">极紫星智慧科技有限公司</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">成立时间</p>
                    <p className="text-white font-semibold">2025年5月</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">注册资本</p>
                    <p className="text-white font-semibold">X万元</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">注册地址</p>
                    <p className="text-white font-semibold">陕西省西安市雁塔区二环南路</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Core Values */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">核心价值</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">技术创新</p>
                      <p className="text-gray-400 text-sm">掌握最前沿的AI和物联网技术</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">客户至上</p>
                      <p className="text-gray-400 text-sm">提供定制化的解决方案</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">质量保证</p>
                      <p className="text-gray-400 text-sm">完善的质量管理体系</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Business Scope Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">经营范围</h2>
            <p className="text-gray-400 text-lg">
              完整的业务覆盖和服务能力
            </p>
          </motion.div>

          {/* General Projects */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                一般项目
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generalProjects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{project}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-6">
                （除依法须经批准的项目外，凭营业执照依法自主开展经营活动）
              </p>
            </Card>
          </motion.div>

          {/* Licensed Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                许可项目
              </h3>
              <div className="space-y-4">
                {licensedProjects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{project}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-6">
                （依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以审批结果为准）
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              合作机会
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              我们期待与全球合作伙伴携手，共同推动智慧科技的发展和应用
            </p>

            {/* Partners Logo Grid */}
            <div className="mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mb-8">
                {/* Partner Logos */}
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/eaJsCEVwYATkRPfo.jpg" alt="Google" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.huawei.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wrqNyZUhOkIFdGRP.png" alt="Huawei" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.nvidia.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rZjYjnVugZVdMdMm.jpg" alt="NVIDIA" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.tesla.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/paQBRtEPVVDsKaUG.jpg" alt="Tesla" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.meta.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/vdIfFIxMkZeYECcU.jpg" alt="Meta" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.bostondynamics.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hDujRGvBsJLoeiqd.png" alt="Boston Dynamics" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>



              {/* More Partner Logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                <a href="https://www.alibaba.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/DWRtZoVSLRrFtKOi.png" alt="Alibaba" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/xISTsJJSCDSZSqUV.png" alt="Baidu" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.xiaomi.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UtngVcEqsPPIYCZN.png" alt="Xiaomi" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.jd.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/RVxCRODMBYovFfdR.png" alt="JD" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.tencent.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/zHvKuhnitFEJhDie.png" alt="Tencent" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.dji.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/oFMjzeGhLYEPeOda.jpg" alt="DJI" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
                <a href="https://www.deepseek.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/paluIHNcpiCRrKVy.png" alt="DeepSeek" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.mthreads.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tfxzXVIvOpmBrkoL.png" alt="Moore Threads" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.catl.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SDlWCGjYdrncvpId.jpg" alt="CATL" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.byd.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jQamhtrkiLjgucvQ.png" alt="BYD" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.citic.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/lwKKJnmYnISHaZcR.png" alt="CITIC Group" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.gqt.org.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ZutuLLAAZfAXnngs.png" alt="中国共青团" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Fourth Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
                <a href="https://www.kczg.org.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-24 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/FaDsfepYmWleIWxI.png" alt="科创中国" className="h-24 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/qFvtRWRZNGCBFJEP.png" alt="Microsoft" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.tsinghua.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/NoWmIdgPjiCuiszH.png" alt="清华大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.chinatelecom.com.cn/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/whgQezFxaTRPtMVQ.png" alt="中国电信" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.ghstf.org.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/pduUmnIayXBaRucN.png" alt="中国光华科技基金会" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://qgxl.youth.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/BYQYwyFQgnIlMynj.png" alt="学联" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Fifth Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
                <a href="https://www.ox.ac.uk" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jXZgUnwHgWNTvFoR.png" alt="牛津大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.ge.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ZIcMalCTYPNIspYs.svg" alt="麻省理工学院" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.harvard.edu" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tUivsGlOeJcfNRsk.png" alt="哈佛大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.pku.edu.cn/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/yRQJFSjiJMiWNswJ.png" alt="北京大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.cae.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UkBjGQAcrbhnYKTl.png" alt="中国工程院" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.unitree.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hufXZlnGUtzGvxog.png" alt="宇树科技" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Sixth Row - 6 logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
                <a href="https://www.worldaic.com.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ayidXxkWNjqtNIXa.png" alt="WAIC" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.chinamobileltd.com/sc/global/home.php" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/FbIBIASJDDwOjZdb.png" alt="中国移动" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.sjtu.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/HffQiHOQqmqrIMNJ.png" alt="上海交通大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.xjtu.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UohzNHucYHXIbIVK.png" alt="西安交通大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.tju.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/LegKpTgvKOdhDmNK.png" alt="天津大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.zju.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/QutnuHkFhDIqDaBU.svg" alt="浙江大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Seventh Row - 6 logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
                <a href="https://www.ustc.edu.cn/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/MaMykRSfNmKWtLsp.svg" alt="中国科学技术大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.hit.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/lycimjpCbFokWvcp.png" alt="哈尔滨工业大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.fudan.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rsaQvxvsSwwGxBOE.png" alt="复旦大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.nju.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SlmERcDRcItGNNjx.png" alt="南京大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.cam.ac.uk" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wpqJltNezbnJCHFJ.svg" alt="剑桥大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.samsung.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/fEWQWlBMKSloJZVX.gif" alt="Samsung" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Eighth Row - 6 logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
                <a href="https://www.kingsoft.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/mTOKwDVGSfXusrZz.png" alt="金山软件" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.tsmc.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/lHvrAWgGIwIttVJL.webp" alt="TSMC" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.intel.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/DHvviZixJnqOQakV.svg" alt="Intel" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.ibm.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/caoSOWjLZeDYsdut.webp" alt="IBM" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.asml.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/EubAdlXGUnXOyzal.png" alt="ASML" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.apple.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/mqEjQzJmZqKORmvH.jpg" alt="Apple" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Ninth Row - 6 logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
                <a href="https://web.mit.edu/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wpGBkzOqUqPyQAmp.png" alt="麻省理工学院" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.neu.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/dJRuwOvQTpmcIcEx.png" alt="东北大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://openai.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/REhqcuvRNDVpvfkt.png" alt="OpenAI" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.bytedance.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hLdutaNJIjvXTYZd.png" alt="字节跳动" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.iflytek.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/WtoCCbtnkCNRLTNj.png" alt="科大讯飞" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.avicuas.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wmfSaDvfmeZuAwfC.png" alt="中航无人机" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Tenth Row - 5 logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
                <a href="https://www.jouav.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/vibAZqbJpluzTkgi.svg" alt="纵横股份" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.parrot.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rIgTYTVyfhyRUphq.svg" alt="派洛特" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.stanford.edu/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/KSoxhHYccQwFoaLq.png" alt="斯坦福大学" className="h-24 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.universityofcalifornia.edu/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/cqpRbRGXTefjEuuE.png" alt="加州大学" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.tii.ae/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tnbKSMwcGRYmEIWX.svg" alt="阿联酋技术创新研究所" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.scnet.cn/home" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SAysExnOnHYrzARK.png" alt="超算互联网" className="h-16 w-auto group-hover:scale-110 transition-transform" />
                </a>
              </div>


            </div>



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mt-12"
            >
              <Button
                onClick={() => setLocation("/contact")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
              >
                成为合作伙伴 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 点亮我们 - 招聘部分 */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">点亮我们</h2>
            <p className="text-gray-400 text-lg">
              加入极紫星，与我们一起开创未来
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-slate-800/50 border border-purple-500/30">
                <TabsTrigger value="ai" className="text-sm md:text-base">AI事业部</TabsTrigger>
                <TabsTrigger value="robot" className="text-sm md:text-base">机器人事业部</TabsTrigger>
                <TabsTrigger value="iot" className="text-sm md:text-base">物联网与系统</TabsTrigger>
                <TabsTrigger value="research" className="text-sm md:text-base">前沿研究院</TabsTrigger>
              </TabsList>

              {/* AI事业部 */}
              <TabsContent value="ai" className="space-y-4">
                <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30">
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">一、人工智能事业部</h3>
                      <p className="text-gray-400 mb-6">专注于预测与决策类AI产品的研发与应用</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">1.1 机器学习算法专家 (MLE)</h4>
                        <p className="text-gray-300 mb-3">核心职责：专注于预测与决策类AI产品（如风控、营销、运营优化）的核心算法研发与模型迭代。</p>
                        <p className="text-purple-400 font-semibold">年薪范围：40万 - 75万人民币</p>
                      </div>

                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">1.2 计算机视觉工程师 (CV Engineer)</h4>
                        <p className="text-gray-300 mb-3">核心职责：负责图像/视频理解、目标检测、三维重建等技术的研发，应用于机器人感知、智能安防等产品。</p>
                        <p className="text-cyan-400 font-semibold">年薪范围：35万 - 65万人民币</p>
                      </div>

                      <div className="border-l-2 border-pink-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">1.3 AI解决方案架构师</h4>
                        <p className="text-gray-300 mb-3">核心职责：面向金融、制造等行业客户，设计端到端的AI解决方案，主导技术选型、架构设计及交付。</p>
                        <p className="text-pink-400 font-semibold">年薪范围：60万 - 110万人民币 + 项目奖金</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* 机器人事业部 */}
              <TabsContent value="robot" className="space-y-4">
                <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30">
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">二、智能机器人事业部</h3>
                      <p className="text-gray-400 mb-6">研发高精度、高动态的机器人控制与感知系统</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">2.1 机器人运动控制工程师</h4>
                        <p className="text-gray-300 mb-3">核心职责：研发高精度、高动态的伺服控制、力位混合控制算法，并实现于机器人本体。</p>
                        <p className="text-purple-400 font-semibold">年薪范围：45万 - 80万人民币</p>
                      </div>

                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">2.2 机器人感知算法工程师</h4>
                        <p className="text-gray-300 mb-3">核心职责：开发多传感器（激光雷达、视觉、IMU）融合的SLAM、场景理解及目标识别算法。</p>
                        <p className="text-cyan-400 font-semibold">年薪范围：40万 - 75万人民币</p>
                      </div>

                      <div className="border-l-2 border-pink-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">2.3 机器人软件平台开发工程师</h4>
                        <p className="text-gray-300 mb-3">核心职责：设计并开发机器人统一软件框架、仿真平台及高可靠性的核心中间件。</p>
                        <p className="text-pink-400 font-semibold">年薪范围：35万 - 70万人民币</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* 物联网与系统工程部 */}
              <TabsContent value="iot" className="space-y-4">
                <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30">
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">三、物联网与系统工程部</h3>
                      <p className="text-gray-400 mb-6">构建物联网PaaS平台与边缘计算解决方案</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">3.1 物联网平台资深开发工程师</h4>
                        <p className="text-gray-300 mb-3">核心职责：负责物联网PaaS平台核心服务（设备接入、规则引擎、数据流处理）的开发与性能优化。</p>
                        <p className="text-purple-400 font-semibold">年薪范围：50万 - 90万人民币</p>
                      </div>

                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">3.2 边缘计算专家</h4>
                        <p className="text-gray-300 mb-3">核心职责：研发轻量级AI模型在边缘设备的部署框架、推理优化及边缘-云协同计算架构。</p>
                        <p className="text-cyan-400 font-semibold">年薪范围：45万 - 85万人民币</p>
                      </div>

                      <div className="border-l-2 border-pink-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">3.3 物联网安全工程师</h4>
                        <p className="text-gray-300 mb-3">核心职责：构建物联网端到端安全体系，包括设备安全认证、通信加密、漏洞挖掘与防护。</p>
                        <p className="text-pink-400 font-semibold">年薪范围：40万 - 75万人民币</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* 前沿技术研究院 */}
              <TabsContent value="research" className="space-y-4">
                <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30">
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">四、前沿技术研究院</h3>
                      <p className="text-gray-400 mb-6">探索人类认知边界的特许区域，打造全球学术枢纽</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">4.1 时空异步/同步航行器首席科学家</h4>
                        <p className="text-gray-300 mb-3">主导时空异步/同步航行器的前沿理论体系构建，领导跨学科团队开展核心技术攻关。</p>
                        <p className="text-purple-400 font-semibold">薪酬："紫星学者"领军计划，基础包不低于年薪200万人民币</p>
                      </div>

                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">4.2 时空编码/解码体首席科学家</h4>
                        <p className="text-gray-300 mb-3">开创时空信息的新型表达、压缩、加密与重构理论，构建完整的数学与信息论框架。</p>
                        <p className="text-cyan-400 font-semibold">薪酬："紫星学者"领军计划，基础包不低于年薪180万人民币</p>
                      </div>

                      <div className="border-l-2 border-pink-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">4.3 （高级）时空信息处理科学家</h4>
                        <p className="text-gray-300 mb-3">在首席科学家的指导下，开展时空基准、数据融合等具体方向的深入研究与工程化尝试。</p>
                        <p className="text-pink-400 font-semibold">年薪范围：70万 - 150万人民币 + 绩效奖金与项目激励</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-700">
                      <p className="text-gray-300 mb-4"><span className="text-white font-semibold">我们提供：</span></p>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li>• 竞争力的薪酬福利与股权/期权激励计划</li>
                        <li>• 与行业顶尖技术团队共事的机会</li>
                        <li>• 系统的技术与管理培训及学术会议参与机会</li>
                        <li>• 扁平化管理与开放的创新文化</li>
                      </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-700">
                      <p className="text-gray-300 mb-4"><span className="text-white font-semibold">申请方式：</span></p>
                      <p className="text-gray-400 text-sm mb-3">请将您的个人简历发送至 <span className="text-purple-400 font-semibold">careers@sauvs.com</span>，邮件标题注明申请的 "事业部 - 职位名称"</p>
                      <p className="text-gray-400 text-sm">研究院职位请发送至 <span className="text-cyan-400 font-semibold">research-fellowship@sauvs.com</span></p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-t border-purple-500/20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备好与我们合作了吗？
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              联系我们的团队，了解如何将极致的东方智慧解决方案应用到您的业务中
            </p>
            <Button
              onClick={() => setLocation("/contact")}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
            >
              立即联系 <ArrowRight className="ml-2 w-4 h-4" />
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
              </div>
              <p className="text-gray-400 text-sm">
                专注于人工智能、智能机器人、物联网技术创新和时空同步/异步航行器的研发和应用
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">产品</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/#products" className="text-gray-400 hover:text-white transition">
                    AI应用软件
                  </a>
                </li>
                <li>
                  <a href="/#products" className="text-gray-400 hover:text-white transition">
                    智能机器人
                  </a>
                </li>
                <li>
                  <a href="/#products" className="text-gray-400 hover:text-white transition">
                    物联网解决方案
                  </a>
                </li>
                <li>
                  <a href="/#products" className="text-gray-400 hover:text-white transition">
                    时空同步/异步航行器
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">服务</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/#solutions" className="text-gray-400 hover:text-white transition">
                    技术咨询
                  </a>
                </li>
                <li>
                  <a href="/#solutions" className="text-gray-400 hover:text-white transition">
                    系统集成
                  </a>
                </li>
                <li>
                  <a href="/#solutions" className="text-gray-400 hover:text-white transition">
                    技术支持
                  </a>
                </li>
                <li>
                  <a href="/#solutions" className="text-gray-400 hover:text-white transition">
                    金融科技
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
  );
}
