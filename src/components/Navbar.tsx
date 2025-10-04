import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, Settings, Zap, History, Plus, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNewSession?: () => void;
  onHistoryClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewSession, onHistoryClick }) => {
  const { user, logout } = useAuth();
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
    } else {
      window.location.reload();
    }
  };

  const handleHistoryClick = () => {
    if (onHistoryClick) {
      onHistoryClick();
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsDark(newTheme === 'dark');
  };

  return (
    <nav className="navbar fixed top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-lg border-b border-base-300">
      <div className="max-w-7xl mx-auto w-full px-8">
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <Menu className="w-5 h-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-300"
            >
              <li>
                <button onClick={handleNewSession} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Session
                </button>
              </li>
              <li>
                <button onClick={handleHistoryClick} className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  History
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/settings')} className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 text-error">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
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
              <Zap size={24} className="text-primary" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FocusMate
            </span>
          </motion.div>
        </div>

        <div className="navbar-end">
          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={handleNewSession}
              className="btn btn-primary btn-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              New Session
            </button>
            
            <button
              onClick={handleHistoryClick}
              className="btn btn-ghost btn-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <History className="w-4 h-4" />
              History
            </button>
            
            <button
              onClick={() => navigate('/settings')}
              className="btn btn-ghost btn-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>

            {/* Theme Toggle */}
            <button
              className="btn btn-ghost btn-circle btn-sm"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="btn btn-error btn-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile Theme Toggle */}
          <div className="lg:hidden">
            <button
              className="btn btn-ghost btn-circle btn-sm"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;