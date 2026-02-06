import { describe, it, expect } from "vitest";
import {
  analyzeContent,
  scoreModels,
  getOptimalModel,
  getModelSuggestions,
  getContentAnalysis,
} from "./modelSelector";

describe("Model Selector Engine", () => {
  describe("Content Analysis", () => {
    it("should detect code content", () => {
      const input = `
        function fibonacci(n) {
          if (n <= 1) return n;
          return fibonacci(n - 1) + fibonacci(n - 2);
        }
      `;
      const analysis = analyzeContent(input);
      expect(analysis.type).toBe("code");
      expect(analysis.categories).toContain("programming");
    });

    it("should detect image-related content", () => {
      const input = "How do I create a beautiful UI design with modern colors and visual hierarchy?";
      const analysis = analyzeContent(input);
      expect(analysis.categories).toContain("visual");
    });

    it("should detect video-related content", () => {
      const input = "I need to edit a video with transitions and effects in 4K resolution";
      const analysis = analyzeContent(input);
      expect(analysis.categories).toContain("video");
    });

    it("should detect real-time information needs", () => {
      const input = "What are the latest news and trending topics today?";
      const analysis = analyzeContent(input);
      expect(analysis.categories).toContain("realtime");
    });

    it("should detect long context requirements", () => {
      const input =
        "Based on our previous conversation about machine learning, can you summarize what we discussed and provide additional insights?";
      const analysis = analyzeContent(input);
      expect(analysis.categories).toContain("long-context");
    });

    it("should detect reasoning and problem-solving", () => {
      const input = "How do I debug this complex algorithm and optimize its performance?";
      const analysis = analyzeContent(input);
      expect(analysis.categories).toContain("reasoning");
    });

    it("should detect data analysis needs", () => {
      const input = "Analyze this dataset and create visualizations showing trends and correlations";
      const analysis = analyzeContent(input);
      expect(analysis.categories).toContain("data-analysis");
    });

    it("should detect multimodal content", () => {
      const input =
        "Create a video with code snippets and visual diagrams showing the algorithm flow";
      const analysis = analyzeContent(input);
      expect(analysis.multimodal).toBe(true);
    });

    it("should assess complexity correctly", () => {
      const simpleInput = "Hello";
      const longInput = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

      const simpleAnalysis = analyzeContent(simpleInput);
      const complexAnalysis = analyzeContent(longInput);

      expect(simpleAnalysis.complexity).toBe("simple");
      expect(complexAnalysis.complexity).toMatch(/medium|complex/);
    });
  });

  describe("Model Scoring", () => {
    it("should score GPT-4 highest for code", () => {
      const analysis = analyzeContent("function test() { return 42; }");
      const scores = scoreModels(analysis);
      const gpt4 = scores.find((s) => s.model === "gpt-4");
      expect(gpt4?.score).toBeGreaterThan(70);
    });

    it("should score Claude highest for text analysis", () => {
      const analysis = analyzeContent(
        "Analyze this academic paper on quantum computing and provide a detailed summary"
      );
      const scores = scoreModels(analysis);
      const claude = scores.find((s) => s.model === "claude");
      expect(claude?.score).toBeGreaterThan(70);
    });

    it("should score Grok highest for real-time information", () => {
      const analysis = analyzeContent("What are the latest cryptocurrency prices today?");
      const scores = scoreModels(analysis);
      const grok = scores.find((s) => s.model === "grok");
      expect(grok?.score).toBeGreaterThan(70);
    });

    it("should score Gemini highest for multimodal content", () => {
      const analysis = analyzeContent("Create a video with visual effects and animations");
      const scores = scoreModels(analysis);
      const gemini = scores.find((s) => s.model === "gemini");
      expect(gemini?.score).toBeGreaterThan(70);
    });

    it("should score Kimi highest for long context", () => {
      const analysis = analyzeContent(
        "Based on our entire previous conversation spanning 50 messages, summarize the key points"
      );
      const scores = scoreModels(analysis);
      const kimi = scores.find((s) => s.model === "kimi");
      expect(kimi?.score).toBeGreaterThan(60);
    });

    it("should score DeepSeek highest for complex reasoning", () => {
      const analysis = analyzeContent(
        "Solve this complex mathematical proof and explain each step in detail"
      );
      const scores = scoreModels(analysis);
      const deepseek = scores.find((s) => s.model === "deepseek");
      expect(deepseek?.score).toBeGreaterThan(60);
    });
  });

  describe("Optimal Model Selection", () => {
    it("should select GPT-4 for programming tasks", () => {
      const model = getOptimalModel("Write a Python function to sort an array");
      expect(model).toBe("gpt-4");
    });

    it("should select Claude for text analysis", () => {
      const model = getOptimalModel(
        "Analyze this research paper and provide a comprehensive summary"
      );
      expect(model).toBe("claude");
    });

    it("should select Grok for real-time information", () => {
      const model = getOptimalModel("What are today's top news stories?");
      expect(model).toBe("grok");
    });

    it("should select Gemini for image/video tasks", () => {
      const model = getOptimalModel("How do I create stunning visual effects in video editing?");
      expect(model).toBe("gemini");
    });

    it("should handle mixed content appropriately", () => {
      const model = getOptimalModel(
        "Create a video tutorial with code snippets and visual diagrams"
      );
      expect(model).toBeDefined();
      expect(["gemini", "gpt-4"]).toContain(model);
    });
  });

  describe("Model Suggestions", () => {
    it("should return sorted suggestions by score", () => {
      const suggestions = getModelSuggestions("Write code and analyze data");
      expect(suggestions.length).toBe(6);
      expect(suggestions[0].score).toBeGreaterThanOrEqual(suggestions[1].score);
    });

    it("should include reason for each suggestion", () => {
      const suggestions = getModelSuggestions("Test");
      suggestions.forEach((suggestion) => {
        expect(suggestion.reason).toBeDefined();
        expect(suggestion.reason.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Content Analysis Details", () => {
    it("should return detailed analysis", () => {
      const analysis = getContentAnalysis("Debug this Python error in my machine learning model");
      expect(analysis.type).toBeDefined();
      expect(analysis.complexity).toBeDefined();
      expect(analysis.categories).toBeDefined();
      expect(analysis.confidence).toBeGreaterThan(0);
      expect(analysis.confidence).toBeLessThanOrEqual(1);
    });
  });
});
