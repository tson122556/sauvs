import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { GoogleIcon, MicrosoftIcon, AppleIcon, WeChatIcon, InstagramIcon } from "@/components/SocialIcons";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getLoginUrl } from "@/const";

export default function LoginEn() {
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
      newErrors.email = "Please enter email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Please enter password";
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

      setLocation("/en/uvs-ai-chat");
    } catch (error) {
      setErrors({
        submit: "Login failed, please try again",
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
      {/* Background Decoration */}
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
        {/* Top Navigation */}
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
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your UVS AI account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setLocation("/en/forgot-password")}
                  className="text-purple-400 hover:text-purple-300 text-sm transition"
                >
                  Forgot password?
                </button>
              </div>
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

            {/* Remember Me */}
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
                Remember me
              </label>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center"
              >
                {errors.submit}
              </motion.div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 py-2.5 font-medium"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900/50 text-gray-500">Or</span>
              </div>
            </div>

            {/* Third-party Login */}
            <div className="space-y-2">
              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <GoogleIcon size={18} />
                Sign in with Google
              </Button>

              {/* Microsoft Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <MicrosoftIcon size={18} />
                Sign in with Microsoft
              </Button>

              {/* Apple Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <AppleIcon size={18} />
                Sign in with Apple
              </Button>

              {/* WeChat Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <WeChatIcon size={18} />
                Sign in with WeChat
              </Button>

              {/* Instagram Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-2.5"
              >
                <InstagramIcon size={18} />
                Sign in with Instagram
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setLocation("/en/register")}
                  className="text-purple-400 hover:text-purple-300 transition font-medium"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </Card>

        {/* Bottom Notice */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
