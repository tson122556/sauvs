import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
            onClick={() => setLocation("/")}
          >
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/HkYABfbCUJbFZIwP.png" alt="Jizixing" className="h-12 w-auto" />
            <span className="text-lg font-bold text-white">极紫星</span>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href="/#products" className="text-gray-300 hover:text-white transition">
              产品中心
            </a>
            <a href="/#solutions" className="text-gray-300 hover:text-white transition">
              解决方案
            </a>
            <a href="/#services" className="text-gray-300 hover:text-white transition">
              技术服务
            </a>
            <a href="/about" className="text-white font-semibold">
              关于我们
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={() => setLocation("/contact")}
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
              专注于人工智能应用、智能机器人研发和物联网技术创新。我们致力于为企业和个人提供极致的东方智慧解决方案，推动企业和个人向未来产业数字化转型。
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
                    <p className="text-white font-semibold">西安极紫星智慧科技有限公司</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">成立时间</p>
                    <p className="text-white font-semibold">2025年5月</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">注册资本</p>
                    <p className="text-white font-semibold">2000万元</p>
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
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/IOOzTSdsnBcdpvGkuyzxcR-img-1_1770198219000_na1fn_Z29vZ2xlLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L0lPT3pUU2RzbkJjZHB2R2t1eXp4Y1ItaW1nLTFfMTc3MDE5ODIxOTAwMF9uYTFmbl9aMjl2WjJ4bExXeHZaMjgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=m8wHhO1xLojRdaNdxqvufj64QcSRQlkA6ZaQSyZBrchPf1sQ7RG8cSceiUxWgC-70H7zuNMLqO7JVeGnfpA-36q1qrfUspnFwURxAmUcGW8-u3cvMf4SsOb~9FhxCz75oHUK6yLJ7KQ0x~f8dieMm7LOlV3wJThXhbPDBCvjAWURId~2DAjAAzPBJRpy6La0Y9WtxYEhL3z-sQ9pkzgIvoMg9a4udPwOv1oLo1Pm-gBUAY8DME7Vb6psgEk6nQvsGH7WqzRVJj8t~U471pCwzd1sEx3bcVui5agUn8WP2-Ah92bRnq1H8su~xD-cFTvcRZMyZUeXW5WjYRUkFbeGbg__" alt="Google" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/IOOzTSdsnBcdpvGkuyzxcR-img-2_1770198222000_na1fn_aHVhd2VpLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L0lPT3pUU2RzbkJjZHB2R2t1eXp4Y1ItaW1nLTJfMTc3MDE5ODIyMjAwMF9uYTFmbl9hSFZoZDJWcExXeHZaMjgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MTj1wDijtMici~3ZNQHQ3AcyOWplyeWfSV3Z8hFdDbMaHfa~CcfAtFE20xra2b32sPQFVxRFbYpPs4FQgVHPcMNm-UIhVtPKCOn4mAhTALPZ5Nwhe5lwfOajRzKjfWMdnU0lszpcIED3uF-1KwaB~wg5o3UM3CmpSjz4q~yPZNJm7cWjC1SVOVgN0KJBz7TzKHZy0627XbSg3mW4QCYJFPIjLn58o6KjSszNmzcso9gSEHcYUo9DGuOUS63x0XCEUucKn1UxfvqHDWAORKHa8H4uWIh0jKVNmWdJAygvKmdIXg6Z3B8hN-X-5laWw9-qYJFV6WICbepIR2gk2ESedg__" alt="Huawei" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/IOOzTSdsnBcdpvGkuyzxcR-img-3_1770198219000_na1fn_bnZpZGlhLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L0lPT3pUU2RzbkJjZHB2R2t1eXp4Y1ItaW1nLTNfMTc3MDE5ODIxOTAwMF9uYTFmbl9iblpwWkdsaExXeHZaMjgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PNH3QasQVA1ZpIePF0NxuYTecL7Nso8eMzskJJ0cFs8lEf8gfNHa6pS-3iaJAXofjka1PbzMj4SPG1OMpaXab1fNaaV4WS85ciUfQlgQatXhXMQYg33LCZDK0UZL-~uACE6Fto-RDzPET8O6CvyQnNaDu~-S6zn7Vw3wnl3nwFHh9d-80~zqOsA6HbtoZP7mMsv4k~plMmIYPyOkflioM6FbI94O7DUr9wEOO43BpOYp3gMegpSPF3e0s9pYmEWfrTtrjVfwdhl~rX2qX227XD4lw2j9RXQPZOkJKrpH~a0pk2yWbLSZoldpbdpwUcYpS~nd93n-2pm0412hYC1MRA__" alt="NVIDIA" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/IOOzTSdsnBcdpvGkuyzxcR-img-4_1770198232000_na1fn_dGVzbGEtbG9nbw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L0lPT3pUU2RzbkJjZHB2R2t1eXp4Y1ItaW1nLTRfMTc3MDE5ODIzMjAwMF9uYTFmbl9kR1Z6YkdFdGJHOW5idy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=bWixgjBXtfaPEaslHvDYQSAb~BqV6e6wDlIZUn1oL2KEpkmDWDl9QDojWHRZNEYveEYttRLK1B5~Udk5wQI1mzd6Bo1PBH0wcvwLC~LNTmX~tzfFx8WqZDxpbOO7Fjoq-b5JqeHzOs7QsHFq7Wk6mC-7XjA3RBXYkB6DWlar819CsGtWiwSpgjmW~UxjncCq1MxaQ6i4sANVZDm6l2KjLs1~0EvcdZ28VvSLBMFXxJzys8BRdYbdJtj0Sg1VRPKyfIfogGOqKz1YRfmOfVQtuqIGhgUY9Grt~6lfukiyGUO4UwJHY0e3R-yfV7JrxgWCGB8uI7-BhmneDvvS8b7SWw__" alt="Tesla" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/IOOzTSdsnBcdpvGkuyzxcR-img-5_1770198218000_na1fn_bWV0YS1sb2dv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L0lPT3pUU2RzbkJjZHB2R2t1eXp4Y1ItaW1nLTVfMTc3MDE5ODIxODAwMF9uYTFmbl9iV1YwWVMxc2IyZHYucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=mfe-GdRk9Um70l36PfHg3BZ86fY6FtqdJlfBUWYjFhMW99~s2wfN00pdz3YE1IyiJufqktIXNtQOPBzGxQOOHhhn633lE6EhDZ0HwkbfyhPuLW6q4sxN77UKabNZydylBXLULnJs8bkDgqsFHW2OgOtVFWLOXABLEPQqK2tD61l55ez5kps0zaBJuW~4x31e8Q62HCNAplINdQH0QP~Rv4ilegKMp0bpnv1MdEv~SgDKKVd7t2VWE7724J-xsjbEcRhunDJcweoL3CfXQFY-VU3S-Tchehxher6llpZA66x35GIBNJq1z0bdkQ3ROud-qVO6~u6H34OprVaqSZlgLQ__" alt="Meta" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/o6Qg6K6ZaV2IW1Yjv9LxAq-img-1_1770198276000_na1fn_Ym9zdG9uLWR5bmFtaWNzLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L282UWc2SzZaYVYySVcxWWp2OUx4QXEtaW1nLTFfMTc3MDE5ODI3NjAwMF9uYTFmbl9Ym9zdG9uLWR5bmFtaWNzLWxvZ28ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TZOmqLVK7Zv5ccldEKSXZkgD8Bs1AYzPLWEDAIxZMpsDzvA59FXWAFIS2GUlbGU4IfoC~sedvmN2LiNtJKGg88sYs~z0y6mhw2EXcE-pmwPrOKBha7-~ABKP9LKXPo9osf~leXvnnu96bR-7AF9fjbnGCl6eDdAjVNwvsq1935dNgAGEz4Z4TXgawOCPyvnTSoUqAVpik2s-AUwV-T78L-ZLpx0Tc7TNp2DCorPycFAi45VOKs1F47HJHZRSLdMY5IoFBhXGxbYjk7oFJMeO1qEh9d0m3mjeh1Cddum~hxI1PuQOgiuY7lwd-qLmgD7fd6hZx3M99t-HClSqpYhxIQ__" alt="Boston Dynamics" className="h-16 w-auto" />
                </div>
              </div>

              {/* Center Logo - Jizixing */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur-lg opacity-50"></div>
                  <div className="relative bg-slate-900 p-4 rounded-lg border border-purple-500/50">
                    <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/HkYABfbCUJbFZIwP.png" alt="Jizixing" className="h-32 w-auto" />
                  </div>
                </div>
              </div>

              {/* More Partner Logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/o6Qg6K6ZaV2IW1Yjv9LxAq-img-2_1770198272000_na1fn_YWxpYmFiYS1sb2dv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L282UWc2SzZaYVYySVcxWWp2OUx4QXEtaW1nLTJfMTc3MDE5ODI3MjAwMF9uYTFmbl9ZV3hwWW1GaVlTMXNiMmR2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=JXmpM2G2-PtOTH6eXGjLQd6b24qRylyF9a5AtoPL6RDrTIag0F2WYu0V3XPtoyKJqnv79eIm61fAzJAG58fM-wnd0EacpB-6nAIAhyxLGiB86U9W5EdnWXmvpXr16xYz1hGyVG-bg0Tq4nDtU8D6NfgZgc1CFh5PiuLPgeybSPSRP~iVgo32XbwkpVzqqzgW1P7YVeMz48I7AREsNVHnq485Wn0n~zrHCvXsk8-Qf8D~dzGckDRvmHpZzVrI-nThuEa9~j9TWGXVP5FSTd~M0n6avZI~QWIb2GsNJkshqAgtzxJZWYMydb0sON77yDgxBWTf7X1K40Oh4jSAhQXGFg__" alt="Alibaba" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/o6Qg6K6ZaV2IW1Yjv9LxAq-img-3_1770198268000_na1fn_YmFpZHUtbG9nbw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L282UWc2SzZaYVYySVcxWWp2OUx4QXEtaW1nLTNfMTc3MDE5ODI2ODAwMF9uYTFmbl9ZbUZwWkhVdGJHOW5idy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=QcuuKfrlvAqxPRvg749NLho0gS3yUY5xIimRwXxwGxIjFM~qJ-D9VEzSY3jjFCnCcI2N1y7NZV8vy7dhhCba378f1dSZSpscKeMGBHX9iwRbbQh~L-v5txJHx-4fqGzSpS1Lb3Babg8XFfrjZDJ8Ufrgz7SCnxvBz3K84MicWANjIuVHyiGT3RSvTNtL4xFP8D1QtP7qd9y8kPkLohIA2P-WQ29UGLBSwXKQJBBj9ZhMrpIJUSVNtRzHWJSp~b2BFpF~seUryvrKK7dtHTp2GnNyVdrNUtD4QFEuG6dwvl7kxL16q-yVYc1I~bwmMcnmGEqACartLJzG83Gt5-znZw__" alt="Baidu" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/o6Qg6K6ZaV2IW1Yjv9LxAq-img-4_1770198269000_na1fn_eGlhb21pLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L282UWc2SzZaYVYySVcxWWp2OUx4QXEtaW1nLTRfMTc3MDE5ODI2OTAwMF9uYTFmbl9lR2xoYjIxcExXeHZaMjgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=XhGLT54nJY6-8ZLT~nZsJ6ip5GlYG-zZR0JTJuzgggt66LWggzkkGiKHaHN1upJuH8hh4g2L~YPyv2--aPh2oCzZ5T4nRXZlPBYYhz73xrrNbAYwG85axlWkWZB6sOYksEdsRFMILAOCKT3cAZMpE6R7z8Ipsh~z5er~pvnIfnn~laWBq4XG3fybEoJB5S-bug56B9onXe5HSc5NUH0wSDIke2OJmVdNlZ~gad6xGZ61ClfLo9i~JzgUBLDfxRrGUKvDLB9FdsXtkcOv98ZvgvIL4YqU3aOEsFJTJ7SIWJiPu41Iq2iZrfhEkTXfm5LzfCZx92xTJVuyGtUcHT7aug__" alt="Xiaomi" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/o6Qg6K6ZaV2IW1Yjv9LxAq-img-5_1770198276000_na1fn_amQtbG9nbw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L282UWc2SzZaYVYySVcxWWp2OUx4QXEtaW1nLTVfMTc3MDE5ODI3NjAwMF9uYTFmbl9hbVF0Ykc5bmJ3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=q6NhhF7xF3yith4ZAa4vIwk6netgNU8JLfRZIiqmN2s4CfdcwZBHwLXIIfwjI6piBJGUlz9TNzDoyzARZjrJLsAaLzfaooXjs5kxkpqbvU~nve4T0WIY3Ayor~DntYDi0kM06mZKcon07WNlQEX0fyYVjaSMOPzy2InS7i-zo0~vFfb4ihsnU7sVveQl1flKW08yT-MIBCIoRUGqmOtyX6cA6-oXsqrnAx8fWkhm6U~MxWFRQ5Im0BYWut-~cbKxKZQ5EvMPYovbhH-FLRnfn536ELE-M0gN0kR1fazV8Mnc0EVpBg3ukePQBVY1Wc-YkiBxPtQlSG9SiHgG6Eh2Ig__" alt="JD" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/7nU8AuPBKrMR7OEVCVEO4p-img-1_1770198314000_na1fn_dGVuY2VudC1sb2dv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94LzduVThBdVBCS3JNUjdPRVZDVkVPNHAtaW1nLTFfMTc3MDE5ODMxNDAwMF9uYTFmbl9kR1Z1WTJWdWRDMXNiMmR2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=E6WGitvnPR9oJLBOBJKeB1VbbWSr67E~gyO6QgDILGY4D0FeOO~jv84qT843mMBJmggHuPBWFWkKq86zhjwxoLktAmo5n8LpiIQ8Mkpe783uq19z4u6S7Wf43BVfk2mvuzyr4GC2F-p6j6E5DwcrpHAZzXkhnvQmlKvsBzc~~90Brr2CMd0Hb-6LtBFZ9wwpTvN-DQ7-LCrRwpAbLIse4O8W449LqJfU9L3E1hL2OzWF5NO7xpXkSWAN6t0Tz1U2NaaxlA~IQ848eOmLNALodcCxkIdA7FaRj8GcMXz6FAmlS3QBy5vXDe5n0mh0mRnxOoeTALyKOSFchhMMa7Bv2A__" alt="Tencent" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/7nU8AuPBKrMR7OEVCVEO4p-img-2_1770198313000_na1fn_ZGppLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94LzduVThBdVBCS3JNUjdPRVZDVkVPNHAtaW1nLTJfMTc3MDE5ODMxMzAwMF9uYTFmbl9aR3BwTFd4dloyOC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=E8TexUuLUHCBf4xfV9iq65x38ndPvS2xYTJP0QCCh~ZGUmD3N7ffcf9AQ4WmKEFNJ8N9ncmS4fS0eJHWhncXZNjoX8YOOdXoVt2fLFPpYMC6nUQ~zSPoRgiqKqL6xfJCjNAbneyKroRfDOTN69k7VfBMneYZ~jLb4QE1YfUjlpZZZX5ZsBIs7DgaxG0Zx8-Er-WZvUN2yu01EwMt3ZHbZsJ8pDlUkr~Z8JDRc~paRtINATRsPO48CkSmhi8SHjpo4rVlMUaikwy-~U9R0oYVlSIfrNtYjjMHOcsM07NjKjsPvikJijnzmuRntujZfZBMwNROa7nYpFEcw7IzTjlj2g__" alt="DJI" className="h-16 w-auto" />
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-center mt-6">
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/7nU8AuPBKrMR7OEVCVEO4p-img-3_1770198314000_na1fn_ZGVlcHNlZWstbG9nbw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94LzduVThBdVBCS3JNUjdPRVZDVkVPNHAtaW1nLTNfMTc3MDE5ODMxNDAwMF9uYTFmbl9aR1ZsY0hObFpXc3RiRzluYncucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Ko~nSNzeZEAcxbQvZ9~H4i4MvhnPxDliFvvqzfA9gYUo4Ek9QQJ8KxbE0JkwwOYbAleOWyvOrZ2JS3NSZjpZZAubltkmL~sn7NyiUFiJx65lgF-hTRGwkxIFkxC1hdhi8ejFjR~mI7ZeVZh0gFtzTBEibpMghSmDwatTEUX1vZaw1kQb0otJ47bufQmO8VXZj9UCHXztcP2U2llDZEEIKed~DoJJ0ZOsiUKyCvmlMkcn4SpswBE5TJn9-R4PVSfcTzksp5g7J5LE9JjPBYWyFwM5khn~ohLu13QlPTrIbiPMDEnIUqNvpzT4rBJ2aylGSSbYQGZI3rdmLCHohNbs3g__" alt="DeepSeek" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/7nU8AuPBKrMR7OEVCVEO4p-img-4_1770198312000_na1fn_dW5pdHJlZS1sb2dv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94LzduVThBdVBCS3JNUjdPRVZDVkVPNHAtaW1nLTRfMTc3MDE5ODMxMjAwMF9uYTFmbl9kVzVwZEhKbFpTMXNiMmR2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=It7Bpcg1s47JIIiGw0yXi3zrgYWBKC0Mm7BiyxcCcwawE~aVBJe6lS~8XyJ9AG~6WrxVYWnMn4ZzzivoIw0ydvaug6vthzbe~5066OEv4l-eCcpiQVao9p5hqzyGc8bnScETJ42~9s5aaqIoXRE2KstazVNSIaDtcfO-TyIrFB1PWTM2-kUyTRas~KO5Asr3b4J2gfknq0T119uN7aefgUZ4UVbmHMLsM9~TzveDZros40ywCEURuh-7M-vTNspyxm~HDyVFSDPJ56y607QARls5LllJBKUofRHB9UKnewRHTjlxmaLbWf1lSvIuWN~jNdSNvRBi7c0kOzqdndLtoQ__" alt="Unitree" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/7nU8AuPBKrMR7OEVCVEO4p-img-5_1770198310000_na1fn_bXRocmVhZHMtbG9nbw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94LzduVThBdVBCS3JNUjdPRVZDVkVPNHAtaW1nLTVfMTc3MDE5ODMxMDAwMF9uYTFmbl9iWFJvY21WaFpITXRiRzluYncucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hpiXZyDwx3juzWqw~RKIjkQGUSrj6U5gmDFuCRXe-jUgZ-XgTjsTH~yZg2rJoXmrXYRaabGmN-q2d4zeD2TnK06AV0NYtRrU5lF6mcO12NyJtve1tURvA85argqTnGhw~Gva6iEvKiZCyErvvA~1zh~PFHGxjnTFC5XXMBmGK8Lv~l69VuPefyZkVTlFbg4v29cCQskTKLw9qPaLNDZgUjmu-LS59z9~EWFA8zeRQAY1V75Ud6-bHdKxQWvLPyfdV1VejlSiRzlTz1q9REC8BzcN8mUgiY~3PmSq34aJuUegKWH6Tuh3RW-S91MwCAjP4gxCeK~Zxrnc6ZFCfHWECw__" alt="Moore Threads" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/KFFPRYUvJYlgnoIZTZHOUK-img-1_1770198355000_na1fn_Y2F0bC1sb2dv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L0tGRlBSWVV2SllsZ25vSVpUWkhPVUstaW1nLTFfMTc3MDE5ODM1NTAwMF9uYTFmbl9ZMkYwYkMxc2IyZHYucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=U368Jgwk4dD5f9-eI1N24dsxlpSJ60Fv8zfXYmtebaTIST2xtBbYvw7vGwyecO2wUp6Mi19HLY~DDoTOGl0PopLVT~3QPHjkpm7TMbf0bhb5rN3JluN9Bbd1oNOR5ZQxi3Ke2K6XlujCiUWlA~Y1Zq1RdrkeKm~WmfN1s4OTwkigcEHttuehitnQl9C9dCQGdXRQ90OZe~rhjnzbY6yq3aq9YSnRFfbQy1Y-tDSq3D1OOboiBQoOzO5XckeAT1lrGEJdKxMh1zwVBWdXJ6Ni8vJMNDUk0-ZJ2tLDAzCqy1inaq3JOVHK8jIJhO7bpJ-9Z~-zCevmFUGYrB~~7nWghg__" alt="CATL" className="h-16 w-auto" />
                </div>
                <div className="flex items-center justify-center h-20 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition">
                  <img src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/KFFPRYUvJYlgnoIZTZHOUK-img-2_1770198354000_na1fn_YnlkLWxvZ28.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZmhnSVJvR0VCc1lXUmE4MXM5ODVoZi9zYW5kYm94L0tGRlBSWVV2SllsZ25vSVpUWkhPVUstaW1nLTJfMTc3MDE5ODM1NDAwMF9uYTFmbl9ZbmxrTFd4dloyOC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TVM0l2r5VLxY4i32i0JolbQD0QwTRf7YG~46uyIZ1Pdv8FqJnpjNzMllDqIL7IXfZoWC1wgqWzixGDKbOFAenrxYVb53-kBH6AeewqXRmB0F2rQkxfK5MUX-0N9HqyHMp7WyrnCFoIEOAFtOlKXu~6bAk5ju3M85DCbyxynaoEPmXUOGHsGxsy8U4gcp7RcnDga9VizEf4tGmV7Xu8YyACQKAfUfJT1OuwRRpFuIBMYN4a5H8j8Ci0qWopNCIWAgCF2NB8YUalPjVhKHN40e4E~y-0QVCsaiXwwTfVZUWKNyYw54ttl-WJOug8Ya~CJU7yh0h4QdCLGRiuAMfQRm3g__" alt="BYD" className="h-16 w-auto" />
                </div>
              </div>
            </div>

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
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">极</span>
                </div>
                <span className="text-lg font-bold text-white">极紫星</span>
              </div>
              <p className="text-gray-400 text-sm">
                专注于人工智能、智能机器人和物联网技术创新
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
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">联系</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>邮箱：info@jizixing.com</li>
                <li>电话：+86 15193876647</li>
                <li>地址：陕西省西安市雁塔区二环南路</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 西安极紫星智慧科技有限公司. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
