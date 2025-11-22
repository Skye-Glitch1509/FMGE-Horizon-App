import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Book } from 'lucide-react';
import { SYLLABUS_DATA } from '../services/mockData';

export const Syllabus: React.FC = () => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const handleExpand = (subject: string) => {
    if (expandedSubject === subject) {
      setExpandedSubject(null);
      return;
    }
    setExpandedSubject(subject);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-3">FMGE Syllabus</h2>
      <p className="text-slate-400 mb-10 text-lg">Comprehensive subject-wise weightage and high-yield topics.</p>

      <div className="space-y-4">
        {SYLLABUS_DATA.map((sub) => (
          <div key={sub.name} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm hover:border-slate-700 transition-all">
            <button 
              onClick={() => handleExpand(sub.name)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-lg
                  ${expandedSubject === sub.name ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-400'} transition-colors duration-300`}>
                    {sub.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                    <h3 className={`font-bold text-lg ${expandedSubject === sub.name ? 'text-teal-400' : 'text-slate-200'} transition-colors`}>{sub.name}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">{sub.weightage}</p>
                </div>
              </div>
              {expandedSubject === sub.name ? <ChevronUp className="text-teal-400" /> : <ChevronDown className="text-slate-600" />}
            </button>

            {expandedSubject === sub.name && (
              <div className="bg-slate-950/50 p-6 border-t border-slate-800">
                <div className="flex items-center gap-2 mb-4 text-blue-400 text-sm font-bold uppercase tracking-wider">
                    <Book size={16} />
                    High Yield Topics
                </div>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sub.topics.map((topic, idx) => (
                        <li key={idx} className="text-sm text-slate-300 flex items-start gap-3 p-2 rounded hover:bg-slate-800/50 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span> 
                            {topic}
                        </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};