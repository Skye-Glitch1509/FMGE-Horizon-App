import React from 'react';
import { QuizResult } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RefreshCw, ClipboardList, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface ResultsViewProps {
  result: QuizResult;
  onBack: () => void;
  onRetry: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onBack, onRetry }) => {
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

  return (
    <div className="p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-slate-400">Detailed performance breakdown.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Score Card */}
        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col items-center justify-center col-span-1 md:col-span-1 text-center relative overflow-hidden">
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
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 col-span-1 md:col-span-2 flex flex-col">
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
        <div className="overflow-x-auto">
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

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={onBack}
          className="px-6 py-3 bg-slate-900 border border-slate-700 text-slate-300 rounded-xl font-semibold hover:bg-slate-800 hover:text-white flex items-center gap-2 shadow-sm transition-all"
        >
          <ClipboardList size={20} />
          Dashboard
        </button>
        <button 
          onClick={onRetry}
          className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-500 flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
        >
          <RefreshCw size={20} />
          New Quiz
        </button>
      </div>
    </div>
  );
};