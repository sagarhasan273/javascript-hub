// data/questions/Question14.tsx
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
  TableComponent,
  InlineCode,
  UnorderedList,
} from "../../components/content";
import { question14Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question14({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question14Meta.id}
      title={question14Meta.title}
      definition={question14Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>higher-order function</Bold> is a function that either:
      </PlainText>

      <PlainText component="div">
        • <Bold>Accepts</Bold> one or more functions as arguments (callbacks)<br />
        • <Bold>Returns</Bold> a function as its result<br />
        • Or <Bold>both</Bold> - accepts functions and returns functions
      </PlainText>

      <PlainText>
        Higher-order functions are a <Bold>fundamental concept</Bold> in functional programming and are widely used in JavaScript for <Bold>abstraction</Bold>, <Bold>composition</Bold>, and <Bold>code reuse</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding Higher-Order Functions
        </Title>

        <PlainText>
          A higher-order function is a function that <Bold>works with other functions</Bold>. It either takes functions as input or gives functions as output.
        </PlainText>

        <Title level={4}>1. Functions that Accept Other Functions (Callbacks)</Title>
        <CodeComponent
          code={`// Higher-order function that accepts a callback
function greetUser(name, callback) {
  const greeting = \`Hello, \${name}!\`;
  callback(greeting); // Calls the provided function
}

// Using the higher-order function
greetUser("Alice", function(message) {
  console.log(message); // Hello, Alice!
});

// With arrow function
greetUser("Bob", (message) => {
  console.log(message.toUpperCase()); // HELLO, BOB!
});

// Built-in higher-order functions in JavaScript
const numbers = [1, 2, 3, 4, 5];

// map() - accepts a function to transform each element
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() - accepts a function to test each element
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]

// forEach() - accepts a function to run for each element
numbers.forEach((num) => console.log(num * 3));
// 3, 6, 9, 12, 15`}
          language="javascript"
          title="accepting-functions.js"
          defaultOpen={true}
        />

        <Title level={4}>2. Functions that Return Other Functions</Title>
        <CodeComponent
          code={`// Higher-order function that returns a function
function createMultiplier(multiplier) {
  return function(value) {
    return value * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Arrow function version
const createGreeter = (greeting) => (name) => \`\${greeting}, \${name}!\`;

const sayHello = createGreeter("Hello");
const sayHola = createGreeter("Hola");

console.log(sayHello("Alice")); // Hello, Alice!
console.log(sayHola("Bob"));    // Hola, Bob!`}
          language="javascript"
          title="returning-functions.js"
          defaultOpen={true}
        />

        <CardComponent variant="success" title="✅ Beginner Summary">
          <UnorderedList
            items={[
              <>A higher-order function <Bold>works with other functions</Bold></>,
              <>It can <Bold>accept</Bold> functions as arguments (callbacks)</>,
              <>It can <Bold>return</Bold> functions as results</>,
              <>Built-in examples: <InlineCode>map()</InlineCode>, <InlineCode>filter()</InlineCode>, <InlineCode>forEach()</InlineCode></>,
              <>Higher-order functions enable <Bold>code reuse</Bold> and <Bold>abstraction</Bold></>,
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Think of it this way:</Bold> A higher-order function is like a <Bold>manager</Bold> that delegates work to other functions (employees) or creates new specialized functions (trainees).
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Real-World Higher-Order Functions
        </Title>

        <PlainText>
          Higher-order functions are <Bold>everywhere</Bold> in modern JavaScript. They enable powerful patterns like <Bold>composition</Bold>, <Bold>currying</Bold>, and <Bold>middleware</Bold>.
        </PlainText>

        <Title level={4}>Common JavaScript Higher-Order Functions</Title>
        <TableComponent
          headers={['Method', 'What it does', 'Returns']}
          rows={[
            ['map()', 'Transforms each element', 'New array'],
            ['filter()', 'Filters elements', 'New array'],
            ['reduce()', 'Reduces to single value', 'Value'],
            ['forEach()', 'Executes for each', 'undefined'],
            ['sort()', 'Sorts array', 'Same array'],
            ['some()', 'Checks if any pass', 'boolean'],
            ['every()', 'Checks if all pass', 'boolean'],
            ['find()', 'Finds first match', 'Element'],
            ['findIndex()', 'Finds index of match', 'Number'],
            ['flatMap()', 'Maps and flattens', 'New array'],
          ]}
        />

        <Title level={4}>Creating Custom Higher-Order Functions</Title>
        <CodeComponent
          code={`// Custom higher-order function
function applyOperation(numbers, operation) {
  const result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(operation(numbers[i]));
  }
  return result;
}

// Using the higher-order function
const numbers = [1, 2, 3, 4, 5];

const doubled = applyOperation(numbers, (n) => n * 2);
const squared = applyOperation(numbers, (n) => n * n);
const incremented = applyOperation(numbers, (n) => n + 10);

console.log(doubled);     // [2, 4, 6, 8, 10]
console.log(squared);     // [1, 4, 9, 16, 25]
console.log(incremented); // [11, 12, 13, 14, 15]

// Utility function that returns a function
function createValidator(validateFn, errorMessage) {
  return function(value) {
    if (!validateFn(value)) {
      return { valid: false, error: errorMessage };
    }
    return { valid: true };
  };
}

const isEmail = createValidator(
  (value) => value.includes('@') && value.includes('.'),
  'Invalid email address'
);

console.log(isEmail('john@example.com')); // { valid: true }
console.log(isEmail('invalid-email'));    // { valid: false, error: 'Invalid email address' }`}
          language="javascript"
          title="custom-higher-order.js"
          defaultOpen={true}
        />

        <Title level={4}>Functional Composition with Higher-Order Functions</Title>
        <CodeComponent
          code={`// Function composition using higher-order functions
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const transform = compose(square, double, addOne);

console.log(transform(2)); // (2+1)*2 = 6, squared = 36
console.log(transform(3)); // (3+1)*2 = 8, squared = 64

// Pipe (reverse composition)
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const transform2 = pipe(addOne, double, square);
console.log(transform2(2)); // 2+1=3, 3*2=6, 6*6=36

// Real-world example: Data pipeline
const processData = pipe(
  (data) => data.filter(item => item.active),
  (data) => data.map(item => ({ ...item, processed: true })),
  (data) => data.sort((a, b) => a.priority - b.priority),
  (data) => data.slice(0, 10) // Take top 10
);

const data = [
  { id: 1, active: true, priority: 3 },
  { id: 2, active: false, priority: 1 },
  { id: 3, active: true, priority: 1 },
  { id: 4, active: true, priority: 2 }
];

console.log(processData(data));
// [{ id: 3, active: true, priority: 1, processed: true },
//  { id: 4, active: true, priority: 2, processed: true },
//  { id: 1, active: true, priority: 3, processed: true }]`}
          language="javascript"
          title="composition.js"
          defaultOpen={false}
        />

        <Note type="info" icon="💡">
          <Bold>Advanced Insight:</Bold> Higher-order functions enable <Bold>declarative programming</Bold> - you say <Bold>what</Bold> you want to do, not <Bold>how</Bold> to do it.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Patterns & Performance
        </Title>

        <PlainText>
          Higher-order functions are the foundation of <Bold>functional programming</Bold> in JavaScript. They enable advanced patterns like <Bold>currying</Bold>, <Bold>memoization</Bold>, and <Bold>middleware</Bold>.
        </PlainText>

        <Title level={4}>1. Currying</Title>
        <CodeComponent
          code={`// Currying - transforming a multi-argument function
// into a sequence of single-argument functions

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...next) => curried(...args, ...next);
  };
}

// Original function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// Real-world: Configuration builder
function createApiClient(baseURL) {
  return function(apiKey) {
    return function(endpoint) {
      return function(params) {
        return \`\${baseURL}\${endpoint}?apiKey=\${apiKey}&\${new URLSearchParams(params)}\`;
      };
    };
  };
}

const client = createApiClient('https://api.example.com')('abc123')('/users');
console.log(client({ page: 1, limit: 10 }));
// https://api.example.com/users?apiKey=abc123&page=1&limit=10`}
          language="javascript"
          title="currying.js"
          defaultOpen={false}
        />

        <Title level={4}>2. Memoization</Title>
        <CodeComponent
          code={`// Memoization - caching function results
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('Returning cached result for', key);
      return cache.get(key);
    }
    console.log('Computing result for', key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Expensive computation
function slowFibonacci(n) {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
}

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Computes once
console.log(fibonacci(40)); // Returns cached

// Memoize with multiple arguments
const slowMultiply = memoize((a, b) => {
  console.log('Multiplying');
  return a * b;
});

console.log(slowMultiply(5, 3)); // Computing
console.log(slowMultiply(5, 3)); // Cached
console.log(slowMultiply(6, 3)); // Computing`}
          language="javascript"
          title="memoization.js"
          defaultOpen={false}
        />

        <Title level={4}>3. Middleware Pattern</Title>
        <CodeComponent
          code={`// Middleware pattern with higher-order functions
function createMiddleware() {
  const stack = [];

  function use(fn) {
    stack.push(fn);
    return this;
  }

  function execute(req, res) {
    let index = 0;

    function next(err) {
      if (err) {
        // Error handling middleware
        if (index < stack.length) {
          const handler = stack[index++];
          if (handler.length === 4) {
            handler(err, req, res, next);
          } else {
            next(err);
          }
        }
        return;
      }

      if (index < stack.length) {
        const handler = stack[index++];
        try {
          if (handler.length === 3) {
            handler(req, res, next);
          } else {
            handler(req, res);
          }
        } catch (error) {
          next(error);
        }
      }
    }

    next();
  }

  return { use, execute };
}

// Usage
const app = createMiddleware();

// Logging middleware
app.use((req, res, next) => {
  console.log(\`Request: \${req.method} \${req.url}\`);
  next();
});

// Authentication middleware
app.use((req, res, next) => {
  if (req.headers.authorization) {
    req.user = { id: 1, name: 'John' };
    next();
  } else {
    next(new Error('Unauthorized'));
  }
});

// Response handler
app.use((req, res) => {
  res.statusCode = 200;
  res.body = \`Hello, \${req.user?.name || 'Guest'}!\`;
});

// Execute middleware chain
const req = { method: 'GET', url: '/api/users', headers: { authorization: 'Bearer token' } };
const res = {};
app.execute(req, res);
console.log(res.body); // Hello, John!`}
          language="javascript"
          title="middleware.js"
          defaultOpen={false}
        />

        <Title level={4}>⚡ Performance Considerations</Title>
        <CardComponent variant="info" title="Performance Tips">
          <UnorderedList
            items={[
              <>Higher-order functions can have <Bold>overhead</Bold> - use judiciously</>,
              <>Memoization can <Bold>significantly improve</Bold> performance for expensive functions</>,
              <>Currying can improve <Bold>code clarity</Bold> but may have performance cost</>,
              <>Avoid creating unnecessary closures in <Bold>hot paths</Bold></>,
              <>Use higher-order functions for <Bold>abstraction</Bold>, not performance</>,
              <>Modern JavaScript engines optimize higher-order functions well</>,
            ]}
          />
        </CardComponent>

        <Title level={4}>💡 Expert Best Practices</Title>
        <CardComponent variant="default" title="Pro Insights">
          <UnorderedList
            items={[
              <>Use higher-order functions for <Bold>code reuse</Bold> and <Bold>abstraction</Bold></>,
              <>Keep callback functions <Bold>short</Bold> and <Bold>focused</Bold></>,
              <>Use <Bold>arrow functions</Bold> for concise callbacks</>,
              <>Avoid <Bold>deep nesting</Bold> of higher-order functions</>,
              <>Use <Bold>composition</Bold> over inheritance</>,
              <>Test higher-order functions with <Bold>mock functions</Bold></>,
              <>Document the expected <Bold>callback signature</Bold></>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Higher-order functions are the <Bold>cornerstone</Bold> of functional programming in JavaScript. They enable you to write <Bold>declarative</Bold>, <Bold>composable</Bold>, and <Bold>reusable</Bold> code. Master them to unlock the full power of JavaScript.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> While higher-order functions are powerful, <Bold>overuse</Bold> can make code <Bold>hard to debug</Bold> and <Bold>understand</Bold>. Use them where they add value, not everywhere. Always prioritize <Bold>readability</Bold> and <Bold>maintainability</Bold>.
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
            <>Higher-order functions <Bold>accept functions</Bold> as arguments or <Bold>return functions</Bold></>,
            <>They enable <Bold>code reuse</Bold>, <Bold>abstraction</Bold>, and <Bold>composition</Bold></>,
            <>Built-in examples: <InlineCode>map()</InlineCode>, <InlineCode>filter()</InlineCode>, <InlineCode>reduce()</InlineCode></>,
            <>Common patterns: <Bold>callbacks</Bold>, <Bold>closures</Bold>, <Bold>currying</Bold>, <Bold>memoization</Bold></>,
            <>They are the <Bold>foundation</Bold> of functional programming</>,
            <>Use them for <Bold>abstraction</Bold> and <Bold>composition</Bold></>,
            <>Higher-order functions make code <Bold>more declarative</Bold></>,
            <>They are <Bold>essential</Bold> for modern JavaScript development</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Higher-order functions are <Bold>powerful tools</Bold> for writing clean, reusable code. Practice using them with <Bold>array methods</Bold> first, then explore <Bold>composition</Bold>, <Bold>currying</Bold>, and <Bold>memoization</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Higher-order functions allow you to <Bold>abstract behavior</Bold> and create <Bold>flexible</Bold>, <Bold>reusable</Bold> code. They are a <Bold>key concept</Bold> in JavaScript that every developer should master!
      </Note>
    </QuestionWrapper>
  );
}