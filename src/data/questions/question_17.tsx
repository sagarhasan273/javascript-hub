// data/questions/Question17.tsx
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
import { question17Meta } from "./registry";
import { useLevel } from "../../hooks";

export function Question17({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question17Meta.id}
      title={question17Meta.title}
      definition={question17Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>pure function</Bold> is a function that <Bold>always</Bold> produces the same output for the same input and has <Bold>no side effects</Bold>. It doesn't modify any external state and doesn't depend on anything outside its scope.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is a Pure Function?
        </Title>

        <PlainText>
          Think of a pure function like a <Bold>vending machine</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🥤 Analogy">
          <PlainText>
            • <Bold>Pure function:</Bold> You press "Cola" (input) → you always get a Cola (output). Nothing else changes.<br />
            • <Bold>Impure function:</Bold> You press "Cola" → sometimes you get Cola, sometimes it's out of stock (depends on external state). Or it changes the machine's temperature (side effect).
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// Pure function - always returns same output for same input
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (always 5!)

// Pure function - no side effects
function doubleArray(arr) {
  return arr.map(item => item * 2); // Creates a new array
}
const original = [1, 2, 3];
const doubled = doubleArray(original);
console.log(original); // [1, 2, 3] (unchanged)
console.log(doubled);  // [2, 4, 6]

// Impure function - side effects!
let counter = 0;
function increment() {
  counter++; // Modifies external state
  return counter;
}
console.log(increment()); // 1
console.log(increment()); // 2 (different output!)`}
          language="javascript"
          title="pure-function-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> A pure function has two rules:
          1. <Bold>Same input → Same output</Bold>
          2. <Bold>No side effects</Bold>
        </Note>

        <CardComponent variant="success" title="✅ Pure vs Impure Examples">
          <PlainText component="div">
            • <Bold>Pure:</Bold> <InlineCode>Math.max(2, 5)</InlineCode> → always 5<br />
            • <Bold>Impure:</Bold> <InlineCode>Date.now()</InlineCode> → different every time<br />
            • <Bold>Pure:</Bold> <InlineCode>str.toUpperCase()</InlineCode> → no side effects<br />
            • <Bold>Impure:</Bold> <InlineCode>console.log()</InlineCode> → has side effects
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
          Advanced: Pure Functions in Depth
        </Title>

        <PlainText>
          Understanding pure functions is crucial for <Bold>functional programming</Bold> and <Bold>writing bug-free code</Bold>:
        </PlainText>

        <CodeComponent
          code={`// Common side effects to avoid:
// 1. Modifying external variables
let total = 0;
function addToTotal(value) {
  total += value; // Side effect!
  return total;
}

// 2. DOM manipulation
function updateButton() {
  document.getElementById('btn').textContent = 'Clicked'; // Side effect!
}

// 3. API calls
function fetchData() {
  fetch('/api/data'); // Side effect!
}

// 4. Random values
function getRandom() {
  return Math.random(); // Not pure!
}

// 5. Date/time
function getCurrentTime() {
  return new Date(); // Not pure!
}

// How to make them pure:
// 1. Return new values instead of modifying
function addToTotalPure(total, value) {
  return total + value; // Pure!
}

// 2. Accept dependencies as parameters
function updateButtonPure(button, text) {
  return { ...button, text }; // Pure!
}

// 3. Return data instead of making API calls
function processData(data) {
  return data.map(item => item * 2); // Pure!
}

// 4. Accept random seed as parameter
function getRandomPure(seed) {
  return seed * 123456789 % 100; // Pure!
}

// 5. Accept time as parameter
function getTimePure(timestamp) {
  return new Date(timestamp); // Pure!
}`}
          language="javascript"
          title="pure-functions-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Pure vs Impure Comparison">
          <TableComponent
            headers={['Feature', 'Pure Function', 'Impure Function']}
            rows={[
              ['Same input → Same output', '✅ Yes', '❌ No'],
              ['No side effects', '✅ Yes', '❌ No'],
              ['Depends on external state', '❌ No', '✅ Yes'],
              ['Modifies external state', '❌ No', '✅ Yes'],
              ['Predictable', '✅ Yes', '❌ No'],
              ['Easy to test', '✅ Yes', '❌ No'],
              ['Memoizable', '✅ Yes', '❌ No'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Pure functions are <Bold>easy to test</Bold> - just assert the output for a given input. No need to mock external dependencies!
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Pure Functions & FP Paradigm
        </Title>

        <PlainText>
          Pure functions are the foundation of <Bold>functional programming</Bold>:
        </PlainText>

        <CodeComponent
          code={`// 1. Referential transparency
// A pure function can be replaced with its value
function add(a, b) {
  return a + b;
}
// These are equivalent:
const x = add(2, 3) + 5; // 10
const y = 5 + 5;          // 10

// 2. Memoization - caching pure function results
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFunction = (n) => {
  console.log('Computing...');
  return n * n;
};

const memoized = memoize(expensiveFunction);
console.log(memoized(5)); // Computing... 25
console.log(memoized(5)); // 25 (from cache)

// 3. Immutability with pure functions
const state = { count: 0, user: { name: 'John' } };

// Impure - mutates state
function increment() {
  state.count++;
}

// Pure - returns new state
function incrementPure(state) {
  return {
    ...state,
    count: state.count + 1
  };
}

// 4. Composition with pure functions
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const double = x => x * 2;
const square = x => x * x;
const addTen = x => x + 10;

const composed = compose(double, square, addTen);
console.log(composed(5)); // (5 + 10) = 15, squared = 225, doubled = 450

// 5. Pure functions in Redux
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1; // Pure - returns new state
    case 'DECREMENT':
      return state - 1; // Pure - returns new state
    default:
      return state;
  }
}

// 6. Pure functions in React
const UserCard = ({ name, age }) => {
  // This is a pure component - same props = same render
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};

// 7. Benefits of pure functions in large applications
// - Easier debugging
// - Predictable behavior
// - Testable
// - Cacheable
// - Parallelizable`}
          language="javascript"
          title="expert-pure-functions.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="⚡ Benefits in Production">
          <UnorderedList
            items={[
              <>✅ <Bold>Predictable:</Bold> Easy to reason about code behavior</>,
              <>✅ <Bold>Testable:</Bold> Simple unit tests without mocks</>,
              <>✅ <Bold>Cacheable:</Bold> Memoization is trivial</>,
              <>✅ <Bold>Composable:</Bold> Functions can be combined easily</>,
              <>✅ <Bold>Debugging:</Bold> No unexpected side effects</>,
              <>✅ <Bold>Parallel:</Bold> Safe for concurrent execution</>,
              <>✅ <Bold>Refactoring:</Bold> Easy to change without breaking</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Write <Bold>pure functions</Bold> by default, use side effects only when necessary</>,
              <>Separate <Bold>business logic</Bold> (pure) from <Bold>I/O operations</Bold> (impure)</>,
              <>Use <Bold>immutable data structures</Bold> to support pure functions</>,
              <>In React, prefer <Bold>pure components</Bold> for predictable UI</>,
              <>Use <Bold>Redux</Bold> or <Bold>state management</Bold> that embraces pure functions</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Pure functions are the cornerstone of <Bold>functional programming</Bold>. They make code <Bold>predictable</Bold>, <Bold>testable</Bold>, and <Bold>maintainable</Bold>. Embrace purity where possible!
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> Not everything can be pure (API calls, DOM manipulation, logging). <Bold>Separate pure logic from impure effects</Bold> to get the best of both worlds.
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
            <>A pure function <Bold>always</Bold> returns the same output for the same input</>,
            <>It has <Bold>no side effects</Bold> - doesn't modify external state</>,
            <>Pure functions are <Bold>predictable</Bold>, <Bold>testable</Bold>, and <Bold>composable</Bold></>,
            <>They enable <Bold>memoization</Bold> and <Bold>caching</Bold></>,
            <>Impure functions depend on or modify external state</>,
            <>Separate pure logic from impure effects in your codebase</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Start by making your functions pure by default. When you need side effects (API calls, DOM updates), isolate them in <Bold>separate modules</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Pure functions are the foundation of <Bold>clean, maintainable code</Bold>. They make your code <Bold>easier to understand, test, and debug</Bold>!
      </Note>
    </QuestionWrapper>
  );
}