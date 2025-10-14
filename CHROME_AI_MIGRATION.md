# Chrome Built-in AI API Migration Guide

## Overview

This document explains the migration from the deprecated `window.ai` API to the new Chrome Built-in AI APIs.

## What Changed?

### API Access
**Old (Deprecated):**
```javascript
window.ai.summarizer
window.ai.rewriter
window.ai.prompt
window.ai.translator
```

**New (Current):**
```javascript
ai.summarizer          // or self.ai.summarizer
ai.writer              // replaces rewriter
ai.languageModel       // replaces prompt
ai.translator
```

### API Methods

#### 1. Summarization API

**Old:**
```javascript
const summarizer = await window.ai.summarizer.create();
const result = await summarizer.run({ text: input });
console.log(result.result);
```

**New:**
```javascript
const summarizer = await ai.summarizer.create({
  type: 'key-points',
  format: 'plain-text',
  length: 'medium'
});
const result = await summarizer.summarize(input);
console.log(result); // Direct string result
```

#### 2. Writer API (formerly Rewriter)

**Old:**
```javascript
const rewriter = await window.ai.rewriter.create();
const result = await rewriter.run({ 
  text: input, 
  context: "Make it professional" 
});
console.log(result.result);
```

**New:**
```javascript
const writer = await ai.writer.create({
  tone: 'neutral',
  format: 'plain-text',
  length: 'medium'
});
const result = await writer.write(input, { 
  context: "Make it professional" 
});
console.log(result); // Direct string result
```

#### 3. Language Model API (formerly Prompt)

**Old:**
```javascript
const prompt = await window.ai.prompt.create();
const result = await prompt.run({ 
  prompt: "Extract tasks from this text..." 
});
console.log(result.result);
```

**New:**
```javascript
const languageModel = await ai.languageModel.create({
  systemPrompt: 'You are a helpful assistant.',
  temperature: 0.7,
  topK: 3
});
const result = await languageModel.prompt(
  "Extract tasks from this text..."
);
console.log(result); // Direct string result
```

#### 4. Translator API

**Old:**
```javascript
const translator = await window.ai.translator.create();
const result = await translator.run({ 
  text: input, 
  targetLanguage: 'es' 
});
console.log(result.result);
```

**New:**
```javascript
const translator = await ai.translator.create({
  sourceLanguage: 'en',
  targetLanguage: 'es'
});
const result = await translator.translate(input);
console.log(result); // Direct string result
```

## Key Differences

### 1. Result Structure
- **Old API:** Results wrapped in `{ result: string }` object
- **New API:** Direct string results

### 2. Method Names
- `run()` → API-specific methods (`summarize()`, `write()`, `prompt()`, `translate()`)
- `rewriter` → `writer`
- `prompt` → `languageModel`

### 3. Configuration Options
The new APIs support more granular configuration:
- **Summarizer:** `type`, `format`, `length`
- **Writer:** `tone`, `format`, `length`
- **Language Model:** `systemPrompt`, `temperature`, `topK`
- **Translator:** `sourceLanguage`, `targetLanguage`

### 4. Access Pattern
```javascript
// Helper function to access the API
function getChromeAI() {
  return (typeof ai !== 'undefined' ? ai : (self as any).ai);
}
```

## Chrome Flags to Enable

Navigate to `chrome://flags` and enable:
- `#optimization-guide-on-device-model` - Downloads Gemini Nano model
- `#prompt-api-for-gemini-nano` - Enables Language Model API
- `#summarization-api-for-gemini-nano` - Enables Summarization API
- `#writer-api-for-gemini-nano` - Enables Writer API
- `#translation-api` - Enables Translation API

## Browser Requirements

- **Chrome Dev or Canary** (version 127+)
- **Supported OS:** Windows 10/11, macOS 13+, Linux
- **Minimum RAM:** 4GB (8GB+ recommended for better performance)

## Verification Steps

1. Open Chrome DevTools console
2. Check API availability:
   ```javascript
   console.log('Summarizer:', !!ai?.summarizer);
   console.log('Writer:', !!ai?.writer);
   console.log('Language Model:', !!ai?.languageModel);
   console.log('Translator:', !!ai?.translator);
   ```

3. Check capabilities:
   ```javascript
   (async () => {
     const caps = await ai.summarizer.capabilities();
     console.log('Summarizer capabilities:', caps);
   })();
   ```

## Updated Files

The following files have been updated in this migration:

1. **`src/utils/checkAI.ts`**
   - Updated TypeScript interfaces for new APIs
   - Changed from `window.ai` to global `ai`
   - Updated API names (rewriter → writer, prompt → languageModel)

2. **`src/utils/chromeAI.ts`**
   - Updated all API calls to use new methods
   - Changed result handling (no more `.result` property)
   - Added new configuration options

3. **`README.md`**
   - Updated Chrome flags section
   - Updated verification steps
   - Added deprecation notice for `window.ai`

## Common Issues & Solutions

### Issue: APIs not available
**Solution:** 
- Ensure you're using Chrome Dev/Canary 127+
- Enable all required flags in `chrome://flags`
- Restart Chrome completely
- Wait for model download (may take a few minutes on first use)

### Issue: "capabilities() returns 'no'"
**Solution:**
- Check your internet connection (needed for initial model download)
- Ensure sufficient disk space (model is ~2GB)
- Try `chrome://components` and update "Optimization Guide On Device Model"

### Issue: Slow initial responses
**Solution:**
- First use requires model loading (normal behavior)
- Subsequent calls will be much faster
- Consider showing a loading indicator on first use

## Testing Checklist

- [ ] Summarize text functionality works
- [ ] Rewrite/clean text functionality works
- [ ] Extract tasks functionality works
- [ ] Translation functionality works
- [ ] Error handling works when APIs unavailable
- [ ] Browser compatibility warnings display correctly
- [ ] Voice input continues to work (independent of AI APIs)

## Resources

- [Chrome Built-in AI Documentation](https://developer.chrome.com/docs/ai/built-in-apis)
- [Prompt API Guide](https://developer.chrome.com/docs/ai/built-in-apis#prompt_api)
- [Summarization API Guide](https://developer.chrome.com/docs/ai/built-in-apis#summarization_api)
- [Writer API Guide](https://developer.chrome.com/docs/ai/built-in-apis#writer_api)
- [Translation API Guide](https://developer.chrome.com/docs/ai/built-in-apis#translation_api)

## Next Steps

1. Deploy the updated code to Vercel
2. Test on your production domain
3. Clear browser cache and hard refresh
4. Verify all AI features work correctly
5. Monitor for any issues in production

---

**Migration completed:** October 14, 2025
**Updated by:** AI Assistant
**Reason:** `window.ai` deprecated in favor of Chrome Built-in AI APIs

