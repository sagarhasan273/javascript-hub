// data/questions/Question31.tsx
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
import { question31Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question31({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question31Meta.id}
      title={question31Meta.title}
      definition={question31Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Scope</Bold> in JavaScript defines the <Bold>visibility</Bold> and <Bold>accessibility</Bold> of variables, functions, and objects in different parts of your code. It determines where variables can be accessed or referenced.
      </PlainText>

      <PlainText>
        JavaScript has <Bold>three types of scope</Bold>: <Bold>Global Scope</Bold>, <Bold>Function Scope</Bold>, and <Bold>Block Scope</Bold> (introduced with ES6). Understanding scope is crucial for writing <Bold>bug-free</Bold> and <Bold>maintainable</Bold> code.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is Scope?
        </Title>

        <PlainText>
          Think of scope like <Bold>rooms in a house</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🏠 Analogy">
          <PlainText>
            Imagine a house with different rooms. The living room (global scope) is accessible to everyone. Each bedroom (function scope) has items that are only accessible inside that room. The bathroom (block scope) has items that are only accessible inside that specific area.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Types of Scope:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Global Scope - Accessible everywhere
const globalVar = 'I am global';

function example() {
  console.log(globalVar); // Accessible inside function
}

console.log(globalVar); // Accessible globally

// 2. Function Scope - Accessible only inside the function
function myFunction() {
  const functionVar = 'I am function scoped';
  console.log(functionVar); // Works
}
// console.log(functionVar); // ReferenceError

// 3. Block Scope - Accessible only inside the block
if (true) {
  let blockVar = 'I am block scoped';
  const blockConst = 'I am also block scoped';
  console.log(blockVar); // Works
}
// console.log(blockVar); // ReferenceError

// 4. Lexical Scope - Inner functions have access to outer variables
function outer() {
  const outerVar = 'I am outer';
  
  function inner() {
    console.log(outerVar); // Accessible (lexical scoping)
  }
  
  inner();
}
outer();`}
          language="javascript"
          title="scope-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Scope determines <Bold>where</Bold> variables can be accessed. <Bold>let</Bold> and <Bold>const</Bold> are block-scoped, while <Bold>var</Bold> is function-scoped.
        </Note>

        <CardComponent variant="success" title="✅ Scope Types Summary">
          <PlainText component="div">
            • <Bold>Global Scope:</Bold> Variables declared outside any function<br />
            • <Bold>Function Scope:</Bold> Variables declared inside a function<br />
            • <Bold>Block Scope:</Bold> Variables declared inside <InlineCode>'{}'</InlineCode><br />
            • <Bold>Lexical Scope:</Bold> Inner functions can access outer variables
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
          Advanced: Scope in Depth
        </Title>

        <PlainText>
          Deep dive into scope and its implications:
        </PlainText>

        <CodeComponent
          code={`// 1. Scope Chain
const global = 'global';

function outer() {
  const outerVar = 'outer';
  
  function inner() {
    const innerVar = 'inner';
    console.log(global); // Found in global scope
    console.log(outerVar); // Found in outer scope
    console.log(innerVar); // Found in inner scope
  }
  
  inner();
}
outer();

// 2. Shadowing - Inner scope shadows outer scope
const value = 'outer';

function example() {
  const value = 'inner'; // Shadows the outer variable
  console.log(value); // 'inner'
}
example();
console.log(value); // 'outer'

// 3. var vs let/const scope
function varVsLet() {
  if (true) {
    var varVariable = 'I am var';
    let letVariable = 'I am let';
  }
  console.log(varVariable); // Works (function scoped)
  // console.log(letVariable); // ReferenceError (block scoped)
}
varVsLet();

// 4. Scope in loops
for (var i = 0; i < 3; i++) {
  // var is function-scoped
}
console.log(i); // 3

for (let j = 0; j < 3; j++) {
  // let is block-scoped
}
// console.log(j); // ReferenceError

// 5. Module Scope
// Each module has its own scope
// Variables in a module are not global
export const moduleVar = 'I am module scoped';

// 6. Strict mode and scope
'use strict';
// In strict mode, variables must be declared
// x = 5; // ReferenceError in strict mode`}
          language="javascript"
          title="scope-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Scope Comparison">
          <TableComponent
            headers={['Scope Type', 'var', 'let', 'const']}
            rows={[
              ['Global', '✅ Yes', '✅ Yes', '✅ Yes'],
              ['Function', '✅ Yes', '✅ Yes', '✅ Yes'],
              ['Block', '❌ No', '✅ Yes', '✅ Yes'],
              ['Hoisting', '✅ Yes (undefined)', 'TDZ', 'TDZ'],
              ['Re-declaration', '✅ Yes', '❌ No', '❌ No'],
              ['Reassignment', '✅ Yes', '✅ Yes', '❌ No'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>var</InlineCode> has <Bold>function scope</Bold> and ignores block scope. <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> have <Bold>block scope</Bold>.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Scope Mistakes">
          <UnorderedList
            items={[
              <>Using <InlineCode>var</InlineCode> in loops expecting block scope</>,
              <>Accidentally creating global variables (missing <InlineCode>var</InlineCode>/<InlineCode>let</InlineCode>/<InlineCode>const</InlineCode>)</>,
              <>Shadowing variables unintentionally</>,
              <>Assuming <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> are function-scoped</>,
              <>Not understanding lexical scoping</>,
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
          Expert: Scope Under the Hood
        </Title>

        <PlainText>
          Expert-level understanding of scope:
        </PlainText>

        <CodeComponent
          code={`// 1. Lexical Environment
// When JavaScript executes code, it creates lexical environments
// Each environment has a reference to its outer environment

function createLexicalScope() {
  let x = 10;
  
  function inner() {
    let y = 20;
    console.log(x + y); // Lexical environment chain
  }
  
  return inner;
}

// 2. Closure and Scope
function createClosure() {
  const privateVar = 'I am private';
  
  return {
    getPrivate: function() {
      return privateVar; // Closure maintains scope
    }
  };
}

const closure = createClosure();
console.log(closure.getPrivate()); // 'I am private'

// 3. Dynamic Scope (eval and with)
// Avoid these - they create dynamic scope
function dynamicScope() {
  const x = 5;
  eval('console.log(x)'); // 5
  // with (obj) { // Avoid using with
  // }
}

// 4. Module Pattern with Scope
const Module = (function() {
  // Private scope
  let privateVar = 'private';
  
  return {
    publicMethod: function() {
      return privateVar;
    },
    setPrivate: function(value) {
      privateVar = value;
    }
  };
})();

console.log(Module.publicMethod()); // 'private'

// 5. Scope and Performance
// Variable lookup in scope chain has performance implications
// Deeper scope chains = slower lookups
function optimizeScope() {
  const localVar = 'local'; // Local lookup is fastest
  
  function inner() {
    const innerVar = 'inner';
    // Lookup: innerVar -> localVar -> global
    console.log(innerVar + localVar);
  }
}

// 6. Global Scope Pollution
// Avoid polluting global scope
(function() {
  // IIFE creates a new scope
  let isolatedVar = 'I am isolated';
  console.log(isolatedVar);
})();

// 7. Scope in ES Modules
// Each module has its own scope
export const moduleScoped = 'module';

// 8. Debugging Scope
function debugScope() {
  let x = 10;
  function inner() {
    debugger; // Check scope in dev tools
    console.log(x);
  }
  inner();
}`}
          language="javascript"
          title="scope-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Scope Chain Performance">
          <PlainText component="div">
            • <Bold>Local Scope:</Bold> Fastest lookup<br />
            • <Bold>Closure Scope:</Bold> Slightly slower<br />
            • <Bold>Global Scope:</Bold> Slowest lookup<br />
            • <Bold>Optimization:</Bold> Keep variables local when possible<br />
            • <Bold>Memory:</Bold> Closures keep scope alive
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Keep variables in the <Bold>narrowest scope</Bold> possible</>,
              <>Avoid <Bold>polluting global scope</Bold></>,
              <>Use <Bold>let</Bold> and <Bold>const</Bold> instead of <InlineCode>var</InlineCode></>,
              <>Understand <Bold>lexical scoping</Bold> for closures</>,
              <>Use <Bold>IIFE</Bold> or <Bold>modules</Bold> to create private scopes</>,
              <>Be aware of <Bold>scope chain performance</Bold></>,
              <>Use <Bold>dev tools</Bold> to debug scope issues</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Best Practices">
          <PlainText component="div">
            • <Bold>Declare variables at the top of their scope</Bold><br />
            • <Bold>Use const by default, let when needed</Bold><br />
            • <Bold>Avoid using var</Bold> in modern code<br />
            • <Bold>Use modules</Bold> to encapsulate code<br />
            • <Bold>Be explicit</Bold> about scope boundaries<br />
            • <Bold>Use strict mode</Bold> to avoid accidental globals
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Understanding scope is <Bold>fundamental</Bold> to mastering JavaScript. It affects <Bold>performance</Bold>, <Bold>memory management</Bold>, and <Bold>code organization</Bold>. Mastering scope leads to <Bold>cleaner, more efficient code</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Scope defines <Bold>where</Bold> variables are accessible. Understanding the different types of scope and how they interact is <Bold>essential</Bold> for writing robust JavaScript applications.
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
            <>Scope defines <Bold>visibility</Bold> and <Bold>accessibility</Bold> of variables</>,
            <>Three types: <Bold>Global</Bold>, <Bold>Function</Bold>, <Bold>Block</Bold></>,
            <><InlineCode>var</InlineCode> is function-scoped, <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> are block-scoped</>,
            <>Inner scopes can access outer scope variables (<Bold>lexical scoping</Bold>)</>,
            <>Outer scopes <Bold>cannot</Bold> access inner scope variables</>,
            <>Avoid <Bold>global scope pollution</Bold></>,
            <>Use <Bold>modules</Bold> and <Bold>IIFE</Bold> to create private scopes</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Always declare variables in the <Bold>smallest scope</Bold> where they're needed. This makes your code <Bold>more predictable</Bold> and <Bold>easier to maintain</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Scope is the <Bold>foundation</Bold> of JavaScript's execution model. Understanding it is <Bold>essential</Bold> for writing clean, efficient code!
      </Note>
    </QuestionWrapper>
  );
}