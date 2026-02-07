import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Wifi, Cloud, Lock, Zap, BarChart3, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";

export default function ProductIoTEn() {
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: Wifi,
      title: "Fully Connected Ecosystem",
      description: "Supporting multiple connectivity methods including WiFi, Bluetooth, 5G, and NB-IoT for seamless interconnection",
    },
    {
      icon: Cloud,
      title: "Cloud-Edge Collaboration",
      description: "Combining cloud processing with edge computing for low-latency, high-efficiency data processing",
    },
    {
      icon: Lock,
      title: "Security & Reliability",
      description: "End-to-end encryption, multi-layer authentication, and secure boot ensuring data and device security",
    },
    {
      icon: Zap,
      title: "Low Power Design",
      description: "Ultra-low-power chips and intelligent power-saving algorithms supporting long-term battery operation",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Real-time data collection, processing, and visualization supporting AI-driven intelligent analysis",
    },
    {
      icon: Lightbulb,
      title: "Intelligent Decision Making",
      description: "Big data-driven intelligent decision support enabling self-adaptive and self-optimizing systems",
    },
  ];

  const scenarios = [
    {
      title: "Smart Cities",
      description: "Intelligent transportation, environmental monitoring, energy management, and public safety",
      metrics: "Coverage 100+ sq km | Devices 1M+ | Data Processing 1TB+/day",
    },
    {
      title: "Industry 4.0",
      description: "Device monitoring, predictive maintenance, production optimization, and quality control",
      metrics: "Downtime Reduction 80% | Efficiency Increase 40% | Cost Reduction 30%",
    },
    {
      title: "Smart Agriculture",
      description: "Soil monitoring, weather forecasting, irrigation control, and pest prevention",
      metrics: "Yield Increase 25% | Water Reduction 40% | Cost Reduction 35%",
    },
    {
      title: "Smart Home",
      description: "Environmental control, security monitoring, energy management, and intelligent appliances",
      metrics: "Energy Reduction 35% | Comfort Improvement 90% | Security Enhancement 99%",
    },
  ];

  const specifications = [
    { label: "Connectivity Protocols", value: "WiFi 6E, 5G, NB-IoT, LoRaWAN, Zigbee" },
    { label: "Data Processing", value: "Real-time Processing 100K+ Devices | Latency < 100ms" },
    { label: "Storage Capacity", value: "Support PB-level Data Storage | Automatic Tiering Management" },
    { label: "Security Mechanisms", value: "256-bit Encryption | Multi-factor Authentication | Secure Boot" },
    { label: "Scalability", value: "Support 100M+ Device Connections | Elastic Scaling" },
    { label: "Availability", value: "99.99% SLA | Multi-region Redundancy | Automatic Failover" },
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
            <span className="inline-block px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm font-semibold mb-6">
              IoT Solutions
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Enterprise IoT Platform
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Connect, manage, and analyze data from millions of devices. Providing complete solutions from edge to cloud, supporting real-time monitoring, predictive analytics, and intelligent decision-making.
          </motion.p>

          <motion.div
            {...fadeInUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              onClick={() => setLocation("/en/contact")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
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
                    <Icon className="w-12 h-12 text-pink-500 mb-4" />
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
            Application Scenarios
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
            Contact our expert team to learn how to integrate IoT solutions into your business
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
