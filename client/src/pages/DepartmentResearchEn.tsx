import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DepartmentResearchEn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.button
            onClick={() => setLocation("/en/careers")}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition"
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
              Advanced Technology Research Institute
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Pioneering breakthrough research in emerging technologies
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
              <h2 className="text-3xl font-bold text-white mb-6">About the Institute</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The Advanced Technology Research Institute is dedicated to fundamental and applied research in emerging technologies including quantum computing, advanced materials, and next-generation AI. We collaborate with leading universities and research institutions worldwide.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our research teams publish in top-tier conferences and journals, and our innovations have led to multiple patents and technology transfers. We're committed to pushing the boundaries of what's possible and preparing technologies for future applications.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-6">
                <Target className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Core Mission</h3>
                <p className="text-gray-300 text-sm">Advance frontier technology research</p>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-6">
                <Users className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Team Size</h3>
                <p className="text-gray-300 text-sm">25+ PhD Researchers</p>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-6">
                <Zap className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Research Areas</h3>
                <p className="text-gray-300 text-sm">Quantum, Materials, Next-Gen AI</p>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-6">
                <Mail className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Collaborations</h3>
                <p className="text-gray-300 text-sm">Top Universities Globally</p>
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
                title: "Quantum Computing",
                desc: "Explore quantum algorithms and quantum-classical hybrid systems",
                items: ["Quantum Algorithms", "Quantum Hardware", "Hybrid Systems"],
              },
              {
                title: "Advanced Materials",
                desc: "Research novel materials for next-generation applications",
                items: ["Material Science", "Characterization", "Applications"],
              },
              {
                title: "Next-Gen AI",
                desc: "Develop breakthrough AI techniques and architectures",
                items: ["Novel Architectures", "Efficient Learning", "Interpretability"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((subitem, sidx) => (
                      <li
                        key={sidx}
                        className="text-sm text-indigo-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
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
                name: "Quantum Computing Researcher",
                salary: "$150K - $280K USD",
                requirements: [
                  "PhD in Physics, Computer Science, or related field",
                  "3+ years of quantum computing research experience",
                  "Publications in top-tier quantum computing venues",
                  "Experience with quantum programming frameworks",
                ],
              },
              {
                name: "Materials Science Researcher",
                salary: "$130K - $240K USD",
                requirements: [
                  "PhD in Materials Science or Chemistry",
                  "2+ years of materials research experience",
                  "Strong experimental and computational skills",
                  "Publications in peer-reviewed journals",
                ],
              },
              {
                name: "AI Research Scientist",
                salary: "$140K - $260K USD",
                requirements: [
                  "PhD in Machine Learning, Computer Science, or related field",
                  "3+ years of AI research experience",
                  "Strong publication record in top AI conferences",
                  "Experience with novel AI architectures and methods",
                ],
              },
              {
                name: "Research Engineer",
                salary: "$110K - $200K USD",
                requirements: [
                  "Master's degree in Computer Science or Engineering",
                  "2+ years of research engineering experience",
                  "Strong programming skills in Python and C++",
                  "Experience supporting research projects",
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
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-indigo-500/30 p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pos.name}
                  </h3>
                  <p className="text-indigo-300 font-semibold mb-4">
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
                          <span className="text-indigo-400 mt-1">•</span>
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
            <Card className="bg-gradient-to-br from-indigo-900/40 to-indigo-900/20 border-indigo-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Join Us?
              </h3>
              <p className="text-gray-300 mb-8">
                If you're passionate about frontier research, we'd love to hear from you
              </p>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
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
