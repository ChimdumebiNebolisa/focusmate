/**
 * AI Diagnostics Utility
 * Comprehensive diagnostic tool for Chrome AI features
 * Provides detailed status checks and troubleshooting guidance
 */

export interface DiagnosticResult {
  overallStatus: 'pass' | 'fail' | 'partial';
  checks: {
    chromeVersion: CheckResult;
    browserType: CheckResult;
    aiObject: CheckResult;
    summarizerAPI: CheckResult;
    translatorAPI: CheckResult;
    modelStatus: CheckResult;
    originTokens: CheckResult;
    domain: CheckResult;
    systemRequirements: CheckResult;
  };
  recommendations: string[];
  testResults: {
    summarizerTest: TestResult;
    translatorTest: TestResult;
  };
}

export interface CheckResult {
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
  fixInstructions?: string[];
}

export interface TestResult {
  success: boolean;
  message: string;
  duration?: number;
  error?: string;
}

/**
 * Run comprehensive AI diagnostics
 */
export async function runDiagnostics(): Promise<DiagnosticResult> {
  const checks = {
    chromeVersion: checkChromeVersion(),
    browserType: checkBrowserType(),
    aiObject: checkAIObject(),
    summarizerAPI: checkSummarizerAPI(),
    translatorAPI: checkTranslatorAPI(),
    modelStatus: await checkModelStatus(),
    originTokens: checkOriginTokens(),
    domain: checkDomain(),
    systemRequirements: checkSystemRequirements()
  };

  const testResults = await runFunctionalTests();

  const overallStatus = determineOverallStatus(checks);
  const recommendations = generateRecommendations(checks, testResults);

  return {
    overallStatus,
    checks,
    recommendations,
    testResults
  };
}

/**
 * Check Chrome version (requires 138+)
 */
function checkChromeVersion(): CheckResult {
  const userAgent = navigator.userAgent;
  const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
  const version = chromeMatch ? parseInt(chromeMatch[1]) : 0;

  if (version === 0) {
    return {
      status: 'fail',
      message: 'Chrome version not detected',
      details: `User agent: ${userAgent}`,
      fixInstructions: ['Install Google Chrome browser']
    };
  }

  if (version < 138) {
    return {
      status: 'fail',
      message: `Chrome version ${version} is too old`,
      details: 'Chrome AI requires version 138 or later',
      fixInstructions: [
        'Go to chrome://settings/help',
        'Click "Update Google Chrome" if available',
        'Or download from https://www.google.com/chrome/',
        'Restart Chrome after updating'
      ]
    };
  }

  return {
    status: 'pass',
    message: `Chrome version ${version} is supported`,
    details: 'Meets minimum requirement of Chrome 138+'
  };
}

/**
 * Check if using Chrome browser (not Edge/Firefox/Safari)
 */
function checkBrowserType(): CheckResult {
  const userAgent = navigator.userAgent;
  const isChrome = userAgent.includes('Chrome') && !userAgent.includes('Edg');
  const isEdge = userAgent.includes('Edg');
  const isFirefox = userAgent.includes('Firefox');
  const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome');

  if (isChrome) {
    return {
      status: 'pass',
      message: 'Chrome browser detected',
      details: 'Chrome AI features are supported'
    };
  }

  let browserName = 'Unknown';
  if (isEdge) browserName = 'Microsoft Edge';
  else if (isFirefox) browserName = 'Mozilla Firefox';
  else if (isSafari) browserName = 'Safari';

  return {
    status: 'fail',
    message: `${browserName} browser detected`,
    details: 'Chrome AI features require Google Chrome',
    fixInstructions: [
      'Install Google Chrome browser',
      'Or integrate OpenAI/Claude API for universal browser support'
    ]
  };
}

/**
 * Check if self.ai object exists
 */
function checkAIObject(): CheckResult {
  const hasAI = 'ai' in self;
  
  if (!hasAI) {
    return {
      status: 'fail',
      message: 'AI object not available',
      details: 'self.ai is undefined',
      fixInstructions: [
        'Ensure Chrome 138+ is installed',
        'Enable AI features in chrome://flags',
        'Restart Chrome after enabling flags'
      ]
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aiObject = (self as any).ai;
  if (!aiObject) {
    return {
      status: 'fail',
      message: 'AI object is null',
      details: 'self.ai exists but is null',
      fixInstructions: [
        'Enable AI features in chrome://flags',
        'Download AI model in chrome://components',
        'Restart Chrome'
      ]
    };
  }

  return {
    status: 'pass',
    message: 'AI object is available',
    details: 'self.ai exists and is accessible'
  };
}

/**
 * Check if Summarizer API is available
 */
function checkSummarizerAPI(): CheckResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chromeAI = (self as any).ai;
  
  if (!chromeAI) {
    return {
      status: 'fail',
      message: 'AI object not available',
      details: 'Cannot check Summarizer API without AI object'
    };
  }

  const hasSummarizer = !!chromeAI.summarizer;
  
  if (!hasSummarizer) {
    return {
      status: 'fail',
      message: 'Summarizer API not available',
      details: 'chromeAI.summarizer is undefined',
      fixInstructions: [
        'Enable #summarization-api-for-gemini-nano in chrome://flags',
        'Download AI model in chrome://components',
        'Restart Chrome'
      ]
    };
  }

  return {
    status: 'pass',
    message: 'Summarizer API is available',
    details: 'chromeAI.summarizer is accessible'
  };
}

/**
 * Check if Translator API is available
 */
function checkTranslatorAPI(): CheckResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chromeAI = (self as any).ai;
  
  if (!chromeAI) {
    return {
      status: 'fail',
      message: 'AI object not available',
      details: 'Cannot check Translator API without AI object'
    };
  }

  const hasTranslator = !!chromeAI.translator;
  
  if (!hasTranslator) {
    return {
      status: 'warning',
      message: 'Translator API not available',
      details: 'chromeAI.translator is undefined (optional)',
      fixInstructions: [
        'Enable #prompt-api-for-gemini-nano in chrome://flags',
        'Download AI model in chrome://components'
      ]
    };
  }

  return {
    status: 'pass',
    message: 'Translator API is available',
    details: 'chromeAI.translator is accessible'
  };
}

/**
 * Check AI model download status (if accessible)
 */
async function checkModelStatus(): Promise<CheckResult> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeAI = (self as any).ai;
    
    if (!chromeAI?.summarizer) {
      return {
        status: 'fail',
        message: 'Cannot check model status',
        details: 'Summarizer API not available'
      };
    }

    const capabilities = await chromeAI.summarizer.capabilities();
    
    if (capabilities.available === 'readily') {
      return {
        status: 'pass',
        message: 'AI model is downloaded and ready',
        details: 'Model is available for immediate use'
      };
    } else if (capabilities.available === 'after-download') {
      return {
        status: 'warning',
        message: 'AI model needs to be downloaded',
        details: 'Model will be downloaded on first use (2GB)',
        fixInstructions: [
          'Go to chrome://components',
          'Find "Optimization Guide On Device Model"',
          'Click "Check for update"',
          'Wait for download to complete (5-30 minutes)'
        ]
      };
    } else {
      return {
        status: 'fail',
        message: 'AI model is not available',
        details: 'Model download failed or not supported',
        fixInstructions: [
          'Check system requirements (22GB storage, 4GB+ VRAM)',
          'Go to chrome://components to retry download',
          'Ensure stable internet connection'
        ]
      };
    }
  } catch (error) {
    return {
      status: 'fail',
      message: 'Error checking model status',
      details: error instanceof Error ? error.message : 'Unknown error',
      fixInstructions: [
        'Check if AI model is downloaded in chrome://components',
        'Verify model status in chrome://on-device-internals'
      ]
    };
  }
}

/**
 * Check origin trial tokens
 */
function checkOriginTokens(): CheckResult {
  const metaTags = document.querySelectorAll('meta[http-equiv="origin-trial"]');
  const tokens = Array.from(metaTags).map(tag => tag.getAttribute('content'));
  
  if (tokens.length === 0) {
    return {
      status: 'fail',
      message: 'No origin trial tokens found',
      details: 'Missing origin trial tokens in HTML head',
      fixInstructions: [
        'Add origin trial tokens to HTML head',
        'Generate tokens at https://developer.chrome.com/origintrials',
        'Include tokens for your domain'
      ]
    };
  }

  const validTokens = tokens.filter(token => token && token.length > 0);
  
  if (validTokens.length === 0) {
    return {
      status: 'fail',
      message: 'Origin trial tokens are empty',
      details: 'Tokens exist but are empty or invalid'
    };
  }

  return {
    status: 'pass',
    message: `${validTokens.length} origin trial token(s) found`,
    details: 'Origin trial tokens are configured'
  };
}

/**
 * Check current domain
 */
function checkDomain(): CheckResult {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isVercel = hostname.includes('vercel.app');
  const isHTTPS = window.location.protocol === 'https:';

  if (isLocalhost) {
    return {
      status: 'pass',
      message: 'Localhost development environment',
      details: `Domain: ${hostname} (development)`
    };
  }

  if (isVercel && isHTTPS) {
    return {
      status: 'pass',
      message: 'Vercel production environment',
      details: `Domain: ${hostname} (HTTPS)`
    };
  }

  if (!isHTTPS) {
    return {
      status: 'warning',
      message: 'Non-HTTPS domain detected',
      details: `Domain: ${hostname} (HTTP)`,
      fixInstructions: [
        'Chrome AI features work best on HTTPS domains',
        'Consider deploying to HTTPS'
      ]
    };
  }

  return {
    status: 'pass',
    message: 'Custom domain detected',
    details: `Domain: ${hostname}`
  };
}

/**
 * Check system requirements (estimated)
 */
function checkSystemRequirements(): CheckResult {
  const warnings: string[] = [];
  const instructions: string[] = [];

  // Check available storage (rough estimate)
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    // This is async but we'll handle it synchronously for now
    navigator.storage.estimate().then(estimate => {
      const available = estimate.quota || 0;
      const required = 22 * 1024 * 1024 * 1024; // 22GB in bytes
      
      if (available < required) {
        warnings.push(`Low storage: ${Math.round(available / 1024 / 1024 / 1024)}GB available, 22GB required`);
        instructions.push('Free up at least 22GB of storage space');
      }
    });
  }

  // Check GPU (basic detection)
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) {
    warnings.push('WebGL not available - may indicate insufficient GPU');
    instructions.push('Ensure you have a GPU with 4GB+ VRAM');
  }

  if (warnings.length === 0) {
    return {
      status: 'pass',
      message: 'System requirements appear to be met',
      details: 'WebGL available, storage check pending'
    };
  }

  return {
    status: 'warning',
    message: 'Potential system requirement issues',
    details: warnings.join('; '),
    fixInstructions: instructions
  };
}

/**
 * Run functional tests on AI APIs
 */
async function runFunctionalTests(): Promise<{ summarizerTest: TestResult; translatorTest: TestResult }> {
  const summarizerTest = await testSummarizer();
  const translatorTest = await testTranslator();

  return { summarizerTest, translatorTest };
}

/**
 * Test Summarizer API functionality
 */
async function testSummarizer(): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeAI = (self as any).ai;
    
    if (!chromeAI?.summarizer) {
      return {
        success: false,
        message: 'Summarizer API not available',
        error: 'chromeAI.summarizer is undefined'
      };
    }

    const summarizer = await chromeAI.summarizer.create({
      type: 'key-points',
      format: 'plain-text',
      length: 'short'
    });

    const result = await summarizer.summarize('This is a test sentence for AI summarization.');
    const duration = Date.now() - startTime;

    if (result && result.length > 0) {
      return {
        success: true,
        message: 'Summarizer test passed',
        duration
      };
    } else {
      return {
        success: false,
        message: 'Summarizer returned empty result',
        duration
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Summarizer test failed',
      duration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test Translator API functionality
 */
async function testTranslator(): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeAI = (self as any).ai;
    
    if (!chromeAI?.translator) {
      return {
        success: false,
        message: 'Translator API not available',
        error: 'chromeAI.translator is undefined'
      };
    }

    const translator = await chromeAI.translator.create({
      sourceLanguage: 'en',
      targetLanguage: 'es'
    });

    const result = await translator.translate('Hello world');
    const duration = Date.now() - startTime;

    if (result && result.length > 0) {
      return {
        success: true,
        message: 'Translator test passed',
        duration
      };
    } else {
      return {
        success: false,
        message: 'Translator returned empty result',
        duration
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Translator test failed',
      duration: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Determine overall diagnostic status
 */
function determineOverallStatus(checks: DiagnosticResult['checks']): 'pass' | 'fail' | 'partial' {
  const criticalChecks = [checks.chromeVersion, checks.browserType, checks.aiObject, checks.summarizerAPI];
  const hasFailures = criticalChecks.some(check => check.status === 'fail');
  const hasWarnings = Object.values(checks).some(check => check.status === 'warning');

  if (hasFailures) return 'fail';
  if (hasWarnings) return 'partial';
  return 'pass';
}

/**
 * Generate recommendations based on diagnostic results
 */
function generateRecommendations(checks: DiagnosticResult['checks'], testResults: DiagnosticResult['testResults']): string[] {
  const recommendations: string[] = [];

  if (checks.chromeVersion.status === 'fail') {
    recommendations.push('Update Chrome to version 138 or later');
  }

  if (checks.browserType.status === 'fail') {
    recommendations.push('Switch to Google Chrome browser');
  }

  if (checks.aiObject.status === 'fail') {
    recommendations.push('Enable AI features in chrome://flags and restart Chrome');
  }

  if (checks.summarizerAPI.status === 'fail') {
    recommendations.push('Enable #summarization-api-for-gemini-nano flag');
  }

  if (checks.modelStatus.status === 'warning' || checks.modelStatus.status === 'fail') {
    recommendations.push('Download AI model in chrome://components (2GB download)');
  }

  if (checks.originTokens.status === 'fail') {
    recommendations.push('Add origin trial tokens to HTML head');
  }

  if (!testResults.summarizerTest.success) {
    recommendations.push('Test summarizer functionality - may need model download');
  }

  if (!testResults.translatorTest.success) {
    recommendations.push('Test translator functionality - may need additional setup');
  }

  return recommendations;
}

/**
 * Get quick status summary
 */
export function getQuickStatus(): string {
  const chromeMatch = navigator.userAgent.match(/Chrome\/(\d+)/);
  const version = chromeMatch ? parseInt(chromeMatch[1]) : 0;
  const isChrome = navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg');
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasAI = 'ai' in self && !!(self as any).ai?.summarizer;

  if (!isChrome) return '❌ Not Chrome browser';
  if (version < 138) return `❌ Chrome ${version} (need 138+)`;
  if (!hasAI) return '⚠️ Chrome AI not available';
  return '✅ Chrome AI ready';
}


