import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { 
  summarizeText, 
  rewriteText, 
  extractTasks, 
  translateText
} from '../utils/chromeAI';
import { saveSession } from '../services/historyService';
import HistoryPanel from './HistoryPanel';
import { Mic, Brain, Sparkles, CheckSquare, Globe } from 'lucide-react';

type ActionType = 'summarize' | 'clean' | 'tasks' | 'translate';

const actions = [
  { 
    label: 'Summarize', 
    icon: Brain, 
    action: 'summarize' as ActionType, 
    color: 'from-indigo-500 to-purple-600',
    tooltip: 'Generate a clean summary of your text.'
  },
  { 
    label: 'Clean', 
    icon: Sparkles, 
    action: 'clean' as ActionType, 
    color: 'from-emerald-500 to-teal-600',
    tooltip: 'Fix grammar, tone, and readability.'
  },
  { 
    label: 'Extract Tasks', 
    icon: CheckSquare, 
    action: 'tasks' as ActionType, 
    color: 'from-orange-500 to-red-600',
    tooltip: 'Identify actionable items from your notes.'
  },
  { 
    label: 'Translate', 
    icon: Globe, 
    action: 'translate' as ActionType, 
    color: 'from-blue-500 to-cyan-600',
    tooltip: 'Translate your text to another language.'
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
          result = await summarizeText(inputText);
          break;
        case 'clean':
          result = await rewriteText(inputText);
          break;
        case 'tasks':
          result = await extractTasks(inputText);
          break;
        case 'translate':
          result = await translateText(inputText, 'en');
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
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-16 px-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          What's on your mind today?
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          Let FocusMate help you summarize, clean, or translate your thoughts.
        </p>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">


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
            className="flex flex-wrap gap-4 mt-6 justify-center"
          >
            {actions.map(({ label, icon: Icon, action, color, tooltip }) => (
              <div key={action} title={tooltip}>
                <motion.button
                  onClick={() => handleAction(action)}
                  className={`px-5 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 flex items-center gap-2 bg-gradient-to-r ${color} text-white font-semibold ${
                    activeAction === action 
                      ? 'scale-105 opacity-75' 
                      : ''
                  }`}
                  disabled={!inputText.trim() || isProcessing}
                  whileHover={{ scale: activeAction !== action ? 1.05 : 1, filter: "brightness(1.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeAction === action ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Icon size={20} />
                      <span className="text-sm font-medium">{label}</span>
                    </>
                  )}
                </motion.button>
              </div>
            ))}
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
                      Try summarizing, cleaning, extracting tasks, or translating
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

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
