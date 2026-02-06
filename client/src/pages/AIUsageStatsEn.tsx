import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowLeft, TrendingUp, Zap, DollarSign, Activity } from "lucide-react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

interface UsageStat {
  userId: number;
  model: string;
  callCount: number;
  totalTokens: number;
  successCount: number;
  failureCount: number;
  statDate: Date;
}

const MODELS = {
  "gpt-4": { name: "GPT-4", color: "#10b981" },
  "claude": { name: "Claude", color: "#f59e0b" },
  "grok": { name: "Grok", color: "#a855f7" },
  "gemini": { name: "Gemini", color: "#3b82f6" },
  "kimi": { name: "Kimi", color: "#6366f1" },
  "deepseek": { name: "DeepSeek", color: "#f97316" },
};

const COLORS = Object.values(MODELS).map((m) => m.color);

export default function AIUsageStatsEn() {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const getUsageStatsQuery = trpc.aiChat.getUsageStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const stats = getUsageStatsQuery.data || [];

  // 计算统计数据
  const totalCalls = stats.reduce((sum, s) => sum + s.callCount, 0);
  const totalTokens = stats.reduce((sum, s) => sum + s.totalTokens, 0);
  const totalSuccess = stats.reduce((sum, s) => sum + s.successCount, 0);
  const totalFailure = stats.reduce((sum, s) => sum + s.failureCount, 0);
  const successRate = totalCalls > 0 ? ((totalSuccess / totalCalls) * 100).toFixed(2) : "0";
  const costPerMillion = 0.002; // $0.002 per 1M tokens (示例)
  const estimatedCost = (totalTokens * costPerMillion) / 1000000;

  // 按模型分组数据
  const modelStats = Object.keys(MODELS).map((model) => {
    const modelData = stats.find((s) => s.model === model);
    return {
      name: MODELS[model as keyof typeof MODELS].name,
      calls: modelData?.callCount || 0,
      tokens: modelData?.totalTokens || 0,
      success: modelData?.successCount || 0,
      failure: modelData?.failureCount || 0,
    };
  });

  // 成功/失败比例
  const successFailureData = [
    { name: "Success", value: totalSuccess },
    { name: "Failed", value: totalFailure },
  ];

  // 模型使用分布
  const modelDistribution = modelStats.filter((m) => m.calls > 0);

  const StatCard = ({
    icon: Icon,
    label,
    value,
    unit,
    color,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    unit?: string;
    color: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-lg bg-gradient-to-br ${color} border border-white/10`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">
            {value}
            {unit && <span className="text-lg ml-2">{unit}</span>}
          </p>
        </div>
        <div className="text-white/30">{Icon}</div>
      </div>
    </motion.div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <Button
            onClick={() => setLocation("/")}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600"
          >
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/en/uvs-ai-chat")}
              className="text-white hover:text-purple-400 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-white">Usage Statistics</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Activity size={32} />}
            label="Total Calls"
            value={totalCalls}
            color="from-blue-600/20 to-blue-700/20"
          />
          <StatCard
            icon={<Zap size={32} />}
            label="Total Tokens"
            value={totalTokens.toLocaleString()}
            color="from-purple-600/20 to-purple-700/20"
          />
          <StatCard
            icon={<TrendingUp size={32} />}
            label="Success Rate"
            value={successRate}
            unit="%"
            color="from-green-600/20 to-green-700/20"
          />
          <StatCard
            icon={<DollarSign size={32} />}
            label="Est. Cost"
            value={`$${estimatedCost.toFixed(4)}`}
            color="from-amber-600/20 to-amber-700/20"
          />
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 模型调用分布 */}
          <Card className="p-6 bg-slate-900/50 border-purple-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Model Distribution</h3>
            {modelDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={modelDistribution}
                    dataKey="calls"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {modelDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-400">
                No data
              </div>
            )}
          </Card>

          {/* 成功/失败比例 */}
          <Card className="p-6 bg-slate-900/50 border-purple-500/20">
            <h3 className="text-lg font-bold text-white mb-4">Success/Failure Ratio</h3>
            {totalCalls > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={successFailureData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-400">
                No data
              </div>
            )}
          </Card>
        </div>

        {/* 模型详情表 */}
        <Card className="p-6 bg-slate-900/50 border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-4">Model Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left py-3 px-4 text-gray-300">Model</th>
                  <th className="text-right py-3 px-4 text-gray-300">Calls</th>
                  <th className="text-right py-3 px-4 text-gray-300">Tokens</th>
                  <th className="text-right py-3 px-4 text-gray-300">Success</th>
                  <th className="text-right py-3 px-4 text-gray-300">Failed</th>
                  <th className="text-right py-3 px-4 text-gray-300">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {modelStats.map((stat, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-800/50 hover:bg-slate-800/20 transition"
                  >
                    <td className="py-3 px-4 text-white font-medium">{stat.name}</td>
                    <td className="text-right py-3 px-4 text-gray-300">{stat.calls}</td>
                    <td className="text-right py-3 px-4 text-gray-300">
                      {stat.tokens.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4 text-green-400">{stat.success}</td>
                    <td className="text-right py-3 px-4 text-red-400">{stat.failure}</td>
                    <td className="text-right py-3 px-4 text-gray-300">
                      {stat.calls > 0
                        ? ((stat.success / stat.calls) * 100).toFixed(2)
                        : "0"}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
