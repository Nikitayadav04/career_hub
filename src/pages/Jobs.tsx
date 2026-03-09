import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Filter, 
  Bookmark, 
  ChevronRight, 
  Clock,
  Building2,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Job } from '../types';
import confetti from 'canvas-confetti';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const handleApply = async (jobId: number) => {
    if (!user) {
      alert('Please login to apply for jobs.');
      return;
    }
    setApplying(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId }),
      });
      if (res.ok) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F8CFF', '#FF6B9A']
        });
        alert('Application submitted successfully!');
        setSelectedJob(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading jobs...</div>;

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold">Find Your Dream Job</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by title, company, or keywords" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl glass border-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <button className="btn-primary flex items-center gap-2 px-8">
            <Filter size={20} /> Filters
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredJobs.length > 0 ? filteredJobs.map((job) => (
            <motion.div
              layout
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`card cursor-pointer group transition-all duration-300 ${selectedJob?.id === job.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-2xl shadow-sm" />
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="text-slate-500 font-medium flex items-center gap-1">
                      <Building2 size={16} /> {job.company}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                  <Bookmark size={20} className="text-slate-400" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                  <MapPin size={16} /> {job.location}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                  <Briefcase size={16} /> {job.type}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-lg font-medium">
                  <DollarSign size={16} /> {job.salary}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 ml-auto">
                  <Clock size={16} /> {new Date(job.posted_at).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-20 card">
              <p className="text-slate-500">No jobs found matching your search.</p>
            </div>
          )}
        </div>

        {/* Job Detail Sidebar (Desktop) / Modal (Mobile) */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:sticky lg:top-24 h-fit space-y-6"
            >
              <div className="card space-y-6 relative">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg lg:hidden"
                >
                  <X size={20} />
                </button>
                
                <div className="text-center space-y-4">
                  <img src={selectedJob.logo} alt={selectedJob.company} className="w-20 h-20 rounded-3xl mx-auto shadow-lg" />
                  <div>
                    <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                    <p className="text-primary font-semibold">{selectedJob.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Location</p>
                    <p className="text-sm font-semibold">{selectedJob.location}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Salary</p>
                    <p className="text-sm font-semibold text-emerald-500">{selectedJob.salary}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-2">Job Description</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Requirements</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {selectedJob.requirements}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => handleApply(selectedJob.id)}
                    disabled={applying}
                    className="flex-1 btn-primary py-3"
                  >
                    {applying ? 'Applying...' : 'Apply Now'}
                  </button>
                  <button className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> AI Insights
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Based on your profile, you have a 85% match for this role. Your skills in React and TypeScript align perfectly with their requirements.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Jobs;
