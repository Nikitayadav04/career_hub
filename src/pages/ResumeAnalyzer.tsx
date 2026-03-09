import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileSearch, Upload, Sparkles, Loader2, CheckCircle, AlertCircle, ArrowRight, BarChart3, Target, Zap, FileText, X } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import Markdown from 'react-markdown';
import confetti from 'canvas-confetti';

interface AnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  atsGaps: string[];
}

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [targetJob, setTargetJob] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  };

  const clearFile = () => {
    setFileName(null);
    setResumeText('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const systemPrompt = `You are an expert ATS (Applicant Tracking System) and HR professional. 
      Analyze the provided resume text against the target job description (if provided).
      Return a JSON object with the following structure:
      {
        "score": number (0-100),
        "summary": "Short overall summary",
        "strengths": ["strength 1", "strength 2"],
        "weaknesses": ["weakness 1", "weakness 2"],
        "improvements": ["specific improvement 1", "specific improvement 2"],
        "atsGaps": ["missing keywords or formatting issues"]
      }
      Be critical but constructive. Focus on impact, keywords, and formatting.`;

      const userPrompt = `Resume Content:
      ${resumeText}
      
      Target Job Description (Optional):
      ${targetJob || 'General professional standards'}
      
      Analyze this resume and provide the JSON response.`;

      const response = await getGeminiResponse(userPrompt, systemPrompt);
      
      // Extract JSON from response (Gemini might wrap it in markdown blocks)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setResult(parsed);
        
        if (parsed.score >= 80) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4F8CFF', '#10B981']
          });
        }
      } else {
        throw new Error("Failed to parse analysis result");
      }
    } catch (err) {
      console.error(err);
      alert('Analysis failed. Please ensure your resume text is clear and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <FileSearch size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Resume Analyzer</h1>
            <p className="text-slate-500">Check your ATS score and get professional feedback instantly.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="card space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <Upload size={16} className="text-primary" /> Resume Content
                  </label>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <FileText size={14} /> Upload File (.txt)
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept=".txt" 
                    className="hidden" 
                  />
                </div>

                {fileName ? (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" />
                      <div>
                        <p className="text-sm font-bold truncate max-w-[200px]">{fileName}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">File Uploaded</p>
                      </div>
                    </div>
                    <button onClick={clearFile} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-all">
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your full resume content here or upload a .txt file..."
                    className="w-full h-80 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2">
                  <Target size={16} className="text-secondary" /> Target Job Description (Optional)
                </label>
                <textarea
                  value={targetJob}
                  onChange={(e) => setTargetJob(e.target.value)}
                  placeholder="Paste the job description you're applying for to get tailored feedback..."
                  className="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary/20 transition-all resize-none text-sm"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading || !resumeText.trim()}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} />}
                {loading ? 'Analyzing Resume...' : 'Analyze Now'}
              </button>
            </div>
          </div>

          <div className="card bg-primary/5 border-primary/20">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Sparkles size={18} className="text-primary" /> Why use the Analyzer?
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-1 flex-shrink-0" />
                Identify missing industry-specific keywords.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-1 flex-shrink-0" />
                Check if your formatting is ATS-friendly.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={14} className="text-emerald-500 mt-1 flex-shrink-0" />
                Get tailored suggestions for specific job roles.
              </li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Score Card */}
                <div className="card text-center space-y-4 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 ${
                    result.score >= 80 ? 'bg-emerald-500' : 
                    result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  
                  <h3 className="text-lg font-bold text-slate-500 uppercase tracking-widest">ATS Match Score</h3>
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-slate-200 dark:text-slate-800"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="58"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className={`${
                          result.score >= 80 ? 'text-emerald-500' : 
                          result.score >= 60 ? 'text-yellow-500' : 'text-red-500'
                        }`}
                        strokeWidth="8"
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 - (364.4 * result.score) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="58"
                        cx="64"
                        cy="64"
                      />
                    </svg>
                    <span className="absolute text-4xl font-bold">{result.score}%</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium px-4">
                    {result.summary}
                  </p>
                </div>

                {/* Detailed Feedback */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="card space-y-4">
                    <h3 className="font-bold flex items-center gap-2 text-emerald-500">
                      <CheckCircle size={20} /> Key Strengths
                    </h3>
                    <ul className="space-y-2">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card space-y-4">
                    <h3 className="font-bold flex items-center gap-2 text-red-500">
                      <AlertCircle size={20} /> Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {result.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card space-y-4">
                    <h3 className="font-bold flex items-center gap-2 text-primary">
                      <Zap size={20} /> Actionable Suggestions
                    </h3>
                    <ul className="space-y-2">
                      {result.improvements.map((imp, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <ArrowRight size={14} className="mt-1 text-primary flex-shrink-0" />
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card space-y-4 bg-slate-900 text-white border-none">
                    <h3 className="font-bold flex items-center gap-2 text-yellow-400">
                      <BarChart3 size={20} /> ATS Gaps & Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.atsGaps.map((gap, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-white/10 text-xs font-medium">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-50 py-20 card border-dashed">
                <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <FileSearch size={40} className="text-slate-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Ready for Analysis</h3>
                  <p className="max-w-xs mx-auto text-sm">
                    Paste your resume text on the left to see your detailed ATS score and improvement suggestions.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
