import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function ForgotPassword() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = language === "zh" ? "请输入邮箱" : "Please enter email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = language === "zh" ? "邮箱格式不正确" : "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      // 模拟发送重置邮件
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmailSent(true);
    } catch (error) {
      setErrors({
        submit: language === "zh" ? "发送失败，请稍后重试" : "Failed to send email, please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: "",
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
            onClick={() => setLocation("/zh/login")}
            className="text-gray-400 hover:text-white transition flex items-center gap-2"
          >
            <ArrowRight size={20} className="rotate-180" />
            <span>{language === "zh" ? "返回登录" : "Back"}</span>
          </button>
          <LanguageSwitcher />
        </div>

        <Card className="p-8 bg-slate-900/50 border-purple-500/20 backdrop-blur-xl">
          {/* 标题 */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              {language === "zh" ? "重置密码" : "Reset Password"}
            </h1>
            <p className="text-gray-400">
              {language === "zh"
                ? "输入您的邮箱地址，我们将发送重置链接"
                : "Enter your email address and we'll send you a reset link"}
            </p>
          </div>

          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 邮箱输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === "zh" ? "邮箱地址" : "Email Address"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                  <input
                    type="email"
                    value={email}
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

              {/* 提交按钮 */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 py-2.5 font-medium"
              >
                {isLoading
                  ? language === "zh"
                    ? "发送中..."
                    : "Sending..."
                  : language === "zh"
                  ? "发送重置链接"
                  : "Send Reset Link"}
              </Button>

              {/* 返回登录 */}
              <div className="text-center pt-4 border-t border-slate-700">
                <p className="text-gray-400 text-sm">
                  {language === "zh" ? "想起密码了？" : "Remember your password?"}{" "}
                  <button
                    type="button"
                    onClick={() => setLocation("/zh/login")}
                    className="text-purple-400 hover:text-purple-300 transition font-medium"
                  >
                    {language === "zh" ? "返回登录" : "Sign In"}
                  </button>
                </p>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-center"
            >
              {/* 成功图标 */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
              </div>

              {/* 成功消息 */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {language === "zh" ? "邮件已发送" : "Email Sent"}
                </h2>
                <p className="text-gray-400 mb-4">
                  {language === "zh"
                    ? "请检查您的邮箱，点击链接重置密码。链接将在 24 小时后过期。"
                    : "Please check your email and click the link to reset your password. The link will expire in 24 hours."}
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  {language === "zh" ? "邮箱地址: " : "Email: "}
                  <span className="text-gray-300">{email}</span>
                </p>
              </div>

              {/* 返回登录 */}
              <Button
                onClick={() => setLocation("/zh/login")}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-2.5 font-medium"
              >
                {language === "zh" ? "返回登录" : "Back to Sign In"}
              </Button>

              {/* 重新发送 */}
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail("");
                }}
                className="w-full text-purple-400 hover:text-purple-300 transition py-2.5 font-medium"
              >
                {language === "zh" ? "使用其他邮箱" : "Use Different Email"}
              </button>
            </motion.div>
          )}
        </Card>

        {/* 底部提示 */}
        <p className="text-center text-gray-500 text-xs mt-6">
          {language === "zh"
            ? "如果您没有收到邮件，请检查垃圾邮件文件夹"
            : "If you don't receive an email, please check your spam folder"}
        </p>
      </motion.div>
    </div>
  );
}
