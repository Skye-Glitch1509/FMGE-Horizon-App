import React, { useState } from 'react';
import { QuizResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RefreshCw, ClipboardList, CheckCircle2, AlertTriangle, XCircle, BookOpen, Filter } from 'lucide-react';

interface ResultsViewProps {
  result: QuizResult;
  onBack: () => void;
  onRetry: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onBack, onRetry }) => {
  const [filter, setFilter] = useState<'ALL' | 'INCORRECT' | 'CORRECT'>('ALL');

  // Prepare data for chart
  const chartData = Object.entries(result.subjectBreakdown).map(([subject, stats]) => {
    const s = stats as { total: number; correct: number };
    return {
      name: subject,
      score: Math.round((s.correct / s.total) * 100),
      total: s.total
    };
  });

  // Prepare data for the detailed table
  const tableData = Object.entries(result.subjectBreakdown)
    .map(([subject, stats]) => {
        const s = stats as { total: number; correct: number };
        const percentage = (s.correct / s.total) * 100;
        let status = 'Weak';
        let color = 'text-red-400';
        let bg = 'bg-red-500/10 border-red-500/20';
        let Icon = XCircle;

        if (percentage >= 80) {
            status = 'Strong';
            color = 'text-green-400';
            bg = 'bg-green-500/10 border-green-500/20';
            Icon = CheckCircle2;
        } else if (percentage >= 50) {
            status = 'Moderate';
            color = 'text-yellow-400';
            bg = 'bg-yellow-500/10 border-yellow-500/20';
            Icon = AlertTriangle;
        }

        return { subject, ...s, percentage, status, color, bg, Icon };
    })
    .sort((a, b) => b.percentage - a.percentage); // Sort best to worst

  // Filter questions
  const filteredQuestions = result.questions?.filter((q, idx) => {
     const isCorrect = result.userAnswers?.[idx] === q.correctAnswerIndex;
     if (filter === 'INCORRECT') return !isCorrect;
     if (filter === 'CORRECT') return isCorrect;
     return true;
  });

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-slate-400">Detailed performance breakdown.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Score Card */}
        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col items-center justify-center col-span-1 md:col-span-1 text-center relative overflow-hidden min-h-[300px]">
           <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
           <div className="relative w-40 h-40 flex items-center justify-center mb-6">
             <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className={`${result.scorePercentage >= 50 ? 'text-teal-500' : 'text-orange-500'} transition-all duration-1000`}
                  strokeDasharray={`${result.scorePercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
             </svg>
             <div className="absolute flex flex-col items-center">
               <span className="text-4xl font-bold text-white">{result.scorePercentage}%</span>
               <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Accuracy</span>
             </div>
           </div>
           <p className="text-slate-400 relative z-10">
             You answered <strong className="text-white">{result.correctAnswers}</strong> out of <strong className="text-white">{result.totalQuestions}</strong> correctly.
           </p>
        </div>

        {/* Chart */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 col-span-1 md:col-span-2 flex flex-col min-h-[300px]">
          <h3 className="text-lg font-bold text-slate-200 mb-6">Subject Performance</h3>
          <div className="h-64 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  formatter={(value: number) => [`${value}%`, 'Accuracy']}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score >= 50 ? '#14b8a6' : '#f97316'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Table */}
      <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/30">
            <h3 className="font-bold text-slate-200">Topic-wise Analysis</h3>
        </div>
        
        {/* Mobile: Card Layout */}
        <div className="md:hidden divide-y divide-slate-800">
           {tableData.map((row) => (
             <div key={row.subject} className="p-5 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                   <h4 className="font-medium text-slate-200 text-lg">{row.subject}</h4>
                   <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${row.bg} ${row.color} text-xs font-bold uppercase tracking-wide`}>
                        <row.Icon size={12} />
                        {row.status}
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500 bg-slate-950/50 p-3 rounded-lg">
                    <div className="flex flex-col items-center flex-1 border-r border-slate-800">
                        <span className="font-bold text-slate-300">{row.total}</span>
                        <span className="text-xs">Questions</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 border-r border-slate-800">
                         <span className="font-bold text-slate-300">{row.correct}</span>
                         <span className="text-xs">Correct</span>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                         <span className="font-bold text-white">{Math.round(row.percentage)}%</span>
                         <span className="text-xs">Accuracy</span>
                    </div>
                </div>
             </div>
           ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-950 text-slate-500 uppercase font-bold text-xs tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Subject</th>
                        <th className="px-6 py-4 text-center">Questions</th>
                        <th className="px-6 py-4 text-center">Correct</th>
                        <th className="px-6 py-4 text-center">Accuracy</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {tableData.map((row) => (
                        <tr key={row.subject} className="hover:bg-slate-800/50 transition-colors group">
                            <td className="px-6 py-4 font-medium text-slate-200">{row.subject}</td>
                            <td className="px-6 py-4 text-center text-slate-500">{row.total}</td>
                            <td className="px-6 py-4 text-center text-slate-500">{row.correct}</td>
                            <td className="px-6 py-4 text-center font-bold text-slate-300">{Math.round(row.percentage)}%</td>
                            <td className="px-6 py-4">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${row.bg} ${row.color} text-xs font-bold uppercase tracking-wide`}>
                                    <row.Icon size={12} />
                                    {row.status}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Detailed Question Review Section */}
      {result.questions && result.userAnswers && (
        <div className="mb-10 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 border border-blue-500/20">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Review Solutions</h3>
                    <p className="text-slate-400 text-sm">Detailed explanations for all questions.</p>
                </div>
             </div>

             {/* Filter Controls */}
             <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button 
                    onClick={() => setFilter('ALL')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'ALL' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => setFilter('INCORRECT')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'INCORRECT' ? 'bg-red-500/20 text-red-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    Incorrect
                </button>
                <button 
                    onClick={() => setFilter('CORRECT')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === 'CORRECT' ? 'bg-green-500/20 text-green-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                    Correct
                </button>
             </div>
          </div>

          <div className="space-y-6">
            {filteredQuestions?.length === 0 && (
                <div className="text-center py-10 bg-slate-900 rounded-xl border border-dashed border-slate-800 text-slate-500">
                    No questions match this filter.
                </div>
            )}

            {filteredQuestions?.map((q) => {
                const index = result.questions!.indexOf(q);
                const userAnswerIdx = result.userAnswers?.[index];
                const isCorrect = userAnswerIdx === q.correctAnswerIndex;

                return (
                <div key={q.id} className={`bg-slate-900 rounded-xl border ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'} overflow-hidden transition-all hover:shadow-lg`}>
                    {/* Header with Q number and status */}
                    <div className={`px-6 py-3 border-b ${isCorrect ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} flex justify-between items-center`}>
                        <span className={`font-bold flex items-center gap-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        Question {index + 1}
                        </span>
                        <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{q.subject}</span>
                        {q.topic && <span className="text-[10px] text-slate-500">{q.topic}</span>}
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <p className="text-slate-200 text-lg mb-6 font-medium leading-relaxed">{q.text}</p>
                        
                        <div className="space-y-2 mb-6">
                        {q.options.map((opt, optIdx) => {
                            let optClass = "p-3 rounded-lg border text-sm transition-colors ";
                            // Logic for styling options
                            if (optIdx === q.correctAnswerIndex) {
                            optClass += "bg-green-500/20 border-green-500/50 text-green-200 font-medium";
                            } else if (optIdx === userAnswerIdx) {
                            optClass += "bg-red-500/20 border-red-500/50 text-red-200 font-medium";
                            } else {
                            optClass += "bg-slate-950/50 border-slate-800 text-slate-500";
                            }
                            
                            return (
                            <div key={optIdx} className={optClass}>
                                <div className="flex justify-between items-center">
                                    <span>{opt}</span>
                                    {optIdx === q.correctAnswerIndex && <span className="text-xs font-bold uppercase tracking-wider text-green-400">Correct Answer</span>}
                                    {optIdx === userAnswerIdx && optIdx !== q.correctAnswerIndex && <span className="text-xs font-bold uppercase tracking-wider text-red-400">Your Answer</span>}
                                </div>
                            </div>
                            )
                        })}
                        </div>

                        <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-5 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                        <h4 className="text-blue-400 font-bold text-sm mb-2 flex items-center gap-2">
                            Explanation
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
                        </div>
                    </div>
                </div>
                );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row justify-center gap-4">
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl font-semibold hover:bg-slate-800 hover:text-white flex items-center justify-center gap-2 shadow-sm transition-all w-full sm:w-auto"
        >
          <ClipboardList size={20} />
          Dashboard
        </button>
        <button 
          onClick={onRetry}
          className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-500 flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all w-full sm:w-auto"
        >
          <RefreshCw size={20} />
          New Quiz
        </button>
      </div>
    </div>
  );
};