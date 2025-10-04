import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Clock, Shield, Trash2, LogOut, Palette } from 'lucide-react';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const handleClearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    alert('Cache cleared successfully!');
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 transition-all duration-500">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ⚙️ Settings
          </h1>
          <p className="text-base-content/70 text-lg">Manage your FocusMate preferences and account</p>
        </motion.div>

        <div className="max-w-md mx-auto mt-12">
          <div className="card bg-base-100 shadow-xl rounded-2xl border border-base-300">
            <div className="card-body p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user?.photoURL || 'https://via.placeholder.com/64x64/6366f1/ffffff?text=U'}
                      alt={user?.displayName || 'User'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-base-content">{user?.displayName || 'Anonymous User'}</h2>
                  <p className="text-base-content/70 text-sm">{user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-base-content">Theme</h3>
                    <p className="text-sm text-base-content/70">Switch between light and dark mode</p>
                  </div>
                  <button
                    onClick={handleThemeToggle}
                    className={`btn ${isDarkMode ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {isDarkMode ? '🌙 Dark' : '☀️ Light'}
                  </button>
                </div>

                {/* Clear Cache */}
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-base-content">Clear Cache</h3>
                    <p className="text-sm text-base-content/70">Clear local storage and session data</p>
                  </div>
                  <button
                    onClick={handleClearCache}
                    className="btn btn-warning btn-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                </div>

                {/* Sign Out */}
                <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-base-content">Sign Out</h3>
                    <p className="text-sm text-base-content/70">Sign out of your account</p>
                  </div>
                  <button
                    onClick={logout}
                    className="btn btn-error btn-sm"
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
