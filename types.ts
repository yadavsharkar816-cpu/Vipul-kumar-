import type { ReactNode } from 'react';

export enum TaskType {
  VIDEO = 'Watch Video',
  QUIZ = 'Play Quiz',
  SURVEY = 'Fill Survey',
  AD = 'View Ad',
}

export interface Task {
  id: number;
  type: TaskType;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
}

export interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  coins: number;
}

export interface RedemptionOption {
  id: number;
  name: string;
  // FIX: Changed from JSX.Element to ReactNode to resolve namespace error.
  icon: ReactNode;
  value: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}
