import React from 'react';
import { Activity, BookOpen, Calendar, PlayCircle, Sparkles, ChevronRight } from 'lucide-react';
import { View, QuizMode } from '../types';

interface DashboardProps {
  onChangeView: (view: View, mode?: QuizMode) => void;
  lastScore?: number;
  weakAreas: string[];
}

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView, lastScore, weakAreas }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in p-4 md:p-0">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-teal-400 text-xs font-bold tracking-widest uppercase shadow-xl shadow-black/20 backdrop-blur-md">
          <Sparkles size={12} />
          All-in-One FMGE Solution
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Welcome to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500">
            FMGE Horizon
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Your comprehensive platform to plan, track, and conquer the FMGE exam. 
          Built by medical students, for medical students.
        </p>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
        
        {/* Planner Button */}
        <button 
          onClick={() => onChangeView(View.PLANNER)}
          className="group relative overflow-hidden bg-slate-800 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
               <Calendar size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">Launch Planner</h3>
             <p className="text-sm text-slate-400 group-hover:text-slate-300">Design your study roadmap</p>
          </div>
        </button>

        {/* Syllabus Button */}
        <button 
          onClick={() => onChangeView(View.SYLLABUS)}
          className="group relative overflow-hidden bg-slate-800 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
               <BookOpen size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">View Syllabus</h3>
             <p className="text-sm text-slate-400 group-hover:text-slate-300">Track topic coverage</p>
          </div>
        </button>

        {/* Diagnostic Button */}
        <button 
          onClick={() => onChangeView(View.QUIZ, QuizMode.DIAGNOSTIC)}
          className="group relative overflow-hidden bg-gradient-to-br from-pink-600 to-orange-500 p-0.5 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-900/40"
        >
          <div className="bg-slate-900 h-full w-full rounded-[14px] p-6 group-hover:bg-slate-900/90 transition-colors">
             <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-pink-500/30">
               <Activity size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-1">Take Diagnostic</h3>
             <p className="text-sm text-slate-400">Find your weak spots</p>
          </div>
        </button>

        {/* Daily Quiz Button */}
        <button 
          onClick={() => onChangeView(View.QUIZ, QuizMode.DAILY)}
          className="group relative overflow-hidden bg-gradient-to-br from-teal-500 to-blue-600 p-0.5 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/40"
        >
           <div className="bg-slate-900 h-full w-full rounded-[14px] p-6 group-hover:bg-slate-900/90 transition-colors">
             <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-teal-500/30">
               <PlayCircle size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-1">Daily Quiz</h3>
             <p className="text-sm text-slate-400">Practice makes perfect</p>
           </div>
        </button>
      </div>

      {/* Status Footer */}
      <div className="mt-16 flex gap-6 text-sm text-slate-500">
        {lastScore !== undefined && (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full">
                <div className={`w-2 h-2 rounded-full ${lastScore >= 50 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></div>
                <span>Last Score: <span className="text-slate-200 font-mono">{lastScore}%</span></span>
            </div>
        )}
        {weakAreas.length > 0 && (
             <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full">
                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                <span>Focus: <span className="text-slate-200">{weakAreas[0]}</span></span>
            </div>
        )}
      </div>

    </div>
  );
};