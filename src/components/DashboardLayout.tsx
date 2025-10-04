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

type ActionType = 'summarize' | 'clean' | 'tasks' | 'translate';

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
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workspace</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBrowserInfo(!showBrowserInfo)}
            className="btn btn-ghost btn-sm"
            title="Browser compatibility info"
          >
            ℹ️
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="btn btn-outline btn-sm"
          >
            🕒 History
          </button>
          <button onClick={clearAll} className="btn btn-outline btn-sm">
            Clear All
          </button>
        </div>
      </div>

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
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={saveHistory}
            onChange={(e) => setSaveHistory(e.target.checked)}
          />
          <span className="text-sm">Save session history</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Pane */}
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Input Text</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-64 resize-none"
              placeholder="Enter your text here or use voice input..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          {/* Voice Input */}
          <div className="form-control">
            {speechSupported ? (
              <div className="space-y-2">
                <button
                  onClick={toggleVoiceInput}
                  className={`btn btn-sm w-full ${
                    listening 
                      ? 'btn-error animate-pulse' 
                      : 'btn-outline'
                  }`}
                  disabled={isProcessing}
                >
                  {listening ? '🛑 Stop Recording' : '🎤 Voice Input'}
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
                      <div className="mt-2 p-2 bg-base-300 rounded text-xs text-base-content/80">
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

        {/* Output Pane */}
        <div className="space-y-4">
          <div className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Output</span>
              {outputText && (
                <button
                  onClick={copyOutput}
                  className={`btn btn-xs ${copySuccess ? 'btn-success' : 'btn-ghost'}`}
                >
                  {copySuccess ? '✓ Copied' : 'Copy'}
                </button>
              )}
            </div>
            <motion.div 
              className="card bg-base-200 h-64 shadow-sm"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="card-body p-4">
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
                      <div className="text-4xl mb-2">✨</div>
                      <p className="text-base-content/60 italic">
                        Processed text will appear here...
                      </p>
                      <p className="text-xs text-base-content/40 mt-1">
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

      {/* Action Buttons */}
      <motion.div 
        className="mt-8 flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => handleAction('summarize')}
          className={`btn btn-lg shadow-md hover:shadow-lg transition-all duration-200 ${
            activeAction === 'summarize' 
              ? 'btn-primary loading scale-105' 
              : 'btn-primary hover:scale-105'
          }`}
          disabled={!inputText.trim() || isProcessing}
          whileHover={{ scale: activeAction !== 'summarize' ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeAction === 'summarize' ? '' : '📝 Summarize'}
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('clean')}
          className={`btn btn-lg shadow-md hover:shadow-lg transition-all duration-200 ${
            activeAction === 'clean' 
              ? 'btn-secondary loading scale-105' 
              : 'btn-secondary hover:scale-105'
          }`}
          disabled={!inputText.trim() || isProcessing}
          whileHover={{ scale: activeAction !== 'clean' ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeAction === 'clean' ? '' : '✨ Clean'}
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('tasks')}
          className={`btn btn-lg shadow-md hover:shadow-lg transition-all duration-200 ${
            activeAction === 'tasks' 
              ? 'btn-accent loading scale-105' 
              : 'btn-accent hover:scale-105'
          }`}
          disabled={!inputText.trim() || isProcessing}
          whileHover={{ scale: activeAction !== 'tasks' ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeAction === 'tasks' ? '' : '✅ Extract Tasks'}
        </motion.button>
        
        <motion.button
          onClick={() => handleAction('translate')}
          className={`btn btn-lg shadow-md hover:shadow-lg transition-all duration-200 ${
            activeAction === 'translate' 
              ? 'btn-info loading scale-105' 
              : 'btn-info hover:scale-105'
          }`}
          disabled={!inputText.trim() || isProcessing}
          whileHover={{ scale: activeAction !== 'translate' ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {activeAction === 'translate' ? '' : '🌍 Translate'}
        </motion.button>
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
