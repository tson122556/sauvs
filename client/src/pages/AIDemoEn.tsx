import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play, Download } from "lucide-react";
import { useLocation } from "wouter";

export default function AIDemoEn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => setLocation("/en")}
            className="flex items-center gap-2 text-purple-300 hover:text-purple-100 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </motion.button>
          <motion.h1
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            AI Applications Demo
          </motion.h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Main Content */}
      <motion.div
        className="pt-32 pb-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-4xl">
          {/* Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              AI Applications
            </h2>
            <p className="text-gray-300 text-lg">
              Explore how our cutting-edge AI technology creates value for your business
            </p>
          </motion.div>

          {/* Video Container */}
          <motion.div
            className="mb-12 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <video
              width="100%"
              height="auto"
              controls
              className="w-full bg-black"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect fill='%23111827' width='1200' height='675'/%3E%3C/svg%3E"
            >
              <source src="https://d2xsxph8kpxj0f.cloudfront.net/309965843024938099/LeH9c94nfUYwUF6G27VX4S/ai-demo_dcf845a6.mp4" type="video/mp4" />
              Your browser does not support video playback
            </video>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              {
                title: "Deep Learning",
                description: "Advanced neural network architectures supporting multiple deep learning models",
              },
              {
                title: "Real-time Inference",
                description: "Millisecond-level response times with high concurrency request handling",
              },
              {
                title: "Enterprise Security",
                description: "Complete data encryption and access control systems",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 hover:border-purple-500/50 transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-purple-300 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.div
            className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Key Features
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Support for multiple AI models and algorithms including NLP, computer vision, and time series prediction</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Automated model training and optimization to reduce development time and costs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Complete model management and version control system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Support for edge computing and distributed deployment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 mt-1">✓</span>
                <span>Real-time monitoring and performance analysis tools</span>
              </li>
            </ul>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={() => setLocation("/en/contact")}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              Contact Us Now
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Materials
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
