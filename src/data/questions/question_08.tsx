// data/questions/Question08.tsx
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
import { question08Meta } from "./registry";
import { useLevel } from "../../context/LevelContext";

export function Question08({
  index = 0,
  isActive = false,
}: {
  index?: number;
  isActive?: boolean;
}) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question08Meta.id}
      title={question08Meta.title}
      definition={question08Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The <Bold>==</Bold> (equality) and <Bold>===</Bold> (strict equality)
        operators are used to compare values in JavaScript. The key difference
        is that <InlineCode>==</InlineCode> performs <Bold>type coercion</Bold>{" "}
        (converts values to the same type before comparison), while{" "}
        <InlineCode>===</InlineCode> does <Bold>not</Bold> perform type coercion
        (values must be of the same type to be considered equal).
      </PlainText>

      <PlainText>
        Understanding this difference is crucial for writing{" "}
        <Bold>bug-free</Bold> and <Bold>predictable</Bold> JavaScript code.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: "#10b981", mr: 1 }}>
            🌱
          </Box>
          Beginner: Understanding the Basics
        </Title>

        <PlainText>
          Think of <InlineCode>==</InlineCode> and <InlineCode>===</InlineCode>{" "}
          like this:
        </PlainText>

        <CardComponent variant="info" title="🎯 Simple Analogy">
          <PlainText>
            • <Bold>==</Bold> is like: "Are these roughly the same?" - It
            converts types before checking
            <br />• <Bold>===</Bold> is like: "Are these exactly the same?" - It
            checks type AND value
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Examples you'll encounter frequently:</Bold>
        </PlainText>

        <CodeComponent
          code={`// === - Strict Equality (Always use this!)
console.log(5 === 5);        // true (both are numbers)
console.log('hello' === 'hello'); // true (both are strings)
console.log(true === true);  // true (both are booleans)

// Different types = false
console.log(5 === '5');      // false (number vs string)
console.log(1 === true);     // false (number vs boolean)
console.log(0 === false);    // false (number vs boolean)

// == - Loose Equality (Be careful with this!)
console.log(5 == '5');       // true (converts string to number)
console.log(1 == true);      // true (converts boolean to number)
console.log(0 == false);     // true (converts boolean to number)
console.log(null == undefined); // true (special case)

// When to use ==
// Only use == when checking for null or undefined
const value = null;
if (value == null) {
  console.log('Value is null or undefined');
}`}
          language="javascript"
          title="basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Beginner Tip:</Bold> Always use <InlineCode>===</InlineCode>{" "}
          unless you have a specific reason to use <InlineCode>==</InlineCode>.
          This will save you from many bugs!
        </Note>

        <CardComponent variant="success" title="✅ Quick Rules for Beginners">
          <UnorderedList
            items={[
              <>
                Use <Bold>===</Bold> for all comparisons by default
              </>,
              <>
                Use <Bold>==</Bold> only when checking for{" "}
                <InlineCode>null</InlineCode> or{" "}
                <InlineCode>undefined</InlineCode>
              </>,
              <>
                Remember: <InlineCode>===</InlineCode> compares type AND value
              </>,
              <>
                Remember: <InlineCode>==</InlineCode> tries to convert types
                first
              </>,
            ]}
          />
        </CardComponent>

        <Note type="success" icon="🎯">
          <Bold>Practice:</Bold> Try to predict the output:
          <CodeComponent
            code={`console.log(10 === '10');  // ?
console.log(10 == '10');   // ?
console.log(false === 0);  // ?
console.log(false == 0);   // ?`}
            language="javascript"
            title="practice.js"
            defaultOpen={true}
            showTitle={false}
          />
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: "#f59e0b", mr: 1 }}>
            ⚡
          </Box>
          Advanced: Type Coercion & Common Pitfalls
        </Title>

        <PlainText>
          Understanding <Bold>type coercion</Bold> is key to mastering{" "}
          <InlineCode>==</InlineCode>. Here's how JavaScript converts types:
        </PlainText>

        <CardComponent variant="info" title="📋 Type Coercion Rules">
          <PlainText component="div">
            • <Bold>Number vs String:</Bold> String → Number
            <br />• <Bold>Boolean vs Any:</Bold> Boolean → Number (true=1,
            false=0)
            <br />• <Bold>Object vs Primitive:</Bold> Object → Primitive
            (valueOf() or toString())
            <br />• <Bold>Null vs Undefined:</Bold> Equal (special case)
            <br />• <Bold>NaN vs Any:</Bold> Always false
            <br />• <Bold>Objects:</Bold> Compared by reference (not content)
          </PlainText>
        </CardComponent>

        <TableComponent
          headers={["Feature", "== (Loose)", "=== (Strict)"]}
          rows={[
            ["Type Coercion", "✅ Yes", "❌ No"],
            ["Compares", "Values after conversion", "Values and types"],
            ["Performance", "Slower", "Faster"],
            ["Predictability", "Less predictable", "More predictable"],
            ["Best Practice", "Avoid when possible", "Always prefer"],
          ]}
        />

        <PlainText>
          <Bold>Common Pitfalls with ==</Bold>
        </PlainText>

        <CodeComponent
          code={`// Pitfall 1: Empty strings and numbers
console.log('' == 0);         // true (surprising!)
console.log('   ' == 0);      // true (whitespace converts to 0)
console.log('' == false);     // true

// Pitfall 2: Arrays and strings
console.log([] == '');        // true (empty array converts to '')
console.log(['hello'] == 'hello'); // true (array joins to string)
console.log([1,2] == '1,2');  // true

// Pitfall 3: Truthy/Falsy confusion
console.log('0' == false);    // true (both convert to 0)
console.log(' ' == false);    // true (space trims to '')
console.log('false' == false); // false (string is truthy)

// Pitfall 4: Object equality
console.log({} == {});        // false (different references)
console.log({} == '[object Object]'); // false (different refs)

// Pitfall 5: Null and undefined
console.log(null == 0);       // false (null only equals undefined)
console.log(undefined == 0);  // false

// Pitfall 6: Number vs Boolean
console.log(2 == true);       // false (2 is not 1)`}
          language="javascript"
          title="pitfalls.js"
          defaultOpen={true}
        />

        <CardComponent variant="warning" title="⚠️ When to Use == (Advanced)">
          <UnorderedList
            items={[
              <>
                Checking if a value is <InlineCode>null</InlineCode> or{" "}
                <InlineCode>undefined</InlineCode>:{" "}
                <InlineCode>value == null</InlineCode>
              </>,
              <>
                When you <Bold>intentionally</Bold> want type coercion
              </>,
              <>
                Working with <Bold>legacy code</Bold> (but be careful)
              </>,
              <>
                Quick checks where types are <Bold>already known</Bold>
              </>,
              <>
                Comparing <Bold>DOM properties</Bold> (sometimes return strings)
              </>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>Real-world Example: Form Validation</Bold>
        </PlainText>

        <CodeComponent
          code={`// Using == for null/undefined check
function validateInput(input) {
  // Check if input is null or undefined
  if (input == null) {
    return 'Input is required';
  }
  
  // Use === for everything else
  if (input === '') {
    return 'Input cannot be empty';
  }
  
  if (typeof input === 'number' && input === 0) {
    return 'Input cannot be zero';
  }
  
  return 'Valid input';
}

console.log(validateInput(null));      // 'Input is required'
console.log(validateInput(undefined)); // 'Input is required'
console.log(validateInput(''));        // 'Input cannot be empty'
console.log(validateInput(0));         // 'Input cannot be zero'
console.log(validateInput('hello'));   // 'Valid input'`}
          language="javascript"
          title="validation.js"
          defaultOpen={false}
        />

        <Note type="info" icon="💡">
          <Bold>Advanced Tip:</Bold> <InlineCode>value == null</InlineCode> is a
          common pattern to check for both <InlineCode>null</InlineCode> and{" "}
          <InlineCode>undefined</InlineCode>. It's the only recommended use of{" "}
          <InlineCode>==</InlineCode> in modern code.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: "#ef4444", mr: 1 }}>
            🚀
          </Box>
          Expert: Deep Dive & Advanced Patterns
        </Title>

        <PlainText>
          Understanding the <Bold>Abstract Equality Comparison Algorithm</Bold>{" "}
          and <Bold>SameValueZero</Bold> algorithm used in modern JavaScript.
        </PlainText>

        <Title level={4}>
          🔍 The Abstract Equality Comparison Algorithm (==)
        </Title>

        <CodeComponent
          code={`// How == actually works (simplified):
// 1. If types are same → use ===
// 2. If null vs undefined → true
// 3. If number vs string → convert string to number
// 4. If boolean → convert boolean to number
// 5. If object vs primitive → convert object to primitive

// Examples:
console.log(null == undefined); // true (special case)
console.log(5 == '5'); // string → number
console.log(true == 1); // boolean → number
console.log([] == ''); // object → primitive ([] → '')
console.log([1] == 1); // object → primitive ('1' → 1)

// The complete algorithm:
function abstractEquality(x, y) {
  if (x === y) return true;
  if (x === null && y === undefined) return true;
  if (x === undefined && y === null) return true;
  if (typeof x === 'number' && typeof y === 'string') 
    return x === Number(y);
  if (typeof x === 'string' && typeof y === 'number') 
    return Number(x) === y;
  if (typeof x === 'boolean') 
    return abstractEquality(Number(x), y);
  if (typeof y === 'boolean') 
    return abstractEquality(x, Number(y));
  if (typeof x === 'object' && x !== null) 
    return abstractEquality(x.toString(), y);
  if (typeof y === 'object' && y !== null) 
    return abstractEquality(x, y.toString());
  return false;
}`}
          language="javascript"
          title="abstract-equality.js"
          defaultOpen={false}
        />

        <Title level={4}>🎯 Object.is() - The Modern Solution</Title>

        <CodeComponent
          code={`// Object.is() - SameValue comparison
// Unlike ===, Object.is() handles special cases differently

// NaN comparisons
console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true ✅

// 0 and -0
console.log(0 === -0);              // true
console.log(Object.is(0, -0));      // false ✅ (distinguishes)

// Regular values
console.log(Object.is(5, 5));       // true
console.log(Object.is(5, '5'));     // false

// When to use Object.is()
// 1. When you need to check for NaN
// 2. When you need to distinguish between 0 and -0
// 3. In React's useState for reference equality checks

// Example: Custom equality checker
function safeEquality(a, b) {
  // First check if they're exactly equal
  if (Object.is(a, b)) return true;
  
  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => safeEquality(item, b[index]));
  }
  
  // Handle objects
  if (typeof a === 'object' && a !== null && 
      typeof b === 'object' && b !== null) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => safeEquality(a[key], b[key]));
  }
  
  return false;
}

// Usage
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(safeEquality(obj1, obj2)); // true (deep equality)`}
          language="javascript"
          title="object-is.js"
          defaultOpen={false}
        />

        <Title level={4}>⚡ Performance & Best Practices</Title>

        <CardComponent variant="info" title="Performance Considerations">
          <UnorderedList
            items={[
              <>
                <InlineCode>===</InlineCode> is <Bold>faster</Bold> than{" "}
                <InlineCode>==</InlineCode> (no type conversion overhead)
              </>,
              <>
                Use <InlineCode>Object.is()</InlineCode> for <Bold>NaN</Bold>{" "}
                and <Bold>-0</Bold> checks
              </>,
              <>Avoid deep equality checks in hot code paths</>,
              <>
                Use <Bold>memoization</Bold> for expensive equality checks
              </>,
              <>
                In React, use <InlineCode>useMemo</InlineCode> and{" "}
                <InlineCode>useCallback</InlineCode> for reference stability
              </>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              "Use ESLint rule <InlineCode>eqeqeq</InlineCode> to enforce === usage",
              "For deep equality, use libraries like <InlineCode>lodash.isEqual</InlineCode> or <InlineCode>fast-deep-equal</InlineCode>",
              "In TypeScript, always use === to avoid type coercion issues",
              "Use <InlineCode>Object.is()</InlineCode> for React state updates when checking for changes",
              "Remember: <InlineCode>==</InlineCode> can be useful for checking <InlineCode>null</InlineCode> or <InlineCode>undefined</InlineCode> in one line",
            ]}
          />
        </CardComponent>

        <Title level={4}>🔬 Advanced Comparison Patterns</Title>

        <CodeComponent
          code={`// 1. Nullish coalescing with ==
const value = getData();
// Check for null OR undefined
if (value == null) {
  console.log('No data');
}

// 2. Type-safe equality with TypeScript
function strictEquals<T>(a: T, b: T): boolean {
  return a === b;
}

// 3. Custom equality with validation
function validateAndCompare(a: unknown, b: unknown): boolean {
  // First validate types
  if (typeof a !== typeof b) return false;
  
  // Then compare using Object.is
  return Object.is(a, b);
}

// 4. React useMemo with custom equality
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(deps);
}, deps);

// 5. Functional equality with curry
const equals = (a: unknown) => (b: unknown) => a === b;
const isFive = equals(5);
console.log(isFive(5));   // true
console.log(isFive('5')); // false`}
          language="javascript"
          title="advanced-patterns.js"
          defaultOpen={false}
        />

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The choice between{" "}
          <InlineCode>==</InlineCode> and <InlineCode>===</InlineCode> is about{" "}
          <Bold>intent</Bold>. Use <InlineCode>===</InlineCode> to show you care
          about both type and value. Use <InlineCode>==</InlineCode> only when
          you <Bold>intentionally</Bold> want type coercion, like checking for{" "}
          <InlineCode>null</InlineCode> or <InlineCode>undefined</InlineCode>.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> Never rely on <InlineCode>==</InlineCode>{" "}
          for complex type coercion. It makes code <Bold>harder to read</Bold>,{" "}
          <Bold>harder to debug</Bold>, and <Bold>more error-prone</Bold>. The
          small convenience isn't worth the potential bugs.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* SUMMARY - Shown at all levels */}
      {/* ============================================ */}
      <Gap size={2} />

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
              <InlineCode>==</InlineCode> performs <Bold>type coercion</Bold>{" "}
              before comparison
            </>,
            <>
              <InlineCode>===</InlineCode> compares{" "}
              <Bold>both type and value</Bold> without coercion
            </>,
            <>
              Always prefer <InlineCode>===</InlineCode> for{" "}
              <Bold>predictable</Bold> and <Bold>bug-free</Bold> code
            </>,
            <>
              Use <InlineCode>== null</InlineCode> as a shorthand for{" "}
              <InlineCode>null</InlineCode> or{" "}
              <InlineCode>undefined</InlineCode> check
            </>,
            <>
              <InlineCode>NaN</InlineCode> is never equal to itself (use{" "}
              <InlineCode>isNaN()</InlineCode> or{" "}
              <InlineCode>Number.isNaN()</InlineCode>)
            </>,
            <>
              Objects are compared by <Bold>reference</Bold>, not content (use
              deep equality for content)
            </>,
            <>
              Use <InlineCode>Object.is()</InlineCode> for{" "}
              <InlineCode>NaN</InlineCode> and <InlineCode>-0</InlineCode>{" "}
              comparisons
            </>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Always default to <InlineCode>===</InlineCode>{" "}
        and only use <InlineCode>==</InlineCode> when you{" "}
        <Bold>intentionally</Bold> want type coercion, like checking for{" "}
        <InlineCode>null</InlineCode> or <InlineCode>undefined</InlineCode>.
        This will save you from countless bugs!
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> <InlineCode>===</InlineCode> is your{" "}
        <Bold>friend</Bold> - it's safe, predictable, and will save you from
        many bugs. Use <InlineCode>==</InlineCode> only when you{" "}
        <Bold>know</Bold> what you're doing!
      </Note>
    </QuestionWrapper>
  );
}
