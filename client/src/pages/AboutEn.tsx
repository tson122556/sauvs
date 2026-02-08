import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutEn() {
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
    "AI application software development",
    "AI public service platform technical consulting services",
    "Technical services, technical development, technical consulting, technical exchange, technology transfer, technology promotion",
    "Information system integration services",
    "Intelligent control system integration",
    "Intelligent robot R&D",
    "Intelligent robot sales",
    "Spacetime synchronous navigator design and R&D",
    "Spacetime asynchronous navigator design and R&D",
    "Drone design",
    "Drone novel motor R&D",
    "Drone system integration",
    "Drone sales",
    "AI hardware sales",
    "Computer software and hardware and auxiliary equipment wholesale",
    "Computer software and hardware and auxiliary equipment retail",
    "Data processing and storage support services",
    "IoT technology services",
    "IoT technology R&D",
    "Energy storage technology services",
    "Technology import and export",
    "Machinery equipment rental",
    "Enterprise management consulting",
    "Information consulting services",
  ];

  const licensedProjects = [
    "Internet information services",
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
            <span className="text-lg font-bold text-white">UVS</span>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href={`/${language}#products`} className="text-gray-300 hover:text-white transition">
              Products
            </a>
            <a href={`/${language}#solutions`} className="text-gray-300 hover:text-white transition">
              Solutions
            </a>
            <a href={`/${language}#services`} className="text-gray-300 hover:text-white transition">
              Services
            </a>
            <a href={`/${language}/about`} className="text-white font-semibold">
              About Us
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
              Contact Us
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
              About
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                UVS Technology
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We focus on cutting-edge research and development of AI, intelligent robots, IoT, and space-time synchronized aircraft. Through deep integration of these technologies, we are committed to providing innovative solutions to organizations and individual customers, empowering their digital transformation in the future industry.
            </motion.p>

            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={() => setLocation(`/${language}/contact`)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
              >
                Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Company Information</h2>
            <p className="text-gray-400 text-lg">
              Complete corporate credentials and business scope
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
                <h3 className="text-2xl font-bold text-white mb-6">Corporate Credentials</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Company Name</p>
                    <p className="text-white font-semibold">UVS Smart Technology Co., Ltd.</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Established</p>
                    <p className="text-white font-semibold">May 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Registered Capital</p>
                    <p className="text-white font-semibold">To be confirmed</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Registered Address</p>
                    <p className="text-white font-semibold">Xi'an, Shaanxi Province, China</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Core Values */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">Core Values</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Technology Innovation</p>
                      <p className="text-gray-400 text-sm">Mastering cutting-edge AI and IoT technologies</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Customer First</p>
                      <p className="text-gray-400 text-sm">Providing customized solutions</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Quality Assurance</p>
                      <p className="text-gray-400 text-sm">Comprehensive quality management system</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Business Scope</h2>
            <p className="text-gray-400 text-lg">
              Complete business coverage and service capabilities
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
                General Projects
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
                (Except for projects that must be approved by law, business activities shall be carried out independently based on business licenses)
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
                Licensed Projects
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
                (For projects that must be approved by law, business activities can only be carried out after approval by relevant departments)
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Partners Logo Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Partners</h2>
            <p className="text-gray-400 text-lg">
              Collaborating with industry leaders worldwide
            </p>
          </motion.div>

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
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ZutuLLAAZfAXnngs.png" alt="Youth League" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
              <a href="https://www.kczg.org.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-24 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/FaDsfepYmWleIWxI.png" alt="Sci-Tech Innovation" className="h-24 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.microsoft.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/qFvtRWRZNGCBFJEP.png" alt="Microsoft" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.tsinghua.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/NoWmIdgPjiCuiszH.png" alt="Tsinghua University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.chinatelecom.com.cn/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/whgQezFxaTRPtMVQ.png" alt="China Telecom" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.ghstf.org.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/pduUmnIayXBaRucN.png" alt="China Guanghua Foundation" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://qgxl.youth.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/BYQYwyFQgnIlMynj.png" alt="Student Association" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Fifth Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
              <a href="https://www.ox.ac.uk" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jXZgUnwHgWNTvFoR.png" alt="Oxford University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.ge.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ZIcMalCTYPNIspYs.svg" alt="MIT" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.harvard.edu" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tUivsGlOeJcfNRsk.png" alt="Harvard University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.pku.edu.cn/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/yRQJFSjiJMiWNswJ.png" alt="Peking University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.cae.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UkBjGQAcrbhnYKTl.png" alt="Chinese Academy of Engineering" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.unitree.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hufXZlnGUtzGvxog.png" alt="Unitree" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Sixth Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
              <a href="https://www.worldaic.com.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ayidXxkWNjqtNIXa.png" alt="WAIC" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.chinamobileltd.com/sc/global/home.php" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/FbIBIASJDDwOjZdb.png" alt="China Mobile" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.sjtu.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/HffQiHOQqmqrIMNJ.png" alt="Shanghai Jiao Tong University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.xjtu.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UohzNHucYHXIbIVK.png" alt="Xi'an Jiao Tong University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.tju.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/LegKpTgvKOdhDmNK.png" alt="Tianjin University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.zju.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/QutnuHkFhDIqDaBU.svg" alt="Zhejiang University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Seventh Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
              <a href="https://www.ustc.edu.cn/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/MaMykRSfNmKWtLsp.svg" alt="University of Science and Technology of China" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.hit.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/lycimjpCbFokWvcp.png" alt="Harbin Institute of Technology" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.fudan.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rsaQvxvsSwwGxBOE.png" alt="Fudan University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.nju.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SlmERcDRcItGNNjx.png" alt="Nanjing University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.cam.ac.uk" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wpqJltNezbnJCHFJ.svg" alt="Cambridge University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.samsung.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/fEWQWlBMKSloJZVX.gif" alt="Samsung" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Eighth Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
              <a href="https://www.kingsoft.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/mTOKwDVGSfXusrZz.png" alt="Kingsoft" className="h-16 w-auto group-hover:scale-110 transition-transform" />
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

            {/* Ninth Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
              <a href="https://web.mit.edu/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wpGBkzOqUqPyQAmp.png" alt="MIT" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.neu.edu.cn" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/dJRuwOvQTpmcIcEx.png" alt="Northeastern University" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://openai.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/REhqcuvRNDVpvfkt.png" alt="OpenAI" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.bytedance.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hLdutaNJIjvXTYZd.png" alt="ByteDance" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.iflytek.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/WtoCCbtnkCNRLTNj.png" alt="iFlytek" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.avicuas.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wmfSaDvfmeZuAwfC.png" alt="AVIC UAS" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Tenth Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mt-6">
              <a href="https://www.jouav.com/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/vibAZqbJpluzTkgi.svg" alt="JOUAV" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.parrot.com" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rIgTYTVyfhyRUphq.svg" alt="Parrot" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.stanford.edu/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/KSoxhHYccQwFoaLq.png" alt="Stanford University" className="h-24 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.universityofcalifornia.edu/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/cqpRbRGXTefjEuuE.png" alt="University of California" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.tii.ae/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tnbKSMwcGRYmEIWX.svg" alt="UAE Technology Innovation Institute" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.scnet.cn/home" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer">
                <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SAysExnOnHYrzARK.png" alt="SuperComputing Network" className="h-16 w-auto group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Illuminate Us - Recruitment Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Illuminate Us</h2>
            <p className="text-gray-400 text-lg">
              Join SAUVS and shape the future together
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
                <TabsTrigger value="ai" className="text-sm md:text-base">AI Division</TabsTrigger>
                <TabsTrigger value="robot" className="text-sm md:text-base">Robotics Division</TabsTrigger>
                <TabsTrigger value="iot" className="text-sm md:text-base">IoT & Systems</TabsTrigger>
                <TabsTrigger value="research" className="text-sm md:text-base">Research Institute</TabsTrigger>
              </TabsList>

              {/* AI Division */}
              <TabsContent value="ai" className="space-y-4">
                <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30">
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">I. Artificial Intelligence Division</h3>
                      <p className="text-gray-400 mb-6">Focused on R&D and application of predictive and decision-making AI products</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">1.1 Machine Learning Algorithm Expert (MLE)</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Focus on core algorithm R&D and model iteration for predictive and decision-making AI products (e.g., risk control, marketing, operational optimization).</p>
                        <p className="text-purple-400 font-semibold">Annual Salary Range: 400k - 750k CNY</p>
                      </div>

                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">1.2 Computer Vision Engineer (CV Engineer)</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Develop image/video understanding, object detection, and 3D reconstruction technologies for robot perception and intelligent security products.</p>
                        <p className="text-cyan-400 font-semibold">Annual Salary Range: 350k - 650k CNY</p>
                      </div>

                      <div className="border-l-2 border-pink-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">1.3 AI Solutions Architect</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Design end-to-end AI solutions for financial and manufacturing clients, lead technology selection, architecture design, and delivery.</p>
                        <p className="text-pink-400 font-semibold">Annual Salary Range: 600k - 1.1M CNY + Project Bonus</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Robotics Division */}
              <TabsContent value="robot" className="space-y-4">
                <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30">
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">II. Intelligent Robotics Division</h3>
                      <p className="text-gray-400 mb-6">Develop high-precision, high-dynamic robot control and perception systems</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">2.1 Robot Motion Control Engineer</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Develop high-precision, high-dynamic servo control and force-position hybrid control algorithms, implementing them in robot platforms.</p>
                        <p className="text-purple-400 font-semibold">Annual Salary Range: 450k - 800k CNY</p>
                      </div>

                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">2.2 Robot Perception Algorithm Engineer</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Develop multi-sensor (LiDAR, vision, IMU) fusion SLAM, scene understanding, and target recognition algorithms.</p>
                        <p className="text-cyan-400 font-semibold">Annual Salary Range: 400k - 750k CNY</p>
                      </div>

                      <div className="border-l-2 border-pink-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">2.3 Robot Software Platform Engineer</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Design and develop unified robot software framework, simulation platform, and highly reliable core middleware.</p>
                        <p className="text-pink-400 font-semibold">Annual Salary Range: 350k - 700k CNY</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* IoT & Systems Division */}
              <TabsContent value="iot" className="space-y-4">
                <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30">
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">III. IoT & Systems Engineering Division</h3>
                      <p className="text-gray-400 mb-6">Build IoT PaaS platform and edge computing solutions</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">3.1 IoT Platform Senior Engineer</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Develop core IoT PaaS platform services (device access, rule engine, data processing) and optimize performance.</p>
                        <p className="text-purple-400 font-semibold">Annual Salary Range: 500k - 900k CNY</p>
                      </div>

                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">3.2 Edge Computing Specialist</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Develop lightweight AI model deployment framework for edge devices, inference optimization, and edge-cloud collaborative computing architecture.</p>
                        <p className="text-cyan-400 font-semibold">Annual Salary Range: 450k - 850k CNY</p>
                      </div>

                      <div className="border-l-2 border-pink-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">3.3 IoT Security Engineer</h4>
                        <p className="text-gray-300 mb-3">Core Responsibility: Build end-to-end IoT security system including device authentication, communication encryption, vulnerability discovery and protection.</p>
                        <p className="text-pink-400 font-semibold">Annual Salary Range: 400k - 750k CNY</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Research Institute */}
              <TabsContent value="research" className="space-y-4">
                <Card className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-purple-500/30">
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">IV. Frontier Technology Research Institute</h3>
                      <p className="text-gray-400 mb-6">Explore the boundaries of human knowledge and build global academic leadership</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-2 border-purple-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">4.1 Chief Scientist - Spatio-Temporal Synchronous/Asynchronous Navigation</h4>
                        <p className="text-gray-300 mb-3">Lead the theoretical framework construction of spatio-temporal navigation systems, guide interdisciplinary teams in core technology breakthroughs.</p>
                        <p className="text-purple-400 font-semibold">Compensation: "Purple Star Scholar" Leadership Program, base package not less than 2M CNY annually</p>
                      </div>

                      <div className="border-l-2 border-cyan-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">4.2 Chief Scientist - Spatio-Temporal Encoding/Decoding</h4>
                        <p className="text-gray-300 mb-3">Create new representations of spatio-temporal information, develop compression, encryption and reconstruction theories, build complete mathematical and information frameworks.</p>
                        <p className="text-cyan-400 font-semibold">Compensation: "Purple Star Scholar" Leadership Program, base package not less than 1.8M CNY annually</p>
                      </div>

                      <div className="border-l-2 border-pink-500 pl-4">
                        <h4 className="text-lg font-semibold text-white mb-2">4.3 (Senior) Spatio-Temporal Information Processing Scientist</h4>
                        <p className="text-gray-300 mb-3">Under Chief Scientist guidance, conduct in-depth research in spatio-temporal standards, data fusion and other specific directions with engineering attempts.</p>
                        <p className="text-pink-400 font-semibold">Annual Salary Range: 700k - 1.5M CNY + Performance Bonus & Project Incentive</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-700">
                      <p className="text-gray-300 mb-4"><span className="text-white font-semibold">We Offer:</span></p>
                      <ul className="space-y-2 text-gray-400 text-sm">
                        <li>• Competitive compensation and equity/stock option incentive plans</li>
                        <li>• Opportunities to collaborate with industry-leading technology teams</li>
                        <li>• Systematic technical and management training and academic conference participation</li>
                        <li>• Flat management and open innovation culture</li>
                      </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-700">
                      <p className="text-gray-300 mb-4"><span className="text-white font-semibold">How to Apply:</span></p>
                      <p className="text-gray-400 text-sm mb-3">Send your resume to <span className="text-purple-400 font-semibold">careers@sauvs.com</span> with subject line "Division Name - Position Title"</p>
                      <p className="text-gray-400 text-sm">Research Institute positions: <span className="text-cyan-400 font-semibold">research-fellowship@sauvs.com</span></p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
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
              Partnership Opportunities
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              We look forward to collaborating with global partners to advance smart technology development and application.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={() => setLocation(`/${language}/contact`)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
              >
                Contact Us <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
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
                <span className="text-lg font-bold text-white">UVS</span>
              </div>
              <p className="text-gray-400 text-sm">
                Focused on AI, smart robots, IoT technology innovation and spacetech aircraft R&D and application.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href={`/${language}#products`} className="text-gray-400 hover:text-white transition">
                    AI Software
                  </a>
                </li>
                <li>
                  <a href={`/${language}#products`} className="text-gray-400 hover:text-white transition">
                    Smart Robots
                  </a>
                </li>
                <li>
                  <a href={`/${language}#products`} className="text-gray-400 hover:text-white transition">
                    IoT Solutions
                  </a>
                </li>
                <li>
                  <a href={`/${language}#products`} className="text-gray-400 hover:text-white transition">
                    Spacetech Aircraft
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href={`/${language}#solutions`} className="text-gray-400 hover:text-white transition">
                    Technical Consulting
                  </a>
                </li>
                <li>
                  <a href={`/${language}#solutions`} className="text-gray-400 hover:text-white transition">
                    System Integration
                  </a>
                </li>
                <li>
                  <a href={`/${language}#solutions`} className="text-gray-400 hover:text-white transition">
                    Technical Support
                  </a>
                </li>
                <li>
                  <a href={`/${language}#solutions`} className="text-gray-400 hover:text-white transition">
                    FinTech Solutions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: satifuxie@gmail.com</li>
                <li>Phone: (+86)1519387647</li>
                <li>Address: Xi'an, Shaanxi, China</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 UVS Smart Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
