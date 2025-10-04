import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import VoiceMode from '../components/VoiceMode';
import HistoryPanel from '../components/HistoryPanel';
import SettingsPanel from '../components/SettingsPanel';
import Workspace from '../components/Workspace';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activePanel, setActivePanel] = useState<'workspace' | 'history' | 'settings'>('workspace');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">FocusMate</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={user?.photoURL || ''}
                  alt={user?.displayName || 'User'}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700">{user?.displayName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActivePanel('workspace')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePanel === 'workspace'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Workspace
            </button>
            <button
              onClick={() => setActivePanel('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePanel === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActivePanel('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePanel === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activePanel === 'workspace' && <Workspace />}
        {activePanel === 'history' && <HistoryPanel />}
        {activePanel === 'settings' && <SettingsPanel />}
      </main>
    </div>
  );
};

export default Dashboard;
