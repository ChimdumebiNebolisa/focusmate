import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
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
    <div className="min-h-screen bg-base-100">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card bg-base-200 shadow-xl border border-base-300"
          >
            <div className="card-body p-6">
              <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                <User className="w-6 h-6" />
                Profile Information
              </h2>
              
              {user && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={user.photoURL || 'https://via.placeholder.com/80x80/6366f1/ffffff?text=U'}
                          alt={user.displayName || 'User'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-base-content">{user.displayName || 'Anonymous User'}</h3>
                      <p className="text-base-content/70 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                      <div className="badge badge-success badge-sm mt-2">
                        {user.emailVerified ? 'Verified' : 'Unverified'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="divider"></div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">User ID</p>
                        <p className="text-xs text-base-content/60 font-mono">{user.uid.slice(0, 8)}...</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm font-medium">Account Created</p>
                        <p className="text-xs text-base-content/60">{formatDate(user.metadata.creationTime)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg sm:col-span-2">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium">Last Sign In</p>
                        <p className="text-xs text-base-content/60">{formatDate(user.metadata.lastSignInTime)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Preferences Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card bg-base-200 shadow-xl border border-base-300"
          >
            <div className="card-body p-6">
              <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                <Palette className="w-6 h-6" />
                Preferences
              </h2>
              
              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg">
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
                <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg">
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
                <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg">
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
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body p-6">
              <h2 className="card-title text-xl mb-4">About FocusMate</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-4 bg-base-100 rounded-lg">
                  <p className="font-semibold text-primary">Version</p>
                  <p className="text-base-content/70">1.0.0</p>
                </div>
                <div className="text-center p-4 bg-base-100 rounded-lg">
                  <p className="font-semibold text-secondary">Built with</p>
                  <p className="text-base-content/70">React + Firebase</p>
                </div>
                <div className="text-center p-4 bg-base-100 rounded-lg">
                  <p className="font-semibold text-accent">AI Powered</p>
                  <p className="text-base-content/70">Chrome AI APIs</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
