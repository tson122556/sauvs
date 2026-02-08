import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DepartmentAIEn() {
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.button
            onClick={() => setLocation("/en/careers")}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition"
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
              AI Division
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Driving the intelligent future with cutting-edge AI technologies and solutions
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
                The AI Division is the innovation engine of SAUVS, dedicated to developing cutting-edge AI technologies and solutions in machine learning, computer vision, and natural language processing. Our team comprises PhDs and Masters from top universities worldwide, collaborating closely with leading academic and research institutions globally.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We transform advanced AI algorithms into practical applications, delivering intelligent solutions to clients. Our products and services have been deployed in industrial inspection, medical diagnosis, intelligent manufacturing, and more, gaining widespread market recognition.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6">
                <Target className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Core Mission</h3>
                <p className="text-gray-300 text-sm">Drive AI innovation and application</p>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6">
                <Users className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Team Size</h3>
                <p className="text-gray-300 text-sm">50+ Technical Professionals</p>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6">
                <Zap className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Research Areas</h3>
                <p className="text-gray-300 text-sm">ML, CV, NLP, Reinforcement Learning</p>
              </Card>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6">
                <Mail className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Partners</h3>
                <p className="text-gray-300 text-sm">Top Universities & Enterprises</p>
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
            Research Directions
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "ML Platform",
                desc: "Develop efficient ML frameworks and toolchains for large-scale model training and inference",
                items: ["Architecture Design", "Algorithm Optimization", "Performance Tuning"],
              },
              {
                title: "Computer Vision",
                desc: "Research advanced vision perception for industrial inspection and medical diagnosis",
                items: ["Object Detection", "Image Segmentation", "3D Reconstruction"],
              },
              {
                title: "AI Solutions",
                desc: "Provide end-to-end AI solutions and consulting services to clients",
                items: ["Solution Design", "System Integration", "Technical Support"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((subitem, sidx) => (
                      <li
                        key={sidx}
                        className="text-sm text-purple-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
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
                name: "Machine Learning Engineer (MLE)",
                salary: "$120K - $220K USD",
                requirements: [
                  "Master's degree in Computer Science, Mathematics or related field",
                  "3+ years of deep learning/machine learning development experience",
                  "Proficient in PyTorch, TensorFlow or similar frameworks",
                  "Experience with large-scale model training preferred",
                ],
              },
              {
                name: "Computer Vision Engineer",
                salary: "$105K - $195K USD",
                requirements: [
                  "Bachelor's degree in Computer Vision or related field",
                  "2+ years of computer vision development experience",
                  "Familiar with object detection and image segmentation algorithms",
                  "Industrial application experience preferred",
                ],
              },
              {
                name: "AI Solutions Architect",
                salary: "$180K - $330K USD + Performance Bonus",
                requirements: [
                  "Master's degree, 5+ years of AI-related experience",
                  "Deep understanding of AI technology stack and business applications",
                  "Strong project management and team collaboration skills",
                  "Successful AI project delivery experience required",
                ],
              },
              {
                name: "AI Engineering Intern",
                salary: "$25-35/hour",
                requirements: [
                  "Currently enrolled in Computer Science or Mathematics program",
                  "Strong interest in machine learning",
                  "Python programming fundamentals",
                  "Ability to commit 3+ days per week",
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
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-purple-500/30 p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pos.name}
                  </h3>
                  <p className="text-purple-300 font-semibold mb-4">
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
                          <span className="text-purple-400 mt-1">•</span>
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
            <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Join Us?
              </h3>
              <p className="text-gray-300 mb-8">
                If you're passionate about AI technology, we'd love to hear from you
              </p>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
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
