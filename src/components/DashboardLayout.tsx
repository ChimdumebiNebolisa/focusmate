import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { 
  summarizeText, 
  rewriteText, 
  extractTasks
} from '../utils/chromeAI';
import { saveSession } from '../services/historyService';
import HistoryPanel from './HistoryPanel';
import { Mic, Brain, Sparkles, CheckSquare } from 'lucide-react';

type ActionType = 'summarize' | 'clean' | 'tasks';

const actions = [
  { 
    label: 'Summarize', 
    icon: Brain, 
    action: 'summarize' as ActionType, 
    color: 'from-indigo-500 to-purple-600',
    tooltip: 'AI-powered text summarization (Chrome 138+).'
  },
  { 
    label: 'Clean', 
    icon: Sparkles, 
    action: 'clean' as ActionType, 
    color: 'from-emerald-500 to-teal-600',
    tooltip: '⚠️ Writer API in Early Preview - Not yet available.',
    isPreview: true
  },
  { 
    label: 'Extract Tasks', 
    icon: CheckSquare, 
    action: 'tasks' as ActionType, 
    color: 'from-orange-500 to-red-600',
    tooltip: 'Pattern-based task detection (no AI required).'
  },
];

interface DashboardLayoutProps {
  showHistory: boolean;
  onCloseHistory: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ showHistory, onCloseHistory }) => {
  const { user } = useAuth(); // TypeScript should now recognize user property
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [saveHistory] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [processingMode, setProcessingMode] = useState('academic');

  const {
    transcript,
    listening,
    isSupported: speechSupported,
    startListening,
    stopListening,
    error: speechError,
    interimTranscript,
    confidence
  } = useSpeechRecognition();

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when not typing in input fields
      if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLInputElement) {
        return;
      }

      // Ctrl/Cmd + 1: Summarize
      if ((event.ctrlKey || event.metaKey) && event.key === '1') {
        event.preventDefault();
        if (inputText.trim()) {
          handleAction('summarize');
        }
      }
      // Ctrl/Cmd + 2: Clean
      else if ((event.ctrlKey || event.metaKey) && event.key === '2') {
        event.preventDefault();
        if (inputText.trim()) {
          handleAction('clean');
        }
      }
      // Ctrl/Cmd + 3: Extract Tasks
      else if ((event.ctrlKey || event.metaKey) && event.key === '3') {
        event.preventDefault();
        if (inputText.trim()) {
          handleAction('tasks');
        }
      }
      // Ctrl/Cmd + Enter: Process with last used action or default to summarize
      else if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (inputText.trim()) {
          handleAction(activeAction || 'summarize');
        }
      }
      // Ctrl/Cmd + C: Copy output
      else if ((event.ctrlKey || event.metaKey) && event.key === 'c' && outputText) {
        event.preventDefault();
        copyOutput();
      }
      // Ctrl/Cmd + D: Download output
      else if ((event.ctrlKey || event.metaKey) && event.key === 'd' && outputText) {
        event.preventDefault();
        downloadOutput();
      }
      // Escape: Clear all
      else if (event.key === 'Escape') {
        event.preventDefault();
        setInputText('');
        setOutputText('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [inputText, outputText, activeAction]);

  // Update input text when speech recognition produces results
  React.useEffect(() => {
    if (transcript && !listening) {
      setInputText(prev => prev + transcript + ' ');
    }
  }, [transcript, listening]);

  const handleAction = async (type: ActionType) => {
    if (!inputText.trim()) {
      return;
    }

    setIsProcessing(true);
    setActiveAction(type);
    setOutputText('');

    const startTime = Date.now();

    try {
      let result = '';
      
      switch (type) {
        case 'summarize':
          result = await summarizeText(inputText, processingMode);
          break;
        case 'clean':
          result = await rewriteText(inputText, processingMode);
          break;
        case 'tasks':
          result = await extractTasks(inputText);
          break;
      }
      
      setOutputText(result);

      // Show success message
      if (result && !result.includes('Chrome AI API not supported')) {
        setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} completed successfully!`);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
      }

      // Save to history if user is logged in and saveHistory is enabled
      if (user && saveHistory && result && !result.includes('Chrome AI API not supported')) {
        try {
          const processingTime = Date.now() - startTime;
          await saveSession(user.uid, {
            input: inputText,
            output: result,
            action: type,
            processingTime
          });
          // Session saved successfully
        } catch (error) {
          console.error('Failed to save session:', error);
        }
      }
    } catch (error) {
      console.error('Action failed:', error);
      setOutputText('Error: This feature requires Chrome AI capabilities. Please ensure you\'re using Chrome with AI features enabled.');
    } finally {
      setIsProcessing(false);
      setActiveAction(null);
    }
  };


  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const downloadOutput = () => {
    if (!outputText) return;
    
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focusmate-output-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestoreSession = (input: string, output: string) => {
    setInputText(input);
    setOutputText(output);
  };

  const toggleVoiceInput = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 dark:text-white mb-4">
          What's on your mind today?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Let FocusMate help you summarize, clean, or extract tasks from your thoughts in different styles.
        </p>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">


        {/* Left Panel - Input */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Input Card */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Input</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Type or use voice input to capture ideas.</p>
            </div>
            
            <div className="relative">
              <textarea
                className="w-full h-48 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-400 bg-transparent resize-none text-gray-800 dark:text-gray-100 transition-all duration-200"
                placeholder="Enter your text here or use voice input..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isProcessing}
              />
                
              {/* Voice Input Button */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {inputText.length} characters
                </div>
                
                {speechSupported && (
                  <button
                    onClick={toggleVoiceInput}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      listening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    disabled={isProcessing}
                    title={listening ? 'Stop Recording' : 'Start Voice Input'}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                )}
              </div>
                
              {/* Voice Status */}
              {listening && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-red-600 font-medium">Listening...</span>
                  </div>
                  
                  {interimTranscript && (
                    <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                      <span className="italic">"{interimTranscript}"</span>
                      {confidence > 0 && (
                        <span className="ml-2 text-gray-500 dark:text-gray-400">
                          ({(confidence * 100).toFixed(0)}% confidence)
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
                
              {speechError && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <span className="text-xs text-red-600 dark:text-red-400 whitespace-pre-line">{speechError}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex flex-wrap gap-3 justify-center items-end">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {actions.map(({ label, icon: Icon, action, color, tooltip, isPreview }) => {
                  const shortcutKey = action === 'summarize' ? '1' : 
                                     action === 'clean' ? '2' : 
                                     action === 'tasks' ? '3' : '';
                  return (
                    <div key={action} className="relative group">
                      <motion.button
                        onClick={() => handleAction(action)}
                        className={`px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-2 bg-gradient-to-r ${color} text-white font-semibold ${
                          activeAction === action 
                            ? 'scale-105 opacity-75' 
                            : ''
                        } ${isPreview ? 'relative' : ''}`}
                        disabled={!inputText.trim() || isProcessing}
                        whileHover={{ scale: activeAction !== action ? 1.05 : 1, filter: "brightness(1.2)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {activeAction === action ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Icon size={18} />
                            <span className="text-sm font-medium">{label}</span>
                            <span className="text-xs opacity-75">⌘{shortcutKey}</span>
                            {isPreview && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-yellow-900 rounded-full text-xs flex items-center justify-center font-bold">
                                !
                              </span>
                            )}
                          </>
                        )}
                      </motion.button>
                      <span className="absolute -top-12 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                        {tooltip} | Shortcut: ⌘{shortcutKey}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Processing Mode Options */}
              <div className="flex gap-3">
                {/* Processing Mode Selector */}
                <div className="flex flex-col items-center">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Processing Mode
                  </label>
                  <select 
                    value={processingMode}
                    onChange={(e) => setProcessingMode(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-indigo-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="academic">Academic</option>
                    <option value="concise">Concise</option>
                    <option value="creative">Creative</option>
                    <option value="conversational">Conversational</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Panel - Output */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Output Card */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Output</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your processed result will appear here.</p>
              </div>
              {outputText && (
                <div className="flex gap-2">
                  <button
                    onClick={copyOutput}
                    className={`px-3 py-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm font-medium ${
                      copySuccess 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {copySuccess ? '✓ Copied!' : '📋 Copy'}
                  </button>
                  <button
                    onClick={downloadOutput}
                    className="px-3 py-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
                    title="Download as .txt file"
                  >
                    💾 Download
                  </button>
                </div>
              )}
            </div>
              
            <motion.div 
              className="bg-gray-100 dark:bg-gray-700 h-80 rounded-xl p-6 overflow-y-auto"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isProcessing ? (
                <motion.div 
                  className="flex items-center justify-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-center">
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                        {activeAction ? `Processing ${activeAction}...` : 'Processing...'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Using Chrome AI
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : outputText ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full overflow-y-auto"
                >
                  <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap leading-relaxed text-base">
                    {outputText}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-gray-500 dark:text-gray-400 italic text-lg">
                      Results will appear here
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      Try summarizing, cleaning, or extracting tasks in different styles
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <motion.div 
        className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Keyboard Shortcuts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-blue-700 dark:text-blue-300">Summarize</span>
              <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs font-mono">⌘1</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-700 dark:text-blue-300">Clean Text</span>
              <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs font-mono">⌘2</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-700 dark:text-blue-300">Extract Tasks</span>
              <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs font-mono">⌘3</kbd>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-blue-700 dark:text-blue-300">Quick Process</span>
              <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs font-mono">⌘⏎</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-700 dark:text-blue-300">Copy Output</span>
              <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs font-mono">⌘C</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-700 dark:text-blue-300">Download Output</span>
              <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs font-mono">⌘D</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-700 dark:text-blue-300">Clear All</span>
              <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs font-mono">Esc</kbd>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-700 dark:text-blue-300">Voice Input</span>
              <kbd className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded text-xs font-mono">Click Mic</kbd>
            </div>
          </div>
        </div>
      </motion.div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={onCloseHistory}
        onRestoreSession={handleRestoreSession}
      />

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">✅</span>
                <span className="font-medium">{successMessage}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
