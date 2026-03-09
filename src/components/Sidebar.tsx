import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Users, 
  Compass, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  LayoutDashboard,
  Settings,
  HelpCircle,
  X,
  FileSearch,
  Video,
  Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Home', path: '/', icon: Home },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Networking', path: '/networking', icon: Users },
    { name: 'Career Explorer', path: '/explorer', icon: Compass },
    { name: 'Resources', path: '/resources', icon: BookOpen },
    { name: 'AI Coach', path: '/ai-coach', icon: MessageSquare },
    { name: 'Mock Interview', path: '/mock-interview', icon: Video },
    { name: 'Resume Builder', path: '/resume', icon: FileText },
    { name: 'Resume Analyzer', path: '/resume-analyzer', icon: FileSearch },
    { name: 'Skill Quiz', path: '/quiz', icon: Gamepad2 },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Content */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className={`fixed top-0 left-0 h-full w-64 glass border-r border-white/10 z-50 lg:translate-x-0 transition-none`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CareerHub
              </span>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm shadow-primary/5' 
                    : 'text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}
                `}
              >
                <link.icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
            <NavLink
              to="/help"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <HelpCircle size={20} />
              <span>Help Center</span>
            </NavLink>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
