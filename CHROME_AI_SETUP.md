# Chrome AI Setup Guide for FocusMate

This guide provides comprehensive instructions for setting up Chrome AI features to work with FocusMate.

## Overview

FocusMate now uses Chrome's on-device AI APIs for text summarization. The implementation has been updated to properly detect and use the `summarizer` API instead of the deprecated `languageModel` API.

## Requirements

- **Chrome Version**: 138 or later
- **Browser**: Google Chrome (not Edge, Firefox, or Safari)
- **Storage**: 22GB free space for AI model download
- **GPU**: 4GB+ VRAM recommended
- **Internet**: Stable connection for initial model download

## Setup Steps

### 1. Update Chrome

1. Open Chrome and go to `chrome://settings/help`
2. Click "Update Google Chrome" if available
3. Or download from https://www.google.com/chrome/
4. Restart Chrome after updating

### 2. Enable Required Flags

1. Go to `chrome://flags`
2. Search for and enable these flags:
   - `#optimization-guide-on-device-model` (set to "Enabled BypassPerfRequirement")
   - `#prompt-api-for-gemini-nano`
   - `#summarization-api-for-gemini-nano`
3. Click "Relaunch" button

### 3. Download AI Model

1. Go to `chrome://components`
2. Find "Optimization Guide On Device Model"
3. Click "Check for update"
4. Wait for download to complete (2GB, takes 5-30 minutes)
5. Model should show as "Up to date"

### 4. Verify Setup

1. Open `chrome://on-device-internals`
2. Check "Model Status" tab
3. Should show "available"

### 5. Test in DevTools

1. Open DevTools (F12)
2. Run: `await ai.summarizer.create()`
3. Should not throw error

## Diagnostic Tools

### AI Diagnostic Page

Access the comprehensive diagnostic tool at `ai-diagnostic.html` which provides:

- Chrome version check
- Browser compatibility verification
- AI API availability testing
- Model download status
- Origin trial token validation
- Functional tests for Summarizer and Translator APIs

### Quick Status Check

Use the diagnostic utility in your code:

```typescript
import { getQuickStatus } from './utils/aiDiagnostics';

console.log(getQuickStatus()); // Returns current AI status
```

### Full Diagnostics

```typescript
import { runDiagnostics } from './utils/aiDiagnostics';

const results = await runDiagnostics();
console.log(results.overallStatus); // 'pass', 'fail', or 'partial'
```

## API Changes

### Updated Detection Logic

The code now properly checks for web-compatible APIs:

```typescript
// OLD (deprecated)
if (!chromeAI?.languageModel) { ... }

// NEW (correct for web pages)
if (!chromeAI?.summarizer) { ... }
```

### Available APIs in Web Pages

- ✅ **Summarizer API**: `chromeAI.summarizer` (primary)
- ✅ **Translator API**: `chromeAI.translator` (secondary)
- ❌ **Language Model API**: Only works in Chrome Extensions
- ❌ **Writer API**: Not yet released for web pages

## Origin Trial Tokens

Origin trial tokens have been added for:

- Production: `focusmate-tau.vercel.app`
- Development: `localhost:5173`, `localhost:3000`, `127.0.0.1:5173`

### Generate Custom Tokens

1. Visit https://developer.chrome.com/origintrials
2. Select AI API features:
   - AI Prompt API Multimodal Input
   - AI Summarization API
   - AI Rewriter API
3. Add your domain
4. Copy the generated tokens to your HTML `<head>`

## Troubleshooting

### Common Issues

1. **"AI object not available"**
   - Ensure Chrome 138+
   - Enable required flags
   - Restart Chrome

2. **"Model not downloaded"**
   - Check `chrome://components`
   - Ensure 22GB free storage
   - Stable internet connection

3. **"Origin trial token invalid"**
   - Generate new tokens for your domain
   - Ensure tokens are in HTML `<head>`
   - Check token expiration dates

4. **"Summarizer API not available"**
   - Enable `#summarization-api-for-gemini-nano` flag
   - Download AI model
   - Restart Chrome

### Error Messages

The updated error messages now provide specific, actionable instructions:

- Chrome version requirements
- Exact flag names and settings
- Model download instructions
- System requirements
- Expected download times

### Diagnostic Commands

```bash
# Check Chrome version
chrome://settings/help

# Enable flags
chrome://flags

# Download model
chrome://components

# Verify model status
chrome://on-device-internals

# Test AI APIs
# Open DevTools (F12) and run:
await ai.summarizer.create()
```

## Development

### Local Development

1. Start your dev server: `npm run dev`
2. Open `http://localhost:5173/ai-diagnostic.html`
3. Run diagnostics to verify setup
4. Test AI features in your app

### Production Deployment

1. Ensure origin trial tokens are configured
2. Test on production domain
3. Monitor AI model availability
4. Provide fallback for unsupported browsers

## Browser Compatibility

| Browser | AI Support | Fallback |
|---------|------------|----------|
| Chrome 138+ | ✅ Full support | N/A |
| Chrome <138 | ❌ Not supported | Voice input only |
| Edge | ❌ Not supported | Voice input only |
| Firefox | ❌ Not supported | Voice input only |
| Safari | ❌ Not supported | Voice input only |

## Performance Notes

- AI model download: 2GB, 5-30 minutes
- First API call: May take longer (model loading)
- Subsequent calls: Fast (model cached)
- Storage usage: 22GB for model + temporary files

## Support

If you encounter issues:

1. Run the diagnostic tool: `ai-diagnostic.html`
2. Check Chrome version and flags
3. Verify model download status
4. Test API availability in DevTools
5. Review error messages for specific guidance

## Files Modified

- `src/utils/chromeAI.ts` - Updated detection logic
- `src/utils/aiStatusMonitor.ts` - Enhanced error messages
- `src/utils/checkAI.ts` - Fixed API detection
- `src/utils/aiDiagnostics.ts` - New diagnostic utility
- `index.html` - Added origin trial tokens
- `ai-diagnostic.html` - New diagnostic page

## Next Steps

1. Test the implementation with Chrome 138+
2. Verify AI features work correctly
3. Update documentation as needed
4. Monitor for Chrome API updates


