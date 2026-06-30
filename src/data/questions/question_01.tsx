// data/questions/Question01.tsx
import { Box } from '@mui/material';
import { QuestionWrapper } from '../../components/QuestionWrapper';
import { LevelContent } from '../../components/LevelContent';
import {
  Title,
  PlainText,
  Bold,
  CodeComponent,
  Divider,
  Gap,
  Note,
  InlineCode,
  CardComponent,
  UnorderedList,
  TableComponent,
  HLText,
} from '../../components/content';
import { question01Meta } from './registry';
import { useLevel } from '../../context/LevelContext';

export function Question01({  isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question01Meta.id}
      title={question01Meta.title}
      definition={question01Meta.definition}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        There are many ways to create objects in JavaScript as mentioned below:
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Object Creation Basics
        </Title>

        <PlainText>
          Let's start with the <Bold>most common</Bold> and <Bold>easiest</Bold> ways to create objects in JavaScript:
        </PlainText>

        {/* 1. Object literal syntax - Beginner */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>📝</Box>
          1. Object literal syntax
        </Title>
        <PlainText>
          The object literal syntax (or object initializer), is a comma-separated set of name-value pairs wrapped in curly braces.
        </PlainText>

        <CodeComponent
          code={`var object = {
  name: "Sudheer",
  age: 34,
};`}
          language="javascript"
          title="object-literal.js"
          defaultOpen={true}
        />

        <PlainText>
          Object literal property values can be of any data type, including array, function, and nested object.
        </PlainText>

        <Note type="info">
          <Bold>📌 Note:</Bold> This is one of the easiest ways to create an object and it's most commonly used for creating simple, ad-hoc objects.
        </Note>

        <Gap size={2} />

        {/* 2. Object constructor - Beginner */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚠️</Box>
          2. Object constructor
        </Title>
        <PlainText>
          The simplest way to create an empty object is using the <InlineCode>Object</InlineCode> constructor. Currently this approach is <Bold>not recommended</Bold>.
        </PlainText>

        <CodeComponent
          code={`var object = new Object();`}
          language="javascript"
          title="object-constructor.js"
          defaultOpen={true}
        />

        <Note type="warning">
          ⚠️ This approach is not recommended for creating objects. Use <Bold>object literal syntax</Bold> instead.
        </Note>

        <Gap size={2} />

        {/* 7. ES6 Class syntax - Beginner */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#f43f5e', mr: 1 }}>✨</Box>
          7. ES6 Class syntax
        </Title>
        <PlainText>
          ES6 introduces class feature to create objects. This is <Bold>syntactic sugar</Bold> over the prototype-based system and is the <Bold>recommended</Bold> way for OOP.
        </PlainText>

        <CodeComponent
          code={`class Person {
  constructor(name) {
    this.name = name;
  }
}

var object = new Person("Sudheer");`}
          language="javascript"
          title="es6-class.js"
          defaultOpen={true}
        />

        <Note type="info">
          💡 <Bold>Tip:</Bold> ES6 Classes are now the preferred way for object-oriented programming in JavaScript. They provide a cleaner, more intuitive syntax.
        </Note>

        <CardComponent variant="success" title="✅ Beginner Summary">
          <UnorderedList
            items={[
              <>Use <Bold>object literals</Bold> for simple, one-off objects</>,
              <>Use <Bold>ES6 Classes</Bold> for object-oriented programming</>,
              <>Avoid <Bold>Object constructor</Bold> (use literals instead)</>,
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Divider sx={{ my: 3 }} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Object Creation Patterns
        </Title>

        {/* 3. Object's create method - Advanced */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>🔗</Box>
          3. Object's create method
        </Title>
        <PlainText>
          The <InlineCode>create</InlineCode> method of Object is used to create a new object by passing the specified prototype object and properties as arguments. This pattern is helpful to create new objects based on existing objects, useful for setting up <Bold>prototypal inheritance</Bold>.
        </PlainText>

        <PlainText>
          The following code creates a new empty object whose prototype is null:
        </PlainText>

        <CodeComponent
          code={`var object = Object.create(null);`}
          language="javascript"
          title="object-create.js"
          defaultOpen={true}
        />

        <PlainText>
          The following example creates an object along with additional new properties:
        </PlainText>

        <CodeComponent
          code={`let vehicle = {
  wheels: "4",
  fuelType: "Gasoline",
  color: "Green",
};

let carProps = {
  type: {
    value: "Volkswagen",
  },
  model: {
    value: "Golf",
  },
};

var car = Object.create(vehicle, carProps);
console.log(car);`}
          language="javascript"
          title="object-create-example.js"
          defaultOpen={true}
        />

        <Gap size={2} />

        {/* 4. Function constructor - Advanced */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#06b6d4', mr: 1 }}>🏗️</Box>
          4. Function constructor
        </Title>
        <PlainText>
          In this approach, create any function and apply the <InlineCode>new</InlineCode> operator to create object instances. This was the main way to do constructor-based OOP before ES6 classes.
        </PlainText>

        <CodeComponent
          code={`function Person(name) {
  this.name = name;
  this.age = 21;
}
var object = new Person("Sudheer");`}
          language="javascript"
          title="function-constructor.js"
          defaultOpen={true}
        />

        <Gap size={2} />

        {/* 5. Function constructor with prototype - Advanced */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🧬</Box>
          5. Function constructor with prototype
        </Title>
        <PlainText>
          This is similar to function constructor but it uses prototype for their properties and methods. Using prototype means you're <Bold>sharing methods/properties across instances</Bold>, which saves memory and improves performance.
        </PlainText>

        <CodeComponent
          code={`function Person() {}
Person.prototype.name = "Sudheer";
var object = new Person();`}
          language="javascript"
          title="function-prototype.js"
          defaultOpen={true}
        />

        <PlainText>
          This is equivalent to creating an instance with Object.create method with a function prototype and then calling that function with an instance and parameters as arguments:
        </PlainText>

        <CodeComponent
          code={`function func(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

var instance = new func(1, 2, 3);

// OR

function func(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
// Create a new instance using function prototype.
var newInstance = Object.create(func.prototype);

// Call the function
var result = func.call(newInstance, 1, 2, 3);

console.log(result && typeof result === 'object' ? result : newInstance);`}
          language="javascript"
          title="function-prototype-alternative.js"
          defaultOpen={false}
        />

        <Gap size={2} />

        {/* 6. Object's assign method - Advanced */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#f472b6', mr: 1 }}>📋</Box>
          6. Object's assign method
        </Title>
        <PlainText>
          The <InlineCode>Object.assign</InlineCode> method is used to copy all the properties from one or more source objects and stores them into a target object. This is mainly used for <Bold>cloning</Bold> and <Bold>merging</Bold>.
        </PlainText>

        <CodeComponent
          code={`const orgObject = { company: "XYZ Corp" };
const carObject = { name: "Toyota" };
const staff = Object.assign({}, orgObject, carObject);`}
          language="javascript"
          title="object-assign.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Advanced Comparison">
          <TableComponent
            headers={['Method', 'Use Case', 'When to Use']}
            rows={[
              ['Object.create()', 'Prototypal inheritance', 'When you need to set prototypes'],
              ['Function constructor', 'Traditional OOP', 'Pre-ES6 codebases'],
              ['Function constructor + prototype', 'Memory efficient', 'Shared methods across instances'],
              ['Object.assign()', 'Cloning/Merging', 'When you need to combine objects'],
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Divider sx={{ my: 3 }} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Patterns & Best Practices
        </Title>

        {/* 8. Singleton pattern - Expert */}
        <Title level={3}>
          <Box component="span" sx={{ color: '#ec4899', mr: 1 }}>🔒</Box>
          8. Singleton pattern
        </Title>
        <PlainText>
          A Singleton is an object which can only be instantiated <Bold>one time</Bold>. Repeated calls to its constructor return the same instance. This ensures you don't accidentally create multiple instances.
        </PlainText>

        <Title level={4}>Singleton with Closure (Classic JS Pattern)</Title>

        <CodeComponent
          code={`const Singleton = (function () {
  let instance;

  function createInstance() {
    return { name: "Sudheer" };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// Usage
const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();

console.log(obj1 === obj2); // true`}
          language="javascript"
          title="singleton-pattern.js"
          defaultOpen={true}
        />

        <PlainText>
          In modern JavaScript applications, singletons are commonly implemented using <Bold>ES6 modules</Bold> for their built-in caching behavior, or closures for encapsulated state management.
        </PlainText>

        <Note type="info">
          💡 <Bold>Pro Tip:</Bold> While singletons can be useful, be cautious about overusing them as they can make your code harder to test and debug.
        </Note>

        <Gap size={2} />

        <Title level={4}>🔬 Expert Insights: When to Use What</Title>

        <CardComponent variant="info" title="📊 Complete Comparison">
          <TableComponent
            headers={['Method', 'Use Case', 'Performance', 'Modern Usage']}
            rows={[
              ['Object literal', 'Simple objects', 'Fast', '✅ Recommended'],
              ['Object constructor', 'Avoid', 'Slow', '❌ Deprecated'],
              ['Object.create()', 'Prototypal inheritance', 'Good', '✅ Recommended'],
              ['Function constructor', 'Legacy OOP', 'Good', '⚠️ Legacy'],
              ['Function constructor + prototype', 'Shared methods', 'Good', '⚠️ Legacy'],
              ['Object.assign()', 'Cloning/Merging', 'Good', '✅ Recommended'],
              ['ES6 Classes', 'Modern OOP', 'Good', '✅ Recommended'],
              ['Singleton', 'Single instance', 'Good', '⚠️ Use sparingly'],
            ]}
          />
        </CardComponent>

        <Title level={4}>💡 Expert Tips & Best Practices</Title>

        <CardComponent variant="default" title="Pro Insights">
          <UnorderedList
            items={[
              <>For <Bold>simple objects</Bold>, always use <Bold>object literals</Bold></>,
              <>For <Bold>complex OOP</Bold>, use <Bold>ES6 Classes</Bold> (cleaner syntax)</>,
              <>Use <Bold>Object.create()</Bold> for <Bold>prototypal inheritance</Bold> without classes</>,
              <>Use <Bold>Object.assign()</Bold> for <Bold>shallow cloning</Bold> and merging</>,
              <>Avoid <Bold>constructor functions</Bold> in modern code (use classes instead)</>,
              <>Use <Bold>Singleton pattern</Bold> only when truly necessary</>,
              <>Consider <Bold>performance implications</Bold> for large-scale applications</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Modern Best Practices">
          <UnorderedList
            items={[
              <>Use <Bold>object literals</Bold> for DTOs and simple data structures</>,
              <>Use <Bold>ES6 Classes</Bold> for domain models and business logic</>,
              <>Use <Bold>Object.create()</Bold> for flexible prototypal inheritance</>,
              <>Use <Bold>Object.assign()</Bold> for immutable updates (in React, Redux)</>,
              <>Use <Bold>factory functions</Bold> for encapsulation and privacy</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Choose your object creation method based on your <Bold>use case</Bold>. For modern applications, prefer <Bold>object literals</Bold> and <Bold>ES6 Classes</Bold>. Use <Bold>Object.create()</Bold> when you need fine-grained control over prototypes. Avoid the <Bold>Object constructor</Bold> entirely.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> The <Bold>Object constructor</Bold> (<InlineCode>new Object()</InlineCode>) is considered <Bold>bad practice</Bold> in modern JavaScript. Always use <Bold>object literals</Bold> instead. It's faster, cleaner, and more readable.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* SUMMARY - Shown at all levels */}
      {/* ============================================ */}
      <Divider />

      <Title level={3}>
        <Box component="span" sx={{ color: '#fbbf24', mr: 1 }}>📌</Box>
        Summary
      </Title>
      <PlainText>
        JavaScript offers multiple ways to create objects, each with its own use cases:
      </PlainText>

      <CardComponent variant="info" title="🎯 Quick Reference">
        <UnorderedList
          items={[
            <><Bold>Object literal</Bold> - Best for simple, one-off objects</>,
            <><Bold>Object constructor</Bold> - Not recommended (use literal instead)</>,
            <><Bold>Object.create()</Bold> - Best for prototypal inheritance</>,
            <><Bold>Function constructor</Bold> - Traditional OOP approach (pre-ES6)</>,
            <><Bold>Function constructor with prototype</Bold> - Memory efficient shared methods</>,
            <><Bold>Object.assign()</Bold> - Best for cloning and merging objects</>,
            <><Bold>ES6 Classes</Bold> - Modern OOP approach (recommended)</>,
            <><Bold>Singleton pattern</Bold> - Single instance across the application</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      <Note type="success">
        📝 <Bold>Recommendation:</Bold> For most modern JavaScript applications, use <Bold>object literals</Bold> for simple objects and <Bold>ES6 Classes</Bold> for more complex object-oriented designs.
      </Note>

      {/* Quick Comparison Table */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>📊</Box>
        Quick Comparison
      </Title>

      <TableComponent
        headers={['Method', 'Use Case', 'Recommended']}
        rows={[
          ['Object literal', 'Simple objects', '✅ Yes'],
          ['Object constructor', 'Avoid', '❌ No'],
          ['Object.create()', 'Prototypal inheritance', '✅ Yes'],
          ['Function constructor', 'Legacy OOP', '⚠️ Optional'],
          ['ES6 Classes', 'Modern OOP', '✅ Yes'],
          ['Singleton', 'Single instance', '⚠️ Use sparingly'],
        ]}
      />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> When in doubt, start with <Bold>object literals</Bold>. They're simple, fast, and work perfectly for 90% of use cases. Only reach for classes or other patterns when you need more structure or reuse.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> The best way to create an object depends on your <Bold>specific use case</Bold>. Choose wisely based on your needs for simplicity, reuse, and maintainability!
      </Note>
    </QuestionWrapper>
  );
}