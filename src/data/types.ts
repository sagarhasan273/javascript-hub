// data/types.ts
import { ReactNode } from 'react';

export interface Question {
  id: number;
  title: string;
  definition: string;
  answer: string | ReactNode; // Now supports JSX!
}

export interface QuestionMeta {
    id: number;
    title: string;
    definition: string;
}