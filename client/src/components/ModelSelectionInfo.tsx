/**
 * 模型选择提示组件
 * 显示选中的模型及其选择原因
 */

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Info, AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ModelSelectionDetails {
  modelId: string;
  modelName: string;
  modelColor: string;
  selectionReason: string;
  criteria?: {
    complexity?: number;
    speed?: number;
    quality?: number;
    budget?: number;
  };
  modality: "text" | "image" | "video";
  score?: number;
}

interface ModelSelectionInfoProps {
  selection: ModelSelectionDetails;
  showDetails?: boolean;
  position?: "top" | "bottom" | "inline";
}

export function ModelSelectionInfo({
  selection,
  showDetails = true,
  position = "inline",
}: ModelSelectionInfoProps) {
  const criteriaLabels = {
    complexity: "复杂度",
    speed: "速度",
    quality: "质量",
    budget: "预算",
  };

  const modalityIcons = {
    text: "📝",
    image: "🖼️",
    video: "🎬",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: position === "top" ? -10 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={position === "inline" ? "w-full" : ""}
    >
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/50 p-4">
        {/* 主要信息 */}
        <div className="flex items-start gap-3">
          {/* 模型指示器 */}
          <div className="flex-shrink-0">
            <div
              className={`w-10 h-10 rounded-lg ${selection.modelColor} flex items-center justify-center text-lg`}
              style={{
                boxShadow: `0 0 15px ${selection.modelColor}`,
              }}
            >
              {modalityIcons[selection.modality]}
            </div>
          </div>

          {/* 信息内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <h4 className="font-semibold text-white">{selection.modelName}</h4>
              <span className="text-xs px-2 py-1 bg-purple-500/30 rounded text-purple-200">
                {selection.modality === "text"
                  ? "文本生成"
                  : selection.modality === "image"
                    ? "图片生成"
                    : "视频生成"}
              </span>
            </div>

            {/* 选择原因 */}
            <p className="text-sm text-gray-300 mb-3">{selection.selectionReason}</p>

            {/* 详细信息 */}
            {showDetails && selection.criteria && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.1 }}
                className="space-y-2 pt-3 border-t border-purple-500/30"
              >
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  选择条件
                </p>

                {/* 条件指标 */}
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selection.criteria).map(([key, value]) => {
                    if (value === undefined || value === null) return null;

                    const label =
                      criteriaLabels[key as keyof typeof criteriaLabels] || key;
                    const percentage = Math.round(value * 100);

                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">{label}</span>
                          <span className="text-gray-300 font-medium">
                            {percentage}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 综合评分 */}
                {selection.score !== undefined && (
                  <div className="mt-3 p-2 bg-purple-500/20 rounded flex items-center justify-between">
                    <span className="text-xs text-gray-300">综合评分</span>
                    <span className="text-sm font-semibold text-purple-300">
                      {selection.score.toFixed(1)}/100
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* 信息图标 */}
          <div className="flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * 消息中的模型选择提示（紧凑版本）
 */
export function MessageModelInfo({
  modelName,
  modelColor,
  responseTime,
  modality,
}: {
  modelName: string;
  modelColor: string;
  responseTime?: number;
  modality?: "text" | "image" | "video";
}) {
  const modalityEmoji = {
    text: "📝",
    image: "🖼️",
    video: "🎬",
  };

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2 pt-2 border-t border-gray-800">
      <div
        className={`w-2 h-2 rounded-full ${modelColor}`}
        style={{
          boxShadow: `0 0 6px ${modelColor}`,
        }}
      />
      <span className="font-medium">{modelName}</span>
      {modality && <span>{modalityEmoji[modality]}</span>}
      {responseTime && <span>⏱️ {responseTime}ms</span>}
    </div>
  );
}

export default ModelSelectionInfo;
