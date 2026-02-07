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
            <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold mb-6">
              IoT Platform Solutions
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          >
            IoT Technology
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Comprehensive IoT platform supporting device connectivity, data processing, and intelligent decision-making. Enabling digital transformation across smart cities, industrial 4.0, agriculture, and smart homes.
          </motion.p>

          <motion.div
            {...fadeInUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              onClick={() => setLocation("/en/contact")}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-6 text-lg rounded-lg"
            >
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
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
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Core Features
          </motion.h2>

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
                  <Card className="bg-slate-800/50 border-slate-700 p-6 h-full hover:border-green-500/50 transition-colors">
                    <Icon className="w-12 h-12 text-green-400 mb-4" />
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
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Application Scenarios
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-8 h-full hover:border-green-500/50 transition-colors">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {scenario.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{scenario.description}</p>
                  <div className="pt-4 border-t border-slate-700">
                    <p className="text-green-300 text-sm font-semibold">{scenario.metrics}</p>
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
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 text-white"
          >
            Technical Specifications
          </motion.h2>

          <div className="space-y-4">
            {specifications.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-green-500/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-white">{spec.label}</h4>
                    <p className="text-green-300 text-right">{spec.value}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-8 text-white"
          >
            Ready to Transform Your Business?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Our IoT solutions can help you achieve digital transformation and intelligent operations. Contact us today to learn more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={() => setLocation("/en/contact")}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-6 text-lg rounded-lg"
            >
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
