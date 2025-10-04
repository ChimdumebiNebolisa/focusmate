import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
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
  }, [isOpen, user]);

  const loadHistory = async () => {
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
  };

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
            className="fixed right-0 top-0 h-full w-96 bg-base-100 shadow-xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-base-300">
                <h2 className="text-xl font-semibold">Session History</h2>
                <div className="flex gap-2">
                  {sessions.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="btn btn-sm btn-ghost text-error"
                      title="Clear all sessions"
                    >
                      🗑️
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="btn btn-sm btn-ghost"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="loading loading-spinner loading-md"></div>
                  </div>
                ) : error ? (
                  <div className="alert alert-error">
                    <span>{error}</span>
                    <button
                      onClick={loadHistory}
                      className="btn btn-sm btn-outline"
                    >
                      Retry
                    </button>
                  </div>
                ) : sessions.length === 0 ? (
                  <div className="text-center text-base-content/60 py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p>No sessions yet</p>
                    <p className="text-sm">Your processed text will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card bg-base-200 shadow-sm"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {getActionIcon(session.action)}
                              </span>
                              <span className="font-medium text-sm">
                                {getActionLabel(session.action)}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleRestore(session)}
                                className="btn btn-xs btn-ghost"
                                title="Restore session"
                              >
                                ↩️
                              </button>
                              <button
                                onClick={() => handleDeleteSession(session.id)}
                                className="btn btn-xs btn-ghost text-error"
                                title="Delete session"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-base-content/60 mb-1">Input:</p>
                              <p className="text-sm line-clamp-2 bg-base-300 p-2 rounded">
                                {session.input}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-base-content/60 mb-1">Output:</p>
                              <p className="text-sm line-clamp-2 bg-base-300 p-2 rounded">
                                {session.output}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-base-content/60">
                              {formatDistanceToNow(session.createdAt.toDate(), { addSuffix: true })}
                            </p>
                            {session.processingTime && (
                              <p className="text-xs text-base-content/40">
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