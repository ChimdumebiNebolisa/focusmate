import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { historyHelpers, HistoryItem } from '../utils/firebaseHelpers';

const HistoryPanel: React.FC = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const historyData = await historyHelpers.getByUser(user.uid);
      setHistory(historyData);
    } catch (err) {
      console.error('Failed to load history:', err);
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      await historyHelpers.delete(id);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete history item:', err);
      setError('Failed to delete item');
    }
  };

  const clearAllHistory = async () => {
    if (!confirm('Are you sure you want to clear all history?')) return;
    
    try {
      // Delete all items one by one (Firestore doesn't have batch delete for queries)
      for (const item of history) {
        if (item.id) {
          await historyHelpers.delete(item.id);
        }
      }
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
      setError('Failed to clear history');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Activity History</h2>
        {history.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start using FocusMate to see your activity history here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.action}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.timestamp.toDate().toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Input:</p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border">
                        {item.input.length > 200 ? `${item.input.substring(0, 200)}...` : item.input}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700">Output:</p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border">
                        {item.output.length > 200 ? `${item.output.substring(0, 200)}...` : item.output}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => item.id && deleteHistoryItem(item.id)}
                  className="ml-4 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPanel;
