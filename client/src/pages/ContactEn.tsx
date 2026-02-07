import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactEn() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const createInquiry = trpc.inquiries.create.useMutation({
    onSuccess: () => {
      toast.success("Inquiry submitted successfully. Thank you for your interest!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      toast.error("Submission failed. Please try again later.");
      console.error(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    await createInquiry.mutateAsync(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLocation(`/${language}`)}
          >
            <motion.img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/309965843024938099/uAJQYgErxzlvdMug.png" 
              alt="UVS" 
              className="h-16 w-auto" 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            <a href={`/${language}`} className="text-gray-300 hover:text-white transition">
              Home
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">
              Contact
            </a>
          </div>

          <Button
            onClick={() => setLocation(`/${language}`)}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
          >
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-40 pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-gray-400 text-lg">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Contact Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 border-purple-500/30 p-6 h-full">
                  <Mail className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-white font-bold mb-2">Email</h3>
                  <a href="mailto:satifuxie@gmail.com" className="hover:text-white transition">
                    satifuxie@gmail.com
                  </a>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 border-cyan-500/30 p-6 h-full">
                  <Phone className="w-8 h-8 text-cyan-400 mb-4" />
                  <h3 className="text-white font-bold mb-2">Phone</h3>
                  <a href="tel:+861519387647" className="hover:text-white transition">
                    (+86) 151-9387-647
                  </a>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-pink-900/40 to-pink-900/20 border-pink-500/30 p-6 h-full">
                  <MapPin className="w-8 h-8 text-pink-400 mb-4" />
                  <h3 className="text-white font-bold mb-2">Address</h3>
                  <p className="text-gray-400 text-sm">
                    Second Ring South Road, Yanta District, Xi'an, Shaanxi Province, China
                  </p>
                </Card>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-slate-800/50 border-slate-700/50 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Name *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Subject *</label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Inquiry subject"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      rows={6}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={createInquiry.isPending}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3"
                  >
                    {createInquiry.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-lg">
              Find answers to common questions about our services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What services do you offer?",
                a: "We provide comprehensive smart technology solutions including AI applications, intelligent robots, IoT technology, and spacetech aircraft design and research."
              },
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on complexity and scope. We'll provide a detailed timeline during the consultation phase."
              },
              {
                q: "Do you offer customized solutions?",
                a: "Yes, we specialize in creating customized solutions tailored to your specific business needs and requirements."
              },
              {
                q: "What is your support process?",
                a: "We provide comprehensive support from initial consultation through development, deployment, and ongoing maintenance."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700/50 p-6">
                  <h3 className="text-white font-bold mb-3">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
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
                We focus on cutting-edge research and development of AI, intelligent robots, IoT, and space-time synchronized aircraft.
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
                <li>Address: Yanta District, Xi'an, Shaanxi, China</li>
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
