import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, LogOut, User, Bell, Search, Menu } from 'lucide-react';
import { motion } from 'motion/react';

const Navbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full glass h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
            CareerHub
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center bg-black/5 dark:bg-white/5 rounded-xl px-3 py-1.5 w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search jobs, companies, skills..." 
          className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {user ? (
          <>
            <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <Link to="/profile" className="flex items-center gap-2 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                {user.avatar ? <img src={user.avatar} alt={user.name} /> : <User size={18} />}
              </div>
              <span className="text-sm font-medium hidden lg:block">{user.name}</span>
            </Link>
            <button 
              onClick={logout}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-xl transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm font-medium px-4 py-2 hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/register" className="btn-primary !py-2 !px-4 text-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
