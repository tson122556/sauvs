import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DepartmentAI() {
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.button
            onClick={() => setLocation("/zh/careers")}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="w-4 h-4" />
            返回招聘页面
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              人工智能事业部
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              驱动智能未来，我们致力于开发最前沿的 AI 技术和解决方案
            </p>
          </motion.div>
        </div>
      </section>

      {/* Department Overview */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">部门概览</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                人工智能事业部是极紫星的核心创新部门，专注于机器学习、计算机视觉、自然语言处理等前沿 AI 技术的研发。我们拥有由博士、硕士组成的高素质技术团队，与国内外顶级高校和研究机构保持紧密合作。
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                部门致力于将先进的 AI 算法转化为实际应用，为客户提供智能化解决方案。我们的产品和服务已应用于工业检测、医疗诊断、智能制造等多个领域，获得了广泛的市场认可。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6">
                <Target className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">核心使命</h3>
                <p className="text-gray-300 text-sm">推动 AI 技术创新与应用落地</p>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6">
                <Users className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">团队规模</h3>
                <p className="text-gray-300 text-sm">50+ 名专业技术人员</p>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6">
                <Zap className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">技术方向</h3>
                <p className="text-gray-300 text-sm">ML、CV、NLP、强化学习</p>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6">
                <Mail className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">合作伙伴</h3>
                <p className="text-gray-300 text-sm">国内外顶级高校与企业</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 relative bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            主要工作方向
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "机器学习平台",
                desc: "开发高效的 ML 框架和工具链，支持大规模模型训练和推理",
                items: ["模型架构设计", "算法优化", "性能调优"],
              },
              {
                title: "计算机视觉",
                desc: "研发先进的视觉感知技术，应用于工业检测和医疗诊断",
                items: ["目标检测", "图像分割", "3D 重建"],
              },
              {
                title: "AI 解决方案",
                desc: "为客户提供端到端的 AI 解决方案和咨询服务",
                items: ["方案设计", "系统集成", "技术支持"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((subitem, sidx) => (
                      <li
                        key={sidx}
                        className="text-sm text-purple-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        {subitem}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            招聘职位
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "机器学习算法专家 (MLE)",
                salary: "40万 - 75万人民币",
                requirements: [
                  "硕士及以上学历，计算机、数学等相关专业",
                  "3+ 年深度学习/机器学习开发经验",
                  "精通 PyTorch、TensorFlow 等框架",
                  "有大规模模型训练经验优先",
                ],
              },
              {
                name: "计算机视觉工程师 (CV Engineer)",
                salary: "35万 - 65万人民币",
                requirements: [
                  "本科及以上学历，计算机视觉相关专业",
                  "2+ 年计算机视觉开发经验",
                  "熟悉目标检测、图像分割等经典算法",
                  "有工业应用经验优先",
                ],
              },
              {
                name: "AI解决方案架构师",
                salary: "60万 - 110万人民币 + 项目奖金",
                requirements: [
                  "硕士及以上学历，5+ 年 AI 相关工作经验",
                  "深入理解 AI 技术栈和业务应用",
                  "具有项目管理和团队协作能力",
                  "有成功的 AI 项目交付经验",
                ],
              },
              {
                name: "AI 工程实习生",
                salary: "150-200 元/天",
                requirements: [
                  "计算机、数学等相关专业在读学生",
                  "对机器学习有浓厚兴趣",
                  "掌握 Python 编程基础",
                  "能保证每周 3 天以上的实习时间",
                ],
              },
            ].map((pos, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/30 p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pos.name}
                  </h3>
                  <p className="text-purple-300 font-semibold mb-4">
                    {pos.salary}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-300">
                      任职要求：
                    </p>
                    <ul className="space-y-1">
                      {pos.requirements.map((req, ridx) => (
                        <li
                          key={ridx}
                          className="text-sm text-gray-300 flex items-start gap-2"
                        >
                          <span className="text-purple-400 mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                准备加入我们了吗？
              </h3>
              <p className="text-gray-300 mb-8">
                如果您对 AI 技术充满热情，欢迎投递简历
              </p>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              >
                <Mail className="mr-2 w-4 h-4" />
                投递简历
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
