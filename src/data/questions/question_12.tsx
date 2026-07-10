// data/questions/Question11.tsx
import { Box } from "@mui/material";
import { QuestionWrapper } from "../../components/QuestionWrapper";
import { LevelContent } from "../../components/LevelContent";
import {
  Title,
  PlainText,
  Bold,
  CardComponent,
  HLText,
  CodeComponent,
  Note,
  Gap,
  UnorderedList,
} from "../../components/content";
import { question12Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question12({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question12Meta.id}
      title={question12Meta.title}
      definition={question12Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>first-class function</Bold> is a function that can be treated like any other value in a programming language. This means functions can be:
      </PlainText>

      <PlainText component="div">
        • Assigned to <Bold>variables</Bold><br />
        • Passed as <Bold>arguments</Bold> to other functions<br />
        • Returned as <Bold>values</Bold> from other functions<br />
        • Stored in <Bold>data structures</Bold> (arrays, objects)<br />
        • Created at <Bold>runtime</Bold>
      </PlainText>

      <PlainText>
        JavaScript treats functions as <Bold>first-class citizens</Bold>, which is a fundamental feature that enables <Bold>functional programming</Bold> patterns.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding First-Class Functions
        </Title>

        <PlainText>
          In JavaScript, functions are treated like any other value. This means you can work with functions just like you work with numbers, strings, or objects.
        </PlainText>

        <Title level={4}>1. Assigning Functions to Variables</Title>
        <CodeComponent
          code={`// Functions can be assigned to variables
const greet = function(name) {
  return \`Hello, \${name}!\`;
};

// Arrow function syntax
const greetArrow = (name) => \`Hello, \${name}!\`;

// Both can be called normally
console.log(greet("Alice"));    // Hello, Alice!
console.log(greetArrow("Bob")); // Hello, Bob!`}
          language="javascript"
          title="assign-functions.js"
          defaultOpen={true}
        />

        <Title level={4}>2. Storing Functions in Arrays</Title>
        <CodeComponent
          code={`// Functions can be stored in arrays
const operations = [
  function(a, b) { return a + b; },
  function(a, b) { return a - b; },
  function(a, b) { return a * b; },
  function(a, b) { return a / b; }
];

console.log(operations[0](10, 5)); // 15
console.log(operations[1](10, 5)); // 5
console.log(operations[2](10, 5)); // 50
console.log(operations[3](10, 5)); // 2`}
          language="javascript"
          title="array-functions.js"
          defaultOpen={true}
        />

        <Title level={4}>3. Storing Functions in Objects</Title>
        <CodeComponent
          code={`// Functions can be stored in objects (methods)
const calculator = {
  add: function(a, b) { return a + b; },
  subtract: function(a, b) { return a - b; },
  multiply: function(a, b) { return a * b; },
  divide: function(a, b) { return a / b; }
};

console.log(calculator.add(10, 5));      // 15
console.log(calculator.multiply(10, 5)); // 50`}
          language="javascript"
          title="object-functions.js"
          defaultOpen={true}
        />

        <CardComponent variant="success" title="✅ Beginner Summary">
          <UnorderedList
            items={[
              <>Functions are <Bold>values</Bold> just like numbers and strings</>,
              <>You can <Bold>assign</Bold> functions to variables</>,
              <>You can <Bold>store</Bold> functions in arrays and objects</>,
              <>You can <Bold>call</Bold> functions stored in variables or data structures</>,
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Think of it this way:</Bold> If you can do something with a number (assign it, pass it, return it), you can do the same with a function in JavaScript!
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Passing and Returning Functions
        </Title>

        <PlainText>
          First-class functions enable two powerful patterns: <Bold>higher-order functions</Bold> and <Bold>function composition</Bold>.
        </PlainText>

        <Title level={4}>1. Passing Functions as Arguments</Title>
        <CodeComponent
          code={`// Functions can be passed as arguments
function greetUser(name) {
  return \`Hello, \${name}!\`;
}

function processUser(name, callback) {
  console.log("Processing user...");
  const result = callback(name);
  console.log("Result:", result);
  return result;
}

processUser("Alice", greetUser);
// Processing user...
// Result: Hello, Alice!

// Using arrow functions as callbacks
processUser("Bob", (name) => \`Hi there, \${name}!\`);
// Processing user...
// Result: Hi there, Bob!

// Array methods use this pattern extensively
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]`}
          language="javascript"
          title="passing-functions.js"
          defaultOpen={true}
        />

        <Title level={4}>2. Returning Functions from Functions</Title>
        <CodeComponent
          code={`// Functions can return other functions
function createMultiplier(multiplier) {
  return function(value) {
    return value * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// This pattern is called "closure"
function createGreeter(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}

const sayHello = createGreeter("Hello");
const sayHola = createGreeter("Hola");

console.log(sayHello("Alice")); // Hello, Alice!
console.log(sayHola("Bob"));    // Hola, Bob!`}
          language="javascript"
          title="returning-functions.js"
          defaultOpen={true}
        />

        <Title level={4}>3. Higher-Order Functions</Title>
        <CardComponent variant="info" title="📊 Common Higher-Order Functions">
          <UnorderedList
            items={[
              <><Bold>map()</Bold> - Transforms each element in an array</>,
              <><Bold>filter()</Bold> - Filters elements based on a condition</>,
              <><Bold>reduce()</Bold> - Reduces array to a single value</>,
              <><Bold>forEach()</Bold> - Executes a function for each element</>,
              <><Bold>sort()</Bold> - Sorts elements using a comparison function</>,
              <><Bold>setTimeout()</Bold> - Executes a function after a delay</>,
            ]}
          />
        </CardComponent>

        <CodeComponent
          code={`// Custom higher-order function
function applyOperation(numbers, operation) {
  const result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(operation(numbers[i]));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];

const doubled = applyOperation(numbers, function(n) {
  return n * 2;
});

const squared = applyOperation(numbers, (n) => n * n);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]`}
          language="javascript"
          title="higher-order.js"
          defaultOpen={false}
        />

        <Note type="info" icon="💡">
          <Bold>Advanced Insight:</Bold> First-class functions enable <Bold>functional programming</Bold> patterns, allowing you to write more <Bold>declarative</Bold> and <Bold>composable</Bold> code.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Patterns & Functional Programming
        </Title>

        <PlainText>
          First-class functions are the foundation of <Bold>functional programming</Bold> in JavaScript. They enable powerful patterns like <Bold>composition</Bold>, <Bold>currying</Bold>, and <Bold>memoization</Bold>.
        </PlainText>

        <Title level={4}>1. Function Composition</Title>
        <CodeComponent
          code={`// Function composition - combining functions
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

// Compose functions: square(double(addOne(x)))
const transform = compose(square, double, addOne);

console.log(transform(2)); // (2+1) * 2 = 6, squared = 36
console.log(transform(3)); // (3+1) * 2 = 8, squared = 64

// Pipe (reverse composition)
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const transform2 = pipe(addOne, double, square);
console.log(transform2(2)); // 2+1=3, 3*2=6, 6*6=36`}
          language="javascript"
          title="composition.js"
          defaultOpen={false}
        />

        <Title level={4}>2. Currying</Title>
        <CodeComponent
          code={`// Currying - transforming a function that takes multiple arguments
// into a sequence of functions that each take a single argument

// Normal function
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function currying
const curriedAddArrow = a => b => c => a + b + c;
console.log(curriedAddArrow(1)(2)(3)); // 6

// Partial application with currying
const add5 = curriedAddArrow(5);
const add5and3 = add5(3);
console.log(add5and3(2)); // 10`}
          language="javascript"
          title="currying.js"
          defaultOpen={false}
        />

        <Title level={4}>3. Memoization</Title>
        <CodeComponent
          code={`// Memoization - caching function results
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log('Returning cached result for', key);
      return cache[key];
    }
    console.log('Computing result for', key);
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Expensive function
function slowFibonacci(n) {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

const fastFibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fastFibonacci(n - 1) + fastFibonacci(n - 2);
});

console.log(fastFibonacci(10)); // Computing... 55
console.log(fastFibonacci(10)); // Cached! 55
console.log(fastFibonacci(11)); // Computing... 89`}
          language="javascript"
          title="memoization.js"
          defaultOpen={false}
        />

        <Title level={4}>4. Functional Programming Patterns</Title>
        <CardComponent variant="info" title="🎯 Functional Programming Benefits">
          <UnorderedList
            items={[
              <>✅ <Bold>Immutability</Bold> - Data never changes, new data is created</>,
              <>✅ <Bold>Pure Functions</Bold> - Same input always produces same output</>,
              <>✅ <Bold>No Side Effects</Bold> - Functions don't modify external state</>,
              <>✅ <Bold>Composability</Bold> - Small functions can be combined</>,
              <>✅ <Bold>Declarative Code</Bold> - What to do, not how to do it</>,
            ]}
          />
        </CardComponent>

        <Title level={4}>5. Real-World Examples</Title>
        <CodeComponent
          code={`// 1. Event handling with callbacks
const button = document.querySelector('button');
button.addEventListener('click', () => {
  console.log('Button clicked!');
});

// 2. Async operations with Promises
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 3. React components (functions returning JSX)
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>;

// 4. Middleware pattern
const middleware = [
  (req, next) => { console.log('Logging'); next(req); },
  (req, next) => { req.user = { id: 1 }; next(req); },
  (req, next) => { console.log('Processing', req.user); next(req); }
];

const applyMiddleware = (req) => {
  let index = 0;
  const next = () => {
    if (index < middleware.length) {
      middleware[index++](req, next);
    }
  };
  next();
};

applyMiddleware({}); // Logs middleware execution`}
          language="javascript"
          title="real-world.js"
          defaultOpen={false}
        />

        <Title level={4}>⚡ Performance Considerations</Title>
        <CardComponent variant="info" title="Performance Tips">
          <UnorderedList
            items={[
              <>First-class functions enable <Bold>code reuse</Bold> and <Bold>abstraction</Bold></>,
              <>Higher-order functions can create <Bold>overhead</Bold> in performance-critical code</>,
              <>Use <Bold>memoization</Bold> to cache expensive function results</>,
              <>Be mindful of <Bold>closure memory</Bold> when returning functions</>,
              <>Functional programming can lead to <Bold>more maintainable</Bold> code</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> First-class functions are not just a feature of JavaScript - they're a <Bold>paradigm</Bold> that enables you to write more <Bold>expressive</Bold>, <Bold>flexible</Bold>, and <Bold>maintainable</Bold> code. Mastering this concept is essential for <Bold>functional programming</Bold> and <Bold>modern JavaScript development</Bold>.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> While first-class functions enable powerful patterns, overuse can lead to <Bold>hard-to-debug</Bold> code. Use them judiciously and always prioritize <Bold>readability</Bold> and <Bold>maintainability</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* SUMMARY - Shown at all levels */}
      {/* ============================================ */}
      <Gap size={2} />

      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>📌</Box>
        Summary
      </Title>

      <CardComponent variant="info" title="🎯 Key Takeaways">
        <UnorderedList
          items={[
            <>First-class functions are treated like <Bold>any other value</Bold> in JavaScript</>,
            <>They can be <Bold>assigned</Bold> to variables, <Bold>passed</Bold> as arguments, and <Bold>returned</Bold> from functions</>,
            <>They enable <Bold>higher-order functions</Bold> and <Bold>functional programming</Bold></>,
            <>Common patterns include <Bold>callbacks</Bold>, <Bold>closures</Bold>, <Bold>currying</Bold>, and <Bold>composition</Bold></>,
            <>This is a <Bold>fundamental concept</Bold> in JavaScript that every developer should understand</>,
            <>First-class functions are what make JavaScript <Bold>flexible</Bold> and <Bold>powerful</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Understanding first-class functions is your gateway to <Bold>functional programming</Bold> in JavaScript. It allows you to write more <Bold>declarative</Bold>, <Bold>reusable</Bold>, and <Bold>testable</Bold> code.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> In JavaScript, functions are <Bold>first-class citizens</Bold> - treat them like the powerful values they are! This unlocks the full potential of the language.
      </Note>
    </QuestionWrapper>
  );
}