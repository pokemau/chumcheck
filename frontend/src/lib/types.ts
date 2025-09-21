import type { ReadinessType } from './utils';

export type Application = {
  id: string;
  startupName: string;
  groupName: string;
  leaderName: string;
  mentorName?: string;
};

export type Actions = 'Create' | 'View' | 'Edit' | 'Delete';

export type CalculatorQuestionAnswer = {
  id: number;
  question: {
    category: string;
    score: number;
  };
  startupId: number;
};

export type UratQuestionAnswer = {
  id: number;
  response: string;
  score: number;
  startupId: number;
  uratQuestion: {
    id: number;
    question: string;
    readinessType: ReadinessType;
  };
};
