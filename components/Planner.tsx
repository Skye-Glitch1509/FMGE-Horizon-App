import React, { useEffect, useState } from 'react';
import { PlanDay, PlanTask } from '../types';
import { Calendar, CheckCircle2, Plus, Trash2, Circle, X, Undo2 } from 'lucide-react';

interface PlannerProps {
  weakSubjects: string[];
}

export const Planner: React.FC<PlannerProps> = ({ weakSubjects }) => {
  const [plan, setPlan] = useState<PlanDay[]>([]);
  const [history, setHistory] = useState<PlanDay[][]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newDayTitle, setNewDayTitle] = useState('');
  const [showAddDay, setShowAddDay] = useState(false);
  const [newTaskText, setNewTaskText] = useState<Record<string, string>>({});

  // Robust ID generator to ensure compatibility
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 9);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('fmge-study-plan');
    if (savedPlan) {
      try {
        const parsed = JSON.parse(savedPlan);
        setPlan(parsed);
      } catch (e) {
        console.error("Failed to parse saved plan", e);
        initializeDefaultPlan();
      }
    } else {
      initializeDefaultPlan();
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever plan changes, but only after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fmge-study-plan', JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  const initializeDefaultPlan = () => {
    // Use the first weak subject as the default focus if available, otherwise fallback to Anatomy
    const defaultFocus = weakSubjects.length > 0 ? weakSubjects[0] : 'Anatomy';

    const initial: PlanDay[] = [
      {
        id: generateId(),
        title: 'Day 1',
        focus: defaultFocus,
        tasks: [
          { id: generateId(), text: `Review ${defaultFocus} High Yield topics`, completed: false },
          { id: generateId(), text: 'Solve 50 MCQs', completed: false }
        ]
      }
    ];
    setPlan(initial);
  };

  const saveToHistory = () => {
    setHistory(prev => {
        const newHistory = [...prev, JSON.parse(JSON.stringify(plan))]; // Deep copy
        // Limit history to last 20 states
        return newHistory.length > 20 ? newHistory.slice(newHistory.length - 20) : newHistory;
    });
  };

  const undo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setPlan(previousState);
  };

  const addDay = () => {
    if (!newDayTitle.trim()) return;
    saveToHistory();
    const newDay: PlanDay = {
      id: generateId(),
      title: newDayTitle,
      focus: 'General',
      tasks: []
    };
    setPlan([...plan, newDay]);
    setNewDayTitle('');
    setShowAddDay(false);
  };

  const deleteDay = (id: string) => {
    if (window.confirm("Delete this day?")) {
      saveToHistory();
      setPlan(plan.filter(d => d.id !== id));
    }
  };

  const addTask = (dayId: string) => {
    const text = newTaskText[dayId];
    if (!text?.trim()) return;
    
    saveToHistory();
    const updatedPlan = plan.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          tasks: [...day.tasks, { id: generateId(), text, completed: false }]
        };
      }
      return day;
    });
    setPlan(updatedPlan);
    setNewTaskText(prev => ({ ...prev, [dayId]: '' }));
  };

  const deleteTask = (dayId: string, taskId: string) => {
    saveToHistory();
    const updatedPlan = plan.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          tasks: day.tasks.filter(t => t.id !== taskId)
        };
      }
      return day;
    });
    setPlan(updatedPlan);
  };

  const toggleTask = (dayId: string, taskId: string) => {
    saveToHistory();
    const updatedPlan = plan.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          tasks: day.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
        };
      }
      return day;
    });
    setPlan(updatedPlan);
  };

  const updateDayFocus = (dayId: string, newFocus: string) => {
    const updatedPlan = plan.map(day => {
      if (day.id === dayId) return { ...day, focus: newFocus };
      return day;
    });
    setPlan(updatedPlan);
  };

  const updateDayTitle = (dayId: string, newTitle: string) => {
    const updatedPlan = plan.map(day => {
      if (day.id === dayId) return { ...day, title: newTitle };
      return day;
    });
    setPlan(updatedPlan);
  };

  return (
    <div className="p-4 md:p-6 animate-fade-in max-w-4xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/20">
                  <Calendar size={24} />
              </div>
              <h2 className="text-3xl font-bold text-white">Study Plan</h2>
          </div>
          <p className="text-slate-400">Design your personal roadmap. Drag, drop, and track.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
            <button
                onClick={undo}
                disabled={history.length === 0}
                className={`flex-1 md:flex-none justify-center px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-colors border ${
                    history.length === 0 
                    ? 'bg-slate-800 text-slate-600 border-slate-800 cursor-not-allowed' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600'
                }`}
                title="Undo last action"
            >
                <Undo2 size={20} />
                <span className="">Undo</span>
            </button>
            <button 
              onClick={() => setShowAddDay(true)}
              className="flex-1 md:flex-none justify-center bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
            >
              <Plus size={20} />
              <span className="">Add Day</span>
            </button>
        </div>
      </div>

      {/* Add Day Modal/Input Area */}
      {showAddDay && (
        <div className="mb-8 bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg flex flex-col md:flex-row gap-3 items-stretch md:items-center animate-fade-in">
          <input 
            type="text"
            value={newDayTitle}
            onChange={(e) => setNewDayTitle(e.target.value)}
            placeholder="e.g. Tuesday or Day 5"
            className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500 min-w-0"
            autoFocus
          />
          <div className="flex gap-3">
             <button onClick={addDay} className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">Add</button>
             <button onClick={() => setShowAddDay(false)} className="flex-1 md:flex-none text-slate-400 px-4 py-3 hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {plan.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-dashed border-slate-700">
            <p className="text-slate-500 text-lg">Your plan is empty.</p>
            <button onClick={() => setShowAddDay(true)} className="text-blue-400 font-semibold mt-3 hover:text-blue-300 transition-colors">Create your first day</button>
          </div>
        )}

        {plan.map((day) => (
          <div key={day.id} className="bg-slate-900 p-6 rounded-2xl shadow-md border border-slate-800 hover:border-slate-700 transition-all group relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
                 {/* Editable Day Title */}
                 <input 
                    className="font-bold text-white text-2xl bg-transparent border-b border-transparent hover:border-slate-600 focus:border-blue-500 focus:outline-none w-full md:w-auto min-w-[100px] transition-colors"
                    value={day.title}
                    onChange={(e) => updateDayTitle(day.id, e.target.value)}
                    onFocus={() => saveToHistory()}
                    placeholder="Day Title"
                 />
                 
                 {/* Editable Focus */}
                 <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg text-sm border border-slate-700 w-full md:w-auto">
                    <span className="text-slate-400 shrink-0">Focus:</span>
                    <input 
                      className="bg-transparent border-b border-transparent hover:border-slate-600 focus:border-blue-500 focus:outline-none w-full md:w-32 text-blue-300 font-medium placeholder-slate-600"
                      value={day.focus}
                      onChange={(e) => updateDayFocus(day.id, e.target.value)}
                      onFocus={() => saveToHistory()}
                      placeholder="Set Focus"
                    />
                 </div>
              </div>
              <button onClick={() => deleteDay(day.id)} className="self-end md:self-auto text-slate-500 hover:text-red-400 transition-colors p-2 hover:bg-slate-800 rounded-lg" title="Delete Day">
                <Trash2 size={20} />
              </button>
            </div>

            {/* Tasks List */}
            <ul className="space-y-3 mb-6">
              {day.tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-4 group/task">
                  <button 
                    onClick={() => toggleTask(day.id, task.id)}
                    className={`mt-0.5 transition-all duration-300 ${task.completed ? 'text-teal-500' : 'text-slate-600 hover:text-blue-500'}`}
                  >
                    {task.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                  </button>
                  <span className={`flex-1 text-base transition-all ${task.completed ? 'text-slate-600 line-through' : 'text-slate-200'} break-words`}>
                    {task.text}
                  </span>
                  <button 
                    onClick={() => deleteTask(day.id, task.id)}
                    className="opacity-100 md:opacity-0 group-hover/task:opacity-100 text-slate-600 hover:text-red-400 transition-opacity"
                  >
                    <X size={18} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Add Task Input */}
            <div className="flex gap-3 items-center mt-2 pt-4 border-t border-slate-800">
               <Plus size={18} className="text-slate-500 shrink-0" />
               <input 
                 type="text"
                 value={newTaskText[day.id] || ''}
                 onChange={(e) => setNewTaskText(prev => ({ ...prev, [day.id]: e.target.value }))}
                 onKeyDown={(e) => e.key === 'Enter' && addTask(day.id)}
                 placeholder="Add a task..."
                 className="flex-1 bg-transparent text-sm focus:outline-none text-slate-200 placeholder:text-slate-600 min-w-0"
               />
               <button 
                 onClick={() => addTask(day.id)}
                 className="text-xs font-bold text-blue-400 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wide"
               >
                 Add
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};