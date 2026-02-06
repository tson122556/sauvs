import { describe, it, expect } from "vitest";
import { analyzeIntent, ContentModality } from "./_core/intentAnalyzer";
import { routeCapability } from "./_core/capabilityRouter";
import {
  selectImageModel,
  getAvailableImageModels,
  recommendModelByStyle,
} from "./_core/imageModelHub";
import {
  createTextResponse,
  createImageResponse,
  isResponseType,
  isErrorResponse,
} from "./_core/responseSchema";

describe("Intent & Modality Analyzer", () => {
  it("should detect IMAGE modality from explicit parameter", () => {
    const result = analyzeIntent("任意提示词", "IMAGE");
    expect(result.modality).toBe("IMAGE");
    expect(result.confidence).toBe("high");
  });

  it("should detect IMAGE modality from Chinese keywords", () => {
    const result = analyzeIntent("生成一张美丽的风景图片");
    expect(result.modality).toBe("IMAGE");
    expect(result.confidence).toMatch(/high|medium/);
  });

  it("should detect IMAGE modality from English keywords", () => {
    const result = analyzeIntent("generate an image of a sunset");
    expect(result.modality).toBe("IMAGE");
  });

  it("should detect VIDEO modality from keywords", () => {
    const result = analyzeIntent("生成一个动画视频");
    expect(result.modality).toBe("VIDEO");
  });

  it("should detect CODE modality from keywords", () => {
    const result = analyzeIntent("写一个 Python 函数");
    expect(result.modality).toBe("CODE");
  });

  it("should default to TEXT modality", () => {
    const result = analyzeIntent("你好，今天天气怎么样？");
    expect(result.modality).toBe("TEXT");
  });

  it("should prioritize explicit modality over keywords", () => {
    const result = analyzeIntent("生成图片", "TEXT");
    expect(result.modality).toBe("TEXT");
    expect(result.confidence).toBe("high");
  });
});

describe("Capability Router", () => {
  it("should route IMAGE requests to image generation", async () => {
    const request = {
      modality: "IMAGE" as ContentModality,
      prompt: "生成一张猫咪的图片",
      userId: "test-user",
      conversationId: "test-conv",
    };

    const response = await routeCapability(request);
    expect(response.type).toBe("IMAGE");
    expect(response.data.url).toBeDefined();
    expect(response.data.model).toBeDefined();
  });

  it("should route TEXT requests to LLM", async () => {
    const request = {
      modality: "TEXT" as ContentModality,
      prompt: "你好，请介绍一下自己",
      userId: "test-user",
      conversationId: "test-conv",
    };

    const response = await routeCapability(request);
    expect(response.type).toBe("TEXT");
    expect(response.data.content).toBeDefined();
    expect(typeof response.data.content).toBe("string");
  });

  it("should route CODE requests with code-specific prompt", async () => {
    const request = {
      modality: "CODE" as ContentModality,
      prompt: "写一个快速排序算法",
      userId: "test-user",
      conversationId: "test-conv",
    };

    const response = await routeCapability(request);
    expect(response.type).toBe("CODE");
    expect(response.data.content).toBeDefined();
  });

  it("should include processing time in metadata", async () => {
    const request = {
      modality: "TEXT" as ContentModality,
      prompt: "测试",
      userId: "test-user",
      conversationId: "test-conv",
    };

    const response = await routeCapability(request);
    expect(response.metadata?.processingTime).toBeGreaterThan(0);
  });
});

describe("Image Model Hub", () => {
  it("should select balanced model by default", () => {
    const model = selectImageModel("balanced");
    expect(model).toBeDefined();
    expect(model.availability).toBe("available");
  });

  it("should select quality-first model", () => {
    const model = selectImageModel("quality-first");
    expect(model.quality).toBe("high");
  });

  it("should select cost-first model", () => {
    const model = selectImageModel("cost-first");
    const allModels = getAvailableImageModels();
    const minCostModel = allModels.reduce((min, m) =>
      m.cost < min.cost ? m : min
    );
    expect(model.cost).toBeLessThanOrEqual(minCostModel.cost);
  });

  it("should select speed-first model", () => {
    const model = selectImageModel("speed-first");
    const allModels = getAvailableImageModels();
    const minLatencyModel = allModels.reduce((min, m) =>
      m.latency < min.latency ? m : min
    );
    expect(model.latency).toBeLessThanOrEqual(minLatencyModel.latency);
  });

  it("should recommend model by style", () => {
    const model = recommendModelByStyle("photorealistic");
    expect(model).toBeDefined();
    expect(model.supportedStyles).toContain("photorealistic");
  });

  it("should return available models", () => {
    const models = getAvailableImageModels();
    expect(models.length).toBeGreaterThan(0);
    models.forEach((m) => {
      expect(m.availability).toBe("available");
    });
  });
});

describe("Response Schema", () => {
  it("should create text response", () => {
    const response = createTextResponse(
      "Hello, world!",
      "gpt-4",
      "Say hello"
    );
    expect(response.type).toBe("TEXT");
    expect(response.data.content).toBe("Hello, world!");
    expect(response.data.model).toBe("gpt-4");
  });

  it("should create image response", () => {
    const response = createImageResponse(
      "https://example.com/image.jpg",
      "DALL-E-3",
      "Generate a cat"
    );
    expect(response.type).toBe("IMAGE");
    expect(response.data.url).toBe("https://example.com/image.jpg");
  });

  it("should identify response type correctly", () => {
    const textResponse = createTextResponse("test", "gpt-4", "test");
    expect(isResponseType(textResponse, "TEXT")).toBe(true);
    expect(isResponseType(textResponse, "IMAGE")).toBe(false);
  });

  it("should not identify as error response", () => {
    const response = createTextResponse("test", "gpt-4", "test");
    expect(isErrorResponse(response)).toBe(false);
  });
});

describe("Integration: Intent Analysis → Capability Router", () => {
  it("should route IMAGE keyword to image generation", async () => {
    const userMessage = "生成一张美丽的山水画";
    const intent = analyzeIntent(userMessage);

    expect(intent.modality).toBe("IMAGE");

    const request = {
      modality: intent.modality,
      prompt: userMessage,
      userId: "test-user",
      conversationId: "test-conv",
    };

    const response = await routeCapability(request);
    expect(response.type).toBe("IMAGE");
    expect(response.data.url).toBeDefined();
  });

  it("should route CODE keyword to code generation", async () => {
    const userMessage = "写一个二分查找函数";
    const intent = analyzeIntent(userMessage);

    expect(intent.modality).toBe("CODE");

    const request = {
      modality: intent.modality,
      prompt: userMessage,
      userId: "test-user",
      conversationId: "test-conv",
    };

    const response = await routeCapability(request);
    expect(response.type).toBe("CODE");
    expect(response.data.content).toBeDefined();
  });

  it("should respect explicit modality override", async () => {
    const userMessage = "生成图片";
    const intent = analyzeIntent(userMessage, "TEXT");

    expect(intent.modality).toBe("TEXT");
    expect(intent.confidence).toBe("high");

    const request = {
      modality: intent.modality,
      prompt: userMessage,
      userId: "test-user",
      conversationId: "test-conv",
    };

    const response = await routeCapability(request);
    expect(response.type).toBe("TEXT");
  });
});
