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
    if (!input.trim()) {
      return "Please provide text to summarize.";
    }

    if (!window.ai?.summarizer) {
      return "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform";
    }

    const summarizer = await window.ai.summarizer.create();
    const result = await summarizer.run({ text: input });
    
    if (!result?.result) {
      return "No summary generated. Please try again with different text.";
    }
    
    return result.result;
  } catch (error) {
    console.error('Summarizer error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        return "⚠️ API quota exceeded. Please try again later.";
      }
      if (error.message.includes('permission')) {
        return "🔒 Permission denied. Please check Chrome settings.";
      }
    }
    
    return "❌ Error: Failed to summarize text. Please try again or check your browser compatibility.";
  }
}

/**
 * Rewrites the input text using Chrome AI
 */
export async function rewriteText(input: string): Promise<string> {
  try {
    if (!input.trim()) {
      return "Please provide text to clean and rewrite.";
    }

    if (!window.ai?.rewriter) {
      return "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform";
    }

    const rewriter = await window.ai.rewriter.create();
    const result = await rewriter.run({ 
      text: input, 
      context: "Simplify and clarify this text while maintaining its meaning. Make it more readable and professional." 
    });
    
    if (!result?.result) {
      return "No rewritten text generated. Please try again with different text.";
    }
    
    return result.result;
  } catch (error) {
    console.error('Rewriter error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        return "⚠️ API quota exceeded. Please try again later.";
      }
      if (error.message.includes('permission')) {
        return "🔒 Permission denied. Please check Chrome settings.";
      }
    }
    
    return "❌ Error: Failed to rewrite text. Please try again or check your browser compatibility.";
  }
}

/**
 * Extracts tasks from the input text using Chrome AI
 */
export async function extractTasks(input: string): Promise<string> {
  try {
    if (!input.trim()) {
      return "Please provide text to extract tasks from.";
    }

    if (!window.ai?.prompt) {
      return "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform";
    }

    const prompt = await window.ai.prompt.create();
    const result = await prompt.run({ 
      prompt: `Extract actionable tasks from the following text. Format them as a numbered list with clear, specific actions:\n\n${input}\n\nIf no tasks are found, respond with "No actionable tasks identified."` 
    });
    
    if (!result?.result) {
      return "No tasks extracted. Please try again with different text.";
    }
    
    return result.result;
  } catch (error) {
    console.error('Task extraction error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        return "⚠️ API quota exceeded. Please try again later.";
      }
      if (error.message.includes('permission')) {
        return "🔒 Permission denied. Please check Chrome settings.";
      }
    }
    
    return "❌ Error: Failed to extract tasks. Please try again or check your browser compatibility.";
  }
}

/**
 * Translates the input text using Chrome AI
 */
export async function translateText(input: string, targetLang: string = "en", mode: string = "academic"): Promise<string> {
  try {
    if (!input.trim()) {
      return "Please provide text to translate.";
    }

    if (!window.ai?.translator) {
      return "🔧 Chrome AI API not supported on this browser.\n\nTo use AI features:\n• Use Chrome browser (latest version)\n• Enable Chrome AI features in settings\n• Ensure you're on a supported platform";
    }

    // Create context based on translation mode
    const modeContexts = {
      academic: "Translate this text in an academic, formal style suitable for scholarly writing.",
      concise: "Translate this text in a concise, clear manner while preserving key information.",
      creative: "Translate this text with creative flair, maintaining the original's artistic expression.",
      conversational: "Translate this text in a natural, conversational tone as if speaking to a friend."
    };

    const context = modeContexts[mode as keyof typeof modeContexts] || modeContexts.academic;

    const translator = await window.ai.translator.create();
    const result = await translator.run({ 
      text: `${context}\n\nText to translate: ${input}`, 
      targetLanguage: targetLang 
    });
    
    if (!result?.result) {
      return "No translation generated. Please try again with different text.";
    }
    
    return result.result;
  } catch (error) {
    console.error('Translator error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        return "⚠️ API quota exceeded. Please try again later.";
      }
      if (error.message.includes('permission')) {
        return "🔒 Permission denied. Please check Chrome settings.";
      }
      if (error.message.includes('language')) {
        return "🌍 Unsupported language. Please try a different target language.";
      }
    }
    
    return "❌ Error: Failed to translate text. Please try again or check your browser compatibility.";
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
