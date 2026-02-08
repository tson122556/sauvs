import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DepartmentRobotics() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.button
            onClick={() => setLocation("/zh/careers")}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition"
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
              智能机器人事业部
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              创造智能机器人，赋能未来生产
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
                智能机器人事业部致力于开发具有自主学习和决策能力的机器人系统。我们的团队包括机械工程师、控制系统专家和软件工程师，专注于机器人的运动控制、感知系统和智能决策。
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                部门已成功研发多款工业级机器人和服务机器人，应用于制造业、物流、医疗等领域。我们与国际顶级机器人企业和研究机构合作，致力于推动机器人技术的创新发展。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6">
                <Target className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">核心使命</h3>
                <p className="text-gray-300 text-sm">开发智能机器人解决方案</p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6">
                <Users className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">团队规模</h3>
                <p className="text-gray-300 text-sm">40+ 名工程师</p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6">
                <Zap className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">技术方向</h3>
                <p className="text-gray-300 text-sm">运动控制、感知、AI</p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6">
                <Mail className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">产品应用</h3>
                <p className="text-gray-300 text-sm">工业、物流、医疗</p>
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
                title: "运动控制系统",
                desc: "开发高精度的机器人运动控制算法和驱动系统",
                items: ["轨迹规划", "动力学控制", "实时反馈"],
              },
              {
                title: "感知与导航",
                desc: "研发机器人视觉和传感器系统，实现自主导航",
                items: ["SLAM 技术", "目标识别", "路径规划"],
              },
              {
                title: "智能决策",
                desc: "集成 AI 技术，使机器人具备自主学习和决策能力",
                items: ["强化学习", "行为规划", "人机交互"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((subitem, sidx) => (
                      <li
                        key={sidx}
                        className="text-sm text-cyan-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
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
                name: "机器人运动控制工程师",
                salary: "45万 - 80万人民币",
                requirements: [
                  "本科及以上学历，机械、控制等相关专业",
                  "3+ 年机器人控制系统开发经验",
                  "精通 ROS、MATLAB 等工具",
                  "有工业机器人项目经验优先",
                ],
              },
              {
                name: "机器人感知算法工程师",
                salary: "40万 - 75万人民币",
                requirements: [
                  "硕士及以上学历，计算机视觉或机器人相关专业",
                  "2+ 年机器人视觉系统开发经验",
                  "熟悉 OpenCV、PCL 等库",
                  "有 SLAM 或 3D 重建经验优先",
                ],
              },
              {
                name: "机器人软件平台开发工程师",
                salary: "35万 - 70万人民币",
                requirements: [
                  "本科及以上学历，计算机相关专业",
                  "2+ 年 C++/Python 开发经验",
                  "熟悉 ROS 框架",
                  "有嵌入式系统开发经验优先",
                ],
              },
              {
                name: "机器人硬件工程师",
                salary: "40万 - 75万人民币",
                requirements: [
                  "本科及以上学历，电子工程或机械工程专业",
                  "3+ 年硬件设计或系统集成经验",
                  "熟悉 PCB 设计和嵌入式系统",
                  "有机器人或工业控制经验优先",
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
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-cyan-500/30 p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pos.name}
                  </h3>
                  <p className="text-cyan-300 font-semibold mb-4">
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
                          <span className="text-cyan-400 mt-1">•</span>
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
            <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                准备加入我们了吗？
              </h3>
              <p className="text-gray-300 mb-8">
                如果您对机器人技术充满热情，欢迎投递简历
              </p>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
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
