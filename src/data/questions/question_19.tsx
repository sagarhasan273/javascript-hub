// data/questions/Question19.tsx
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
import { question19Meta } from "./registry";
import { useLevel } from "../../hooks";

export function Question19({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question19Meta.id}
      title={question19Meta.title}
      definition={question19Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The <Bold>let</Bold> keyword was introduced in ES6 (2015) to declare <Bold>block-scoped</Bold> variables. It was designed to address the limitations of <InlineCode>var</InlineCode> and provide a more predictable and safer way to declare variables.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is `let`?
        </Title>

        <PlainText>
          <InlineCode>let</InlineCode> is a way to declare variables in JavaScript. Here's what makes it special:
        </PlainText>

        <CardComponent variant="info" title="🎯 Key Features of `let`">
          <UnorderedList
            items={[
              <>📦 <Bold>Block Scoped:</Bold> Only accessible inside the block it's declared in</>,
              <>🔄 <Bold>No Hoisting:</Bold> Cannot be used before declaration (temporal dead zone)</>,
              <>🔄 <Bold>Reassignable:</Bold> Can be updated after declaration</>,
              <>🚫 <Bold>No Re-declaration:</Bold> Cannot be declared again in the same scope</>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>Basic Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Block Scope
if (true) {
  let x = 10;
  console.log(x); // 10
}
console.log(x); // ReferenceError: x is not defined (outside block)

// 2. No Hoisting
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;

// 3. Reassignable
let count = 0;
count = 1; // Works!
console.log(count); // 1

// 4. No Re-declaration
let name = "John";
let name = "Jane"; // SyntaxError: Identifier 'name' has already been declared`}
          language="javascript"
          title="let-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> Use <InlineCode>let</InlineCode> when you need to reassign a variable. It's safer than <InlineCode>var</InlineCode> and more predictable.
        </Note>

        <CardComponent variant="success" title="✅ When to Use `let`">
          <UnorderedList
            items={[
              <>When you need to <Bold>reassign</Bold> the variable</>,
              <>In <Bold>loops</Bold> (for, while, for-of, for-in)</>,
              <>When you want <Bold>block scope</Bold> protection</>,
              <>When you want to avoid <Bold>hoisting</Bold> issues</>,
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
          Advanced: `let` in Practice
        </Title>

        <PlainText>
          Understanding <InlineCode>let</InlineCode> in depth helps write better code:
        </PlainText>

        <CodeComponent
          code={`// 1. Temporal Dead Zone (TDZ)
// Variables declared with let exist in the TDZ from the start of the block
// until the declaration is encountered

{
  // TDZ starts
  // console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 10; // TDZ ends
  console.log(x); // 10
}

// 2. Block Scope - Different block types
// if block
if (true) {
  let a = 1;
  console.log(a); // 1
}
// console.log(a); // ReferenceError

// for loop
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
// console.log(i); // ReferenceError

// while loop
let j = 0;
while (j < 3) {
  let j = 10; // Different variable (shadowing)
  console.log(j); // 10
  j++;
}
console.log(j); // 3 (original)

// 3. Reassignment vs Re-declaration
let count = 0;
count = 1; // Reassignment (allowed)
// let count = 2; // Re-declaration (error)

// 4. let in switch statements
let x = 1;
switch(x) {
  case 1:
    let y = 10;
    console.log(y); // 10
    break;
  case 2:
    // console.log(y); // ReferenceError (different scope)
    break;
}

// 5. let with closures
function createFunctions() {
  let functions = [];
  for (let i = 0; i < 3; i++) {
    functions.push(() => console.log(i));
  }
  return functions;
}
const fns = createFunctions();
fns[0](); // 0
fns[1](); // 1
fns[2](); // 2
// With var, all would log 3!`}
          language="javascript"
          title="let-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 let vs var vs const">
          <TableComponent
            headers={['Feature', 'let', 'var', 'const']}
            rows={[
              ['Scope', 'Block', 'Function', 'Block'],
              ['Hoisting', 'TDZ', 'Yes (undefined)', 'TDZ'],
              ['Reassignable', '✅ Yes', '✅ Yes', '❌ No'],
              ['Re-declarable', '❌ No', '✅ Yes', '❌ No'],
              ['Global Property', '❌ No', '✅ Yes', '❌ No'],
              ['Use Case', 'Mutable values', 'Avoid (legacy)', 'Immutable values'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>let</InlineCode> variables are <Bold>not</Bold> added as properties to the global object (<InlineCode>window</InlineCode>), unlike <InlineCode>var</InlineCode>. This prevents accidental global pollution.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Mistakes with `let`">
          <UnorderedList
            items={[
              <>Trying to access before declaration (TDZ error)</>,
              <>Using <InlineCode>let</InlineCode> in the global scope (use <InlineCode>const</InlineCode> instead)</>,
              <>Forgetting that <InlineCode>let</InlineCode> is block-scoped, not function-scoped</>,
              <>Using <InlineCode>let</InlineCode> when you should use <InlineCode>const</InlineCode></>,
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
          Expert: `let` Deep Dive
        </Title>

        <PlainText>
          Advanced patterns and considerations with <InlineCode>let</InlineCode>:
        </PlainText>

        <CodeComponent
          code={`// 1. let in loops - closure behavior
// Each iteration creates a new binding for i
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 (with var it would be 3, 3, 3)

// 2. let with IIFE (Immediately Invoked Function Expression)
// IIFE was used to create block scope before let
(function() {
  var x = 10; // function scope
})();

// Now we can use let
{
  let x = 10; // block scope
}

// 3. let in the global scope
let globalLet = 'global';
console.log(window.globalLet); // undefined (not on window)

// 4. Temporal Dead Zone - more examples
let a = 1;
{
  // TDZ starts
  // console.log(a); // ReferenceError (not the outer a)
  let a = 2; // TDZ ends
  console.log(a); // 2
}
console.log(a); // 1 (outer variable)

// 5. let with destructuring
let [x, y] = [1, 2];
let { name, age } = { name: 'John', age: 30 };

// 6. let with computed property names
let propName = 'dynamic';
let obj = {
  [propName]: 'value'
};

// 7. let in class fields
class MyClass {
  static count = 0; // Works with let? No, class fields use different syntax
  #privateField = 'private'; // Private fields use # syntax
}

// 8. Performance considerations
// let is optimized by modern JavaScript engines
// It's slightly faster than var in some cases
// Use let for mutable variables, const for immutable ones`}
          language="javascript"
          title="let-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Considerations">
          <UnorderedList
            items={[
              <>⚡ <Bold>Performance:</Bold> <InlineCode>let</InlineCode> is optimized by modern JS engines</>,
              <>📈 <Bold>Memory:</Bold> Block scope allows better memory management</>,
              <>🚀 <Bold>Optimization:</Bold> Engines can optimize block-scoped variables better</>,
              <>📊 <Bold>Benchmark:</Bold> <InlineCode>let</InlineCode> is often as fast or faster than <InlineCode>var</InlineCode></>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <InlineCode>let</InlineCode> for variables that <Bold>change</Bold></>,
              <>Use <InlineCode>const</InlineCode> for variables that <Bold>don't change</Bold></>,
              <>Avoid <InlineCode>var</InlineCode> in modern code (legacy only)</>,
              <>Use <InlineCode>let</InlineCode> in <Bold>loops</Bold> for correct closure behavior</>,
              <>Understand <Bold>Temporal Dead Zone</Bold> to avoid bugs</>,
              <>Use <Bold>block scope</Bold> to encapsulate variables</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> <InlineCode>let</InlineCode> is the <Bold>modern replacement</Bold> for <InlineCode>var</InlineCode>. It provides <Bold>block scoping</Bold>, eliminates <Bold>hoisting issues</Bold>, and makes JavaScript code more <Bold>predictable</Bold> and <Bold>safe</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> <InlineCode>let</InlineCode> is the <Bold>default choice</Bold> for mutable variables in modern JavaScript. Use it over <InlineCode>var</InlineCode> for safer, more maintainable code.
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
            <><InlineCode>let</InlineCode> declares <Bold>block-scoped</Bold> variables</>,
            <>Variables are subject to <Bold>Temporal Dead Zone</Bold> (TDZ)</>,
            <>They <Bold>cannot</Bold> be re-declared in the same scope</>,
            <>They <Bold>can</Bold> be reassigned</>,
            <>They are <Bold>not</Bold> attached to the global object</>,
            <>Use <InlineCode>let</InlineCode> for variables that <Bold>change</Bold></>,
            <>Use <InlineCode>const</InlineCode> for variables that <Bold>don't change</Bold></>,
            <>Avoid <InlineCode>var</InlineCode> in modern code</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> In modern JavaScript, <Bold>always</Bold> use <InlineCode>let</InlineCode> or <InlineCode>const</InlineCode>. <InlineCode>var</InlineCode> should only be used in legacy code or specific edge cases.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> <InlineCode>let</InlineCode> makes JavaScript more <Bold>predictable</Bold> and <Bold>safer</Bold>. It's one of the most important improvements in ES6!
      </Note>
    </QuestionWrapper>
  );
}