import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, BookOpen, BrainCircuit, Play, Layers, Sparkles, Key, Trash2, Wand2, Edit2, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import { Question, QuizMode, QuizResult } from '../types';
import { getQuestionsForSubject, getDiagnosticQuestions, SYLLABUS_DATA } from '../services/mockData';
import { generateQuestionsWithAI, validateApiKey } from '../services/geminiService';

interface QuizProps {
  mode: QuizMode;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

type QuizStage = 'SETUP' | 'ACTIVE' | 'FINISHED';
type SourceType = 'BANK' | 'AI';

export const Quiz: React.FC<QuizProps> = ({ mode, onComplete, onCancel }) => {
  // Stage management
  const [stage, setStage] = useState<QuizStage>(mode === QuizMode.DIAGNOSTIC ? 'ACTIVE' : 'SETUP');
  
  // Setup State
  const [selectedSubject, setSelectedSubject] = useState<string>('Mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [sourceType, setSourceType] = useState<SourceType>('BANK');
  const [customTopic, setCustomTopic] = useState('');
  
  // API Key State
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [isValidatingKey, setIsValidatingKey] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);

  // Quiz Active State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Preparing your Set...');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial Load for Diagnostic & API Key Check
  useEffect(() => {
    if (mode === QuizMode.DIAGNOSTIC) {
      setLoading(true);
      setTimeout(() => {
        setQuestions(getDiagnosticQuestions());
        setLoading(false);
      }, 600);
    } else {
        // Load API Key
        const savedKey = localStorage.getItem('fmge_gemini_key');
        if (savedKey) {
            setApiKey(savedKey);
            setIsKeySaved(true);
        }
    }
  }, [mode]);

  // Reset source type if key is removed to prevent getting stuck
  useEffect(() => {
      if (sourceType === 'AI' && !isKeySaved) {
          // If user switches to AI but has no key, that's fine (they see input).
          // But if they removed the key while in AI mode, we stay in AI mode to show them the input field.
      }
  }, [isKeySaved, sourceType]);

  const saveApiKey = async () => {
      const trimmedKey = apiKey.trim();
      if (!trimmedKey) return;

      setIsValidatingKey(true);
      setKeyError(null);

      try {
          const isValid = await validateApiKey(trimmedKey);
          if (isValid) {
              localStorage.setItem('fmge_gemini_key', trimmedKey);
              setIsKeySaved(true);
              setIsEditingKey(false);
          } else {
              setKeyError("Authentication Failed: This API Key appears invalid or expired.");
          }
      } catch (e) {
          setKeyError("Network error while verifying key.");
      } finally {
          setIsValidatingKey(false);
      }
  };

  const removeApiKey = () => {
      if (window.confirm("Remove API Key? You will need to re-enter it to use AI features.")) {
        localStorage.removeItem('fmge_gemini_key');
        setApiKey('');
        setIsKeySaved(false);
        setIsEditingKey(false);
        setCustomTopic(''); // Reset topic
      }
  };

  const enableEditKey = () => {
      setIsEditingKey(true);
  };

  const startDailyQuiz = async () => {
    setLoading(true);
    setQuestions([]); // Clear previous state immediately
    setError(null);
    setStage('ACTIVE');
    
    try {
        if (sourceType === 'AI') {
            if (!apiKey) throw new Error("API Key is required.");
            if (!customTopic.trim()) throw new Error("Please enter a topic.");

            setLoadingMessage(`Consulting Dr. Gemini about "${customTopic}"...`);
            
            const aiQuestions = await generateQuestionsWithAI(
                apiKey, 
                questionCount, 
                "Integrated Clinical Sciences", // Base context
                customTopic
            );
            
            if (aiQuestions.length === 0) throw new Error("AI returned no questions. Please try a different topic.");
            setQuestions(aiQuestions);
        } else {
            // Standard Bank Mode
            setLoadingMessage("Curating high-yield clinical vignettes...");
            setTimeout(() => {
                const qs = getQuestionsForSubject(selectedSubject, questionCount);
                setQuestions(qs);
                setLoading(false);
            }, 600);
            return; // Return early as we used setTimeout
        }
    } catch (err: any) {
        setError(err.message || "Failed to load questions.");
        setStage('SETUP'); // Go back to setup on error
    } finally {
        if (sourceType === 'AI') setLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));

    // Immediate feedback for Diagnostic mode
    if (mode === QuizMode.DIAGNOSTIC) {
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
    
    // Calculate results
    let correctCount = 0;
    const breakdown: Record<string, { total: number; correct: number }> = {};

    questions.forEach((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctAnswerIndex;
      if (isCorrect) correctCount++;

      // Determine which subjects this question contributes to
      const subjectsToUpdate = q.relatedSubjects && q.relatedSubjects.length > 0 
        ? q.relatedSubjects 
        : [q.subject];

      subjectsToUpdate.forEach(sub => {
        if (!breakdown[sub]) {
          breakdown[sub] = { total: 0, correct: 0 };
        }
        breakdown[sub].total++;
        if (isCorrect) breakdown[sub].correct++;
      });
    });

    const result: QuizResult = {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      scorePercentage: Math.round((correctCount / questions.length) * 100),
      subjectBreakdown: breakdown,
      timestamp: new Date().toISOString(),
      questions: questions,
      userAnswers: selectedAnswers
    };

    onComplete(result);
  };

  // RENDER: SETUP STAGE
  if (stage === 'SETUP') {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 animate-fade-in">
        <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Daily Practice Zone</h2>
            <p className="text-slate-400">Customize your practice session.</p>
        </div>

        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-5 md:p-8 mb-8 relative overflow-hidden">
            
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 flex items-center gap-3 animate-pulse">
                    <XCircle size={20} className="shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Source Selection */}
            <div className="mb-8">
                <h3 className="font-semibold text-slate-300 mb-4 flex items-center gap-2">
                    <Sparkles size={20} className="text-teal-400" />
                    Question Source
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => { setSourceType('BANK'); setError(null); }}
                        className={`flex-1 p-4 rounded-xl border flex items-center gap-3 transition-all ${
                            sourceType === 'BANK' 
                            ? 'bg-blue-600/20 border-blue-500 text-white' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                        }`}
                    >
                        <div className={`p-2 rounded-lg ${sourceType === 'BANK' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                            <Layers size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold">Question Bank</p>
                            <p className="text-xs opacity-70">5000+ Curated Questions</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => { setSourceType('AI'); setError(null); }}
                        className={`flex-1 p-4 rounded-xl border flex items-center gap-3 transition-all ${
                            sourceType === 'AI' 
                            ? 'bg-purple-600/20 border-purple-500 text-white' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                        }`}
                    >
                        <div className={`p-2 rounded-lg ${sourceType === 'AI' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                            <BrainCircuit size={20} />
                        </div>
                        <div className="text-left">
                            <p className="font-bold">AI Generator</p>
                            <p className="text-xs opacity-70">Infinite Custom Questions</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* AI Config Section */}
            {sourceType === 'AI' && (
                <div className="mb-8 bg-slate-950/50 p-6 rounded-xl border border-slate-800 animate-fade-in relative overflow-hidden group">
                    {/* Decorative background for the AI section */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-4 relative z-10">
                         <h4 className="font-bold text-purple-400 flex items-center gap-2">
                            <Key size={16} /> Gemini AI Configuration
                         </h4>
                         <a 
                           href="https://aistudio.google.com/app/apikey" 
                           target="_blank" 
                           rel="noreferrer" 
                           className="text-xs text-slate-500 hover:text-purple-400 flex items-center gap-1 transition-colors bg-slate-900/50 px-2 py-1 rounded-md border border-slate-800 hover:border-purple-500/30"
                         >
                             Get API Key <ExternalLink size={10} />
                         </a>
                    </div>
                    
                    {(!isKeySaved || isEditingKey) ? (
                        <div className="space-y-3 relative z-10">
                            <p className="text-sm text-slate-400">
                                Enter your Google Gemini API Key to verify connection.
                            </p>
                            
                            {keyError && (
                                <div className="text-xs text-red-400 bg-red-900/20 p-2 rounded border border-red-900/50 flex items-center gap-2">
                                    <AlertCircle size={12} />
                                    {keyError}
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    disabled={isValidatingKey}
                                    placeholder="Paste key starting with AIza..."
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all disabled:opacity-50"
                                />
                                <div className="flex gap-2">
                                    <button 
                                        onClick={saveApiKey}
                                        disabled={!apiKey.trim() || isValidatingKey}
                                        className="flex-1 sm:flex-none min-w-[120px] bg-purple-600 disabled:bg-slate-700 disabled:text-slate-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
                                    >
                                        {isValidatingKey ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Verifying...
                                            </>
                                        ) : (
                                            isKeySaved ? 'Update' : 'Verify & Save'
                                        )}
                                    </button>
                                    
                                    {isEditingKey && isKeySaved && !isValidatingKey && (
                                        <button 
                                            onClick={() => setIsEditingKey(false)} 
                                            className="px-3 py-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800 relative z-10 shadow-inner">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white flex items-center gap-2">
                                        API Key Verified
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Active</span>
                                    </p>
                                    <p className="text-xs text-slate-400 mt-0.5">Connection established with Google Gemini</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                 <button 
                                    onClick={enableEditKey} 
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors border border-transparent hover:border-blue-500/20" 
                                    title="Edit Key"
                                 >
                                    <Edit2 size={18} />
                                </button>
                                <button 
                                    onClick={removeApiKey} 
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20" 
                                    title="Remove Key"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Only show Topic Input if Key is Successfully Saved */}
                    {isKeySaved && !isEditingKey && (
                        <div className="mt-6 pt-4 border-t border-slate-800 relative z-10 animate-fade-in">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400 font-medium">Topic to Practice (Required)</label>
                                <div className="flex items-center gap-2">
                                    <Wand2 size={16} className="text-purple-400" />
                                    <input 
                                        type="text" 
                                        value={customTopic} 
                                        onChange={(e) => setCustomTopic(e.target.value)}
                                        placeholder="e.g. 'Cardiac Cycle', 'Anti-hypertensive drugs', 'Nerve Injuries'"
                                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none placeholder-slate-600"
                                        autoFocus
                                    />
                                </div>
                                <p className="text-xs text-slate-500">The AI will generate unique clinical vignettes based on this topic.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Subject Selection (Hidden in AI Mode) */}
            {sourceType === 'BANK' && (
                <>
                    <h3 className="font-semibold text-slate-300 mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-teal-400" />
                        Select Subject
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                        <button
                            onClick={() => setSelectedSubject('Mixed')}
                            className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                                selectedSubject === 'Mixed' 
                                ? 'bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-900/50' 
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-teal-500/50 hover:bg-slate-700'
                            }`}
                        >
                            Mixed Bag
                        </button>
                        {SYLLABUS_DATA.map(subject => (
                            <button
                                key={subject.name}
                                onClick={() => setSelectedSubject(subject.name)}
                                className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                                    selectedSubject === subject.name 
                                    ? 'bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-900/50' 
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-teal-500/50 hover:bg-slate-700'
                                }`}
                            >
                                {subject.name}
                            </button>
                        ))}
                    </div>
                </>
            )}

            <h3 className="font-semibold text-slate-300 mb-4">Number of Questions</h3>
            <div className="grid grid-cols-4 gap-3 mb-8 md:w-max">
                {[10, 25, 50, 100].map(count => (
                    <button
                        key={count}
                        onClick={() => setQuestionCount(count)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all border text-center ${
                            questionCount === count 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' 
                            : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'
                        }`}
                    >
                        {count}
                    </button>
                ))}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-slate-800">
                <button 
                    onClick={onCancel}
                    className="px-6 py-3 text-slate-400 font-medium hover:text-white hover:bg-slate-800 rounded-xl transition-colors w-full sm:w-auto"
                >
                    Cancel
                </button>
                
                {/* Start Button Logic */}
                <div className="relative w-full sm:w-auto group/start">
                    <button 
                        onClick={startDailyQuiz}
                        disabled={sourceType === 'AI' && (!isKeySaved || !customTopic.trim())}
                        className={`px-8 py-3 font-bold rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 w-full sm:w-auto
                        ${sourceType === 'AI' && (!isKeySaved || !customTopic.trim())
                            ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-70'
                            : 'bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:shadow-blue-500/20'
                        }`}
                    >
                        {sourceType === 'AI' ? <Sparkles size={20} /> : <Play size={20} fill="currentColor" />}
                        Start {sourceType === 'AI' ? 'AI Quiz' : 'Quiz'}
                    </button>
                    
                    {/* Tooltip for disabled state */}
                    {sourceType === 'AI' && !isKeySaved && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-slate-900 text-red-300 text-xs px-3 py-2 rounded-lg border border-red-900 shadow-xl opacity-0 group-hover/start:opacity-100 transition-opacity pointer-events-none flex items-center gap-2">
                            <AlertCircle size={12} />
                            Verify API Key first
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    );
  }

  // RENDER: LOADING
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 animate-fade-in">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-teal-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-semibold text-white">{loadingMessage}</h2>
        <p className="text-slate-400 mt-2">
            {sourceType === 'AI' ? `Generating questions for ${customTopic}...` : 'Accessing Question Bank...'}
        </p>
      </div>
    );
  }

  // RENDER: EMPTY STATE (Fallback)
  if (questions.length === 0) {
     return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
        <BrainCircuit size={48} className="text-slate-600 mb-4" />
        <h2 className="text-xl font-semibold text-white">No questions available.</h2>
        <p className="text-slate-400 mb-6">Could not load questions. {sourceType === 'AI' ? 'Try a different topic or check your API limits.' : ''}</p>
        <button onClick={() => setStage('SETUP')} className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">Back to Setup</button>
      </div>
    );
  }

  // RENDER: ACTIVE QUIZ
  const currentQ = questions[currentQuestionIndex];
  const isSelected = (idx: number) => selectedAnswers[currentQuestionIndex] === idx;
  const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 gap-4">
        <div>
          <h2 className="text-sm md:text-lg font-bold text-teal-400 uppercase tracking-widest flex items-center gap-2">
              {sourceType === 'AI' && <Sparkles size={16} />}
              {mode === QuizMode.DIAGNOSTIC ? 'Integrated Diagnostic' : (sourceType === 'AI' ? customTopic : `${selectedSubject} Practice`)}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">Question {currentQuestionIndex + 1} <span className="text-slate-700 mx-1">/</span> {questions.length}</p>
        </div>
        <div className="flex flex-col items-end shrink-0">
           <div className="text-[10px] md:text-xs font-semibold px-3 py-1 bg-slate-800 text-blue-400 rounded-full border border-slate-700 mb-1 whitespace-nowrap">
             {currentQ.subject}
           </div>
           {currentQ.topic && (
               <div className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">
                   {currentQ.topic}
               </div>
           )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-teal-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(45,212,191,0.5)]" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 md:p-10">
          <p className="text-lg md:text-2xl font-medium text-slate-100 leading-relaxed mb-8">
            {currentQ.text}
          </p>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group ";
              
              if (showExplanation) {
                if (idx === currentQ.correctAnswerIndex) {
                  btnClass += "border-green-500/50 bg-green-900/20 text-green-300";
                } else if (isSelected(idx)) {
                  btnClass += "border-red-500/50 bg-red-900/20 text-red-300";
                } else {
                  btnClass += "border-slate-800 text-slate-500 opacity-50";
                }
              } else {
                if (isSelected(idx)) {
                  btnClass += "border-blue-500 bg-blue-900/30 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]";
                } else {
                  btnClass += "border-slate-700 bg-slate-800/50 hover:border-blue-500/50 hover:bg-slate-800 text-slate-300";
                }
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => !showExplanation && handleAnswerSelect(idx)}
                  disabled={showExplanation}
                  className={btnClass}
                >
                  <span className="font-medium text-base md:text-lg">{option}</span>
                  {showExplanation && idx === currentQ.correctAnswerIndex && <CheckCircle size={20} className="text-green-500 shrink-0 ml-2" />}
                  {showExplanation && isSelected(idx) && idx !== currentQ.correctAnswerIndex && <XCircle size={20} className="text-red-500 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation Area */}
        {showExplanation && (
          <div className="bg-slate-800/80 p-5 md:p-8 border-t border-slate-700 animate-fade-in backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 shrink-0">
                 <BookOpen size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-300 mb-2 text-lg">Explanation</h4>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">{currentQ.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Controls */}
        <div className="bg-slate-950 p-4 md:p-6 flex flex-col-reverse sm:flex-row justify-between items-center border-t border-slate-800 gap-4">
          <button 
             onClick={onCancel}
             className="text-slate-500 font-medium hover:text-slate-300 transition-colors w-full sm:w-auto py-2"
          >
            Quit Session
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Hide Check Answer in Diagnostic Mode to enforce exam conditions */}
            {mode !== QuizMode.DIAGNOSTIC && !showExplanation && isAnswered && (
              <button 
                onClick={() => setShowExplanation(true)}
                className="px-6 py-2.5 bg-transparent border border-slate-600 text-slate-300 rounded-xl font-medium hover:bg-slate-800 hover:border-slate-500 transition-all w-full sm:w-auto text-center"
              >
                Check Answer
              </button>
            )}
            
            <button 
              onClick={handleNext}
              disabled={!isAnswered && !showExplanation}
              className={`px-8 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all w-full sm:w-auto ${
                (!isAnswered && !showExplanation)
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800' 
                  : 'bg-teal-600 text-white hover:bg-teal-500 hover:shadow-teal-500/25'
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};