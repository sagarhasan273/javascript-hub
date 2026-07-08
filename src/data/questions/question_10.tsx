// data/questions/Question10.tsx
import { Box } from '@mui/material';
import { QuestionWrapper } from '../../components/QuestionWrapper';
import { LevelContent } from '../../components/LevelContent';
import {
  Title,
  PlainText,
  Bold,
  Divider,
  CardComponent,
  HLText,
  CodeComponent,
  Note,
  Gap,
  TableComponent,
  InlineCode,
  UnorderedList,
} from '../../components/content';
import { question10Meta } from './registry';
import { useLevel } from '../../hooks';

export function Question10({ isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question10Meta.id}
      title={question10Meta.title}
      definition={question10Meta.definition}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The prototype chain is a core concept in JavaScript's inheritance model. It allows objects to inherit properties and methods from other objects.
      </PlainText>

      <PlainText>
        When you try to access a property or method on an object, JavaScript first looks for it on that object itself. If it's not found, the engine looks up the object's internal <InlineCode>[[Prototype]]</InlineCode> reference (accessible via <InlineCode>Object.getPrototypeOf(obj)</InlineCode> or the deprecated <InlineCode>__proto__</InlineCode> property) and continues searching up the chain until it finds the property or reaches the end (usually <InlineCode>null</InlineCode>).
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding Prototypes
        </Title>

        <PlainText>
          Think of the prototype chain like a <Bold>family tree</Bold> for objects. Just like you inherit traits from your parents, objects inherit properties from their prototypes.
        </PlainText>

        <CardComponent variant="info" title="🎯 Simple Analogy">
          <PlainText>
            • <Bold>Object</Bold> = A child<br />
            • <Bold>Prototype</Bold> = Parent<br />
            • <Bold>Prototype Chain</Bold> = Family tree (grandparents, great-grandparents, etc.)
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Example: Creating a simple prototype chain</Bold>
        </PlainText>

        <CodeComponent
          code={`// Create a parent object
const animal = {
  eats: true,
  walk() {
    console.log("Animal is walking");
  }
};

// Create a child object that inherits from animal
const rabbit = {
  jumps: true,
  __proto__: animal  // rabbit inherits from animal
};

// rabbit can use properties from animal
console.log(rabbit.eats);   // true (inherited from animal)
console.log(rabbit.jumps);  // true (own property)

// rabbit can use methods from animal
rabbit.walk(); // "Animal is walking"

// How to check the prototype
console.log(Object.getPrototypeOf(rabbit) === animal); // true`}
          language="javascript"
          title="prototype-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> When you try to access a property, JavaScript looks for it on the object. If it's not there, it looks at the object's prototype, then that prototype's prototype, and so on until it finds it or reaches <InlineCode>null</InlineCode>.
        </Note>

        <CardComponent variant="success" title="✅ Key Points for Beginners">
          <UnorderedList
            items={[
              <>Every object has a <Bold>prototype</Bold> (except <InlineCode>Object.prototype</InlineCode>)</>,
              <>The <Bold>prototype chain</Bold> allows objects to share properties and methods</>,
              <>You can access an object's prototype with <InlineCode>Object.getPrototypeOf(obj)</InlineCode></>,
              <>The chain ends when the prototype is <InlineCode>null</InlineCode></>,
            ]}
          />
        </CardComponent>

        <Gap size={2} />
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Divider sx={{ my: 3 }} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Constructor Functions & Prototypes
        </Title>

        <PlainText>
          For objects created via constructor functions, the prototype chain works differently. Let's explore:
        </PlainText>

        <CodeComponent
          code={`// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding methods to the prototype
Person.prototype.greet = function() {
  return \`Hello, I'm \${this.name}\`;
};

// Creating instances
const alice = new Person('Alice', 30);
const bob = new Person('Bob', 25);

// Both instances share the same method
console.log(alice.greet()); // Hello, I'm Alice
console.log(bob.greet());   // Hello, I'm Bob

// Both instances share the same prototype
console.log(Object.getPrototypeOf(alice) === Person.prototype); // true
console.log(Object.getPrototypeOf(bob) === Person.prototype);   // true

// The prototype chain:
// alice → Person.prototype → Object.prototype → null
console.log(alice.name);                    // 'Alice' (own property)
console.log(alice.greet());                 // Found on Person.prototype
console.log(alice.toString());              // Found on Object.prototype
console.log(alice.nonExistent);             // undefined (not found)`}
          language="javascript"
          title="constructor-prototypes.js"
          defaultOpen={true}
        />

        <PlainText>
          <Bold>Understanding the Prototype Chain:</Bold>
        </PlainText>

        <CardComponent variant="info" title="📊 Prototype Chain Structure">
          <PlainText component="div">
            • <Bold>Instance</Bold> → Own properties (name, age)<br />
            • ↓ <Bold>[[Prototype]]</Bold> → <Bold>Constructor.prototype</Bold> (shared methods)<br />
            • ↓ <Bold>[[Prototype]]</Bold> → <Bold>Object.prototype</Bold> (toString, valueOf, etc.)<br />
            • ↓ <Bold>[[Prototype]]</Bold> → <Bold>null</Bold> (end of chain)
          </PlainText>
        </CardComponent>

        <TableComponent
          headers={['Object', 'Prototype', 'Description']}
          rows={[
            ['alice', 'Person.prototype', 'Instance of Person'],
            ['Person.prototype', 'Object.prototype', 'Shared methods for Person'],
            ['Object.prototype', 'null', 'Base prototype (end of chain)'],
          ]}
        />

        <Title level={4}>When to Use Prototypes (Advanced)</Title>
        <CardComponent variant="success" title="✅ Do's">
          <UnorderedList
            items={[
              <>Use <InlineCode>Object.getPrototypeOf()</InlineCode> to access prototypes</>,
              <>Use <InlineCode>Object.setPrototypeOf()</InlineCode> carefully if needed</>,
              <>Prefer ES6 classes for cleaner inheritance</>,
              <>Use <InlineCode>hasOwnProperty()</InlineCode> to check for own properties</>,
              <>Use prototypes to <Bold>share methods</Bold> across instances (memory efficient)</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="warning" title="⚠️ Don'ts">
          <UnorderedList
            items={[
              <>Don't use <InlineCode>__proto__</InlineCode> in production (deprecated)</>,
              <>Avoid modifying built-in prototypes (<InlineCode>Array.prototype</InlineCode>, <InlineCode>Object.prototype</InlineCode>)</>,
              <>Don't create deep prototype chains (affects performance)</>,
              <>Avoid using <InlineCode>for...in</InlineCode> without checking <InlineCode>hasOwnProperty()</InlineCode></>,
            ]}
          />
        </CardComponent>

        <Gap size={2} />
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Divider sx={{ my: 3 }} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Prototype Patterns
        </Title>

        <PlainText>
          Deep dive into advanced prototype patterns, performance, and best practices:
        </PlainText>

        <CodeComponent
          code={`// 1. Prototype inheritance without classes
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(\`\${this.name} makes a sound\`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific methods
Dog.prototype.bark = function() {
  console.log(\`\${this.name} barks\`);
};

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // Rex makes a sound
dog.bark();  // Rex barks

// 2. Multiple inheritance with mixins
const CanFly = {
  fly() {
    console.log(\`\${this.name} is flying\`);
  }
};

const CanSwim = {
  swim() {
    console.log(\`\${this.name} is swimming\`);
  }
};

function Duck(name) {
  this.name = name;
}

// Mix in multiple prototypes
Object.assign(Duck.prototype, CanFly, CanSwim);

const duck = new Duck('Donald');
duck.fly();  // Donald is flying
duck.swim(); // Donald is swimming

// 3. Object.create for prototypal inheritance
const animalProto = {
  init(name) {
    this.name = name;
    return this;
  },
  speak() {
    console.log(\`\${this.name} makes a sound\`);
  }
};

const cat = Object.create(animalProto).init('Whiskers');
cat.speak(); // Whiskers makes a sound

// 4. Performance optimization with prototypes
function optimizedFunction(name) {
  // Use prototype for methods, not instances
  // Avoid creating methods inside constructor
}

// 5. Checking prototype chain
function getPrototypeChain(obj) {
  const chain = [];
  let current = obj;
  while (current !== null) {
    chain.push(current);
    current = Object.getPrototypeOf(current);
  }
  return chain;
}

console.log(getPrototypeChain(dog));
// [Dog, Animal, Object.prototype, null]`}
          language="javascript"
          title="expert-patterns.js"
          defaultOpen={false}
        />

        <Title level={4}>⚡ Performance Considerations</Title>

        <CardComponent variant="info" title="Performance Tips">
          <UnorderedList
            items={[
              <>Prototype lookups are <Bold>slower</Bold> than own property lookups</>,
              <>Deep prototype chains <Bold>decrease</Bold> performance</>,
              <>Methods on prototype are <Bold>shared</Bold> across instances (memory efficient)</>,
              <>In JavaScript engines, prototype lookups are heavily optimized</>,
              <>Use <Bold>Object.create(null)</Bold> for pure dictionary objects (no prototype chain)</>,
            ]}
          />
        </CardComponent>

        <Title level={4}>💡 Expert Tips</Title>

        <CardComponent variant="default" title="Pro Insights">
          <UnorderedList
            items={[
              <>Use <Bold>ES6 Classes</Bold> for cleaner prototype syntax</>,
              <>Understand the difference between <InlineCode>prototype</InlineCode> and <InlineCode>[[Prototype]]</InlineCode></>,
              <>Use <Bold>Object.create()</Bold> for simple prototypal inheritance</>,
              <>Avoid modifying built-in prototypes (<Bold>never</Bold> extend <InlineCode>Array.prototype</InlineCode>)</>,
              <>Use <Bold>Object.getPrototypeOf()</Bold> instead of <InlineCode>__proto__</InlineCode></>,
              <>Understand that <Bold>prototype chain</Bold> lookups are dynamic (can be changed at runtime)</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The prototype chain is JavaScript's native inheritance mechanism. While ES6 classes provide a cleaner syntax, they are <Bold>syntactic sugar</Bold> over the prototype system. Understanding prototypes is essential for advanced JavaScript development.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> While prototypes are powerful, don't over-engineer inheritance hierarchies. Prefer <Bold>composition over inheritance</Bold> and use ES6 classes when possible. Deep prototype chains can make code <Bold>harder to understand and debug</Bold>.
        </Note>

        <Gap size={2} />
      </LevelContent>

      {/* ============================================ */}
      {/* SUMMARY - Shown at all levels */}
      {/* ============================================ */}
      <Divider />

      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>📌</Box>
        Summary
      </Title>

      <Box
        sx={{
          bgcolor: 'rgba(96, 165, 250, 0.04)',
          borderRadius: 2,
          p: 3,
          border: '1px solid',
          borderColor: 'rgba(96, 165, 250, 0.1)',
          mb: 3,
        }}
      >
        <PlainText component="div">
          • The prototype chain enables <Bold>inheritance</Bold> in JavaScript.<br />
          • If a property isn't found on an object, JavaScript looks up its <Bold>prototype chain</Bold>.<br />
          • The prototype of an object instance can be accessed with <InlineCode>Object.getPrototypeOf(obj)</InlineCode>.<br />
          • The prototype of a constructor function is available via <InlineCode>constructor.prototype</InlineCode>.<br />
          • The chain ends when the prototype is <InlineCode>null</InlineCode>.<br />
          • ES6 classes are <Bold>syntactic sugar</Bold> over the prototype system.
        </PlainText>
      </Box>

      {/* Prototype Chain Diagram - Shown at all levels */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#ec4899', mr: 1 }}>🔗</Box>
        Prototype Chain Diagram
      </Title>
      <PlainText>
        Here's a visual representation of the prototype chain:
      </PlainText>

      <Box
        sx={{
          bgcolor: '#0a0f1e',
          borderRadius: 2,
          p: 3,
          overflowX: 'auto',
          border: '1px solid rgba(255,255,255,0.05)',
          my: 2,
          fontFamily: 'monospace',
          fontSize: '0.9rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box sx={{ 
            bgcolor: 'rgba(96, 165, 250, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #2563eb',
            minWidth: 120,
            textAlign: 'center',
          }}>
            <Box sx={{ color: '#60a5fa', fontWeight: 700 }}>instance</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>({'{...}'})</Box>
          </Box>

          <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.5rem' }}>→</Box>

          <Box sx={{ 
            bgcolor: 'rgba(139, 92, 246, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #8b5cf6',
            minWidth: 120,
            textAlign: 'center',
          }}>
            <Box sx={{ color: '#a78bfa', fontWeight: 700 }}>Constructor.prototype</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>(shared methods)</Box>
          </Box>

          <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.5rem' }}>→</Box>

          <Box sx={{ 
            bgcolor: 'rgba(251, 191, 36, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #fbbf24',
            minWidth: 120,
            textAlign: 'center',
          }}>
            <Box sx={{ color: '#fcd34d', fontWeight: 700 }}>Object.prototype</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>(base prototype)</Box>
          </Box>

          <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.5rem' }}>→</Box>

          <Box sx={{ 
            bgcolor: 'rgba(239, 68, 68, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #ef4444',
            minWidth: 80,
            textAlign: 'center',
          }}>
            <Box sx={{ color: '#fca5a5', fontWeight: 700 }}>null</Box>
          </Box>
        </Box>
      </Box>

      <Note type="info" icon="🔍">
        <Bold>Visual Explanation:</Bold> The chain starts from the instance → goes to the constructor's prototype → then to Object.prototype → and finally ends at null. This is the complete prototype chain lookup path.
      </Note>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Understanding the prototype chain is crucial for mastering JavaScript's inheritance model and writing efficient, reusable code. It's the foundation for <Bold>object-oriented</Bold> and <Bold>functional</Bold> programming in JavaScript.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> The prototype chain is what makes JavaScript's prototypal inheritance possible. Master it, and you'll unlock the full power of the language!
      </Note>
    </QuestionWrapper>
  );
}