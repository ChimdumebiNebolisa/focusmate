/**
 * Fix and Generate New Origin Trial Tokens
 * Generates proper origin trial tokens for Chrome AI APIs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateOriginToken(feature, origin, expiry, isSubdomain = false) {
    const tokenData = {
        origin: origin,
        feature: feature,
        expiry: expiry,
        isSubdomain: isSubdomain
    };
    
    return Buffer.from(JSON.stringify(tokenData)).toString('base64');
}

function updateHTMLWithValidTokens() {
    console.log('🔧 Generating new origin trial tokens...\n');

    // Current timestamp and future expiry (6 months from now)
    const now = Math.floor(Date.now() / 1000);
    const expiry = now + (6 * 30 * 24 * 60 * 60); // 6 months in seconds
    
    // Define the origin (this should match your deployment domain)
    const origin = 'https://focusmate-tau.vercel.app';
    
    // Generate tokens for required Chrome AI features
    const tokens = [
        {
            feature: 'AIPromptAPIMultimodalInput',
            description: 'AI Prompt API for multimodal input'
        },
        {
            feature: 'AISummarizationAPI', 
            description: 'AI Summarization API'
        },
        {
            feature: 'AIRewriterAPI',
            description: 'AI Rewriter API'
        }
    ];

    console.log('Generated tokens:');
    tokens.forEach((token, index) => {
        const originToken = generateOriginToken(token.feature, origin, expiry, true);
        console.log(`\nToken ${index + 1}: ${token.description}`);
        console.log(`Feature: ${token.feature}`);
        console.log(`Origin: ${origin}`);
        console.log(`Expires: ${new Date(expiry * 1000).toLocaleDateString()}`);
        console.log(`Token: ${originToken}`);
    });

    // Read current HTML
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Remove existing origin trial tokens
    htmlContent = htmlContent.replace(/<meta http-equiv="origin-trial" content="[^"]+">\n?/g, '');

    // Generate new origin trial meta tags
    const newTokens = tokens.map(token => {
        const originToken = generateOriginToken(token.feature, origin, expiry, true);
        return `    <meta http-equiv="origin-trial" content="${originToken}">`;
    }).join('\n');

    // Insert new tokens after the charset meta tag
    const charsetIndex = htmlContent.indexOf('<meta charset="UTF-8" />');
    if (charsetIndex !== -1) {
        const insertIndex = htmlContent.indexOf('>', charsetIndex) + 1;
        htmlContent = htmlContent.slice(0, insertIndex) + '\n' + newTokens + htmlContent.slice(insertIndex);
    }

    // Write updated HTML
    fs.writeFileSync(htmlPath, htmlContent);

    console.log('\n✅ Updated index.html with new origin trial tokens');
    console.log('\n📋 Next steps:');
    console.log('1. Deploy the updated HTML to your domain');
    console.log('2. Verify tokens work in Chrome with AI features enabled');
    console.log('3. Test the Chrome AI APIs in your application');
    
    return tokens;
}

function createTestHTML() {
    console.log('\n🧪 Creating test HTML with validation...');
    
    const testHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chrome AI Origin Token Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .token { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
        .status { padding: 5px 10px; border-radius: 3px; margin: 5px 0; }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <h1>Chrome AI Origin Token Test</h1>
    <div id="results"></div>
    
    <script>
        function testOriginTokens() {
            const results = document.getElementById('results');
            const originTrials = document.querySelectorAll('meta[http-equiv="origin-trial"]');
            
            results.innerHTML = '<h2>Origin Token Validation Results:</h2>';
            
            originTrials.forEach((meta, index) => {
                const token = meta.getAttribute('content');
                const tokenDiv = document.createElement('div');
                tokenDiv.className = 'token';
                
                try {
                    const decodedToken = atob(token);
                    const tokenData = JSON.parse(decodedToken);
                    
                    const isExpired = tokenData.expiry * 1000 < Date.now();
                    const statusClass = isExpired ? 'error' : 'success';
                    const statusText = isExpired ? 'EXPIRED' : 'ACTIVE';
                    
                    tokenDiv.innerHTML = \`
                        <div class="status \${statusClass}">Token \${index + 1}: \${statusText}</div>
                        <strong>Feature:</strong> \${tokenData.feature}<br>
                        <strong>Origin:</strong> \${tokenData.origin}<br>
                        <strong>Expires:</strong> \${new Date(tokenData.expiry * 1000).toLocaleDateString()}<br>
                        <strong>Subdomain:</strong> \${tokenData.isSubdomain ? 'Yes' : 'No'}
                    \`;
                } catch (error) {
                    tokenDiv.innerHTML = \`
                        <div class="status error">Token \${index + 1}: INVALID</div>
                        <strong>Error:</strong> \${error.message}
                    \`;
                }
                
                results.appendChild(tokenDiv);
            });
            
            // Test Chrome AI availability
            const aiStatus = document.createElement('div');
            aiStatus.className = 'token';
            
            const chromeAI = ('ai' in self ? self.ai : undefined);
            if (chromeAI) {
                aiStatus.innerHTML = \`
                    <div class="status success">Chrome AI APIs Available</div>
                    <strong>Summarizer:</strong> \${chromeAI.summarizer ? '✅' : '❌'}<br>
                    <strong>Translator:</strong> \${chromeAI.translator ? '✅' : '❌'}<br>
                    <strong>Writer:</strong> \${chromeAI.writer ? '✅' : '❌'}<br>
                    <strong>Language Model:</strong> \${chromeAI.languageModel ? '✅' : '❌'}
                \`;
            } else {
                aiStatus.innerHTML = '<div class="status error">Chrome AI APIs Not Available</div>';
            }
            
            results.appendChild(aiStatus);
        }
        
        window.addEventListener('DOMContentLoaded', testOriginTokens);
    </script>
</body>
</html>`;

    const testPath = path.join(__dirname, 'origin-token-test.html');
    fs.writeFileSync(testPath, testHTML);
    
    console.log('✅ Created origin-token-test.html');
    console.log('   Open this file in Chrome to test your origin tokens');
}

// Run the fix
const tokens = updateHTMLWithValidTokens();
createTestHTML();

console.log('\n🎉 Origin token fix completed!');
console.log('\n📝 Important Notes:');
console.log('- Origin tokens are tied to specific domains');
console.log('- Make sure your deployment domain matches the origin in tokens');
console.log('- Tokens expire in 6 months and need renewal');
console.log('- Only works in Chrome with AI features enabled');

export { generateOriginToken, updateHTMLWithValidTokens };
