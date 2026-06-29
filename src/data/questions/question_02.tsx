// data/questions/Question02.tsx
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
      <PlainText>
        The prototype chain is a core concept in JavaScript's inheritance model. It allows objects to inherit properties and methods from other objects.
      </PlainText>

      <PlainText>
        When you try to access a property or method on an object, JavaScript first looks for it on that object itself. If it's not found, the engine looks up the object's internal <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>[[Prototype]]</code> reference (accessible via <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>Object.getPrototypeOf(obj)</code> or the deprecated <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>__proto__</code> property) and continues searching up the chain until it finds the property or reaches the end (usually <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>null</code>).
      </PlainText>

      <PlainText>
        For objects created via constructor functions, the prototype chain starts with the instance, then refers to the constructor's <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>.prototype</code> object, and continues from there. For example:
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

      <Gap size={2} />

      {/* Summary Section */}
      <Title level={3}>Summary:</Title>
      <PlainText component="div">
        • The prototype chain enables inheritance in JavaScript.<br />
        • If a property isn't found on an object, JavaScript looks up its prototype chain.<br />
        • The prototype of an object instance can be accessed with <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>Object.getPrototypeOf(obj)</code> or <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>__proto__</code>.<br />
        • The prototype of a constructor function is available via <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>constructor.prototype</code>.<br />
        • The chain ends when the prototype is <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>null</code>.
      </PlainText>

      <Gap size={2} />

      {/* Prototype Chain Table */}
      <Title level={3}>Prototype Chain Table</Title>
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

      <Note type="info">
        💡 <Bold>Key Insight:</Bold> The prototype chain is what makes JavaScript's prototypal inheritance possible. Every object has a prototype (except <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>Object.prototype</code> which points to <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>null</code>), creating a chain that allows property lookup to traverse up the hierarchy.
      </Note>

      <Gap size={2} />

      {/* Visual Example */}
      <Title level={3}>Visual Example</Title>
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
      <Title level={3}>Best Practices</Title>

      <CardComponent variant="success" title="✅ Do's">
        <PlainText>
          • Use <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>Object.getPrototypeOf()</code> to access prototypes<br />
          • Use <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>Object.setPrototypeOf()</code> carefully if needed<br />
          • Prefer ES6 classes for cleaner inheritance<br />
          • Use <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>hasOwnProperty()</code> to check for own properties
        </PlainText>
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ Don'ts">
        <PlainText>
          • Don't use <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>__proto__</code> in production (deprecated)<br />
          • Avoid modifying built-in prototypes (Array.prototype, Object.prototype)<br />
          • Don't create deep prototype chains (affects performance)<br />
          • Avoid using <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>for...in</code> without checking <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>hasOwnProperty()</code>
        </PlainText>
      </CardComponent>

      <CardComponent variant="info" title="📝 Key Takeaways">
        <PlainText>
          • The prototype chain is JavaScript's inheritance mechanism<br />
          • Properties are looked up along the chain until found or reaching <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>null</code><br />
          • Constructor functions have a <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>.prototype</code> property<br />
          • Instances have an internal <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>[[Prototype]]</code> reference<br />
          • Prototypal inheritance enables code reuse and sharing
        </PlainText>
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Understanding the prototype chain is crucial for mastering JavaScript's inheritance model and writing efficient, reusable code.
      </HLText>
    </QuestionWrapper>
  );
}