import React, { useState } from 'react';
import VoiceMode from './VoiceMode';
import { summarize, rewrite, extractTasks, translate } from '../utils/ai';

const Workspace: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleAction = async (action: string) => {
    if (!inputText.trim()) {
      alert('Please enter some text to process');
      return;
    }

    setIsProcessing(true);
    setActiveAction(action);

    try {
      let result = '';
      
      switch (action) {
        case 'summarize':
          result = await summarize(inputText);
          break;
        case 'rewrite':
          result = await rewrite(inputText);
          break;
        case 'extractTasks':
          result = await extractTasks(inputText);
          break;
        case 'translate':
          result = await translate(inputText, 'es');
          break;
        default:
          result = 'Action not implemented';
      }
      
      setOutputText(result);
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
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Workspace */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Text Workspace</h2>
          <div className="flex space-x-2">
            <button
              onClick={clearAll}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your text here or use Voice Mode to speak your ideas..."
                className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAction('summarize')}
                disabled={isProcessing}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isProcessing && activeAction === 'summarize'
                    ? 'bg-blue-300 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isProcessing && activeAction === 'summarize' ? 'Processing...' : 'Summarize'}
              </button>
              
              <button
                onClick={() => handleAction('rewrite')}
                disabled={isProcessing}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isProcessing && activeAction === 'rewrite'
                    ? 'bg-green-300 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isProcessing && activeAction === 'rewrite' ? 'Processing...' : 'Rewrite'}
              </button>
              
              <button
                onClick={() => handleAction('extractTasks')}
                disabled={isProcessing}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isProcessing && activeAction === 'extractTasks'
                    ? 'bg-purple-300 text-white cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isProcessing && activeAction === 'extractTasks' ? 'Processing...' : 'Extract Tasks'}
              </button>
              
              <button
                onClick={() => handleAction('translate')}
                disabled={isProcessing}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isProcessing && activeAction === 'translate'
                    ? 'bg-indigo-300 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isProcessing && activeAction === 'translate' ? 'Processing...' : 'Translate'}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Output
              </label>
              {outputText && (
                <button
                  onClick={copyOutput}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Copy
                </button>
              )}
            </div>
            <div className="h-64 p-3 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto">
              {outputText ? (
                <p className="text-gray-900 whitespace-pre-wrap">{outputText}</p>
              ) : (
                <p className="text-gray-500 italic">
                  {isProcessing 
                    ? 'Processing your text...' 
                    : 'Processed text will appear here'
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Voice Mode */}
      <VoiceMode />

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">
              Pro Tips
            </h4>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Use Voice Mode to speak your ideas instead of typing</li>
                <li>Try different actions to see how AI can transform your text</li>
                <li>Chrome AI features work best with Chrome browser</li>
                <li>Your work is automatically saved to your account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
