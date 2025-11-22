import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, BookOpen, BrainCircuit, Play, Layers } from 'lucide-react';
import { Question, QuizMode, QuizResult } from '../types';
import { getQuestionsForSubject, getDiagnosticQuestions, SYLLABUS_DATA } from '../services/mockData';

interface QuizProps {
  mode: QuizMode;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

type QuizStage = 'SETUP' | 'ACTIVE' | 'FINISHED';

export const Quiz: React.FC<QuizProps> = ({ mode, onComplete, onCancel }) => {
  // Stage management
  const [stage, setStage] = useState<QuizStage>(mode === QuizMode.DIAGNOSTIC ? 'ACTIVE' : 'SETUP');
  
  // Setup State
  const [selectedSubject, setSelectedSubject] = useState<string>('Mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Quiz Active State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Initial Load for Diagnostic
  useEffect(() => {
    if (mode === QuizMode.DIAGNOSTIC) {
      setLoading(true);
      setTimeout(() => {
        setQuestions(getDiagnosticQuestions());
        setLoading(false);
      }, 600);
    }
  }, [mode]);

  const startDailyQuiz = () => {
    setLoading(true);
    setStage('ACTIVE');
    
    setTimeout(() => {
        const qs = getQuestionsForSubject(selectedSubject, questionCount);
        setQuestions(qs);
        setLoading(false);
    }, 600);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
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
      timestamp: new Date().toISOString()
    };

    onComplete(result);
  };

  // RENDER: SETUP STAGE
  if (stage === 'SETUP') {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-6 animate-fade-in">
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Daily Practice Zone</h2>
            <p className="text-slate-400">Customize your practice session.</p>
        </div>

        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8 mb-8">
            <h3 className="font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <Layers size={20} className="text-teal-400" />
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

            <h3 className="font-semibold text-slate-300 mb-4">Number of Questions</h3>
            <div className="flex gap-4 mb-8">
                {[10, 25, 50, 100].map(count => (
                    <button
                        key={count}
                        onClick={() => setQuestionCount(count)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all border ${
                            questionCount === count 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' 
                            : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'
                        }`}
                    >
                        {count}
                    </button>
                ))}
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
                <button 
                    onClick={onCancel}
                    className="px-6 py-3 text-slate-400 font-medium hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={startDailyQuiz}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transform active:scale-95 transition-all flex items-center gap-2"
                >
                    <Play size={20} fill="currentColor" />
                    Start Quiz
                </button>
            </div>
        </div>
      </div>
    );
  }

  // RENDER: LOADING
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-teal-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-semibold text-white">Preparing your Set...</h2>
        <p className="text-slate-400 mt-2">Curating high-yield clinical vignettes.</p>
      </div>
    );
  }

  // RENDER: EMPTY STATE
  if (questions.length === 0) {
     return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
        <BrainCircuit size={48} className="text-slate-600 mb-4" />
        <h2 className="text-xl font-semibold text-white">No questions available.</h2>
        <p className="text-slate-400 mb-6">Could not load the question bank for {selectedSubject}.</p>
        <button onClick={onCancel} className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700">Back to Dashboard</button>
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-lg font-bold text-teal-400 uppercase tracking-widest">{mode === QuizMode.DIAGNOSTIC ? 'Integrated Diagnostic' : `${selectedSubject} Practice`}</h2>
          <p className="text-sm text-slate-500 mt-1">Question {currentQuestionIndex + 1} <span className="text-slate-700 mx-1">/</span> {questions.length}</p>
        </div>
        <div className="flex flex-col items-end">
           <div className="text-xs font-semibold px-3 py-1 bg-slate-800 text-blue-400 rounded-full border border-slate-700 mb-1">
             {currentQ.subject}
           </div>
           {currentQ.topic && (
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
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
        <div className="p-6 md:p-10">
          <p className="text-xl md:text-2xl font-medium text-slate-100 leading-relaxed mb-8">
            {currentQ.text}
          </p>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let btnClass = "w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group ";
              
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
                  <span className="font-medium text-lg">{option}</span>
                  {showExplanation && idx === currentQ.correctAnswerIndex && <CheckCircle size={24} className="text-green-500" />}
                  {showExplanation && isSelected(idx) && idx !== currentQ.correctAnswerIndex && <XCircle size={24} className="text-red-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation Area */}
        {showExplanation && (
          <div className="bg-slate-800/80 p-6 md:p-8 border-t border-slate-700 animate-fade-in backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 shrink-0">
                 <BookOpen size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-300 mb-2 text-lg">Explanation</h4>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Controls */}
        <div className="bg-slate-950 p-6 flex justify-between items-center border-t border-slate-800">
          <button 
             onClick={onCancel}
             className="text-slate-500 font-medium hover:text-slate-300 transition-colors"
          >
            Quit Session
          </button>
          
          <div className="flex gap-4">
            {!showExplanation && isAnswered && (
              <button 
                onClick={() => setShowExplanation(true)}
                className="px-6 py-2.5 bg-transparent border border-slate-600 text-slate-300 rounded-xl font-medium hover:bg-slate-800 hover:border-slate-500 transition-all"
              >
                Check Answer
              </button>
            )}
            
            <button 
              onClick={handleNext}
              disabled={!isAnswered && !showExplanation}
              className={`px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all ${
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