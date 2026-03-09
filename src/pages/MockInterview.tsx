import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  BrainCircuit, 
  CheckCircle, 
  XCircle,
  Play,
  StopCircle,
  MessageSquare,
  Award
} from 'lucide-react';
import { createAIChat } from '../services/gemini';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  content: string;
}

const MockInterview = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [role, setRole] = useState('');
  const [chat, setChat] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const startInterview = async () => {
    if (!role.trim()) return;
    setLoading(true);
    
    const systemInstruction = `You are an expert technical interviewer for the role of ${role}. 
    Your goal is to conduct a realistic mock interview. 
    1. Start by introducing yourself and asking the candidate to introduce themselves.
    2. Ask one question at a time.
    3. Mix technical questions with behavioral questions.
    4. After the candidate answers, provide brief, constructive feedback on their answer before moving to the next question.
    5. Keep the tone professional but encouraging.
    6. If the candidate asks for help, provide a hint.`;

    const newChat = createAIChat(systemInstruction);
    setChat(newChat);
    
    try {
      const response = await newChat.sendMessage({ message: `I am ready for my ${role} interview. Please start.` });
      setMessages([{ role: 'model', content: response.text }]);
      setInterviewStarted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to start interview. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: "Error: Could not connect to the AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Video size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Mock Interview</h1>
            <p className="text-slate-500">Practice your interview skills with our intelligent simulator.</p>
          </div>
        </div>
      </header>

      {!interviewStarted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-2xl mx-auto text-center space-y-8 py-12"
        >
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
              <BrainCircuit size={48} />
            </div>
            <h2 className="text-2xl font-bold">Ready to practice?</h2>
            <p className="text-slate-500">Enter the role you're interviewing for and our AI will conduct a tailored session.</p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <input 
              type="text" 
              placeholder="e.g. Senior Frontend Engineer, Product Manager" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary/20 transition-all text-center font-medium"
            />
            <button 
              onClick={startInterview}
              disabled={loading || !role.trim()}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Play size={20} />}
              {loading ? 'Preparing Interview...' : 'Start Mock Interview'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="space-y-2">
              <div className="text-primary font-bold">100+</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">Roles</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary font-bold">AI</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">Feedback</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary font-bold">Real</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">Scenarios</div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-16rem)]">
          {/* Video Preview (Simulated) */}
          <div className="space-y-6">
            <div className="card aspect-video bg-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                  <User size={32} />
                </div>
                <p className="text-slate-500 text-sm">Camera is off for this session</p>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <button className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all">
                  <MicOff size={20} />
                </button>
                <button className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all">
                  <VideoOff size={20} />
                </button>
              </div>
            </div>

            <div className="card space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Award size={18} className="text-primary" /> Interview Tips
              </h3>
              <ul className="text-xs text-slate-500 space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-500 mt-0.5" />
                  Use the STAR method for behavioral questions.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-500 mt-0.5" />
                  Think out loud during technical problems.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-500 mt-0.5" />
                  Keep your answers concise and impactful.
                </li>
              </ul>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-2xl border border-red-200 text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-2 font-bold"
            >
              <StopCircle size={20} /> End Interview
            </button>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 card flex flex-col p-0 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Live Interview Session</span>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">{role}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}>
                      <div className="markdown-body">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                      <Bot size={16} />
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-primary" />
                      <span className="text-sm text-slate-500">Interviewer is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer here..."
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-4 bg-primary text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-50 active:scale-95"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
