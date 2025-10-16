/**
 * LocalStorage utility for session persistence
 * Handles saving and loading the last session data
 */

export interface SessionData {
  inputText: string;
  outputText: string;
  processingMode: string;
  timestamp: number;
}

const SESSION_KEY = 'focusmate-session';

/**
 * Save session data to localStorage
 */
export const saveSession = (data: SessionData): void => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save session to localStorage:', error);
  }
};

/**
 * Load session data from localStorage
 */
export const loadSession = (): SessionData | null => {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      // Check if data is not too old (7 days)
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      if (Date.now() - data.timestamp < maxAge) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to load session from localStorage:', error);
  }
  return null;
};

/**
 * Clear session data from localStorage
 */
export const clearSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.warn('Failed to clear session from localStorage:', error);
  }
};

/**
 * Check if session data exists
 */
export const hasSession = (): boolean => {
  try {
    return localStorage.getItem(SESSION_KEY) !== null;
  } catch (error) {
    return false;
  }
};
