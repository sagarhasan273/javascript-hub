// data/questions/Question35.tsx
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
  UnorderedList,
} from "../../components/content";
import { question35Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question35({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question35Meta.id}
      title={question35Meta.title}
      definition={question35Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Modules</Bold> are essential in JavaScript because they solve critical problems that arise when building <Bold>large-scale applications</Bold>. Without modules, code becomes <Bold>unmanageable</Bold>, <Bold>hard to debug</Bold>, and <Bold>difficult to maintain</Bold>.
      </PlainText>

      <PlainText>
        Modules provide a way to <Bold>organize</Bold>, <Bold>encapsulate</Bold>, and <Bold>reuse</Bold> code across different parts of an application, making development <Bold>scalable</Bold> and <Bold>maintainable</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Why We Need Modules
        </Title>

        <PlainText>
          Think of modules like <Bold>organizing your room</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🧹 Analogy">
          <PlainText>
            Imagine your room (your codebase) with everything thrown everywhere. Clothes, books, electronics all mixed up. Finding anything is a nightmare. Now imagine organizing everything into boxes (modules) - clothes in one box, books in another, electronics in another. Suddenly, everything is <Bold>easy to find</Bold>, <Bold>easy to maintain</Bold>, and <Bold>easy to share</Bold>.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Problems Without Modules:</Bold>
        </PlainText>

        <CodeComponent
          code={`// -------- PROBLEM 1: Global Scope Pollution --------
// Without modules, everything goes into global scope
let userName = 'John';
let userAge = 30;
let userEmail = 'john@example.com';

function getUserInfo() {
  return { name: userName, age: userAge };
}

// Another file (or developer) might accidentally override
let userName = 'Jane'; // Oops! Now we've lost John

// -------- PROBLEM 2: Name Conflicts --------
// Two different developers create functions with the same name
function calculateTotal(items) {
  // Calculate from items array
  return items.reduce((sum, item) => sum + item, 0);
}

// Later in another part of the code
function calculateTotal(price, tax) {
  // Calculate from price and tax
  return price + (price * tax / 100);
}
// Which one will be used? Confusing!

// -------- PROBLEM 3: Dependencies Are Unclear --------
// It's hard to know what code depends on what
// Changing one function might break something else
// No clear import/export structure

// -------- PROBLEM 4: No Encapsulation --------
// All variables and functions are public
// Can't hide internal implementation details
// Anyone can modify anything`}
          language="javascript"
          title="modules-problems.js"
          defaultOpen={true}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Key Point:</Bold> Without modules, code becomes <Bold>unorganized</Bold>, <Bold>hard to maintain</Bold>, and <Bold>prone to errors</Bold>.
        </Note>

        <CardComponent variant="success" title="✅ Solutions Modules Provide">
          <PlainText component="div">
            • 📦 <Bold>Encapsulation:</Bold> Keep code isolated and organized<br />
            • 🔒 <Bold>Privacy:</Bold> Control what's public and private<br />
            • 🔄 <Bold>Reusability:</Bold> Use the same code across projects<br />
            • 📋 <Bold>Clear Dependencies:</Bold> Know what depends on what<br />
            • 🤝 <Bold>Collaboration:</Bold> Multiple developers can work separately<br />
            • 🧹 <Bold>No Global Pollution:</Bold> Variables stay in their module
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
          Advanced: Benefits of Modules
        </Title>

        <PlainText>
          Deep dive into the benefits of using modules:
        </PlainText>

        <CodeComponent
          code={`// -------- 1. Encapsulation and Privacy --------
// module.js
const privateData = new WeakMap();

class UserModule {
  constructor(name, email) {
    privateData.set(this, {
      name,
      email,
      createdAt: Date.now()
    });
  }
  
  getInfo() {
    return privateData.get(this);
  }
  
  // Private methods stay private
  _validateEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }
  
  updateEmail(newEmail) {
    if (this._validateEmail(newEmail)) {
      const data = privateData.get(this);
      data.email = newEmail;
      return true;
    }
    return false;
  }
}

export default UserModule;

// -------- 2. Code Organization --------
// user-service.js
export function getUser(id) {
  // Implementation
}

export function updateUser(id, data) {
  // Implementation
}

export function deleteUser(id) {
  // Implementation
}

// order-service.js
export function createOrder(userId, items) {
  // Implementation
}

export function getOrder(id) {
  // Implementation
}

// app.js
import { getUser, updateUser } from './user-service.js';
import { createOrder } from './order-service.js';

// Clear separation of concerns!

// -------- 3. Dependency Management --------
// services.js
import { logger } from './logger.js';
import { api } from './api.js';

export function processData(data) {
  logger.info('Processing data...');
  const result = api.post('/process', data);
  logger.success('Data processed');
  return result;
}

// -------- 4. Reusability --------
// utils.js
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function formatCurrency(amount) {
  return \`$\${amount.toFixed(2)}\`;
}

// This can be reused across all modules!

// -------- 5. Testing --------
// Each module can be tested independently
// No need to worry about global state
// test/user-service.test.js
import { getUser } from '../user-service.js';

test('getUser returns correct user', async () => {
  const user = await getUser(1);
  expect(user).toMatchObject({
    id: 1,
    name: expect.any(String)
  });
});`}
          language="javascript"
          title="modules-benefits.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Key Benefits Summary">
          <TableComponent
            headers={['Benefit', 'Description', 'Impact']}
            rows={[
              ['Encapsulation', 'Hide internal details', 'Cleaner APIs'],
              ['Reusability', 'Share code across projects', 'Faster development'],
              ['Organization', 'Group related code', 'Easier maintenance'],
              ['Dependencies', 'Explicit imports/exports', 'Clear relationships'],
              ['Testing', 'Isolated unit tests', 'Better test coverage'],
              ['Scalability', 'Add features without breaking', 'Teams work in parallel'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Modules make your code <Bold>self-documenting</Bold>. When you import from a module, it's clear where the code comes from.
        </Note>

        <CardComponent variant="warning" title="⚠️ Without Modules, You Face:">
          <UnorderedList
            items={[
              <>🌍 <Bold>Global Pollution:</Bold> Everything in the global namespace</>,
              <>🔄 <Bold>Name Conflicts:</Bold> Two developers use the same name</>,
              <>🧩 <Bold>Spaghetti Code:</Bold> Tightly coupled, hard to follow</>,
              <>🐛 <Bold>Hard to Debug:</Bold> Can't trace where things come from</>,
              <>📈 <Bold>No Scalability:</Bold> Can't grow the codebase</>,
              <>🤝 <Bold>Poor Collaboration:</Bold> Teams can't work independently</>,
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
          Expert: Advanced Module Benefits
        </Title>

        <PlainText>
          Expert-level understanding of module benefits:
        </PlainText>

        <CodeComponent
          code={`// -------- 1. Tree Shaking --------
// Only import what you use
// utils.js
export function usedFunction() { /* ... */ }
export function unusedFunction() { /* ... */ }

// app.js
import { usedFunction } from './utils.js';
// unusedFunction is not included in bundle

// -------- 2. Code Splitting --------
// Load modules on demand
const module = await import('./heavy-module.js');
module.doSomething();

// -------- 3. Lazy Loading --------
// HomePage.js
const LazyComponent = React.lazy(() => import('./LazyComponent.js'));

// -------- 4. Circular Dependencies --------
// Module A
import { b } from './b.js';
export const a = 'A';

// Module B
import { a } from './a.js';
export const b = 'B';

// ES6 modules handle this gracefully!

// -------- 5. Build Optimization --------
// Vendors can be split into separate chunks
// Shared dependencies are automatically deduplicated

// -------- 6. Better Error Messages --------
// Instead of "undefined is not a function"
// You get "Cannot read property of undefined from module.js"

// -------- 7. Cache Management --------
// Modules can be versioned and cached separately
// Change one module without affecting others

// -------- 8. Dependency Injection --------
// services.js
export const logger = {
  log: (msg) => console.log(msg)
};

// app.js
import { logger } from './services.js';

// Mock for testing
jest.mock('./services.js', () => ({
  logger: { log: jest.fn() }
}));

// -------- 9. Type Safety --------
// With TypeScript, modules provide type information
import type { User } from './types.js';

// -------- 10. Microservices Architecture --------
// Each module can be its own service
// Independent deployment and scaling`}
          language="javascript"
          title="modules-expert-benefits.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Advanced Benefits">
          <PlainText component="div">
            • <Bold>Tree Shaking:</Bold> Remove unused code from bundles<br />
            • <Bold>Code Splitting:</Bold> Load only what's needed<br />
            • <Bold>Lazy Loading:</Bold> Defer loading of heavy modules<br />
            • <Bold>Build Optimization:</Bold> Better caching and performance<br />
            • <Bold>Type Safety:</Bold> Better IDE support with TypeScript<br />
            • <Bold>Microservices:</Bold> Independent services from modules
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use modules for <Bold>code organization</Bold> and <Bold>separation of concerns</Bold></>,
              <>Leverage <Bold>tree shaking</Bold> for smaller bundles</>,
              <>Use <Bold>code splitting</Bold> for faster initial load</>,
              <>Implement <Bold>lazy loading</Bold> for large modules</>,
              <>Use <Bold>TypeScript</Bold> for type-safe module imports</>,
              <>Consider <Bold>microservices</Bold> for large applications</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Module Best Practices">
          <PlainText component="div">
            • <Bold>Single Responsibility:</Bold> Each module does one thing well<br />
            • <Bold>Explicit Imports:</Bold> Import only what you need<br />
            • <Bold>Consistent Exports:</Bold> Use named exports for multiple items<br />
            • <Bold>Avoid Side Effects:</Bold> Keep modules pure when possible<br />
            • <Bold>Version Control:</Bold> Manage module versions carefully<br />
            • <Bold>Documentation:</Bold> Document module APIs clearly
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Modules are <Bold>fundamental</Bold> to modern JavaScript development. They enable <Bold>scalable architecture</Bold>, <Bold>efficient collaboration</Bold>, and <Bold>maintainable codebases</Bold>. Without modules, building large applications would be <Bold>nearly impossible</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Modules are <Bold>not optional</Bold> for modern JavaScript development. They provide <Bold>organization</Bold>, <Bold>encapsulation</Bold>, <Bold>reusability</Bold>, and <Bold>scalability</Bold> that are <Bold>essential</Bold> for any serious project.
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
            <>Modules provide <Bold>encapsulation</Bold> and <Bold>privacy</Bold></>,
            <>They prevent <Bold>global namespace pollution</Bold></>,
            <>Modules make code <Bold>reusable</Bold> and <Bold>maintainable</Bold></>,
            <>They enable <Bold>clear dependency management</Bold></>,
            <>Modules support <Bold>scalable development</Bold></>,
            <>They enable <Bold>code splitting</Bold> and <Bold>tree shaking</Bold></>,
            <>Modules are <Bold>essential</Bold> for modern JavaScript applications</>,
            <>They make <Bold>collaboration</Bold> easier in teams</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Start using modules from day one of your project. It's <Bold>easier</Bold> to organize code from the beginning than to refactor later. Modules make your code <Bold>scalable</Bold> and <Bold>maintainable</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Modules are the <Bold>cornerstone</Bold> of modern JavaScript development. They're not just a feature - they're a <Bold>necessity</Bold> for building reliable, maintainable applications!
      </Note>
    </QuestionWrapper>
  );
}