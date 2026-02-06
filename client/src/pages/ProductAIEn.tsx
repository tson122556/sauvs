import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Zap, Shield, TrendingUp, Users, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";

export default function ProductAIEn() {
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: Brain,
      title: "Deep Learning Models",
      description: "Advanced deep learning technology supporting multiple neural network architectures and algorithms",
    },
    {
      icon: Zap,
      title: "Real-time Inference",
      description: "Millisecond-level response time with support for high-concurrency request processing",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Complete security system including data encryption, access control, and audit logs",
    },
    {
      icon: TrendingUp,
      title: "Performance Optimization",
      description: "Automatic model optimization supporting edge computing and distributed deployment",
    },
    {
      icon: Users,
      title: "Multi-user Collaboration",
      description: "Team collaboration support with permission management and version control",
    },
    {
      icon: Lightbulb,
      title: "Continuous Learning",
      description: "Model self-adaptive optimization supporting incremental and transfer learning",
    },
  ];

  const useCases = [
    {
      title: "Intelligent Customer Service",
      description: "NLP-driven intelligent customer service system supporting multi-language, sentiment analysis, and intent recognition",
      metrics: "Response Accuracy 95%+ | Efficiency Improvement 80%",
    },
    {
      title: "Content Analysis",
      description: "Automated content moderation, classification, tagging, and sentiment analysis",
      metrics: "Processing Speed 1000+ items/sec | Accuracy 98%+",
    },
    {
      title: "Predictive Analytics",
      description: "Time series forecasting, anomaly detection, and trend analysis",
      metrics: "Prediction Accuracy 92%+ | Early Warning 72 hours",
    },
    {
      title: "Recommendation Engine",
      description: "Personalized recommendation engine supporting collaborative filtering and content-based recommendations",
      metrics: "CTR Improvement 35% | Conversion Increase 28%",
    },
  ];

  const specifications = [
    { label: "Supported Models", value: "TensorFlow, PyTorch, ONNX, Keras, etc." },
    { label: "Inference Framework", value: "TensorRT, ONNX Runtime, TVM" },
    { label: "Deployment Options", value: "Cloud, Edge, On-premise, Hybrid" },
    { label: "API Interfaces", value: "REST, gRPC, WebSocket" },
    { label: "Performance Metrics", value: "P99 Latency < 100ms | Throughput > 10K QPS" },
    { label: "Availability", value: "99.99% SLA | Automatic Failover" },
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
              AI Application Solutions
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Enterprise AI Application Platform
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Integrate multiple advanced AI models with end-to-end application development, deployment, and management solutions. Support full lifecycle management from prototype to production-grade applications.
          </motion.p>

          <motion.div
            {...fadeInUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              onClick={() => setLocation("/en/contact")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              Consult Now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-lg font-semibold"
            >
              View Demo
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
            Core Features
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
            Use Cases
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
            Technical Specifications
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact our expert team to learn how to integrate AI applications into your business
          </p>
          <Button
            onClick={() => setLocation("/en/contact")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
