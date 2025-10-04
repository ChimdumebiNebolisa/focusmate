/**
 * Chrome AI Integration Utilities
 * Integrates with Chrome's on-device AI APIs for text processing
 */

import { checkChromeAI, safeChromeAICall } from './checkAI';

/**
 * Summarizes the input text using Chrome AI
 */
export async function summarizeText(input: string): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to summarize.";
  }

  return safeChromeAICall(
    async () => {
      const summarizer = await window.ai!.summarizer!.create();
      const result = await summarizer.run({ text: input });
      
      if (!result?.result) {
        return "No summary generated. Please try again with different text.";
      }
      
      return result.result;
    },
    "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform"
  );
}

/**
 * Rewrites the input text using Chrome AI
 */
export async function rewriteText(input: string): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to clean and rewrite.";
  }

  return safeChromeAICall(
    async () => {
      const rewriter = await window.ai!.rewriter!.create();
      const result = await rewriter.run({ 
        text: input, 
        context: "Simplify and clarify this text while maintaining its meaning. Make it more readable and professional." 
      });
      
      if (!result?.result) {
        return "No rewritten text generated. Please try again with different text.";
      }
      
      return result.result;
    },
    "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform"
  );
}

/**
 * Extracts tasks from the input text using Chrome AI
 */
export async function extractTasks(input: string): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to extract tasks from.";
  }

  return safeChromeAICall(
    async () => {
      const prompt = await window.ai!.prompt!.create();
      const result = await prompt.run({ 
        prompt: `Extract actionable tasks from the following text. Format them as a numbered list with clear, specific actions:\n\n${input}\n\nIf no tasks are found, respond with "No actionable tasks identified."` 
      });
      
      if (!result?.result) {
        return "No tasks extracted. Please try again with different text.";
      }
      
      return result.result;
    },
    "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform"
  );
}

/**
 * Translates the input text using Chrome AI
 */
export async function translateText(input: string, targetLang: string = "en", mode: string = "academic"): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to translate.";
  }

  return safeChromeAICall(
    async () => {
      // Create context based on translation mode
      const modeContexts = {
        academic: "Translate this text in an academic, formal style suitable for scholarly writing.",
        concise: "Translate this text in a concise, clear manner while preserving key information.",
        creative: "Translate this text with creative flair, maintaining the original's artistic expression.",
        conversational: "Translate this text in a natural, conversational tone as if speaking to a friend."
      };

      const context = modeContexts[mode as keyof typeof modeContexts] || modeContexts.academic;

      const translator = await window.ai!.translator!.create();
      const result = await translator.run({ 
        text: `${context}\n\nText to translate: ${input}`, 
        targetLanguage: targetLang 
      });
      
      if (!result?.result) {
        return "No translation generated. Please try again with different text.";
      }
      
      return result.result;
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
    return "✅ Chrome AI features are available and ready to use!\n\n🎯 All AI functions are working:\n• Text summarization\n• Text rewriting\n• Task extraction\n• Translation";
  } else if (isChrome) {
    return "⚠️ Chrome detected but AI features not available.\n\n🔧 To enable Chrome AI:\n• Update to latest Chrome version\n• Enable AI features in Chrome settings\n• Check if your device supports AI features\n• Try refreshing the page";
  } else {
    return "🌐 Chrome AI features require Chrome browser.\n\n📋 Current browser: " + 
           (userAgent.includes('Firefox') ? 'Firefox' :
            userAgent.includes('Safari') ? 'Safari' :
            userAgent.includes('Edg') ? 'Edge' : 'Unknown') +
           "\n\n🔄 Please switch to Chrome for full AI functionality.\n\n💡 Voice input will still work in your current browser.";
  }
}
