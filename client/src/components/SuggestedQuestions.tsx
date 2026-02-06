import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
  language?: "zh" | "en";
  isLoading?: boolean;
}

export function SuggestedQuestions({
  questions,
  onSelectQuestion,
  language = "zh",
  isLoading = false,
}: SuggestedQuestionsProps) {
  if (questions.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-3"
    >
      {/* 标题 */}
      <div className="flex items-center gap-2 px-4">
        <Lightbulb size={16} className="text-yellow-400" />
        <span className="text-sm font-medium text-gray-300">
          {language === "zh" ? "推荐追问" : "Suggested Questions"}
        </span>
      </div>

      {/* 推荐问题列表 */}
      <div className="grid grid-cols-1 gap-2 px-4">
        {questions.map((question, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Button
              onClick={() => onSelectQuestion(question)}
              disabled={isLoading}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 px-4 text-sm text-gray-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition disabled:opacity-50"
            >
              <span className="line-clamp-2">{question}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * 根据对话内容生成推荐追问
 */
export function generateSuggestedQuestions(
  lastMessage: string,
  language: "zh" | "en" = "zh"
): string[] {
  // 中文推荐追问
  const zhQuestions: Record<string, string[]> = {
    ai: [
      "AI 技术的最新发展趋势是什么？",
      "如何在项目中应用 AI 技术？",
      "AI 模型的训练过程是怎样的？",
      "AI 伦理问题需要注意什么？",
    ],
    code: [
      "这个代码有什么性能问题吗？",
      "如何优化这段代码的效率？",
      "这个算法的时间复杂度是多少？",
      "能否用更简洁的方式实现？",
    ],
    data: [
      "这些数据的趋势是什么？",
      "如何对这些数据进行分析？",
      "数据中有什么异常值吗？",
      "如何可视化这些数据？",
    ],
    writing: [
      "能否改进这段文字的表达？",
      "这段内容的逻辑是否清晰？",
      "如何让这段文字更有吸引力？",
      "能否用更简洁的方式表述？",
    ],
    default: [
      language === "zh"
        ? "能否详细解释一下？"
        : "Can you explain that in more detail?",
      language === "zh"
        ? "这个话题还有其他相关内容吗？"
        : "Are there other related topics?",
      language === "zh"
        ? "如何实际应用这个知识？"
        : "How can I apply this knowledge?",
      language === "zh"
        ? "能否举个例子说明？"
        : "Can you give an example?",
    ],
  };

  // 英文推荐追问
  const enQuestions: Record<string, string[]> = {
    ai: [
      "What are the latest trends in AI technology?",
      "How can I apply AI in my projects?",
      "What is the process of training AI models?",
      "What ethical issues should I consider with AI?",
    ],
    code: [
      "Are there any performance issues with this code?",
      "How can I optimize the efficiency of this code?",
      "What is the time complexity of this algorithm?",
      "Can this be implemented in a more concise way?",
    ],
    data: [
      "What are the trends in this data?",
      "How should I analyze this data?",
      "Are there any outliers in the data?",
      "How can I visualize this data?",
    ],
    writing: [
      "Can you improve the expression of this text?",
      "Is the logic of this content clear?",
      "How can I make this text more engaging?",
      "Can this be expressed more concisely?",
    ],
    default: [
      "Can you explain that in more detail?",
      "Are there other related topics?",
      "How can I apply this knowledge?",
      "Can you give an example?",
    ],
  };

  const questionMap = language === "zh" ? zhQuestions : enQuestions;
  const lowerMessage = lastMessage.toLowerCase();

  // 根据关键词选择推荐追问
  if (lowerMessage.includes("ai") || lowerMessage.includes("machine") || lowerMessage.includes("learning")) {
    return questionMap.ai;
  } else if (
    lowerMessage.includes("code") ||
    lowerMessage.includes("function") ||
    lowerMessage.includes("algorithm")
  ) {
    return questionMap.code;
  } else if (
    lowerMessage.includes("data") ||
    lowerMessage.includes("analysis") ||
    lowerMessage.includes("chart")
  ) {
    return questionMap.data;
  } else if (
    lowerMessage.includes("write") ||
    lowerMessage.includes("text") ||
    lowerMessage.includes("content")
  ) {
    return questionMap.writing;
  }

  return questionMap.default;
}
