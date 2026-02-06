/**
 * 模型竞争可视化组件
 * 显示多个模型同时处理请求的动画效果
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, Clock } from "lucide-react";

export interface CompetingModel {
  id: string;
  name: string;
  color: string;
  isWinner?: boolean;
  responseTime?: number;
  status: "waiting" | "processing" | "completed" | "error";
}

interface ModelCompetitionProps {
  models: CompetingModel[];
  isActive: boolean;
  onComplete?: (winnerId: string) => void;
}

export function ModelCompetition({
  models,
  isActive,
  onComplete,
}: ModelCompetitionProps) {
  const [animationPhase, setAnimationPhase] = useState<
    "start" | "racing" | "finish"
  >("start");

  useEffect(() => {
    if (!isActive) {
      setAnimationPhase("start");
      return;
    }

    // 启动竞争动画
    setAnimationPhase("racing");

    // 模拟完成时间
    const timer = setTimeout(() => {
      setAnimationPhase("finish");
      const winner = models.find((m) => m.isWinner);
      if (winner && onComplete) {
        onComplete(winner.id);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isActive, models, onComplete]);

  if (!isActive) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-500/30">
      {/* 标题 */}
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
        <h3 className="text-lg font-semibold text-white">
          {animationPhase === "start"
            ? "准备竞争..."
            : animationPhase === "racing"
              ? "模型抢答中..."
              : "竞争完成！"}
        </h3>
      </div>

      {/* 竞争赛道 */}
      <div className="space-y-4">
        {models.map((model, index) => (
          <ModelRaceTrack
            key={model.id}
            model={model}
            index={index}
            phase={animationPhase}
            totalModels={models.length}
          />
        ))}
      </div>

      {/* 完成提示 */}
      <AnimatePresence>
        {animationPhase === "finish" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3"
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-sm font-semibold text-green-300">
                {models.find((m) => m.isWinner)?.name} 抢答成功！
              </p>
              <p className="text-xs text-green-200">
                响应时间：
                {models.find((m) => m.isWinner)?.responseTime || 0}ms
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ModelRaceTrackProps {
  model: CompetingModel;
  index: number;
  phase: "start" | "racing" | "finish";
  totalModels: number;
}

function ModelRaceTrack({
  model,
  index,
  phase,
  totalModels,
}: ModelRaceTrackProps) {
  const isWinner = model.isWinner;
  const baseDelay = index * 0.1;

  // 计算赛道进度
  let progress = 0;
  if (phase === "racing") {
    progress = 75;
  } else if (phase === "finish") {
    progress = isWinner ? 100 : 60;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: baseDelay }}
      className="space-y-2"
    >
      {/* 模型标签 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${model.color}`}
            style={{
              boxShadow: `0 0 10px ${model.color}`,
            }}
          />
          <span className="text-sm font-medium text-white">{model.name}</span>
          {isWinner && (
            <Trophy className="w-4 h-4 text-yellow-400 animate-pulse" />
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {model.status === "completed" && (
            <span className="text-green-400">{model.responseTime}ms</span>
          )}
          {model.status === "processing" && (
            <span className="text-blue-400 animate-pulse">处理中...</span>
          )}
          {model.status === "waiting" && (
            <span className="text-gray-400">等待中</span>
          )}
        </span>
      </div>

      {/* 进度条 */}
      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <motion.div
          className={`h-full rounded-full ${
            isWinner
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
              : model.color === "bg-gradient-to-r from-green-500 to-green-600"
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : model.color === "bg-gradient-to-r from-amber-500 to-amber-600"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600"
                  : model.color === "bg-gradient-to-r from-purple-500 to-purple-600"
                    ? "bg-gradient-to-r from-purple-500 to-purple-600"
                    : model.color === "bg-gradient-to-r from-blue-500 to-blue-600"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : model.color === "bg-gradient-to-r from-indigo-500 to-indigo-600"
                        ? "bg-gradient-to-r from-indigo-500 to-indigo-600"
                        : "bg-gradient-to-r from-orange-500 to-orange-600"
          }`}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{
            delay: baseDelay + 0.2,
            duration: phase === "racing" ? 2.5 : 0.5,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

export default ModelCompetition;
