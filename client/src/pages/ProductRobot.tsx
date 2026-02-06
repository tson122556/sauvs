import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Cpu, Shield, Wifi, Gauge, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";

export default function ProductRobot() {
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: Cpu,
      title: "智能决策系统",
      description: "基于强化学习和决策树的智能决策引擎，支持复杂场景处理",
    },
    {
      icon: Wifi,
      title: "实时通信",
      description: "低延迟、高可靠的无线通信协议，支持 5G 和边缘计算",
    },
    {
      icon: Shield,
      title: "安全防护",
      description: "多层安全防护机制，支持加密通信和身份验证",
    },
    {
      icon: Zap,
      title: "高效能源管理",
      description: "智能电源管理系统，支持快速充电和长续航",
    },
    {
      icon: Gauge,
      title: "精准控制",
      description: "毫米级精度的运动控制，支持复杂轨迹规划",
    },
    {
      icon: Lightbulb,
      title: "自适应学习",
      description: "机器人自动学习和优化，支持迁移学习",
    },
  ];

  const applications = [
    {
      title: "工业自动化",
      description: "工厂生产线自动化、质量检测、物流搬运",
      benefits: "效率提升 60% | 成本降低 40% | 安全性提升 95%",
    },
    {
      title: "医疗护理",
      description: "手术辅助机器人、康复训练、患者陪护",
      benefits: "手术精度 99.9% | 护理效率提升 70% | 患者满意度 98%",
    },
    {
      title: "服务机器人",
      description: "酒店、餐厅、商场等场景的智能服务",
      benefits: "服务覆盖率 99% | 客户满意度 96% | 运营成本降低 50%",
    },
    {
      title: "探索与救援",
      description: "灾难救援、极端环境探索、科学研究",
      benefits: "覆盖范围 10 倍提升 | 安全性提升 99% | 数据采集效率 5 倍",
    },
  ];

  const specifications = [
    { label: "处理器", value: "高性能多核处理器，支持 GPU 加速" },
    { label: "传感器", value: "视觉、触觉、听觉、嗅觉等多模态传感" },
    { label: "运动能力", value: "最高速度 5m/s | 负载能力 50kg | 精度 ±2mm" },
    { label: "通信", value: "5G、WiFi 6、蓝牙 5.2、NB-IoT" },
    { label: "电池", value: "快速充电 30 分钟 | 续航 8-12 小时" },
    { label: "操作系统", value: "自主研发 RTOS，支持 ROS 2 生态" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <motion.div
        className="pt-32 pb-20 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
              智能机器人解决方案
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            下一代智能机器人
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            融合先进的 AI 算法、高精度传感和智能控制，打造适应多场景的智能机器人系统。支持工业、医疗、服务等领域的应用。
          </motion.p>

          <motion.div
            {...fadeInUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              onClick={() => setLocation("/zh/contact")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              立即咨询 <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-lg font-semibold"
            >
              查看演示
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            核心功能特性
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 p-8 hover:border-purple-500/50 transition-all h-full">
                    <Icon className="w-12 h-12 text-purple-500 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Applications */}
      <motion.section
        className="py-20 px-4 bg-slate-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            应用领域
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-8 h-full">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {app.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{app.description}</p>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-sm text-cyan-400 font-semibold">
                      {app.benefits}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Specifications */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            技术规格
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specifications.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
              >
                <p className="text-gray-400 text-sm mb-2">{spec.label}</p>
                <p className="text-white font-semibold">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            联系我们的专家团队，了解如何将智能机器人集成到您的业务中
          </p>
          <Button
            onClick={() => setLocation("/zh/contact")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
          >
            立即联系 <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
