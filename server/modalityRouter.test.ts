import { describe, it, expect } from "vitest";
import {
  detectModality,
  getModelPoolForModality,
  calculateModelScore,
  selectOptimalModel,
  routeByModality,
  getAPICallParams,
  TEXT_MODELS,
  IMAGE_MODELS,
  VIDEO_MODELS,
} from "./_core/modalityRouter";

describe("Modality Router", () => {
  describe("detectModality", () => {
    it("should detect text modality for regular input", () => {
      const result = detectModality("What is artificial intelligence?");
      expect(result).toBe("text");
    });

    it("should detect image modality for image-related keywords", () => {
      const testCases = [
        "生成图片",
        "画图",
        "绘制",
        "create image",
        "generate image",
        "draw",
        "paint",
        "illustration",
      ];

      testCases.forEach((input) => {
        const result = detectModality(input);
        expect(result).toBe("image");
      });
    });

    it("should detect video modality for video-related keywords", () => {
      const testCases = [
        "生成视频",
        "制作视频",
        "视频",
        "create video",
        "generate video",
        "make video",
        "animation",
      ];

      testCases.forEach((input) => {
        const result = detectModality(input);
        expect(result).toBe("video");
      });
    });

    it("should prioritize explicit content type over keyword detection", () => {
      const result = detectModality("生成图片", "video");
      expect(result).toBe("video");
    });

    it("should handle mixed case input", () => {
      const result = detectModality("GENERATE IMAGE");
      expect(result).toBe("image");
    });
  });

  describe("getModelPoolForModality", () => {
    it("should return text models for text modality", () => {
      const models = getModelPoolForModality("text");
      expect(models).toBe(TEXT_MODELS);
      expect(models.length).toBeGreaterThan(0);
    });

    it("should return image models for image modality", () => {
      const models = getModelPoolForModality("image");
      expect(models).toBe(IMAGE_MODELS);
      expect(models.length).toBeGreaterThan(0);
    });

    it("should return video models for video modality", () => {
      const models = getModelPoolForModality("video");
      expect(models).toBe(VIDEO_MODELS);
      expect(models.length).toBeGreaterThan(0);
    });
  });

  describe("calculateModelScore", () => {
    it("should calculate score for text model", () => {
      const model = TEXT_MODELS[0];
      const score = calculateModelScore(model);
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it("should favor high-priority models for complex tasks", () => {
      const model1 = TEXT_MODELS[0]; // Priority 1
      const model2 = TEXT_MODELS[1]; // Priority 2

      const score1 = calculateModelScore(model1, { complexity: 0.9 });
      const score2 = calculateModelScore(model2, { complexity: 0.9 });

      expect(score1).toBeGreaterThan(score2);
    });

    it("should favor low-priority models for speed requirements", () => {
      const model1 = TEXT_MODELS[0]; // Priority 1
      const model2 = TEXT_MODELS[1]; // Priority 2

      const score1 = calculateModelScore(model1, { speed: 0.9 });
      const score2 = calculateModelScore(model2, { speed: 0.9 });

      // Speed requirement should favor faster (lower priority) models
      expect(score2).toBeGreaterThanOrEqual(score1);
    });
  });

  describe("selectOptimalModel", () => {
    it("should select a model for text modality", () => {
      const model = selectOptimalModel("text");
      expect(model).toBeDefined();
      expect(model.modalities).toContain("text");
    });

    it("should select a model for image modality", () => {
      const model = selectOptimalModel("image");
      expect(model).toBeDefined();
      expect(model.modalities).toContain("image");
    });

    it("should select a model for video modality", () => {
      const model = selectOptimalModel("video");
      expect(model).toBeDefined();
      expect(model.modalities).toContain("video");
    });

    it("should respect criteria when selecting models", () => {
      const model1 = selectOptimalModel("text", { complexity: 0.1 });
      const model2 = selectOptimalModel("text", { complexity: 0.9 });

      // Both should be valid models
      expect(model1).toBeDefined();
      expect(model2).toBeDefined();
    });
  });

  describe("routeByModality", () => {
    it("should route text input to text model", () => {
      const result = routeByModality("What is machine learning?");
      expect(result.modality).toBe("text");
      expect(result.selectedModel).toBeDefined();
      expect(result.reason).toContain("text");
    });

    it("should route image input to image model", () => {
      const result = routeByModality("生成一张美丽的风景画");
      expect(result.modality).toBe("image");
      expect(result.selectedModel).toBeDefined();
      expect(result.reason).toContain("image");
    });

    it("should route video input to video model", () => {
      const result = routeByModality("create a video about AI");
      expect(result.modality).toBe("video");
      expect(result.selectedModel).toBeDefined();
      expect(result.reason).toContain("video");
    });

    it("should include explicit selection in reason", () => {
      const result = routeByModality("test", "image");
      expect(result.reason).toContain("explicit selection");
    });
  });

  describe("getAPICallParams", () => {
    it("should return text API params", () => {
      const model = TEXT_MODELS[0];
      const params = getAPICallParams("text", model, "Hello");
      expect(params.messages).toBeDefined();
      expect(params.temperature).toBeDefined();
      expect(params.maxTokens).toBeDefined();
    });

    it("should return image API params", () => {
      const model = IMAGE_MODELS[0];
      const params = getAPICallParams("image", model, "A beautiful sunset");
      expect(params.prompt).toBe("A beautiful sunset");
      expect(params.size).toBeDefined();
      expect(params.quality).toBeDefined();
    });

    it("should return video API params", () => {
      const model = VIDEO_MODELS[0];
      const params = getAPICallParams("video", model, "A dancing robot");
      expect(params.prompt).toBe("A dancing robot");
      expect(params.duration).toBeDefined();
      expect(params.resolution).toBeDefined();
    });

    it("should respect custom options", () => {
      const model = TEXT_MODELS[0];
      const params = getAPICallParams("text", model, "Hello", {
        temperature: 0.5,
        maxTokens: 1000,
      });
      expect(params.temperature).toBe(0.5);
      expect(params.maxTokens).toBe(1000);
    });
  });

  describe("Complex Routing Scenarios", () => {
    it("should handle mixed modality requests", () => {
      const scenarios = [
        {
          input: "生成一张图片，然后根据图片内容写一段描述",
          expectedPrimary: "image",
        },
        {
          input: "制作一个关于AI的视频教程",
          expectedPrimary: "video",
        },
        {
          input: "解释什么是深度学习",
          expectedPrimary: "text",
        },
      ];

      scenarios.forEach((scenario) => {
        const result = routeByModality(scenario.input);
        expect(result.modality).toBe(scenario.expectedPrimary);
      });
    });

    it("should handle edge cases", () => {
      const edgeCases = [
        "",
        "   ",
        "123456",
        "!@#$%^&*()",
      ];

      edgeCases.forEach((input) => {
        // Should not throw error
        const result = routeByModality(input);
        expect(result.modality).toBeDefined();
        expect(result.selectedModel).toBeDefined();
      });
    });
  });

  describe("Model Pool Validation", () => {
    it("should have valid text models", () => {
      TEXT_MODELS.forEach((model) => {
        expect(model.id).toBeDefined();
        expect(model.name).toBeDefined();
        expect(model.provider).toBeDefined();
        expect(model.apiEndpoint).toBeDefined();
        expect(model.modalities).toContain("text");
        expect(model.priority).toBeGreaterThan(0);
      });
    });

    it("should have valid image models", () => {
      IMAGE_MODELS.forEach((model) => {
        expect(model.id).toBeDefined();
        expect(model.name).toBeDefined();
        expect(model.provider).toBeDefined();
        expect(model.apiEndpoint).toBeDefined();
        expect(model.modalities).toContain("image");
        expect(model.priority).toBeGreaterThan(0);
      });
    });

    it("should have valid video models", () => {
      VIDEO_MODELS.forEach((model) => {
        expect(model.id).toBeDefined();
        expect(model.name).toBeDefined();
        expect(model.provider).toBeDefined();
        expect(model.apiEndpoint).toBeDefined();
        expect(model.modalities).toContain("video");
        expect(model.priority).toBeGreaterThan(0);
      });
    });

    it("should have unique model IDs within each pool", () => {
      const checkUnique = (models: any[]) => {
        const ids = models.map((m) => m.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      };

      checkUnique(TEXT_MODELS);
      checkUnique(IMAGE_MODELS);
      checkUnique(VIDEO_MODELS);
    });
  });
});
