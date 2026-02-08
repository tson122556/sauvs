import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DepartmentIoT() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.button
            onClick={() => setLocation("/zh/careers")}
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 mb-8 transition"
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
              物联网与系统工程部
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              连接万物，赋能智能生态
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
                物联网与系统工程部专注于构建大规模物联网平台和边缘计算系统。我们的团队拥有深厚的网络协议、嵌入式系统和云计算技术积累，致力于为客户提供端到端的物联网解决方案。
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                部门已为多个行业客户部署了成熟的物联网系统，包括智能工厂、智慧城市、远程监测等应用。我们关注系统的可靠性、安全性和可扩展性，与全球领先的物联网企业保持合作。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 p-6">
                <Target className="w-8 h-8 text-pink-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">核心使命</h3>
                <p className="text-gray-300 text-sm">构建智能物联网生态</p>
              </Card>
              <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 p-6">
                <Users className="w-8 h-8 text-pink-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">团队规模</h3>
                <p className="text-gray-300 text-sm">35+ 名工程师</p>
              </Card>
              <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 p-6">
                <Zap className="w-8 h-8 text-pink-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">技术方向</h3>
                <p className="text-gray-300 text-sm">IoT、边缘计算、云</p>
              </Card>
              <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 p-6">
                <Mail className="w-8 h-8 text-pink-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">应用领域</h3>
                <p className="text-gray-300 text-sm">工业、城市、农业</p>
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
                title: "IoT 平台开发",
                desc: "开发高可用的物联网平台，支持百万级设备接入",
                items: ["设备管理", "数据采集", "协议支持"],
              },
              {
                title: "边缘计算",
                desc: "部署边缘计算节点，实现本地数据处理和实时响应",
                items: ["边缘网关", "实时处理", "离线能力"],
              },
              {
                title: "系统集成",
                desc: "整合多个系统和设备，提供完整的解决方案",
                items: ["系统架构", "集成测试", "运维支持"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((subitem, sidx) => (
                      <li
                        key={sidx}
                        className="text-sm text-pink-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
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
                name: "物联网平台资深开发工程师",
                salary: "50万 - 90万人民币",
                requirements: [
                  "硕士及以上学历，计算机或相关专业",
                  "5+ 年物联网平台开发经验",
                  "精通 Java/Go，熟悉微服务架构",
                  "有大规模分布式系统经验",
                ],
              },
              {
                name: "边缘计算专家",
                salary: "45万 - 85万人民币",
                requirements: [
                  "硕士及以上学历，计算机相关专业",
                  "3+ 年边缘计算或嵌入式系统经验",
                  "熟悉 Linux、Docker、Kubernetes",
                  "有实时系统开发经验优先",
                ],
              },
              {
                name: "物联网安全工程师",
                salary: "40万 - 75万人民币",
                requirements: [
                  "本科及以上学历，信息安全或计算机专业",
                  "2+ 年物联网安全或网络安全经验",
                  "熟悉加密算法和安全协议",
                  "有渗透测试或安全审计经验优先",
                ],
              },
              {
                name: "IoT 嵌入式工程师",
                salary: "35万 - 70万人民币",
                requirements: [
                  "本科及以上学历，电子工程或计算机专业",
                  "2+ 年嵌入式开发经验",
                  "精通 C/C++，熟悉 RTOS",
                  "有物联网设备开发经验优先",
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
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-pink-500/30 p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pos.name}
                  </h3>
                  <p className="text-pink-300 font-semibold mb-4">
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
                          <span className="text-pink-400 mt-1">•</span>
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
            <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                准备加入我们了吗？
              </h3>
              <p className="text-gray-300 mb-8">
                如果您对物联网技术充满热情，欢迎投递简历
              </p>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
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
