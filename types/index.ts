export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  quizzes: Quiz[];
  order: number;
}

export interface UserProgress {
  moduleId: string;
  quizId: string;
  score: number;
  completedAt: Date;
  answers: number[];
}

export interface UserStats {
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}
