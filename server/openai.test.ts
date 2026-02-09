import { describe, it, expect } from "vitest";
import OpenAI from "openai";

describe("OpenAI API Key Validation", () => {
  it("should validate ChatGPT API key by making a test request", async () => {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }

    const client = new OpenAI({ apiKey });

    // Make a simple test request to verify the API key is valid
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'API key is valid' and nothing else",
        },
      ],
      max_tokens: 10,
    });

    expect(response).toBeDefined();
    expect(response.choices).toBeDefined();
    expect(response.choices.length).toBeGreaterThan(0);
    expect(response.choices[0].message.content).toBeDefined();
    
    console.log("✅ ChatGPT API key is valid!");
    console.log("Response:", response.choices[0].message.content);
  });
});
