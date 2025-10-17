# 🧠 FocusMate

**Transform your thoughts into clear, actionable content with AI-powered tools**

FocusMate is a modern single-page web application that helps you summarize text using Chrome's on-device AI capabilities. Whether you're condensing notes or processing documents, FocusMate makes your ideas instantly actionable.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_Now-success?style=for-the-badge&logo=vercel&logoColor=white)](https://focusmate-tau.vercel.app/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://focusmate-tau.vercel.app/)

![FocusMate Hero](https://img.shields.io/badge/FocusMate-AI%20Powered-blue?style=for-the-badge&logo=chrome&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.18-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🧩 **Overview**

FocusMate streamlines how you handle written content using Chrome's built-in AI. Whether it's an article, a report, or notes — FocusMate helps you **condense** and **organize** text into actionable insights without needing external APIs or servers.

**Privacy-First**: All processing happens in your browser. Your text never leaves your device.

---

## 📖 **The Story Behind FocusMate**

### What Inspired Me

The inspiration came from frustration with existing text processing tools that either required expensive API subscriptions or sent your data to external servers. I wanted a solution that:

- **Respected Privacy**: No data leaving my device
- **Was Cost-Effective**: No monthly subscriptions or API costs
- **Worked Instantly**: No network delays or rate limits
- **Was Accessible**: Simple interface anyone could use

When Chrome announced their built-in AI capabilities, I saw an opportunity to build something truly innovative - a text processing tool that runs entirely in your browser using on-device AI.

### What I Learned

**🔧 Technical Skills:**
- **Chrome AI APIs**: Deep dive into Chrome's on-device AI ecosystem, including the Summarizer API
- **React 19**: Latest features with hooks, context, and modern state management
- **TypeScript**: Building type-safe applications with proper error handling
- **Browser APIs**: Web Speech API, FileReader, and localStorage
- **Modern Build Tools**: Vite for lightning-fast development

**🎨 Design & UX:**
- **Progressive Enhancement**: Building apps that work everywhere but enhance with modern features
- **Error Handling**: Creating graceful fallbacks when AI features aren't available
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animation**: Using Framer Motion for smooth interactions

### How I Built It

**Phase 1: Foundation** - React + TypeScript + Vite setup with basic UI
**Phase 2: Chrome AI Integration** - Summarizer API with error handling and diagnostics
**Phase 3: Enhanced Features** - Voice input, file upload, session persistence
**Phase 4: Polish & Deployment** - Animations, keyboard shortcuts, Vercel deployment

### The Challenges I Faced

**🤖 Chrome AI API Complexity**
- Figuring out correct API endpoints (`self.ai.summarizer` vs deprecated `window.ai`)
- Understanding flag requirements and setup process
- Building robust error handling for AI unavailability scenarios

**📱 Browser Compatibility**
- Building graceful fallbacks when AI features aren't available
- Handling different Chrome versions and configurations
- Making voice input work in all browsers while AI features are Chrome-specific

**🔧 File Upload Limitations**
- Initially planned PDF/DOCX support but decided to focus on core AI functionality
- Only fully support .txt files with clear error messages for unsupported formats

### Key Insights

**Honesty in documentation is crucial** - rather than claiming features that don't fully work, I documented actual capabilities and limitations. This builds trust and sets proper expectations.

**Progressive enhancement** - building a solid foundation that works everywhere, then layering on advanced features for capable browsers.

---

## 🌐 **Live Demo**

### 🚀 [Try FocusMate Now](https://focusmate-tau.vercel.app/)

**Requirements**: Chrome 138+ for full AI features (voice input works in all browsers)

**Features Available:**
- ✅ AI-powered text summarization with context modes
- ✅ Voice input with real-time transcription
- ✅ File upload support (.txt files only)
- ✅ Dark/Light theme toggle
- ✅ Auto-save functionality
- ✅ Keyboard shortcuts
- ✅ Responsive design
- ✅ Built-in diagnostic tools

---

## ⚡ **Features**

| Feature | Description |
|---------|-------------|
| **AI Summarization** | Condense text while preserving key ideas using Chrome's Summarizer API |
| **Context Modes** | Academic, Concise, Creative, and Conversational modifiers |
| **Voice Input** | Speech-to-text using Web Speech API |
| **File Upload** | Upload .txt files (up to 50KB). PDF/DOCX support planned |
| **On-Device AI** | All processing happens locally - no external APIs |
| **Smart Error Handling** | Intelligent fallbacks and real-time AI status monitoring |

---

## 🧠 **How It Works**

1. **Input**: Paste, type, speak, or upload your text
2. **Processing**: Choose your context mode (Academic, Concise, Creative, or Conversational)
3. **AI Magic**: Chrome's on-device AI processes your text locally
4. **Output**: Instantly view your AI-enhanced summary

---

## 🏗️ **Architecture**

```
src/
├── components/
│   └── ErrorBoundary.tsx
├── context/
│   └── ThemeContext.tsx
├── hooks/
│   └── useSpeechRecognition.ts
├── utils/
│   ├── aiDiagnostics.ts
│   ├── aiStatusMonitor.ts
│   ├── checkAI.ts
│   ├── chromeAI.ts
│   ├── fileUpload.ts
│   └── localStorage.ts
├── App.tsx
└── main.tsx
```

**Key Implementation Highlights:**
- **AI Status Monitoring**: Real-time health checks and intelligent fallback messaging
- **Error Handling**: Distinguishes between temporary failures and genuine AI unavailability
- **Session Persistence**: Auto-save functionality using localStorage
- **Diagnostic Tools**: Built-in diagnostic page and utilities

---

## 🚀 **Quick Start**

### Try the Live Demo
[https://focusmate-tau.vercel.app/](https://focusmate-tau.vercel.app/) - works immediately in Chrome 138+

### Local Development

**Prerequisites**: Chrome 138+ (for AI features), Node.js 18+

```bash
git clone https://github.com/ChimdumebiNebolisa/focusmate.git
cd focusmate
npm install
npm run dev
```

Navigate to `http://localhost:5173` in Chrome 138+

### Production Build
```bash
npm run build
npm run preview
```

**Deployment**: Auto-deployed to Vercel on push to master

---

## ⌨️ **Keyboard Shortcuts**

| Shortcut | Action |
|----------|--------|
| `⌘1` | Summarize text |
| `⌘⏎` | Quick process |
| `⌘C` | Copy output |
| `⌘D` | Download output |
| `Esc` | Clear all |

---

## 🛠️ **Tech Stack**

- **Frontend**: React 19.1.1, TypeScript 5.9.3, Tailwind CSS 3.4.18
- **Build Tool**: Vite 7.1.7
- **Animations**: Framer Motion 12.23.22
- **Icons**: Lucide React 0.544.0
- **AI**: Chrome Built-in AI APIs (Summarizer API)
- **Voice**: Web Speech API
- **Storage**: localStorage
- **Deployment**: Vercel

---

## 🔧 **Browser Compatibility**

### Chrome AI Features (Chrome 138+)
- ✅ Text Summarization with context modes
- ✅ Intelligent error handling and fallbacks
- ✅ Real-time AI status monitoring

### Universal Features
- ✅ Voice Input (Web Speech API)
- ✅ File Upload (.txt files)
- ✅ Dark/Light Theme
- ✅ Keyboard Shortcuts
- ✅ Data Persistence

**Setup Requirements**: See [CHROME_AI_SETUP.md](./CHROME_AI_SETUP.md) for detailed Chrome AI configuration

---

## 📱 **Usage**

1. **Text Input**: Type directly, use voice input, or upload a .txt file
2. **Select Context Mode**: Choose Academic, Concise, Creative, or Conversational
3. **Process**: Click Summarize to generate your AI-powered summary
4. **Export**: Copy to clipboard or download as .txt file

**Pro Tip**: Use keyboard shortcuts (`⌘1` for summarize, `⌘⏎` for quick process) for faster workflow!

---

## 🔧 **Troubleshooting**

### Chrome AI Setup Issues
1. **Run Diagnostics**: Visit `ai-diagnostic.html` for health checks
2. **Check Chrome Version**: Ensure Chrome 138 or later
3. **Enable Flags**: Follow [CHROME_AI_SETUP.md](./CHROME_AI_SETUP.md)
4. **Download AI Model**: Ensure 2GB model is downloaded in `chrome://components`

### Common Issues
- **"AI object not available"**: Update Chrome, enable flags, restart
- **"Model not downloaded"**: Check `chrome://components`, ensure 22GB free storage
- **"Voice input not working"**: Check microphone permissions, ensure HTTPS

### Diagnostic Tools
- **Built-in Diagnostics**: `ai-diagnostic.html`
- **Status Monitor**: Real-time AI availability in app
- **Setup Guide**: Step-by-step Chrome AI configuration

---

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- Chrome Built-in AI APIs for on-device processing
- Web Speech API for voice input
- React and Vite for the development experience
- Tailwind CSS for styling
- Framer Motion for animations

---

**Made with ❤️ by [Chimdumebi Nebolisa](https://github.com/ChimdumebiNebolisa)**