// data/questions/registry.ts
import { QuestionMeta } from '../types';
import { Question00 } from './question_00';
import { Question01 } from './question_01';
import { Question02 } from './question_02';
import { Question03 } from './question_03';
import { Question04 } from './question_04';
// Import more as you create them

export const question00Meta: QuestionMeta = {
  id: 1,
  title: "What is JavaScript?",
  definition: "JavaScript is a high-level, interpreted programming language that is primarily used to create interactive and dynamic content on websites.",
};

export const question01Meta: QuestionMeta = {
  id: 2,
  title: "What are the possible ways to create objects in JavaScript?",
  definition: "There are multiple ways to create objects: object literals, constructors, Object.create(), functions, classes, and singletons.",
};

export const question02Meta: QuestionMeta = {
  id: 3,
  title: "What is a prototype chain?",
  definition: "A prototype chain is the mechanism by which JavaScript objects inherit properties and methods from their prototype.",
};

export const question03Meta: QuestionMeta = {
  id: 4,
  title: "What is the Difference Between call, apply, and bind?",
  definition: "call, apply, and bind are methods that allow you to explicitly set the this value in a function, but they differ in how they accept arguments and when they execute.",
};

export const question04Meta: QuestionMeta = {
  id: 5,
  title: "What is JSON and its common operations?",
  definition: "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.",
};

export const questionRegistry = [
  {
    ...question00Meta,
    component: Question00,
  },
  {
    ...question01Meta,
    component: Question01,
  },
  {
    ...question02Meta,
    component: Question02,
  },
  {
    ...question03Meta,
    component: Question03,
  },
  {
    ...question04Meta,
    component: Question04,
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