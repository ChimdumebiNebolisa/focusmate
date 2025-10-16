# 🧠 FocusMate

**Transform your thoughts into clear, actionable content with AI-powered tools**

FocusMate is a modern single-page web application that helps you organize and enhance your text using Chrome's on-device AI capabilities. Whether you're summarizing notes or extracting tasks, FocusMate makes your ideas instantly actionable.

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

## ⚡ **Core Features**

| Feature | Description |
|----------|--------------|
| **Summarize** | Condense long text while preserving the key ideas and structure. |
| **Extract Tasks** | Identify action items, deadlines, and to-dos from raw text. |
| **Voice Input** | Speak your thoughts and convert them to text instantly. |
| **File Upload** | Upload .txt, .pdf, or .docx files for processing. |
| **Multiple Styles** | Academic, Concise, Creative, and Conversational processing modes. |

No timers. No distractions. Just pure, focused text enhancement.

---

## 🧠 **How It Works**

FocusMate leverages **Chrome's built-in AI capabilities** (Summarizer API) to process text **locally in the browser**, ensuring privacy and instant performance.

1. Paste, type, speak, or upload your text.  
2. Choose an operation (Summarize or Extract Tasks).  
3. Select your preferred processing style.
4. Instantly view AI-enhanced output — no backend or API keys required.

---

## ✨ Features

### 🤖 AI-Powered Text Processing
- **Summarize**: Condense text while keeping core meaning
- **Extract Tasks**: Identify key actions and to-dos using pattern matching
- **4 Processing Modes**: Academic, Concise, Creative, Conversational

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

### Prerequisites
- **Chrome 138+** (for AI features)
- **Node.js 18+** (for development)

### Installation

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

### Building for Production

```bash
npm run build
npm run preview
```

---

## ⌨️ **Keyboard Shortcuts**

| Shortcut | Action |
|----------|--------|
| `⌘1` | Summarize text |
| `⌘3` | Extract tasks |
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

## 🔧 **Browser Compatibility**

### Chrome AI Features (Chrome 138+)
- ✅ Text Summarization
- ⚠️ Task Extraction (pattern-based fallback)

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
3. **Process**: Click Summarize or Extract Tasks
4. **Export**: Copy to clipboard or download as .txt file

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