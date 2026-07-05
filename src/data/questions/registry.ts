// data/questions/registry.ts
import { QuestionMeta } from '../types';
import { Question00 } from './question_00';
import { Question01 } from './question_01';
import { Question02 } from './question_02';
import { Question03 } from './question_03';
import { Question04 } from './question_04';
import { Question05 } from './question_05';
import { Question06 } from './question_06';
import { Question07 } from './question_07';
import { Question08 } from './question_08';
import { Question09 } from './question_09';
import { Question10 } from './question_11';
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

export const question05Meta = {
  id: 6,
  title: "What is the purpose of the array slice method?",
  definition: "The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included). The original array will not be modified.",
};

export const question06Meta = {
  id: 7,
  title: "What is the difference between slice and splice?",
  definition: "slice() is immutable and returns a new array without modifying the original, while splice() is mutable and modifies the original array by removing, adding, or replacing elements.",
};

export const question07Meta = {
  id: 8,
  title: "How do you compare Object and Map?",
  definition: "Object and Map are both key-value stores but differ in key types, order preservation, size tracking, performance, and use cases. Maps were introduced in ES6 to address Object limitations.",
};

export const question08Meta = {
  id: 9,
  title: "What is the difference between == and === operators?",
  definition: "== (loose equality) performs type coercion before comparison, while === (strict equality) compares both value and type without coercion.",
};

export const question09Meta = {
  id: 10,
  title: "What are lambda expressions or arrow functions?",
  definition: "Arrow functions (lambda expressions) are a concise way to write function expressions with lexical this binding, introduced in ES6.",
};

export const question10Meta = {
  id: 11,
  title: "What are lambda expressions or arrow functions?",
  definition: "Arrow functions (lambda expressions) are a concise way to write function expressions with lexical this binding, introduced in ES6.",
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
  {
    ...question05Meta,
    component: Question05,
  },
  {
    ...question06Meta,
    component: Question06,
  },
  {
    ...question07Meta,
    component: Question07,
  },
  {
    ...question08Meta,
    component: Question08,
  },
  {
    ...question09Meta,
    component: Question09,
  },
  {
    ...question10Meta,
    component: Question10,
  }
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