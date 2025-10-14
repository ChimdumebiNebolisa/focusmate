/**
 * Chrome AI Runtime Check Utility
 * Provides runtime validation for Chrome AI API availability
 * Updated to use the new Chrome Built-in AI APIs (non-deprecated)
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

interface AISummarizer {
  summarize(input: string, options?: { context?: string; type?: 'tl;dr' | 'key-points' | 'teaser' | 'headline' }): Promise<string>;
  summarizeStreaming?(input: string, options?: { context?: string }): ReadableStream;
  destroy?(): void;
}

interface AISummarizerFactory {
  capabilities(): Promise<{
    available: 'readily' | 'after-download' | 'no';
  }>;
  create(options?: {
    type?: 'tl;dr' | 'key-points' | 'teaser' | 'headline';
    format?: 'plain-text' | 'markdown';
    length?: 'short' | 'medium' | 'long';
  }): Promise<AISummarizer>;
}

interface AIWriter {
  write(input: string, options?: { context?: string }): Promise<string>;
  writeStreaming?(input: string, options?: { context?: string }): ReadableStream;
  destroy?(): void;
}

interface AIWriterFactory {
  capabilities(): Promise<{
    available: 'readily' | 'after-download' | 'no';
  }>;
  create(options?: {
    tone?: 'formal' | 'neutral' | 'casual';
    format?: 'plain-text' | 'markdown';
    length?: 'short' | 'medium' | 'long';
  }): Promise<AIWriter>;
}

interface AITranslator {
  translate(input: string): Promise<string>;
  destroy?(): void;
}

interface AITranslatorFactory {
  capabilities(config: {
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<{
    available: 'readily' | 'after-download' | 'no';
  }>;
  create(config: {
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<AITranslator>;
}

interface ChromeAI {
  languageModel?: AILanguageModelFactory;
  summarizer?: AISummarizerFactory;
  writer?: AIWriterFactory;
  translator?: AITranslatorFactory;
}

declare global {
  // The Chrome Built-in AI APIs are available as global 'ai' or 'self.ai'
  // NOT as window.ai (that is deprecated)
  const ai: ChromeAI | undefined;
}

/**
 * Check if Chrome AI APIs are available at runtime
 * @returns {boolean} true if at least one Chrome AI API is available
 */
export function checkChromeAI(): boolean {
  // Check if 'ai' property exists on self (works in both main thread and workers)
  // Chrome Built-in AI APIs are exposed as self.ai
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chromeAI = ('ai' in self ? (self as any).ai : undefined) as ChromeAI | undefined;
  
  // Debug logging
  console.log('Chrome AI Detection:', {
    hasAIProperty: 'ai' in self,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aiObject: (self as any).ai,
    hasAPI: !!chromeAI,
    apis: chromeAI ? {
      summarizer: !!chromeAI.summarizer,
      writer: !!chromeAI.writer,
      languageModel: !!chromeAI.languageModel,
      translator: !!chromeAI.translator
    } : null
  });
  
  if (!chromeAI) {
    // Only show warning once per session
    if (!sessionStorage.getItem('ai-warning-shown')) {
      showAIWarning();
      sessionStorage.setItem('ai-warning-shown', 'true');
    }
    return false;
  }

  // Check if at least one API is available
  const hasSummarizer = !!chromeAI.summarizer;
  const hasWriter = !!chromeAI.writer;
  const hasLanguageModel = !!chromeAI.languageModel;
  const hasTranslator = !!chromeAI.translator;

  const hasAnyAPI = hasSummarizer || hasWriter || hasLanguageModel || hasTranslator;

  if (!hasAnyAPI) {
    // Only show warning once per session
    if (!sessionStorage.getItem('ai-warning-shown')) {
      showAIWarning();
      sessionStorage.setItem('ai-warning-shown', 'true');
    }
    return false;
  }

  return true;
}

/**
 * Display a styled warning when Chrome AI is not supported
 */
function showAIWarning(): void {
  const warningMessage = `🔧 Chrome AI API not supported on this browser.

To use AI features:
• Use Chrome Canary or Chrome Dev (latest)
• Enable Chrome AI features in chrome://flags
• Ensure you're on a supported platform`;

  // Create a styled alert container
  const alertContainer = document.createElement('div');
  alertContainer.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #fef3c7, #fbbf24);
    border: 2px solid #f59e0b;
    border-radius: 12px;
    padding: 20px;
    max-width: 500px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #92400e;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-line;
    text-align: left;
    animation: slideDown 0.3s ease-out;
  `;

  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  alertContainer.textContent = warningMessage;

  // Add close button
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '✕';
  closeButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    font-size: 18px;
    color: #92400e;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;
  `;
  
  closeButton.onmouseover = () => {
    closeButton.style.backgroundColor = 'rgba(146, 64, 14, 0.1)';
  };
  
  closeButton.onmouseout = () => {
    closeButton.style.backgroundColor = 'transparent';
  };

  closeButton.onclick = () => {
    document.body.removeChild(alertContainer);
    document.head.removeChild(style);
  };

  alertContainer.appendChild(closeButton);
  document.body.appendChild(alertContainer);

  // Auto-remove after 8 seconds
  setTimeout(() => {
    if (document.body.contains(alertContainer)) {
      document.body.removeChild(alertContainer);
    }
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  }, 8000);
}

/**
 * Get detailed information about available Chrome AI APIs
 * @returns {object} Object containing availability status of each API
 */
export function getChromeAIStatus(): {
  available: boolean;
  summarizer: boolean;
  writer: boolean;
  languageModel: boolean;
  translator: boolean;
  browser: string;
} {
  const isChrome = navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chromeAI = ('ai' in self ? (self as any).ai : undefined) as ChromeAI | undefined;
  
  return {
    available: checkChromeAI(),
    summarizer: !!(chromeAI?.summarizer),
    writer: !!(chromeAI?.writer),
    languageModel: !!(chromeAI?.languageModel),
    translator: !!(chromeAI?.translator),
    browser: isChrome ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 
             navigator.userAgent.includes('Safari') ? 'Safari' :
             navigator.userAgent.includes('Edg') ? 'Edge' : 'Unknown'
  };
}

/**
 * Safe wrapper for Chrome AI operations
 * @param operation Function that performs Chrome AI operation
 * @param fallbackMessage Message to return if AI is not available
 * @returns Promise that resolves to operation result or fallback message
 */
export async function safeChromeAICall<T>(
  operation: () => Promise<T>,
  fallbackMessage: string = 'Chrome AI not available'
): Promise<T | string> {
  if (!checkChromeAI()) {
    return fallbackMessage;
  }

  try {
    return await operation();
  } catch (error) {
    console.error('Chrome AI operation failed:', error);
    return 'Chrome AI operation failed. Please try again.';
  }
}





