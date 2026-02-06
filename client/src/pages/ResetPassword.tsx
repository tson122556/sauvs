import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function ResetPassword() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const validatePasswords = () => {
    const newErrors: Record<string, string> = {};

    if (!password.trim()) {
      newErrors.password = language === "zh" ? "请输入新密码" : "Please enter new password";
    } else if (password.length < 8) {
      newErrors.password = language === "zh" ? "密码至少 8 个字符" : "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = language === "zh" ? "密码必须包含大写字母" : "Password must contain uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = language === "zh" ? "密码必须包含数字" : "Password must contain number";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = language === "zh" ? "密码必须包含特殊字符 (!@#$%^&*)" : "Password must contain special character (!@#$%^&*)";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = language === "zh" ? "请确认密码" : "Please confirm password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = language === "zh" ? "两次输入的密码不一致" : "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) return;

    setIsLoading(true);
    try {
      // 模拟重置密码
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResetSuccess(true);
    } catch (error) {
      setErrors({
        submit: language === "zh" ? "重置失败，请稍后重试" : "Reset failed, please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "", displayStrength: 0 };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    const labels = [
      { label: language === "zh" ? "弱" : "Weak", color: "bg-red-500", displayStrength: 1 },
      { label: language === "zh" ? "中等" : "Fair", color: "bg-yellow-500", displayStrength: 2 },
      { label: language === "zh" ? "强" : "Good", color: "bg-blue-500", displayStrength: 3 },
      { label: language === "zh" ? "很强" : "Strong", color: "bg-green-500", displayStrength: 4 },
      { label: language === "zh" ? "非常强" : "Very Strong", color: "bg-green-600", displayStrength: 5 },
    ];

    return labels[Math.min(strength - 1, 4)] || labels[0];
  };

  const strength = getPasswordStrength();

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
              {language === "zh" ? "设置新密码" : "Set New Password"}
            </h1>
            <p className="text-gray-400">
              {language === "zh"
                ? "请输入一个安全的新密码"
                : "Please enter a secure new password"}
            </p>
          </div>

          {!resetSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 新密码输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === "zh" ? "新密码" : "New Password"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({
                          ...prev,
                          password: "",
                        }));
                      }
                    }}
                    placeholder={language === "zh" ? "输入新密码" : "Enter new password"}
                    className={`w-full bg-slate-800/50 border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none transition ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-purple-500/20 focus:border-purple-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}

                {/* 密码强度指示 */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${(strength.displayStrength / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{strength.label}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {language === "zh"
                        ? "密码需要：大写字母、数字、特殊字符、至少 8 个字符"
                        : "Password needs: uppercase, number, special character, at least 8 characters"}
                    </p>
                  </div>
                )}
              </div>

              {/* 确认密码输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === "zh" ? "确认密码" : "Confirm Password"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword: "",
                        }));
                      }
                    }}
                    placeholder={language === "zh" ? "确认密码" : "Confirm password"}
                    className={`w-full bg-slate-800/50 border rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none transition ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-purple-500/20 focus:border-purple-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
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

              {/* 提交按钮 */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 py-2.5 font-medium"
              >
                {isLoading
                  ? language === "zh"
                    ? "重置中..."
                    : "Resetting..."
                  : language === "zh"
                  ? "重置密码"
                  : "Reset Password"}
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
                  {language === "zh" ? "密码重置成功" : "Password Reset Successful"}
                </h2>
                <p className="text-gray-400 mb-6">
                  {language === "zh"
                    ? "您的密码已成功重置，请使用新密码登录"
                    : "Your password has been successfully reset, please sign in with your new password"}
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
      </motion.div>
    </div>
  );
}
