// data/questions/registry.ts
import { QuestionMeta } from '../types';
import { Question01 } from './question_01';
import { Question02 } from './question_02';
// Import more as you create them

export const question01Meta: QuestionMeta = {
  id: 1,
  title: "What are the possible ways to create objects in JavaScript?",
  definition: "There are multiple ways to create objects: object literals, constructors, Object.create(), functions, classes, and singletons.",
};

export const question02Meta: QuestionMeta = {
  id: 2,
  title: "What is a prototype chain?",
  definition: "A prototype chain is the mechanism by which JavaScript objects inherit properties and methods from their prototype.",
};


export const questionRegistry = [
  {
    ...question01Meta,
    component: Question01,
  },
  {
    ...question02Meta,
    component: Question02,
  },
  // Add more here
];


export const questionMetadata = questionRegistry.map(({ id, title, definition }) => ({
  id,
  title,
  definition,
}));

export const questionComponents = questionRegistry.reduce((acc, { id, component }) => {
  acc[id] = component;
  return acc;
}, {} as Record<number, React.ComponentType<{ index?: number; isActive?: boolean }>>);

// Helper to get next/previous question IDs
export const getNextQuestionId = (currentId: number): number | null => {
  const ids = questionRegistry.map(q => q.id).sort((a, b) => a - b);
  const index = ids.indexOf(currentId);
  return index < ids.length - 1 ? ids[index + 1] : null;
};

export const getPreviousQuestionId = (currentId: number): number | null => {
  const ids = questionRegistry.map(q => q.id).sort((a, b) => a - b);
  const index = ids.indexOf(currentId);
  return index > 0 ? ids[index - 1] : null;
};