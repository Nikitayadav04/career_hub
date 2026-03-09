import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, MessageSquare, Search, Filter, MapPin, Briefcase, Star } from 'lucide-react';

const Networking = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const professionals = [
    { id: 1, name: 'Sarah Jenkins', role: 'Senior Product Designer', company: 'Google', location: 'Mountain View, CA', avatar: 'https://picsum.photos/seed/sarah/100/100', connections: '500+', mutual: 12 },
    { id: 2, name: 'Michael Chen', role: 'Engineering Manager', company: 'Meta', location: 'Menlo Park, CA', avatar: 'https://picsum.photos/seed/michael/100/100', connections: '1k+', mutual: 8 },
    { id: 3, name: 'Elena Rodriguez', role: 'Data Scientist', company: 'Netflix', location: 'Los Gatos, CA', avatar: 'https://picsum.photos/seed/elena/100/100', connections: '300+', mutual: 5 },
    { id: 4, name: 'David Kim', role: 'Full Stack Developer', company: 'Stripe', location: 'San Francisco, CA', avatar: 'https://picsum.photos/seed/david/100/100', connections: '800+', mutual: 15 },
    { id: 5, name: 'Priya Sharma', role: 'UX Researcher', company: 'Airbnb', location: 'Remote', avatar: 'https://picsum.photos/seed/priya/100/100', connections: '400+', mutual: 3 },
    { id: 6, name: 'Alex Thompson', role: 'Cloud Architect', company: 'AWS', location: 'Seattle, WA', avatar: 'https://picsum.photos/seed/alex/100/100', connections: '1.2k+', mutual: 20 },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Professional Networking</h1>
          <p className="text-slate-500">Connect with industry experts and grow your network.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <UserPlus size={18} /> Invitations (3)
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, role, or company" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl glass border-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <button className="px-6 py-3 rounded-2xl glass flex items-center gap-2 font-medium">
          <Filter size={20} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((pro, i) => (
          <motion.div
            key={pro.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card group"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="relative">
                <img src={pro.avatar} alt={pro.name} className="w-16 h-16 rounded-2xl shadow-md" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{pro.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{pro.role}</p>
                <p className="text-xs text-slate-400 font-medium">{pro.company}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin size={14} /> {pro.location}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Users size={14} /> {pro.connections} connections
              </div>
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <Star size={14} fill="currentColor" /> {pro.mutual} mutual connections
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn-primary !py-2 text-sm flex items-center justify-center gap-2">
                <UserPlus size={16} /> Connect
              </button>
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <MessageSquare size={18} className="text-slate-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card bg-gradient-to-br from-primary to-secondary p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">Grow your network with AI</h2>
          <p className="text-white/80">Let our AI suggest the best professionals for you to connect with based on your career goals.</p>
        </div>
        <button className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95 whitespace-nowrap">
          Get AI Suggestions
        </button>
      </div>
    </div>
  );
};

export default Networking;
