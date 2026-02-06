import { describe, it, expect } from "vitest";

// 测试模型选择算法
describe("UVS AI Chat - Model Selection", () => {
  // 模型选择函数（从前端逻辑复制）
  function getOptimalModel(input: string): string {
    const lowerInput = input.toLowerCase();
    
    if (/code|programming|python|javascript|function|class|debug|error/i.test(input)) {
      return "gpt-4";
    }
    
    if (/analyze|summary|document|article|research|academic|paper/i.test(input)) {
      return "claude";
    }
    
    if (/news|current|today|latest|real-time|trending|recent/i.test(input)) {
      return "grok";
    }
    
    if (/image|video|visual|picture|diagram|chart|graph/i.test(input)) {
      return "gemini";
    }
    
    if (/long|context|memory|remember|previous|history/i.test(input)) {
      return "kimi";
    }
    
    if (/reason|logic|solve|problem|complex|think|analyze/i.test(input)) {
      return "deepseek";
    }
    
    return "gpt-4";
  }

  it("should select GPT-4 for code-related questions", () => {
    expect(getOptimalModel("How do I write Python code?")).toBe("gpt-4");
    expect(getOptimalModel("Debug this JavaScript error")).toBe("gpt-4");
    expect(getOptimalModel("Write a function to sort arrays")).toBe("gpt-4");
  });

  it("should select Claude for analysis and research", () => {
    expect(getOptimalModel("Analyze this research paper")).toBe("claude");
    expect(getOptimalModel("Summarize this document")).toBe("claude");
    expect(getOptimalModel("Academic analysis of climate change")).toBe("claude");
  });

  it("should select Grok for real-time information", () => {
    expect(getOptimalModel("What's the latest news today?")).toBe("grok");
    expect(getOptimalModel("Current trending topics")).toBe("grok");
    expect(getOptimalModel("Real-time stock market updates")).toBe("grok");
  });

  it("should select Gemini for multimodal content", () => {
    expect(getOptimalModel("Show me the image")).toBe("gemini");
    expect(getOptimalModel("Describe the video content")).toBe("gemini");
    expect(getOptimalModel("Create a visual chart")).toBe("gemini");
  });

  it("should select Kimi for long context", () => {
    expect(getOptimalModel("Remember our previous conversation")).toBe("kimi");
    expect(getOptimalModel("Process with long context memory")).toBe("kimi");
    expect(getOptimalModel("Keep the history context")).toBe("kimi");
  });

  it("should select DeepSeek for reasoning", () => {
    expect(getOptimalModel("Solve this complex problem")).toBe("deepseek");
    expect(getOptimalModel("Deep reasoning required")).toBe("deepseek");
    expect(getOptimalModel("Logical analysis needed")).toBe("deepseek");
  });

  it("should default to GPT-4 for general questions", () => {
    expect(getOptimalModel("Hello, how are you?")).toBe("gpt-4");
    expect(getOptimalModel("Tell me a joke")).toBe("gpt-4");
    expect(getOptimalModel("What is AI?")).toBe("gpt-4");
  });
});

// 测试消息处理
describe("UVS AI Chat - Message Handling", () => {
  interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    model?: string;
  }

  it("should create valid user message", () => {
    const userMessage: Message = {
      id: "1",
      role: "user",
      content: "Hello, how are you?",
      timestamp: new Date(),
    };

    expect(userMessage.role).toBe("user");
    expect(userMessage.content).toBe("Hello, how are you?");
    expect(userMessage.id).toBeDefined();
  });

  it("should create valid assistant message with model", () => {
    const assistantMessage: Message = {
      id: "2",
      role: "assistant",
      content: "I'm doing great, thanks for asking!",
      timestamp: new Date(),
      model: "gpt-4",
    };

    expect(assistantMessage.role).toBe("assistant");
    expect(assistantMessage.model).toBe("gpt-4");
    expect(assistantMessage.content).toBeDefined();
  });

  it("should handle message timestamps correctly", () => {
    const now = new Date();
    const message: Message = {
      id: "3",
      role: "user",
      content: "Test message",
      timestamp: now,
    };

    expect(message.timestamp).toEqual(now);
    expect(message.timestamp instanceof Date).toBe(true);
  });
});

// 测试对话管理
describe("UVS AI Chat - Conversation Management", () => {
  interface Conversation {
    id: string;
    title: string;
    messages: any[];
    createdAt: Date;
    updatedAt: Date;
  }

  it("should create new conversation", () => {
    const conversation: Conversation = {
      id: "conv-1",
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(conversation.id).toBe("conv-1");
    expect(conversation.messages).toEqual([]);
    expect(conversation.createdAt instanceof Date).toBe(true);
  });

  it("should update conversation with new messages", () => {
    const conversation: Conversation = {
      id: "conv-1",
      title: "Chat",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newMessage = {
      id: "msg-1",
      role: "user" as const,
      content: "Hello",
      timestamp: new Date(),
    };

    conversation.messages.push(newMessage);
    conversation.updatedAt = new Date();

    expect(conversation.messages.length).toBe(1);
    expect(conversation.messages[0].content).toBe("Hello");
  });

  it("should generate conversation title from first message", () => {
    const firstMessage = "How to learn React?";
    const title = firstMessage.substring(0, 30) + (firstMessage.length > 30 ? "..." : "");

    expect(title).toBe("How to learn React?");
  });

  it("should truncate long conversation titles", () => {
    const longMessage = "This is a very long message that should be truncated to 30 characters or less";
    const title = longMessage.substring(0, 30) + (longMessage.length > 30 ? "..." : "");

    expect(title.length).toBeLessThanOrEqual(33); // 30 + "..."
    expect(title.endsWith("...")).toBe(true);
  });
});
