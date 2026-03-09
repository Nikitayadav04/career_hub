import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages (to be implemented)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Networking from './pages/Networking';
import CareerExplorer from './pages/CareerExplorer';
import Resources from './pages/Resources';
import AICoach from './pages/AICoach';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import MockInterview from './pages/MockInterview';
import Quiz from './pages/Quiz';
import Footer from './components/Footer';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex">
        {user && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${user ? 'lg:ml-64' : ''}`}>
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/networking" element={<PrivateRoute><Networking /></PrivateRoute>} />
              <Route path="/explorer" element={<CareerExplorer />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/ai-coach" element={<PrivateRoute><AICoach /></PrivateRoute>} />
              <Route path="/mock-interview" element={<PrivateRoute><MockInterview /></PrivateRoute>} />
              <Route path="/resume" element={<PrivateRoute><ResumeBuilder /></PrivateRoute>} />
              <Route path="/resume-analyzer" element={<PrivateRoute><ResumeAnalyzer /></PrivateRoute>} />
              <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
            </Routes>
          </AppLayout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
