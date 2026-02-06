/**
 * 高级模型选择引擎
 * 支持多模态内容检测和动态模型评分
 */

export interface ContentAnalysis {
  type: "text" | "code" | "image" | "video" | "mixed";
  complexity: "simple" | "medium" | "complex";
  categories: string[];
  confidence: number;
  multimodal: boolean;
}

export interface ModelScore {
  model: string;
  score: number;
  reason: string;
}

/**
 * 分析输入内容的类型和复杂度
 */
export function analyzeContent(input: string): ContentAnalysis {
  const categories: string[] = [];
  let type: "text" | "code" | "image" | "video" | "mixed" = "text";
  let complexity: "simple" | "medium" | "complex" = "simple";
  let confidence = 0;
  let multimodal = false;

  // 检测代码内容
  const codePatterns = [
    /```[\s\S]*?```/g,
    /function|class|def|const|let|var|import|export/i,
    /\{[\s\S]*?\}|\[[\s\S]*?\]/g,
    /=>|async|await|try|catch/i,
  ];
  const hasCode = codePatterns.some((pattern) => pattern.test(input));

  // 检测图片相关内容
  const imagePatterns = [
    /image|photo|picture|visual|diagram|chart|graph|design|ui|ux|screenshot|icon|logo/i,
    /pixel|resolution|dpi|rgba|color|hue|saturation|brightness/i,
    /draw|sketch|paint|illustrate|render/i,
  ];
  const hasImage = imagePatterns.some((pattern) => pattern.test(input));

  // 检测视频相关内容
  const videoPatterns = [
    /video|movie|film|animation|streaming|frame|fps|codec|resolution|subtitle/i,
    /youtube|vimeo|mp4|webm|avi|mov|mkv/i,
    /edit|cut|trim|transition|effect|render/i,
  ];
  const hasVideo = videoPatterns.some((pattern) => pattern.test(input));

  // 检测文本分析相关
  const textAnalysisPatterns = [
    /analyze|summary|article|research|academic|paper|document|report|essay|writing/i,
    /grammar|spelling|punctuation|style|tone|sentiment|emotion/i,
    /translate|language|linguistic|semantic/i,
  ];
  const hasTextAnalysis = textAnalysisPatterns.some((pattern) => pattern.test(input));

  // 检测实时信息需求
  const realtimePatterns = [
    /news|current|today|latest|real-time|trending|recent|breaking|update/i,
    /weather|stock|price|market|rate|exchange/i,
    /live|happening|now|today|this week/i,
  ];
  const hasRealtime = realtimePatterns.some((pattern) => pattern.test(input));

  // 检测长上下文需求
  const longContextPatterns = [
    /long|context|memory|remember|previous|history|conversation|thread/i,
    /summarize|recap|review|reference|mention|earlier|before/i,
    /book|novel|document|file|transcript|conversation/i,
  ];
  const hasLongContext = longContextPatterns.some((pattern) => pattern.test(input));

  // 检测推理和问题解决
  const reasoningPatterns = [
    /reason|logic|solve|problem|complex|think|analyze|explain|why|how/i,
    /step|process|method|approach|strategy|plan|algorithm/i,
    /debug|error|issue|bug|fix|troubleshoot/i,
  ];
  const hasReasoning = reasoningPatterns.some((pattern) => pattern.test(input));

  // 检测数据分析
  const dataAnalysisPatterns = [
    /data|analysis|statistics|metric|trend|pattern|insight|correlation/i,
    /table|spreadsheet|database|query|sql|aggregate|group|sort/i,
    /visualization|chart|graph|plot|histogram|scatter/i,
  ];
  const hasDataAnalysis = dataAnalysisPatterns.some((pattern) => pattern.test(input));

  // 确定内容类型
  const typeCount = [hasCode, hasImage, hasVideo, hasTextAnalysis, hasRealtime, hasLongContext].filter(
    (b) => b
  ).length;
  multimodal = typeCount > 1;

  if (hasCode) {
    type = "code";
    categories.push("programming");
  }
  if (hasImage) {
    type = hasVideo ? "mixed" : "image";
    categories.push("visual");
  }
  if (hasVideo) {
    type = "video";
    categories.push("video");
  }
  if (hasTextAnalysis) {
    categories.push("text-analysis");
  }
  if (hasRealtime) {
    categories.push("realtime");
  }
  if (hasLongContext) {
    categories.push("long-context");
  }
  if (hasReasoning) {
    categories.push("reasoning");
  }
  if (hasDataAnalysis) {
    categories.push("data-analysis");
  }

  // 计算复杂度
  const inputLength = input.length;
  const lineCount = input.split("\n").length;
  const uniqueWords = new Set(input.toLowerCase().split(/\s+/)).size;

  if (inputLength > 2000 || lineCount > 50 || uniqueWords > 300) {
    complexity = "complex";
    confidence = 0.9;
  } else if (inputLength > 500 || lineCount > 15 || uniqueWords > 100) {
    complexity = "medium";
    confidence = 0.75;
  } else {
    complexity = "simple";
    confidence = 0.6;
  }

  return {
    type,
    complexity,
    categories,
    confidence,
    multimodal,
  };
}

/**
 * 为每个模型计算匹配分数
 */
export function scoreModels(content: ContentAnalysis): ModelScore[] {
  const scores: ModelScore[] = [];

  // GPT-4: 代码、编程、复杂推理
  let gpt4Score = 50;
  if (content.categories.includes("programming")) gpt4Score += 30;
  if (content.categories.includes("reasoning")) gpt4Score += 20;
  if (content.complexity === "complex") gpt4Score += 15;
  if (content.type === "code") gpt4Score += 25;
  scores.push({
    model: "gpt-4",
    score: Math.min(gpt4Score, 100),
    reason: "Excellent for code, complex reasoning, and technical problems",
  });

  // Claude: 文本分析、长文档、学术内容
  let claudeScore = 50;
  if (content.categories.includes("text-analysis")) claudeScore += 30;
  if (content.categories.includes("long-context")) claudeScore += 25;
  if (content.complexity === "complex") claudeScore += 15;
  if (content.type === "text" && !content.multimodal) claudeScore += 20;
  scores.push({
    model: "claude",
    score: Math.min(claudeScore, 100),
    reason: "Best for text analysis, long documents, and nuanced writing",
  });

  // Grok: 实时信息、新闻、当前事件
  let grokScore = 50;
  if (content.categories.includes("realtime")) grokScore += 40;
  if (content.categories.includes("data-analysis")) grokScore += 15;
  scores.push({
    model: "grok",
    score: Math.min(grokScore, 100),
    reason: "Specialized for real-time information and current events",
  });

  // Gemini: 多模态、图片、视频、创意
  let geminiScore = 50;
  if (content.type === "image" || content.type === "video" || content.type === "mixed")
    geminiScore += 35;
  if (content.categories.includes("visual")) geminiScore += 25;
  if (content.multimodal) geminiScore += 20;
  scores.push({
    model: "gemini",
    score: Math.min(geminiScore, 100),
    reason: "Best for multimodal content, images, and creative tasks",
  });

  // Kimi: 长上下文、对话记忆、连贯性
  let kimiScore = 50;
  if (content.categories.includes("long-context")) kimiScore += 30;
  if (content.complexity === "complex") kimiScore += 15;
  if (content.categories.includes("text-analysis")) kimiScore += 15;
  scores.push({
    model: "kimi",
    score: Math.min(kimiScore, 100),
    reason: "Excellent for long context windows and conversation continuity",
  });

  // DeepSeek: 推理、问题解决、深度分析
  let deepseekScore = 50;
  if (content.categories.includes("reasoning")) deepseekScore += 30;
  if (content.complexity === "complex") deepseekScore += 20;
  if (content.categories.includes("data-analysis")) deepseekScore += 15;
  scores.push({
    model: "deepseek",
    score: Math.min(deepseekScore, 100),
    reason: "Specialized for deep reasoning and complex problem solving",
  });

  // 按分数排序
  return scores.sort((a, b) => b.score - a.score);
}

/**
 * 获取最优模型
 */
export function getOptimalModel(input: string): string {
  const analysis = analyzeContent(input);
  const scores = scoreModels(analysis);
  return scores[0].model;
}

/**
 * 获取模型建议列表（用于调试和显示）
 */
export function getModelSuggestions(input: string): ModelScore[] {
  const analysis = analyzeContent(input);
  return scoreModels(analysis);
}

/**
 * 获取内容分析结果（用于调试）
 */
export function getContentAnalysis(input: string): ContentAnalysis {
  return analyzeContent(input);
}
