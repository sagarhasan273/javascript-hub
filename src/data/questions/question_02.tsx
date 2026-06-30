// data/questions/Question02.tsx
import { Box } from '@mui/material';
import { QuestionWrapper } from '../../components/QuestionWrapper';
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
} from '../../components/content';
import { question02Meta } from './registry';

export function Question02({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question02Meta.id}
      title={question02Meta.title}
      definition={question02Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction */}
      <PlainText>
        The prototype chain is a core concept in JavaScript's inheritance model. It allows objects to inherit properties and methods from other objects.
      </PlainText>

      <PlainText>
        When you try to access a property or method on an object, JavaScript first looks for it on that object itself. If it's not found, the engine looks up the object's internal <InlineCode>[[Prototype]]</InlineCode> reference (accessible via <InlineCode>Object.getPrototypeOf(obj)</InlineCode> or the deprecated <InlineCode>__proto__</InlineCode> property) and continues searching up the chain until it finds the property or reaches the end (usually <InlineCode>null</InlineCode>).
      </PlainText>

      <PlainText>
        For objects created via constructor functions, the prototype chain starts with the instance, then refers to the constructor's <InlineCode>.prototype</InlineCode> object, and continues from there. For example:
      </PlainText>

      <CodeComponent
        code={`function Person() {}
const person1 = new Person();

console.log(Object.getPrototypeOf(person1) === Person.prototype); // true`}
        language="javascript"
        title="prototype-chain.js"
        defaultOpen={true}
      />

      <PlainText>
        This mechanism allows for property and method sharing among objects, enabling code reuse and a form of inheritance.
      </PlainText>

      <Gap size={3} />

      {/* Summary Section with better visual */}
      <Box
        sx={{
          bgcolor: 'rgba(96, 165, 250, 0.04)',
          borderRadius: 2,
          p: 3,
          border: '1px solid',
          borderColor: 'rgba(96, 165, 250, 0.1)',
        }}
      >
        <Title level={3} sx={{ color: '#2563eb', mt: 0 }}>
          📋 Summary
        </Title>
        <PlainText component="div">
          • The prototype chain enables inheritance in JavaScript.<br />
          • If a property isn't found on an object, JavaScript looks up its prototype chain.<br />
          • The prototype of an object instance can be accessed with <InlineCode>Object.getPrototypeOf(obj)</InlineCode> or <InlineCode>__proto__</InlineCode>.<br />
          • The prototype of a constructor function is available via <InlineCode>constructor.prototype</InlineCode>.<br />
          • The chain ends when the prototype is <InlineCode>null</InlineCode>.
        </PlainText>
      </Box>

      <Gap size={3} />

      {/* Prototype Chain Table */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>📊</Box>
        Prototype Chain Table
      </Title>
      <PlainText>
        The prototype chain among objects appears as below:
      </PlainText>

      <TableComponent
        headers={['Object', 'Prototype']}
        rows={[
          ['Employee', 'Person'],
          ['Person', 'Object.prototype'],
          ['Object.prototype', 'null'],
        ]}
      />

      <Note type="info" icon="💡">
        <Bold>Key Insight:</Bold> The prototype chain is what makes JavaScript's prototypal inheritance possible. Every object has a prototype (except <InlineCode>Object.prototype</InlineCode> which points to <InlineCode>null</InlineCode>), creating a chain that allows property lookup to traverse up the hierarchy.
      </Note>

      <Gap size={3} />

      {/* Visual Example */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#06b6d4', mr: 1 }}>🔍</Box>
        Visual Example
      </Title>
      <PlainText>
        Here's how the prototype chain works in practice:
      </PlainText>

      <CodeComponent
        code={`// Creating a prototype chain
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  }
};

const rabbit = {
  jumps: true,
  __proto__: animal
};

const dog = {
  barks: true,
  __proto__: animal
};

console.log(rabbit.eats);   // true (inherited from animal)
console.log(rabbit.jumps);  // true (own property)
console.log(dog.eats);      // true (inherited from animal)
console.log(dog.barks);     // true (own property)

// Checking the prototype chain
console.log(Object.getPrototypeOf(rabbit) === animal); // true
console.log(Object.getPrototypeOf(animal) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype) === null); // true`}
        language="javascript"
        title="prototype-chain-example.js"
        defaultOpen={true}
      />

      <Divider />

      {/* Best Practices */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#fbbf24', mr: 1 }}>⭐</Box>
        Best Practices
      </Title>

      <Gap size={1} />

      <CardComponent variant="success" title="✅ Do's">
        <PlainText component="div" sx={{ mb: 0 }}>
          • Use <InlineCode>Object.getPrototypeOf()</InlineCode> to access prototypes<br />
          • Use <InlineCode>Object.setPrototypeOf()</InlineCode> carefully if needed<br />
          • Prefer ES6 classes for cleaner inheritance<br />
          • Use <InlineCode>hasOwnProperty()</InlineCode> to check for own properties
        </PlainText>
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ Don'ts">
        <PlainText component="div" sx={{ mb: 0 }}>
          • Don't use <InlineCode>__proto__</InlineCode> in production (deprecated)<br />
          • Avoid modifying built-in prototypes (Array.prototype, Object.prototype)<br />
          • Don't create deep prototype chains (affects performance)<br />
          • Avoid using <InlineCode>for...in</InlineCode> without checking <InlineCode>hasOwnProperty()</InlineCode>
        </PlainText>
      </CardComponent>

      <CardComponent variant="info" title="📝 Key Takeaways">
        <PlainText component="div" sx={{ mb: 0 }}>
          • The prototype chain is JavaScript's inheritance mechanism<br />
          • Properties are looked up along the chain until found or reaching <InlineCode>null</InlineCode><br />
          • Constructor functions have a <InlineCode>.prototype</InlineCode> property<br />
          • Instances have an internal <InlineCode>[[Prototype]]</InlineCode> reference<br />
          • Prototypal inheritance enables code reuse and sharing
        </PlainText>
      </CardComponent>

      <Gap size={2} />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Understanding the prototype chain is crucial for mastering JavaScript's inheritance model and writing efficient, reusable code.
      </HLText>

      <Gap size={3} />

      {/* Prototype Chain Diagram */}
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
    </QuestionWrapper>
  );
}