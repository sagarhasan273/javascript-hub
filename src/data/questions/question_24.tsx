// data/questions/Question24.tsx
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
  InlineCode,
  UnorderedList,
} from "../../components/content";
import { question24Meta } from "./registry";
import { useLevel } from "../../hooks";

export function Question24({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question24Meta.id}
      title={question24Meta.title}
      definition={question24Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        An <Bold>IIFE</Bold> (Immediately Invoked Function Expression) is a JavaScript function that is <Bold>defined and executed immediately</Bold> after its creation. It's a design pattern that creates a <Bold>private scope</Bold> and prevents variables from polluting the global namespace.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is an IIFE?
        </Title>

        <PlainText>
          An IIFE is a function that runs <Bold>as soon as it's defined</Bold>:
        </PlainText>

        <CodeComponent
          code={`// Regular function - needs to be called
function greet() {
  console.log('Hello!');
}
greet(); // Called separately

// IIFE - defined and called immediately
(function() {
  console.log('Hello!'); // Runs immediately!
})();

// Arrow function IIFE
(() => {
  console.log('Hello from arrow function!');
})();

// With parameters
(function(name) {
  console.log('Hello, ' + name + '!');
})('John'); // Output: Hello, John!`}
          language="javascript"
          title="iife-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> An IIFE is wrapped in parentheses <InlineCode>()</InlineCode> and followed by another set of parentheses <InlineCode>()</InlineCode> to invoke it immediately.
        </Note>

        <CardComponent variant="info" title="🎯 Why Use IIFE?">
          <UnorderedList
            items={[
              <>🔒 <Bold>Creates Private Scope:</Bold> Variables inside IIFE are not accessible outside</>,
              <>🌍 <Bold>No Global Pollution:</Bold> Prevents adding unnecessary variables to global scope</>,
              <>📦 <Bold>Encapsulation:</Bold> Groups related code together</>,
              <>🚀 <Bold>Immediate Execution:</Bold> Runs code as soon as the page loads</>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>Example: Creating Private Variables</Bold>
        </PlainText>

        <CodeComponent
          code={`// Without IIFE - variables are global
let counter = 0;
function increment() {
  counter++;
}
// counter is accessible everywhere

// With IIFE - counter is private
const counterModule = (function() {
  let counter = 0; // Private variable
  
  return {
    increment: function() {
      counter++;
      return counter;
    },
    getCount: function() {
      return counter;
    }
  };
})();

console.log(counterModule.getCount()); // 0
counterModule.increment();
counterModule.increment();
console.log(counterModule.getCount()); // 2
// console.log(counter); // ReferenceError: counter is not defined`}
          language="javascript"
          title="iife-private.js"
          defaultOpen={true}
        />
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: IIFE Patterns & Use Cases
        </Title>

        <PlainText>
          Advanced usage of IIFE in real-world scenarios:
        </PlainText>

        <CodeComponent
          code={`// 1. Module Pattern with IIFE
const Calculator = (function() {
  // Private variables
  let result = 0;
  
  // Private helper
  function validate(num) {
    if (typeof num !== 'number') throw new Error('Must be a number');
    return num;
  }
  
  // Public API
  return {
    add: function(num) {
      result += validate(num);
      return this;
    },
    subtract: function(num) {
      result -= validate(num);
      return this;
    },
    getResult: function() {
      return result;
    },
    reset: function() {
      result = 0;
      return this;
    }
  };
})();

console.log(Calculator.add(5).subtract(2).getResult()); // 3

// 2. IIFE with parameters
const config = (function(env, version) {
  return {
    apiUrl: env === 'production' ? 'https://api.example.com' : 'http://localhost:3000',
    version: version,
    debug: env === 'development'
  };
})('development', '1.0.0');

console.log(config.apiUrl); // http://localhost:3000

// 3. IIFE for initialization
const app = (function() {
  // Setup code
  console.log('App initializing...');
  
  // Return API
  return {
    start: function() {
      console.log('App started!');
    }
  };
})();

app.start();

// 4. IIFE in loops (pre-ES6)
// Before let, IIFE was used to create block scope
for (var i = 0; i < 3; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(index); // 0, 1, 2
    }, 100);
  })(i);
}

// 5. IIFE with arrow functions
(() => {
  const message = 'Hello from arrow IIFE';
  console.log(message);
})();

// 6. IIFE for async/await
(async function() {
  const data = await fetch('/api/data');
  console.log(data);
})();

// 7. IIFE for namespace
const MyApp = (function() {
  // Private methods
  function privateMethod() {
    return 'private';
  }
  
  // Public API
  return {
    publicMethod: function() {
      return privateMethod() + ' and public';
    }
  };
})();

console.log(MyApp.publicMethod()); // 'private and public'`}
          language="javascript"
          title="iife-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 IIFE Patterns">
          <PlainText component="div">
            • <Bold>Module Pattern:</Bold> Return an object with public methods<br />
            • <Bold>Singleton Pattern:</Bold> Create a single instance<br />
            • <Bold>Initialization:</Bold> Run setup code immediately<br />
            • <Bold>Block Scope:</Bold> Create scope in pre-ES6 code<br />
            • <Bold>Namespace:</Bold> Create a namespace to avoid conflicts
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> With ES6, many IIFE use cases are replaced by <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> block scoping and <Bold>ES6 modules</Bold>. However, IIFE is still useful for certain patterns.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Mistakes">
          <UnorderedList
            items={[
              <>Forgetting the parentheses: <InlineCode>function(){}()</InlineCode> (will cause error)</>,
              <>Not returning anything when you need a value</>,
              <>Using IIFE when ES6 modules would be better</>,
              <>Creating unnecessarily complex IIFEs</>,
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
          Expert: IIFE Under the Hood & Modern Alternatives
        </Title>

        <PlainText>
          Expert-level understanding of IIFE:
        </PlainText>

        <CodeComponent
          code={`// 1. How IIFE works internally
// The parentheses make it a function expression
// The trailing parentheses execute it
(function() {
  console.log('IIFE');
})();

// 2. Variations of IIFE
// Variation 1: Wrapping in parentheses
(function() { console.log('1'); })();

// Variation 2: Using unary operators
!function() { console.log('2'); }();

// Variation 3: Using void
void function() { console.log('3'); }();

// Variation 4: Using new
new function() { console.log('4'); }();

// 3. IIFE vs ES6 Modules
// Before ES6
const myModule = (function() {
  let privateVar = 'secret';
  return {
    getSecret: function() { return privateVar; }
  };
})();

// After ES6 (module)
// module.js
let privateVar = 'secret';
export function getSecret() { return privateVar; }

// 4. IIFE with proper error handling
const safeModule = (function() {
  try {
    // Code that might throw
    const config = JSON.parse('{"key":"value"}');
    return config;
  } catch (error) {
    console.error('Failed to initialize:', error);
    return null;
  }
})();

// 5. IIFE for conditional initialization
const env = (function() {
  if (typeof window !== 'undefined') return 'browser';
  if (typeof process !== 'undefined') return 'node';
  return 'unknown';
})();

// 6. IIFE for dependency injection
const service = (function(dependency) {
  return {
    doSomething: function() {
      return dependency.process();
    }
  };
})(someDependency);

// 7. IIFE with conditional returning
const config = (function() {
  if (process.env.NODE_ENV === 'production') {
    return { apiUrl: 'https://api.prod.com', debug: false };
  }
  return { apiUrl: 'http://localhost:3000', debug: true };
})();

// 8. Modern alternatives
// Block scope with {}
{
  let privateVar = 'private';
  // Code here has block scope
}

// ES6 modules are the preferred modern alternative`}
          language="javascript"
          title="iife-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 IIFE vs Modern JavaScript">
          <PlainText component="div">
            • <Bold>Pre-ES6:</Bold> IIFE was the only way to create private scope<br />
            • <Bold>ES6:</Bold> <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> provide block scope<br />
            • <Bold>ES6 Modules:</Bold> Built-in module system with private scopes<br />
            • <Bold>Today:</Bold> IIFE is still useful for quick prototypes and legacy code
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use IIFE for <Bold>encapsulation</Bold> in non-module code</>,
              <>For modern code, prefer <Bold>ES6 modules</Bold> over IIFE</>,
              <>Use IIFE for <Bold>quick prototypes</Bold> and <Bold>scripts</Bold></>,
              <>Combine IIFE with <Bold>closures</Bold> for powerful patterns</>,
              <>Consider <Bold>readability</Bold> - don't overcomplicate with IIFE</>,
              <>Use IIFE for <Bold>module patterns</Bold> in legacy codebases</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Modern Alternatives">
          <PlainText component="div">
            • <Bold>ES6 Modules:</Bold> <InlineCode>import</InlineCode>/<InlineCode>export</InlineCode><br />
            • <Bold>Block Scope:</Bold> <InlineCode>'{}'</InlineCode> with <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode><br />
            • <Bold>Classes:</Bold> Built-in class syntax<br />
            • <Bold>Arrow Functions:</Bold> <InlineCode>{`() => {}`}</InlineCode><br />
            • <Bold>Top-level await:</Bold> In modules
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> IIFE is a <Bold>classic JavaScript pattern</Bold> that paved the way for modern module systems. While ES6 modules have largely replaced IIFE for organizing code, understanding IIFE is still valuable for reading legacy code and understanding JavaScript's evolution.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> IIFE is a <Bold>powerful pattern</Bold> that creates private scope and prevents global pollution. While modern JavaScript has better alternatives, IIFE remains an important concept to understand.
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
            <>IIFE stands for <Bold>Immediately Invoked Function Expression</Bold></>,
            <>It's a function that runs <Bold>immediately</Bold> after being defined</>,
            <>Creates a <Bold>private scope</Bold> and prevents global pollution</>,
            <>Used for <Bold>module patterns</Bold>, <Bold>encapsulation</Bold>, and <Bold>initialization</Bold></>,
            <>Syntax: <InlineCode>(function() {})()</InlineCode> or <InlineCode>({`() => {}`})()</InlineCode></>,
            <>Pre-ES6 solution for block scope and private variables</>,
            <>In modern code, prefer <Bold>ES6 modules</Bold> and <Bold>block scope</Bold></>,
            <>Still useful for <Bold>quick scripts</Bold> and <Bold>legacy code</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> While IIFE is less common in modern JavaScript, understanding it helps you <Bold>read legacy code</Bold> and understand <Bold>JavaScript's evolution</Bold>. It's a pattern that shows the language's journey from simple scripting to modern programming.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> IIFE is a <Bold>powerful pattern</Bold> that helped shape JavaScript. It's still useful today for <Bold>quick prototypes</Bold> and <Bold>understanding JavaScript fundamentals</Bold>!
      </Note>
    </QuestionWrapper>
  );
}