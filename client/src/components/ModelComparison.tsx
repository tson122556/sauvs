/**
 * 模型对比结果组件
 * 显示不同模型的回答对比，让用户选择最满意的答案
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface ModelResponse {
  modelId: string;
  modelName: string;
  modelColor: string;
  response: string;
  responseTime: number;
  tokensUsed?: number;
  confidence?: number;
  isSelected?: boolean;
}

interface ModelComparisonProps {
  responses: ModelResponse[];
  onSelectResponse?: (modelId: string) => void;
  onCombineResponses?: (modelIds: string[]) => void;
}

export function ModelComparison({
  responses,
  onSelectResponse,
  onCombineResponses,
}: ModelComparisonProps) {
  const [expandedModels, setExpandedModels] = useState<Set<string>>(
    new Set([responses[0]?.modelId])
  );
  const [selectedModels, setSelectedModels] = useState<Set<string>>(
    new Set([responses[0]?.modelId])
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpanded = (modelId: string) => {
    const newExpanded = new Set(expandedModels);
    if (newExpanded.has(modelId)) {
      newExpanded.delete(modelId);
    } else {
      newExpanded.add(modelId);
    }
    setExpandedModels(newExpanded);
  };

  const toggleSelected = (modelId: string) => {
    const newSelected = new Set(selectedModels);
    if (newSelected.has(modelId)) {
      newSelected.delete(modelId);
    } else {
      newSelected.add(modelId);
    }
    setSelectedModels(newSelected);
  };

  const handleCopy = (text: string, modelId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(modelId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCombine = () => {
    if (selectedModels.size > 1 && onCombineResponses) {
      onCombineResponses(Array.from(selectedModels));
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* 对比标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">模型对比</h3>
          <p className="text-sm text-muted-foreground">
            共 {responses.length} 个模型的回答
          </p>
        </div>
        {selectedModels.size > 1 && (
          <Button
            onClick={handleCombine}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="sm"
          >
            组合 {selectedModels.size} 个答案
          </Button>
        )}
      </div>

      {/* 模型响应卡片 */}
      <div className="space-y-3">
        {responses.map((response, index) => (
          <motion.div
            key={response.modelId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors">
              {/* 卡片头部 */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
                onClick={() => toggleExpanded(response.modelId)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {/* 模型标签 */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        checked={selectedModels.has(response.modelId)}
                        onChange={() => toggleSelected(response.modelId)}
                        className="w-4 h-4 rounded cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div
                        className={`w-3 h-3 rounded-full ${response.modelColor}`}
                        style={{
                          boxShadow: `0 0 8px ${response.modelColor}`,
                        }}
                      />
                      <span className="font-semibold text-white">
                        {response.modelName}
                      </span>
                    </div>

                    {/* 响应时间和置信度 */}
                    <div className="flex items-center gap-4 ml-auto text-xs text-muted-foreground">
                      <span>⏱️ {response.responseTime}ms</span>
                      {response.confidence && (
                        <span>
                          📊 {(response.confidence * 100).toFixed(0)}% 置信度
                        </span>
                      )}
                      {response.tokensUsed && (
                        <span>🔤 {response.tokensUsed} tokens</span>
                      )}
                    </div>
                  </div>

                  {/* 展开/收起按钮 */}
                  <div className="flex items-center gap-2">
                    {expandedModels.has(response.modelId) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* 预览文本 */}
                {!expandedModels.has(response.modelId) && (
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {response.response}
                  </p>
                )}
              </div>

              {/* 展开内容 */}
              <AnimatePresence>
                {expandedModels.has(response.modelId) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-800 bg-gray-950/50"
                  >
                    <div className="p-4 space-y-4">
                      {/* 完整响应 */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-300">
                          完整回答
                        </p>
                        <div className="bg-gray-900 rounded p-3 text-sm text-gray-200 max-h-48 overflow-y-auto">
                          {response.response}
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() =>
                            handleCopy(response.response, response.modelId)
                          }
                        >
                          {copiedId === response.modelId ? (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              已复制
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-1" />
                              复制
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            if (onSelectResponse) {
                              onSelectResponse(response.modelId);
                            }
                          }}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          选择此答案
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          有用
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          无用
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 提示信息 */}
      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-200">
        💡 提示：选择多个答案可以组合它们，或点击"选择此答案"使用单个模型的回答。
      </div>
    </div>
  );
}

export default ModelComparison;
