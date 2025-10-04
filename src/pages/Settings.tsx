import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { Trash2, LogOut } from 'lucide-react';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const handleClearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    alert('Cache cleared successfully!');
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            ⚙️ Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-300 text-lg">Manage your FocusMate preferences and account</p>
        </motion.div>

        <div className="max-w-md mx-auto mt-12">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full ring-4 ring-indigo-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800">
                  <img
                    src={user?.photoURL || 'https://via.placeholder.com/64x64/6366f1/ffffff?text=U'}
                    alt={user?.displayName || 'User'}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user?.displayName || 'Anonymous User'}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Theme</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark mode</p>
                  </div>
                  <button
                    onClick={handleThemeToggle}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                    }`}
                  >
                    {isDarkMode ? '🌙 Dark' : '☀️ Light'}
                  </button>
                </div>

                {/* Clear Cache */}
                <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Clear Cache</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Clear local storage and session data</p>
                  </div>
                  <button
                    onClick={handleClearCache}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-200 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                </div>

                {/* Sign Out */}
                <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Sign Out</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sign out of your account</p>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
