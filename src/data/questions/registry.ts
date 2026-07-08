// data/questions/registry.ts
import { QuestionMeta } from "../types";
import { Question01 } from "./question_01";
import { Question02 } from "./question_02";
import { Question03 } from "./question_03";
import { Question04 } from "./question_04";
import { Question05 } from "./question_05";
import { Question06 } from "./question_06";
import { Question07 } from "./question_07";
import { Question08 } from "./question_08";
import { Question09 } from "./question_09";
import { Question10 } from "./question_10";
import { Question11 } from "./question_11";
import { Question12 } from "./question_12";
import { Question13 } from "./question_13";
import { Question14 } from "./question_14";
import { Question15 } from "./question_15";
import { Question16 } from "./question_16";
import { Question17 } from "./question_17";
import { Question18 } from "./question_18";
import { Question19 } from "./question_19";
import { Question20 } from "./question_20";
import { Question21 } from "./question_21";
// Import more as you create them

export const question01Meta: QuestionMeta = {
  id: 1,
  title: "What is JavaScript?",
  definition:
    "JavaScript is a high-level, interpreted programming language that is primarily used to create interactive and dynamic content on websites.",
};

export const question02Meta: QuestionMeta = {
  id: 2,
  title: "What are the possible ways to create objects in JavaScript?",
  definition:
    "There are multiple ways to create objects: object literals, constructors, Object.create(), functions, classes, and singletons.",
};

export const question03Meta: QuestionMeta = {
  id: 3,
  title: "What is a prototype chain?",
  definition:
    "A prototype chain is the mechanism by which JavaScript objects inherit properties and methods from their prototype.",
};

export const question04Meta: QuestionMeta = {
  id: 4,
  title: "What is the Difference Between call, apply, and bind?",
  definition:
    "call, apply, and bind are methods that allow you to explicitly set the this value in a function, but they differ in how they accept arguments and when they execute.",
};

export const question05Meta: QuestionMeta = {
  id: 5,
  title: "What is JSON and its common operations?",
  definition:
    "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.",
};

export const question06Meta = {
  id: 6,
  title: "What is the purpose of the array slice method?",
  definition:
    "The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included). The original array will not be modified.",
};

export const question07Meta = {
  id: 7,
  title: "What is the difference between slice and splice?",
  definition:
    "slice() is immutable and returns a new array without modifying the original, while splice() is mutable and modifies the original array by removing, adding, or replacing elements.",
};

export const question08Meta = {
  id: 8,
  title: "How do you compare Object and Map?",
  definition:
    "Object and Map are both key-value stores but differ in key types, order preservation, size tracking, performance, and use cases. Maps were introduced in ES6 to address Object limitations.",
};

export const question09Meta = {
  id: 9,
  title: "What is the difference between == and === operators?",
  definition:
    "== (loose equality) performs type coercion before comparison, while === (strict equality) compares both value and type without coercion.",
};

export const question10Meta = {
  id: 10,
  title: "What are lambda expressions or arrow functions?",
  definition:
    "Arrow functions (lambda expressions) are a concise way to write function expressions with lexical this binding, introduced in ES6.",
};

export const question11Meta = {
  id: 11,
  title: "What are lambda expressions or arrow functions?",
  definition:
    "Arrow functions (lambda expressions) are a concise way to write function expressions with lexical this binding, introduced in ES6.",
};

export const question12Meta = {
  id: 12,
  title: "What is a first class function?",
  definition:
    "A first-class function is a function that can be treated like any other value - assigned to variables, passed as arguments, returned from functions, and stored in data structures.",
};

export const question13Meta = {
  id: 13,
  title: "What is a first order function?",
  definition:
    "A first-order function is a function that does not take another function as an argument and does not return a function as its result. It works directly with primitive values and data structures.",
};

export const question14Meta = {
  id: 14,
  title: "What is a higher order function?",
  definition: "A higher-order function is a function that takes one or more functions as arguments, returns a function, or both. It enables code reuse, abstraction, and functional programming patterns.",
};

export const question15Meta = {
  id: 15,
  title: "What is a unary function?",
  definition: "A unary function is a function that takes exactly one argument. It is fundamental to functional programming and enables composition, currying, and point-free style programming.",
};

export const question16Meta = {
  id: 16,
  title: "What is the currying function?",
  definition: "Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument.",
};

export const question17Meta = {
  id: 17,
  title: "What is a pure function?",
  definition: "A pure function always produces the same output for the same input and has no side effects, making it predictable and easy to test.",
};

export const question18Meta = {
  id: 18,
  title: "What are the benefits of pure functions?",
  definition: "Pure functions offer predictability, testability, cacheability, composability, and easier debugging, making code more maintainable and reliable.",
};

export const question19Meta = {
  id: 19,
  title: "What is the purpose of the let keyword?",
  definition: "let is used to declare block-scoped variables that can be reassigned, providing a safer alternative to var with better scoping and no hoisting issues.",
};

export const question20Meta = {
  id: 20,
  title: "What is the reason to choose the name let as a keyword?",
  definition: "The name 'let' was chosen for its mathematical origins, historical use in other programming languages, and its clear meaning as a variable declaration keyword.",
};

export const question21Meta = {
  id: 21,
  title: "How do you redeclare variables in a switch block without an error?",
  definition: "To redeclare variables in a switch block, wrap each case clause in curly braces {} to create a new block scope, preventing redeclaration errors with let and const.",
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
  },
  {
    ...question11Meta,
    component: Question11,
  },
  {
    ...question12Meta,
    component: Question12,
  },
  {
    ...question13Meta,
    component: Question13,
  },
  {
    ...question14Meta,
    component: Question14,
  },
  {
    ...question15Meta,
    component: Question15,
  },
  {
    ...question16Meta,
    component: Question16,
  },
  {
    ...question17Meta,
    component: Question17,
  },
  {
    ...question18Meta,
    component: Question18,
  },
  {
    ...question19Meta,
    component: Question19,
  },
  {
    ...question20Meta,
    component: Question20,
  },
  {
    ...question21Meta,
    component: Question21,
  },
  // Add more here
];

export const questionMetadata = questionRegistry.map(
  ({ id, title, definition }) => ({
    id,
    title,
    definition,
  }),
);

export const questionComponents = questionRegistry.reduce(
  (acc, { id, component }) => {
    acc[id] = component;
    return acc;
  },
  {} as Record<
    number,
    React.ComponentType<{ index?: number; isActive?: boolean }>
  >,
);

// Helper to get next/previous question IDs
export const getNextQuestionId = (currentId: number): number | null => {
  const ids = questionRegistry.map((q) => q.id).sort((a, b) => a - b);
  const index = ids.indexOf(currentId);
  return index < ids.length - 1 ? ids[index + 1] : null;
};

export const getPreviousQuestionId = (currentId: number): number | null => {
  const ids = questionRegistry.map((q) => q.id).sort((a, b) => a - b);
  const index = ids.indexOf(currentId);
  return index > 0 ? ids[index - 1] : null;
};
