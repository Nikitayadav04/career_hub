import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Sparkles, Download, Wand2, Loader2, CheckCircle } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import Markdown from 'react-markdown';
import confetti from 'canvas-confetti';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    skills: '',
    targetRole: ''
  });
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = `Generate a professional, modern resume in Markdown format for the following person:
      Name: ${formData.name}
      Email: ${formData.email}
      Target Role: ${formData.targetRole}
      Experience: ${formData.experience}
      Skills: ${formData.skills}
      
      Include sections for Summary, Experience, Skills, and Education. Use a professional tone.`;
      
      const response = await getGeminiResponse(prompt, "You are an expert resume writer.");
      setResume(response || '');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
      alert('Failed to generate resume. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Resume Builder</h1>
          <p className="text-slate-500">Create a professional resume in seconds with AI.</p>
        </div>
        {resume && (
          <button className="btn-primary flex items-center gap-2">
            <Download size={18} /> Export PDF
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <FileText size={20} className="text-primary" /> Details
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20" 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Target Role</label>
                <input 
                  type="text" 
                  value={formData.targetRole}
                  onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20" 
                  placeholder="Software Engineer"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Skills (comma separated)</label>
              <input 
                type="text" 
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20" 
                placeholder="React, Node.js, AWS..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Experience Summary</label>
              <textarea 
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20 min-h-[150px]" 
                placeholder="Describe your work history..."
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading || !formData.name}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Wand2 size={20} />}
              {loading ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="card bg-white dark:bg-slate-900 min-h-[600px] flex flex-col p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Preview</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
          <div className="flex-1 p-8 overflow-y-auto bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            {resume ? (
              <div className="markdown-body prose dark:prose-invert max-w-none">
                <Markdown>{resume}</Markdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <FileText size={64} className="text-slate-300" />
                <p>Fill in your details and click generate to see your resume here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
