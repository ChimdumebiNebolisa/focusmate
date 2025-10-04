/**
 * Chrome AI Integration Utilities
 * Integrates with Chrome's on-device AI APIs for text processing
 */

// Type declarations for Chrome AI API
declare global {
  interface Window {
    ai?: {
      summarizer?: {
        create(): Promise<{
          run(input: { text: string }): Promise<{ result: string }>;
        }>;
      };
      rewriter?: {
        create(): Promise<{
          run(input: { text: string; context?: string }): Promise<{ result: string }>;
        }>;
      };
      prompt?: {
        create(): Promise<{
          run(input: { prompt: string }): Promise<{ result: string }>;
        }>;
      };
      translator?: {
        create(): Promise<{
          run(input: { text: string; targetLanguage: string }): Promise<{ result: string }>;
        }>;
      };
    };
  }
}

/**
 * Summarizes the input text using Chrome AI
 */
export async function summarizeText(input: string): Promise<string> {
  try {
    if (!window.ai?.summarizer) {
      return "Chrome AI API not supported on this browser. Please use Chrome with AI features enabled.";
    }

    const summarizer = await window.ai.summarizer.create();
    const result = await summarizer.run({ text: input });
    return result.result;
  } catch (error) {
    console.error('Summarizer error:', error);
    return "Error: Failed to summarize text. Please try again or check your browser compatibility.";
  }
}

/**
 * Rewrites the input text using Chrome AI
 */
export async function rewriteText(input: string): Promise<string> {
  try {
    if (!window.ai?.rewriter) {
      return "Chrome AI API not supported on this browser. Please use Chrome with AI features enabled.";
    }

    const rewriter = await window.ai.rewriter.create();
    const result = await rewriter.run({ 
      text: input, 
      context: "Simplify and clarify this text while maintaining its meaning" 
    });
    return result.result;
  } catch (error) {
    console.error('Rewriter error:', error);
    return "Error: Failed to rewrite text. Please try again or check your browser compatibility.";
  }
}

/**
 * Extracts tasks from the input text using Chrome AI
 */
export async function extractTasks(input: string): Promise<string> {
  try {
    if (!window.ai?.prompt) {
      return "Chrome AI API not supported on this browser. Please use Chrome with AI features enabled.";
    }

    const prompt = await window.ai.prompt.create();
    const result = await prompt.run({ 
      prompt: `Extract actionable tasks from the following text. Format them as a numbered list:\n\n${input}` 
    });
    return result.result;
  } catch (error) {
    console.error('Task extraction error:', error);
    return "Error: Failed to extract tasks. Please try again or check your browser compatibility.";
  }
}

/**
 * Translates the input text using Chrome AI
 */
export async function translateText(input: string, targetLang: string = "en"): Promise<string> {
  try {
    if (!window.ai?.translator) {
      return "Chrome AI API not supported on this browser. Please use Chrome with AI features enabled.";
    }

    const translator = await window.ai.translator.create();
    const result = await translator.run({ 
      text: input, 
      targetLanguage: targetLang 
    });
    return result.result;
  } catch (error) {
    console.error('Translator error:', error);
    return "Error: Failed to translate text. Please try again or check your browser compatibility.";
  }
}

/**
 * Check if Chrome AI APIs are available
 */
export function isChromeAIAvailable(): boolean {
  return !!(
    window.ai?.summarizer && 
    window.ai?.rewriter && 
    window.ai?.prompt && 
    window.ai?.translator
  );
}

/**
 * Get browser compatibility info
 */
export function getBrowserInfo(): string {
  const userAgent = navigator.userAgent;
  const isChrome = userAgent.includes('Chrome') && !userAgent.includes('Edg');
  const isSupported = isChromeAIAvailable();
  
  if (isSupported) {
    return "Chrome AI features are available and ready to use!";
  } else if (isChrome) {
    return "Chrome detected but AI features may not be enabled. Please check Chrome settings.";
  } else {
    return "Chrome AI features require Chrome browser. Please switch to Chrome for full functionality.";
  }
}
