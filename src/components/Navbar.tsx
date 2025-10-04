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
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={handleNewSession}>New Session</button>
            </li>
            <li>
              <button onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold">FocusMate</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <button
          onClick={handleNewSession}
          className="btn btn-primary btn-sm"
        >
          New Session
        </button>
      </div>

      <div className="navbar-end">
        {/* Theme Toggle */}
        <input
          type="checkbox"
          className="toggle toggle-primary mr-4"
          onChange={() =>
            document.documentElement.classList.toggle("dark")
          }
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src={user?.photoURL || ''}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <li className="menu-title">
              <span>{user?.displayName || 'User'}</span>
            </li>
            <li>
              <button onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>
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