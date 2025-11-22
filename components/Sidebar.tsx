import React from 'react';
import { LayoutDashboard, BookOpen, CalendarDays, GraduationCap, Activity } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  isMobileOpen: boolean;
  closeMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isMobileOpen, closeMobile }) => {
  const navItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.SYLLABUS, label: 'Syllabus', icon: BookOpen },
    { id: View.PLANNER, label: 'Study Planner', icon: CalendarDays },
    { id: View.QUIZ, label: 'Practice Zone', icon: GraduationCap }, 
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
            const isActive = currentView === item.id || (item.id === View.QUIZ && (currentView === View.RESULTS || currentView === View.QUIZ));
            
            return (
              <button
                key={item.id}
                onClick={() => {
                   if (item.id === View.QUIZ) onChangeView(View.QUIZ);
                   else onChangeView(item.id);
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

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <Activity size={16} />
                </div>
                <div>
                    <p className="text-slate-200 text-sm font-medium">Pro Status</p>
                    <p className="text-slate-500 text-xs">Active</p>
                </div>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-400 to-blue-500 w-3/4 h-full rounded-full"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};