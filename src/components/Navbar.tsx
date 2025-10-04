import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNewSession = () => {
    // No-op for now
    console.log('New session clicked');
  };

  return (
    <nav className="navbar sticky top-0 z-50 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-md shadow-lg border-b border-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
            <Menu className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-300"
          >
            <li>
              <button onClick={handleNewSession} className="btn btn-primary btn-sm w-full">
                <span className="mr-2">✨</span>
                New Session
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/settings')} className="btn btn-ghost btn-sm w-full">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-error btn-sm w-full">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold text-white hover:bg-white/20">
          <span className="mr-2">🎯</span>
          FocusMate
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <button
          onClick={handleNewSession}
          className="btn btn-primary btn-sm shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <span className="mr-2">✨</span>
          New Session
        </button>
      </div>

      <div className="navbar-end">
        {/* Theme Toggle */}
        <div className="mr-4">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onChange={() =>
              document.documentElement.classList.toggle("dark")
            }
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-10 rounded-full ring ring-white ring-offset-2 ring-offset-primary">
              <img
                alt="Profile"
                src={user?.photoURL || 'https://via.placeholder.com/40x40/6366f1/ffffff?text=U'}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 border border-base-300 ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <li className="menu-title">
              <span className="font-semibold">{user?.displayName || 'User'}</span>
            </li>
            <li>
              <button onClick={() => navigate('/settings')} className="btn btn-ghost btn-sm w-full">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-error btn-sm w-full">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;