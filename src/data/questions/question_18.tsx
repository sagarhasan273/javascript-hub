// data/questions/Question18.tsx
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
import { question18Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question18({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question18Meta.id}
      title={question18Meta.title}
      definition={question18Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Pure functions</Bold> offer numerous benefits that make code <Bold>more reliable</Bold>, <Bold>maintainable</Bold>, and <Bold>easier to understand</Bold>. They are a cornerstone of <Bold>functional programming</Bold> and <Bold>clean code</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Why Use Pure Functions?
        </Title>

        <PlainText>
          Pure functions make your code <Bold>easier to understand</Bold> and <Bold>safer</Bold>:
        </PlainText>

        <CardComponent variant="success" title="✅ Top Benefits for Beginners">
          <UnorderedList
            items={[
              <>🔮 <Bold>Predictable:</Bold> Same input always gives same output</>,
              <>🧪 <Bold>Easy to Test:</Bold> No need for complex test setups</>,
              <>🐛 <Bold>Fewer Bugs:</Bold> No unexpected side effects</>,
              <>📖 <Bold>Readable:</Bold> Clear what the function does</>,
              <>🔄 <Bold>Reusable:</Bold> Can be used anywhere without worry</>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// Pure function - easy to understand and test
function calculateTotal(price, tax) {
  return price + (price * tax / 100);
}

// Test is simple
console.log(calculateTotal(100, 10)); // 110
console.log(calculateTotal(100, 10)); // 110 (always the same!)

// Impure function - hard to test and understand
let discount = 10;
function calculateTotalImpure(price) {
  return price - discount; // Depends on external variable!
}
// Test is unreliable
console.log(calculateTotalImpure(100)); // 90
discount = 20;
console.log(calculateTotalImpure(100)); // 80 (different output!)`}
          language="javascript"
          title="benefits-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> Pure functions are like <Bold>mathematical functions</Bold> - they always produce the same output for the same input.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Practical Benefits
        </Title>

        <PlainText>
          Here are the practical benefits of pure functions in real-world development:
        </PlainText>

        <CardComponent variant="info" title="📊 Detailed Benefits">
          <PlainText component="div">
            • <Bold>Testability:</Bold> No need for mocks or complex setups<br />
            • <Bold>Debuggability:</Bold> Easy to trace because there are no side effects<br />
            • <Bold>Cacheability:</Bold> Results can be memoized<br />
            • <Bold>Composability:</Bold> Functions can be combined safely<br />
            • <Bold>Parallelization:</Bold> Safe for concurrent execution<br />
            • <Bold>Refactoring:</Bold> Easy to change without breaking other code<br />
            • <Bold>Documentation:</Bold> Clear input/output relationship
          </PlainText>
        </CardComponent>

        <CodeComponent
          code={`// 1. Testability - Simple and reliable tests
function processOrder(items, tax) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + (subtotal * tax / 100);
  return {
    items,
    subtotal,
    tax,
    total,
    itemCount: items.length
  };
}

// Easy test
const testItems = [{ price: 10 }, { price: 20 }];
const result = processOrder(testItems, 10);
// Assert result.total === 33, result.itemCount === 2

// 2. Composability - Building complex logic
const double = x => x * 2;
const square = x => x * x;
const addTen = x => x + 10;

const compute = compose(double, square, addTen);
console.log(compute(5)); // (5+10)^2 * 2 = 450

// 3. Memoization - Caching results
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = (n) => {
  console.log('Computing...');
  return n * n * n;
};

const memoizedCalc = memoize(expensiveCalc);
console.log(memoizedCalc(5)); // Computing... 125
console.log(memoizedCalc(5)); // 125 (from cache)

// 4. Parallelization - Safe for concurrent code
// Pure functions can run in parallel without race conditions
const tasks = [1, 2, 3, 4, 5];
const results = tasks.map(x => x * x); // Pure mapping - safe in parallel`}
          language="javascript"
          title="benefits-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="success" title="✅ Real-World Benefits">
          <UnorderedList
            items={[
              <>⚡ <Bold>Performance:</Bold> Memoization reduces repeated calculations</>,
              <>🔧 <Bold>Maintainability:</Bold> Easier to fix and extend</>,
              <>🧪 <Bold>Testing:</Bold> Simple unit tests, no integration needed</>,
              <>📦 <Bold>Reusability:</Bold> Functions can be used anywhere</>,
              <>🚀 <Bold>Scalability:</Bold> Safe for distributed systems</>,
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
          Expert: Advanced Benefits & Patterns
        </Title>

        <PlainText>
          Pure functions enable advanced patterns and architectures:
        </PlainText>

        <CodeComponent
          code={`// 1. Pure functions in Redux/State Management
// Redux reducers must be pure
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
}

// 2. Pure functions in React
function UserList({ users }) {
  // Pure function component
  return users.map(user => <UserCard key={user.id} user={user} />);
}

// 3. Testing with pure functions
// No mocking needed!
function calculateTotal(items, taxRate) {
  return items.reduce((sum, item) => sum + item.price, 0) * (1 + taxRate);
}

test('calculateTotal', () => {
  const items = [{ price: 10 }, { price: 20 }];
  expect(calculateTotal(items, 0.1)).toBe(33);
});

// 4. Pure functions enable functional reactive programming
const Observable = (subscribe) => ({
  subscribe,
  map: (fn) => Observable((observer) => 
    subscribe((value) => observer(fn(value)))
  ),
  filter: (predicate) => Observable((observer) =>
    subscribe((value) => predicate(value) && observer(value))
  )
});

// 5. Pure functions in FP pipelines
const processData = (data) =>
  data
    .filter(item => item.active)      // Pure
    .map(item => item.value)          // Pure
    .reduce((sum, val) => sum + val, 0); // Pure

// 6. Time-Travel Debugging (possible with pure functions)
function reducer(state, action) {
  // Pure function - enables time travel
  switch (action.type) {
    case 'ADD': return { count: state.count + 1 };
    case 'SUBTRACT': return { count: state.count - 1 };
    default: return state;
  }
}

// Can replay actions to debug
const actions = [
  { type: 'ADD' },
  { type: 'ADD' },
  { type: 'SUBTRACT' }
];
const finalState = actions.reduce(reducer, { count: 0 });`}
          language="javascript"
          title="expert-benefits.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Advanced Benefits">
          <UnorderedList
            items={[
              <>🔮 <Bold>Time-Travel Debugging:</Bold> Replay actions for debugging</>,
              <>🧮 <Bold>State Management:</Bold> Redux, Zustand, etc. require pure reducers</>,
              <>🚀 <Bold>Functional Reactive Programming:</Bold> RxJS, Observables</>,
              <>⚛️ <Bold>React Performance:</Bold> Pure components can skip re-rendering</>,
              <>📊 <Bold>Data Pipelines:</Bold> Clean, composable data transformations</>,
              <>🧪 <Bold>Property-Based Testing:</Bold> QuickCheck-style testing</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Pure functions are the foundation of <Bold>functional programming</Bold></>,
              <>They enable <Bold>parallel processing</Bold> and <Bold>distributed systems</Bold></>,
              <>Use <Bold>immutability</Bold> with pure functions for maximum benefit</>,
              <>Separate <Bold>pure logic</Bold> from <Bold>impure effects</Bold> in your architecture</>,
              <>Pure functions are <Bold>the future</Bold> of scalable application development</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Pure functions are not just a coding style - they're a <Bold>fundamental approach</Bold> to building reliable, scalable software. They enable <Bold>functional programming</Bold>, <Bold>testability</Bold>, and <Bold>maintainability</Bold> at scale.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> The benefits of pure functions compound over time. While they require a mindset shift, they lead to <Bold>cleaner, more maintainable code</Bold> that's <Bold>easier to understand</Bold> and <Bold>debug</Bold>.
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
            <>Pure functions are <Bold>predictable</Bold> and <Bold>reliable</Bold></>,
            <>They are <Bold>easy to test</Bold> without complex setups</>,
            <>Pure functions enable <Bold>memoization</Bold> and <Bold>caching</Bold></>,
            <>They support <Bold>functional composition</Bold> and <Bold>pipelines</Bold></>,
            <>Pure functions are <Bold>safe for parallel execution</Bold></>,
            <>They make code <Bold>easier to debug</Bold> and <Bold>maintain</Bold></>,
            <>Pure functions are the foundation of <Bold>functional programming</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Embrace pure functions for the core logic of your application. They'll make your code <Bold>cleaner</Bold>, <Bold>more reliable</Bold>, and <Bold>easier to maintain</Bold> over time.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> The benefits of pure functions are <Bold>compounding</Bold> - as your codebase grows, the advantages of purity become even more apparent. Start small and build from there!
      </Note>
    </QuestionWrapper>
  );
}