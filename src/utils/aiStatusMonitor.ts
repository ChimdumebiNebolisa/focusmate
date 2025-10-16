/**
 * AI Status Monitor
 * Monitors Chrome AI system status and provides intelligent error handling
 */

import { checkChromeAI, getChromeAIStatus } from './checkAI';

export interface AIStatus {
  isAvailable: boolean;
  isOperational: boolean;
  lastChecked: number;
  errorType: 'none' | 'unavailable' | 'operational' | 'network' | 'timeout';
  errorMessage: string;
  availableAPIs: string[];
  capabilities: {
    summarizer: boolean;
    translator: boolean;
    writer: boolean;
    languageModel: boolean;
  };
}

class AIStatusMonitor {
  private status: AIStatus;
  private healthCheckInterval: number | null = null;
  private listeners: Array<(status: AIStatus) => void> = [];

  constructor() {
    this.status = this.getInitialStatus();
  }

  private getInitialStatus(): AIStatus {
    const chromeStatus = getChromeAIStatus();
    const isAvailable = checkChromeAI();
    
    return {
      isAvailable,
      isOperational: isAvailable,
      lastChecked: Date.now(),
      errorType: isAvailable ? 'none' : 'unavailable',
      errorMessage: isAvailable ? '' : this.getUnavailableMessage(chromeStatus),
      availableAPIs: this.getAvailableAPIs(chromeStatus),
      capabilities: {
        summarizer: chromeStatus.summarizer,
        translator: chromeStatus.translator,
        writer: chromeStatus.writer,
        languageModel: chromeStatus.languageModel
      }
    };
  }

  private getAvailableAPIs(chromeStatus: any): string[] {
    const apis: string[] = [];
    if (chromeStatus.summarizer) apis.push('summarizer');
    if (chromeStatus.translator) apis.push('translator');
    if (chromeStatus.writer) apis.push('writer');
    if (chromeStatus.languageModel) apis.push('languageModel');
    return apis;
  }

  private getUnavailableMessage(chromeStatus: any): string {
    const isChrome = chromeStatus.browser === 'Chrome';
    const version = chromeStatus.chromeVersion;
    
    if (!isChrome) {
      return `Chrome AI features require Chrome browser. You're currently using ${chromeStatus.browser}.`;
    }
    
    if (version !== 'Unknown' && parseInt(version) < 138) {
      return `Chrome AI requires version 138+. You're running version ${version}. Please update Chrome.`;
    }
    
    return 'Chrome AI features are not available. Please enable AI features in chrome://flags and restart Chrome.';
  }

  /**
   * Get current AI status
   */
  getStatus(): AIStatus {
    return { ...this.status };
  }

  /**
   * Perform a health check on the AI system
   */
  async performHealthCheck(): Promise<AIStatus> {
    try {
      
      // Check basic availability
      const isAvailable = checkChromeAI();
      const chromeStatus = getChromeAIStatus();
      
      if (!isAvailable) {
        this.updateStatus({
          isAvailable: false,
          isOperational: false,
          lastChecked: Date.now(),
          errorType: 'unavailable',
          errorMessage: this.getUnavailableMessage(chromeStatus),
          availableAPIs: [],
          capabilities: {
            summarizer: false,
            translator: false,
            writer: false,
            languageModel: false
          }
        });
        return this.status;
      }

      // Test if AI is actually operational by testing the summarizer
      const operational = await this.testAIOperational();
      const availableAPIs = this.getAvailableAPIs(chromeStatus);
      
      this.updateStatus({
        isAvailable: true,
        isOperational: operational,
        lastChecked: Date.now(),
        errorType: operational ? 'none' : 'operational',
        errorMessage: operational ? '' : 'AI system is available but not responding properly. Please try again.',
        availableAPIs,
        capabilities: {
          summarizer: chromeStatus.summarizer,
          translator: chromeStatus.translator,
          writer: chromeStatus.writer,
          languageModel: chromeStatus.languageModel
        }
      });

      return this.status;
    } catch (error) {
      this.updateStatus({
        isAvailable: this.status.isAvailable,
        isOperational: false,
        lastChecked: Date.now(),
        errorType: 'network',
        errorMessage: 'AI system is temporarily unavailable. Please try again in a moment.',
        availableAPIs: this.status.availableAPIs,
        capabilities: this.status.capabilities
      });
      return this.status;
    }
  }

  /**
   * Test if AI is actually operational by running a quick test
   */
  private async testAIOperational(): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chromeAI = (self as any).ai;
      if (!chromeAI?.summarizer) return false;

      // Quick test with minimal text
      const summarizer = await chromeAI.summarizer.create({
        type: 'key-points',
        format: 'plain-text',
        length: 'short'
      });

      // Test with timeout
      const testPromise = summarizer.summarize('Test');
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );

      await Promise.race([testPromise, timeoutPromise]);
      return true;
    } catch (error) {
      console.warn('AI operational test failed:', error);
      return false;
    }
  }

  /**
   * Update status and notify listeners
   */
  private updateStatus(newStatus: AIStatus): void {
    this.status = newStatus;
    this.listeners.forEach(listener => listener(newStatus));
  }

  /**
   * Subscribe to status changes
   */
  onStatusChange(listener: (status: AIStatus) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Start periodic health checks
   */
  startHealthChecks(intervalMs: number = 30000): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    this.healthCheckInterval = window.setInterval(() => {
      this.performHealthCheck();
    }, intervalMs);
  }

  /**
   * Stop periodic health checks
   */
  stopHealthChecks(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }

  /**
   * Get user-friendly error message based on status
   */
  getUserFriendlyMessage(): string {
    if (this.status.errorType === 'none') {
      return '';
    }

    switch (this.status.errorType) {
      case 'unavailable':
        return this.status.errorMessage;
      
      case 'operational':
        return 'AI system is available but not responding properly. This might be temporary - please try again.';
      
      case 'network':
        return 'AI system is temporarily unavailable. Please check your connection and try again.';
      
      case 'timeout':
        return 'AI system is taking too long to respond. Please try again with shorter text.';
      
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Check if we should show fallback error messages
   */
  shouldShowFallbackError(): boolean {
    return !this.status.isAvailable || !this.status.isOperational;
  }

  /**
   * Check if AI is ready for use
   */
  isReadyForUse(): boolean {
    return this.status.isAvailable && this.status.isOperational;
  }
}

// Export singleton instance
export const aiStatusMonitor = new AIStatusMonitor();

/**
 * Hook for React components to use AI status
 */
export function useAIStatus() {
  const [status, setStatus] = React.useState<AIStatus>(aiStatusMonitor.getStatus());

  React.useEffect(() => {
    const unsubscribe = aiStatusMonitor.onStatusChange(setStatus);
    return unsubscribe;
  }, []);

  return status;
}

// Import React for the hook
import React from 'react';
