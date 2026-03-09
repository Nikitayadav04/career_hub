import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Search, ArrowRight, GraduationCap, Briefcase, DollarSign, TrendingUp, BookOpen } from 'lucide-react';

const CareerExplorer = () => {
  const [degree, setDegree] = useState('');

  const careerPaths = [
    {
      title: 'Software Engineer',
      degree: 'B.Tech / CS',
      salary: '$120k - $180k',
      growth: 'High',
      skills: ['React', 'Node.js', 'System Design'],
      desc: 'Build and maintain complex software systems and applications.'
    },
    {
      title: 'Data Scientist',
      degree: 'B.Tech / Statistics',
      salary: '$130k - $190k',
      growth: 'Very High',
      skills: ['Python', 'Machine Learning', 'SQL'],
      desc: 'Analyze large datasets to extract meaningful insights and build predictive models.'
    },
    {
      title: 'Product Manager',
      degree: 'MBA / BBA',
      salary: '$110k - $170k',
      growth: 'High',
      skills: ['Strategy', 'Roadmapping', 'Agile'],
      desc: 'Define the vision and strategy for products and lead cross-functional teams.'
    },
    {
      title: 'UX Designer',
      degree: 'Design / Arts',
      salary: '$90k - $150k',
      growth: 'Moderate',
      skills: ['Figma', 'User Research', 'Prototyping'],
      desc: 'Create intuitive and beautiful user experiences for digital products.'
    },
    {
      title: 'DevOps Engineer',
      degree: 'B.Tech / IT',
      salary: '$125k - $185k',
      growth: 'High',
      skills: ['Docker', 'Kubernetes', 'CI/CD'],
      desc: 'Bridge the gap between development and operations for faster delivery.'
    },
    {
      title: 'Marketing Manager',
      degree: 'MBA / Marketing',
      salary: '$80k - $140k',
      growth: 'Moderate',
      skills: ['SEO', 'Content Strategy', 'Analytics'],
      desc: 'Drive brand awareness and user acquisition through creative campaigns.'
    }
  ];

  const filteredPaths = careerPaths.filter(path => 
    path.degree.toLowerCase().includes(degree.toLowerCase()) ||
    path.title.toLowerCase().includes(degree.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
          <Compass size={32} />
        </div>
        <h1 className="text-4xl font-bold">Career Explorer</h1>
        <p className="text-slate-500">Discover your ideal career path based on your education and interests.</p>
        
        <div className="relative pt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Enter your degree (e.g. B.Tech, MBA)" 
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl glass border-none focus:ring-2 focus:ring-primary/20 transition-all text-lg"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPaths.map((path, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="card group hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Briefcase size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {path.degree}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{path.title}</h3>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">{path.desc}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <DollarSign size={14} className="text-emerald-500" /> {path.salary}
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <TrendingUp size={14} className="text-primary" /> {path.growth} Growth
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Key Skills</p>
              <div className="flex flex-wrap gap-2">
                {path.skills.map((skill, j) => (
                  <span key={j} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full mt-8 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all group/btn">
              View Roadmap <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="card bg-slate-900 text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0">
            <BookOpen size={48} />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold">Unsure about your career?</h2>
            <p className="text-slate-400">Take our AI-powered career assessment test to find the perfect match for your personality and skills.</p>
          </div>
          <button className="btn-primary !py-4 !px-10 whitespace-nowrap">
            Take Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerExplorer;
