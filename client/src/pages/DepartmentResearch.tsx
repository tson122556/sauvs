import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DepartmentResearch() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.button
            onClick={() => setLocation("/zh/careers")}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition"
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
              前沿技术研究院
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              探索未来科技，突破创新边界
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
                前沿技术研究院是极紫星的创新引擎，致力于探索时空异步/同步航行器、时空编码/解码体等突破性技术。我们汇聚了来自全球顶级大学和研究机构的科学家和工程师，进行前沿基础研究和技术创新。
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                研究院与国际顶级科研机构合作，发表高水平学术论文，申请专利，推动科技进步。我们为有志于探索科技前沿的研究者提供世界级的研究环境和资源支持。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-6">
                <Target className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">核心使命</h3>
                <p className="text-gray-300 text-sm">突破科技前沿，创造未来</p>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-6">
                <Users className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">团队规模</h3>
                <p className="text-gray-300 text-sm">20+ 名科学家</p>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-6">
                <Zap className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">研究方向</h3>
                <p className="text-gray-300 text-sm">时空技术、量子计算</p>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-6">
                <Mail className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">合作机构</h3>
                <p className="text-gray-300 text-sm">全球顶级高校</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Research Areas */}
      <section className="py-20 relative bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            主要研究方向
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "时空异步航行器",
                desc: "研发突破性的航行器技术，实现新型空间移动方式",
                items: ["理论研究", "原型开发", "性能验证"],
              },
              {
                title: "时空编码/解码体",
                desc: "开发革命性的信息编码技术，突破传统通信限制",
                items: ["算法研究", "系统设计", "应用探索"],
              },
              {
                title: "时空信息处理",
                desc: "研究时空数据的处理和分析方法",
                items: ["理论基础", "算法设计", "应用开发"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((subitem, sidx) => (
                      <li
                        key={sidx}
                        className="text-sm text-indigo-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
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
                name: "时空异步/同步航行器首席科学家",
                salary: "200万+ 人民币 + 科研经费",
                requirements: [
                  "博士学位，物理、航空航天或相关领域",
                  "在航行器或空间技术领域有突出成就",
                  "发表过高水平学术论文或获得重要专利",
                  "具有国际学术影响力",
                ],
              },
              {
                name: "时空编码/解码体首席科学家",
                salary: "180万+ 人民币 + 研究经费",
                requirements: [
                  "博士学位，信息论、通信或相关领域",
                  "在编码理论或信息处理领域有创新成果",
                  "发表过高水平学术论文或获得重要专利",
                  "具有国际学术影响力",
                ],
              },
              {
                name: "时空信息处理科学家",
                salary: "70万 - 150万人民币 + 绩效奖金",
                requirements: [
                  "博士学位，数学、物理或计算机相关专业",
                  "3+ 年信息处理或数据分析研究经验",
                  "发表过学术论文或申请过专利",
                  "具有独立研究能力",
                ],
              },
              {
                name: "前沿技术研究工程师",
                salary: "50万 - 100万人民币 + 项目奖金",
                requirements: [
                  "硕士及以上学历，物理或工程相关专业",
                  "2+ 年前沿技术开发或研究经验",
                  "具有强大的学习能力和创新意识",
                  "能够将理论转化为实践",
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
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-indigo-500/30 p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pos.name}
                  </h3>
                  <p className="text-indigo-300 font-semibold mb-4">
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
                          <span className="text-indigo-400 mt-1">•</span>
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

      {/* Research Benefits */}
      <section className="py-20 relative bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            研究支持
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "充足的研究经费",
                desc: "为优秀科学家提供充足的研究经费和资源支持",
              },
              {
                title: "国际学术交流",
                desc: "支持参加国际学术会议和访问合作机构",
              },
              {
                title: "专业团队支持",
                desc: "配备专业的工程师和技术人员支持研究",
              },
              {
                title: "知识产权保护",
                desc: "完善的专利申请和知识产权保护机制",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-8">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-300">{item.desc}</p>
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
            <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                准备加入我们了吗？
              </h3>
              <p className="text-gray-300 mb-8">
                如果您对前沿科技研究充满热情，欢迎投递简历
              </p>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
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
