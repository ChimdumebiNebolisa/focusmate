# 🧠 FocusMate

**Transform your thoughts into clear, actionable content with AI-powered tools**

FocusMate is a modern web application that helps you organize, clean, and enhance your text using Chrome's on-device AI capabilities. Whether you're summarizing notes, cleaning up messy text, extracting tasks, or translating content, FocusMate makes your ideas instantly actionable.

![FocusMate Hero](https://img.shields.io/badge/FocusMate-AI%20Powered-blue?style=for-the-badge&logo=chrome&logoColor=white)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7+-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 🧩 **Overview**

FocusMate streamlines how you handle written content.  
Whether it's an article, a report, or notes — FocusMate uses AI to help you **condense**, **refine**, and **organize** text into actionable insights without needing external APIs or servers.

---

## ⚡ **Core Features**

| Feature | Description |
|----------|--------------|
| **Summarize** | Condense long text while preserving the key ideas and structure. |
| **Clean** | Improve grammar, tone, and readability with one click. |
| **Extract Tasks** | Identify action items, deadlines, and to-dos from raw text. |
| **Translate** | Convert text between languages with style options (Academic, Concise, Creative, Conversational). |

No timers. No distractions. Just pure, focused text enhancement.

---

## 🧠 **How It Works**

FocusMate leverages **Chrome's built-in AI capabilities** (Prompt, Summarization, and Editing APIs) to process text **locally in the browser**, ensuring privacy and instant performance.

1. Paste or type your text.  
2. Choose an operation (Summarize, Clean, Extract Tasks, or Translate).  
3. Instantly view AI-enhanced output — no backend or API keys required.

---

## ✨ Features

### 🤖 AI-Powered Text Processing
- **Summarize**: Condense text while keeping core meaning
- **Clean**: Polish grammar, tone, and structure  
- **Extract Tasks**: Identify key actions and to-dos
- **Translate**: Convert text between languages with style options (Academic, Concise, Creative, Conversational)

### 🎤 Voice Input
- Real-time speech recognition
- Voice-to-text conversion
- Confidence scoring
- Multi-language support

### 🎨 Modern UI/UX
- Responsive design for all devices
- Dark/Light mode with smooth transitions
- Animated gradients and micro-interactions
- Professional tooltips and feedback

### 🔐 User Management
- Google OAuth authentication
- Secure session management
- History tracking and restoration
- Cross-device synchronization

### 🛡️ Robust Error Handling
- Chrome AI runtime checks
- Graceful fallback systems
- Browser compatibility validation
- User-friendly error messages

## 🏗️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing

### Authentication & Database
- **Firebase Auth** - Google OAuth integration
- **Firebase Firestore** - Real-time database
- **Firebase Hosting** - Static site hosting

### AI Integration
- **Chrome AI APIs** - On-device AI processing
- **Web Speech API** - Voice recognition
- **Custom AI utilities** - Robust error handling

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Prettier** - Code formatting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Chrome browser (latest version)
- Chrome AI features enabled

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

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Add your Firebase configuration to `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🔧 Chrome AI Setup

FocusMate requires Chrome with AI features enabled for full functionality:

### Enable Chrome AI Features

1. **Use Chrome Canary or Chrome Dev**
   - Download from [Chrome Canary](https://www.google.com/chrome/canary/) or [Chrome Dev](https://www.google.com/chrome/dev/)

2. **Enable AI Flags**
   Navigate to `chrome://flags` and enable:
   - `#optimization-guide-on-device-model`
   - `#prompt-api-for-gemini-nano`
   - `#summarization-api-for-gemini-nano`
   - `#writer-api-for-gemini-nano`
   - `#translation-api`

3. **Restart Chrome**
   - Close all Chrome windows
   - Restart Chrome for flags to take effect

4. **Verify Setup**
   - Open Chrome DevTools
   - Check if `ai.languageModel`, `ai.summarizer`, `ai.writer`, or `ai.translator` are available in the console
   - Note: The old `window.ai` API is deprecated; use the new Chrome Built-in AI APIs

## 📱 Usage

### Getting Started

1. **Sign In**
   - Click "Sign in with Google" on the landing page
   - Grant necessary permissions

2. **Input Text**
   - Type directly in the input area
   - Use voice input by clicking the microphone button
   - Paste text from other sources

3. **Process Text**
   - Click any action button: Summarize, Clean, Extract Tasks, or Translate
   - Select translation mode if using the Translate feature
   - View results in the output panel

4. **Manage Sessions**
   - Access history via the History button
   - Restore previous sessions
   - Clear cache when needed

### Features Guide

#### 📝 Summarize
Condenses long text while preserving key information and meaning.

#### ✨ Clean
Improves grammar, tone, and readability while maintaining the original intent.

#### ✅ Extract Tasks
Identifies actionable items and organizes them into a clear task list.

#### 🌍 Translate
Converts text between languages with different style options:
- **Academic**: Formal, scholarly tone
- **Concise**: Clear and brief
- **Creative**: Artistic and expressive
- **Conversational**: Natural, friendly tone

#### 🎤 Voice Input
- Click the microphone to start recording
- Speak clearly and at normal pace
- Click again to stop recording
- Text appears automatically in the input field

## 🏗️ Project Structure

```
focusmate/
├── src/
│   ├── components/          # React components
│   │   ├── AboutSection.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── Footer.tsx
│   │   ├── GoogleButton.tsx
│   │   ├── HistoryPanel.tsx
│   │   ├── LandingHero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── SettingsPanel.tsx
│   │   ├── VoiceMode.tsx
│   │   └── Workspace.tsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Landing.tsx
│   │   ├── LandingPage.tsx
│   │   └── Settings.tsx
│   ├── utils/              # Utility functions
│   │   ├── checkAI.ts      # Chrome AI runtime checks
│   │   ├── chromeAI.ts     # AI integration
│   │   └── firebaseHelpers.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useSpeechRecognition.ts
│   ├── context/            # React context providers
│   │   ├── AuthContext.tsx
│   │   ├── AuthContextProvider.tsx
│   │   └── ThemeContext.tsx
│   ├── services/           # External service integrations
│   │   └── historyService.ts
│   ├── routes/             # Route components
│   │   └── ProtectedRoute.tsx
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── firebase.ts         # Firebase configuration
├── public/                 # Static assets
├── dist/                   # Build output
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

#### Chrome AI Not Working
- Ensure you're using Chrome Canary/Dev (version 127+)
- Check that AI flags are enabled (see Chrome AI Setup section)
- Verify `ai.languageModel`, `ai.summarizer`, `ai.writer`, or `ai.translator` exist in DevTools console
- Note: `window.ai` is deprecated - the app now uses the new Chrome Built-in AI APIs
- Try refreshing the page and clearing browser cache

#### Voice Input Issues
- Grant microphone permissions
- Check browser compatibility
- Ensure HTTPS connection (required for Web Speech API)

#### Authentication Problems
- Verify Firebase configuration
- Check Google OAuth settings
- Ensure domain is authorized

#### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set

### Browser Support

| Browser | AI Features | Voice Input | Basic Features |
|---------|-------------|-------------|----------------|
| Chrome (Latest) | ✅ | ✅ | ✅ |
| Chrome Canary | ✅ | ✅ | ✅ |
| Chrome Dev | ✅ | ✅ | ✅ |
| Firefox | ❌ | ✅ | ✅ |
| Safari | ❌ | ✅ | ✅ |
| Edge | ❌ | ✅ | ✅ |

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start development server: `npm run dev`
5. Make your changes
6. Run tests and linting: `npm run lint`
7. Submit a pull request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ChimdumebiNebolisa/focusmate/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ChimdumebiNebolisa/focusmate/discussions)
- **Email**: [Contact Developer](mailto:your-email@example.com)

## 🙏 Acknowledgments

- Chrome AI team for the powerful on-device APIs
- Firebase team for excellent developer tools
- React and TypeScript communities
- All contributors and users

## 🪴 Roadmap

- [x] Add keyboard shortcuts
- [x] Add export options (copy, download as .txt)
- [ ] Add history view for recent processed texts
- [ ] Add "smart combine" mode for multi-step processing
- [ ] Enhanced Chrome AI API integration as APIs mature
- [ ] Plugin system for custom AI providers
- [ ] Batch processing capabilities
- [ ] Advanced text analytics

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/ChimdumebiNebolisa/focusmate)
![GitHub issues](https://img.shields.io/github/issues/ChimdumebiNebolisa/focusmate)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ChimdumebiNebolisa/focusmate)
![GitHub stars](https://img.shields.io/github/stars/ChimdumebiNebolisa/focusmate?style=social)

---

**Made with ❤️ by [Chimdumebi Nebolisa](https://github.com/ChimdumebiNebolisa)**

*Transform your thoughts into action with FocusMate*