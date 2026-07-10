// data/questions/Question23.tsx
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
import { question23Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question23({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question23Meta.id}
      title={question23Meta.title}
      definition={question23Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The <Bold>Temporal Dead Zone</Bold> (TDZ) is a behavior in JavaScript that occurs when you try to access a variable declared with <InlineCode>let</InlineCode> or <InlineCode>const</InlineCode> before its declaration. During this period, the variable exists in the scope but <Bold>cannot be accessed</Bold>, and any attempt to do so will throw a <InlineCode>ReferenceError</InlineCode>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is the Temporal Dead Zone?
        </Title>

        <PlainText>
          Think of the TDZ like a <Bold>"waiting room"</Bold> for variables:
        </PlainText>

        <CardComponent variant="info" title="🚪 Analogy">
          <PlainText>
            Imagine you're at a doctor's office. You're in the waiting room (the TDZ) - you're there, but you can't see the doctor (access the variable) until you're called into the examination room (the declaration line).
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Simple Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// ❌ This will cause a ReferenceError
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

// ✅ This works - variable is declared before use
let y = 10;
console.log(y); // 10

// The TDZ starts at the beginning of the block
// and ends when the declaration is reached

{
  // TDZ starts for 'z'
  // console.log(z); // ReferenceError (in TDZ)
  let z = 15; // TDZ ends for 'z'
  console.log(z); // 15 (accessible)
}`}
          language="javascript"
          title="tdz-basics.js"
          defaultOpen={true}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> variables are <Bold>hoisted</Bold> but <Bold>not initialized</Bold>. They exist in the TDZ until the declaration is reached.
        </Note>

        <CardComponent variant="success" title="✅ var vs let/const Hoisting">
          <PlainText component="div">
            • <Bold>var:</Bold> Hoisted and initialized with <InlineCode>undefined</InlineCode> (no TDZ)<br />
            • <Bold>let/const:</Bold> Hoisted but <Bold>not initialized</Bold> (has TDZ)<br />
            • <Bold>Result:</Bold> Accessing <InlineCode>var</InlineCode> before declaration gives <InlineCode>undefined</InlineCode>, but <InlineCode>let</InlineCode> gives a ReferenceError
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
          Advanced: Understanding the TDZ
        </Title>

        <PlainText>
          Deep dive into how the Temporal Dead Zone works:
        </PlainText>

        <CodeComponent
          code={`// 1. TDZ with block scope
{
  // TDZ for 'a' starts
  console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 10; // TDZ ends
  console.log(a); // 10
}

// 2. TDZ with typeof operator
console.log(typeof x); // ReferenceError (in TDZ)
let x = 5;

// 3. TDZ with function parameters
function example(y = x) {
  // TDZ for 'x' starts
  let x = 10; // TDZ ends
  console.log(y); // ReferenceError: Cannot access 'x' before initialization
}

// 4. TDZ with nested scopes
let a = 1;
{
  // This is a different 'a' in TDZ
  console.log(a); // ReferenceError (TDZ for inner 'a')
  let a = 2;
  console.log(a); // 2
}

// 5. TDZ with const
console.log(b); // ReferenceError (TDZ)
const b = 5;

// 6. TDZ with class declarations
const obj = new MyClass(); // ReferenceError (TDZ for class)
class MyClass {
  constructor() {
    this.name = 'test';
  }
}

// 7. TDZ with default parameters
function test(value = defaultValue) {
  let defaultValue = 'hello'; // TDZ error
}

// 8. TDZ in switch statements
switch (true) {
  case true:
    console.log(temp); // ReferenceError (TDZ)
    let temp = 'test';
    break;
}`}
          language="javascript"
          title="tdz-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 TDZ Behavior Comparison">
          <TableComponent
            headers={['Feature', 'var', 'let', 'const']}
            rows={[
              ['Hoisted', '✅ Yes', '✅ Yes', '✅ Yes'],
              ['Initialized', '✅ Yes (undefined)', '❌ No', '❌ No'],
              ['TDZ', '❌ No', '✅ Yes', '✅ Yes'],
              ['Access before declaration', 'undefined', 'ReferenceError', 'ReferenceError'],
              ['Block-scoped', '❌ No', '✅ Yes', '✅ Yes'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> The TDZ is a <Bold>feature</Bold>, not a bug! It helps catch errors by preventing the use of variables before they're properly initialized.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common TDZ Mistakes">
          <UnorderedList
            items={[
              <>Accessing <InlineCode>let</InlineCode> or <InlineCode>const</InlineCode> before declaration</>,
              <>Using <InlineCode>typeof</InlineCode> on a variable in TDZ</>,
              <>Accessing a variable in a nested scope that shadows an outer variable</>,
              <>Using default parameters that reference variables in TDZ</>,
              <>Accessing class declarations before they're defined</>,
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
          Expert: TDZ Under the Hood
        </Title>

        <PlainText>
          Advanced understanding of the Temporal Dead Zone:
        </PlainText>

        <CodeComponent
          code={`// 1. How TDZ works internally
// When JavaScript enters a scope:
// 1. It scans for all let/const declarations
// 2. Creates bindings for them
// 3. Places them in TDZ
// 4. At declaration line, initializes them
// 5. Removes them from TDZ

// 2. TDZ with nested functions
function outer() {
  console.log(inner); // ReferenceError (TDZ)
  let inner = 'hello';
  
  function innerFunction() {
    console.log(inner); // 'hello'
  }
  innerFunction();
}

// 3. TDZ and closures
function createFunction() {
  // TDZ for 'message' starts
  // console.log(message); // ReferenceError
  
  return function() {
    console.log(message); // ReferenceError if called before declaration
  };
  
  let message = 'hello'; // TDZ ends
}

const fn = createFunction();
fn(); // ReferenceError: 'message' is in TDZ

// 4. TDZ and loops
for (let i = 0; i < 3; i++) {
  // Each iteration has its own TDZ for 'i'
  // But 'i' is already initialized
  setTimeout(() => console.log(i), 100);
}

// 5. TDZ with destructuring
let { name } = person; // ReferenceError (person in TDZ)
let person = { name: 'John' };

// 6. TDZ and modules (ES6)
// In modules, variables are in TDZ until the module is fully evaluated
// This prevents circular dependency issues

// 7. TDZ and eval
// eval can break TDZ behavior (avoid using eval)

// 8. Why TDZ exists
// - Prevents bugs from using variables before initialization
// - Makes code more predictable
// - Encourages declaring variables at the top of their scope
// - Follows the principle of "declare before use"`}
          language="javascript"
          title="tdz-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Why TDZ Was Introduced">
          <PlainText component="div">
            • <Bold>Prevent Bugs:</Bold> Stops using variables before they're initialized<br />
            • <Bold>Predictable Code:</Bold> Makes code behavior more consistent<br />
            • <Bold>Better Design:</Bold> Encourages declaring variables at the top of their scope<br />
            • <Bold>ES6 Improvement:</Bold> Fixes the confusing behavior of <InlineCode>var</InlineCode><br />
            • <Bold>Type Safety:</Bold> Helps catch errors at compile time in TypeScript
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Always declare <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> variables at the <Bold>top</Bold> of their scope</>,
              <>Avoid using <InlineCode>typeof</InlineCode> on variables in TDZ</>,
              <>Use <Bold>strict mode</Bold> to enforce TDZ behavior</>,
              <>Understand that TDZ exists for <Bold>your protection</Bold></>,
              <>Use <Bold>ESLint</Bold> rules to catch TDZ errors early</>,
              <>In TypeScript, TDZ is enforced at compile time</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Best Practices">
          <PlainText component="div">
            • <Bold>Declare at Top:</Bold> Always declare variables at the top of their scope<br />
            • <Bold>Use const:</Bold> Use <InlineCode>const</InlineCode> by default, <InlineCode>let</InlineCode> when needed<br />
            • <Bold>Avoid TDZ:</Bold> Don't access variables before declaration<br />
            • <Bold>Be Explicit:</Bold> Initialize variables when declaring them<br />
            • <Bold>Use Linters:</Bold> Enable rules that catch TDZ issues
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The Temporal Dead Zone is a <Bold>deliberate design choice</Bold> in JavaScript to make code <Bold>safer</Bold> and <Bold>more predictable</Bold>. It's one of the key improvements that <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> bring over <InlineCode>var</InlineCode>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> The TDZ is your <Bold>friend</Bold>, not your enemy! It helps you write <Bold>better code</Bold> by catching errors early and encouraging <Bold>good programming practices</Bold>.
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
            <>The TDZ is the period between entering a scope and the declaration of a variable</>,
            <>It applies to <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode>, <Bold>not</Bold> <InlineCode>var</InlineCode></>,
            <>Accessing a variable in the TDZ throws a <Bold>ReferenceError</Bold></>,
            <>The TDZ <Bold>prevents bugs</Bold> from using variables before initialization</>,
            <>Variables are <Bold>hoisted</Bold> but <Bold>not initialized</Bold> in the TDZ</>,
            <>Always declare variables at the <Bold>top of their scope</Bold></>,
            <>The TDZ is a <Bold>feature</Bold> that makes JavaScript safer</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> If you get a ReferenceError about accessing a variable before initialization, you've hit the <Bold>Temporal Dead Zone</Bold>. Move the declaration to the top of the scope to fix it.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> The Temporal Dead Zone is <Bold>not</Bold> a bug - it's a <Bold>safety feature</Bold> that helps you write <Bold>better, more reliable JavaScript code</Bold>!
      </Note>
    </QuestionWrapper>
  );
}