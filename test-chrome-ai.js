/**
 * Chrome AI API Test Script
 * Tests the Chrome AI APIs to ensure they're working correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createChromeAITestHTML() {
    console.log('🧪 Creating Chrome AI API test...\n');

    const testHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FocusMate Chrome AI API Test</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .status {
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 6px;
            display: inline-block;
            margin: 5px 5px 5px 0;
        }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
        .warning { background: #fff3cd; color: #856404; }
        .info { background: #d1ecf1; color: #0c5460; }
        button {
            background: #1a73e8; color: white; border: none; padding: 12px 24px;
            border-radius: 6px; cursor: pointer; font-size: 14px; margin: 5px 5px 5px 0;
        }
        button:hover { background: #1557b0; }
        button:disabled { background: #ccc; cursor: not-allowed; }
        pre { background: #f5f5f5; padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px; }
        .test-result { margin: 10px 0; padding: 10px; border-radius: 6px; border-left: 4px solid #1a73e8; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🤖 FocusMate Chrome AI API Test</h1>
        <p>This page tests all Chrome AI APIs used by FocusMate to ensure they're working correctly.</p>
    </div>

    <div class="card">
        <h2>📋 API Availability Check</h2>
        <div id="availabilityCheck"></div>
        <button onclick="checkAPIAvailability()">🔍 Check API Availability</button>
    </div>

    <div class="card">
        <h2>🧪 Summarizer API Test</h2>
        <div id="summarizerTest"></div>
        <button onclick="testSummarizerAPI()">📝 Test Summarizer</button>
    </div>

    <div class="card">
        <h2>🌍 Translator API Test</h2>
        <div id="translatorTest"></div>
        <button onclick="testTranslatorAPI()">🔄 Test Translator</button>
    </div>

    <div class="card">
        <h2>📊 Comprehensive Test Results</h2>
        <div id="comprehensiveResults"></div>
        <button onclick="runComprehensiveTest()">🚀 Run All Tests</button>
    </div>

    <script>
        const testResults = {
            availability: null,
            summarizer: null,
            translator: null,
            errors: []
        };

        function checkAPIAvailability() {
            const resultsDiv = document.getElementById('availabilityCheck');
            resultsDiv.innerHTML = '<p>Checking API availability...</p>';

            const chromeAI = ('ai' in self ? self.ai : undefined);
            const results = {
                globalAI: !!chromeAI,
                summarizer: !!(chromeAI?.summarizer),
                translator: !!(chromeAI?.translator),
                writer: !!(chromeAI?.writer),
                languageModel: !!(chromeAI?.languageModel),
                userAgent: navigator.userAgent,
                isChrome: navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg'),
                chromeVersion: (() => {
                    const match = navigator.userAgent.match(/Chrome\/(\d+)/);
                    return match ? match[1] : 'Unknown';
                })(),
                origin: location.origin,
                protocol: location.protocol
            };

            let html = '';
            html += \`<div class="status \${results.globalAI ? 'success' : 'error'}">
                \${results.globalAI ? '✅' : '❌'} Chrome AI Global Object
            </div>\`;
            
            html += \`<div class="status \${results.isChrome ? 'success' : 'warning'}">
                \${results.isChrome ? '✅' : '⚠️'} Browser: \${results.isChrome ? 'Chrome' : 'Other'} (v\${results.chromeVersion})
            </div>\`;
            
            html += \`<div class="status \${results.protocol === 'https:' ? 'success' : 'error'}">
                \${results.protocol === 'https:' ? '✅' : '❌'} Protocol: \${results.protocol}
            </div>\`;

            ['summarizer', 'translator', 'writer', 'languageModel'].forEach(api => {
                const available = results[api];
                html += \`<div class="status \${available ? 'success' : 'error'}">
                    \${available ? '✅' : '❌'} \${api.charAt(0).toUpperCase() + api.slice(1)} API
                </div>\`;
            });

            html += '<pre>' + JSON.stringify(results, null, 2) + '</pre>';
            resultsDiv.innerHTML = html;

            testResults.availability = results;
            updateComprehensiveResults();
        }

        async function testSummarizerAPI() {
            const resultsDiv = document.getElementById('summarizerTest');
            resultsDiv.innerHTML = '<p>Testing Summarizer API...</p>';

            try {
                const chromeAI = ('ai' in self ? self.ai : undefined);
                if (!chromeAI?.summarizer) {
                    throw new Error('Summarizer API not available');
                }

                // Test capabilities first
                const capabilities = await chromeAI.summarizer.capabilities();
                
                // Create summarizer instance
                const summarizer = await chromeAI.summarizer.create({
                    type: 'key-points',
                    format: 'plain-text',
                    length: 'medium'
                });

                // Test summarization
                const testText = "FocusMate is an AI-powered text productivity web application that helps users summarize and extract tasks from their text using Chrome's built-in AI capabilities. The application features a clean, modern interface with dark/light theme support, voice input functionality, file upload capabilities, and session persistence. It leverages Chrome's on-device AI APIs for privacy-focused text processing without requiring external API keys or servers.";
                
                const startTime = Date.now();
                const result = await summarizer.summarize(testText);
                const endTime = Date.now();

                const testResult = {
                    success: true,
                    capabilities: capabilities,
                    input: testText,
                    output: result,
                    processingTime: endTime - startTime,
                    timestamp: new Date().toISOString()
                };

                let html = '<div class="test-result">';
                html += '<div class="status success">✅ Summarizer API Test Passed</div>';
                html += \`<strong>Processing Time:</strong> \${testResult.processingTime}ms<br>\`;
                html += \`<strong>Input Length:</strong> \${testText.length} characters<br>\`;
                html += \`<strong>Output Length:</strong> \${result.length} characters<br>\`;
                html += '<strong>Capabilities:</strong><pre>' + JSON.stringify(capabilities, null, 2) + '</pre>';
                html += '<strong>Result:</strong><pre>' + result + '</pre>';
                html += '</div>';

                resultsDiv.innerHTML = html;
                testResults.summarizer = testResult;

            } catch (error) {
                const errorResult = {
                    success: false,
                    error: error.message,
                    timestamp: new Date().toISOString()
                };

                let html = '<div class="test-result">';
                html += '<div class="status error">❌ Summarizer API Test Failed</div>';
                html += \`<strong>Error:</strong> \${error.message}\`;
                html += '</div>';

                resultsDiv.innerHTML = html;
                testResults.summarizer = errorResult;
                testResults.errors.push(\`Summarizer: \${error.message}\`);
            }

            updateComprehensiveResults();
        }

        async function testTranslatorAPI() {
            const resultsDiv = document.getElementById('translatorTest');
            resultsDiv.innerHTML = '<p>Testing Translator API...</p>';

            try {
                const chromeAI = ('ai' in self ? self.ai : undefined);
                if (!chromeAI?.translator) {
                    throw new Error('Translator API not available');
                }

                // Test capabilities
                const capabilities = await chromeAI.translator.capabilities({
                    sourceLanguage: 'en',
                    targetLanguage: 'es'
                });

                if (capabilities.available === 'no') {
                    throw new Error('Translation not available for en->es');
                }

                // Create translator instance
                const translator = await chromeAI.translator.create({
                    sourceLanguage: 'en',
                    targetLanguage: 'es'
                });

                // Test translation
                const testText = "Hello, this is a test of the Chrome AI Translator API.";
                const startTime = Date.now();
                const result = await translator.translate(testText);
                const endTime = Date.now();

                const testResult = {
                    success: true,
                    capabilities: capabilities,
                    input: testText,
                    output: result,
                    processingTime: endTime - startTime,
                    timestamp: new Date().toISOString()
                };

                let html = '<div class="test-result">';
                html += '<div class="status success">✅ Translator API Test Passed</div>';
                html += \`<strong>Processing Time:</strong> \${testResult.processingTime}ms<br>\`;
                html += \`<strong>Input:</strong> "\${testText}"<br>\`;
                html += \`<strong>Output:</strong> "\${result}"<br>\`;
                html += '<strong>Capabilities:</strong><pre>' + JSON.stringify(capabilities, null, 2) + '</pre>';
                html += '</div>';

                resultsDiv.innerHTML = html;
                testResults.translator = testResult;

            } catch (error) {
                const errorResult = {
                    success: false,
                    error: error.message,
                    timestamp: new Date().toISOString()
                };

                let html = '<div class="test-result">';
                html += '<div class="status error">❌ Translator API Test Failed</div>';
                html += \`<strong>Error:</strong> \${error.message}\`;
                html += '</div>';

                resultsDiv.innerHTML = html;
                testResults.translator = errorResult;
                testResults.errors.push(\`Translator: \${error.message}\`);
            }

            updateComprehensiveResults();
        }

        function updateComprehensiveResults() {
            const resultsDiv = document.getElementById('comprehensiveResults');
            
            let html = '<h3>Test Summary:</h3>';
            
            if (testResults.availability) {
                const available = testResults.availability;
                html += \`<div class="status \${available.globalAI ? 'success' : 'error'}">
                    \${available.globalAI ? '✅' : '❌'} Chrome AI Available
                </div>\`;
            }

            if (testResults.summarizer) {
                html += \`<div class="status \${testResults.summarizer.success ? 'success' : 'error'}">
                    \${testResults.summarizer.success ? '✅' : '❌'} Summarizer API
                </div>\`;
            }

            if (testResults.translator) {
                html += \`<div class="status \${testResults.translator.success ? 'success' : 'error'}">
                    \${testResults.translator.success ? '✅' : '❌'} Translator API
                </div>\`;
            }

            if (testResults.errors.length > 0) {
                html += '<h4>Errors:</h4><ul>';
                testResults.errors.forEach(error => {
                    html += \`<li class="status error">\${error}</li>\`;
                });
                html += '</ul>';
            }

            html += '<h4>Full Results:</h4>';
            html += '<pre>' + JSON.stringify(testResults, null, 2) + '</pre>';

            resultsDiv.innerHTML = html;
        }

        function runComprehensiveTest() {
            checkAPIAvailability();
            setTimeout(() => testSummarizerAPI(), 1000);
            setTimeout(() => testTranslatorAPI(), 2000);
        }

        // Auto-run on page load
        window.addEventListener('DOMContentLoaded', () => {
            checkAPIAvailability();
        });
    </script>
</body>
</html>`;

    const testPath = path.join(__dirname, 'chrome-ai-test.html');
    fs.writeFileSync(testPath, testHTML);
    
    console.log('✅ Created chrome-ai-test.html');
    console.log('   Open this file in Chrome to test Chrome AI APIs');
    console.log('   Make sure Chrome AI features are enabled in chrome://flags');
}

// Create the test
createChromeAITestHTML();

console.log('\n🎉 Chrome AI test created successfully!');
console.log('\n📋 Testing Instructions:');
console.log('1. Open chrome-ai-test.html in Chrome');
console.log('2. Ensure Chrome AI features are enabled:');
console.log('   - Go to chrome://flags');
console.log('   - Enable AI-related flags');
console.log('   - Restart Chrome');
console.log('3. Run the comprehensive test');
console.log('4. Check that Summarizer API works (most important for FocusMate)');

export { createChromeAITestHTML };
