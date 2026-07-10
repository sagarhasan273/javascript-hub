// data/questions/Question15.tsx
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
import { question15Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question15({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question15Meta.id}
      title={question15Meta.title}
      definition={question15Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>unary function</Bold> is a function that takes <Bold>exactly one argument</Bold>. The term "unary" comes from mathematics, where it means "having one component" or "operating on a single operand."
      </PlainText>

      <PlainText>
        While JavaScript functions can accept any number of arguments, <Bold>unary functions</Bold> are designed to work with a single input and are fundamental to <Bold>functional programming</Bold> patterns like <Bold>composition</Bold>, <Bold>currying</Bold>, and <Bold>mapping</Bold>.
      </PlainText>

      <Gap size={2} />

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding Unary Functions
        </Title>

        <PlainText>
          A unary function is simply a function that takes <Bold>one argument</Bold>. It's the simplest form of function and is widely used in JavaScript.
        </PlainText>

        <Title level={4}>Simple Unary Functions</Title>
        <CodeComponent
          code={`// Unary functions - take exactly one argument
function double(x) {
  return x * 2;
}

function square(x) {
  return x * x;
}

function isEven(x) {
  return x % 2 === 0;
}

function toUpperCase(str) {
  return str.toUpperCase();
}

function getType(value) {
  return typeof value;
}

// Using unary functions
console.log(double(5));        // 10
console.log(square(4));        // 16
console.log(isEven(7));        // false
console.log(toUpperCase("hello")); // HELLO
console.log(getType(42));      // number`}
          language="javascript"
          title="unary-basics.js"
          defaultOpen={true}
        />

        <PlainText>
          <Bold>Binary vs Unary Functions</Bold>
        </PlainText>

        <CodeComponent
          code={`// Unary function - one argument
function double(x) {
  return x * 2;
}

// Binary function - two arguments
function add(a, b) {
  return a + b;
}

// Ternary function - three arguments
function sum(a, b, c) {
  return a + b + c;
}

// Using them
console.log(double(5));        // 10 (unary)
console.log(add(5, 3));        // 8  (binary)
console.log(sum(1, 2, 3));     // 6  (ternary)

// Arrow function versions
const doubleArrow = x => x * 2;
const addArrow = (a, b) => a + b;
const sumArrow = (a, b, c) => a + b + c;`}
          language="javascript"
          title="unary-vs-binary.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📋 Characteristics of Unary Functions">
          <UnorderedList
            items={[
              <>✅ Takes exactly <Bold>one argument</Bold></>,
              <>✅ <Bold>Simple</Bold> and <Bold>focused</Bold></>,
              <>✅ <Bold>Easy to understand</Bold> and <Bold>test</Bold></>,
              <>✅ <Bold>Composable</Bold> - can be combined with other functions</>,
              <>✅ Common in <Bold>functional programming</Bold></>,
              <>✅ Often used with <Bold>array methods</Bold> like <InlineCode>map()</InlineCode></>,
            ]}
          />
        </CardComponent>

        <Title level={4}>Unary Functions with Array Methods</Title>
        <CodeComponent
          code={`// Unary functions are perfect for array methods
const numbers = [1, 2, 3, 4, 5];

// map() expects a unary function
const doubled = numbers.map(x => x * 2);
const squared = numbers.map(x => x * x);
const stringified = numbers.map(x => \`Number: \${x}\`);

console.log(doubled);     // [2, 4, 6, 8, 10]
console.log(squared);     // [1, 4, 9, 16, 25]
console.log(stringified); // ['Number: 1', 'Number: 2', ...]

// filter() expects a unary predicate function
const evens = numbers.filter(x => x % 2 === 0);
const large = numbers.filter(x => x > 3);

console.log(evens); // [2, 4]
console.log(large); // [4, 5]`}
          language="javascript"
          title="unary-array.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> A unary function is like a <Bold>single-purpose tool</Bold> - it does one thing with one input and gives you one output. This simplicity makes it <Bold>reliable</Bold> and <Bold>easy to combine</Bold> with other functions.
        </Note>

        <CardComponent variant="success" title="✅ Beginner Summary">
          <UnorderedList
            items={[
              <>Unary functions take <Bold>exactly one argument</Bold></>,
              <>They are <Bold>simple</Bold>, <Bold>focused</Bold>, and <Bold>easy to test</Bold></>,
              <>They work perfectly with <Bold>array methods</Bold> like <InlineCode>map()</InlineCode> and <InlineCode>filter()</InlineCode></>,
              <>Unary functions are the <Bold>building blocks</Bold> of functional programming</>,
              <>They can be easily <Bold>composed</Bold> with other functions</>,
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
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Unary Functions in Practice
        </Title>

        <PlainText>
          Unary functions are <Bold>fundamental</Bold> to functional programming. They enable <Bold>composition</Bold>, <Bold>currying</Bold>, and <Bold>point-free style</Bold> programming.
        </PlainText>

        <Title level={4}>Function Composition with Unary Functions</Title>
        <CodeComponent
          code={`// Unary functions are ideal for composition
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

// All unary functions
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;
const toString = x => \`Result: \${x}\`;

// Compose unary functions
const transform = compose(toString, square, double, addOne);

console.log(transform(3)); // Result: 64 (3+1=4, 4*2=8, 8*8=64)

// Pipe with unary functions
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const process = pipe(addOne, double, square, toString);
console.log(process(3)); // Result: 64

// Real-world: Data transformation pipeline
const cleanData = pipe(
  (data) => data.trim(),
  (data) => data.toLowerCase(),
  (data) => data.replace(/[^a-z0-9]/g, '-'),
  (data) => data.substring(0, 20)
);

console.log(cleanData("  Hello, World!  ")); // hello-world`}
          language="javascript"
          title="unary-composition.js"
          defaultOpen={true}
        />

        <Title level={4}>Currying with Unary Functions</Title>
        <CodeComponent
          code={`// Currying transforms multi-argument functions
// into a series of unary functions

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...next) => curried(...args, ...next);
  };
}

// Multi-argument function
function add(a, b, c) {
  return a + b + c;
}

// Curried version returns unary functions
const curriedAdd = curry(add);

// Each call returns a unary function
const add5 = curriedAdd(5);      // Unary: takes b
const add5and3 = add5(3);        // Unary: takes c
console.log(add5and3(2));        // 10

// Or chain them
console.log(curriedAdd(5)(3)(2)); // 10

// Practical: Configuration builder with unary functions
const createLogger = (level) => (message) => (data) => {
  console.log(\`[\${level}] \${message}\`, data);
};

const logError = createLogger('ERROR');
const logInfo = createLogger('INFO');

logError('Something went wrong')({ code: 500 });
// [ERROR] Something went wrong { code: 500 }`}
          language="javascript"
          title="unary-currying.js"
          defaultOpen={false}
        />

        <Title level={4}>Converting Multi-Argument to Unary Functions</Title>
        <CodeComponent
          code={`// Converting functions to unary
function add(a, b) {
  return a + b;
}

// Not unary - takes two arguments
console.log(add(5, 3)); // 8

// Convert to unary using currying
const unaryAdd = a => b => a + b;
console.log(unaryAdd(5)(3)); // 8

// Using bind to create unary functions
const add5 = add.bind(null, 5);
console.log(add5(3)); // 8

// Using arrow functions to create unary functions
const multiplyBy = (multiplier) => (value) => value * multiplier;
const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15`}
          language="javascript"
          title="convert-to-unary.js"
          defaultOpen={false}
        />

        <Title level={4}>Unary Functions vs Multi-Arity Functions</Title>
        <TableComponent
          headers={['Feature', 'Unary', 'Binary', 'Multi-Arity']}
          rows={[
            ['Arguments', '1', '2', '3+'],
            ['Complexity', 'Simple', 'Medium', 'Complex'],
            ['Composability', '✅ Easy', '⚠️ Needs wrapping', '⚠️ Harder'],
            ['Testing', '✅ Easy', '✅ Easy', '⚠️ More complex'],
            ['Currying', '✅ Already curried', '✅ Can be curried', '✅ Can be curried'],
            ['Array Methods', '✅ Perfect', '⚠️ Sometimes', '❌ Not ideal'],
          ]}
        />

        <Note type="info" icon="💡">
          <Bold>Advanced Tip:</Bold> When working with higher-order functions, prefer <Bold>unary functions</Bold> for <Bold>callbacks</Bold> and <Bold>transformations</Bold>. They are <Bold>easier to compose</Bold> and <Bold>reason about</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Unary Function Patterns
        </Title>

        <PlainText>
          Unary functions are the <Bold>atomic units</Bold> of functional programming. Expert developers use them to build <Bold>composable</Bold>, <Bold>reusable</Bold>, and <Bold>testable</Bold> systems.
        </PlainText>

        <Title level={4}>Point-Free Style (Tacit Programming)</Title>
        <CodeComponent
          code={`// Point-free style - functions without mentioning arguments

// Regular style
function doubleAndSquare(x) {
  const doubled = x * 2;
  return doubled * doubled;
}

// Point-free style using composition
const double = x => x * 2;
const square = x => x * x;
const doubleAndSquarePF = compose(square, double);

console.log(doubleAndSquarePF(3)); // 36

// More complex example
const numbers = [1, 2, 3, 4, 5];

// Regular style
const evenDoubled = numbers
  .filter(x => x % 2 === 0)
  .map(x => x * 2);

// Point-free style
const isEven = x => x % 2 === 0;
const multiplyBy2 = x => x * 2;
const evenDoubledPF = numbers.filter(isEven).map(multiplyBy2);

console.log(evenDoubledPF); // [4, 8]

// Creating reusable unary predicates
const isGreaterThan = (threshold) => (value) => value > threshold;
const isLessThan = (threshold) => (value) => value < threshold;

const greaterThan5 = isGreaterThan(5);
const lessThan10 = isLessThan(10);

const data = [3, 7, 12, 4, 9, 15];
const filtered = data.filter(x => greaterThan5(x) && lessThan10(x));
console.log(filtered); // [7, 9]`}
          language="javascript"
          title="point-free.js"
          defaultOpen={false}
        />

        <Title level={4}>Unary Function Libraries</Title>
        <CodeComponent
          code={`// Building a library of unary utility functions
const U = {
  // Type checks (unary)
  isNumber: (x) => typeof x === 'number',
  isString: (x) => typeof x === 'string',
  isBoolean: (x) => typeof x === 'boolean',
  isArray: (x) => Array.isArray(x),
  isObject: (x) => typeof x === 'object' && x !== null && !Array.isArray(x),
  isFunction: (x) => typeof x === 'function',
  isNull: (x) => x === null,
  isUndefined: (x) => x === undefined,

  // Transformations (unary)
  toNumber: (x) => Number(x),
  toString: (x) => String(x),
  toBoolean: (x) => Boolean(x),
  toJSON: (x) => JSON.stringify(x),
  parseJSON: (x) => JSON.parse(x),

  // String operations (unary)
  trim: (x) => x.trim(),
  lower: (x) => x.toLowerCase(),
  upper: (x) => x.toUpperCase(),
  reverse: (x) => x.split('').reverse().join(''),

  // Math operations (unary)
  abs: (x) => Math.abs(x),
  sqrt: (x) => Math.sqrt(x),
  floor: (x) => Math.floor(x),
  ceil: (x) => Math.ceil(x),

  // Array operations (unary)
  length: (x) => x.length,
  first: (x) => x[0],
  last: (x) => x[x.length - 1],
};

// Usage examples
const data = '  Hello World  ';
console.log(U.trim(data));       // 'Hello World'
console.log(U.lower(data));      // '  hello world  '
console.log(U.upper(data));      // '  HELLO WORLD  '

const numbers = [1, 2, 3, 4, 5];
console.log(U.length(numbers));  // 5
console.log(U.first(numbers));   // 1
console.log(U.last(numbers));    // 5

// Composing unary utilities
const processString = compose(U.trim, U.lower, U.reverse);
console.log(processString('  JavaScript  ')); // 'tpircsavaj'

// Filter with unary predicates
const values = [1, 'hello', 42, 'world', true, null, { a: 1 }, [1, 2]];
const strings = values.filter(U.isString);
const numbersOnly = values.filter(U.isNumber);
const objects = values.filter(U.isObject);

console.log(strings);    // ['hello', 'world']
console.log(numbersOnly); // [1, 42]
console.log(objects);    // [{ a: 1 }]`}
          language="javascript"
          title="unary-library.js"
          defaultOpen={false}
        />

        <Title level={4}>Performance Optimization with Unary Functions</Title>
        <CardComponent variant="info" title="⚡ Performance Benefits">
          <UnorderedList
            items={[
              <>Unary functions are <Bold>faster</Bold> - fewer arguments mean less overhead</>,
              <>They are <Bold>easier to inline</Bold> by JavaScript engines</>,
              <>They enable <Bold>better optimization</Bold> in JIT compilers</>,
              <>They reduce <Bold>function call overhead</Bold></>,
              <>They are <Bold>easier to memoize</Bold> (single argument key)</>,
              <>They produce <Bold>cleaner stack traces</Bold></>,
            ]}
          />
        </CardComponent>

        <Title level={4}>Expert Best Practices</Title>
        <CardComponent variant="default" title="💡 Pro Insights">
          <UnorderedList
            items={[
              <>Prefer <Bold>unary functions</Bold> for callbacks and transformations</>,
              <>Use <Bold>currying</Bold> to convert multi-argument functions to unary</>,
              <>Build <Bold>unary utility libraries</Bold> for common operations</>,
              <>Use <Bold>point-free style</Bold> to make code more declarative</>,
              <>Compose unary functions for <Bold>complex operations</Bold></>,
              <>Test unary functions <Bold>thoroughly</Bold> - they are the building blocks</>,
              <>Document <Bold>input and output types</Bold> for unary functions</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Unary functions are the <Bold>most composable</Bold> and <Bold>reusable</Bold> units of code. By designing your functions to take <Bold>one argument</Bold>, you enable <Bold>functional composition</Bold> and create systems that are <Bold>easier to understand</Bold>, <Bold>test</Bold>, and <Bold>maintain</Bold>.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> While unary functions are powerful, forcing every function to be unary can lead to <Bold>awkward code</Bold>. Use them <Bold>when appropriate</Bold> - for transformations, callbacks, and predicates. Don't force it if it makes the code <Bold>harder to read</Bold>.
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
            <>Unary functions take <Bold>exactly one argument</Bold></>,
            <>They are <Bold>simple</Bold>, <Bold>focused</Bold>, and <Bold>easy to test</Bold></>,
            <>They are <Bold>perfect</Bold> for array methods like <InlineCode>map()</InlineCode> and <InlineCode>filter()</InlineCode></>,
            <>They enable <Bold>function composition</Bold> and <Bold>point-free style</Bold></>,
            <>They can be created through <Bold>currying</Bold> and <Bold>partial application</Bold></>,
            <>They are the <Bold>building blocks</Bold> of functional programming</>,
            <>Use them for <Bold>transformations</Bold>, <Bold>predicates</Bold>, and <Bold>callbacks</Bold></>,
            <>They make code <Bold>more composable</Bold> and <Bold>maintainable</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> When writing functions, think about whether they can be <Bold>unary</Bold>. One-argument functions are the <Bold>most reusable</Bold> and <Bold>composable</Bold> building blocks. This simple practice will <Bold>transform</Bold> your code quality.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Unary functions are the <Bold>simplest form</Bold> of functions, but they enable the <Bold>most powerful</Bold> patterns in functional programming. Master the art of writing <Bold>unary functions</Bold> and you'll unlock the full potential of JavaScript!
      </Note>
    </QuestionWrapper>
  );
}