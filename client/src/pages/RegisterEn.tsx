import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Chrome, MessageCircle, Instagram } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function RegisterEn() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter username";
    } else if (formData.name.length < 3) {
      newErrors.name = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Please enter password";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        setLocation("/en/login");
      }, 2000);
    } catch (error) {
      setErrors({
        submit: "Registration failed, please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* 顶部导航 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setLocation("/en")}
            className="text-gray-400 hover:text-white transition flex items-center gap-2"
          >
            <ArrowRight size={20} className="rotate-180" />
            <span>Back</span>
          </button>
          <LanguageSwitcher />
        </div>

        <Card className="p-8 bg-slate-900/50 border-purple-500/20 backdrop-blur-xl">
          {/* 标题 */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">
              Join UVS AI community and start your smart journey
            </p>
          </div>

          {/* 成功消息 */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center"
            >
              {successMessage}
            </motion.div>
          )}

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 用户名 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className={`w-full bg-slate-800/50 border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none transition ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-500/20 focus:border-purple-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className={`w-full bg-slate-800/50 border rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none transition ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-500/20 focus:border-purple-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* 密码 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={`w-full bg-slate-800/50 border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none transition ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-500/20 focus:border-purple-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* 确认密码 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`w-full bg-slate-800/50 border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none transition ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-500/20 focus:border-purple-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* 提交错误 */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center"
              >
                {errors.submit}
              </motion.div>
            )}

            {/* 注册按钮 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 py-2.5 font-medium"
            >
              {isLoading ? "Registering..." : "Create Account"}
            </Button>

            {/* 分割线 */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900/50 text-gray-500">Or</span>
              </div>
            </div>

            {/* 第三方登录 */}
            <div className="space-y-2">
              {/* Google 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <Chrome size={18} />
                Sign up with Google
              </Button>

              {/* 微信登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <MessageCircle size={18} />
                Sign up with WeChat
              </Button>

              {/* Instagram 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <Instagram size={18} />
                Sign up with Instagram
              </Button>
            </div>

            {/* 登录链接 */}
            <div className="text-center pt-2 border-t border-slate-700">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setLocation("/en/login")}
                  className="text-purple-400 hover:text-purple-300 transition font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </Card>

        {/* 底部提示 */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
