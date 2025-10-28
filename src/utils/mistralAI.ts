/**
 * Mistral AI Integration via OpenRouter
 * Cloud-based text processing using Mistral 7B Instruct model
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL_ID = 'mistralai/mistral-7b-instruct:free';

// Alternative models to try if needed:
// 'mistralai/mistral-7b-instruct'
// 'openchat/openchat-7b:free'

/**
 * Get the OpenRouter API key from environment variables
 */
function getAPIKey(): string | null {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    return null;
  }
  return apiKey;
}

/**
 * Generate a system prompt based on processing mode
 */
function getSystemPrompt(mode: string): string {
  const modePrompts: Record<string, string> = {
    academic: 'You are an academic assistant. Provide a concise summary of the following text in a formal, scholarly style. Keep it SHORT and focus on key concepts and main ideas only.',
    concise: 'You are a concise communication assistant. Provide a SHORT summary of the following text. Be brief and direct while preserving key information only.',
    creative: 'You are a creative writing assistant. Provide a brief, condensed summary of the following text while maintaining the artistic tone. Keep it SHORT.',
    conversational: 'You are a friendly assistant. Provide a brief summary of the following text in a natural, conversational tone. Keep it SHORT and to the point.'
  };

  return modePrompts[mode] || modePrompts.academic;
}

/**
 * Summarize text using Mistral AI via OpenRouter
 */
export async function summarizeTextWithMistral(text: string, mode: string = 'academic'): Promise<string> {
  if (!text.trim()) {
    return 'Please provide text to summarize.';
  }

  const apiKey = getAPIKey();
  if (!apiKey) {
    return 'Mistral AI requires an API key. Please configure your OpenRouter API key in the .env file.';
  }

  try {
    const systemPrompt = getSystemPrompt(mode);
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'FocusMate - AI Text Processing'
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: text
          }
        ],
        max_tokens: 150,
        temperature: 0.5
      })
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API error:', errorData);
      
      if (response.status === 401) {
        return 'Authentication failed. Please check your OpenRouter API key.';
      } else if (response.status === 429) {
        return 'Rate limit exceeded. Please wait a moment and try again.';
      } else {
        return `Failed to process text: ${response.statusText}. Please try again.`;
      }
    }

    const data = await response.json();
    console.log('OpenRouter API response:', JSON.stringify(data, null, 2));
    
    // Check for error in response
    if (data.error) {
      console.error('OpenRouter API error response:', data.error);
      return `API Error: ${data.error.message || 'Unknown error occurred'}. Please check your API key and try again.`;
    }
    
    // Check for choices array (standard OpenAI-compatible format)
    if (data.choices && data.choices.length > 0) {
      const choice = data.choices[0];
      console.log('Choice object:', choice);
      
      // Try different ways to access the message content
      const message = choice.message || choice;
      const content = message?.content || choice?.text;
      
      console.log('Message object:', message);
      console.log('Content found:', content);
      
      if (content && typeof content === 'string' && content.trim()) {
        return content.trim();
      }
      console.warn('Empty or invalid content in response:', data);
      return 'No summary generated. The AI returned an empty response. Please try again.';
    } 
    
    console.error('Unexpected API response format:', data);
    return `Unexpected response format. Please check the console for details.`;
  } catch (error) {
    console.error('Mistral AI error:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return 'Network error. Please check your internet connection and try again.';
    }
    
    return 'An error occurred while processing your text. Please try again.';
  }
}

/**
 * Check if Mistral AI is configured properly
 */
export function isMistralAIConfigured(): boolean {
  const apiKey = getAPIKey();
  return !!apiKey && apiKey !== 'your_openrouter_api_key_here';
}

