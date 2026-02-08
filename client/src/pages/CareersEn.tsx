import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Briefcase } from "lucide-react";
import { useLocation } from "wouter";

export default function CareersEn() {
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
      title: "AI Division",
      color: "from-purple-900/40 to-purple-900/20 border-purple-500/30",
      positions: [
        {
          name: "Machine Learning Engineer (MLE)",
          salary: "400K - 750K RMB",
          icon: "🤖",
        },
        {
          name: "Computer Vision Engineer (CV Engineer)",
          salary: "350K - 650K RMB",
          icon: "👁️",
        },
        {
          name: "AI Solutions Architect",
          salary: "600K - 1.1M RMB + Project Bonus",
          icon: "🏗️",
        },
      ],
    },
    {
      title: "Robotics Division",
      color: "from-cyan-900/40 to-cyan-900/20 border-cyan-500/30",
      positions: [
        {
          name: "Robot Motion Control Engineer",
          salary: "450K - 800K RMB",
          icon: "⚙️",
        },
        {
          name: "Robot Perception Algorithm Engineer",
          salary: "400K - 750K RMB",
          icon: "📡",
        },
        {
          name: "Robot Software Platform Engineer",
          salary: "350K - 700K RMB",
          icon: "💻",
        },
      ],
    },
    {
      title: "IoT & Systems Engineering",
      color: "from-pink-900/40 to-pink-900/20 border-pink-500/30",
      positions: [
        {
          name: "IoT Platform Senior Engineer",
          salary: "500K - 900K RMB",
          icon: "🌐",
        },
        {
          name: "Edge Computing Expert",
          salary: "450K - 850K RMB",
          icon: "⚡",
        },
        {
          name: "IoT Security Engineer",
          salary: "400K - 750K RMB",
          icon: "🔒",
        },
      ],
    },
    {
      title: "Frontier Technology Institute",
      color: "from-indigo-900/40 to-indigo-900/20 border-indigo-500/30",
      positions: [
        {
          name: "Chief Scientist - Spatio-Temporal Navigator",
          salary: "2M+ RMB + Research Funding",
          icon: "🚀",
        },
        {
          name: "Chief Scientist - Spatio-Temporal Codec",
          salary: "1.8M+ RMB + Research Funding",
          icon: "🔬",
        },
        {
          name: "Spatio-Temporal Information Scientist",
          salary: "700K - 1.5M RMB + Performance Bonus",
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
              Illuminate Us
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Join SAUVS
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We are seeking exceptional talents to join our team and shape the future together. Whether you are an algorithm expert, engineer, or research scientist, SAUVS offers you a boundless stage and unlimited possibilities.
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
                Browse Positions <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-white hover:bg-purple-500/10"
              >
                <Mail className="mr-2 w-4 h-4" />
                Submit Resume
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-gray-400 text-lg">
              Explore opportunities across our divisions and research institute
            </p>
          </motion.div>

          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {departments.map((dept, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Briefcase className="w-8 h-8 text-purple-400" />
                    {dept.title}
                  </h3>
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
                        onClick={() => window.open("mailto:careers@sauvs.com")}
                        variant="ghost"
                        className="mt-4 text-purple-400 hover:text-purple-300 p-0"
                      >
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What We Offer</h2>
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
                title: "Competitive Compensation",
                desc: "Market-competitive salary, performance bonuses, equity/option plans, comprehensive insurance coverage and supplementary commercial insurance",
              },
              {
                title: "Cutting-Edge Environment",
                desc: "Work with industry-leading technical teams and participate in the most advanced research and engineering projects",
              },
              {
                title: "Continuous Growth",
                desc: "Systematic technical and management training, opportunities to attend international academic conferences, clear dual-track career development paths",
              },
              {
                title: "Open Culture",
                desc: "Flat management structure, encouragement of innovation and cross-disciplinary collaboration, focus on work-life balance",
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
                Ready to Join Us?
              </h3>
              <p className="text-gray-300 mb-8">
                We look forward to meeting you and together illuminating the next era of innovation.
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Button
                  onClick={() => window.open("mailto:careers@sauvs.com")}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                >
                  <Mail className="mr-2 w-4 h-4" />
                  Send Resume
                </Button>
                <Button
                  onClick={() => setLocation("/about")}
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-white hover:bg-purple-500/10"
                >
                  About Us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
