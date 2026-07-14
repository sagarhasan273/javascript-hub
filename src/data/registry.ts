// data/questions/registry.ts
import { QuestionMeta } from "./types";
import { 
  Question01, 
  Question02, 
  Question03, 
  Question04,
  Question05,
  Question06,
  Question07,
  Question08,
  Question09,
  Question10,
  Question11,
  Question12,
  Question13,
  Question14,
  Question15,
  Question16,
  Question17,
  Question18,
  Question19,
  Question20,
  Question21,
  Question22,
  Question23,
  Question24,
  Question25,
  Question26,
  Question27,
  Question28,
  Question29,
  Question30,
  Question31,
  Question32,
  Question33,
  Question34,
  Question35,
  Question36,
  Question37,
  Question38,
  Question39,
  Question40
} from "./questions";


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
  definition:
    "A higher-order function is a function that takes one or more functions as arguments, returns a function, or both. It enables code reuse, abstraction, and functional programming patterns.",
};

export const question15Meta = {
  id: 15,
  title: "What is a unary function?",
  definition:
    "A unary function is a function that takes exactly one argument. It is fundamental to functional programming and enables composition, currying, and point-free style programming.",
};

export const question16Meta = {
  id: 16,
  title: "What is the currying function?",
  definition:
    "Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument.",
};

export const question17Meta = {
  id: 17,
  title: "What is a pure function?",
  definition:
    "A pure function always produces the same output for the same input and has no side effects, making it predictable and easy to test.",
};

export const question18Meta = {
  id: 18,
  title: "What are the benefits of pure functions?",
  definition:
    "Pure functions offer predictability, testability, cacheability, composability, and easier debugging, making code more maintainable and reliable.",
};

export const question19Meta = {
  id: 19,
  title: "What is the purpose of the let keyword?",
  definition:
    "let is used to declare block-scoped variables that can be reassigned, providing a safer alternative to var with better scoping and no hoisting issues.",
};

export const question20Meta = {
  id: 20,
  title: "What is the reason to choose the name let as a keyword?",
  definition:
    "The name 'let' was chosen for its mathematical origins, historical use in other programming languages, and its clear meaning as a variable declaration keyword.",
};

export const question21Meta = {
  id: 21,
  title: "How do you redeclare variables in a switch block without an error?",
  definition:
    "To redeclare variables in a switch block, wrap each case clause in curly braces {} to create a new block scope, preventing redeclaration errors with let and const.",
};

export const question22Meta = {
  id: 22,
  title: "What is the difference between let and var?",
  definition:
    "The main differences between let and var are scope (block vs function), hoisting behavior (TDZ vs undefined), redeclaration rules, and global scope attachment.",
};

export const question23Meta = {
  id: 23,
  title: "What is the Temporal Dead Zone?",
  definition:
    "The Temporal Dead Zone (TDZ) is the period between entering a scope and the declaration of a let or const variable, during which accessing the variable throws a ReferenceError.",
};

export const question24Meta = {
  id: 24,
  title: "What is an IIFE (Immediately Invoked Function Expression)?",
  definition:
    "An IIFE is a function that is defined and executed immediately after its creation, creating a private scope and preventing variables from polluting the global namespace.",
};

export const question25Meta = {
  id: 25,
  title: "How do you decode or encode a URL in JavaScript?",
  definition:
    "JavaScript provides encodeURI(), encodeURIComponent(), decodeURI(), and decodeURIComponent() for URL encoding and decoding, with modern alternatives like URL and URLSearchParams.",
};

export const question26Meta = {
  id: 26,
  title: "What is memoization?",
  definition: "Memoization is an optimization technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again, trading memory for speed.",
};

export const question27Meta = {
  id: 27,
  title: "What is Hoisting?",
  definition: "Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation, allowing them to be used before they are declared.",
};

export const question28Meta = {
  id: 28,
  title: "What are classes in ES6?",
  definition: "ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance, providing a cleaner, more intuitive way to create objects and handle inheritance with a familiar class-based syntax.",
};

export const question29Meta = {
  id: 29,
  title: "What are closures?",
  definition: "A closure is a function that remembers its lexical environment even after the outer function has returned, allowing access to variables from its containing scope.",
};

export const question30Meta = {
  id: 30,
  title: "What are modules?",
  definition: "Modules are encapsulated pieces of code that export functionality and import from other modules, providing organization, reusability, and maintainability in JavaScript applications.",
};

export const question31Meta = {
  id: 31,
  title: "What is scope in JavaScript?",
  definition: "Scope defines the visibility and accessibility of variables, functions, and objects in different parts of your code.",
};

export const question32Meta = {
  id: 32,
  title: "What is a service worker?",
  definition: "A service worker is a script that runs in the background, acting as a proxy server between the web application and the network, enabling offline support, push notifications, and background sync.",
};

export const question33Meta = {
  id: 33,
  title: "How do you manipulate DOM using a service worker?",
  definition: "Service workers cannot directly manipulate the DOM; they communicate with the main thread using the PostMessage API, which then updates the DOM accordingly.",
};

export const question34Meta = {
  id: 34,
  title: "How do you reuse information across service worker restarts?",
  definition: "Information is persisted across service worker restarts using persistent storage mechanisms like IndexedDB, Cache Storage, and localStorage.",
};

export const question35Meta = {
  id: 35,
  title: "Why do you need modules?",
  definition: "Modules are essential for organizing, encapsulating, and reusing code in JavaScript applications, preventing global pollution, managing dependencies, and enabling scalable development.",
};

export const question36Meta = {
  id: 36,
  title: "What is IndexedDB?",
  definition: "IndexedDB is a low-level NoSQL database API for storing large amounts of structured data in the browser, supporting indexes, transactions, and complex queries.",
};

export const question37Meta = {
  id: 37,
  title: "What is web storage?",
  definition: "Web Storage is a client-side storage API providing localStorage (persistent) and sessionStorage (tab-specific) for storing key-value data as strings.",
};

export const question38Meta = {
  id: 38,
  title: "What is a post message?",
  definition: "PostMessage (window.postMessage) is a secure API for cross-origin communication between different browsing contexts like windows, iframes, and workers.",
};

export const question39Meta = {
  id: 39,
  title: "What is a Cookie?",
  definition: "A cookie is a small piece of data stored in the browser, sent with every HTTP request, used for session management, preferences, and tracking.",
};

export const question40Meta = {
  id: 40,
  title: "Why do you need a Cookie?",
  definition: "Cookies are needed to maintain stateful user experiences on stateless HTTP, enabling authentication, personalization, shopping carts, and session management.",
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
  {
    ...question22Meta,
    component: Question22,
  },
  {
    ...question23Meta,
    component: Question23,
  },
  {
    ...question24Meta,
    component: Question24,
  },
  {
    ...question25Meta,
    component: Question25,
  },
  {
    ...question26Meta,
    component: Question26,
  },
  {
    ...question27Meta,
    component: Question27,
  },
  {
    ...question28Meta,
    component: Question28,
  },
  {
    ...question29Meta,
    component: Question29,
  },
  {
    ...question30Meta,
    component: Question30,
  },
  {
    ...question31Meta,
    component: Question31,
  },
  {
    ...question32Meta,
    component: Question32,
  },
  {
    ...question33Meta,
    component: Question33,
  },
  {
    ...question34Meta,
    component: Question34,
  },
  {
    ...question35Meta,
    component: Question35,
  },
  {
    ...question36Meta,
    component: Question36,
  },
  {
    ...question37Meta,
    component: Question37,
  },
  {
    ...question38Meta,
    component: Question38,
  },
  {
    ...question39Meta,
    component: Question39,
  },
  {
    ...question40Meta,
    component: Question40,
  }
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
