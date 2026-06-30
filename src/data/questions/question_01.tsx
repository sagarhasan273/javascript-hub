// data/questions/Question01.tsx
import { Box } from '@mui/material';
import { QuestionWrapper } from '../../components/QuestionWrapper';
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
} from '../../components/content';
import { question01Meta } from './registry';

export function Question01({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question01Meta.id}
      title={question01Meta.title}
      definition={question01Meta.definition}
      index={index}
      isActive={isActive}
    >
      <PlainText>
        There are many ways to create objects in JavaScript as mentioned below:
      </PlainText>

      {/* 1. Object literal syntax */}
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

      {/* 2. Object constructor */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚠️</Box>
        2. Object constructor
      </Title>
      <PlainText>
        The simplest way to create an empty object is using the <InlineCode>Object</InlineCode> constructor. Currently this approach is not recommended.
      </PlainText>

      <CodeComponent
        code={`var object = new Object();`}
        language="javascript"
        title="object-constructor.js"
        defaultOpen={true}
      />

      <PlainText>
        The <InlineCode>Object()</InlineCode> is a built-in constructor function so "new" keyword is not required for creating plain objects. The above code snippet can be re-written as:
      </PlainText>

      <CodeComponent
        code={`var object = Object();`}
        language="javascript"
        title="object-constructor-alt.js"
        defaultOpen={true}
      />

      <PlainText>
        However, <InlineCode>Object()</InlineCode> can be used to either create a plain object or convert a given value into its corresponding object wrapper, whereas <InlineCode>new Object()</InlineCode> is specifically used to explicitly create a new object instance.
      </PlainText>

      <Note type="warning">
        ⚠️ This approach is not recommended for creating objects. Use object literal syntax instead.
      </Note>

      <Gap size={2} />

      {/* 3. Object's create method */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>🔗</Box>
        3. Object's create method
      </Title>
      <PlainText>
        The <InlineCode>create</InlineCode> method of Object is used to create a new object by passing the specified prototype object and properties as arguments, i.e., this pattern is helpful to create new objects based on existing objects. In other words, this is useful for setting up prototypal inheritance. The second argument is optional and it is used to create properties on a newly created object.
      </PlainText>

      <PlainText>
        The following code creates a new empty object whose prototype is null.
      </PlainText>

      <CodeComponent
        code={`var object = Object.create(null);`}
        language="javascript"
        title="object-create.js"
        defaultOpen={true}
      />

      <PlainText>
        The following example creates an object along with additional new properties.
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

      {/* 4. Function constructor */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#06b6d4', mr: 1 }}>🏗️</Box>
        4. Function constructor
      </Title>
      <PlainText>
        In this approach, create any function and apply the new operator to create object instances. This was the main way to do constructor-based OOP before ES6 classes.
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

      {/* 5. Function constructor with prototype */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🧬</Box>
        5. Function constructor with prototype
      </Title>
      <PlainText>
        This is similar to function constructor but it uses prototype for their properties and methods. Using prototype means you're sharing methods/properties across instances, which saves memory and improves performance.
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
        This is equivalent to creating an instance with Object.create method with a function prototype and then calling that function with an instance and parameters as arguments.
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

// If the result is a non-null object then use it otherwise just use the new instance.
console.log(result && typeof result === 'object' ? result : newInstance);`}
        language="javascript"
        title="function-prototype-alternative.js"
        defaultOpen={false}
      />

      <Gap size={2} />

      {/* 6. Object's assign method */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f472b6', mr: 1 }}>📋</Box>
        6. Object's assign method
      </Title>
      <PlainText>
        The <InlineCode>Object.assign</InlineCode> method is used to copy all the properties from one or more source objects and stores them into a target object. This is mainly used for cloning and merging.
      </PlainText>

      <PlainText>
        The following code creates a new staff object by copying properties of his working company and the car he owns.
      </PlainText>

      <CodeComponent
        code={`const orgObject = { company: "XYZ Corp" };
const carObject = { name: "Toyota" };
const staff = Object.assign({}, orgObject, carObject);`}
        language="javascript"
        title="object-assign.js"
        defaultOpen={true}
      />

      <Gap size={2} />

      {/* 7. ES6 Class syntax */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f43f5e', mr: 1 }}>✨</Box>
        7. ES6 Class syntax
      </Title>
      <PlainText>
        ES6 introduces class feature to create objects. This is syntactic sugar over the prototype-based system.
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

      <Gap size={2} />

      {/* 8. Singleton pattern */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#ec4899', mr: 1 }}>🔒</Box>
        8. Singleton pattern
      </Title>
      <PlainText>
        A Singleton is an object which can only be instantiated one time. Repeated calls to its constructor return the same instance. This way one can ensure that they don't accidentally create multiple instances.
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
        In modern JavaScript applications, singletons are commonly implemented using ES6 modules for their built-in caching behavior, or closures for encapsulated state management.
      </PlainText>

      <Note type="info">
        💡 <Bold>Pro Tip:</Bold> While singletons can be useful, be cautious about overusing them as they can make your code harder to test and debug.
      </Note>

      <Divider />

      {/* Summary */}
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
    </QuestionWrapper>
  );
}