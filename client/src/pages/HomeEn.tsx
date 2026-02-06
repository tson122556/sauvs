import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, Cpu, Network, Play } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Design Philosophy: Tech Futurism
 * - Deep Purple + Tech Blue Color Scheme
 * - Video Dynamic Background, Light Trails, Geometric Shapes
 * - Smooth Scroll Animations, Hover Effects
 * - Asymmetric Layout, Avoid Center Alignment
 */

export default function HomeEn() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const { language } = useLanguage();

  const [, setLocation] = useLocation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
              alt="UVS" 
              className="h-16 w-auto" 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href="#products" className="text-gray-300 hover:text-white transition">
              Products
            </a>
            <a href="#solutions" className="text-gray-300 hover:text-white transition">
              Solutions
            </a>
            <a href="#services" className="text-gray-300 hover:text-white transition">
              Services
            </a>
            <a href={`/${language}/about`} className="text-gray-300 hover:text-white transition">
              About Us
            </a>
            <a href={`/${language}/ai-hub`} className="text-gray-300 hover:text-white transition">
              AI Hub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <LanguageSwitcher />
            <Button
              onClick={() => setLocation(`/${language}/contact`)}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src="https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-bg-video_1770192009000_na1fn_YmctdmlkZW8ubXA0.mp4"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-cyan-900/40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Hero Content */}
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
              UVS
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Smart Technology
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We focus on cutting-edge research and development of AI, intelligent robots, IoT, and space-time synchronized aircraft. Through deep integration of these technologies, we are committed to providing innovative solutions to organizations and individual customers, empowering their digital transformation in the future industry.
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
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-500/50 text-white hover:bg-purple-500/10"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute w-64 h-64 border-2 border-purple-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute w-48 h-48 border-2 border-cyan-500/20 rounded-lg"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ bottom: "20%", right: "10%" }}
        />
      </section>

      {/* Core Services Section */}
      <section id="products" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Services</h2>
            <p className="text-gray-400 text-lg">
              Comprehensive smart technology solutions
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* AI Software */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 hover:border-purple-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-1_1770192013000_na1fn_YWktYXBwLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/QVHZWYJfLZBUUJdq.png" alt="AI Application" className="w-16 h-16 mb-4 group-hover:scale-110 transition" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                  <h3 className="text-xl font-bold text-white mb-3">AI Applications</h3>
                  <p className="text-gray-400 mb-6">
                    Professional AI software development providing intelligent solutions to empower enterprise digital transformation.
                  </p>
                </div>
                <Button
                  onClick={() => setLocation(`/en/product/ai`)}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white mt-4 relative z-10"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>

            {/* Smart Robots */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 hover:border-cyan-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-2_1770192014000_na1fn_cm9ib3QtYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/CyGnmUYzRSFavGGJ.png" alt="Smart Robots" className="w-16 h-16 mb-4 group-hover:scale-110 transition" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                  <h3 className="text-xl font-bold text-white mb-3">Smart Robots</h3>
                  <p className="text-gray-400 mb-6">
                    Independent R&D and sales of intelligent robots providing industrial and service robot solutions.
                  </p>
                </div>
                <Button
                  onClick={() => setLocation(`/en/product/robot`)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white mt-4 relative z-10"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>

            {/* IoT Solutions */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 hover:border-pink-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-3_1770192011000_na1fn_aW90LWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/LPJIpqQEjtYMyJmB.png" alt="IoT Technology" className="w-16 h-16 mb-4 group-hover:scale-110 transition" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                  <h3 className="text-xl font-bold text-white mb-3">IoT Technology</h3>
                  <p className="text-gray-400 mb-6">
                    IoT technology services and R&D enabling device interconnection and intelligent control.
                  </p>
                </div>
                <Button
                  onClick={() => setLocation(`/en/product/iot`)}
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white mt-4 relative z-10"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>

            {/* Spacetime Synchronous/Asynchronous Navigation */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-blue-500/30 hover:border-blue-500/60 transition p-8 h-full group cursor-pointer relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition duration-300" style={{
                  backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-3_1770192011000_na1fn_aW90LWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div className="relative z-10 flex-grow">
                  <img src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/PMmXikHRGAMPGDyc.png" alt="Spacetime Synchronous/Asynchronous Navigation" className="w-16 h-16 mb-4 group-hover:scale-110 transition" style={{backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} />
                  <h3 className="text-xl font-bold text-white mb-3">Spacetime Synchronous/Asynchronous Navigation</h3>
                  <p className="text-gray-400 mb-4">
                    Cutting-edge spacetime synchronous/asynchronous navigation R&D and application providing innovative navigation and flight solutions.
                  </p>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full mb-4">
                    Partners Only
                  </div>
                </div>
                <Button
                  onClick={() => setLocation(`/en/product/spacetime`)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white mt-4 relative z-10"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-gray-400 text-lg">
              Professional technical team and leading innovation capability
            </p>
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
                title: "Technology Leadership",
                description: "Professional R&D team mastering cutting-edge AI and IoT technologies.",
                bg: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-4_1770192016000_na1fn_dGVjaC1sZWFkZXJzaGlwLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80",
              },
              {
                title: "Custom Solutions",
                description: "Personalized solutions and services tailored to customer needs.",
                bg: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-5_1770192014000_na1fn_Y3VzdG9tLXNvbHV0aW9uLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80",
              },
              {
                title: "Comprehensive Support",
                description: "Full lifecycle technical support from consultation to development and maintenance.",
                bg: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-4_1770192016000_na1fn_dGVjaC1sZWFkZXJzaGlwLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80",
              },
              {
                title: "Mature System",
                description: "Comprehensive quality management system and proven track record.",
                bg: "https://private-us-east-1.manuscdn.com/sessionFile/fhgIRoGEBsYWRa81s985hf/sandbox/UtQ5v7fS4XbOELdZSlIP1Q-img-5_1770192014000_na1fn_Y3VzdG9tLXNvbHV0aW9uLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80",
              },
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="bg-slate-800/50 border-slate-700/50 p-8 h-full overflow-hidden group cursor-pointer relative">
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition duration-300" style={{
                    backgroundImage: `url(${feature.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="services" className="py-20 relative overflow-hidden">
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
              Ready to Transform?
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Let's work together to bring your vision to life with cutting-edge smart technology solutions.
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
                Contact Us Today <ArrowRight className="ml-2 w-4 h-4" />
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
                  alt="UVS" 
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
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    AI Software
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Smart Robots
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    IoT Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Spacetime Synchronous/Asynchronous Navigation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Technical Consulting
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    System Integration
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Technical Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
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
