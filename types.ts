export enum View {
  DASHBOARD = 'DASHBOARD',
  SYLLABUS = 'SYLLABUS',
  PLANNER = 'PLANNER',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
}

export enum QuizMode {
  DIAGNOSTIC = 'DIAGNOSTIC',
  DAILY = 'DAILY',
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  subject: string;
  topic?: string;
  relatedSubjects?: string[]; // For integrated questions that count towards multiple subjects
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  subjectBreakdown: Record<string, { total: number; correct: number }>;
  timestamp: string;
  questions?: Question[];
  userAnswers?: Record<number, number>;
}

export interface SyllabusSubject {
  name: string;
  weightage: string;
  topics: string[];
}

export interface PlanTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface PlanDay {
  id: string;
  title: string; // e.g. "Monday" or "Day 1"
  focus: string; // Main subject
  tasks: PlanTask[];
}

export interface StudyPlan {
  days: PlanDay[];
}