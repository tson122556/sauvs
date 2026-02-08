import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Cpu, Wifi, Shield, Zap, Gauge, Lightbulb, ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ProductRobotEn() {
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: Cpu,
      title: "Intelligent Decision System",
      description: "Smart decision engine based on reinforcement learning and decision trees, supporting complex scenario handling",
    },
    {
      icon: Wifi,
      title: "Real-time Communication",
      description: "Low-latency, high-reliability wireless communication protocols supporting 5G and edge computing",
    },
    {
      icon: Shield,
      title: "Security Protection",
      description: "Multi-layer security protection mechanisms supporting encrypted communication and identity authentication",
    },
    {
      icon: Zap,
      title: "Efficient Energy Management",
      description: "Intelligent power management system supporting fast charging and extended battery life",
    },
    {
      icon: Gauge,
      title: "Precision Control",
      description: "Millimeter-level precision motion control supporting complex trajectory planning",
    },
    {
      icon: Lightbulb,
      title: "Adaptive Learning",
      description: "Automatic robot learning and optimization supporting transfer learning",
    },
  ];

  const applications = [
    {
      title: "Industrial Automation",
      description: "Factory production line automation, quality inspection, and logistics handling",
      benefits: "Efficiency Increase 60% | Cost Reduction 40% | Safety Improvement 95%",
    },
    {
      title: "Medical Care",
      description: "Surgical assistance robots, rehabilitation training, and patient care",
      benefits: "Surgery Precision 99.9% | Care Efficiency Increase 70% | Patient Satisfaction 98%",
    },
    {
      title: "Service Robots",
      description: "Intelligent service in hotels, restaurants, shopping malls, and other scenarios",
      benefits: "Service Coverage 99% | Customer Satisfaction 96% | Operating Cost Reduction 50%",
    },
    {
      title: "Exploration & Rescue",
      description: "Disaster rescue, extreme environment exploration, and scientific research",
      benefits: "Coverage Range 10x Increase | Safety Improvement 99% | Data Collection Efficiency 5x",
    },
  ];

  const specifications = [
    { label: "Processor", value: "High-performance multi-core processor with GPU acceleration" },
    { label: "Sensors", value: "Multi-modal sensing including vision, touch, hearing, and smell" },
    { label: "Motion Capability", value: "Max Speed 5m/s | Load Capacity 50kg | Precision ±2mm" },
    { label: "Communication", value: "5G, WiFi 6, Bluetooth 5.2, NB-IoT" },
    { label: "Battery", value: "Fast Charge 30 minutes | Battery Life 8-12 hours" },
    { label: "Operating System", value: "Proprietary RTOS supporting ROS 2 ecosystem" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Back Button */}
      <div className="fixed top-24 left-4 z-40">
        <Button
          onClick={() => setLocation("/en/ai-hub")}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
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
            <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm font-semibold mb-6">
              Intelligent Robot Solutions
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
          >
            Next-Generation Smart Robots
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Combining advanced AI algorithms, high-precision sensing, and intelligent control to create intelligent robot systems that adapt to multiple scenarios. Supporting applications in industrial, medical, and service sectors.
          </motion.p>

          <motion.div
            {...fadeInUp}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              onClick={() => setLocation("/en/contact")}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-lg"
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
                  <Card className="bg-slate-800/50 border-slate-700 p-6 h-full hover:border-blue-500/50 transition-colors">
                    <Icon className="w-12 h-12 text-blue-400 mb-4" />
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
            Application Domains
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
                    <p className="text-blue-300 text-sm font-semibold">{app.benefits}</p>
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
        className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20"
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
            Ready to Get Started?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Contact our expert team to learn how to integrate smart robots into your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={() => setLocation("/en/contact")}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg rounded-lg"
            >
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
