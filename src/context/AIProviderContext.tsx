import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type AIProvider = 'chrome' | 'mistral';

interface AIProviderContextType {
  provider: AIProvider;
  toggleProvider: () => void;
  setProvider: (provider: AIProvider) => void;
}

const AIProviderContext = createContext<AIProviderContextType | undefined>(undefined);

const STORAGE_KEY = 'focusmate-ai-provider';

export function AIProviderProvider({ children }: { children: ReactNode }) {
  const [provider, setProviderState] = useState<AIProvider>(() => {
    // Load from localStorage or default to chrome
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved === 'mistral' || saved === 'chrome') ? saved : 'chrome';
  });

  // Save to localStorage whenever provider changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, provider);
  }, [provider]);

  const toggleProvider = () => {
    setProviderState(prev => prev === 'chrome' ? 'mistral' : 'chrome');
  };

  const setProvider = (newProvider: AIProvider) => {
    setProviderState(newProvider);
  };

  return (
    <AIProviderContext.Provider value={{ provider, toggleProvider, setProvider }}>
      {children}
    </AIProviderContext.Provider>
  );
}

export function useAIProvider() {
  const context = useContext(AIProviderContext);
  if (context === undefined) {
    throw new Error('useAIProvider must be used within an AIProviderProvider');
  }
  return context;
}

