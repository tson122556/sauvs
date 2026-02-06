import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, TrendingUp, Activity } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface ModelStats {
  modelId: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  averageTokensUsed: number;
  totalCost: string;
  successRate: string;
}

interface SchedulingStats {
  totalRequests: number;
  activeRequests: number;
  modelDistribution: Record<string, number>;
  averageResponseTime: number;
  successRate: string;
}

export default function UVSAI() {
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "models" | "performance" | "scheduler"
  >("overview");
  const [modelStats, setModelStats] = useState<ModelStats[]>([]);
  const [schedulingStats, setSchedulingStats] = useState<SchedulingStats | null>(
    null
  );

  // 获取所有模型
  const { data: allModels } = trpc.uvsAI.getAllModels.useQuery();

  // 获取性能统计
  const { data: perfStats, refetch: refetchPerf } =
    trpc.uvsAI.getPerformanceStats.useQuery(undefined);

  // 获取调度统计
  const { data: schedStats, refetch: refetchSched } =
    trpc.uvsAI.getSchedulingStats.useQuery();

  useEffect(() => {
    if (perfStats) {
      setModelStats(perfStats as ModelStats[]);
    }
  }, [perfStats]);

  useEffect(() => {
    if (schedStats) {
      setSchedulingStats(schedStats as SchedulingStats);
    }
  }, [schedStats]);

  // 定时刷新统计数据
  useEffect(() => {
    const interval = setInterval(() => {
      refetchPerf();
      refetchSched();
    }, 5000);
    return () => clearInterval(interval);
  }, [refetchPerf, refetchSched]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              UVS Proprietary AI Model
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            整合国际、国内和学术优秀模型，通过智能调度实现高效协作
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          {[
            { id: "overview", label: "概览" },
            { id: "models", label: "模型列表" },
            { id: "performance", label: "性能统计" },
            { id: "scheduler", label: "调度引擎" },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() =>
                setSelectedTab(
                  tab.id as "overview" | "models" | "performance" | "scheduler"
                )
              }
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            {schedulingStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-800/50 border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">总请求数</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {schedulingStats.totalRequests}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-purple-500" />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">活跃请求</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {schedulingStats.activeRequests}
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-cyan-500" />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">平均响应时间</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {schedulingStats.averageResponseTime}ms
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-pink-500" />
                  </div>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">成功率</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {schedulingStats.successRate}%
                      </p>
                    </div>
                    <Sparkles className="w-8 h-8 text-green-500" />
                  </div>
                </Card>
              </div>
            )}

            {/* System Architecture */}
            <Card className="bg-slate-800/50 border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">系统架构</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      智能路由层
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      根据任务类型和用户需求自动选择最合适的模型
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      负载均衡引擎
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      管理多个模型的并发请求，实现最优资源分配
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      智能缓存层
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      缓存常见问题答案，减少 API 调用和成本
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      性能监控系统
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      实时监控各模型性能，动态调整调度策略
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      故障转移机制
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      当模型不可用时自动切换到备用模型
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Models Tab */}
        {selectedTab === "models" && (
          <div className="space-y-6">
            {allModels && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allModels.map((model: any) => (
                  <Card
                    key={model.id}
                    className="bg-slate-800/50 border-slate-700 p-6 hover:border-purple-500/50 transition-all"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {model.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{model.provider}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">区域</span>
                        <span className="text-white text-sm font-semibold">
                          {model.region === "international"
                            ? "国际"
                            : model.region === "china"
                              ? "国内"
                              : "学术"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">优先级</span>
                        <span className="text-white text-sm font-semibold">
                          {model.priority}/10
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">成功率</span>
                        <span className="text-white text-sm font-semibold">
                          {(model.successRate * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      <p>能力: {model.capabilities.join(", ")}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Performance Tab */}
        {selectedTab === "performance" && (
          <div className="space-y-6">
            {modelStats.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-gray-300">
                        模型
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        总请求
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        成功率
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        平均响应时间
                      </th>
                      <th className="text-left py-3 px-4 text-gray-300">
                        总成本
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelStats.map((stat) => (
                      <tr
                        key={stat.modelId}
                        className="border-b border-slate-700 hover:bg-slate-800/30"
                      >
                        <td className="py-3 px-4 text-white font-semibold">
                          {stat.modelId}
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {stat.totalRequests}
                        </td>
                        <td className="py-3 px-4 text-green-400">
                          {stat.successRate}%
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          {stat.averageResponseTime}ms
                        </td>
                        <td className="py-3 px-4 text-gray-300">
                          ${stat.totalCost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                <p className="text-gray-400">暂无性能数据</p>
              </Card>
            )}
          </div>
        )}

        {/* Scheduler Tab */}
        {selectedTab === "scheduler" && (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                调度策略配置
              </h2>

              <div className="space-y-6">
                {[
                  {
                    name: "通用对话",
                    taskType: "general",
                    primary: "ChatGPT",
                    fallback: "Claude, Kimi, 通义千问",
                  },
                  {
                    name: "代码生成",
                    taskType: "coding",
                    primary: "StarCoder2",
                    fallback: "DeepSeek, ChatGPT, Claude",
                  },
                  {
                    name: "深度分析",
                    taskType: "analysis",
                    primary: "Claude",
                    fallback: "DeepSeek, ChatGPT, Kimi",
                  },
                  {
                    name: "创意生成",
                    taskType: "creative",
                    primary: "ChatGPT",
                    fallback: "通义千问, 豆包, Claude",
                  },
                  {
                    name: "中文优化",
                    taskType: "chinese",
                    primary: "通义千问",
                    fallback: "ChatGLM-3, Kimi, DeepSeek",
                  },
                  {
                    name: "多语言处理",
                    taskType: "multilingual",
                    primary: "Gemini",
                    fallback: "ChatGPT, 通义千问, Falcon",
                  },
                ].map((strategy) => (
                  <div
                    key={strategy.taskType}
                    className="border border-slate-700 rounded-lg p-4"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {strategy.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">主模型: </span>
                        <span className="text-purple-400 font-semibold">
                          {strategy.primary}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">备用模型: </span>
                        <span className="text-cyan-400">{strategy.fallback}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
