import React from 'react';
import { Github, Linkedin, Instagram, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CareerHub
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Empowering your career journey with AI-driven insights, networking, and professional tools.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/jobs" className="hover:text-primary transition-colors">Find Jobs</a></li>
              <li><a href="/explorer" className="hover:text-primary transition-colors">Career Explorer</a></li>
              <li><a href="/ai-coach" className="hover:text-primary transition-colors">AI Coach</a></li>
              <li><a href="/resume" className="hover:text-primary transition-colors">Resume Builder</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="/resources" className="hover:text-primary transition-colors">Learning Center</a></li>
              <li><a href="/resume-analyzer" className="hover:text-primary transition-colors">ATS Checker</a></li>
              <li><a href="/mock-interview" className="hover:text-primary transition-colors">Mock Interviews</a></li>
              <li><a href="/quiz" className="hover:text-primary transition-colors">Skill Quizzes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-all">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-all">
                <Twitter size={20} />
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Mail size={16} />
              <span>support@careerhub.com</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 CareerHub. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-current" /> for professionals
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
