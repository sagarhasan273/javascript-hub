// data/questions/Question22.tsx
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
import { question22Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question22({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question22Meta.id}
      title={question22Meta.title}
      definition={question22Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The main differences between <Bold>let</Bold> and <Bold>var</Bold> are <Bold>scope</Bold>, <Bold>hoisting</Bold>, <Bold>redeclaration</Bold>, and how they behave in the <Bold>global scope</Bold>. <InlineCode>let</InlineCode> was introduced in ES6 to address the limitations and confusing behavior of <InlineCode>var</InlineCode>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: let vs var - The Basics
        </Title>

        <PlainText>
          Here are the key differences explained simply:
        </PlainText>

        <CardComponent variant="info" title="🎯 Key Differences">
          <UnorderedList
            items={[
              <>📦 <Bold>Scope:</Bold> <InlineCode>let</InlineCode> is block-scoped, <InlineCode>var</InlineCode> is function-scoped</>,
              <>⬆️ <Bold>Hoisting:</Bold> Both are hoisted, but <InlineCode>let</InlineCode> is in TDZ</>,
              <>🔄 <Bold>Redeclaration:</Bold> <InlineCode>let</InlineCode> cannot be redeclared, <InlineCode>var</InlineCode> can</>,
              <>🌍 <Bold>Global:</Bold> <InlineCode>let</InlineCode> doesn't attach to <InlineCode>window</InlineCode>, <InlineCode>var</InlineCode> does</>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>Simple Examples:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Scope difference
// var - function scoped
function exampleVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (accessible outside block)
}

// let - block scoped
function exampleLet() {
  if (true) {
    let y = 10;
  }
  console.log(y); // ReferenceError: y is not defined
}

// 2. Hoisting difference
// var - hoisted with undefined
console.log(a); // undefined
var a = 5;

// let - hoisted but in TDZ
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 5;

// 3. Redeclaration
var name = "John";
var name = "Jane"; // Works! (redeclaration allowed)

let city = "NYC";
let city = "LA"; // SyntaxError: Identifier 'city' has already been declared

// 4. Global scope
var globalVar = "I'm global";
console.log(window.globalVar); // "I'm global"

let globalLet = "I'm not global";
console.log(window.globalLet); // undefined`}
          language="javascript"
          title="let-vs-var.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> Always use <InlineCode>let</InlineCode> (or <InlineCode>const</InlineCode>) instead of <InlineCode>var</InlineCode> in modern JavaScript. It's safer and more predictable.
        </Note>

        <CardComponent variant="success" title="✅ When to Use Each">
          <UnorderedList
            items={[
              <>✅ Use <Bold>let</Bold> for variables that <Bold>change</Bold> value</>,
              <>✅ Use <Bold>const</Bold> for variables that <Bold>don't change</Bold></>,
              <>❌ Avoid <Bold>var</Bold> in modern code (legacy only)</>,
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
          Advanced: Deep Dive into Differences
        </Title>

        <PlainText>
          Understanding the nuances between <InlineCode>let</InlineCode> and <InlineCode>var</InlineCode>:
        </PlainText>

        <CodeComponent
          code={`// 1. Temporal Dead Zone (TDZ)
// var - no TDZ
console.log(x); // undefined
var x = 5;

// let - TDZ
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;

// 2. Block scope vs Function scope
// var - function scope (ignores blocks)
function testVar() {
  for (var i = 0; i < 3; i++) {
    var inner = i;
  }
  console.log(i); // 3 (accessible)
  console.log(inner); // 2 (accessible)
}

// let - block scope (respects blocks)
function testLet() {
  for (let i = 0; i < 3; i++) {
    let inner = i;
  }
  console.log(i); // ReferenceError
  console.log(inner); // ReferenceError
}

// 3. Redeclaration in different scopes
// var - can be redeclared in same scope
var count = 1;
var count = 2; // Works

// let - cannot be redeclared in same scope
let score = 1;
// let score = 2; // SyntaxError

// But let can be redeclared in different scopes
let value = 1;
{
  let value = 2; // Different scope, works!
  console.log(value); // 2
}
console.log(value); // 1

// 4. var in loops - closure issue
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 (all reference the same i)

// let in loops - correct closure behavior
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 (each has its own i)`}
          language="javascript"
          title="let-vs-var-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Comparison Table">
          <TableComponent
            headers={['Feature', 'let', 'var']}
            rows={[
              ['Scope', 'Block', 'Function'],
              ['Hoisting', 'TDZ (ReferenceError)', 'Yes (undefined)'],
              ['Redeclaration', '❌ No', '✅ Yes'],
              ['Global Property', '❌ No', '✅ Yes'],
              ['Temporal Dead Zone', '✅ Yes', '❌ No'],
              ['Loop Closure', '✅ Correct', '❌ Issues'],
              ['Browser Support', 'ES6+', 'All'],
              ['Use in Modern Code', '✅ Yes', '❌ Avoid'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> The <Bold>Temporal Dead Zone</Bold> is a major reason <InlineCode>let</InlineCode> is safer than <InlineCode>var</InlineCode>. It prevents using variables before they're declared.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Mistakes">
          <UnorderedList
            items={[
              <>Using <InlineCode>var</InlineCode> in modern code</>,
              <>Forgetting that <InlineCode>var</InlineCode> is function-scoped, not block-scoped</>,
              <>Not understanding TDZ with <InlineCode>let</InlineCode></>,
              <>Using <InlineCode>var</InlineCode> in loops (closure issues)</>,
              <>Redeclaring variables unintentionally with <InlineCode>var</InlineCode></>,
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
          Expert: Performance & Best Practices
        </Title>

        <PlainText>
          Expert-level understanding of <InlineCode>let</InlineCode> vs <InlineCode>var</InlineCode>:
        </PlainText>

        <CodeComponent
          code={`// 1. Performance comparison
// let is optimized by modern JavaScript engines
// In most cases, let and var have similar performance
// But let can be optimized better due to block scoping

// 2. Memory management
// var - function scope can keep variables alive longer
function exampleVar() {
  var bigArray = new Array(1000000);
  // bigArray stays in memory until function ends
}

// let - block scope can free memory sooner
function exampleLet() {
  if (true) {
    let bigArray = new Array(1000000);
    // bigArray is freed when block ends
  }
}

// 3. Using var in switch (avoid this)
var status = 'active';
switch(status) {
  case 'active':
    var x = 10; // var doesn't create block scope
    break;
  case 'inactive':
    console.log(x); // 10 (still accessible!)
    break;
}

// 4. Using let in switch (recommended)
let status2 = 'active';
switch(status2) {
  case 'active': {
    let x = 10; // let creates block scope
    break;
  }
  case 'inactive': {
    // console.log(x); // ReferenceError (correct!)
    break;
  }
}

// 5. Global scope behavior
// var in global scope creates window property
var global1 = 'test';
console.log(window.global1); // 'test'

// let in global scope does NOT create window property
let global2 = 'test';
console.log(window.global2); // undefined

// 6. Module scope
// In modules (ES6), both let and var are module-scoped
// but let is still preferred

// 7. const - the third option
// Use const by default, let when reassignment is needed
const API_URL = 'https://api.example.com';
let counter = 0;
var legacyCode = 'only use this in legacy code';`}
          language="javascript"
          title="let-vs-var-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Considerations">
          <UnorderedList
            items={[
              <>⚡ <Bold>Optimization:</Bold> <InlineCode>let</InlineCode> is better optimized by modern engines</>,
              <>🧠 <Bold>Memory:</Bold> <InlineCode>let</InlineCode> allows better memory management with block scope</>,
              <>🚀 <Bold>Speed:</Bold> Similar performance, but <InlineCode>let</InlineCode> can be slightly faster</>,
              <>📊 <Bold>Bundling:</Bold> <InlineCode>let</InlineCode> helps tree-shaking and dead code elimination</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>🚫 <Bold>Avoid var entirely</Bold> in modern JavaScript codebases</>,
              <>✅ Use <Bold>const by default</Bold>, <InlineCode>let</InlineCode> when reassignment is needed</>,
              <>📦 Use <Bold>block scope</Bold> to control variable lifetime</>,
              <>🔄 Understand <Bold>TDZ</Bold> to avoid common bugs</>,
              <>📚 Enable ESLint rules: <InlineCode>no-var</InlineCode>, <InlineCode>prefer-const</InlineCode></>,
              <>🎯 Use <Bold>let</Bold> in loops for correct closure behavior</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Migration Strategy">
          <PlainText component="div">
            1. <Bold>Start</Bold> by using <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> in new code<br />
            2. <Bold>Refactor</Bold> existing <InlineCode>var</InlineCode> to <InlineCode>let</InlineCode> when possible<br />
            3. <Bold>Analyze</Bold> if variables can be <InlineCode>const</InlineCode><br />
            4. <Bold>Enable</Bold> ESLint rules to enforce best practices<br />
            5. <Bold>Test</Bold> thoroughly after refactoring<br />
            6. <Bold>Educate</Bold> team members on the differences
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> represent the <Bold>evolution</Bold> of JavaScript towards a <Bold>safer, more predictable language</Bold>. Embracing them is essential for modern JavaScript development.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> The differences between <InlineCode>let</InlineCode> and <InlineCode>var</InlineCode> are not just syntactical - they represent a <Bold>fundamental shift</Bold> in how JavaScript handles scope and variable declarations.
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
            <><InlineCode>let</InlineCode> is <Bold>block-scoped</Bold>, <InlineCode>var</InlineCode> is <Bold>function-scoped</Bold></>,
            <><InlineCode>let</InlineCode> has <Bold>Temporal Dead Zone</Bold>, <InlineCode>var</InlineCode> is hoisted with <InlineCode>undefined</InlineCode></>,
            <><InlineCode>let</InlineCode> <Bold>cannot</Bold> be redeclared in the same scope, <InlineCode>var</InlineCode> can</>,
            <><InlineCode>let</InlineCode> does <Bold>not</Bold> attach to <InlineCode>window</InlineCode>, <InlineCode>var</InlineCode> does</>,
            <>Use <Bold>const</Bold> by default, <InlineCode>let</InlineCode> when reassignment is needed</>,
            <>Avoid <Bold>var</Bold> in modern JavaScript</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> In modern JavaScript, <Bold>never use var</Bold>. Use <InlineCode>const</InlineCode> for values that don't change, and <InlineCode>let</InlineCode> for values that do. Your code will be <Bold>safer</Bold> and <Bold>more predictable</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> are <Bold>not</Bold> just cosmetic changes - they fundamentally improve <Bold>code quality</Bold> and <Bold>developer experience</Bold>!
      </Note>
    </QuestionWrapper>
  );
}