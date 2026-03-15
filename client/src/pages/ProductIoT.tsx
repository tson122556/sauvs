import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Wifi, Cloud, Lock, Zap, BarChart3, Lightbulb, ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ProductIoT() {
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: Wifi,
      title: "全连接生态",
      description: "支持 WiFi、蓝牙、5G、NB-IoT 等多种连接方式，实现无缝互联",
    },
    {
      icon: Cloud,
      title: "云边协同",
      description: "云端处理与边缘计算相结合，实现低延迟、高效率的数据处理",
    },
    {
      icon: Lock,
      title: "安全可靠",
      description: "端到端加密、多层认证、安全启动，确保数据和设备安全",
    },
    {
      icon: Zap,
      title: "低功耗设计",
      description: "超低功耗芯片和智能省电算法，支持长期电池供电",
    },
    {
      icon: BarChart3,
      title: "数据分析",
      description: "实时数据采集、处理和可视化，支持 AI 驱动的智能分析",
    },
    {
      icon: Lightbulb,
      title: "智能决策",
      description: "基于大数据的智能决策支持，实现自适应和自优化",
    },
  ];

  const scenarios = [
    {
      title: "智慧城市",
      description: "智能交通、环境监测、能源管理、公共安全",
      metrics: "覆盖范围 100+ 平方公里 | 设备数量 100 万+ | 数据处理 1TB+/天",
    },
    {
      title: "工业 4.0",
      description: "设备监测、预测维护、生产优化、质量控制",
      metrics: "停机时间减少 80% | 效率提升 40% | 成本降低 30%",
    },
    {
      title: "智慧农业",
      description: "土壤监测、气象预报、灌溉控制、病虫害防治",
      metrics: "产量提升 25% | 用水减少 40% | 成本降低 35%",
    },
    {
      title: "智能家居",
      description: "环境控制、安全监测、能源管理、智能家电",
      metrics: "能耗降低 35% | 舒适度提升 90% | 安全性提升 99%",
    },
  ];

  const specifications = [
    { label: "连接协议", value: "WiFi 6E、5G、NB-IoT、LoRaWAN、Zigbee" },
    { label: "数据处理", value: "实时处理 100K+ 设备 | 延迟 < 100ms" },
    { label: "存储容量", value: "支持 PB 级数据存储 | 自动分层管理" },
    { label: "安全机制", value: "256 位加密 | 多因素认证 | 安全启动" },
    { label: "可扩展性", value: "支持 1 亿+ 设备接入 | 弹性伸缩" },
    { label: "可用性", value: "99.99% SLA | 多地域冗余 | 自动故障转移" },
  ];

    return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Back Button */}
      <div className="fixed top-24 left-4 z-40">
        <Button
          onClick={() => setLocation("/zh/ai-hub")}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          返回
        </Button>
      </div>

      {/* Header */}
      <motion.div
        className="pt-32 pb-20 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeInUp} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold mb-6">
              IoT 解决方案案
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            企业级物联网平台
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            连接、管理和分析数百万台设备的数据。提供从边缘到云端的完整解决方案，支持实时监测、预测分析和智能决策。
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
              onClick={() => setLocation("/zh/demo/iot")}
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

      {/* Scenarios */}
      <motion.section
        className="py-20 px-4 bg-slate-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">
            应用场景
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-8 h-full">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {scenario.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{scenario.description}</p>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-sm text-cyan-400 font-semibold">
                      {scenario.metrics}
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
            联系我们的专家团队，了解如何将物联网解决方案集成到您的业务中
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
