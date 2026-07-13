// data/questions/Question29.tsx
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
import { question29Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question29({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question29Meta.id}
      title={question29Meta.title}
      definition={question29Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>closure</Bold> is a function that <Bold>remembers</Bold> the environment in which it was created, even after that environment has finished executing. In other words, a closure gives you access to an outer function's scope from an inner function.
      </PlainText>

      <PlainText>
        Closures are a <Bold>fundamental concept</Bold> in JavaScript and are used extensively in <Bold>functional programming</Bold>, <Bold>event handlers</Bold>, <Bold>callbacks</Bold>, and <Bold>module patterns</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What are Closures?
        </Title>

        <PlainText>
          Think of a closure like a <Bold>backpack</Bold> that a function carries around:
        </PlainText>

        <CardComponent variant="info" title="🎒 Analogy">
          <PlainText>
            Imagine you're going on a trip. You have a backpack that contains everything you need. When you leave your house (outer function), you still carry your backpack (closure) with you, containing all the things you collected (variables) from your house.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Simple Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Basic closure
function outer() {
  let message = 'Hello, World!';
  
  function inner() {
    console.log(message); // inner has access to message
  }
  
  return inner;
}

const myFunction = outer();
myFunction(); // Hello, World! (message is remembered)

// 2. Closure with parameters
function greeting(name) {
  return function() {
    console.log(\`Hello, \${name}!\`);
  };
}

const greetJohn = greeting('John');
const greetJane = greeting('Jane');

greetJohn(); // Hello, John!
greetJane(); // Hello, Jane!

// 3. Closure with counter
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Each closure has its own independent scope
const counter2 = createCounter();
console.log(counter2()); // 1 (starts from 0)`}
          language="javascript"
          title="closures-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> A closure is formed when a function <Bold>remembers</Bold> variables from its outer scope, even after the outer function has returned.
        </Note>

        <CardComponent variant="success" title="✅ Key Characteristics">
          <PlainText component="div">
            • <Bold>Inner Function:</Bold> The function that captures variables<br />
            • <Bold>Outer Function:</Bold> The function that provides the environment<br />
            • <Bold>Captured Variables:</Bold> The variables that are remembered<br />
            • <Bold>Lexical Scope:</Bold> The scope where the function was defined<br />
            • <Bold>Persistent:</Bold> Variables persist in memory
          </PlainText>
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Closures in Practice
        </Title>

        <PlainText>
          Real-world applications and patterns using closures:
        </PlainText>

        <CodeComponent
          code={`// 1. Private variables with closures
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount > balance) {
        return 'Insufficient funds';
      }
      balance -= amount;
      return balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
console.log(account.deposit(500)); // 1500
console.log(account.withdraw(200)); // 1300
console.log(account.balance); // undefined (private)

// 2. Function factories
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 3. Closure in loops (common pitfall and solution)
// Pitfall - using var
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 3, 3, 3 (all share the same i)
  }, 100);
}

// Solution 1 - IIFE with closure
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index); // 0, 1, 2
    }, 100);
  })(i);
}

// Solution 2 - let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2 (each has its own i)
  }, 100);
}

// 4. Event handlers with closures
function createButtonHandler(message) {
  return function() {
    console.log('Button clicked: ' + message);
  };
}

const button = document.querySelector('button');
const handler = createButtonHandler('Hello!');
button.addEventListener('click', handler);

// 5. Memoization with closures
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('From cache:', cache.get(key));
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    console.log('Computed:', result);
    return result;
  };
}

const expensiveFunction = (n) => {
  // Simulate expensive computation
  return n * n;
};

const memoized = memoize(expensiveFunction);
memoized(5); // Computed: 25
memoized(5); // From cache: 25`}
          language="javascript"
          title="closures-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Closure Use Cases">
          <PlainText component="div">
            • <Bold>Private Variables:</Bold> Encapsulate data with methods<br />
            • <Bold>Function Factories:</Bold> Create specialized functions<br />
            • <Bold>Event Handlers:</Bold> Maintain state in callbacks<br />
            • <Bold>Memoization:</Bold> Cache function results<br />
            • <Bold>Module Pattern:</Bold> Create private APIs<br />
            • <Bold>Currying:</Bold> Partial function application<br />
            • <Bold>Debouncing/Throttling:</Bold> Limit function calls<br />
            • <Bold>Higher-Order Functions:</Bold> Functions that return functions
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Closures can cause <Bold>memory leaks</Bold> if not used carefully, as captured variables stay in memory as long as the closure exists.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Closure Mistakes">
          <UnorderedList
            items={[
              <>Capturing variables in loops incorrectly (using var)</>,
              <>Forgetting that closures capture by reference, not value</>,
              <>Creating unnecessary closures (performance overhead)</>,
              <>Memory leaks from holding references to DOM elements</>,
              <>Not understanding the scope chain</>,
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
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Closures Under the Hood
        </Title>

        <PlainText>
          Deep dive into how closures work internally:
        </PlainText>

        <CodeComponent
          code={`// 1. How closures work internally
// When a function is defined, it creates a closure with its lexical environment
function outer() {
  let x = 10;
  let y = 20;
  
  function inner() {
    console.log(x + y); // 30
  }
  
  return inner;
}

// The closure contains references to x and y
// Even after outer returns, the environment is preserved

// 2. Multiple closures sharing the same scope
function createPair() {
  let value = 0;
  
  return {
    increment: function() {
      value++;
      return value;
    },
    decrement: function() {
      value--;
      return value;
    },
    getValue: function() {
      return value;
    }
  };
}

const pair = createPair();
console.log(pair.increment()); // 1
console.log(pair.increment()); // 2
console.log(pair.decrement()); // 1
console.log(pair.getValue()); // 1

// 3. Closure scope chain
function outer1() {
  let a = 'outer';
  
  function outer2() {
    let b = 'middle';
    
    function inner() {
      let c = 'inner';
      console.log(a, b, c); // outer middle inner
    }
    
    return inner;
  }
  
  return outer2;
}

const fn = outer1()();
fn();

// 4. Memory management with closures
function createHeavyClosure() {
  // This large array will stay in memory as long as the closure exists
  const largeArray = new Array(1000000).fill('data');
  
  return function() {
    console.log(largeArray.length);
  };
}

const heavy = createHeavyClosure();
heavy(); // 1000000
// The largeArray remains in memory

// 5. Optimizing closures
// Avoid capturing large objects unnecessarily
function optimizedClosure() {
  let data = 'small string';
  
  return function() {
    console.log(data); // Only captures what it needs
  };
}

// 6. Closure with weak references
function createWeakClosure() {
  let obj = { data: 'test' };
  
  // Using WeakMap to allow garbage collection
  const weakMap = new WeakMap();
  weakMap.set(obj, 'value');
  
  return function() {
    return weakMap.get(obj);
  };
}

// 7. Closure debugging
function debugClosure() {
  let x = 10;
  let y = 20;
  
  function inner() {
    debugger; // Inspect closure scope in browser dev tools
    console.log(x + y);
  }
  
  return inner;
}

// 8. Advanced pattern: Closure-based state management
function createStore(initialState) {
  let state = initialState;
  const listeners = [];
  
  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState };
      listeners.forEach(listener => listener(state));
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    }
  };
}

const store = createStore({ count: 0 });
store.subscribe((state) => console.log('State changed:', state));
store.setState({ count: 1 }); // State changed: { count: 1 }`}
          language="javascript"
          title="closures-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 How Closures Work Under the Hood">
          <PlainText component="div">
            • <Bold>Lexical Environment:</Bold> Contains variables and functions in scope<br />
            • <Bold>Closure:</Bold> Function + its lexical environment<br />
            • <Bold>Scope Chain:</Bold> Links to outer environments<br />
            • <Bold>Garbage Collection:</Bold> Variables persist until closure is GC'd<br />
            • <Bold>Optimization:</Bold> JavaScript engines optimize closures<br />
            • <Bold>Memory Usage:</Bold> Each closure maintains its own environment
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use closures for <Bold>encapsulation</Bold> and <Bold>data privacy</Bold></>,
              <>Be aware of <Bold>memory leaks</Bold> - clean up when done</>,
              <>Use <Bold>weak maps</Bold> for caching objects</>,
              <>Understand <Bold>scope chain</Bold> for debugging</>,
              <>Use <Bold>dev tools</Bold> to inspect closures</>,
              <>Avoid capturing large objects unnecessarily</>,
              <>Use <Bold>let</Bold> and <Bold>const</Bold> for block scoping</>,
              <>Consider <Bold>performance</Bold> when creating many closures</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Best Practices">
          <PlainText component="div">
            • <Bold>Use closures for private variables</Bold> (module pattern)<br />
            • <Bold>Be intentional</Bold> about what you capture<br />
            • <Bold>Clean up</Bold> event listeners and timers<br />
            • <Bold>Avoid unnecessary closures</Bold> for performance<br />
            • <Bold>Use arrow functions</Bold> for lexical this binding<br />
            • <Bold>Understand</Bold> the scope chain in your code<br />
            • <Bold>Test</Bold> closures thoroughly for side effects
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Closures are one of the <Bold>most powerful features</Bold> of JavaScript. They enable <Bold>functional programming</Bold>, <Bold>data privacy</Bold>, and <Bold>asynchronous programming</Bold>. Understanding closures is <Bold>essential</Bold> for writing advanced JavaScript applications.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Closures are a <Bold>fundamental concept</Bold> in JavaScript that every developer should master. They enable <Bold>powerful patterns</Bold> and are used extensively in <Bold>modern JavaScript</Bold> development.
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
            <>A closure is a function that <Bold>remembers</Bold> its lexical environment</>,
            <>Closures allow <Bold>private variables</Bold> and <Bold>encapsulation</Bold></>,
            <>They are used for <Bold>function factories</Bold>, <Bold>event handlers</Bold>, and <Bold>callbacks</Bold></>,
            <>Closures capture variables by <Bold>reference</Bold>, not by value</>,
            <>They can cause <Bold>memory leaks</Bold> if not managed properly</>,
            <>Understanding closures is <Bold>essential</Bold> for advanced JavaScript</>,
            <>Use closures for <Bold>data privacy</Bold> and <Bold>module patterns</Bold></>,
            <>Be mindful of <Bold>performance</Bold> when creating many closures</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Mastering closures will <Bold>transform</Bold> how you write JavaScript. They enable <Bold>clean, maintainable code</Bold> and are the foundation of <Bold>modern JavaScript patterns</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Closures are a <Bold>powerful feature</Bold> that make JavaScript unique. They allow you to <Bold>encapsulate state</Bold>, create <Bold>private variables</Bold>, and write <Bold>elegant, functional code</Bold>!
      </Note>
    </QuestionWrapper>
  );
}