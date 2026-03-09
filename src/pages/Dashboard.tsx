import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  FileText,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Job, Application } from '../types';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(5); // Mock streak
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete a skill quiz', completed: false },
    { id: 2, text: 'Apply to 2 new jobs', completed: true },
    { id: 3, text: 'Update your profile bio', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/user/applications', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        setJobs(await jobsRes.json());
        setApplications(await appsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const stats = [
    { label: 'Applied Jobs', value: applications.length, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Study Streak', value: `${streak} Days`, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Connections', value: 142, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Resume Score', value: '84%', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const chartData = [
    { name: 'Mon', apps: 2, views: 12 },
    { name: 'Tue', apps: 5, views: 25 },
    { name: 'Wed', apps: 3, views: 18 },
    { name: 'Thu', apps: 8, views: 32 },
    { name: 'Fri', apps: 6, views: 28 },
    { name: 'Sat', apps: 1, views: 10 },
    { name: 'Sun', apps: 4, views: 15 },
  ];

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-500 dark:text-slate-400">Here's what's happening with your career today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <BrainCircuit size={18} /> AI Career Advice
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Tasks */}
        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Daily Study Tasks</h3>
            <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
              <Zap size={16} fill="currentColor" /> {streak} Day Streak
            </div>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  task.completed 
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-slate-400' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-primary/30'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
                }`}>
                  {task.completed && <CheckCircle size={14} className="text-white" />}
                </div>
                <span className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-primary/5 text-xs text-slate-500 leading-relaxed">
            Complete all tasks to maintain your streak and earn 50 CareerPoints!
          </div>
        </div>

        {/* Activity Chart */}
        <div className="lg:col-span-2 card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Application Activity</h3>
            <select className="bg-transparent border-none text-sm font-medium focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F8CFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F8CFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="apps" stroke="#4F8CFF" fillOpacity={1} fill="url(#colorApps)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Recommended Jobs</h3>
            <TrendingUp size={18} className="text-primary" />
          </div>
          <div className="space-y-4">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <img src={job.logo} alt={job.company} className="w-10 h-10 rounded-lg" />
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{job.title}</h4>
                    <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-500">{job.salary}</span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-primary transition-all" />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 text-sm font-semibold text-primary hover:underline">
            View All Recommendations
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="card space-y-6">
        <h3 className="text-lg font-bold">Recent Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-200 dark:border-slate-800">
                <th className="pb-4 font-medium">Job Role</th>
                <th className="pb-4 font-medium">Company</th>
                <th className="pb-4 font-medium">Date Applied</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {applications.length > 0 ? applications.map((app) => (
                <tr key={app.id} className="text-sm">
                  <td className="py-4 font-semibold">{app.title}</td>
                  <td className="py-4 text-slate-500">{app.company}</td>
                  <td className="py-4 text-slate-500">{new Date(app.applied_at).toLocaleDateString()}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'applied' ? 'bg-blue-100 text-blue-600' : 
                      app.status === 'interview' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-primary hover:underline font-medium">View Details</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">No applications yet. Start applying!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
