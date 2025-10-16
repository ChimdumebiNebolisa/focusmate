/**
 * Chrome AI Integration Utilities
 * Integrates with Chrome's on-device AI APIs for text processing
 * Updated to use the new Chrome Built-in AI APIs (non-deprecated)
 * 
 * As of September 2025, window.ai has been deprecated in Chrome.
 * The official replacement is LanguageModel, accessible via self.ai.languageModel.
 */

import { checkChromeAI } from './checkAI';
import { aiStatusMonitor } from './aiStatusMonitor';

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
  
  if (!chromeAI?.summarizer) {
    console.warn("Summarizer API not available. Requires Chrome 138+ with AI features enabled.");
    return undefined;
  }
  
  return chromeAI;
}

/**
 * Summarizes the input text using Chrome AI with intelligent error handling
 */
export async function summarizeText(input: string, mode: string = 'academic'): Promise<string> {
  if (!input.trim()) {
    return "Please provide text to summarize.";
  }

  // Check AI status before attempting operation
  await aiStatusMonitor.performHealthCheck();
  
  if (!aiStatusMonitor.isReadyForUse()) {
    // Only show fallback error if AI is genuinely not working
    return aiStatusMonitor.getUserFriendlyMessage();
  }

  try {
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
  } catch (error) {
    console.error('Summarization error:', error);
    
    // Check if this is a genuine AI failure or just a temporary issue
    const currentStatus = aiStatusMonitor.getStatus();
    
    if (currentStatus.isAvailable && currentStatus.isOperational) {
      // AI is available but this specific request failed - don't show fallback
      return "Sorry, I couldn't process that text. Please try again with different content.";
    } else {
      // AI is genuinely not working - show appropriate fallback message
      return aiStatusMonitor.getUserFriendlyMessage();
    }
  }
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
           "\n💡 Chrome version: " + chromeVersion;
  } else if (isChrome) {
    if (chromeVersion < 138) {
      return "⚠️ Chrome version " + chromeVersion + " detected.\n\n🔧 Chrome Built-in AI requires Chrome 138+:\n• Update to Chrome 138 or later (stable)\n• Or use Chrome Dev/Canary for latest features\n• Then refresh the page";
    }
    return "⚠️ Chrome " + chromeVersion + " detected but Built-in AI not available.\n\n🔧 To enable Chrome Built-in AI:\n• Go to chrome://flags\n• Enable: #optimization-guide-on-device-model (set to 'Enabled BypassPerfRequirement')\n• Enable: #prompt-api-for-gemini-nano\n• Enable: #summarization-api-for-gemini-nano\n• Click 'Relaunch' button\n• Download AI model in chrome://components (2GB, takes 5-30 minutes)\n\n📝 Note: Summarizer API works in web pages for text summarization.";
  } else {
    return "🌐 Chrome Built-in AI features require Chrome browser.\n\n📋 Current browser: " + 
           (userAgent.includes('Firefox') ? 'Firefox' :
            userAgent.includes('Safari') ? 'Safari' :
            userAgent.includes('Edg') ? 'Edge' : 'Unknown') +
           "\n\n🔄 To use AI features:\n• Switch to Chrome 138+ (stable version)\n• Enable AI flags: #optimization-guide-on-device-model, #summarization-api-for-gemini-nano\n• Download AI model in chrome://components (2GB)\n• Or integrate OpenAI/Claude API for universal browser support\n\n💡 Voice input will still work in your current browser.";
  }
}
