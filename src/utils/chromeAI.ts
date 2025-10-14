/**
 * Chrome AI Integration Utilities
 * Integrates with Chrome's on-device AI APIs for text processing
 * Updated to use the new Chrome Built-in AI APIs (non-deprecated)
 */

import { checkChromeAI, safeChromeAICall } from './checkAI';

/**
 * Helper to get the Chrome AI object
 * Accesses the global 'ai' object (NOT window.ai - that's deprecated)
 */
function getChromeAI() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (typeof ai !== 'undefined' ? ai : (self as any).ai);
}

/**
 * Summarizes the input text using Chrome AI
 */
export async function summarizeText(input: string): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to summarize.";
  }

  return safeChromeAICall(
    async () => {
      const chromeAI = getChromeAI();
      if (!chromeAI?.summarizer) {
        throw new Error('Summarizer API not available');
      }
      
      const summarizer = await chromeAI.summarizer.create({
        type: 'key-points',
        format: 'plain-text',
        length: 'medium'
      });
      
      const result = await summarizer.summarize(input);
      
      if (!result) {
        return "No summary generated. Please try again with different text.";
      }
      
      return result;
    },
    "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform"
  );
}

/**
 * Rewrites the input text using Chrome AI Writer API
 */
export async function rewriteText(input: string): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to clean and rewrite.";
  }

  return safeChromeAICall(
    async () => {
      const chromeAI = getChromeAI();
      if (!chromeAI?.writer) {
        throw new Error('Writer API not available');
      }
      
      const writer = await chromeAI.writer.create({
        tone: 'neutral',
        format: 'plain-text',
        length: 'medium'
      });
      
      const result = await writer.write(input, { 
        context: "Simplify and clarify this text while maintaining its meaning. Make it more readable and professional." 
      });
      
      if (!result) {
        return "No rewritten text generated. Please try again with different text.";
      }
      
      return result;
    },
    "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform"
  );
}

/**
 * Extracts tasks from the input text using Chrome AI Language Model
 */
export async function extractTasks(input: string): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to extract tasks from.";
  }

  return safeChromeAICall(
    async () => {
      const chromeAI = getChromeAI();
      if (!chromeAI?.languageModel) {
        throw new Error('Language Model API not available');
      }
      
      const languageModel = await chromeAI.languageModel.create({
        systemPrompt: 'You are a helpful assistant that extracts actionable tasks from text and formats them clearly.'
      });
      
      const result = await languageModel.prompt(
        `Extract actionable tasks from the following text. Format them as a numbered list with clear, specific actions:\n\n${input}\n\nIf no tasks are found, respond with "No actionable tasks identified."`
      );
      
      if (!result) {
        return "No tasks extracted. Please try again with different text.";
      }
      
      return result;
    },
    "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform"
  );
}

/**
 * Translates the input text using Chrome AI Translator API
 */
export async function translateText(input: string, targetLang: string = "en", mode: string = "academic"): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to translate.";
  }

  return safeChromeAICall(
    async () => {
      const chromeAI = getChromeAI();
      if (!chromeAI?.translator) {
        throw new Error('Translator API not available');
      }
      
      // Create context based on translation mode
      const modeContexts = {
        academic: "Translate this text in an academic, formal style suitable for scholarly writing.",
        concise: "Translate this text in a concise, clear manner while preserving key information.",
        creative: "Translate this text with creative flair, maintaining the original's artistic expression.",
        conversational: "Translate this text in a natural, conversational tone as if speaking to a friend."
      };

      const context = modeContexts[mode as keyof typeof modeContexts] || modeContexts.academic;
      
      // For the new API, we might need to detect the source language or assume 'auto'
      // The exact API for translator might vary, so using a basic approach here
      const translator = await chromeAI.translator.create({
        sourceLanguage: 'en', // You may want to add language detection or make this a parameter
        targetLanguage: targetLang
      });
      
      // Add mode context as a prefix to give guidance
      const textWithContext = `${context}\n\n${input}`;
      const result = await translator.translate(textWithContext);
      
      if (!result) {
        return "No translation generated. Please try again with different text.";
      }
      
      return result;
    },
    "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform"
  );
}

/**
 * Check if Chrome AI APIs are available
 */
export function isChromeAIAvailable(): boolean {
  return checkChromeAI();
}

/**
 * Get browser compatibility info
 */
export function getBrowserInfo(): string {
  const userAgent = navigator.userAgent;
  const isChrome = userAgent.includes('Chrome') && !userAgent.includes('Edg');
  const isSupported = checkChromeAI();
  
  if (isSupported) {
    return "✅ Chrome Built-in AI features are available and ready to use!\n\n🎯 All AI functions are working:\n• Text summarization (Summarization API)\n• Text rewriting (Writer API)\n• Task extraction (Language Model API)\n• Translation (Translator API)";
  } else if (isChrome) {
    return "⚠️ Chrome detected but Built-in AI features not available.\n\n🔧 To enable Chrome Built-in AI:\n• Update to latest Chrome Dev or Canary version\n• Enable AI features in chrome://flags\n• Check if your device supports AI features\n• Try refreshing the page";
  } else {
    return "🌐 Chrome Built-in AI features require Chrome browser.\n\n📋 Current browser: " + 
           (userAgent.includes('Firefox') ? 'Firefox' :
            userAgent.includes('Safari') ? 'Safari' :
            userAgent.includes('Edg') ? 'Edge' : 'Unknown') +
           "\n\n🔄 Please switch to Chrome Dev or Canary for full AI functionality.\n\n💡 Voice input will still work in your current browser.";
  }
}
