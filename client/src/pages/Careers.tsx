import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Briefcase } from "lucide-react";
import { useLocation } from "wouter";

export default function Careers() {
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

  const departments = [
    {
      title: "人工智能事业部",
      color: "from-purple-900/40 to-purple-900/20 border-purple-500/30",
      positions: [
        {
          name: "机器学习算法专家 (MLE)",
          salary: "40万 - 75万人民币",
          icon: "🤖",
        },
        {
          name: "计算机视觉工程师 (CV Engineer)",
          salary: "35万 - 65万人民币",
          icon: "👁️",
        },
        {
          name: "AI解决方案架构师",
          salary: "60万 - 110万人民币 + 项目奖金",
          icon: "🏗️",
        },
      ],
    },
    {
      title: "智能机器人事业部",
      color: "from-cyan-900/40 to-cyan-900/20 border-cyan-500/30",
      positions: [
        {
          name: "机器人运动控制工程师",
          salary: "45万 - 80万人民币",
          icon: "⚙️",
        },
        {
          name: "机器人感知算法工程师",
          salary: "40万 - 75万人民币",
          icon: "📡",
        },
        {
          name: "机器人软件平台开发工程师",
          salary: "35万 - 70万人民币",
          icon: "💻",
        },
      ],
    },
    {
      title: "物联网与系统工程部",
      color: "from-pink-900/40 to-pink-900/20 border-pink-500/30",
      positions: [
        {
          name: "物联网平台资深开发工程师",
          salary: "50万 - 90万人民币",
          icon: "🌐",
        },
        {
          name: "边缘计算专家",
          salary: "45万 - 85万人民币",
          icon: "⚡",
        },
        {
          name: "物联网安全工程师",
          salary: "40万 - 75万人民币",
          icon: "🔒",
        },
      ],
    },
    {
      title: "前沿技术研究院",
      color: "from-indigo-900/40 to-indigo-900/20 border-indigo-500/30",
      positions: [
        {
          name: "时空异步/同步航行器首席科学家",
          salary: "200万+ 人民币 + 科研经费",
          icon: "🚀",
        },
        {
          name: "时空编码/解码体首席科学家",
          salary: "180万+ 人民币 + 研究经费",
          icon: "🔬",
        },
        {
          name: "时空信息处理科学家",
          salary: "70万 - 150万人民币 + 绩效奖金",
          icon: "📊",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

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
              点亮我们
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                加入极紫星
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              我们正在寻找杰出的人才加入我们的团队，共同开创未来。无论您是算法专家、工程师还是研究科学家，极紫星都为您提供广阔的舞台和无限的可能。
            </motion.p>

            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={() => {
                  const element = document.getElementById("positions");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
              >
                浏览职位 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-white hover:bg-purple-500/10"
              >
                <Mail className="mr-2 w-4 h-4" />
                投递简历
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Positions Section */}
      <section id="positions" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">招聘职位</h2>
            <p className="text-gray-400 text-lg">
              探索我们各个事业部和研究院的机会
            </p>
          </motion.div>

          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {departments.map((dept, idx) => {
              const departmentPaths = [
                '/zh/department/ai',
                '/zh/department/robotics',
                '/zh/department/iot',
                '/zh/department/research'
              ];
              return (
              <motion.div key={idx} variants={fadeInUp}>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Briefcase className="w-8 h-8 text-purple-400" />
                    {dept.title}
                  </h3>
                  <Button
                    onClick={() => setLocation(departmentPaths[idx])}
                    variant="outline"
                    className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                  >
                    了解更多 <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dept.positions.map((pos, pidx) => (
                    <Card
                      key={pidx}
                      className={`bg-gradient-to-br ${dept.color} p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer`}
                    >
                      <div className="text-4xl mb-4">{pos.icon}</div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {pos.name}
                      </h4>
                      <p className="text-purple-300 font-semibold text-sm">
                        {pos.salary}
                      </p>
                      <Button
                        onClick={() => setLocation(departmentPaths[idx])}
                        variant="ghost"
                        className="mt-4 text-purple-400 hover:text-purple-300 p-0"
                      >
                        了解更多 <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </motion.div>
            );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">我们提供</h2>
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
                title: "竞争力的薪酬福利",
                desc: "具备市场竞争力的薪资、绩效奖金、股权/期权激励计划、完善的五险一金及补充商业保险",
              },
              {
                title: "前沿的工作环境",
                desc: "与行业顶尖的技术团队共事，接触并参与最前沿的科研与工程项目",
              },
              {
                title: "持续的成长体系",
                desc: "系统的技术与管理培训、国内外顶级学术会议参与机会、清晰的双通道职业发展路径",
              },
              {
                title: "开放的文化氛围",
                desc: "扁平化的管理模式、鼓励创新与跨界交流、关注工作与生活的平衡",
              },
            ].map((benefit, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/30 p-8 h-full">
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-300">{benefit.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-purple-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                准备好加入我们了吗？
              </h3>
              <p className="text-gray-300 mb-8">
                我们期待与充满智慧与激情的您相遇，共同点亮下一个未来。
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Button
                  onClick={() => window.open("mailto:careers@sauvs.com")}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                >
                  <Mail className="mr-2 w-4 h-4" />
                  发送简历
                </Button>
                <Button
                  onClick={() => setLocation("/about")}
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-white hover:bg-purple-500/10"
                >
                  了解公司 <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
