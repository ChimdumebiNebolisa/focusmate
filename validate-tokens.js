/**
 * Origin Token Validation Script
 * Validates that all origin tokens in the HTML file are properly configured
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function validateOriginTokens() {
    console.log('🔍 Validating Origin Tokens for FocusMate...\n');

    try {
        // Read the HTML file
        const htmlPath = path.join(__dirname, 'index.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Extract origin trial tokens
        const originTrialRegex = /<meta http-equiv="origin-trial" content="([^"]+)">/g;
        const tokens = [];
        let match;

        while ((match = originTrialRegex.exec(htmlContent)) !== null) {
            tokens.push(match[1]);
        }

        console.log(`Found ${tokens.length} origin trial tokens\n`);

        const results = [];

        tokens.forEach((token, index) => {
            console.log(`Token ${index + 1}:`);
            console.log(`Raw: ${token.substring(0, 50)}...`);

            try {
                // Decode base64 token
                const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
                const tokenData = JSON.parse(decodedToken);

                console.log(`✅ Valid JSON`);
                console.log(`   Feature: ${tokenData.feature}`);
                console.log(`   Origin: ${tokenData.origin}`);
                console.log(`   Expires: ${new Date(tokenData.expiry * 1000).toLocaleDateString()}`);
                console.log(`   Subdomain: ${tokenData.isSubdomain ? 'Yes' : 'No'}`);

                // Check if token is expired
                const isExpired = tokenData.expiry * 1000 < Date.now();
                if (isExpired) {
                    console.log(`⚠️  Token is EXPIRED`);
                } else {
                    console.log(`✅ Token is active`);
                }

                results.push({
                    index: index + 1,
                    valid: true,
                    expired: isExpired,
                    data: tokenData
                });

            } catch (error) {
                console.log(`❌ Invalid token: ${error.message}`);
                results.push({
                    index: index + 1,
                    valid: false,
                    error: error.message
                });
            }

            console.log('');
        });

        // Summary
        const validTokens = results.filter(r => r.valid && !r.expired);
        const expiredTokens = results.filter(r => r.valid && r.expired);
        const invalidTokens = results.filter(r => !r.valid);

        console.log('📊 SUMMARY:');
        console.log(`✅ Valid Active Tokens: ${validTokens.length}`);
        console.log(`⚠️  Expired Tokens: ${expiredTokens.length}`);
        console.log(`❌ Invalid Tokens: ${invalidTokens.length}`);

        if (expiredTokens.length > 0) {
            console.log('\n⚠️  EXPIRED TOKENS:');
            expiredTokens.forEach(token => {
                console.log(`   Token ${token.index}: ${token.data.feature} (expired ${new Date(token.data.expiry * 1000).toLocaleDateString()})`);
            });
        }

        if (invalidTokens.length > 0) {
            console.log('\n❌ INVALID TOKENS:');
            invalidTokens.forEach(token => {
                console.log(`   Token ${token.index}: ${token.error}`);
            });
        }

        // Check required features
        const requiredFeatures = [
            'AIPromptAPIMultimodalInput',
            'AISummarizationAPI', 
            'AIRewriterAPI'
        ];

        console.log('\n🎯 REQUIRED FEATURES CHECK:');
        requiredFeatures.forEach(feature => {
            const hasFeature = validTokens.some(token => token.data.feature === feature);
            console.log(`${hasFeature ? '✅' : '❌'} ${feature}: ${hasFeature ? 'Available' : 'Missing'}`);
        });

        return {
            total: tokens.length,
            valid: validTokens.length,
            expired: expiredTokens.length,
            invalid: invalidTokens.length,
            results
        };

    } catch (error) {
        console.error('❌ Error reading HTML file:', error.message);
        return null;
    }
}

// Run validation if this script is executed directly
const results = validateOriginTokens();

if (results) {
    // Exit with error code if there are issues
    if (results.invalid > 0 || results.expired > 0) {
        process.exit(1);
    } else {
        console.log('\n🎉 All origin tokens are valid and active!');
        process.exit(0);
    }
} else {
    process.exit(1);
}

export { validateOriginTokens };
