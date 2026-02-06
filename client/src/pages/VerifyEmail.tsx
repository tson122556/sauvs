import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function VerifyEmail() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // 自动移动到下一个输入框
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setError(language === "zh" ? "请输入完整的验证码" : "Please enter complete verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // 模拟验证邮箱
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 模拟验证成功（实际应该根据返回结果判断）
      setVerifySuccess(true);
    } catch (err) {
      setError(language === "zh" ? "验证失败，请稍后重试" : "Verification failed, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResendCountdown(60);
      setCode(["", "", "", "", "", ""]);
    } finally {
      setIsLoading(false);
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
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Mail size={24} className="text-purple-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {language === "zh" ? "验证邮箱" : "Verify Email"}
            </h1>
            <p className="text-gray-400">
              {language === "zh"
                ? "我们已发送验证码到您的邮箱，请输入验证码"
                : "We've sent a verification code to your email, please enter it"}
            </p>
          </div>

          {!verifySuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 验证码输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                  {language === "zh" ? "验证码" : "Verification Code"}
                </label>
                <div className="flex gap-2 justify-center">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 bg-slate-800/50 border border-purple-500/20 rounded-lg text-center text-white text-lg font-bold focus:outline-none focus:border-purple-500 transition"
                      placeholder="0"
                    />
                  ))}
                </div>
              </div>

              {/* 错误提示 */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400 text-sm"
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}

              {/* 提交按钮 */}
              <Button
                type="submit"
                disabled={isLoading || code.join("").length !== 6}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 py-2.5 font-medium"
              >
                {isLoading
                  ? language === "zh"
                    ? "验证中..."
                    : "Verifying..."
                  : language === "zh"
                  ? "验证邮箱"
                  : "Verify Email"}
              </Button>

              {/* 重新发送 */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-3">
                  {language === "zh" ? "没有收到验证码？" : "Didn't receive the code?"}
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCountdown > 0 || isLoading}
                  className="text-purple-400 hover:text-purple-300 transition font-medium disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {resendCountdown > 0
                    ? `${language === "zh" ? "重新发送" : "Resend"} (${resendCountdown}s)`
                    : language === "zh"
                    ? "重新发送验证码"
                    : "Resend Code"}
                </button>
              </div>

              {/* 返回登录 */}
              <div className="text-center pt-4 border-t border-slate-700">
                <p className="text-gray-400 text-sm">
                  {language === "zh" ? "已有账户？" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setLocation("/zh/login")}
                    className="text-purple-400 hover:text-purple-300 transition font-medium"
                  >
                    {language === "zh" ? "立即登录" : "Sign In"}
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
                  {language === "zh" ? "邮箱验证成功" : "Email Verified"}
                </h2>
                <p className="text-gray-400 mb-6">
                  {language === "zh"
                    ? "您的邮箱已成功验证，现在可以使用所有功能"
                    : "Your email has been verified, you can now use all features"}
                </p>
              </div>

              {/* 返回登录 */}
              <Button
                onClick={() => setLocation("/zh/login")}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-2.5 font-medium"
              >
                {language === "zh" ? "返回登录" : "Back to Sign In"}
              </Button>
            </motion.div>
          )}
        </Card>

        {/* 底部提示 */}
        <p className="text-center text-gray-500 text-xs mt-6">
          {language === "zh"
            ? "验证码将在 10 分钟后过期"
            : "Verification code will expire in 10 minutes"}
        </p>
      </motion.div>
    </div>
  );
}
