import React from 'react';
import { LayoutDashboard, BookOpen, CalendarDays, Activity, PlayCircle } from 'lucide-react';
import { View, QuizMode } from '../types';

interface SidebarProps {
  currentView: View;
  currentMode: QuizMode;
  onChangeView: (view: View, mode?: QuizMode) => void;
  isMobileOpen: boolean;
  closeMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, currentMode, onChangeView, isMobileOpen, closeMobile }) => {
  
  const navItems = [
    { 
      id: View.DASHBOARD, 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      mode: undefined 
    },
    { 
      id: View.SYLLABUS, 
      label: 'Syllabus', 
      icon: BookOpen,
      mode: undefined 
    },
    { 
      id: View.PLANNER, 
      label: 'Study Planner', 
      icon: CalendarDays,
      mode: undefined 
    },
    { 
      id: View.QUIZ, 
      label: 'Diagnostic Test', 
      icon: Activity,
      mode: QuizMode.DIAGNOSTIC 
    }, 
    { 
      id: View.QUIZ, 
      label: 'Daily Quiz', 
      icon: PlayCircle,
      mode: QuizMode.DAILY 
    }, 
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 border-r border-slate-800 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
            <span className="text-white font-bold text-xl">FH</span>
          </div>
          <div>
             <h1 className="text-lg font-bold text-white tracking-tight leading-tight">FMGE <span className="text-teal-400">Horizon</span></h1>
             <p className="text-[10px] text-slate-400 uppercase tracking-wider">Prep Platform</p>
          </div>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            // Logic to determine if tab is active
            let isActive = false;

            if (item.id === View.QUIZ) {
              // For Quiz items, check if View is QUIZ (or RESULTS) AND the mode matches
              const isQuizView = currentView === View.QUIZ || currentView === View.RESULTS;
              isActive = isQuizView && currentMode === item.mode;
            } else {
              // For non-quiz items, simple view check
              isActive = currentView === item.id;
            }
            
            return (
              <button
                key={`${item.id}-${item.mode}`}
                onClick={() => {
                   onChangeView(item.id, item.mode);
                   closeMobile();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-teal-500/10 to-blue-500/10 text-teal-400 border border-teal-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:translate-x-1'}
                `}
              >
                <Icon size={20} className={`${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`} />
                <span className="font-medium">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]"></div>}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};