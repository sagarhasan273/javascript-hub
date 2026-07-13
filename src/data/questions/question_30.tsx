// data/questions/Question30.tsx
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
import { question30Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question30({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question30Meta.id}
      title={question30Meta.title}
      definition={question30Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Modules</Bold> are a way to <Bold>organize</Bold> and <Bold>encapsulate</Bold> code into reusable, maintainable pieces. Each module is a separate file that can <Bold>export</Bold> its functionality and <Bold>import</Bold> functionality from other modules. ES6 modules provide a <Bold>native</Bold> module system for JavaScript.
      </PlainText>

      <PlainText>
        Modules help with <Bold>code organization</Bold>, <Bold>dependency management</Bold>, and <Bold>maintainability</Bold>. They enable <Bold>encapsulation</Bold>, prevent <Bold>global namespace pollution</Bold>, and make code <Bold>reusable</Bold> across different parts of an application.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What are Modules?
        </Title>

        <PlainText>
          Think of modules like <Bold>books in a library</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📚 Analogy">
          <PlainText>
            Imagine a library with many books. Each book (module) contains specific information (functionality). You can take a book and use its information, without affecting other books. You can also combine information from multiple books to create something new.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Module Syntax:</Bold>
        </PlainText>

        <CodeComponent
          code={`// -------- math.js (Module) --------
// Exporting functions
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;

// Default export
export default function multiply(a, b) {
  return a * b;
}

// -------- app.js (Main file) --------
// Importing from the module
import multiply, { add, subtract, PI } from './math.js';

console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
console.log(multiply(3, 4)); // 12
console.log(PI); // 3.14159

// Alternative: Import everything
import * as math from './math.js';
console.log(math.add(5, 3)); // 8

// -------- Alternative: Importing with aliases --------
import { add as sum, subtract as diff } from './math.js';
console.log(sum(5, 3)); // 8`}
          language="javascript"
          title="modules-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Modules allow you to <Bold>encapsulate</Bold> code and <Bold>control</Bold> what is accessible to other parts of your application.
        </Note>

        <CardComponent variant="success" title="✅ Benefits of Modules">
          <UnorderedList
            items={[
              <>📦 <Bold>Encapsulation:</Bold> Code is isolated and organized</>,
              <>🔄 <Bold>Reusability:</Bold> Use the same code across multiple files</>,
              <>🧹 <Bold>No Global Pollution:</Bold> Variables are scoped to the module</>,
              <>🔍 <Bold>Maintainability:</Bold> Easier to find and fix issues</>,
              <>🤝 <Bold>Collaboration:</Bold> Multiple developers can work on different modules</>,
              <>📊 <Bold>Dependency Management:</Bold> Clear relationships between files</>,
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
          Advanced: Module Patterns & Features
        </Title>

        <PlainText>
          Advanced module patterns and features:
        </PlainText>

        <CodeComponent
          code={`// 1. Module with multiple exports
// -------- user.js --------
export const user = {
  name: 'John',
  age: 30
};

export function greetUser(user) {
  return \`Hello, \${user.name}!\`;
}

export function isAdult(user) {
  return user.age >= 18;
}

export default class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}

// -------- app.js --------
import User, { user, greetUser, isAdult } from './user.js';

const newUser = new User('Jane', 25);
console.log(newUser.greet()); // Hello, I'm Jane
console.log(greetUser(user)); // Hello, John!
console.log(isAdult(user)); // true

// 2. Re-exporting modules
// -------- index.js (Barrel file) --------
export { default as User } from './user.js';
export * from './math.js';
export { PI, add, subtract } from './math.js';

// -------- app.js --------
import { User, add, PI } from './index.js';

// 3. Dynamic imports
// -------- app.js --------
async function loadModule() {
  const module = await import('./heavy-module.js');
  module.doSomething();
}

// 4. Module with private variables (not truly private)
// -------- counter.js --------
let count = 0; // Module-scoped, not exported

export function increment() {
  count++;
  return count;
}

export function getCount() {
  return count;
}

// 5. Module with named exports and aliases
// -------- utils.js --------
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const square = (a) => a * a;

// -------- app.js --------
import { add as sum, multiply as product, square } from './utils.js';

// 6. Module with default export and named exports
// -------- api.js --------
export default class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async get(endpoint) {
    const response = await fetch(\`\${this.baseURL}/\${endpoint}\`);
    return response.json();
  }
}

export const API_URL = 'https://api.example.com';
export const TIMEOUT = 5000;

// -------- app.js --------
import API, { API_URL, TIMEOUT } from './api.js';`}
          language="javascript"
          title="modules-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Export/Import Comparison">
          <TableComponent
            headers={['Feature', 'Named Export', 'Default Export']}
            rows={[
              ['Syntax', 'export const x = 1', 'export default class/function'],
              ['Import', '{ x }', 'anyName'],
              ['Multiple per file', '✅ Yes', '❌ Only one'],
              ['Alias', 'import { x as y }', 'import anyName'],
              ['Re-export', 'export * from', 'export { default } from'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> ES modules are <Bold>strict</Bold> by default. They don't have access to the global scope unless explicitly imported.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Module Mistakes">
          <UnorderedList
            items={[
              <>Forgetting <InlineCode>type="module"</InlineCode> in HTML script tag</>,
              <>Mixing default and named exports incorrectly</>,
              <>Using <InlineCode>import</InlineCode> without declaring <InlineCode>type="module"</InlineCode></>,
              <>Creating circular dependencies</>,
              <>Importing from wrong paths</>,
              <>Using <InlineCode>__dirname</InlineCode> or <InlineCode>__filename</InlineCode> in modules</>,
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
          Expert: Advanced Module Patterns
        </Title>

        <PlainText>
          Expert-level module patterns and best practices:
        </PlainText>

        <CodeComponent
          code={`// 1. Module with private state (using symbols)
// -------- private-state.js --------
const privateData = new WeakMap();

export function createState(initial) {
  const state = { value: initial };
  privateData.set(state, { 
    history: [initial],
    listeners: [] 
  });
  
  return {
    get: () => privateData.get(state).value,
    set: (newValue) => {
      const data = privateData.get(state);
      data.history.push(newValue);
      data.value = newValue;
      data.listeners.forEach(listener => listener(newValue));
    },
    subscribe: (listener) => {
      const data = privateData.get(state);
      data.listeners.push(listener);
    },
    getHistory: () => privateData.get(state).history
  };
}

// 2. Module with dynamic imports for code splitting
// -------- app.js --------
const routes = {
  home: () => import('./home.js'),
  about: () => import('./about.js'),
  contact: () => import('./contact.js')
};

async function loadRoute(route) {
  const module = await routes[route]();
  return module.default;
}

// 3. Module with dependency injection
// -------- service.js --------
export function createService(config) {
  const { apiUrl, timeout } = config;
  
  return {
    fetchData: async (endpoint) => {
      const response = await fetch(\`\${apiUrl}/\${endpoint}\`, {
        signal: AbortSignal.timeout(timeout)
      });
      return response.json();
    }
  };
}

// -------- app.js --------
import { createService } from './service.js';
const api = createService({
  apiUrl: 'https://api.example.com',
  timeout: 5000
});

// 4. Module with singleton pattern
// -------- database.js --------
let instance = null;

export class Database {
  constructor() {
    if (instance) {
      return instance;
    }
    
    this.connection = null;
    instance = this;
  }
  
  connect() {
    this.connection = 'Connected';
    console.log('Database connected');
    return this;
  }
  
  query(sql) {
    console.log('Query:', sql);
    return [];
  }
}

// 5. Module with factory pattern
// -------- factories.js --------
export function createLogger(prefix) {
  return {
    log: (message) => console.log(\`[\${prefix}]\`, message),
    error: (message) => console.error(\`[\${prefix} ERROR]\`, message),
    warn: (message) => console.warn(\`[\${prefix} WARN]\`, message)
  };
}

export function createFormatter(format) {
  return (value) => {
    switch(format) {
      case 'uppercase': return value.toUpperCase();
      case 'lowercase': return value.toLowerCase();
      case 'capitalize': return value.charAt(0).toUpperCase() + value.slice(1);
      default: return value;
    }
  };
}

// 6. Module with lazy loading
// -------- app.js --------
let _heavyModule = null;

export async function getHeavyModule() {
  if (!_heavyModule) {
    _heavyModule = await import('./heavy-module.js');
  }
  return _heavyModule;
}

// Usage
const heavy = await getHeavyModule();
heavy.doSomething();

// 7. Module with error handling
// -------- safe-import.js --------
export async function safeImport(modulePath) {
  try {
    return await import(modulePath);
  } catch (error) {
    console.error(\`Failed to load module: \${modulePath}\`, error);
    return { default: null };
  }
}

// 8. Module with performance monitoring
// -------- performance.js --------
export function measureModule(moduleName) {
  const start = performance.now();
  
  return {
    end: () => {
      const duration = performance.now() - start;
      console.log(\`\${moduleName} loaded in \${duration}ms\`);
      return duration;
    }
  };
}`}
          language="javascript"
          title="modules-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Module Systems Comparison">
          <PlainText component="div">
            • <Bold>ES Modules (ES6):</Bold> Native, static, browser & Node.js<br />
            • <Bold>CommonJS (Node.js):</Bold> Dynamic, synchronous, <InlineCode>require()</InlineCode><br />
            • <Bold>AMD (RequireJS):</Bold> Asynchronous, browser-focused<br />
            • <Bold>UMD:</Bold> Universal, works everywhere<br />
            • <Bold>SystemJS:</Bold> Dynamic loading<br />
            • <Bold>ES Modules with dynamic import:</Bold> Asynchronous, lazy loading
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>barrel files</Bold> (index.js) for cleaner imports</>,
              <>Use <Bold>dynamic imports</Bold> for code splitting and lazy loading</>,
              <>Use <Bold>named exports</Bold> for multiple exports from a module</>,
              <>Use <Bold>default exports</Bold> for the main functionality of a module</>,
              <>Avoid <Bold>circular dependencies</Bold> between modules</>,
              <>Use <Bold>TypeScript</Bold> for better module type safety</>,
              <>Use <Bold>import/export</Bold> over <InlineCode>require()</InlineCode> for new projects</>,
              <>Consider <Bold>module bundlers</Bold> (Webpack, Vite, Rollup) for complex apps</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Best Practices">
          <PlainText component="div">
            • <Bold>Single Responsibility:</Bold> Each module should have one purpose<br />
            • <Bold>Explicit Imports:</Bold> Import only what you need<br />
            • <Bold>Consistent Naming:</Bold> Use clear, descriptive names<br />
            • <Bold>Avoid Side Effects:</Bold> Keep modules pure when possible<br />
            • <Bold>Documentation:</Bold> Document module interfaces<br />
            • <Bold>Testing:</Bold> Test modules in isolation<br />
            • <Bold>Version Control:</Bold> Manage dependencies carefully
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> ES modules are the <Bold>future</Bold> of JavaScript modularization. They provide <Bold>native, performant, and maintainable</Bold> code organization. Understanding modules is <Bold>essential</Bold> for building scalable JavaScript applications.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Modules are a <Bold>fundamental building block</Bold> of modern JavaScript applications. They enable <Bold>code organization</Bold>, <Bold>reusability</Bold>, and <Bold>maintainability</Bold> in large-scale projects.
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
            <>Modules are <Bold>encapsulated</Bold> pieces of code</>,
            <>They use <Bold>export</Bold> and <Bold>import</Bold> keywords</>,
            <>There are <Bold>named exports</Bold> and <Bold>default exports</Bold></>,
            <>Modules are <Bold>strict</Bold> by default</>,
            <>They enable <Bold>code reuse</Bold> and <Bold>organization</Bold></>,
            <>Modules prevent <Bold>global namespace pollution</Bold></>,
            <>Use <Bold>dynamic imports</Bold> for lazy loading</>,
            <>Modules are <Bold>essential</Bold> for modern JavaScript development</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Organize your code into <Bold>small, focused modules</Bold>. This makes your code <Bold>easier to understand</Bold>, <Bold>test</Bold>, and <Bold>maintain</Bold>. Embrace the module pattern for <Bold>scalable applications</Bold>!
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Modules are <Bold>essential</Bold> for writing clean, maintainable JavaScript. They help you <Bold>organize your code</Bold> and <Bold>manage dependencies</Bold> effectively!
      </Note>
    </QuestionWrapper>
  );
}