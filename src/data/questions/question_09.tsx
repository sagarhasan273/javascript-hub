// data/questions/Question09.tsx
import { QuestionWrapper } from "../../components/QuestionWrapper";
import { LevelContent } from "../../components/LevelContent";
import {
  Title,
  PlainText,
  Bold,
  Divider,
  CardComponent,
  HLText,
  CodeComponent,
  Note,
  Gap,
  TableComponent,
  InlineCode,
  UnorderedList,
} from "../../components/content";
import { question09Meta } from "./registry";
import { Box } from "@mui/material";
import { useLevel } from '../../hooks';

export function Question09({
  isActive = false,
}: {
  index?: number;
  isActive?: boolean;
}) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question09Meta.id}
      title={question09Meta.title}
      definition={question09Meta.definition}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Arrow functions</Bold> (also known as{" "}
        <Bold>lambda expressions</Bold>) are a concise way to write function
        expressions in JavaScript. They were introduced in ES6 and provide a{" "}
        <Bold>shorter syntax</Bold> compared to traditional function
        expressions.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: "#10b981", mr: 1 }}>
            🌱
          </Box>
          Beginner: Arrow Functions Basics
        </Title>

        <PlainText>
          Arrow functions are a shorter way to write functions. Here's the basic
          syntax:
        </PlainText>

        <CodeComponent
          code={`// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function - same thing
const add = (a, b) => {
  return a + b;
};

// Arrow function - even shorter (implicit return)
const add = (a, b) => a + b;

// Single parameter - no parentheses needed
const double = x => x * 2;

// No parameters - need empty parentheses
const greet = () => console.log('Hello!');

// Returning an object - wrap in parentheses
const createPerson = (name, age) => ({ name, age });`}
          language="javascript"
          title="basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> Arrow functions with a single expression can
          use <Bold>implicit return</Bold> - no <InlineCode>return</InlineCode>{" "}
          keyword needed!
        </Note>

        <CardComponent
          variant="success"
          title="🎯 When to Use Arrow Functions (Beginner)"
        >
          <UnorderedList
            items={[
              <>
                Simple transformations with array methods like{" "}
                <InlineCode>map()</InlineCode>,{" "}
                <InlineCode>filter()</InlineCode>
              </>,
              <>Short callback functions</>,
              <>Functional programming style</>,
              <>When you want cleaner, more readable code</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="warning" title="⚠️ Common Beginner Mistakes">
          <UnorderedList
            items={[
              <>
                Forgetting parentheses for multiple parameters:{" "}
                <InlineCode>{`(a, b) =>`}</InlineCode>
              </>,
              <>
                Forgetting parentheses for object return:{" "}
                <InlineCode>{`() => ({ name })`}</InlineCode>
              </>,
              <>
                Using arrow functions when you need the original{" "}
                <InlineCode>this</InlineCode> context
              </>,
            ]}
          />
        </CardComponent>

        <Note type="success" icon="✅">
          <Bold>Practice Exercise:</Bold> Try converting this traditional
          function to an arrow function:
          <CodeComponent
            code={`// Convert this:
function multiply(a, b) {
  return a * b;
}

// To arrow function:
const multiply = (a, b) => a * b;`}
            language="javascript"
            title="exercise.js"
            defaultOpen={true}
            showTitle={false}
          />
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Divider sx={{ my: 3 }} />

        <Title level={3}>
          <Box component="span" sx={{ color: "#f59e0b", mr: 1 }}>
            ⚡
          </Box>
          Advanced: this Binding & Use Cases
        </Title>

        <PlainText>
          The most important difference is how arrow functions handle{" "}
          <Bold>this</Bold>:
        </PlainText>

        <CodeComponent
          code={`// Traditional function - this depends on how it's called
const person = {
  name: 'John',
  greet: function() {
    console.log('Hello, ' + this.name);
  }
};
person.greet(); // Hello, John

const greetFn = person.greet;
greetFn(); // Hello, undefined (this = window/global)

// Arrow function - this is inherited from parent scope
const person2 = {
  name: 'John',
  greet: () => {
    console.log('Hello, ' + this.name); // this = window
  }
};
person2.greet(); // Hello, undefined

// Real-world example - Timer with traditional function
function Timer() {
  this.seconds = 0;
  
  // This fails - loses 'this'
  setInterval(function() {
    this.seconds++; // this = window
    console.log(this.seconds); // NaN
  }, 1000);
}

// Timer with arrow function - preserves 'this'
function Timer2() {
  this.seconds = 0;
  
  setInterval(() => {
    this.seconds++; // this = Timer2 instance
    console.log(this.seconds); // 1, 2, 3...
  }, 1000);
}

// Event handlers with arrow functions
const button = document.querySelector('button');

// Traditional - 'this' = button element
button.addEventListener('click', function() {
  console.log(this); // button element
});

// Arrow - 'this' = parent scope (window)
button.addEventListener('click', () => {
  console.log(this); // window
});`}
          language="javascript"
          title="this-binding.js"
          defaultOpen={true}
        />

        <CardComponent
          variant="info"
          title="📊 Arrow vs Traditional Comparison"
        >
          <TableComponent
            headers={["Feature", "Arrow Function", "Traditional Function"]}
            rows={[
              [
                "this binding",
                "Lexical (inherited)",
                "Dynamic (depends on call)",
              ],
              ["arguments object", "❌ Not available", "✅ Available"],
              ["Constructor", "❌ Cannot use new", "✅ Can use new"],
              ["Prototype", "❌ No prototype", "✅ Has prototype"],
              ["Implicit return", "✅ Yes (single expression)", "❌ No"],
              ["new.target", "❌ Not available", "✅ Available"],
              ["Super keyword", "❌ Not available", "✅ Available"],
            ]}
          />
        </CardComponent>

        <Title level={4}>✅ When to Use Arrow Functions (Advanced)</Title>
        <CardComponent variant="success" title="Perfect Use Cases">
          <UnorderedList
            items={[
              <>
                Callbacks - array methods (<InlineCode>map</InlineCode>,{" "}
                <InlineCode>filter</InlineCode>, <InlineCode>reduce</InlineCode>
                )
              </>,
              <>
                Timers - <InlineCode>setTimeout</InlineCode>,{" "}
                <InlineCode>setInterval</InlineCode>
              </>,
              <>Promises and async/await callbacks</>,
              <>React components and class methods (to auto-bind this)</>,
              <>Functional programming and data pipelines</>,
              <>
                When you want to preserve <InlineCode>this</InlineCode> context
                from parent scope
              </>,
            ]}
          />
        </CardComponent>

        <Title level={4}>❌ When NOT to Use Arrow Functions (Advanced)</Title>
        <CardComponent variant="warning" title="Avoid When">
          <UnorderedList
            items={[
              <>
                Object methods that need dynamic <InlineCode>this</InlineCode>
              </>,
              <>
                Constructors (<InlineCode>new</InlineCode> keyword)
              </>,
              <>
                Event handlers where you need <InlineCode>this</InlineCode> to
                refer to the element
              </>,
              <>
                When you need the <InlineCode>arguments</InlineCode> object
              </>,
              <>
                When you need to use <InlineCode>call()</InlineCode>,{" "}
                <InlineCode>apply()</InlineCode>, or{" "}
                <InlineCode>bind()</InlineCode>
              </>,
              <>
                When you need to access <InlineCode>new.target</InlineCode>
              </>,
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> In React class components, arrow functions are
          commonly used for event handlers to avoid manually binding{" "}
          <InlineCode>this</InlineCode> in the constructor.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Divider sx={{ my: 3 }} />

        <Title level={3}>
          <Box component="span" sx={{ color: "#ef4444", mr: 1 }}>
            🚀
          </Box>
          Expert: Advanced Patterns & Performance
        </Title>

        <PlainText>
          Deep dive into advanced arrow function patterns, performance
          considerations, and expert-level techniques:
        </PlainText>

        <CodeComponent
          code={`// 1. Higher-order functions with arrow functions
const createMultiplier = (factor) => (value) => value * factor;

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 2. Function composition with arrow functions
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const doubleNum = x => x * 2;
const square = x => x * x;

const composed = compose(square, doubleNum, addOne);
console.log(composed(2)); // (2+1) * 2 = 6, squared = 36

// 3. Pipeline with arrow functions
const processData = (data) =>
  data
    .filter(item => item.active)
    .map(item => item.value)
    .reduce((sum, val) => sum + val, 0);

// 4. Currying with arrow functions
const curriedAdd = a => b => c => a + b + c;
const add5 = curriedAdd(5);
const add5and3 = add5(3);
console.log(add5and3(2)); // 10

// 5. Partial application
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest);

const multiply = (a, b, c) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
console.log(multiplyBy2(3, 4)); // 24

// 6. Memoization with arrow functions
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const expensiveFn = (n) => {
  console.log('Computing...');
  return n * n;
};

const memoizedFn = memoize(expensiveFn);
console.log(memoizedFn(5)); // Computing... 25
console.log(memoizedFn(5)); // 25 (from cache)

// 7. React advanced patterns with arrow functions
const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initial), [initial]);
  
  return { count, increment, decrement, reset };
};

// 8. Functional error handling
const tryCatch = (fn, fallback) => (...args) => {
  try {
    const result = fn(...args);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: fallback || error.message };
  }
};

const safeDivide = tryCatch((a, b) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}, 'Cannot divide by zero');

console.log(safeDivide(10, 2)); // { success: true, data: 5 }
console.log(safeDivide(10, 0)); // { success: false, error: 'Cannot divide by zero' }`}
          language="javascript"
          title="advanced-patterns.js"
          defaultOpen={false}
        />

        <Title level={4}>⚡ Performance Considerations</Title>
        <CardComponent variant="info" title="Performance Tips">
          <UnorderedList
            items={[
              <>
                Arrow functions are slightly slower in V8 (negligible impact)
              </>,
              <>
                Memory efficient - no own <InlineCode>this</InlineCode> binding
              </>,
              <>Great for functional programming with immutability</>,
              <>
                Use <InlineCode>useCallback</InlineCode> with arrow functions in
                React to prevent re-renders
              </>,
              <>
                Avoid arrow functions in hot code paths if performance is
                critical
              </>,
              <>
                Arrow functions create new function instances - use{" "}
                <InlineCode>useCallback</InlineCode> or{" "}
                <InlineCode>useMemo</InlineCode> for memoization
              </>,
            ]}
          />
        </CardComponent>

        <Title level={4}>💡 Expert Tips & Best Practices</Title>
        <CardComponent variant="default" title="Pro Insights">
          <UnorderedList
            items={[
              <>
                Combine arrow functions with <Bold>destructuring</Bold> for
                cleaner parameter handling
              </>,
              <>
                Use arrow functions in <Bold>pipelines</Bold> for data
                transformation
              </>,
              <>
                Master <Bold>higher-order functions</Bold> with arrow syntax
              </>,
              <>
                Understand the <Bold>lexical scoping</Bold> implications
              </>,
              <>
                Use arrow functions for <Bold>immutability patterns</Bold>
              </>,
              <>
                Implement <Bold>currying</Bold> and{" "}
                <Bold>partial application</Bold> for reusable functions
              </>,
              <>
                Use <Bold>functional composition</Bold> for building complex
                behaviors
              </>,
              <>
                Leverage <Bold>memoization</Bold> for expensive computations
              </>,
            ]}
          />
        </CardComponent>

        <Title level={4}>🔍 Deep Dive: Arrow Functions Under the Hood</Title>
        <CodeComponent
          code={`// How arrow functions work internally
// 1. No prototype property
const arrowFn = () => {};
console.log(arrowFn.prototype); // undefined

// 2. Cannot be used as constructor
try {
  const instance = new arrowFn(); // TypeError
} catch (e) {
  console.log(e.message); // arrowFn is not a constructor
}

// 3. No arguments object
const logArgs = () => {
  console.log(arguments); // ReferenceError: arguments is not defined
};

// Workaround - use rest parameters
const logArgs2 = (...args) => {
  console.log(args); // [1, 2, 3]
};
logArgs2(1, 2, 3);

// 4. Lexical this - cannot be changed
const obj = {
  name: 'test',
  method: () => console.log(this.name)
};

// Even with call/apply/bind, this doesn't change
const obj2 = { name: 'other' };
obj.method.call(obj2); // undefined (still global)

// 5. No new.target
const arrowFn2 = () => {
  console.log(new.target); // SyntaxError
};`}
          language="javascript"
          title="under-the-hood.js"
          defaultOpen={false}
        />

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Arrow functions are a powerful tool
          for functional programming. Understanding their behavior with{" "}
          <InlineCode>this</InlineCode>, <InlineCode>arguments</InlineCode>, and{" "}
          <InlineCode>new.target</InlineCode> is essential for writing advanced
          JavaScript applications. They enable a more <Bold>functional</Bold>{" "}
          style of programming that promotes <Bold>immutability</Bold> and{" "}
          <Bold>composability</Bold>.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> While arrow functions are powerful,
          they're not a silver bullet. Overusing them can lead to code that's
          harder to understand, especially when debugging{" "}
          <InlineCode>this</InlineCode> issues. Use them where they make sense,
          but don't hesitate to use traditional functions when appropriate.
        </Note>
      </LevelContent>

      <Gap size={2} />

      {/* ============================================ */}
      {/* SUMMARY - Shown at all levels */}
      {/* ============================================ */}
      <Divider />
      <Title level={3}>
        <Box component="span" sx={{ color: "#10b981", mr: 1 }}>
          📌
        </Box>
        Summary
      </Title>

      <CardComponent variant="info" title="🎯 Key Takeaways">
        <UnorderedList
          items={[
            <>
              Arrow functions provide a <Bold>concise</Bold> syntax for writing
              functions
            </>,
            <>
              They have <Bold>lexical this binding</Bold> - inherit{" "}
              <InlineCode>this</InlineCode> from parent scope
            </>,
            <>
              They <Bold>cannot</Bold> be used as constructors (no{" "}
              <InlineCode>new</InlineCode>)
            </>,
            <>
              Perfect for <Bold>callbacks</Bold>, <Bold>array methods</Bold>,
              and <Bold>functional programming</Bold>
            </>,
            <>
              Understanding when to use arrow vs traditional functions is{" "}
              <Bold>essential</Bold> for writing clean code
            </>,
            <>
              Advanced patterns include <Bold>currying</Bold>,{" "}
              <Bold>composition</Bold>, and <Bold>memoization</Bold>
            </>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Arrow functions are perfect for when you want a{" "}
        <Bold>short, concise function</Bold> that doesn't need its own{" "}
        <InlineCode>this</InlineCode> binding. Use traditional functions when
        you need dynamic <InlineCode>this</InlineCode> or the{" "}
        <InlineCode>arguments</InlineCode> object.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Master arrow functions to write cleaner, more
        modern JavaScript code! Start with the basics, understand{" "}
        <InlineCode>this</InlineCode> binding, and then explore advanced
        functional patterns.
      </Note>
    </QuestionWrapper>
  );
}
