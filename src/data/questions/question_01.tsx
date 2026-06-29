// components/questions/Question01.tsx
import { QuestionWrapper } from '../../components/QuestionWrapper';
import {
  Title,
  PlainText,
  Bold,
  CodeComponent,
  OrderedList,
  Divider,
  Gap,
  HLText,
  CardComponent,
  CentralText,
} from '../../components/content';

interface Question01Props {
  index?: number;
  isActive?: boolean;
}

export function Question01({ index = 0, isActive = false }: Question01Props) {
  return (
    <QuestionWrapper
      id={1}
      title="What are the possible ways to create objects in JavaScript"
      definition="There are multiple ways to create objects: object literals, constructors, Object.create(), functions, classes, and singletons."
      index={index}
      isActive={isActive}
    >
      <PlainText>
        There are many ways to create objects in JavaScript:
      </PlainText>

      <OrderedList
        items={[
          <><Bold>Object literal syntax:</Bold> The easiest way using curly braces.</>,
          <><Bold>Object constructor:</Bold> Using <CodeComponent inline>new Object()</CodeComponent> (not recommended).</>,
          <><Bold>Object's create method:</Bold> Creates object with specified prototype.</>,
          <><Bold>Function constructor:</Bold> Using function with <CodeComponent inline>new</CodeComponent> keyword.</>,
          <><Bold>Function constructor with prototype:</Bold> Shared properties across instances.</>,
          <><Bold>Object's assign method:</Bold> Copy properties from source objects.</>,
          <><Bold>ES6 Class syntax:</Bold> Syntactic sugar over prototype system.</>,
          <><Bold>Singleton pattern:</Bold> Object instantiated only once.</>,
        ]}
      />

      <Title level={3}>Code Examples</Title>
      
      <CodeComponent>{`// Object literal
const person = {
  name: "Sudheer",
  age: 34,
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
};

// Object.create
const personPrototype = {
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
};
const person2 = Object.create(personPrototype);
person2.name = "Sudheer";
person2.age = 34;

// Function constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person3 = new Person("Sudheer", 34);

// ES6 Class
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
}
const person4 = new PersonClass("Sudheer", 34);`}</CodeComponent>

      <Divider />

      <Title level={3}>Best Practices</Title>
      
      <CardComponent variant="success" title="✅ When to Use Object Literal">
        <PlainText>Use object literals for simple, one-off objects that don't need to be reused.</PlainText>
      </CardComponent>

      <CardComponent variant="info" title="💡 When to Use Classes">
        <PlainText>Use ES6 Classes for creating multiple instances with shared behavior.</PlainText>
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ When to Avoid Constructors">
        <PlainText>Avoid using <CodeComponent inline>new Object()</CodeComponent> as it's more verbose and slower.</PlainText>
      </CardComponent>

      <Gap size={3} />

      <CentralText>
        <HLText type="info">💡 Choose the right method based on your use case!</HLText>
      </CentralText>

      <PlainText variant="caption" color="grey.500">
        Learn more about object creation in the Advanced Topics section.
      </PlainText>
    </QuestionWrapper>
  );
}