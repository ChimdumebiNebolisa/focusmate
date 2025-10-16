/**
 * Chrome AI Integration Utilities
 * Integrates with Chrome's on-device AI APIs for text processing
 * Updated to use the new Chrome Built-in AI APIs (non-deprecated)
 * 
 * As of September 2025, window.ai has been deprecated in Chrome.
 * The official replacement is LanguageModel, accessible via self.ai.languageModel.
 */

import { checkChromeAI, safeChromeAICall } from './checkAI';

/**
 * Helper to get the Chrome AI object
 * Accesses self.ai (the Chrome Built-in AI APIs)
 * As of September 2025, window.ai has been deprecated in Chrome. 
 * The official replacement is LanguageModel, accessible via self.ai.languageModel.
 */
function getChromeAI() {
  // Feature detection for Chrome Built-in AI APIs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chromeAI = (self as any).ai;
  
  if (!chromeAI?.languageModel) {
    console.warn("LanguageModel API not supported in this browser.");
    return undefined;
  }
  
  return chromeAI;
}

/**
 * Summarizes the input text using Chrome AI
 */
export async function summarizeText(input: string, mode: string = 'academic'): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to summarize.";
  }

  return safeChromeAICall(
    async () => {
      const chromeAI = getChromeAI();
      if (!chromeAI?.summarizer) {
        throw new Error('Summarizer API not available');
      }
      
      // Create context based on processing mode
      const modeContexts = {
        academic: "Summarize this text in an academic, formal style suitable for scholarly writing.",
        concise: "Summarize this text in a concise, clear manner while preserving key information.",
        creative: "Summarize this text with creative flair, maintaining the original's artistic expression.",
        conversational: "Summarize this text in a natural, conversational tone as if speaking to a friend."
      };

      const context = modeContexts[mode as keyof typeof modeContexts] || modeContexts.academic;
      
      const summarizer = await chromeAI.summarizer.create({
        type: 'key-points',
        format: 'plain-text',
        length: 'medium'
      });
      
      // Add mode context as a prefix to give guidance
      const textWithContext = `${context}\n\n${input}`;
      const result = await summarizer.summarize(textWithContext);
      
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
 * NOTE: Writer API is not yet available in web pages (Chrome 138+)
 * This function will return a fallback message until the API is released
 */
export async function rewriteText(input: string, mode: string = 'academic'): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to clean and rewrite.";
  }

  // Writer API is not available in web pages yet, only in Chrome Extensions
  const chromeAI = getChromeAI();
  if (!chromeAI?.writer) {
    return "⚠️ Writer API not available yet.\n\nThe Chrome Writer API is still in development and not released for web pages.\n\nAlternative: Use the Summarizer to clean up text, or consider integrating OpenAI/Claude API for rewriting.";
  }

  return safeChromeAICall(
    async () => {
      // Create context based on processing mode
      const modeContexts = {
        academic: "Rewrite this text in an academic, formal style suitable for scholarly writing. Make it more precise and professional.",
        concise: "Rewrite this text in a concise, clear manner while preserving key information. Remove unnecessary words and improve clarity.",
        creative: "Rewrite this text with creative flair, maintaining the original's artistic expression while improving flow and readability.",
        conversational: "Rewrite this text in a natural, conversational tone as if speaking to a friend. Make it more engaging and accessible."
      };

      const context = modeContexts[mode as keyof typeof modeContexts] || modeContexts.academic;
      
      const writer = await chromeAI.writer.create({
        tone: 'neutral',
        format: 'plain-text',
        length: 'medium'
      });
      
      const result = await writer.write(input, { 
        context: context 
      });
      
      if (!result) {
        return "No rewritten text generated. Please try again with different text.";
      }
      
      return result;
    },
    "Writer API not available in this browser."
  );
}

/**
 * Extracts tasks from the input text using Chrome AI Language Model
 * NOTE: Language Model API (Prompt API) ONLY works in Chrome Extensions, NOT web pages
 * This function provides a basic fallback for web pages
 */
export async function extractTasks(input: string): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to extract tasks from.";
  }

  // Prompt API only works in Chrome Extensions, not web pages
  const chromeAI = getChromeAI();
  if (!chromeAI?.languageModel) {
    // Simple fallback: extract lines that look like tasks
    const lines = input.split('\n').filter(line => line.trim());
    const taskPatterns = [
      /^[-*•]\s*(.+)/,  // Bullet points
      /^\d+\.\s*(.+)/,  // Numbered lists
      /^(to do|todo|task):\s*(.+)/i,  // Explicit task markers
      /(need to|should|must|have to|going to)\s+(.+)/i  // Action verbs
    ];
    
    const tasks: string[] = [];
    lines.forEach(line => {
      for (const pattern of taskPatterns) {
        const match = line.match(pattern);
        if (match) {
          tasks.push(line.trim());
          break;
        }
      }
    });
    
    if (tasks.length > 0) {
      return "📝 Tasks found (basic extraction):\n\n" + 
             tasks.map((task, i) => `${i + 1}. ${task}`).join('\n') +
             "\n\n⚠️ Note: Prompt API only works in Chrome Extensions. For advanced task extraction, consider OpenAI/Claude API.";
    }
    
    return "⚠️ Language Model API not available.\n\nThe Prompt API (Language Model) only works in Chrome Extensions, not web pages.\n\nNo obvious tasks found in the text using basic pattern matching.\n\nAlternative: Integrate OpenAI/Claude API for advanced task extraction.";
  }

  // If somehow available (in extension context), use it
  return safeChromeAICall(
    async () => {
      // Use the new LanguageModel API syntax
      const session = await chromeAI.languageModel.create({
        systemPrompt: 'You are a helpful assistant that extracts actionable tasks from text and formats them clearly.'
      });
      
      const result = await session.prompt(
        `Extract actionable tasks from the following text. Format them as a numbered list with clear, specific actions:\n\n${input}\n\nIf no tasks are found, respond with "No actionable tasks identified."`
      );
      
      if (!result) {
        return "No tasks extracted. Please try again with different text.";
      }
      
      return result;
    },
    "Language Model API not available in this browser."
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
  const chromeVersionMatch = userAgent.match(/Chrome\/(\d+)/);
  const chromeVersion = chromeVersionMatch ? parseInt(chromeVersionMatch[1]) : 0;
  const isSupported = checkChromeAI();
  
  const chromeAI = getChromeAI();
  
  if (isSupported) {
    return "✅ Chrome Built-in AI features detected!\n\n🎯 Available AI functions:\n" +
           (chromeAI?.summarizer ? "• ✅ Text summarization (Summarizer API)\n" : "") +
           (chromeAI?.translator ? "• ✅ Translation (Translator API)\n" : "") +
           (chromeAI?.writer ? "• ✅ Text rewriting (Writer API)\n" : "• ⚠️ Text rewriting (Writer API not released yet)\n") +
           (chromeAI?.languageModel ? "• ✅ Task extraction (Language Model API)\n" : "• ⚠️ Task extraction (Prompt API only works in Extensions)\n") +
           "\n💡 Chrome version: " + chromeVersion;
  } else if (isChrome) {
    if (chromeVersion < 138) {
      return "⚠️ Chrome version " + chromeVersion + " detected.\n\n🔧 Chrome Built-in AI requires Chrome 138+:\n• Update to Chrome 138 or later (stable)\n• Or use Chrome Dev/Canary for latest features\n• Then refresh the page";
    }
    return "⚠️ Chrome " + chromeVersion + " detected but Built-in AI not available.\n\n🔧 To enable Chrome Built-in AI:\n• Go to chrome://flags\n• Search for 'AI' and enable relevant flags\n• Restart Chrome and refresh this page\n\n📝 Note: Only Summarizer & Translator work in web pages.";
  } else {
    return "🌐 Chrome Built-in AI features require Chrome browser.\n\n📋 Current browser: " + 
           (userAgent.includes('Firefox') ? 'Firefox' :
            userAgent.includes('Safari') ? 'Safari' :
            userAgent.includes('Edg') ? 'Edge' : 'Unknown') +
           "\n\n🔄 To use AI features:\n• Switch to Chrome 138+ (stable version)\n• Or integrate OpenAI/Claude API for universal browser support\n\n💡 Voice input will still work in your current browser.";
  }
}
