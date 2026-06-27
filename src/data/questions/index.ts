// Import all question modules
import { question as q1 } from './question_01';
import { question as q2 } from './question_02';
import { question as q3 } from './question_03';
import { question as q4 } from './question_04';
import { question as q5 } from './question_05';
import { question as q6 } from './question_06';
import { question as q7 } from './question_07';
import { question as q8 } from './question_08';
import { question as q9 } from './question_09';
import { question as q10 } from './question_10';

import { Question } from '../types';

// Export all questions as an array
export const questions: Question[] = [
  q1,
  q2,
  q3,
  q4,
  q5,
  q6,
  q7,
  q8,
  q9,
  q10,
];

// Re-export types
export type { Question } from '../types';
