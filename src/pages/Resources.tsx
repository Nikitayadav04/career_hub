import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Video, Award, Code, Globe, Terminal, Cpu, Database, Clock } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      category: 'Interview Preparation',
      icon: Video,
      items: [
        { title: 'Mastering Behavioral Interviews', provider: 'CareerHub Academy', type: 'Course', duration: '5 Hours', image: 'https://picsum.photos/seed/interview/400/200' },
        { title: 'System Design Interview Guide', provider: 'Design Gurus', type: 'E-Book', duration: '200 Pages', image: 'https://picsum.photos/seed/system/400/200' },
        { title: 'Coding Interview Patterns', provider: 'LeetCode', type: 'Practice', duration: '50 Problems', image: 'https://picsum.photos/seed/coding/400/200' },
      ]
    },
    {
      category: 'Coding & Development',
      icon: Code,
      items: [
        { title: 'Full Stack Web Development', provider: 'CareerHub Academy', type: 'Course', duration: '12 Weeks', image: 'https://picsum.photos/seed/web/400/200' },
        { title: 'Advanced React Patterns', provider: 'Frontend Masters', type: 'Workshop', duration: '8 Hours', image: 'https://picsum.photos/seed/react/400/200' },
        { title: 'Node.js Microservices', provider: 'Udemy', type: 'Course', duration: '15 Hours', image: 'https://picsum.photos/seed/node/400/200' },
      ]
    },
    {
      category: 'Data Science & AI',
      icon: Database,
      items: [
        { title: 'Machine Learning Specialization', provider: 'Coursera', type: 'Certification', duration: '4 Months', image: 'https://picsum.photos/seed/ml/400/200' },
        { title: 'Deep Learning with PyTorch', provider: 'Udacity', type: 'Nanodegree', duration: '3 Months', image: 'https://picsum.photos/seed/ai/400/200' },
        { title: 'Data Engineering Essentials', provider: 'DataCamp', type: 'Course', duration: '20 Hours', image: 'https://picsum.photos/seed/data/400/200' },
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          <p className="text-slate-500">Curated courses and certifications to boost your career.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl glass text-sm font-bold text-primary">My Courses</button>
          <button className="px-4 py-2 rounded-xl glass text-sm font-bold">Certifications</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Free Courses', value: '450+', icon: Video, color: 'text-blue-500' },
          { label: 'Certifications', value: '120+', icon: Award, color: 'text-pink-500' },
          { label: 'Coding Labs', value: '85', icon: Terminal, color: 'text-purple-500' },
          { label: 'Mentors', value: '1.2k', icon: Globe, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {resources.map((section, i) => (
        <section key={i} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <section.icon size={20} />
            </div>
            <h2 className="text-2xl font-bold">{section.category}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {section.items.map((item, j) => (
              <motion.div
                key={j}
                whileHover={{ y: -5 }}
                className="card p-0 overflow-hidden group cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest">
                    {item.type}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.provider}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={14} /> {item.duration}</span>
                    <button className="text-primary font-bold hover:underline">Enroll Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Resources;
