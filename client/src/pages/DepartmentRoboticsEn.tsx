import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DepartmentRoboticsEn() {
  const [, setLocation] = useLocation();

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
              Robotics Division
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Building intelligent robots that transform industries and improve lives
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
                The Robotics Division specializes in designing and developing intelligent robots for industrial automation, inspection, and service applications. Our team combines expertise in mechanical design, control systems, and AI perception to create cutting-edge robotic solutions.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We develop humanoid robots, industrial manipulators, and autonomous inspection systems that are deployed in manufacturing, construction, and hazardous environment operations. Our products have achieved significant market success and industry recognition.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/30 p-6">
                <Target className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Core Mission</h3>
                <p className="text-gray-300 text-sm">Create intelligent robotic solutions</p>
              </Card>
              <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/30 p-6">
                <Users className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Team Size</h3>
                <p className="text-gray-300 text-sm">40+ Engineers & Technicians</p>
              </Card>
              <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/30 p-6">
                <Zap className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Focus Areas</h3>
                <p className="text-gray-300 text-sm">Humanoid, Industrial, Autonomous</p>
              </Card>
              <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/30 p-6">
                <Mail className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">Applications</h3>
                <p className="text-gray-300 text-sm">Manufacturing & Inspection</p>
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
            Development Areas
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mechanical Design",
                desc: "Design advanced robotic structures and mechanisms",
                items: ["CAD Design", "Structural Analysis", "Prototype Development"],
              },
              {
                title: "Control Systems",
                desc: "Develop control algorithms and motion planning systems",
                items: ["Motion Control", "Path Planning", "Real-time Systems"],
              },
              {
                title: "Integration",
                desc: "Integrate hardware and software into complete systems",
                items: ["System Integration", "Testing & Validation", "Deployment"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/30 p-8 h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.items.map((subitem, sidx) => (
                      <li
                        key={sidx}
                        className="text-sm text-blue-300 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
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
                name: "Robotics Engineer",
                salary: "$110K - $200K USD",
                requirements: [
                  "Bachelor's degree in Mechanical or Electrical Engineering",
                  "3+ years of robotics development experience",
                  "Proficient in ROS and C++",
                  "Experience with robot design and control preferred",
                ],
              },
              {
                name: "Control Systems Engineer",
                salary: "$100K - $185K USD",
                requirements: [
                  "Master's degree in Control Systems or related field",
                  "2+ years of control system development",
                  "Strong background in motion control and dynamics",
                  "Experience with real-time embedded systems",
                ],
              },
              {
                name: "Mechanical Design Engineer",
                salary: "$95K - $175K USD",
                requirements: [
                  "Bachelor's degree in Mechanical Engineering",
                  "3+ years of mechanical design experience",
                  "Proficient in CAD software (SolidWorks, CATIA)",
                  "Experience with robotic systems preferred",
                ],
              },
              {
                name: "Robotics Technician",
                salary: "$50K - $85K USD",
                requirements: [
                  "Associate degree or equivalent technical training",
                  "2+ years of hands-on robotics experience",
                  "Strong troubleshooting and testing skills",
                  "Ability to work in manufacturing environment",
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
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/30 p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pos.name}
                  </h3>
                  <p className="text-blue-300 font-semibold mb-4">
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
                          <span className="text-blue-400 mt-1">•</span>
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
            <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/30 p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Join Us?
              </h3>
              <p className="text-gray-300 mb-8">
                If you're passionate about robotics, we'd love to hear from you
              </p>
              <Button
                onClick={() => window.open("mailto:careers@sauvs.com")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
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
