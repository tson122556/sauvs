import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
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

  const generalProjects = [
    "人工智能应用软件开发",
    "人工智能公共服务平台技术咨询服务",
    "技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广",
    "信息系统集成服务",
    "智能控制系统集成",
    "智能机器人的研发",
    "智能机器人销售",
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
    "增值电信业务经营许可证（信息服务业务）",
  ];

  // 合作伙伴数据，包含 Logo URL 和官网链接
  const partners = [
    // 第一行：国际科技企业
    {
      name: "Google",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/eaJsCEVwYATkRPfo.jpg",
      url: "https://www.google.com",
    },
    {
      name: "Huawei",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/wrqNyZUhOkIFdGRP.png",
      url: "https://www.huawei.com",
    },
    {
      name: "NVIDIA",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rZjYjnVugZVdMdMm.jpg",
      url: "https://www.nvidia.com",
    },
    {
      name: "Tesla",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/paQBRtEPVVDsKaUG.jpg",
      url: "https://www.tesla.com",
    },
    {
      name: "Meta",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/vdIfFIxMkZeYECcU.jpg",
      url: "https://www.meta.com",
    },
    {
      name: "Boston Dynamics",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hDujRGvBsJLoeiqd.png",
      url: "https://www.bostondynamics.com",
    },
    // 第二行：中国科技企业
    {
      name: "Alibaba",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/DWRtZoVSLRrFtKOi.png",
      url: "https://www.alibaba.com",
    },
    {
      name: "Baidu",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/xISTsJJSCDSZSqUV.png",
      url: "https://www.baidu.com",
    },
    {
      name: "Xiaomi",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UtngVcEqsPPIYCZN.png",
      url: "https://www.xiaomi.com",
    },
    {
      name: "JD",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/RVxCRODMBYovFfdR.png",
      url: "https://www.jd.com",
    },
    {
      name: "Tencent",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/zHvKuhnitFEJhDie.png",
      url: "https://www.tencent.com",
    },
    {
      name: "DJI",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/oFMjzeGhLYEPeOda.jpg",
      url: "https://www.dji.com",
    },
    // 第三行：新兴科技企业
    {
      name: "DeepSeek",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/paluIHNcpiCRrKVy.png",
      url: "https://www.deepseek.com",
    },
    {
      name: "Moore Threads",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tfxzXVIvOpmBrkoL.png",
      url: "https://www.mthreads.com",
    },
    {
      name: "CATL",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SDlWCGjYdrncvpId.jpg",
      url: "https://www.catl.com",
    },
    {
      name: "BYD",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jQamhtrkiLjgucvQ.png",
      url: "https://www.byd.com",
    },
    {
      name: "CITIC Group",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/lwKKJnmYnISHaZcR.png",
      url: "https://www.citic.com",
    },
    {
      name: "中国共青团",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ZutuLLAAZfAXnngs.png",
      url: "https://www.gqt.org.cn",
    },
    // 第四行：政府与金融机构
    {
      name: "科创中国",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/FaDsfepYmWleIWxI.png",
      url: "https://www.kechuangchina.com",
    },
    {
      name: "Microsoft",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/qFvtRWRZNGCBFJEP.png",
      url: "https://www.microsoft.com",
    },
    {
      name: "Tsinghua University",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/NoWmIdgPjiCuiszH.png",
      url: "https://www.tsinghua.edu.cn",
    },
    {
      name: "中国电信",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/whgQezFxaTRPtMVQ.png",
      url: "https://www.chinatelecom.com.cn",
    },
    {
      name: "中国光华科技基金会",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/pduUmnIayXBaRucN.png",
      url: "https://www.cghf.org.cn",
    },
    {
      name: "学联",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/BYQYwyFQgnIlMynj.png",
      url: "https://www.xuelian.org.cn",
    },
    // 第五行：国际顶尖高校与研究机构
    {
      name: "Oxford University",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jXZgUnwHgWNTvFoR.png",
      url: "https://www.ox.ac.uk",
    },
    {
      name: "MIT",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ZIcMalCTYPNIspYs.svg",
      url: "https://www.mit.edu",
    },
    {
      name: "Harvard University",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/tUivsGlOeJcfNRsk.png",
      url: "https://www.harvard.edu",
    },
    {
      name: "中国科学技术大学",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/yRQJFSjiJMiWNswJ.png",
      url: "https://www.ustc.edu.cn",
    },
    {
      name: "中国工程院",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/UkBjGQAcrbhnYKTl.png",
      url: "https://www.cae.cn",
    },
    {
      name: "宇树科技",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hufXZlnGUtzGvxog.png",
      url: "https://www.unitree.com",
    },
    // 第六行：国内高校与研究机构
    {
      name: "WAIC",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/ayidXxkWNjqtNIXa.png",
      url: "https://www.waic.sh.cn",
    },
    {
      name: "浙江大学",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/QutnuHkFhDIqDaBU.svg",
      url: "https://www.zju.edu.cn",
    },
    // 第七行：国内高校与研究机构（续）
    {
      name: "中国科学技术大学",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/yRQJFSjiJMiWNswJ.png",
      url: "https://www.ustc.edu.cn",
    },
    {
      name: "哈尔滨工业大学",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/lycimjpCbFokWvcp.png",
      url: "https://www.hit.edu.cn",
    },
    {
      name: "复旦大学",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rsaQvxvsSwwGxBOE.png",
      url: "https://www.fudan.edu.cn",
    },
    {
      name: "南京大学",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SlmERcDRcItGNNjx.png",
      url: "https://www.nju.edu.cn",
    },
    {
      name: "Cambridge University",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jXZgUnwHgWNTvFoR.png",
      url: "https://www.cam.ac.uk",
    },
    {
      name: "Oxford University",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/jXZgUnwHgWNTvFoR.png",
      url: "https://www.ox.ac.uk",
    },
    // 第八行：半导体和科技巨头
    {
      name: "Kingsoft",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/DWRtZoVSLRrFtKOi.png",
      url: "https://www.kingsoft.com",
    },
    {
      name: "TSMC",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/SDlWCGjYdrncvpId.jpg",
      url: "https://www.tsmc.com",
    },
    {
      name: "Intel",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/rZjYjnVugZVdMdMm.jpg",
      url: "https://www.intel.com",
    },
    {
      name: "IBM",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/vdIfFIxMkZeYECcU.jpg",
      url: "https://www.ibm.com",
    },
    {
      name: "ASML",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/hDujRGvBsJLoeiqd.png",
      url: "https://www.asml.com",
    },
    {
      name: "Apple",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/paQBRtEPVVDsKaUG.jpg",
      url: "https://www.apple.com",
    },
    // 第九行：其他合作伙伴
    {
      name: "Samsung",
      logo: "https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/oFMjzeGhLYEPeOda.jpg",
      url: "https://www.samsung.com",
    },
  ];

  // 按行分组合作伙伴
  const partnerRows = [
    partners.slice(0, 6),    // 第一行
    partners.slice(6, 12),   // 第二行
    partners.slice(12, 18),  // 第三行
    partners.slice(18, 24),  // 第四行
    partners.slice(24, 30),  // 第五行
    partners.slice(30, 32),  // 第六行
    partners.slice(32, 38),  // 第七行
    partners.slice(38, 44),  // 第八行
    partners.slice(44, 46),  // 第九行
  ];

  // 渲染单个合作伙伴卡片
  const PartnerCard = ({ partner }: { partner: (typeof partners)[0] }) => (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center h-20 rounded-lg hover:bg-slate-700/30 transition cursor-pointer"
      title={`访问 ${partner.name} 官网`}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="h-16 w-auto transition-transform group-hover:scale-110"
      />
      {/* 悬停时显示外链图标 */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition">
        <ExternalLink size={14} className="text-cyan-400" />
      </div>
    </a>
  );

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

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <motion.section
          className="py-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              关于我们
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              极紫星智慧科技有限公司致力于推动人工智能、智能机器人、物联网和时空同步飞行器的技术创新
            </motion.p>
          </div>
        </motion.section>

        {/* Company Info */}
        <motion.section
          className="py-16 px-4 bg-slate-900/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">公司简介</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  极紫星智慧科技有限公司是一家专注于人工智能、智能机器人、物联网和时空同步飞行器研发的高科技企业。我们汇聚了来自全球的顶尖人才，致力于开发前沿的智慧解决方案。
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  公司提供技术咨询、系统集成、技术支持和金融科技等全方位服务，为各行业客户提供定制化的智能化解决方案。
                </p>
                <Button
                  onClick={() => setLocation("/contact")}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                >
                  了解更多 <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-purple-500/20 p-6">
                  <CheckCircle2 className="text-cyan-400 mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">技术创新</h3>
                  <p className="text-gray-400 text-sm">
                    持续投入研发，推动前沿技术突破
                  </p>
                </Card>
                <Card className="bg-slate-800/50 border-purple-500/20 p-6">
                  <CheckCircle2 className="text-cyan-400 mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">全球合作</h3>
                  <p className="text-gray-400 text-sm">
                    与全球顶尖机构建立合作关系
                  </p>
                </Card>
                <Card className="bg-slate-800/50 border-purple-500/20 p-6">
                  <CheckCircle2 className="text-cyan-400 mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">客户至上</h3>
                  <p className="text-gray-400 text-sm">
                    为客户提供优质的服务和支持
                  </p>
                </Card>
                <Card className="bg-slate-800/50 border-purple-500/20 p-6">
                  <CheckCircle2 className="text-cyan-400 mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">可持续发展</h3>
                  <p className="text-gray-400 text-sm">
                    致力于可持续的技术发展
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          className="py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              我们的服务
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "技术咨询", desc: "提供专业的技术咨询服务" },
                { title: "系统集成", desc: "完整的系统集成解决方案" },
                { title: "技术支持", desc: "全天候的技术支持服务" },
                { title: "金融科技", desc: "创新的金融科技解决方案" },
              ].map((service, i) => (
                <Card
                  key={i}
                  className="bg-slate-800/50 border-purple-500/20 p-6 hover:border-cyan-500/50 transition"
                >
                  <h3 className="text-white font-bold mb-2 text-lg">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">{service.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Partners Section */}
        <motion.section
          className="py-20 px-4 bg-slate-900/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              合作伙伴
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              我们与全球领先的科技企业、研究机构和高等院校建立了紧密的合作关系。点击 Logo 可访问合作伙伴官网。
            </p>

            {/* 渲染所有行的合作伙伴 */}
            {partnerRows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center mb-8"
              >
                {row.map((partner, index) => (
                  <PartnerCard key={`${rowIndex}-${index}`} partner={partner} />
                ))}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Business Scope Section */}
        <motion.section
          className="py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              经营范围
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                  一般经营项目
                </h3>
                <ul className="space-y-3">
                  {generalProjects.map((project, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-300">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">
                  许可经营项目
                </h3>
                <ul className="space-y-3">
                  {licensedProjects.map((project, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-300">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              准备好与我们合作了吗？
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              联系我们了解更多关于我们的服务和解决方案
            </p>
            <Button
              onClick={() => setLocation("/contact")}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-6 px-8 text-lg"
            >
              立即联系 <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-purple-500/20 py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">极</span>
                  </div>
                  <span className="text-lg font-bold text-white">极紫星</span>
                </div>
                <p className="text-gray-400 text-sm">
                  致力于推动人工智能和智慧科技的发展
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">快速链接</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-gray-400 hover:text-white transition">
                      首页
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white transition">
                      关于我们
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-400 hover:text-white transition">
                      联系我们
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">服务</h4>
                <ul className="space-y-2">
                  <li>
                    <span className="text-gray-400">技术咨询</span>
                  </li>
                  <li>
                    <span className="text-gray-400">系统集成</span>
                  </li>
                  <li>
                    <span className="text-gray-400">技术支持</span>
                  </li>
                  <li>
                    <span className="text-gray-400">金融科技</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">联系方式</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>电话：待更新</li>
                  <li>邮箱：待更新</li>
                  <li>地址：待更新</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8 text-center text-gray-400 text-sm">
              <p>
                &copy; 2024 极紫星智慧科技有限公司. 保留所有权利。
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
