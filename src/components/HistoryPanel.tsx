import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { 
  getUserHistory, 
  deleteSession, 
  clearAllSessions, 
  type SessionDocument 
} from '../services/historyService';
import { formatDistanceToNow } from 'date-fns';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreSession: (input: string, output: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  isOpen, 
  onClose, 
  onRestoreSession 
}) => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SessionDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      loadHistory();
    }
  }, [isOpen, user, loadHistory]);

  const loadHistory = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const history = await getUserHistory(user.uid);
      setSessions(history);
    } catch (err) {
      setError('Failed to load history');
      console.error('Error loading history:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleDeleteSession = async (sessionId: string) => {
    if (!user) return;
    
    try {
      await deleteSession(user.uid, sessionId);
      setSessions(prev => prev.filter(session => session.id !== sessionId));
    } catch (err) {
      setError('Failed to delete session');
      console.error('Error deleting session:', err);
    }
  };

  const handleClearAll = async () => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete all sessions? This action cannot be undone.')) {
      try {
        await clearAllSessions(user.uid);
        setSessions([]);
      } catch (err) {
        setError('Failed to clear all sessions');
        console.error('Error clearing sessions:', err);
      }
    }
  };

  const handleRestore = (session: SessionDocument) => {
    onRestoreSession(session.input, session.output);
    onClose();
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'summarize': return '📝';
      case 'clean': return '✨';
      case 'tasks': return '✅';
      case 'translate': return '🌍';
      default: return '🔧';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'summarize': return 'Summarize';
      case 'clean': return 'Clean';
      case 'tasks': return 'Extract Tasks';
      case 'translate': return 'Translate';
      default: return action;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-hidden border-l border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Session History</h2>
                <div className="flex gap-2">
                  {sessions.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="p-2 rounded-md text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                      title="Clear all sessions"
                    >
                      🗑️
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : error ? (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <span className="text-red-600 dark:text-red-400">{error}</span>
                    <button
                      onClick={loadHistory}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                    >
                      Retry
                    </button>
                  </div>
                ) : sessions.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-lg font-medium">No sessions yet</p>
                    <p className="text-sm mt-2">Your processed text will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-100 dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl border border-gray-200 dark:border-gray-600"
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {getActionIcon(session.action)}
                              </span>
                              <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                                {getActionLabel(session.action)}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleRestore(session)}
                                className="p-1 rounded text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors"
                                title="Restore session"
                              >
                                ↩️
                              </button>
                              <button
                                onClick={() => handleDeleteSession(session.id)}
                                className="p-1 rounded text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                title="Delete session"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">Input:</p>
                              <p className="text-sm line-clamp-2 bg-white dark:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500 text-gray-800 dark:text-gray-200">
                                {session.input}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">Output:</p>
                              <p className="text-sm line-clamp-2 bg-white dark:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500 text-gray-800 dark:text-gray-200">
                                {session.output}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDistanceToNow(session.createdAt.toDate(), { addSuffix: true })}
                            </p>
                            {session.processingTime && (
                              <p className="text-xs text-gray-400 dark:text-gray-500">
                                {(session.processingTime / 1000).toFixed(1)}s
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;