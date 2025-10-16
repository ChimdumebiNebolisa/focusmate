# 🧠 FocusMate

**Transform your thoughts into clear, actionable content with AI-powered tools**

FocusMate is a modern single-page web application that helps you organize and enhance your text using Chrome's on-device AI capabilities. Whether you're summarizing notes or extracting tasks, FocusMate makes your ideas instantly actionable.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_Now-success?style=for-the-badge&logo=vercel&logoColor=white)](https://focusmate-tau.vercel.app/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://focusmate-tau.vercel.app/)

![FocusMate Hero](https://img.shields.io/badge/FocusMate-AI%20Powered-blue?style=for-the-badge&logo=chrome&logoColor=white)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7+-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🧩 **Overview**

FocusMate streamlines how you handle written content.  
Whether it's an article, a report, or notes — FocusMate uses AI to help you **condense** and **organize** text into actionable insights without needing external APIs or servers.

---

## 🌐 **Live Demo & Deployment**

### 🚀 [Try FocusMate Now](https://focusmate-tau.vercel.app/)

**Live Application**: [https://focusmate-tau.vercel.app/](https://focusmate-tau.vercel.app/)

**Deployment Platform**: Vercel  
**Build System**: Automatic deployment on Git push  
**Browser Requirements**: Chrome 138+ for full AI features (voice input works in all browsers)

**Key Features Available in Live Demo:**
- ✅ AI-powered text summarization (4 processing modes)
- ✅ Voice input with real-time transcription
- ✅ File upload support (.txt, .pdf, .docx)
- ✅ Dark/Light theme toggle
- ✅ Auto-save functionality
- ✅ Keyboard shortcuts for power users
- ✅ Responsive design (desktop, tablet, mobile)

---

## ⚡ **Core Features**

| Feature | Description |
|----------|--------------|
| **AI Summarization** | Condense long text while preserving key ideas and structure using Chrome's built-in AI. |
| **Multiple Processing Modes** | Academic, Concise, Creative, and Conversational summarization styles. |
| **Voice Input** | Speak your thoughts and convert them to text instantly using Web Speech API. |
| **File Upload** | Upload .txt, .pdf, or .docx files for processing (up to 50KB). |
| **On-Device AI** | All processing happens locally in your browser - no external APIs or data sharing. |
| **Smart Error Handling** | Intelligent fallback messaging and AI status monitoring. |

No timers. No distractions. No backend required. Just pure, focused text enhancement powered by cutting-edge browser AI.

---

## 🧠 **How It Works**

FocusMate leverages **Chrome's built-in AI capabilities** (Summarizer API) to process text **locally in the browser**, ensuring privacy and instant performance.

1. **Input**: Paste, type, speak, or upload your text.  
2. **Processing**: Choose your preferred summarization style (Academic, Concise, Creative, or Conversational).  
3. **AI Magic**: Chrome's on-device AI processes your text locally.
4. **Output**: Instantly view your AI-enhanced summary — no backend or API keys required.

**Privacy-First**: All processing happens in your browser. Your text never leaves your device.

---

## ✨ Features

### 🤖 AI-Powered Text Processing
- **Smart Summarization**: Condense text while keeping core meaning and structure
- **4 Processing Modes**: Academic, Concise, Creative, Conversational
- **Intelligent Error Handling**: Graceful fallbacks when AI features aren't available
- **Real-time Status Monitoring**: Live AI availability checking

### 🎤 Voice Input
- **Speech-to-Text**: Convert voice to text using Web Speech API
- **Real-time Transcription**: Live voice recognition with confidence scoring
- **Error Handling**: Clear error messages for common issues

### 📁 File Upload
- **Multiple Formats**: Support for .txt, .pdf, and .docx files
- **Size Limits**: Maximum 50KB file size for optimal performance
- **Text Extraction**: Automatic text extraction from uploaded files

### 💾 Data Persistence
- **Auto-save**: Automatically saves your work to localStorage
- **Session Recovery**: Restore your last session when you return
- **No Backend**: All data stays on your device

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Keyboard Shortcuts**: Power user features for efficiency
- **Smooth Animations**: Framer Motion powered interactions

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

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Chrome Built-in AI APIs
- **Voice**: Web Speech API
- **Storage**: localStorage

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
- ✅ Text Summarization (4 processing modes)
- ✅ Intelligent error handling and fallbacks

### Universal Features
- ✅ Voice Input (Web Speech API)
- ✅ File Upload
- ✅ Dark/Light Theme
- ✅ Keyboard Shortcuts
- ✅ Data Persistence

---

## 📱 **Usage**

1. **Text Input**: Type directly, use voice input, or upload a file
2. **Select Mode**: Choose Academic, Concise, Creative, or Conversational
3. **Process**: Click Summarize to generate your AI-powered summary
4. **Export**: Copy to clipboard or download as .txt file

**Pro Tip**: Use keyboard shortcuts (`⌘1` for summarize, `⌘⏎` for quick process) for faster workflow!

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