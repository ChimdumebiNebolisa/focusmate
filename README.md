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

FocusMate streamlines how you handle written content.  
Whether it's an article, a report, or notes — FocusMate uses Chrome's built-in AI to help you **condense** and **organize** text into actionable insights without needing external APIs or servers.

---

## 📖 **The Story Behind FocusMate**

### What Inspired Me

The inspiration for FocusMate came from my frustration with existing text processing tools that either required expensive API subscriptions or sent your data to external servers. I was working on research projects and found myself constantly needing to summarize long documents, but I wanted a solution that:

- **Respected Privacy**: No data leaving my device
- **Was Cost-Effective**: No monthly subscriptions or API costs
- **Worked Instantly**: No network delays or rate limits
- **Was Accessible**: Simple interface anyone could use

When Chrome announced their built-in AI capabilities, I saw an opportunity to build something truly innovative - a text processing tool that runs entirely in your browser using on-device AI.

### What I Learned

Building FocusMate was an incredible learning journey that taught me:

**🔧 Technical Skills:**
- **Chrome AI APIs**: Deep dive into Chrome's new on-device AI ecosystem, including the Summarizer API and proper feature detection
- **React 19**: Leveraging the latest React features with hooks, context, and modern state management
- **TypeScript**: Building type-safe applications with proper error handling and developer experience
- **Browser APIs**: Web Speech API for voice input, FileReader for file uploads, and localStorage for persistence
- **Modern Build Tools**: Vite for lightning-fast development and optimized production builds

**🎨 Design & UX:**
- **Progressive Enhancement**: Building apps that work everywhere but enhance with modern features
- **Error Handling**: Creating graceful fallbacks when AI features aren't available
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animation**: Using Framer Motion for smooth, delightful interactions

**🚀 Deployment & DevOps:**
- **Vercel Integration**: Automated deployments with proper routing configuration
- **Origin Trial Tokens**: Setting up Chrome AI API access for production domains
- **Diagnostic Tools**: Building comprehensive health checks and troubleshooting utilities

### How I Built It

The development process followed a systematic approach:

**Phase 1: Foundation (Week 1)**
- Set up the React + TypeScript + Vite development environment
- Implemented basic UI with Tailwind CSS
- Created the core component structure with proper state management

**Phase 2: Chrome AI Integration (Week 2)**
- Researched Chrome's AI APIs and feature detection
- Implemented the Summarizer API with proper error handling
- Built comprehensive diagnostic tools to troubleshoot AI setup issues
- Created the `CHROME_AI_SETUP.md` guide for users

**Phase 3: Enhanced Features (Week 3)**
- Added voice input using Web Speech API
- Implemented file upload functionality (with honest limitations)
- Built session persistence with localStorage
- Created real-time AI status monitoring

**Phase 4: Polish & Deployment (Week 4)**
- Added smooth animations with Framer Motion
- Implemented keyboard shortcuts for power users
- Created comprehensive error handling and fallback messages
- Deployed to Vercel with proper configuration

### The Challenges I Faced

**🤖 Chrome AI API Complexity**
The biggest challenge was working with Chrome's new AI APIs, which are still experimental and have limited documentation. I spent significant time:
- Figuring out the correct API endpoints (`self.ai.summarizer` vs deprecated `window.ai`)
- Understanding the flag requirements and setup process
- Building robust error handling for various AI unavailability scenarios
- Creating diagnostic tools to help users troubleshoot setup issues

**📱 Browser Compatibility**
Ensuring the app works across different scenarios was tricky:
- Building graceful fallbacks when AI features aren't available
- Handling different Chrome versions and flag configurations
- Creating clear error messages that guide users to solutions
- Making voice input work in all browsers while AI features are Chrome-specific

**🔧 File Upload Limitations**
I initially planned to support PDF and DOCX parsing, but realized this would require heavy client-side libraries that would bloat the bundle. I made the difficult decision to:
- Only fully support .txt files
- Provide clear error messages for unsupported formats
- Focus on the core AI functionality instead of complex file parsing

**⚡ Performance Optimization**
Ensuring smooth performance with AI processing:
- Implementing proper loading states and user feedback
- Building efficient error handling that doesn't block the UI
- Creating smart caching and session management
- Optimizing bundle size while maintaining functionality

**🎯 User Experience**
Balancing simplicity with power user features:
- Creating an intuitive interface that works for beginners
- Adding keyboard shortcuts for advanced users
- Building comprehensive help and diagnostic systems
- Ensuring the app is accessible and responsive

### Key Insights

Through this project, I learned that **honesty in documentation is crucial**. Rather than claiming features that don't fully work, I documented the actual capabilities and limitations. This approach builds trust and sets proper expectations.

I also discovered the power of **progressive enhancement** - building a solid foundation that works everywhere, then layering on advanced features for capable browsers. This ensures FocusMate remains useful even when AI features aren't available.

---

## 🌐 **Live Demo & Deployment**

### 🚀 [Try FocusMate Now](https://focusmate-tau.vercel.app/)

**Live Application**: [https://focusmate-tau.vercel.app/](https://focusmate-tau.vercel.app/)

**Deployment Platform**: Vercel  
**Build System**: Automatic deployment on Git push  
**Browser Requirements**: Chrome 138+ for full AI features (voice input works in all browsers)

**Key Features Available in Live Demo:**
- ✅ AI-powered text summarization with context modes
- ✅ Voice input with real-time transcription
- ✅ File upload support (.txt files only)
- ✅ Dark/Light theme toggle
- ✅ Auto-save functionality
- ✅ Keyboard shortcuts for power users
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Comprehensive diagnostic tools

---

## ⚡ **Core Features**

| Feature | Description |
|---------|-------------|
| **AI Summarization** | Condense long text while preserving key ideas using Chrome's built-in Summarizer API. |
| **Context Modes** | Academic, Concise, Creative, and Conversational context modifiers for different summary styles. |
| **Voice Input** | Speak your thoughts and convert them to text instantly using Web Speech API. |
| **File Upload** | Upload .txt files for processing (up to 50KB). Note: PDF/DOCX support is planned for future versions. |
| **On-Device AI** | All processing happens locally in your browser - no external APIs or data sharing. |
| **Smart Error Handling** | Intelligent fallback messaging and real-time AI status monitoring. |

No timers. No distractions. No backend required. Just pure, focused text enhancement powered by cutting-edge browser AI.

---

## 🧠 **How It Works**

FocusMate leverages **Chrome's built-in AI capabilities** (Summarizer API) to process text **locally in the browser**, ensuring privacy and instant performance.

1. **Input**: Paste, type, speak, or upload your text.  
2. **Processing**: Choose your preferred context mode (Academic, Concise, Creative, or Conversational).  
3. **AI Magic**: Chrome's on-device AI processes your text locally using the Summarizer API.
4. **Output**: Instantly view your AI-enhanced summary — no backend or API keys required.

**Privacy-First**: All processing happens in your browser. Your text never leaves your device.

---

## ✨ **Detailed Features**

### 🤖 AI-Powered Text Processing
- **Smart Summarization**: Condense text while keeping core meaning and structure
- **4 Context Modes**: Academic, Concise, Creative, Conversational (these add context to the AI prompt)
- **Intelligent Error Handling**: Graceful fallbacks when AI features aren't available
- **Real-time Status Monitoring**: Live AI availability checking with health checks

### 🎤 Voice Input
- **Speech-to-Text**: Convert voice to text using Web Speech API
- **Real-time Transcription**: Live voice recognition with confidence scoring
- **Error Handling**: Clear error messages for common issues
- **Cross-Browser Support**: Works in all modern browsers

### 📁 File Upload
- **Supported Formats**: .txt files (up to 50KB)
- **Planned Support**: PDF and DOCX parsing (currently shows helpful error messages)
- **Text Extraction**: Automatic text extraction from uploaded files
- **Size Limits**: 50KB maximum for optimal performance

### 💾 Data Persistence
- **Auto-save**: Automatically saves your work to localStorage
- **Session Recovery**: Restore your last session when you return
- **No Backend**: All data stays on your device

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Keyboard Shortcuts**: Power user features for efficiency
- **Smooth Animations**: Framer Motion powered interactions
- **Error Boundaries**: Robust error handling to prevent crashes

### 🔧 Diagnostic Tools
- **AI Status Monitor**: Real-time health checks and availability detection
- **Comprehensive Diagnostics**: Built-in diagnostic page (`ai-diagnostic.html`)
- **Setup Guidance**: Detailed Chrome AI setup instructions
- **Troubleshooting**: Clear error messages with actionable solutions

---

## 🏗️ **Architecture**

### Project Structure
```
src/
├── components/
│   └── ErrorBoundary.tsx          # Error boundary for crash prevention
├── context/
│   └── ThemeContext.tsx           # Dark/light theme management
├── hooks/
│   └── useSpeechRecognition.ts    # Voice input hook with Web Speech API
├── utils/
│   ├── aiDiagnostics.ts          # Comprehensive AI diagnostic utilities
│   ├── aiStatusMonitor.ts        # Real-time AI health monitoring
│   ├── checkAI.ts               # Chrome AI feature detection
│   ├── chromeAI.ts              # Core AI integration (Summarizer API)
│   ├── fileUpload.ts            # File upload and text extraction
│   └── localStorage.ts          # Session persistence management
├── App.tsx                      # Main application component
└── main.tsx                     # Application entry point
```

### Key Implementation Highlights

**AI Status Monitoring**: Real-time health checks via `aiStatusMonitor` that continuously monitors Chrome AI availability and provides intelligent fallback messaging.

**Error Handling**: Comprehensive error handling system that distinguishes between temporary failures and genuine AI unavailability, providing appropriate user guidance.

**Session Persistence**: Auto-save functionality using localStorage that preserves your work across browser sessions.

**Diagnostic Tools**: Built-in diagnostic page and utilities that help users troubleshoot Chrome AI setup issues.

---

## 🚀 **Quick Start**

### 🌐 Try the Live Demo First
**Best way to get started**: [https://focusmate-tau.vercel.app/](https://focusmate-tau.vercel.app/)

The live demo includes all features and works immediately in Chrome 138+. No installation required!

### 🛠️ Local Development

#### Prerequisites
- **Chrome 138+** (for AI features)
- **Node.js 18+** (for development)

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChimdumebiNebolisa/focusmate.git
   cd focusmate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in Chrome**
   - Navigate to `http://localhost:5173`
   - Ensure you're using Chrome 138+ for AI features

#### Building for Production

```bash
npm run build
npm run preview
```

### 🚀 Production Deployment

**Deployed on**: [Vercel](https://vercel.com)  
**Auto-deployment**: Triggered on every push to `main` branch  
**Build command**: `npm run build`  
**Output directory**: `dist`

---

## ⌨️ **Keyboard Shortcuts**

| Shortcut | Action |
|----------|--------|
| `⌘1` | Summarize text |
| `⌘⏎` | Quick process (last used action) |
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

## 🏆 **Technical Highlights**

### **Modern AI Integration**
- **Cutting-edge Technology**: First-class integration with Chrome's latest AI APIs (Summarizer API)
- **On-Device Processing**: Zero external API calls - all AI processing happens locally
- **Privacy by Design**: No data leaves the user's browser, ensuring complete privacy

### **Performance & UX**
- **Instant Results**: No network latency - AI processing is immediate
- **Intelligent Error Handling**: Graceful fallbacks with user-friendly messaging
- **Real-time Status Monitoring**: Live AI availability detection and health checks
- **Progressive Enhancement**: Core functionality works in all browsers, AI features enhance the experience

### **Developer Experience**
- **TypeScript**: Full type safety and excellent developer experience
- **Modern React**: Latest React 19 features with hooks and functional components
- **Component Architecture**: Clean, reusable components with proper separation of concerns
- **State Management**: Efficient local state management with React hooks
- **Build Optimization**: Vite-powered fast builds and hot module replacement

### **Production Ready**
- **Automated Deployment**: CI/CD pipeline with Vercel for instant deployments
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Keyboard shortcuts and proper ARIA labels
- **Error Boundaries**: Robust error handling to prevent crashes
- **Performance Monitoring**: Built-in diagnostics and health checks

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

### Setup Requirements
For Chrome AI features, see our comprehensive setup guide: [CHROME_AI_SETUP.md](./CHROME_AI_SETUP.md)

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

If you're experiencing issues with AI features:

1. **Run Diagnostics**: Visit `ai-diagnostic.html` for comprehensive health checks
2. **Check Chrome Version**: Ensure you're using Chrome 138 or later
3. **Enable Flags**: Follow the setup guide in [CHROME_AI_SETUP.md](./CHROME_AI_SETUP.md)
4. **Download AI Model**: Ensure the 2GB AI model is downloaded in `chrome://components`

### Common Issues

**"AI object not available"**
- Update to Chrome 138+
- Enable required flags in `chrome://flags`
- Restart Chrome

**"Model not downloaded"**
- Check `chrome://components`
- Ensure 22GB free storage
- Wait for download to complete (5-30 minutes)

**"Voice input not working"**
- Check microphone permissions
- Ensure HTTPS connection
- Try a different browser if needed

### Diagnostic Tools

- **Built-in Diagnostics**: `ai-diagnostic.html` - Comprehensive health checks
- **Status Monitor**: Real-time AI availability in the app
- **Browser Info**: Detailed compatibility information
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