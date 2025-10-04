import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SettingsPanel: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    voiceMode: true,
    autoSave: true,
    notifications: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    // Here you would typically save to Firebase or localStorage
    console.log('Setting changed:', key, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Settings</h2>

      <div className="space-y-6">
        {/* User Profile */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Profile</h3>
          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL || ''}
              alt={user?.displayName || 'User'}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.displayName}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Appearance</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Features</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Voice Mode
                </label>
                <p className="text-sm text-gray-500">
                  Enable speech-to-text functionality
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('voiceMode', !settings.voiceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.voiceMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.voiceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Auto Save
                </label>
                <p className="text-sm text-gray-500">
                  Automatically save your work
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive notifications for updates
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', !settings.notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">AI Settings</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">
                    Chrome AI Integration
                  </h4>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      FocusMate uses Chrome's built-in AI capabilities for text processing.
                      Make sure you're using Chrome with AI features enabled for the best experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div>
          <h3 className="text-md font-medium text-gray-900 mb-4">Data & Privacy</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span className="text-sm text-gray-700">Export Data</span>
            </button>
            <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <span className="text-sm text-gray-700">Privacy Policy</span>
            </button>
            <button className="w-full text-left px-4 py-2 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
              <span className="text-sm text-red-700">Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
