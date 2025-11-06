
import React from 'react';
import { Task, TaskType, LeaderboardUser, RedemptionOption } from './types';
import { Gift, CreditCard, Smartphone } from 'lucide-react';

export const INITIAL_TASKS: Task[] = [
  { id: 1, type: TaskType.VIDEO, title: 'Watch a 30s Clip', description: 'Watch a short promotional video clip.', reward: 10, completed: false },
  { id: 2, type: TaskType.QUIZ, title: 'Daily General Knowledge Quiz', description: 'Answer a simple question to earn coins.', reward: 25, completed: false },
  { id: 3, type: TaskType.SURVEY, title: 'Quick User Survey', description: 'Share your opinion in a 1-minute survey.', reward: 50, completed: false },
  { id: 4, type: TaskType.AD, title: 'View Sponsored Ad', description: 'Look at a sponsored advertisement for 15s.', reward: 5, completed: false },
  { id: 5, type: TaskType.VIDEO, title: 'Product Review Video', description: 'Watch a 1-minute product review.', reward: 15, completed: false },
];

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { id: 1, name: 'Rohan', avatar: 'https://picsum.photos/id/1005/48/48', coins: 10250 },
  { id: 2, name: 'Priya', avatar: 'https://picsum.photos/id/1011/48/48', coins: 9800 },
  { id: 3, name: 'Amit', avatar: 'https://picsum.photos/id/1012/48/48', coins: 9540 },
  { id: 4, name: 'Sunita', avatar: 'https://picsum.photos/id/1027/48/48', coins: 8760 },
  { id: 5, name: 'Vikram', avatar: 'https://picsum.photos/id/10/48/48', coins: 7500 },
];

export const REDEMPTION_OPTIONS: RedemptionOption[] = [
    { id: 1, name: 'Paytm Gift Card', icon: <Gift size={24} />, value: '₹50, ₹100, ₹200' },
    { id: 2, name: 'UPI Transfer', icon: <Smartphone size={24} />, value: 'Direct to Bank' },
    { id: 3, name: 'Amazon Gift Card', icon: <CreditCard size={24} />, value: '₹100, ₹250, ₹500' },
];
