import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';
import { ResultsView } from './components/ResultsView';
import { Syllabus } from './components/Syllabus';
import { Planner } from './components/Planner';
import { View, QuizMode, QuizResult } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [quizMode, setQuizMode] = useState<QuizMode>(QuizMode.DAILY);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine weak areas based on last diagnostic result
  const handleQuizComplete = (result: QuizResult) => {
    setLastResult(result);
    
    if (quizMode === QuizMode.DIAGNOSTIC) {
      const weak = Object.entries(result.subjectBreakdown)
        .filter(([_, stats]) => (stats.correct / stats.total) < 0.5)
        .map(([subject]) => subject);
      setWeakAreas(weak);
    }
    
    setCurrentView(View.RESULTS);
  };

  const handleNavigate = (view: View, mode?: QuizMode) => {
    if (mode) setQuizMode(mode);
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <Sidebar 
        currentView={currentView} 
        onChangeView={(v) => handleNavigate(v, v === View.QUIZ ? QuizMode.DAILY : undefined)} 
        isMobileOpen={isMobileMenuOpen}
        closeMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Wrapper */}
      <main className="flex-1 md:ml-64 transition-all relative">
        
        {/* Background decorative elements */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[80px]"></div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded flex items-center justify-center text-white font-bold shadow-lg">F</div>
             <span className="font-bold text-lg text-white">Horizon</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
             <Menu size={24} />
           </button>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto pt-6 md:pt-12 pb-20 px-4 md:px-8 relative z-10">
          {currentView === View.DASHBOARD && (
            <Dashboard 
              onChangeView={handleNavigate} 
              lastScore={lastResult?.scorePercentage}
              weakAreas={weakAreas}
            />
          )}

          {currentView === View.QUIZ && (
            <Quiz 
              mode={quizMode} 
              onComplete={handleQuizComplete}
              onCancel={() => setCurrentView(View.DASHBOARD)}
            />
          )}

          {currentView === View.RESULTS && lastResult && (
            <ResultsView 
              result={lastResult} 
              onBack={() => setCurrentView(View.DASHBOARD)}
              onRetry={() => setCurrentView(View.QUIZ)}
            />
          )}

          {currentView === View.SYLLABUS && <Syllabus />}
          
          {currentView === View.PLANNER && <Planner weakSubjects={weakAreas} />}
        </div>
      </main>
    </div>
  );
};

export default App;