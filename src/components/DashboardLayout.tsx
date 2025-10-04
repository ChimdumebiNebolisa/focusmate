import React, { useState } from 'react';

type ActionType = 'summarize' | 'clean' | 'tasks' | 'translate';

const DashboardLayout: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleAction = (type: ActionType) => {
    console.log(`Action: ${type}`, { inputText });
    // Placeholder for Chrome AI integration
    setOutputText(`[${type.toUpperCase()}] Result for: "${inputText.substring(0, 50)}..."`);
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workspace</h1>
        <button onClick={clearAll} className="btn btn-outline btn-sm">
          Clear All
        </button>
      </div>

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
            />
          </div>

          {/* Voice Input Placeholder */}
          <div className="form-control">
            <button
              className="btn btn-outline btn-sm w-full"
              disabled
              title="Voice input coming soon"
            >
              🎤 Voice Input (Coming Soon)
            </button>
          </div>
        </div>

        {/* Output Pane */}
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Output</span>
            </label>
            <div className="card bg-base-200 h-64">
              <div className="card-body">
                {outputText ? (
                  <p className="text-base-content whitespace-pre-wrap">{outputText}</p>
                ) : (
                  <p className="text-base-content/60 italic">
                    Processed text will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => handleAction('summarize')}
          className="btn btn-primary"
          disabled={!inputText.trim()}
        >
          Summarize
        </button>
        <button
          onClick={() => handleAction('clean')}
          className="btn btn-secondary"
          disabled={!inputText.trim()}
        >
          Clean
        </button>
        <button
          onClick={() => handleAction('tasks')}
          className="btn btn-accent"
          disabled={!inputText.trim()}
        >
          Extract Tasks
        </button>
        <button
          onClick={() => handleAction('translate')}
          className="btn btn-info"
          disabled={!inputText.trim()}
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
