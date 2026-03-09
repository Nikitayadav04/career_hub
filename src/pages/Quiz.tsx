import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Trophy, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Star,
  Brain,
  Zap,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const categories = [
    { id: 'frontend', name: 'Frontend Development', icon: Brain, color: 'text-blue-500', bg: 'bg-blue-500/10', questions: 10 },
    { id: 'backend', name: 'Backend Systems', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10', questions: 10 },
    { id: 'softskills', name: 'Soft Skills', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10', questions: 10 },
    { id: 'aptitude', name: 'Logical Aptitude', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10', questions: 10 },
  ];

  const questions: Record<string, Question[]> = {
    frontend: [
      {
        id: 1,
        question: "What is the purpose of React's useEffect hook?",
        options: ["To manage component state", "To handle side effects", "To create custom components", "To optimize rendering"],
        correctAnswer: 1,
        explanation: "useEffect is used for side effects like data fetching, subscriptions, or manually changing the DOM."
      },
      {
        id: 2,
        question: "Which CSS property is used to create a flex container?",
        options: ["display: grid", "display: block", "display: flex", "display: inline"],
        correctAnswer: 2,
        explanation: "Setting 'display: flex' on an element makes it a flex container."
      },
      {
        id: 3,
        question: "What does the 'key' prop do in React lists?",
        options: ["Styles the element", "Identifies elements for efficient re-rendering", "Sets the index", "Binds data"],
        correctAnswer: 1,
        explanation: "Keys help React identify which items have changed, been added, or been removed."
      }
    ],
    backend: [
      {
        id: 1,
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Standard Query Language"],
        correctAnswer: 0,
        explanation: "SQL is the standard language for dealing with Relational Databases."
      }
    ]
  };

  useEffect(() => {
    let timer: any;
    if (category && !showResult && timeLeft > 0 && selectedOption === null) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && selectedOption === null) {
      handleOptionClick(-1); // Time out
    }
    return () => clearInterval(timer);
  }, [category, showResult, timeLeft, selectedOption]);

  const handleCategorySelect = (catId: string) => {
    setCategory(catId);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(30);
  };

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === questions[category!]?.[currentQuestion]?.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < (questions[category!]?.length || 0) - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setTimeLeft(30);
      } else {
        setShowResult(true);
        if (score + (correct ? 1 : 0) >= (questions[category!]?.length || 0) * 0.7) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Gamepad2 size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Skill Quiz Challenge</h1>
            <p className="text-slate-500">Test your knowledge and earn badges for your profile.</p>
          </div>
        </div>
        {category && !showResult && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">
              <Timer size={18} className={timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-primary'} />
              <span>{timeLeft}s</span>
            </div>
            <div className="text-sm font-bold text-slate-400">
              Question {currentQuestion + 1}/{questions[category]?.length}
            </div>
          </div>
        )}
      </header>

      <AnimatePresence mode="wait">
        {!category ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="card group text-left hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center`}>
                    <cat.icon size={28} />
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {cat.questions} Questions
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-slate-500 mb-6">Test your expertise in {cat.name.toLowerCase()} with our curated quiz.</p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  Start Quiz <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </motion.div>
        ) : showResult ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center py-12 space-y-8"
          >
            <div className="space-y-4">
              <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mx-auto">
                <Trophy size={48} />
              </div>
              <h2 className="text-3xl font-bold">Quiz Completed!</h2>
              <p className="text-slate-500">You scored {score} out of {questions[category]?.length}</p>
            </div>

            <div className="max-w-xs mx-auto p-6 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <div className="text-4xl font-bold text-primary mb-2">
                {Math.round((score / (questions[category]?.length || 1)) * 100)}%
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Accuracy</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCategory(null)}
                className="btn-primary px-8"
              >
                Try Another Category
              </button>
              <button 
                onClick={() => handleCategorySelect(category)}
                className="px-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
              >
                <RotateCcw size={18} /> Retake Quiz
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="card">
              <h2 className="text-2xl font-bold mb-8">{questions[category]?.[currentQuestion]?.question}</h2>
              <div className="grid grid-cols-1 gap-4">
                {questions[category]?.[currentQuestion]?.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(i)}
                    disabled={selectedOption !== null}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
                      selectedOption === i 
                        ? isCorrect 
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' 
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        : selectedOption !== null && i === questions[category!]?.[currentQuestion]?.correctAnswer
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                    {selectedOption === i && (
                      isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {selectedOption !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border-l-4 ${
                    isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-red-50 border-red-500 text-red-800'
                  }`}
                >
                  <h4 className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                  <p className="text-sm">{questions[category!]?.[currentQuestion]?.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
