// data/questions/Question27.tsx
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
import { question27Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question27({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question27Meta.id}
      title={question27Meta.title}
      definition={question27Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Hoisting</Bold> is a JavaScript behavior where <Bold>variable and function declarations</Bold> are moved to the top of their containing scope during the compilation phase, before the code is executed. This allows you to use variables and functions <Bold>before</Bold> they are declared in your code.
      </PlainText>

      <PlainText>
        Hoisting is often misunderstood, but it's a <Bold>fundamental concept</Bold> that affects how JavaScript code is executed. Understanding hoisting is crucial for writing <Bold>predictable</Bold> and <Bold>bug-free</Bold> code.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is Hoisting?
        </Title>

        <PlainText>
          Think of hoisting like a <Bold>magic elevator</Bold> that lifts declarations to the top:
        </PlainText>

        <CardComponent variant="info" title="🎢 Analogy">
          <PlainText>
            Imagine you're in a building. The declarations (variables and functions) are like people waiting for an elevator. JavaScript hoists them to the top floor before running any code, so they're ready to be used anywhere in their scope.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Simple Examples:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Variable Hoisting with var
console.log(x); // undefined (not an error!)
var x = 5;
console.log(x); // 5

// Behind the scenes, JavaScript sees this as:
var x;
console.log(x); // undefined
x = 5;
console.log(x); // 5

// 2. Function Hoisting
greet(); // "Hello!" (works!)

function greet() {
  console.log("Hello!");
}

// 3. Function declarations are hoisted completely
// Function expressions are NOT hoisted
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi!");
};`}
          language="javascript"
          title="hoisting-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Only <Bold>declarations</Bold> are hoisted, not <Bold>initializations</Bold> (assignments).
        </Note>

        <CardComponent variant="success" title="✅ Hoisting Rules (Beginner)">
          <PlainText component="div">
            • <Bold>var:</Bold> Hoisted with <InlineCode>undefined</InlineCode><br />
            • <Bold>let/const:</Bold> Hoisted but <Bold>not initialized</Bold> (TDZ)<br />
            • <Bold>Function Declarations:</Bold> Hoisted completely<br />
            • <Bold>Function Expressions:</Bold> <Bold>Not</Bold> hoisted (only variable is hoisted)<br />
            • <Bold>Classes:</Bold> Hoisted but <Bold>not initialized</Bold> (TDZ)
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
          Advanced: Hoisting in Depth
        </Title>

        <PlainText>
          Deep dive into how hoisting works with different declarations:
        </PlainText>

        <CodeComponent
          code={`// 1. var hoisting - function scope
function example() {
  console.log(x); // undefined
  var x = 10;
  console.log(x); // 10
}

// Behind the scenes:
function example() {
  var x; // Hoisted to top
  console.log(x); // undefined
  x = 10;
  console.log(x); // 10
}

// 2. let and const - Temporal Dead Zone
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 5;

// 3. Function declarations - hoisted completely
foo(); // "Hello from foo!"

function foo() {
  console.log("Hello from foo!");
}

// 4. Function expressions - only variable hoisted
bar(); // TypeError: bar is not a function

var bar = function() {
  console.log("Hello from bar!");
};

// 5. Arrow functions - not hoisted
baz(); // ReferenceError: Cannot access 'baz' before initialization

const baz = () => {
  console.log("Hello from baz!");
};

// 6. Class hoisting
const obj = new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization

class MyClass {
  constructor() {
    this.name = 'test';
  }
}

// 7. Hoisting in loops
for (var i = 0; i < 3; i++) {
  // var i is hoisted to function scope
}
console.log(i); // 3 (accessible outside loop)

for (let j = 0; j < 3; j++) {
  // let j is block-scoped
}
console.log(j); // ReferenceError: j is not defined`}
          language="javascript"
          title="hoisting-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Hoisting Comparison">
          <TableComponent
            headers={['Declaration Type', 'Hoisted', 'Initialized', 'Value before declaration']}
            rows={[
              ['var', '✅ Yes', '✅ Yes', 'undefined'],
              ['let', '✅ Yes', '❌ No', 'ReferenceError (TDZ)'],
              ['const', '✅ Yes', '❌ No', 'ReferenceError (TDZ)'],
              ['Function Declaration', '✅ Yes', '✅ Yes', 'Function'],
              ['Function Expression', '⚠️ Variable only', '❌ No', 'undefined (var) / TDZ (let/const)'],
              ['Class Declaration', '✅ Yes', '❌ No', 'ReferenceError (TDZ)'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> are <Bold>hoisted</Bold> but they're in the <Bold>Temporal Dead Zone</Bold> (TDZ) until the declaration is reached. This prevents the confusing behavior of <InlineCode>var</InlineCode>.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Hoisting Mistakes">
          <UnorderedList
            items={[
              <>Assuming <InlineCode>var</InlineCode> variables are initialized when hoisted (they're not)</>,
              <>Using functions before they're declared (works for declarations, not expressions)</>,
              <>Assuming <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> aren't hoisted (they are, but in TDZ)</>,
              <>Using <InlineCode>var</InlineCode> in loops expecting block scope</>,
              <>Relying on hoisting for code readability</>,
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
          Expert: Hoisting Under the Hood
        </Title>

        <PlainText>
          Expert-level understanding of hoisting:
        </PlainText>

        <CodeComponent
          code={`// 1. How hoisting works internally
// JavaScript uses a two-phase process:
// Phase 1: Compilation - scans for declarations and creates scope
// Phase 2: Execution - runs the code line by line

// Example of the compilation phase:
function example() {
  // Phase 1: Compilation
  // - var x is hoisted
  // - function foo is hoisted
  // - let y is hoisted (in TDZ)
  
  console.log(x); // undefined
  console.log(y); // ReferenceError (TDZ)
  
  var x = 5;
  let y = 10;
  function foo() {
    console.log('foo');
  }
}

// 2. Hoisting with block scope
{
  console.log(x); // ReferenceError (TDZ)
  let x = 5;
}

// 3. Hoisting with multiple declarations
var x = 1;
function x() {
  console.log('function');
}
console.log(x); // 1 (function overwritten by variable)

// 4. Hoisting with function declarations
function test() {
  foo(); // "foo 2" (function declaration overwrites)
  
  function foo() {
    console.log('foo 1');
  }
  
  function foo() {
    console.log('foo 2');
  }
}
test(); // "foo 2"

// 5. Hoisting and the global object
var globalVar = 'global';
console.log(window.globalVar); // 'global'

let globalLet = 'global';
console.log(window.globalLet); // undefined

// 6. Hoisting in ES modules
// In modules, hoisting still works but with module scope
import { something } from './module.js'; // Hoisted to module scope

// 7. Hoisting with eval
// eval can break hoisting (avoid using eval)

// 8. Preventing hoisting issues
// Best practice: Declare variables at the top of their scope
function bestPractice() {
  // Declare at top
  let x = 5;
  const y = 10;
  var z = 15;
  
  // Use variables
  console.log(x + y + z);
}`}
          language="javascript"
          title="hoisting-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Why Hoisting Exists">
          <PlainText component="div">
            • <Bold>Historical Reasons:</Bold> Hoisting was a design decision in early JavaScript<br />
            • <Bold>Function Declarations:</Bold> Allows functions to call each other regardless of order<br />
            • <Bold>Mutual Recursion:</Bold> Enables functions to reference each other<br />
            • <Bold>Performance:</Bold> Allows the engine to optimize variable lookup<br />
            • <Bold>Implementation:</Bold> Easier for the interpreter to handle declarations first
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Always declare variables at the <Bold>top</Bold> of their scope</>,
              <>Use <Bold>let</Bold> and <Bold>const</Bold> instead of <InlineCode>var</InlineCode> to avoid hoisting confusion</>,
              <>Understand that <Bold>function declarations</Bold> are hoisted, but <Bold>function expressions</Bold> are not</>,
              <>Be aware of <Bold>TDZ</Bold> with <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode></>,
              <>Use <Bold>ESLint</Bold> rules to catch hoisting issues (<InlineCode>no-use-before-define</InlineCode>)</>,
              <>In TypeScript, hoisting is less of an issue due to compile-time checks</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Best Practices">
          <PlainText component="div">
            • <Bold>Declare at Top:</Bold> Always declare variables at the beginning of their scope<br />
            • <Bold>Use let/const:</Bold> Avoid <InlineCode>var</InlineCode> in modern code<br />
            • <Bold>Function Declarations:</Bold> Use function declarations when you need hoisting<br />
            • <Bold>Function Expressions:</Bold> Use function expressions when you don't<br />
            • <Bold>Be Explicit:</Bold> Don't rely on hoisting for code clarity<br />
            • <Bold>Follow Conventions:</Bold> Consistent declaration patterns
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Hoisting is a <Bold>legacy behavior</Bold> that exists for historical reasons. While it's important to understand, <Bold>modern JavaScript</Bold> with <InlineCode>let</InlineCode>, <InlineCode>const</InlineCode>, and <Bold>ES6 modules</Bold> makes hoisting much less relevant. The <Bold>temporal dead zone</Bold> effectively prevents the confusing behavior of <InlineCode>var</InlineCode>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Hoisting is a <Bold>fundamental concept</Bold> in JavaScript that affects how code executes. Understanding it helps you write <Bold>predictable code</Bold> and avoid <Bold>common pitfalls</Bold>. However, with modern JavaScript, you can <Bold>largely ignore</Bold> hoisting by using <InlineCode>let</InlineCode>, <InlineCode>const</InlineCode>, and <Bold>declaring variables at the top</Bold> of their scope.
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
            <>Hoisting moves <Bold>declarations</Bold> to the top of their scope</>,
            <>Only <Bold>declarations</Bold> are hoisted, not <Bold>initializations</Bold></>,
            <><InlineCode>var</InlineCode> is hoisted with <InlineCode>undefined</InlineCode></>,
            <><InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> are hoisted but in <Bold>TDZ</Bold></>,
            <>Function <Bold>declarations</Bold> are hoisted completely</>,
            <>Function <Bold>expressions</Bold> are <Bold>not</Bold> hoisted</>,
            <>Classes are hoisted but <Bold>not initialized</Bold> (TDZ)</>,
            <>Use <Bold>let/const</Bold> and declare variables at the <Bold>top</Bold> to avoid issues</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> The <Bold>best way</Bold> to deal with hoisting is to <Bold>not rely on it</Bold>. Always declare variables at the top of their scope and use <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> instead of <InlineCode>var</InlineCode>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Hoisting is a <Bold>behavior</Bold>, not a <Bold>feature</Bold> you should rely on. Write clean, predictable code by <Bold>declaring variables at the top</Bold> of their scope!
      </Note>
    </QuestionWrapper>
  );
}