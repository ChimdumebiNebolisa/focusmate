/**
 * Chrome AI API Test Demo (TypeScript)
 * Tests the new self.ai.languageModel API
 * 
 * As of September 2025, window.ai has been deprecated in Chrome.
 * The official replacement is LanguageModel, accessible via self.ai.languageModel.
 */

interface AILanguageModel {
  prompt(input: string, options?: { systemPrompt?: string }): Promise<string>;
  promptStreaming?(input: string, options?: { systemPrompt?: string }): ReadableStream;
  destroy?(): void;
}

interface AILanguageModelFactory {
  capabilities(): Promise<{
    available: 'readily' | 'after-download' | 'no';
  }>;
  create(options?: {
    systemPrompt?: string;
    temperature?: number;
    topK?: number;
  }): Promise<AILanguageModel>;
}

interface ChromeAI {
  languageModel?: AILanguageModelFactory;
}

declare global {
  const ai: ChromeAI | undefined;
}

export async function testChromeAI(): Promise<void> {
  // Feature detection for Chrome Built-in AI APIs
  if (!self.ai?.languageModel) {
    console.log("❌ LanguageModel API not supported in this browser.");
    console.log("💡 Try Chrome Canary or Beta (version ≥ 128) where the LanguageModel API is active.");
    return;
  }

  console.log("✅ LanguageModel API detected! Testing...");

  try {
    // Create a session using the new API syntax
    const session = await self.ai.languageModel.create({
      systemPrompt: "You are a helpful AI assistant that provides clear, concise responses."
    });

    // Test the prompt functionality
    const result = await session.prompt("Summarize: AI replaces window.ai in Chrome's new built-in AI API.");
    
    console.log("🎉 Test successful!");
    console.log("📝 Result:", result);
    
    // Test with different prompt
    const result2 = await session.prompt("Explain the difference between window.ai and self.ai.languageModel in one sentence.");
    console.log("📝 Second test result:", result2);

    // Test capabilities
    const capabilities = await self.ai.languageModel.capabilities();
    console.log("🔧 API Capabilities:", capabilities);

  } catch (error) {
    console.error("❌ Test failed:", error);
    console.log("💡 Make sure you're using Chrome Canary/Beta with AI flags enabled:");
    console.log("   - Go to chrome://flags");
    console.log("   - Enable 'Prompt API for Gemini Nano'");
    console.log("   - Restart Chrome");
  }
}

// Auto-run if in browser environment
if (typeof window !== 'undefined') {
  console.log("🚀 Starting Chrome AI API test...");
  testChromeAI();
}
