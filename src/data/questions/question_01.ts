// data/questions/question_01.ts
import { Question } from '../types';

export const question: Question = {
  id: 1,
  title: "What are the possible ways to create objects in JavaScript",
  definition: "There are multiple ways to create objects: object literals, constructors, Object.create(), functions, classes, and singletons.",
  answer: {
    steps: [
      {
        title: "Object Literal Syntax",
        description: "The easiest and most common way to create objects using curly braces {}. Perfect for simple, one-off objects.",
        code: `// Object literal
const person = {
  name: "Sudheer",
  age: 34,
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
};`,
        pros: "Simple, readable, and fast",
        cons: "Not reusable for multiple instances"
      },
      {
        title: "Object Constructor",
        description: "Using the built-in Object constructor with the new keyword. Useful when you need to create an object dynamically.",
        code: `// Object constructor
const person = new Object();
person.name = "Sudheer";
person.age = 34;`,
        pros: "Works in all JavaScript environments",
        cons: "Verbose and slower than literal syntax"
      },
      {
        title: "Object.create() Method",
        description: "Creates a new object with the specified prototype object. Ideal for prototypal inheritance.",
        code: `// Object.create
const personPrototype = {
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
};
const person = Object.create(personPrototype);
person.name = "Sudheer";
person.age = 34;`,
        pros: "Allows prototype chain manipulation",
        cons: "Slightly more complex syntax"
      },
      {
        title: "Function Constructor",
        description: "Using a constructor function with the new keyword. Traditional way to create multiple similar objects.",
        code: `// Function constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    console.log(\`Hello, I'm \${this.name}\`);
  };
}
const person = new Person("Sudheer", 34);`,
        pros: "Creates reusable object templates",
        cons: "Each instance gets its own method copy"
      },
      {
        title: "Function Constructor with Prototype",
        description: "Adding shared methods to the prototype for better memory efficiency. Methods are shared across all instances.",
        code: `// Function constructor with prototype
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function() {
  console.log(\`Hello, I'm \${this.name}\`);
};
const person = new Person("Sudheer", 34);`,
        pros: "Methods are shared across instances (memory efficient)",
        cons: "Slightly more complex than simple constructor"
      },
      {
        title: "Object.assign() Method",
        description: "Creates a new object by copying properties from source objects. Great for composition.",
        code: `// Object.assign
const props = { name: "Sudheer", age: 34 };
const methods = {
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
};
const person = Object.assign({}, props, methods);`,
        pros: "Great for composition and mixing",
        cons: "Shallow copy only"
      },
      {
        title: "ES6 Class Syntax",
        description: "Modern and cleaner syntax for object creation. Syntactic sugar over the prototype system.",
        code: `// ES6 Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
}
const person = new Person("Sudheer", 34);`,
        pros: "Clean, modern, and supports inheritance",
        cons: "Requires ES6+ environment"
      },
      {
        title: "Singleton Pattern",
        description: "Ensures only one instance of the object exists. Useful for global application state.",
        code: `// Singleton
const Singleton = {
  instance: null,
  getInstance() {
    if (!this.instance) {
      this.instance = {
        name: "Sudheer",
        age: 34
      };
    }
    return this.instance;
  }
};
const person = Singleton.getInstance();`,
        pros: "Single global instance",
        cons: "Can be considered an anti-pattern"
      }
    ],
    summary: "Choose the approach based on your needs: Object literals for simple objects, Classes for modern OOP, Constructor functions for compatibility, Object.create() for prototype-based inheritance, and Singleton for global state management."
  }
};