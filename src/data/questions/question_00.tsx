// data/questions/Question04.tsx
import { Box } from '@mui/material';
import { QuestionWrapper } from '../../components/QuestionWrapper';
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

export function Question00({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question00Meta.id}
      title={question00Meta.title}
      definition={question00Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction */}
      <PlainText>
        JavaScript is a high-level, interpreted programming language that is primarily used to create interactive and dynamic content on websites. It is one of the core technologies of the World Wide Web, alongside HTML and CSS.
      </PlainText>

      <Gap size={2} />

      {/* Key Characteristics */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f7df1e', mr: 1 }}>⚡</Box>
        Key Characteristics
      </Title>

      <CardComponent variant="info" title="🎯 What Makes JavaScript Special?">
        <UnorderedList
          items={[
            <><Bold>High-level:</Bold> Abstracts away low-level details like memory management</>,
            <><Bold>Interpreted:</Bold> Executed line by line without compilation</>,
            <><Bold>Dynamic:</Bold> Types are determined at runtime</>,
            <><Bold>Prototype-based:</Bold> Objects inherit directly from other objects</>,
            <><Bold>Single-threaded:</Bold> Uses an event-driven, non-blocking model</>,
            <><Bold>Event-driven:</Bold> Responds to user interactions and events</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      {/* What JavaScript Can Do */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>🚀</Box>
        What Can JavaScript Do?
      </Title>

      <CardComponent variant="success" title="✅ JavaScript Capabilities">
        <UnorderedList
          items={[
            <>Add interactive behavior to web pages</>,
            <>Create and manipulate DOM elements</>,
            <>Handle user events (clicks, scrolls, inputs)</>,
            <>Validate form data</>,
            <>Fetch data from servers (AJAX, fetch API)</>,
            <>Build full-stack applications (Node.js)</>,
            <>Create mobile apps (React Native)</>,
            <>Build desktop apps (Electron)</>,
            <>Create games and animations</>,
            <>Work with APIs and databases</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

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
name = 42; // Works fine!`}
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
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
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

      <Gap size={2} />

      {/* Why Learn JavaScript? */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>💪</Box>
        Why Learn JavaScript?
      </Title>

      <CardComponent variant="success" title="🎯 Top Reasons">
        <UnorderedList
          items={[
            <>🌐 <Bold>Universal Language:</Bold> Works in every browser and platform</>,
            <>💼 <Bold>High Demand:</Bold> One of the most in-demand programming languages</>,
            <>🔧 <Bold>Full-Stack Development:</Bold> Use the same language for frontend and backend</>,
            <>📈 <Bold>Continuous Growth:</Bold> Actively developed with new features every year</>,
            <>🔄 <Bold>Versatile:</Bold> Web, mobile, desktop, IoT, and more</>,
            <>👥 <Bold>Large Community:</Bold> Millions of developers and tons of resources</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      {/* Simple JavaScript Example */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f472b6', mr: 1 }}>💻</Box>
        Basic JavaScript Example
      </Title>

      <CodeComponent
        code={`// Hello World in JavaScript
console.log("Hello, World!");

// Variables
let name = "JavaScript";
const year = 2024;

// Functions
function greet(person) {
    return \`Hello, \${person}!\`;
}

// Objects
const language = {
    name: "JavaScript",
    type: "Programming Language",
    year: 1995
};

// Arrays
const features = ["Dynamic", "Prototype-based", "Event-driven"];

// ES6 Classes
class Developer {
    constructor(name) {
        this.name = name;
        this.skills = [];
    }
    
    learn(skill) {
        this.skills.push(skill);
        console.log(\`\${this.name} learned \${skill}\`);
    }
}

const dev = new Developer("Alice");
dev.learn("JavaScript");
dev.learn("React");

// Output: Alice learned JavaScript
// Output: Alice learned React`}
        language="javascript"
        title="hello-javascript.js"
        defaultOpen={true}
      />

      <Gap size={2} />

      {/* Modern JavaScript */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>✨</Box>
        Modern JavaScript (ES6+)
      </Title>

      <CodeComponent
        code={`// Modern JavaScript features
// 1. Arrow functions
const add = (a, b) => a + b;

// 2. Template literals
const name = "World";
console.log(\`Hello, \${name}!\`);

// 3. Destructuring
const user = { id: 1, name: "John" };
const { id, name: userName } = user;

// 4. Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

// 5. Modules
import React from 'react';
export default function App() {}

// 6. Async/Await
async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}

// 7. Optional chaining
const user = { profile: { name: "John" } };
console.log(user.profile?.name); // John
console.log(user.profile?.age);  // undefined (no error)`}
        language="javascript"
        title="modern-javascript.js"
        defaultOpen={false}
      />

      <Gap size={2} />

      {/* Summary */}
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