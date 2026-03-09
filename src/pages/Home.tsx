import React from 'react';
import { motion } from 'motion/react';
import { Search, Briefcase, Users, BrainCircuit, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-secondary/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-sm text-sm font-medium text-primary"
          >
            <Star size={16} fill="currentColor" />
            <span>The #1 AI Career Platform</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Your AI-Powered Path to <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Career Success
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
          >
            CareerHub combines networking, job search, and AI coaching to help you land your dream job and grow your professional network.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/jobs" className="btn-primary flex items-center gap-2 w-full sm:w-auto">
              Find Jobs <Briefcase size={18} />
            </Link>
            <Link to="/ai-coach" className="btn-secondary flex items-center gap-2 w-full sm:w-auto">
              Try AI Coach <BrainCircuit size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Search Bar Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto mt-16 p-2 rounded-2xl glass shadow-2xl flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 flex items-center px-4 py-3 gap-3">
            <Search className="text-slate-400" />
            <input type="text" placeholder="Job title or keyword" className="bg-transparent border-none focus:ring-0 w-full" />
          </div>
          <div className="w-px bg-slate-200 dark:bg-slate-700 hidden md:block my-2"></div>
          <div className="flex-1 flex items-center px-4 py-3 gap-3">
            <Search className="text-slate-400" />
            <input type="text" placeholder="Location" className="bg-transparent border-none focus:ring-0 w-full" />
          </div>
          <button className="btn-primary">Search</button>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "AI Career Coach",
            desc: "Get personalized career advice, resume feedback, and mock interviews with our advanced AI.",
            icon: BrainCircuit,
            color: "bg-blue-500"
          },
          {
            title: "Smart Networking",
            desc: "Connect with professionals in your field and build meaningful relationships that last.",
            icon: Users,
            color: "bg-pink-500"
          },
          {
            title: "Job Matching",
            desc: "Our AI matches you with the best opportunities based on your skills and preferences.",
            icon: Briefcase,
            color: "bg-purple-500"
          }
        ].map((feat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="card group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl ${feat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-${feat.color.split('-')[1]}-500/20`}>
              <feat.icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "500k+" },
            { label: "Jobs Posted", value: "120k+" },
            { label: "Companies", value: "15k+" },
            { label: "Success Rate", value: "94%" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-white text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px]"></div>
        </div>
        
        <h2 className="text-4xl font-bold">Ready to accelerate your career?</h2>
        <p className="text-white/80 max-w-xl mx-auto text-lg">
          Join thousands of professionals who are using CareerHub to find their next big opportunity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register" className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95">
            Get Started Now
          </Link>
          <Link to="/about" className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all active:scale-95">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
