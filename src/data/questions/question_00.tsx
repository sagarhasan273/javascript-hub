// data/questions/Question04.tsx
import { Box } from '@mui/material';
import { QuestionWrapper } from '../../components/QuestionWrapper';
import { LevelContent } from '../../components/LevelContent';
import {
  Title,
  PlainText,
  Bold,
  CardComponent,
  HLText,
  CodeComponent,
  Note,
  Gap,
  UnorderedList,
} from '../../components/content';
import { question00Meta } from './registry';
import { useLevel } from '../../hooks';


export function Question00({ isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question00Meta.id}
      title={question00Meta.title}
      definition={question00Meta.definition}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        JavaScript is a high-level, interpreted programming language that is primarily used to create interactive and dynamic content on websites. It is one of the core technologies of the World Wide Web, alongside HTML and CSS.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is JavaScript?
        </Title>

        <PlainText>
          JavaScript is a <Bold>programming language</Bold> that makes websites <Bold>interactive</Bold> and <Bold>dynamic</Bold>. It's one of the three core technologies of the web:
        </PlainText>

        <CardComponent variant="info" title="🎯 The Three Core Web Technologies">
          <UnorderedList
            items={[
              <><Bold>HTML</Bold> - Structure (the skeleton)</>,
              <><Bold>CSS</Bold> - Style (the clothes)</>,
              <><Bold>JavaScript</Bold> - Behavior (the brain)</>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>What makes JavaScript special?</Bold>
        </PlainText>

        <CardComponent variant="success" title="✅ Key Characteristics (Beginner)">
          <UnorderedList
            items={[
              <>📄 <Bold>Interpreted:</Bold> Runs directly in your browser without compilation</>,
              <>🎯 <Bold>Dynamic:</Bold> You don't need to specify data types</>,
              <>🔄 <Bold>Event-driven:</Bold> Responds to clicks, scrolls, and user actions</>,
              <>🌐 <Bold>Everywhere:</Bold> Works in all modern browsers</>,
              <>🚀 <Bold>Beginner-friendly:</Bold> Easy to start, with immediate visual results</>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>Simple Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// This is a simple JavaScript program
console.log("Hello, World!");

// Variables - store data
let name = "John";
const age = 25;

// Functions - reusable code blocks
function greet(person) {
  return "Hello, " + person + "!";
}

console.log(greet(name)); // Hello, John!`}
          language="javascript"
          title="hello-world.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Beginner Tip:</Bold> You can write JavaScript directly in your browser's console (F12 → Console tab) and see results immediately!
        </Note>

        <CardComponent variant="success" title="✅ Beginner Checklist">
          <UnorderedList
            items={[
              <>✔️ JavaScript makes websites interactive</>,
              <>✔️ It runs in your browser without installation</>,
              <>✔️ You can start writing code today</>,
              <>✔️ It's the most popular programming language</>,
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
          Advanced: JavaScript Ecosystem & Features
        </Title>

        {/* What JavaScript Can Do */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>🚀</Box>
          What Can JavaScript Do?
        </Title>

        <CardComponent variant="info" title="🌐 Full-Stack Capabilities">
          <UnorderedList
            items={[
              <>🎨 <Bold>Frontend:</Bold> Create interactive UIs with React, Vue, Angular</>,
              <>🖥️ <Bold>Backend:</Bold> Build servers with Node.js, Express, NestJS</>,
              <>📱 <Bold>Mobile:</Bold> Build cross-platform apps with React Native</>,
              <>💻 <Bold>Desktop:</Bold> Create desktop apps with Electron, Tauri</>,
              <>🤖 <Bold>AI/ML:</Bold> Use TensorFlow.js for machine learning</>,
              <>🎮 <Bold>Gaming:</Bold> Create games with Phaser, Babylon.js, Three.js</>,
              <>🔌 <Bold>IoT:</Bold> Control hardware with Johnny-Five, Arduino</>,
            ]}
          />
        </CardComponent>

        {/* JavaScript Evolution */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>📜</Box>
          A Brief History
        </Title>

        <CodeComponent
          code={`// JavaScript Timeline
1995 - Brendan Eich created JavaScript at Netscape in just 10 days
1996 - Microsoft created JScript (IE's version of JavaScript)
1997 - JavaScript became an ECMA standard (ECMAScript)
2009 - Node.js was released, bringing JavaScript to the server
2015 - ECMAScript 6 (ES6) introduced major features:
  • Classes
  • Arrow functions
  • let/const
  • Template literals
  • Promises
  • Destructuring
  • Modules

Today - JavaScript is the most popular programming language in the world!`}
          language="javascript"
          title="javascript-history.js"
          defaultOpen={true}
        />

        <Note type="info" icon="📌">
          <Bold>Fun Fact:</Bold> JavaScript was originally named "Mocha" by Brendan Eich, then renamed to "LiveScript" before finally settling on "JavaScript" for marketing reasons (to ride the popularity of Java at the time).
        </Note>

        <Gap size={2} />

        {/* JavaScript vs Other Languages */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#ec4899', mr: 1 }}>📊</Box>
          JavaScript vs Other Languages
        </Title>

        <CodeComponent
          code={`// Python vs JavaScript
// Python
def greet(name):
    return f"Hello, {name}"

// JavaScript
function greet(name) {
    return \`Hello, \${name}\`;
}

// Java vs JavaScript
// Java - Static typing
String name = "John";

// JavaScript - Dynamic typing
let name = "John";
name = 42; // Works fine!

// Comparison
// JavaScript: Dynamic, interpreted, runs in browser
// Python: Dynamic, interpreted, general purpose
// Java: Static, compiled, enterprise applications`}
          language="javascript"
          title="language-comparison.js"
          defaultOpen={false}
        />

        <Gap size={2} />

        {/* Core Concepts */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>🧠</Box>
          Core Concepts to Master
        </Title>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2,
            my: 2,
          }}
        >
          {[
            { title: 'Variables', icon: '📦', color: '#2563eb' },
            { title: 'Data Types', icon: '🔢', color: '#8b5cf6' },
            { title: 'Functions', icon: '🔧', color: '#f59e0b' },
            { title: 'Objects', icon: '📋', color: '#06b6d4' },
            { title: 'Arrays', icon: '📚', color: '#10b981' },
            { title: 'Promises', icon: '🤝', color: '#ec4899' },
            { title: 'Classes', icon: '🏗️', color: '#f472b6' },
            { title: 'Modules', icon: '📦', color: '#8b5cf6' },
            { title: 'Events', icon: '🎯', color: '#fbbf24' },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                bgcolor: 'rgba(255,255,255,0.8)',
                borderRadius: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  borderColor: item.color,
                },
              }}
            >
              <Box sx={{ fontSize: '2rem', mb: 1 }}>{item.icon}</Box>
              <Box sx={{ fontWeight: 600, color: item.color }}>{item.title}</Box>
            </Box>
          ))}
        </Box>

        <Note type="info" icon="💡">
          <Bold>Advanced Tip:</Bold> Mastering these concepts is the key to becoming a proficient JavaScript developer. Start with variables and functions, then progress to objects and asynchronous programming.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Deep Dive & Professional Insights
        </Title>

        {/* Why Learn JavaScript? */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>💪</Box>
          Why Learn JavaScript? (Expert Perspective)
        </Title>

        <CardComponent variant="success" title="🎯 Strategic Reasons">
          <UnorderedList
            items={[
              <>🌐 <Bold>Universal Language:</Bold> Only language that runs natively in browsers</>,
              <>💼 <Bold>Career Opportunities:</Bold> 70%+ of developer jobs require JavaScript</>,
              <>🔧 <Bold>Full-Stack:</Bold> Use the same language across the entire stack</>,
              <>📈 <Bold>Massive Ecosystem:</Bold> Over 2 million packages on npm</>,
              <>🔄 <Bold>Continuous Evolution:</Bold> Annual updates with new features</>,
              <>👥 <Bold>Community:</Bold> Largest developer community with endless resources</>,
              <>⚡ <Bold>Performance:</Bold> V8 engine makes JavaScript incredibly fast</>,
            ]}
          />
        </CardComponent>

        {/* Simple JavaScript Example */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#f472b6', mr: 1 }}>💻</Box>
          Professional JavaScript Example
        </Title>

        <CodeComponent
          code={`// Professional JavaScript with modern features
// 1. ES6+ Features
const greet = (name) => \`Hello, \${name}!\`;

// 2. Destructuring
const user = { id: 1, name: 'Alice', role: 'Developer' };
const { name, role } = user;

// 3. Async/Await for API calls
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch:', error);
    return null;
  }
};

// 4. Functional Programming
const processData = (data) =>
  data
    .filter(item => item.active)
    .map(item => ({ ...item, processed: true }))
    .reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

// 5. Classes and Inheritance
class BaseModel {
  constructor(data) {
    this.id = data.id;
    this.createdAt = new Date();
  }
  
  validate() {
    return this.id !== undefined;
  }
}

class UserModel extends BaseModel {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.email = data.email;
  }
  
  get displayName() {
    return \`\${this.name} (\${this.email})\`;
  }
}

// 6. Error Handling
const safeExecution = (fn, fallback) => {
  try {
    return fn();
  } catch (error) {
    console.error('Error:', error.message);
    return fallback;
  }
};`}
          language="javascript"
          title="professional-javascript.js"
          defaultOpen={false}
        />

        {/* Modern JavaScript */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>✨</Box>
          Modern JavaScript (ES6+) - Expert Edition
        </Title>

        <CodeComponent
          code={`// Modern JavaScript features for experts

// 1. Optional Chaining
const user = { profile: { name: "John" } };
console.log(user.profile?.name); // John
console.log(user.profile?.age);  // undefined

// 2. Nullish Coalescing
const value = null ?? 'default'; // 'default'
const zero = 0 ?? 'default';     // 0

// 3. Dynamic Imports
const module = await import('./module.js');

// 4. Generators
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}
const gen = idGenerator();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1

// 5. Proxies
const handler = {
  get(target, property) {
    console.log(\`Getting \${property}\`);
    return target[property];
  }
};
const proxy = new Proxy({ name: 'John' }, handler);
console.log(proxy.name); // Logs: Getting name

// 6. Private Fields (ES2022)
class Person {
  #privateField = 'secret';
  
  getSecret() {
    return this.#privateField;
  }
}

// 7. Top-level await
const data = await fetch('/api/data');
console.log(data);`}
          language="javascript"
          title="modern-javascript-expert.js"
          defaultOpen={false}
        />

        <Title level={4}>💡 Expert Tips & Best Practices</Title>

        <CardComponent variant="default" title="Pro Insights">
          <UnorderedList
            items={[
              <>Master <Bold>asynchronous programming</Bold> (Promises, async/await)</>,
              <>Understand <Bold>event loop</Bold> and how it affects performance</>,
              <>Learn <Bold>functional programming</Bold> patterns in JavaScript</>,
              <>Use <Bold>TypeScript</Bold> for type safety in production code</>,
              <>Follow <Bold>clean code</Bold> principles and patterns</>,
              <>Stay up-to-date with <Bold>ES proposals</Bold> and new features</>,
              <>Build <Bold>large-scale applications</Bold> with proper architecture</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="info" title="📊 JavaScript Ecosystem Overview">
          <UnorderedList
            items={[
              <>📦 <Bold>Package Manager:</Bold> npm, yarn, pnpm</>,
              <>⚛️ <Bold>Frontend Frameworks:</Bold> React, Vue, Angular, Svelte</>,
              <>🖥️ <Bold>Backend Frameworks:</Bold> Express, NestJS, Next.js, Nuxt</>,
              <>📱 <Bold>Mobile:</Bold> React Native, Ionic, Flutter (Dart)</>,
              <>🧪 <Bold>Testing:</Bold> Jest, Mocha, Cypress, Playwright</>,
              <>🔧 <Bold>Build Tools:</Bold> Webpack, Vite, Rollup, esbuild</>,
              <>📊 <Bold>State Management:</Bold> Redux, Zustand, MobX, Pinia</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> JavaScript is no longer just a "scripting language" - it's a <Bold>full-fledged programming language</Bold> used for everything from <Bold>AI</Bold> to <Bold>IoT</Bold>. The ecosystem is vast and continuously evolving. Master the fundamentals, then explore the ecosystem based on your interests and career goals.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> The JavaScript ecosystem moves fast. Focus on <Bold>fundamentals</Bold> (language features, patterns, and paradigms) rather than chasing every new framework. Once you master the core language, you can learn any framework or library quickly.
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
            <>JavaScript is the language of the web, used for both frontend and backend</>,
            <>It's a high-level, dynamic, interpreted programming language</>,
            <>JavaScript supports multiple programming paradigms (OOP, functional, imperative)</>,
            <>The language is continuously evolving with modern features</>,
            <>It has a massive ecosystem with frameworks like React, Vue, Angular, and Node.js</>,
            <>Understanding JavaScript is essential for any modern web developer</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Start with the fundamentals (variables, functions, objects) and gradually explore advanced concepts. JavaScript is a language that rewards practice and experimentation.
      </HLText>

      <Gap size={2} />

      {/* Resources */}
      <Title level={4}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>📚</Box>
        Recommended Learning Path
      </Title>

      <CardComponent variant="default" title="📖 Learning Resources">
        <PlainText component="div">
          • <Bold>Fundamentals:</Bold> Variables, Data Types, Functions, Objects<br />
          • <Bold>Intermediate:</Bold> DOM Manipulation, Events, Async Programming<br />
          • <Bold>Advanced:</Bold> Closures, Prototypes, Design Patterns<br />
          • <Bold>Frameworks:</Bold> React, Vue, Angular, Node.js<br />
          • <Bold>Practice:</Bold> Build projects, solve coding challenges
        </PlainText>
      </CardComponent>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> JavaScript is a language that you learn by doing. Write code every day, build projects, and don't be afraid to make mistakes - that's how you'll grow as a developer!
      </Note>
    </QuestionWrapper>
  );
}