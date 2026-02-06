import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Apple, MessageCircle, Instagram } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getLoginUrl } from "@/const";

export default function Login() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = language === "zh" ? "请输入邮箱" : "Please enter email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === "zh" ? "邮箱格式不正确" : "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = language === "zh" ? "请输入密码" : "Please enter password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 实际应用中应该调用登录 API
      // 这里模拟登录成功后跳转到对话页面
      setLocation("/zh/uvs-ai-chat");
    } catch (error) {
      setErrors({
        submit: language === "zh" ? "登录失败，请稍后重试" : "Login failed, please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
            onClick={() => setLocation("/zh")}
            className="text-gray-400 hover:text-white transition flex items-center gap-2"
          >
            <ArrowRight size={20} className="rotate-180" />
            <span>{language === "zh" ? "返回首页" : "Back"}</span>
          </button>
          <LanguageSwitcher />
        </div>

        <Card className="p-8 bg-slate-900/50 border-purple-500/20 backdrop-blur-xl">
          {/* 标题 */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              {language === "zh" ? "欢迎回来" : "Welcome Back"}
            </h1>
            <p className="text-gray-400">
              {language === "zh"
                ? "登录您的 UVS AI 账户"
                : "Sign in to your UVS AI account"}
            </p>
          </div>

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 邮箱 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === "zh" ? "邮箱地址" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={language === "zh" ? "输入邮箱" : "Enter email"}
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  {language === "zh" ? "密码" : "Password"}
                </label>
                <button
                  type="button"
                  onClick={() => setLocation("/zh/forgot-password")}
                  className="text-purple-400 hover:text-purple-300 text-sm transition"
                >
                  {language === "zh" ? "忘记密码？" : "Forgot password?"}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={language === "zh" ? "输入密码" : "Enter password"}
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

            {/* 记住我 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-purple-500/20 bg-slate-800/50 text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-400 cursor-pointer">
                {language === "zh" ? "记住我" : "Remember me"}
              </label>
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

            {/* 登录按钮 */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 py-2.5 font-medium"
            >
              {isLoading
                ? language === "zh"
                  ? "登录中..."
                  : "Signing in..."
                : language === "zh"
                ? "登录"
                : "Sign In"}
            </Button>

            {/* 分割线 */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900/50 text-gray-500">
                  {language === "zh" ? "或" : "Or"}
                </span>
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
                {language === "zh" ? "使用 Google 登录" : "Sign in with Google"}
              </Button>

              {/* Microsoft 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                </svg>
                {language === "zh" ? "使用 Microsoft 登录" : "Sign in with Microsoft"}
              </Button>

              {/* Apple 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <Apple size={18} />
                {language === "zh" ? "使用 Apple 登录" : "Sign in with Apple"}
              </Button>

              {/* 微信登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <MessageCircle size={18} />
                {language === "zh" ? "使用微信登录" : "Sign in with WeChat"}
              </Button>

              {/* Instagram 登录 */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <Instagram size={18} />
                {language === "zh" ? "使用 Instagram 登录" : "Sign in with Instagram"}
              </Button>
            </div>

            {/* 注册链接 */}
            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-gray-400 text-sm">
                {language === "zh" ? "还没有账户？" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setLocation("/zh/register")}
                  className="text-purple-400 hover:text-purple-300 transition font-medium"
                >
                  {language === "zh" ? "立即注册" : "Sign Up"}
                </button>
              </p>
            </div>
          </form>
        </Card>

        {/* 底部提示 */}
        <p className="text-center text-gray-500 text-xs mt-6">
          {language === "zh"
            ? "登录即表示您同意我们的服务条款和隐私政策"
            : "By signing in, you agree to our Terms of Service and Privacy Policy"}
        </p>
      </motion.div>
    </div>
  );
}
