import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, LogOut, Settings, Zap, History, Plus, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNewSession?: () => void;
  onHistoryClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewSession, onHistoryClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNewSession = () => {
    if (onNewSession) {
      onNewSession();
    }
    navigate('/dashboard');
  };

  const handleHistoryClick = () => {
    if (onHistoryClick) {
      onHistoryClick();
    }
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm flex justify-between items-center px-8 py-3 z-50">
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <div className="lg:hidden relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2">
              <button 
                onClick={() => {handleNewSession(); setIsMenuOpen(false);}} 
                className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Session
              </button>
              <button 
                onClick={() => {handleHistoryClick(); setIsMenuOpen(false);}} 
                className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <History className="w-4 h-4" />
                History
              </button>
              <button 
                onClick={() => {navigate('/settings'); setIsMenuOpen(false);}} 
                className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button 
                onClick={() => {handleLogout(); setIsMenuOpen(false);}} 
                className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600 dark:text-red-400"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
        >
          <motion.div
            className="relative"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(99, 102, 241, 0.4)",
                  "0 0 0 10px rgba(99, 102, 241, 0)",
                  "0 0 0 0 rgba(99, 102, 241, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute inset-0 rounded-full"
            />
            <Zap size={24} className="text-indigo-600 dark:text-indigo-400 relative z-10" />
          </motion.div>
          <motion.span 
            className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
            animate={{
              textShadow: [
                "0 0 0 rgba(99, 102, 241, 0.5)",
                "0 0 10px rgba(99, 102, 241, 0.8)",
                "0 0 0 rgba(99, 102, 241, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            FocusMate
          </motion.span>
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={handleNewSession}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Session
          </button>
          
          <button
            onClick={handleHistoryClick}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            History
          </button>
          
          <button
            onClick={() => navigate('/settings')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          {/* Theme Toggle */}
          <button
            className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Mobile Theme Toggle */}
        <div className="lg:hidden">
          <button
            className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;