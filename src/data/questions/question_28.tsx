// data/questions/Question28.tsx
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
import { question28Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question28({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question28Meta.id}
      title={question28Meta.title}
      definition={question28Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>ES6 Classes</Bold> are a <Bold>syntactic sugar</Bold> over JavaScript's existing prototype-based inheritance. They provide a <Bold>cleaner</Bold>, <Bold>more intuitive</Bold> way to create objects and handle inheritance, making JavaScript code look and feel more like traditional object-oriented programming languages.
      </PlainText>

      <PlainText>
        Classes in ES6 introduce a <Bold>class keyword</Bold>, <Bold>constructor methods</Bold>, <Bold>static methods</Bold>, <Bold>getters/setters</Bold>, and <Bold>inheritance</Bold> with <InlineCode>extends</InlineCode> and <InlineCode>super</InlineCode>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What are ES6 Classes?
        </Title>

        <PlainText>
          Classes are like <Bold>blueprints</Bold> for creating objects:
        </PlainText>

        <CardComponent variant="info" title="🏗️ Analogy">
          <PlainText>
            Think of a class as a <Bold>blueprint</Bold> for a house. The blueprint defines what the house will have (rooms, doors, windows) and what it can do. You can use the same blueprint to build <Bold>multiple houses</Bold> (instances), each with the same structure but different details.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Class Syntax:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Basic class definition
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, my name is \${this.name} and I'm \${this.age} years old.\`;
  }
}

// 2. Creating instances
const john = new Person('John', 30);
const jane = new Person('Jane', 25);

console.log(john.greet()); // Hello, my name is John and I'm 30 years old.
console.log(jane.greet()); // Hello, my name is Jane and I'm 25 years old.

// 3. Class with methods
class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  multiply(a, b) {
    return a * b;
  }
  
  divide(a, b) {
    if (b === 0) return 'Cannot divide by zero';
    return a / b;
  }
}

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
console.log(calc.multiply(4, 2)); // 8

// 4. Class with static methods
class MathUtils {
  static square(x) {
    return x * x;
  }
  
  static cube(x) {
    return x * x * x;
  }
}

console.log(MathUtils.square(5)); // 25
console.log(MathUtils.cube(3)); // 27
// No need to create an instance for static methods!`}
          language="javascript"
          title="classes-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Classes are <Bold>blueprints</Bold> for creating objects. Use the <InlineCode>new</InlineCode> keyword to create instances of a class.
        </Note>

        <CardComponent variant="success" title="✅ Key Features (Beginner)">
          <PlainText component="div">
            • <Bold>Constructor:</Bold> Initializes new instances<br />
            • <Bold>Methods:</Bold> Functions defined inside the class<br />
            • <Bold>Static Methods:</Bold> Methods called on the class itself<br />
            • <Bold>Inheritance:</Bold> Extend classes with <InlineCode>extends</InlineCode><br />
            • <Bold>Super:</Bold> Call parent class methods with <InlineCode>super()</InlineCode>
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
          Advanced: Classes Deep Dive
        </Title>

        <PlainText>
          Advanced class features and patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Inheritance with extends
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound.\`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    console.log(\`\${this.name} barks!\`);
  }
  
  fetch() {
    console.log(\`\${this.name} fetches the ball.\`);
  }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // Rex barks!
dog.fetch(); // Rex fetches the ball.

// 2. Getters and Setters
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  get fullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  }
  
  set fullName(value) {
    const [first, last] = value.split(' ');
    this.firstName = first;
    this.lastName = last;
  }
}

const user = new User('John', 'Doe');
console.log(user.fullName); // John Doe
user.fullName = 'Jane Smith';
console.log(user.firstName); // Jane
console.log(user.lastName); // Smith

// 3. Private fields (ES2022)
class BankAccount {
  #balance = 0; // Private field
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount > this.#balance) {
      console.log('Insufficient funds');
      return;
    }
    this.#balance -= amount;
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300
// console.log(account.#balance); // SyntaxError: Private field

// 4. Static properties and methods
class Configuration {
  static API_URL = 'https://api.example.com';
  static TIMEOUT = 5000;
  
  static getConfig() {
    return {
      apiUrl: this.API_URL,
      timeout: this.TIMEOUT
    };
  }
}

console.log(Configuration.API_URL); // https://api.example.com
console.log(Configuration.getConfig());

// 5. Class expressions
const Rectangle = class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
};

const rect = new Rectangle(10, 5);
console.log(rect.getArea()); // 50`}
          language="javascript"
          title="classes-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 ES6 Classes vs Traditional Constructor Functions">
          <TableComponent
            headers={['Feature', 'ES6 Class', 'Constructor Function']}
            rows={[
              ['Syntax', 'Cleaner', 'Verbose'],
              ['Constructor', 'constructor()', 'function Person()'],
              ['Methods', 'Defined inside class', 'Added to prototype'],
              ['Inheritance', 'extends keyword', 'Object.create()'],
              ['Super', 'super()', 'ParentClass.call(this)'],
              ['Static Methods', 'static keyword', 'Function.property'],
              ['Getters/Setters', 'Built-in', 'Custom functions'],
              ['Private Fields', '✅ (ES2022)', '❌ (Closures needed)'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Classes in JavaScript are <Bold>syntactic sugar</Bold> over prototypes. Understanding prototypes will help you understand classes better.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Mistakes">
          <UnorderedList
            items={[
              <>Forgetting to call <InlineCode>super()</InlineCode> in child class constructor</>,
              <>Using arrow functions for methods (can cause binding issues)</>,
              <>Trying to access private fields outside the class</>,
              <>Not using <InlineCode>new</InlineCode> to create instances</>,
              <>Confusing static and instance methods</>,
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
          Expert: Advanced Class Patterns
        </Title>

        <PlainText>
          Expert-level class patterns and best practices:
        </PlainText>

        <CodeComponent
          code={`// 1. Mixins with classes
const LoggingMixin = (Base) => class extends Base {
  log(message) {
    console.log(\`[\${new Date().toISOString()}]\`, message);
  }
};

const ValidationMixin = (Base) => class extends Base {
  validateEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

class AppUser extends ValidationMixin(LoggingMixin(User)) {
  constructor(name, email) {
    super(name);
    this.email = email;
  }
  
  register() {
    if (this.validateEmail(this.email)) {
      this.log(\`User \${this.name} registered successfully\`);
    } else {
      this.log('Invalid email');
    }
  }
}

const user = new AppUser('John', 'john@example.com');
user.register(); // [2024-...] User John registered successfully

// 2. Singleton pattern with classes
class DatabaseConnection {
  static instance = null;
  
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connectionString = 'mongodb://localhost:27017';
    this.isConnected = false;
    DatabaseConnection.instance = this;
  }
  
  connect() {
    this.isConnected = true;
    console.log('Connected to database');
    return this;
  }
  
  disconnect() {
    this.isConnected = false;
    console.log('Disconnected from database');
    return this;
  }
}

const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true (same instance)

// 3. Factory pattern with classes
class Product {
  constructor(name, price, type) {
    this.name = name;
    this.price = price;
    this.type = type;
  }
  
  getInfo() {
    return \`\${this.name} - \${this.price} (\${this.type})\`;
  }
}

class ProductFactory {
  create(type, name, price) {
    switch(type) {
      case 'electronics':
        return new Product(name, price, 'Electronics');
      case 'clothing':
        return new Product(name, price, 'Clothing');
      case 'food':
        return new Product(name, price, 'Food');
      default:
        throw new Error('Invalid product type');
    }
  }
}

const factory = new ProductFactory();
const laptop = factory.create('electronics', 'Laptop', 999);
const shirt = factory.create('clothing', 'T-Shirt', 25);
console.log(laptop.getInfo()); // Laptop - 999 (Electronics)

// 4. Abstract classes pattern
class BaseService {
  constructor() {
    if (this.constructor === BaseService) {
      throw new Error('Cannot instantiate abstract class');
    }
  }
  
  process(data) {
    throw new Error('Method must be implemented');
  }
}

class UserService extends BaseService {
  process(data) {
    console.log('Processing user data:', data);
    return data;
  }
}

class OrderService extends BaseService {
  process(data) {
    console.log('Processing order data:', data);
    return data;
  }
}

// 5. Mixin composition
function compose(...mixins) {
  return (Base) => mixins.reduce((acc, mixin) => mixin(acc), Base);
}

const TimestampMixin = (Base) => class extends Base {
  getTimestamp() {
    return new Date().toISOString();
  }
};

const IDMixin = (Base) => class extends Base {
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
};

class Event {
  constructor(name) {
    this.name = name;
  }
}

class TrackedEvent extends compose(TimestampMixin, IDMixin)(Event) {
  constructor(name) {
    super(name);
    this.id = this.generateId();
    this.timestamp = this.getTimestamp();
  }
}

const event = new TrackedEvent('Login');
console.log(event); // { name: 'Login', id: 'abc123', timestamp: '2024-...' }

// 6. Class decorators (experimental)
function readonly(target, propertyKey, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Product {
  @readonly
  name = 'Default';
  
  constructor(name) {
    this.name = name;
  }
}

// 7. Performance considerations
class OptimizedClass {
  // Use prototype methods for shared behavior
  method1() { /* shared */ }
  method2() { /* shared */ }
  
  // Use class fields for instance-specific data
  value = 0;
  
  // Static methods for utilities
  static helper() { /* utility */ }
}`}
          language="javascript"
          title="classes-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Considerations">
          <PlainText component="div">
            • <Bold>Prototype Methods:</Bold> Shared across instances (memory efficient)<br />
            • <Bold>Class Fields:</Bold> Each instance gets its own copy (more memory)<br />
            • <Bold>Static Methods:</Bold> Called on class, not instances<br />
            • <Bold>Arrow Function Methods:</Bold> Each instance gets its own (more memory)<br />
            • <Bold>Private Fields:</Bold> Slight performance overhead<br />
            • <Bold>Optimization:</Bold> Modern engines optimize classes well
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use classes for <Bold>encapsulation</Bold> and <Bold>organization</Bold></>,
              <>Prefer <Bold>composition over inheritance</Bold> for complex hierarchies</>,
              <>Use <Bold>private fields</Bold> for true encapsulation</>,
              <>Use <Bold>static methods</Bold> for utility functions</>,
              <>Use <Bold>getters/setters</Bold> for computed properties</>,
              <>Avoid <Bold>deep inheritance</Bold> chains (keep it shallow)</>,
              <>Use <Bold>mixins</Bold> for sharing behavior across unrelated classes</>,
              <>Consider <Bold>functional programming</Bold> for simpler use cases</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Best Practices">
          <PlainText component="div">
            • <Bold>Single Responsibility:</Bold> Each class should have one purpose<br />
            • <Bold>Open/Closed:</Bold> Open for extension, closed for modification<br />
            • <Bold>Liskov Substitution:</Bold> Subtypes should be substitutable<br />
            • <Bold>Interface Segregation:</Bold> Don't force unnecessary dependencies<br />
            • <Bold>Dependency Inversion:</Bold> Depend on abstractions, not concretions<br />
            • <Bold>Use TypeScript:</Bold> For better type safety with classes
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> ES6 classes are a <Bold>powerful tool</Bold> for structuring JavaScript applications. While they are <Bold>syntactic sugar</Bold> over prototypes, they provide a <Bold>clean, intuitive syntax</Bold> that makes object-oriented programming in JavaScript more accessible and maintainable.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Classes are <Bold>modern JavaScript's answer</Bold> to object-oriented programming. They provide a <Bold>clean, organized</Bold> way to create objects and handle inheritance. Use them for <Bold>large-scale applications</Bold> where structure and maintainability are important.
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
            <>ES6 classes are <Bold>syntactic sugar</Bold> over prototypes</>,
            <>They provide a <Bold>cleaner, more intuitive</Bold> syntax</>,
            <>Classes have <Bold>constructors</Bold>, <Bold>methods</Bold>, and <Bold>static methods</Bold></>,
            <>Use <Bold>extends</Bold> and <Bold>super</Bold> for inheritance</>,
            <>Support <Bold>getters/setters</Bold> and <Bold>private fields</Bold></>,
            <>Classes are <Bold>function values</Bold> (they're functions under the hood)</>,
            <>Use classes for <Bold>object-oriented programming</Bold> in JavaScript</>,
            <>Combine with <Bold>TypeScript</Bold> for better type safety</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use classes when you need <Bold>structure, encapsulation, and inheritance</Bold>. For simple objects, consider using <Bold>object literals</Bold> or <Bold>factory functions</Bold>. Choose the right tool for the right job!
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Classes are a <Bold>modern JavaScript feature</Bold> that makes object-oriented programming <Bold>easier</Bold> and <Bold>more accessible</Bold>. They're perfect for building <Bold>large, maintainable applications</Bold>!
      </Note>
    </QuestionWrapper>
  );
}