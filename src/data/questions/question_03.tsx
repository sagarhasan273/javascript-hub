// data/questions/Question03.tsx
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
import { question03Meta } from "./registry";
import { useLevel } from "../../context/LevelContext";

export function Question03({
  isActive = false,
}: {
  index?: number;
  isActive?: boolean;
}) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question03Meta.id}
      title={question03Meta.title}
      definition={question03Meta.definition}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>call</Bold>, <Bold>apply</Bold>, and <Bold>bind</Bold> are methods
        that allow you to explicitly set the <InlineCode>this</InlineCode> value
        in a function. They are used to control the context in which a function
        executes.
      </PlainText>

      <PlainText>
        All three methods are available on every JavaScript function and are
        used to borrow methods from other objects or to set the execution
        context.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: "#10b981", mr: 1 }}>🌱</Box>
          Beginner: Understanding call, apply, and bind
        </Title>

        <PlainText>
          Think of these methods like <Bold>borrowing a tool</Bold> from someone else:
        </PlainText>

        <CardComponent variant="info" title="🎯 Simple Analogy">
          <PlainText>
            • <Bold>call()</Bold> - You borrow a tool and use it immediately, handing over items one by one
            <br />
            • <Bold>apply()</Bold> - You borrow a tool and use it immediately, handing over a bag of items
            <br />
            • <Bold>bind()</Bold> - You get a custom version of the tool to use later
          </PlainText>
        </CardComponent>

        {/* 1. call() - Beginner */}
        <Title level={3}>
          <Box component="span" sx={{ color: "#2563eb", mr: 1 }}>📞</Box>
          1. call() - Use It Now, Items One by One
        </Title>
        <PlainText>
          <InlineCode>call()</InlineCode> calls a function immediately with a specific <InlineCode>this</InlineCode> value and arguments passed <Bold>one by one</Bold>.
        </PlainText>

        <CodeComponent
          code={`// Simple example
const person = { name: 'Alice' };

function greet(greeting) {
  console.log(greeting + ', ' + this.name);
}

greet.call(person, 'Hello'); // Hello, Alice

// Why is this useful?
// You can use methods from one object on another!
const user1 = { name: 'John' };
const user2 = { name: 'Jane' };

function sayHi() {
  console.log('Hi, ' + this.name);
}

sayHi.call(user1); // Hi, John
sayHi.call(user2); // Hi, Jane`}
          language="javascript"
          title="call-beginner.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> <InlineCode>call()</InlineCode> is like saying "Use this function right now with these specific items (arguments)."
        </Note>

        <Gap size={1} />

        {/* 2. apply() - Beginner */}
        <Title level={3}>
          <Box component="span" sx={{ color: "#8b5cf6", mr: 1 }}>📋</Box>
          2. apply() - Use It Now, Items in a Bag
        </Title>
        <PlainText>
          <InlineCode>apply()</InlineCode> is similar to <InlineCode>call()</InlineCode>, but arguments are passed as an <Bold>array</Bold> (like a bag of items).
        </PlainText>

        <CodeComponent
          code={`// apply() example
const person = { name: 'Alice' };

function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

// Arguments as an array
greet.apply(person, ['Hello', '!']); // Hello, Alice!

// Real-world use: Finding the max number in an array
const numbers = [1, 5, 3, 9, 2];
const max = Math.max.apply(null, numbers);
console.log(max); // 9

// Without apply, you'd need to do:
// Math.max(1, 5, 3, 9, 2) - not practical for large arrays`}
          language="javascript"
          title="apply-beginner.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> <InlineCode>apply()</InlineCode> is like saying "Use this function right now with these items (in a bag/array)."
        </Note>

        <Gap size={1} />

        {/* 3. bind() - Beginner */}
        <Title level={3}>
          <Box component="span" sx={{ color: "#f59e0b", mr: 1 }}>🔗</Box>
          3. bind() - Get a Custom Tool for Later
        </Title>
        <PlainText>
          <InlineCode>bind()</InlineCode> creates a <Bold>new function</Bold> with a fixed <InlineCode>this</InlineCode> value that you can use <Bold>later</Bold>.
        </PlainText>

        <CodeComponent
          code={`// bind() example
const person = { name: 'Alice' };

function greet(greeting) {
  console.log(greeting + ', ' + this.name);
}

// Create a new function with 'this' bound to person
const greetAlice = greet.bind(person);

// Call it later
greetAlice('Hello'); // Hello, Alice

// You can also pre-fill arguments
const greetHello = greet.bind(person, 'Hello');
greetHello(); // Hello, Alice

// Common use: Event handlers in React
class Button extends React.Component {
  handleClick() {
    console.log('Clicked by', this.props.name);
  }
  
  render() {
    // Bind ensures 'this' refers to the component
    return <button onClick={this.handleClick.bind(this)}>Click me</button>;
  }
}`}
          language="javascript"
          title="bind-beginner.js"
          defaultOpen={true}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Unlike <InlineCode>call()</InlineCode> and <InlineCode>apply()</InlineCode>, <InlineCode>bind()</InlineCode> <Bold>does not execute</Bold> the function immediately. It returns a new function for later use.
        </Note>

        <CardComponent variant="success" title="✅ Beginner Summary">
          <UnorderedList
            items={[
              <>Use <Bold>call()</Bold> when you want to use a function right now with individual arguments</>,
              <>Use <Bold>apply()</Bold> when you want to use a function right now with an array of arguments</>,
              <>Use <Bold>bind()</Bold> when you want a new function with a fixed <InlineCode>this</InlineCode> to use later</>,
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: "#f59e0b", mr: 1 }}>⚡</Box>
          Advanced: Deep Dive & Practical Patterns
        </Title>

        {/* Comparison Table */}
        <Title level={3}>
          <Box component="span" sx={{ color: "#ec4899", mr: 1 }}>📊</Box>
          Detailed Comparison
        </Title>

        <TableComponent
          headers={["Feature", "call()", "apply()", "bind()"]}
          rows={[
            ["Execution", "Immediate", "Immediate", "Returns new function"],
            ["Arguments", "Individual", "Array", "Individual"],
            ["Returns", "Function result", "Function result", "New function"],
            ["Use case", "Known args", "Array of args", "Reuse later"],
            ["Performance", "Fast", "Fast", "Creates new function"],
          ]}
        />

        <Gap size={1} />

        {/* Advanced Examples */}
        <Title level={3}>
          <Box component="span" sx={{ color: "#06b6d4", mr: 1 }}>🎯</Box>
          Advanced Practical Examples
        </Title>

        <PlainText>
          <Bold>Example 1: Borrowing Array Methods</Bold>
        </PlainText>
        <CodeComponent
          code={`// Using call to convert array-like objects
function sumArgs() {
  // arguments is array-like, not a real array
  const args = Array.prototype.slice.call(arguments);
  return args.reduce((sum, n) => sum + n, 0);
}

console.log(sumArgs(1, 2, 3, 4)); // 10

// Using apply with constructors
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Create an array of arguments
const data = ['John', 30];
const person = new (Person.bind(null, ...data))();
// Or using apply for constructors
const person2 = new (Function.prototype.bind.apply(Person, [null, ...data]))();

// Modern approach: Using spread operator instead of apply
const numbers = [1, 5, 3, 9, 2];
const max = Math.max(...numbers); // Simpler than apply!`}
          language="javascript"
          title="advanced-borrowing.js"
          defaultOpen={false}
        />

        <Gap size={1} />

        <PlainText>
          <Bold>Example 2: Partial Application with bind</Bold>
        </PlainText>
        <CodeComponent
          code={`// Partial application - pre-filling arguments
function multiply(a, b, c) {
  return a * b * c;
}

// Create specialized functions
const multiplyBy2 = multiply.bind(null, 2);
console.log(multiplyBy2(3, 4)); // 24 (2 * 3 * 4)

const multiplyBy2And3 = multiply.bind(null, 2, 3);
console.log(multiplyBy2And3(4)); // 24 (2 * 3 * 4)

// This pattern is called "currying" or "partial application"
// Very useful in functional programming!`}
          language="javascript"
          title="partial-application.js"
          defaultOpen={false}
        />

        <Gap size={1} />

        <PlainText>
          <Bold>Example 3: Event Handlers with bind</Bold>
        </PlainText>
        <CodeComponent
          code={`// Class component with event handlers
class Counter {
  constructor() {
    this.count = 0;
    this.increment = this.increment.bind(this); // Bind once
  }
  
  increment() {
    this.count++;
    console.log('Count:', this.count);
  }
  
  // Alternative: Arrow function (auto-binds)
  decrement = () => {
    this.count--;
    console.log('Count:', this.count);
  };
}

const counter = new Counter();
const btn = document.getElementById('btn');

// Both work correctly
btn.addEventListener('click', counter.increment);
btn.addEventListener('click', counter.decrement);

// React class component pattern
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // Bind in constructor (better performance)
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({ clicked: true });
  }
  
  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}`}
          language="javascript"
          title="event-handlers.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="📊 When to Use Which (Advanced)">
          <UnorderedList
            items={[
              <>Use <Bold>call()</Bold> when you know exactly how many arguments you have</>,
              <>Use <Bold>apply()</Bold> when you have an array of arguments or array-like object</>,
              <>Use <Bold>bind()</Bold> when you need to fix <InlineCode>this</InlineCode> for later use (callbacks)</>,
              <>Use <Bold>bind()</Bold> for event handlers in classes to preserve context</>,
              <>In modern code, prefer <Bold>spread operator</Bold> over <InlineCode>apply()</InlineCode> when possible</>,
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: "#ef4444", mr: 1 }}>🚀</Box>
          Expert: Under the Hood & Advanced Patterns
        </Title>

        <PlainText>
          Understanding <Bold>how these methods work internally</Bold> and when to use them in advanced scenarios.
        </PlainText>

        <Title level={4}>🔬 How call, apply, and bind Work Internally</Title>

        <CodeComponent
          code={`// Simplified implementation of call
Function.prototype.myCall = function(context, ...args) {
  // If context is null/undefined, use global object
  context = context || globalThis;
  
  // Create a unique property to avoid collisions
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  
  // Call the function with the provided arguments
  const result = context[fnSymbol](...args);
  
  // Clean up
  delete context[fnSymbol];
  
  return result;
};

// Simplified implementation of apply
Function.prototype.myApply = function(context, argsArray) {
  context = context || globalThis;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  
  const result = context[fnSymbol](...(argsArray || []));
  
  delete context[fnSymbol];
  return result;
};

// Simplified implementation of bind
Function.prototype.myBind = function(context, ...boundArgs) {
  const fn = this;
  
  return function(...callArgs) {
    return fn.apply(context, [...boundArgs, ...callArgs]);
  };
};

// Example usage
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Alice' };

greet.myCall(person, 'Hello', '!'); // Hello, Alice!
greet.myApply(person, ['Hi', '!']); // Hi, Alice!
const bound = greet.myBind(person, 'Hey');
bound('!'); // Hey, Alice!`}
          language="javascript"
          title="under-the-hood.js"
          defaultOpen={false}
        />

        <Title level={4}>⚡ Performance Considerations</Title>

        <CardComponent variant="info" title="Performance Tips">
          <UnorderedList
            items={[
              <><InlineCode>call()</InlineCode> and <InlineCode>apply()</InlineCode> are similar in performance</>,
              <><InlineCode>bind()</InlineCode> is <Bold>slower</Bold> because it creates a new function</>,
              <>In React, use <InlineCode>useCallback</InlineCode> with <InlineCode>bind</InlineCode> to prevent unnecessary re-renders</>,
              <>For event handlers in classes, bind in constructor (binds once) vs render (binds on every render)</>,
              <>Using arrow functions for methods is cleaner but may have slight performance impact</>,
            ]}
          />
        </CardComponent>

        <Title level={4}>🎯 Advanced Patterns</Title>

        <CodeComponent
          code={`// 1. Function composition with bind
const compose = (...fns) => 
  fns.reduce((f, g) => (...args) => f(g(...args)));

// 2. Creating specialized functions
const createLogger = (prefix) => {
  return console.log.bind(console, \`[\${prefix}]\`);
};

const logInfo = createLogger('INFO');
const logError = createLogger('ERROR');

logInfo('Application started'); // [INFO] Application started
logError('Something went wrong'); // [ERROR] Something went wrong

// 3. Method borrowing with multiple objects
const methods = {
  greet(greeting) {
    return \`\${greeting}, \${this.name}\`;
  },
  farewell() {
    return \`Goodbye, \${this.name}\`;
  }
};

const user1 = { name: 'John' };
const user2 = { name: 'Jane' };

// Borrow methods dynamically
console.log(methods.greet.call(user1, 'Hello')); // Hello, John
console.log(methods.greet.apply(user2, ['Hi'])); // Hi, Jane

// 4. Bind with Map for memoization
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowFn = (x, y) => {
  console.log('Computing...');
  return x + y;
};

const memoized = memoize(slowFn);
console.log(memoized(1, 2)); // Computing... 3
console.log(memoized(1, 2)); // 3 (from cache)

// 5. Decorator pattern with bind
function withLogging(fn) {
  return function(...args) {
    console.log(\`Calling \${fn.name} with args:\`, args);
    const result = fn.apply(this, args);
    console.log(\`Result:\`, result);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(5, 3); // Logs the call and result`}
          language="javascript"
          title="advanced-patterns.js"
          defaultOpen={false}
        />

        <Title level={4}>💡 Expert Tips & Best Practices</Title>

        <CardComponent variant="default" title="Pro Insights">
          <UnorderedList
            items={[
              <>In modern JavaScript, prefer <Bold>arrow functions</Bold> over <InlineCode>bind()</InlineCode> for simple cases</>,
              <>Use <Bold>spread operator</Bold> instead of <InlineCode>apply()</InlineCode> when possible</>,
              <>For React class components, bind in <Bold>constructor</Bold> or use <Bold>class properties</Bold> with arrow functions</>,
              <>Use <InlineCode>call()</InlineCode> for borrowing array methods (like <InlineCode>slice()</InlineCode>)</>,
              <>Understand the <Bold>performance implications</Bold> of each method</>,
              <>Use <InlineCode>bind()</InlineCode> for <Bold>partial application</Bold> in functional programming</>,
              <>Consider using <Bold>lodash</Bold> or <Bold>Ramda</Bold> for more advanced functional patterns</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Understanding <InlineCode>call</InlineCode>, <InlineCode>apply</InlineCode>, and <InlineCode>bind</InlineCode> is essential for mastering JavaScript's <Bold>function context</Bold> and enables powerful <Bold>functional programming patterns</Bold>. They're fundamental tools for writing <Bold>flexible, reusable code</Bold>.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> While these methods are powerful, overusing <InlineCode>bind()</InlineCode> can lead to <Bold>performance issues</Bold> in hot code paths. Consider using <Bold>arrow functions</Bold> or <Bold>class properties</Bold> for simpler cases.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* SUMMARY - Shown at all levels */}
      {/* ============================================ */}
      <Gap size={2} />

      <Title level={3}>
        <Box component="span" sx={{ color: "#10b981", mr: 1 }}>📌</Box>
        Summary
      </Title>

      <CardComponent variant="info" title="🎯 Key Takeaways">
        <UnorderedList
          items={[
            <>
              <Bold>call()</Bold> - Executes immediately with comma-separated
              arguments
            </>,
            <>
              <Bold>apply()</Bold> - Executes immediately with array arguments
            </>,
            <>
              <Bold>bind()</Bold> - Returns a new function to be called later
            </>,
            <>
              All three methods allow you to control the{" "}
              <InlineCode>this</InlineCode> context
            </>,
            <>They enable function borrowing and method reuse</>,
            <>Choose based on your specific use case and argument format</>,
            <>In modern code, arrow functions and spread operator are often simpler alternatives</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Understanding these three methods is essential
        for writing flexible, reusable JavaScript code. They give you complete
        control over function execution context.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> All three methods serve the same purpose -
        controlling <InlineCode>this</InlineCode> context - but they differ in
        how they accept arguments and when they execute.
      </Note>
    </QuestionWrapper>
  );
}