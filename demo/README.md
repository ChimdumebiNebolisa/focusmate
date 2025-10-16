# Chrome AI API Demo

This directory contains demo files to test Chrome's new built-in AI API.

## Files

- `chrome-ai-test.js` - JavaScript demo for browser console testing
- `chrome-ai-test.ts` - TypeScript demo with proper type definitions

## Usage

### JavaScript Demo
```bash
# Copy the contents of chrome-ai-test.js and paste into Chrome DevTools console
# Or include it in an HTML page
```

### TypeScript Demo
```bash
# Import and use in your TypeScript project
import { testChromeAI } from './chrome-ai-test';
await testChromeAI();
```

## Requirements

- Chrome Canary or Beta (version ≥ 128)
- AI flags enabled:
  - Go to `chrome://flags`
  - Enable "Prompt API for Gemini Nano"
  - Restart Chrome

## What it tests

✅ Feature detection for `self.ai.languageModel`  
✅ Session creation with `self.ai.languageModel.create()`  
✅ Prompt execution with `session.prompt()`  
✅ Error handling and fallbacks  
✅ API capabilities checking  

## Migration Notes

As of September 2025, `window.ai` has been deprecated in Chrome.  
The official replacement is `LanguageModel`, accessible via `self.ai.languageModel`.

### Old (Deprecated)
```js
await window.ai.getCompletion(...)
await window.ai.createSession(...)
```

### New (Current)
```js
const session = await self.ai.languageModel.create();
const result = await session.prompt("your text here");
```
