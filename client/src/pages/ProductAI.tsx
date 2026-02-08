import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Zap, Shield, TrendingUp, Users, Lightbulb, ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ProductAI() {
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: Brain,
      title: "深度学习模型",
      description: "采用最先进的深度学习技术，支持多种神经网络架构和算法",
    },
    {
      icon: Zap,
      title: "实时推理",
      description: "毫秒级响应时间，支持高并发请求处理",
    },
    {
      icon: Shield,
      title: "企业级安全",
      description: "数据加密、访问控制、审计日志等完整安全体系",
    },
    {
      icon: TrendingUp,
      title: "性能优化",
      description: "自动模型优化，支持边缘计算和分布式部署",
    },
    {
      icon: Users,
      title: "多用户协作",
      description: "支持团队协作、权限管理、版本控制",
    },
    {
      icon: Lightbulb,
      title: "持续学习",
      description: "模型自适应优化，支持增量学习和迁移学习",
    },
  ];

  const useCases = [
    {
      title: "智能客服",
      description: "自然语言处理驱动的智能客服系统，支持多语言、情感分析和意图识别",
      metrics: "响应准确率 95%+ | 处理效率提升 80%",
    },
    {
      title: "内容分析",
      description: "自动化内容审核、分类、标签生成和情感分析",
      metrics: "审核速度 1000+ 条/秒 | 准确率 98%+",
    },
    {
      title: "预测分析",
      description: "时间序列预测、异常检测、趋势分析",
      metrics: "预测准确率 92%+ | 提前预警时间 72 小时",
    },
    {
      title: "推荐系统",
      description: "个性化推荐引擎，支持协同过滤和内容推荐",
      metrics: "点击率提升 35% | 转化率提升 28%",
    },
  ];

  const specifications = [
    { label: "支持模型", value: "TensorFlow、PyTorch、ONNX、Keras 等" },
    { label: "推理框架", value: "TensorRT、ONNX Runtime、TVM" },
    { label: "部署方式", value: "云端、边缘、本地、混合部署" },
    { label: "API 接口", value: "REST、gRPC、WebSocket" },
    { label: "性能指标", value: "P99 延迟 < 100ms | 吞吐量 > 10K QPS" },
    { label: "可用性", value: "99.99% SLA | 自动故障转移" },
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
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold mb-6">
              AI 应用解决方案
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            企业级 AI 应用平台
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            整合多个先进 AI 模型，提供端到端的应用开发、部署和管理解决方案。支持从原型开发到生产级应用的全生命周期管理。
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

      {/* Use Cases */}
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
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-8 h-full">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{useCase.description}</p>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-sm text-cyan-400 font-semibold">
                      {useCase.metrics}
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
            联系我们的专家团队，了解如何将 AI 应用集成到您的业务中
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
