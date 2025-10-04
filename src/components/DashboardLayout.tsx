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

  const {
    transcript,
    listening,
    isSupported: speechSupported,
    startListening,
    stopListening,
    resetTranscript,
    error: speechError
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

      // Save to history if user is logged in and saveHistory is enabled
      if (user && saveHistory && result && !result.includes('Chrome AI API not supported')) {
        try {
          await saveSession(user.uid, {
            input: inputText,
            output: result,
            action: type
          });
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
            ) : (
              <div className="alert alert-warning">
                <span>Voice input not supported in this browser</span>
              </div>
            )}
            
            {speechError && (
              <div className="alert alert-error mt-2">
                <span className="text-xs">{speechError}</span>
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
              className="card bg-base-200 h-64"
              layout
            >
              <div className="card-body">
                {isProcessing ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-2">
                      <div className="loading loading-spinner loading-lg"></div>
                      <p className="text-base-content/60">
                        {activeAction ? `Processing ${activeAction}...` : 'Processing...'}
                      </p>
                    </div>
                  </div>
                ) : outputText ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-base-content whitespace-pre-wrap"
                  >
                    {outputText}
                  </motion.p>
                ) : (
                  <p className="text-base-content/60 italic">
                    Processed text will appear here...
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => handleAction('summarize')}
          className={`btn ${activeAction === 'summarize' ? 'btn-primary loading' : 'btn-primary'}`}
          disabled={!inputText.trim() || isProcessing}
        >
          {activeAction === 'summarize' ? '' : '📝 Summarize'}
        </button>
        <button
          onClick={() => handleAction('clean')}
          className={`btn ${activeAction === 'clean' ? 'btn-secondary loading' : 'btn-secondary'}`}
          disabled={!inputText.trim() || isProcessing}
        >
          {activeAction === 'clean' ? '' : '✨ Clean'}
        </button>
        <button
          onClick={() => handleAction('tasks')}
          className={`btn ${activeAction === 'tasks' ? 'btn-accent loading' : 'btn-accent'}`}
          disabled={!inputText.trim() || isProcessing}
        >
          {activeAction === 'tasks' ? '' : '✅ Extract Tasks'}
        </button>
        <button
          onClick={() => handleAction('translate')}
          className={`btn ${activeAction === 'translate' ? 'btn-info loading' : 'btn-info'}`}
          disabled={!inputText.trim() || isProcessing}
        >
          {activeAction === 'translate' ? '' : '🌍 Translate'}
        </button>
      </div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onRestoreSession={handleRestoreSession}
      />
    </div>
  );
};

export default DashboardLayout;
