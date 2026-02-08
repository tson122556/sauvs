import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DepartmentIoTEn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.button
            onClick={() => setLocation("/en/careers")}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              IoT & Systems Engineering
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Connecting the world through intelligent IoT solutions and robust systems
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
              <h2 className="text-3xl font-bold text-white mb-6">About the Division</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The IoT & Systems Engineering Division designs and develops comprehensive IoT solutions and system platforms for smart city, smart manufacturing, and enterprise applications. Our team specializes in embedded systems, cloud architecture, and edge computing.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We build scalable IoT platforms that connect millions of devices, process real-time data, and deliver actionable insights. Our solutions have been deployed in smart buildings, industrial monitoring, and environmental sensing applications globally.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6">
                <Target className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Core Mission</h3>
                <p className="text-gray-300 text-sm">Build connected intelligent systems</p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6">
                <Users className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Team Size</h3>
                <p className="text-gray-300 text-sm">35+ Systems Specialists</p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6">
                <Zap className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Tech Stack</h3>
                <p className="text-gray-300 text-sm">Cloud, Edge, Embedded Systems</p>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6">
                <Mail className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Applications</h3>
                <p className="text-gray-300 text-sm">Smart City & Manufacturing</p>
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
            Development Focus
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "IoT Platform",
                desc: "Develop scalable IoT platforms and device management systems",
                items: ["Device Management", "Data Pipeline", "Cloud Integration"],
              },
              {
                title: "Embedded Systems",
                desc: "Design firmware and embedded software for IoT devices",
                items: ["Firmware Development", "Hardware Integration", "Optimization"],
              },
              {
                title: "Cloud & Edge",
                desc: "Build cloud and edge computing infrastructure",
                items: ["Cloud Architecture", "Edge Computing", "Data Analytics"],
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
            Open Positions
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "IoT Platform Engineer",
                salary: "$100K - $185K USD",
                requirements: [
                  "Bachelor's degree in Computer Science or Engineering",
                  "3+ years of IoT platform development",
                  "Experience with cloud platforms (AWS, Azure, GCP)",
                  "Knowledge of MQTT, CoAP, and IoT protocols",
                ],
              },
              {
                name: "Embedded Systems Engineer",
                salary: "$95K - $175K USD",
                requirements: [
                  "Bachelor's degree in Electrical or Computer Engineering",
                  "2+ years of embedded systems development",
                  "Proficient in C/C++ and embedded Linux",
                  "Experience with microcontrollers and real-time systems",
                ],
              },
              {
                name: "Cloud Systems Architect",
                salary: "$140K - $260K USD",
                requirements: [
                  "Master's degree or 5+ years of cloud architecture experience",
                  "Deep understanding of distributed systems",
                  "Experience designing scalable cloud solutions",
                  "Knowledge of containerization and Kubernetes preferred",
                ],
              },
              {
                name: "Systems Integration Engineer",
                salary: "$85K - $155K USD",
                requirements: [
                  "Bachelor's degree in Engineering or Computer Science",
                  "2+ years of systems integration experience",
                  "Strong problem-solving and communication skills",
                  "Experience with IoT and embedded systems",
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
                      Requirements:
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
                Ready to Join Us?
              </h3>
              <p className="text-gray-300 mb-8">
                If you're passionate about IoT and systems engineering, we'd love to hear from you
              </p>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
              >
                <Mail className="mr-2 w-4 h-4" />
                Submit Resume
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
