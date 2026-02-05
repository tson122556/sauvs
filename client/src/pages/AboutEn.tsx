import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutEn() {
  const { language } = useLanguage();
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

  const generalProjects = [
    "AI application software development",
    "AI public service platform technical consulting services",
    "Technical services, technical development, technical consulting, technical exchange, technology transfer, technology promotion",
    "Information system integration services",
    "Intelligent control system integration",
    "Intelligent robot R&D",
    "Intelligent robot sales",
    "Drone design",
    "Drone novel motor R&D",
    "Drone system integration",
    "Drone sales",
    "AI hardware sales",
    "Computer software and hardware and auxiliary equipment wholesale",
    "Computer software and hardware and auxiliary equipment retail",
    "Data processing and storage support services",
    "IoT technology services",
    "IoT technology R&D",
    "Energy storage technology services",
    "Technology import and export",
    "Machinery equipment rental",
    "Enterprise management consulting",
    "Information consulting services",
  ];

  const licensedProjects = [
    "Internet information services",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setLocation(`/${language}`)}
          >
            <motion.img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
              alt="Jizixing" 
              className="h-16 w-auto" 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-lg font-bold text-white">UVS</span>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href={`/${language}#products`} className="text-gray-300 hover:text-white transition">
              Products
            </a>
            <a href={`/${language}#solutions`} className="text-gray-300 hover:text-white transition">
              Solutions
            </a>
            <a href={`/${language}#services`} className="text-gray-300 hover:text-white transition">
              Services
            </a>
            <a href={`/${language}/about`} className="text-white font-semibold">
              About Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={() => setLocation(`/${language}/contact`)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Hero content */}
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
              About
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                UVS Technology
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Focused on AI technology development and application, intelligent robot research and development, IoT technology innovation, and spacetech aircraft design and research. Committed to providing cutting-edge smart solutions to organizations, enterprises, and individuals worldwide, driving digital transformation.
            </motion.p>

            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                onClick={() => setLocation(`/${language}/contact`)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
              >
                Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Company Information</h2>
            <p className="text-gray-400 text-lg">
              Complete corporate credentials and business scope
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Company Details */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">Corporate Credentials</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Company Name</p>
                    <p className="text-white font-semibold">UVS Smart Technology Co., Ltd.</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Established</p>
                    <p className="text-white font-semibold">May 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Registered Capital</p>
                    <p className="text-white font-semibold">To be confirmed</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Registered Address</p>
                    <p className="text-white font-semibold">Xi'an, Shaanxi Province, China</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Core Values */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">Core Values</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Technology Innovation</p>
                      <p className="text-gray-400 text-sm">Mastering cutting-edge AI and IoT technologies</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Customer First</p>
                      <p className="text-gray-400 text-sm">Providing customized solutions</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white font-semibold">Quality Assurance</p>
                      <p className="text-gray-400 text-sm">Comprehensive quality management system</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Business Scope Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Business Scope</h2>
            <p className="text-gray-400 text-lg">
              Complete business coverage and service capabilities
            </p>
          </motion.div>

          {/* General Projects */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700/50 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                General Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generalProjects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{project}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-6">
                (Except for projects that must be approved by law, business activities shall be carried out independently based on business licenses)
              </p>
            </Card>
          </motion.div>

          {/* Licensed Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                Licensed Projects
              </h3>
              <div className="space-y-4">
                {licensedProjects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">{project}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-6">
                (For projects that must be approved by law, business activities can only be carried out after approval by relevant departments)
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Partnership Opportunities
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              We look forward to collaborating with global partners to advance smart technology development and application.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={() => setLocation(`/${language}/contact`)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/50"
              >
                Contact Us <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-slate-800 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
                  alt="Jizixing" 
                  className="h-12 w-auto" 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-lg font-bold text-white">UVS</span>
              </div>
              <p className="text-gray-400 text-sm">
                Focused on AI, smart robots, IoT technology innovation and spacetech aircraft R&D and application.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href={`/${language}#products`} className="text-gray-400 hover:text-white transition">
                    AI Software
                  </a>
                </li>
                <li>
                  <a href={`/${language}#products`} className="text-gray-400 hover:text-white transition">
                    Smart Robots
                  </a>
                </li>
                <li>
                  <a href={`/${language}#products`} className="text-gray-400 hover:text-white transition">
                    IoT Solutions
                  </a>
                </li>
                <li>
                  <a href={`/${language}#products`} className="text-gray-400 hover:text-white transition">
                    Spacetech Aircraft
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href={`/${language}#solutions`} className="text-gray-400 hover:text-white transition">
                    Technical Consulting
                  </a>
                </li>
                <li>
                  <a href={`/${language}#solutions`} className="text-gray-400 hover:text-white transition">
                    System Integration
                  </a>
                </li>
                <li>
                  <a href={`/${language}#solutions`} className="text-gray-400 hover:text-white transition">
                    Technical Support
                  </a>
                </li>
                <li>
                  <a href={`/${language}#solutions`} className="text-gray-400 hover:text-white transition">
                    FinTech Solutions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: satifuxie@gmail.com</li>
                <li>Phone: (+86)1519387647</li>
                <li>Address: Xi'an, Shaanxi, China</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2025 UVS Smart Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
