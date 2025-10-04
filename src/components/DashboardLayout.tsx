import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { 
  summarizeText, 
  rewriteText, 
  extractTasks, 
  translateText,
  getBrowserInfo 
} from '../utils/chromeAI';
import { saveSession } from '../services/historyService';
import HistoryPanel from './HistoryPanel';
import { FileText, Eraser, ListTodo, Languages, Mic } from 'lucide-react';

type ActionType = 'summarize' | 'clean' | 'tasks' | 'translate';

const actions = [
  { label: 'Summarize', icon: FileText, action: 'summarize' as ActionType, color: 'btn-primary' },
  { label: 'Clean', icon: Eraser, action: 'clean' as ActionType, color: 'btn-secondary' },
  { label: 'Extract Tasks', icon: ListTodo, action: 'tasks' as ActionType, color: 'btn-accent' },
  { label: 'Translate', icon: Languages, action: 'translate' as ActionType, color: 'btn-info' },
];

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showBrowserInfo, setShowBrowserInfo] = useState(false);
  const [saveHistory, setSaveHistory] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    transcript,
    listening,
    isSupported: speechSupported,
    startListening,
    stopListening,
    resetTranscript,
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
          console.log(`✅ Session saved in ${processingTime}ms`);
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

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    resetTranscript();
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
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🎯 Workspace
            </h1>
            <p className="text-base-content/70 text-base sm:text-lg">Transform your text with AI-powered tools</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-end">
            <button
              onClick={() => setShowBrowserInfo(!showBrowserInfo)}
              className="btn btn-ghost btn-sm tooltip tooltip-bottom"
              data-tip="Browser compatibility info"
            >
              <span className="text-lg">ℹ️</span>
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="btn btn-outline btn-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span className="text-lg mr-2">🕒</span>
              History
            </button>
            <button 
              onClick={clearAll} 
              className="btn btn-outline btn-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span className="text-lg mr-2">🗑️</span>
              Clear All
            </button>
          </div>
        </div>
      </motion.div>

      {/* Browser Info Alert */}
      <AnimatePresence>
        {showBrowserInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="alert alert-info">
              <div>
                <span>{getBrowserInfo()}</span>
                <button
                  onClick={() => setShowBrowserInfo(false)}
                  className="btn btn-sm btn-ghost ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save History Toggle */}
      {user && (
        <div className="mb-6">
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body py-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="toggle toggle-sm toggle-primary"
                  checked={saveHistory}
                  onChange={(e) => setSaveHistory(e.target.checked)}
                />
                <span className="text-sm font-medium">Save session history</span>
                <div className="badge badge-outline badge-sm">Auto-save enabled</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Pane */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body p-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xl flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    Input Text
                  </span>
                  <div className="badge badge-primary badge-lg">Required</div>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-80 resize-none text-base focus:textarea-primary shadow-inner hover:shadow-md transition-shadow duration-200"
                  placeholder="Enter your text here or use voice input..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isProcessing}
                />
                <div className="label">
                  <span className="label-text-alt text-base-content/60">
                    {inputText.length} characters
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Voice Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body p-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-xl flex items-center gap-2">
                    <span className="text-2xl">🎤</span>
                    Voice Input
                  </span>
                  <div className="badge badge-secondary badge-lg">Optional</div>
                </label>
                {speechSupported ? (
                  <div className="space-y-4">
                    <button
                      onClick={toggleVoiceInput}
                      className={`btn w-full ${
                        listening 
                          ? 'btn-error animate-pulse' 
                          : 'btn-outline'
                      }`}
                      disabled={isProcessing}
                    >
                      <span className="text-lg mr-2">
                        {listening ? '🛑' : '🎤'}
                      </span>
                      {listening ? 'Stop Recording' : 'Start Voice Input'}
                    </button>
                
                    {/* Voice Status */}
                    {listening && (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                          <span className="text-red-600 font-medium">Listening...</span>
                        </div>
                        
                        {interimTranscript && (
                          <div className="mt-2 p-3 bg-base-300 rounded-lg text-sm text-base-content/80">
                            <span className="italic">"{interimTranscript}"</span>
                            {confidence > 0 && (
                              <span className="ml-2 text-base-content/60">
                                ({(confidence * 100).toFixed(0)}% confidence)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <span>🎤 Voice input not supported in this browser</span>
                  </div>
                )}
                
                {speechError && (
                  <div className="alert alert-error mt-2">
                    <span className="text-xs whitespace-pre-line">{speechError}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Output Pane */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="card-body p-6">
              <div className="form-control">
                <div className="label">
                  <span className="label-text font-semibold text-xl flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Output
                  </span>
                  {outputText && (
                    <button
                      onClick={copyOutput}
                      className={`btn btn-sm shadow-md hover:shadow-lg transition-all duration-200 ${copySuccess ? 'btn-success' : 'btn-outline'}`}
                    >
                      {copySuccess ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  )}
                </div>
                <motion.div 
                  className="card bg-base-100 h-80 shadow-sm border border-base-300"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="card-body p-6">
                {isProcessing ? (
                  <motion.div 
                    className="flex items-center justify-center h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="loading loading-spinner loading-lg text-primary"></div>
                      <div className="text-center">
                        <p className="text-base-content/80 font-medium">
                          {activeAction ? `Processing ${activeAction}...` : 'Processing...'}
                        </p>
                        <p className="text-xs text-base-content/60 mt-1">
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
                    <p className="text-base-content whitespace-pre-wrap leading-relaxed">
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
                      <p className="text-base-content/70 italic text-lg">
                        Processed text will appear here...
                      </p>
                      <p className="text-sm text-base-content/50 mt-2">
                        Try summarizing, cleaning, extracting tasks, or translating
                      </p>
                    </div>
                  </motion.div>
                )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-2">AI Actions</h2>
          <p className="text-base-content/70 text-sm sm:text-base">Choose an action to process your text</p>
        </div>
        
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          {actions.map(({ label, icon: Icon, action, color }) => (
            <motion.button
              key={action}
              onClick={() => handleAction(action)}
              className={`btn btn-sm sm:btn-md lg:btn-lg shadow-lg hover:shadow-xl transition-all duration-200 min-w-36 sm:min-w-44 lg:min-w-48 flex items-center gap-2 sm:gap-3 ${
                activeAction === action 
                  ? `${color} loading scale-105` 
                  : `${color} hover:scale-105`
              }`}
              disabled={!inputText.trim() || isProcessing}
              whileHover={{ scale: activeAction !== action ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeAction === action ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
              <>
                <Icon size={16} className="sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm lg:text-base">{label}</span>
              </>
              )}
            </motion.button>
          ))}
          
          <motion.button
            onClick={toggleVoiceInput}
            className={`btn btn-sm sm:btn-md lg:btn-lg shadow-lg hover:shadow-xl transition-all duration-200 min-w-36 sm:min-w-44 lg:min-w-48 flex items-center gap-2 sm:gap-3 ${
              listening 
                ? 'btn-error loading scale-105' 
                : 'btn-warning hover:scale-105'
            }`}
            disabled={isProcessing}
            whileHover={{ scale: listening ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {listening ? (
              <div className="loading loading-spinner loading-sm"></div>
            ) : (
              <>
                <Mic size={16} className="sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm lg:text-base">Voice Input</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
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
            <div className="alert alert-success shadow-lg">
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
