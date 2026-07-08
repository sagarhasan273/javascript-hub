// data/questions/Question16.tsx
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
import { question16Meta } from "./registry";
import { useLevel } from "../../hooks";

export function Question16({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question16Meta.id}
      title={question16Meta.title}
      definition={question16Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Currying</Bold> is a functional programming technique where a function that takes multiple arguments is transformed into a sequence of functions, each taking a <Bold>single argument</Bold>. Instead of taking all arguments at once, a curried function takes the first argument, returns a new function that takes the second argument, and so on until all arguments are provided.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding Currying
        </Title>

        <PlainText>
          Currying is like ordering a pizza step by step:
        </PlainText>

        <CardComponent variant="info" title="🍕 Analogy">
          <PlainText>
            • <Bold>Normal function:</Bold> "I want a large pepperoni pizza with extra cheese" (all at once)<br />
            • <Bold>Curried function:</Bold> First, "I want a pizza" → then "make it large" → then "add pepperoni" → then "add extra cheese" (step by step)
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// Normal function - takes all arguments at once
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried function - takes arguments one at a time
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// Using the curried function
const add1 = curriedAdd(1); // returns a function
const add2 = add1(2);       // returns a function
const result = add2(3);     // 6

// Or in one line
console.log(curriedAdd(1)(2)(3)); // 6

// ES6 Arrow function version (shorter)
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6`}
          language="javascript"
          title="currying-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> A curried function converts <InlineCode>f(a, b, c)</InlineCode> into <InlineCode>f(a)(b)(c)</InlineCode>.
        </Note>

        <CardComponent variant="success" title="✅ Why is it called Currying?">
          <PlainText>
            It's named after <Bold>Haskell Curry</Bold>, a mathematician who developed the concept. The name is a tribute to his work in combinatory logic.
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
          Advanced: Currying Patterns & Use Cases
        </Title>

        <PlainText>
          Currying is useful for <Bold>partial application</Bold> - fixing some arguments and creating specialized functions:
        </PlainText>

        <CodeComponent
          code={`// Real-world example: Discount calculator
// Normal function
function calculateDiscount(price, discount) {
  return price * (1 - discount / 100);
}
console.log(calculateDiscount(100, 10)); // 90

// Curried version
const curriedDiscount = price => discount => price * (1 - discount / 100);

// Create specialized discount functions
const hundredDollarDiscount = curriedDiscount(100);
console.log(hundredDollarDiscount(10)); // 90
console.log(hundredDollarDiscount(20)); // 80

// Create common discounts
const discount10 = curriedDiscount(100)(10);
const discount20 = curriedDiscount(100)(20);
console.log(discount10); // 90
console.log(discount20); // 80

// Real-world: API request builder
const apiRequest = method => url => headers => body => {
  return fetch(url, {
    method,
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
};

// Create specialized functions
const getRequest = apiRequest('GET');
const postRequest = apiRequest('POST');

// Create user endpoints
const getUsers = getRequest('/api/users');
const createUser = postRequest('/api/users');

// Use them
getUsers({ Authorization: 'Bearer token' })() // GET /api/users
createUser({ Authorization: 'Bearer token' })({ name: 'John' }) // POST /api/users`}
          language="javascript"
          title="currying-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Currying Benefits">
          <UnorderedList
            items={[
              <>✅ <Bold>Partial Application:</Bold> Fix some arguments, create specialized functions</>,
              <>✅ <Bold>Function Composition:</Bold> Chain functions together elegantly</>,
              <>✅ <Bold>Reusability:</Bold> Create reusable functions from more specific ones</>,
              <>✅ <Bold>Readability:</Bold> Makes code more declarative and clean</>,
              <>✅ <Bold>Testing:</Bold> Easier to test individual steps</>,
            ]}
          />
        </CardComponent>

        <Title level={4}>📊 Currying vs Partial Application</Title>

        <TableComponent
          headers={['Concept', 'Definition', 'Example']}
          rows={[
            ['Currying', 'Transforms f(a,b,c) → f(a)(b)(c)', 'f(a)(b)(c)'],
            ['Partial Application', 'Fixing some arguments of a function', 'f(a,b)(c) or f(a)(b,c)'],
          ]}
        />

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Currying and partial application are related but different. Currying transforms a function, while partial application calls a function with some arguments fixed.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Currying Techniques
        </Title>

        <PlainText>
          Deep dive into currying, automatic currying, and real-world applications:
        </PlainText>

        <CodeComponent
          code={`// 1. Automatic currying (converts any function to curried)
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

// Usage
function multiply(a, b, c) {
  return a * b * c;
}
const curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24

// 2. Function composition with currying
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const add = a => b => a + b;
const multiply = a => b => a * b;
const square = x => x * x;

const add5 = add(5);
const multiplyBy2 = multiply(2);

const transform = compose(
  square,
  multiplyBy2,
  add5
);
console.log(transform(10)); // (10 + 5) * 2 = 30, squared = 900

// 3. Logging with currying
const log = level => message => context => {
  console.log(\`[\${level.toUpperCase()}] \${message}\`, context);
  return context;
};

const errorLog = log('error');
const infoLog = log('info');

errorLog('Something went wrong')({ userId: 123 });
infoLog('User logged in')({ userId: 123 });

// 4. Validation with currying
const validate = (rule) => (value) => {
  return rule(value) ? { valid: true, value } : { valid: false, error: 'Invalid' };
};

const isEmail = (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
const isMinLength = (min) => (value) => value.length >= min;

const validateEmail = validate(isEmail);
const validateMinLength = validate(isMinLength(8));

console.log(validateEmail('test@example.com')); // { valid: true, value: 'test@example.com' }
console.log(validateMinLength('short')); // { valid: false, error: 'Invalid' }

// 5. Performance considerations
// Currying can have a slight performance overhead due to closures
// Use it for readability and maintainability, not for hot paths

// 6. Currying with rest parameters
const curryWithRest = (fn) => {
  return (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curryWithRest(fn)(...args, ...more);
  };
};

// 7. React Hooks with currying
const useApi = (endpoint) => (method) => (body) => {
  return useCallback(async () => {
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.json();
  }, [endpoint, method, body]);
};

// Usage in React component
const useUsersApi = useApi('/api/users');
const getUsers = useUsersApi('GET');
const createUser = useUsersApi('POST');`}
          language="javascript"
          title="expert-currying.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="⚡ Performance Considerations">
          <UnorderedList
            items={[
              <>Currying creates additional functions (closures) which use memory</>,
              <>Performance impact is minimal for most applications</>,
              <>Consider using currying for <Bold>readability</Bold> over raw performance</>,
              <>Avoid currying in performance-critical hot paths</>,
              <>Modern JavaScript engines optimize curried functions well</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use currying with <Bold>functional composition</Bold> for clean pipelines</>,
              <>Implement <Bold>automatic currying</Bold> for flexibility</>,
              <>Combine currying with <Bold>partial application</Bold> for maximum reusability</>,
              <>Use currying in <Bold>validation chains</Bold> and <Bold>data pipelines</Bold></>,
              <>Consider using libraries like <Bold>lodash/fp</Bold> or <Bold>Ramda</Bold> for production</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Currying is a powerful functional programming technique that enables <Bold>function composition</Bold>, <Bold>partial application</Bold>, and <Bold>clean, readable code</Bold>. Mastering currying allows you to write more <Bold>declarative</Bold> and <Bold>reusable</Bold> code.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> While currying is powerful, overusing it can lead to <Bold>performance overhead</Bold> and <Bold>code complexity</Bold>. Use it where it adds value (readability, reusability) rather than everywhere.
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
            <>Currying transforms <InlineCode>f(a, b, c)</InlineCode> into <InlineCode>f(a)(b)(c)</InlineCode></>,
            <>It enables <Bold>partial application</Bold> - fixing arguments one at a time</>,
            <>Currying is named after mathematician <Bold>Haskell Curry</Bold></>,
            <>Common use cases: <Bold>API builders</Bold>, <Bold>validators</Bold>, <Bold>event handlers</Bold></>,
            <>Works well with <Bold>function composition</Bold> and <Bold>functional programming</Bold></>,
            <>Consider performance implications for critical paths</>,
            <>Libraries like <Bold>lodash/fp</Bold> provide built-in curry utilities</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Start with simple currying for partial application, then explore function composition and pipelines. Currying is a gateway to <Bold>functional programming</Bold> in JavaScript.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Currying is about transforming functions to be more <Bold>flexible</Bold> and <Bold>composable</Bold>. It's a powerful tool in the functional programming toolkit!
      </Note>
    </QuestionWrapper>
  );
}