// data/questions/Question07.tsx
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
  TableComponent,
  InlineCode,
  UnorderedList,
} from '../../components/content';
import { question07Meta } from './registry';
import { useLevel } from '../../context/LevelContext';

export function Question07({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question07Meta.id}
      title={question07Meta.title}
      definition={question07Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Both <Bold>Object</Bold> and <Bold>Map</Bold> are used to store key-value pairs in JavaScript, but they have <Bold>significant differences</Bold> in their behavior, performance, and use cases. Understanding these differences is crucial for choosing the right data structure.
      </PlainText>

      <PlainText>
        While Objects have been the traditional way to store key-value pairs, Maps were introduced in ES6 to address some of the limitations of Objects.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding Objects and Maps
        </Title>

        <PlainText>
          Think of Objects and Maps like different types of storage containers:
        </PlainText>

        <CardComponent variant="info" title="🎯 Simple Analogy">
          <PlainText>
            • <Bold>Object</Bold> is like a <Bold>labeled box</Bold> - keys must be strings or symbols<br />
            • <Bold>Map</Bold> is like a <Bold>smart storage system</Bold> - keys can be anything<br />
            • Objects have been around since the beginning of JavaScript<br />
            • Maps were added in 2015 (ES6) to fix Object limitations
          </PlainText>
        </CardComponent>

        <Title level={4}>Quick Comparison</Title>

        <TableComponent
          headers={['Feature', 'Object', 'Map']}
          rows={[
            ['Key Types', 'Strings, Symbols only', 'Any type (objects, functions, etc.)'],
            ['Order', 'Not guaranteed', 'Insertion order preserved'],
            ['Size', 'Manual tracking', 'Built-in .size'],
            ['JSON Support', '✅ Yes', '❌ No'],
          ]}
        />

        <PlainText>
          <Bold>Simple Examples:</Bold>
        </PlainText>

        <CodeComponent
          code={`// OBJECT - Simple key-value store with string keys
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

console.log(user.name);     // 'John'
console.log(user.age);      // 30

// MAP - Can use any type as key
const userMap = new Map();
userMap.set('name', 'John');
userMap.set(123, 'number key');
userMap.set(true, 'boolean key');

console.log(userMap.get('name'));  // 'John'
console.log(userMap.get(123));     // 'number key'
console.log(userMap.get(true));    // 'boolean key'

// Map size tracking
console.log(userMap.size);  // 3

// Object size tracking (manual)
console.log(Object.keys(user).length);  // 3`}
          language="javascript"
          title="basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Beginner Tip:</Bold> Start with Objects for simple data. Switch to Maps when you need:
          • Non-string keys (objects, numbers, booleans)
          • To keep track of the size
          • To preserve insertion order
        </Note>

        <CardComponent variant="success" title="✅ When to Use Object (Beginner)">
          <UnorderedList
            items={[
              <>Simple key-value pairs with string keys</>,
              <>Working with JSON data from APIs</>,
              <>Fixed, known structure</>,
              <>Need to use object methods like <InlineCode>Object.keys()</InlineCode></>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="info" title="✅ When to Use Map (Beginner)">
          <UnorderedList
            items={[
              <>Need keys that are not strings</>,
              <>Need to track the size of the collection</>,
              <>Need to preserve insertion order</>,
              <>Frequently adding and removing entries</>,
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
          Advanced: Deep Dive & Performance
        </Title>

        <PlainText>
          Understanding the key differences in detail:
        </PlainText>

        <Title level={4}>1. Key Types</Title>

        <CodeComponent
          code={`// Object - Keys are converted to strings
const obj = {};
obj[123] = 'number';        // Converts to string "123"
obj[true] = 'boolean';      // Converts to string "true"
obj[{ key: 'value' }] = 'object'; // Converts to "[object Object]"

console.log(Object.keys(obj)); // ['123', 'true', '[object Object]']

// Map - Keys keep their original type
const map = new Map();
map.set(123, 'number');
map.set(true, 'boolean');
map.set({ key: 'value' }, 'object');

console.log(map.get(123));  // 'number' (preserves number type)
console.log(map.get(true)); // 'boolean' (preserves boolean type)
console.log(map.size);      // 3 (built-in size tracking)`}
          language="javascript"
          title="key-types.js"
          defaultOpen={true}
        />

        <Title level={4}>2. Iteration & Performance</Title>

        <CodeComponent
          code={`// Object iteration - Manual
const obj = { a: 1, b: 2, c: 3 };

// Method 1: Object.keys()
Object.keys(obj).forEach(key => {
  console.log(key, obj[key]);
});

// Method 2: for...in (includes prototype properties)
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {  // Must check own properties
    console.log(key, obj[key]);
  }
}

// Map iteration - Built-in
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

// Method 1: for...of
for (let [key, value] of map) {
  console.log(key, value);
}

// Method 2: forEach
map.forEach((value, key) => console.log(key, value));

// Performance comparison
function testPerformance() {
  const iterations = 100000;
  
  // Object performance
  console.time('Object');
  const obj = {};
  for (let i = 0; i < iterations; i++) {
    obj[i] = i;
  }
  console.timeEnd('Object');
  
  // Map performance
  console.time('Map');
  const map = new Map();
  for (let i = 0; i < iterations; i++) {
    map.set(i, i);
  }
  console.timeEnd('Map');
}

// Map is often faster for frequent additions/removals`}
          language="javascript"
          title="iteration.js"
          defaultOpen={false}
        />

        <Title level={4}>3. Prototype Inheritance</Title>

        <CodeComponent
          code={`// Object - Has prototype inheritance
const obj = {};
console.log(obj.toString()); // [object Object] (inherited)
console.log(obj.hasOwnProperty); // Function (inherited)

// Object.create for custom prototype
const parent = { greet: () => 'Hello' };
const child = Object.create(parent);
console.log(child.greet()); // 'Hello'

// Map - Clean, no prototype pollution
const map = new Map();
console.log(map.size); // 0 (own property)
// No inherited properties to worry about`}
          language="javascript"
          title="prototype.js"
          defaultOpen={false}
        />

        <Title level={4}>4. Serialization</Title>

        <CodeComponent
          code={`// Object - JSON serialization built-in
const obj = { name: 'John', age: 30 };
const json = JSON.stringify(obj);
console.log(json); // {"name":"John","age":30}
console.log(JSON.parse(json)); // { name: 'John', age: 30 }

// Map - Not directly serializable
const map = new Map([['name', 'John'], ['age', 30]]);

// Need to convert first
const mapToObj = Object.fromEntries(map);
const mapJson = JSON.stringify(mapToObj);
console.log(mapJson); // {"name":"John","age":30}

// Or use custom serialization
const customMap = new Map([['key', 'value']]);
const serialized = JSON.stringify([...customMap]);
console.log(serialized); // [["key","value"]]`}
          language="javascript"
          title="serialization.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="📊 Full Comparison">
          <TableComponent
            headers={['Feature', 'Object', 'Map']}
            rows={[
              ['Key Types', 'Strings, Symbols', 'Any (objects, functions, primitives)'],
              ['Key Order', 'Not guaranteed', 'Insertion order preserved'],
              ['Size', 'Manual tracking', 'Built-in .size property'],
              ['Iteration', 'Object.keys(), for...in', 'Built-in iterators (for...of)'],
              ['Performance (add/delete)', 'Slower', 'Faster'],
              ['Inheritance', 'Has prototypes', 'No prototypes (clean)'],
              ['Serialization', 'JSON.stringify()', 'Not supported (custom)'],
              ['Default Keys', 'Has default keys', 'No default keys'],
              ['Memory Usage', 'Less memory for small data', 'More memory for small data'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Advanced Tip:</Bold> Use <Bold>Objects</Bold> for:
          • JSON data and API responses
          • Simple, fixed structures
          • When you need methods on the data
          
          Use <Bold>Maps</Bold> for:
          • Dynamic key-value storage
          • Frequent updates
          • When order matters
          • When keys are not strings
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Patterns & Optimization
        </Title>

        <PlainText>
          Deep dive into advanced use cases, optimization strategies, and expert-level techniques.
        </PlainText>

        <Title level={4}>1. LRU Cache Implementation</Title>

        <CodeComponent
          code={`// LRU Cache with Map (preserves insertion order)
class LRUCache {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    
    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    
    if (this.cache.size > this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

// Usage
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));    // 1
cache.put(3, 3);              // evicts key 2
console.log(cache.get(2));    // -1 (not found)`}
          language="javascript"
          title="lru-cache.js"
          defaultOpen={false}
        />

        <Title level={4}>2. WeakMap - Memory-Efficient Maps</Title>

        <CodeComponent
          code={`// WeakMap - Keys are objects, garbage collected
const weakMap = new WeakMap();

let obj = { data: 'Important' };
weakMap.set(obj, 'value');

// When obj is garbage collected, entry is automatically removed
obj = null;

// WeakMap advantages:
// 1. No memory leaks
// 2. Automatic garbage collection
// 3. Cannot be iterated (for security)

// Use case: Private data in classes
const privateData = new WeakMap();

class Person {
  constructor(name) {
    privateData.set(this, { name });
  }
  
  getName() {
    return privateData.get(this).name;
  }
}

const person = new Person('John');
console.log(person.getName()); // 'John'
console.log(Object.keys(person)); // [] (no private data visible)`}
          language="javascript"
          title="weakmap.js"
          defaultOpen={false}
        />

        <Title level={4}>3. Optimizing Object Performance</Title>

        <CodeComponent
          code={`// 1. Object.create(null) - No prototype (clean object)
const cleanObj = Object.create(null);
cleanObj.key = 'value';
console.log(cleanObj.toString); // undefined (no prototype)

// 2. Object.freeze() - Make immutable
const config = Object.freeze({
  api: 'https://api.example.com',
  timeout: 5000
});

// config.api = 'new'; // Error in strict mode

// 3. Object.seal() - Prevent adding/removing properties
const user = Object.seal({
  name: 'John',
  age: 30
});

user.age = 31; // Works
user.city = 'NYC'; // Error in strict mode

// 4. Property descriptors
const obj = {};
Object.defineProperty(obj, 'readOnly', {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(obj.readOnly); // 42
// obj.readOnly = 43; // Error (writable: false)`}
          language="javascript"
          title="object-optimization.js"
          defaultOpen={false}
        />

        <Title level={4}>4. Map vs Object Performance Benchmarks</Title>

        <CodeComponent
          code={`// Expert benchmark
function benchmarkMapVsObject() {
  const size = 100000;
  
  // Set operations
  console.time('Map Set');
  const map = new Map();
  for (let i = 0; i < size; i++) {
    map.set(i, i);
  }
  console.timeEnd('Map Set');
  
  console.time('Object Set');
  const obj = {};
  for (let i = 0; i < size; i++) {
    obj[i] = i;
  }
  console.timeEnd('Object Set');
  
  // Get operations
  console.time('Map Get');
  for (let i = 0; i < size; i++) {
    map.get(i);
  }
  console.timeEnd('Map Get');
  
  console.time('Object Get');
  for (let i = 0; i < size; i++) {
    obj[i];
  }
  console.timeEnd('Object Get');
  
  // Delete operations
  console.time('Map Delete');
  for (let i = 0; i < size; i++) {
    map.delete(i);
  }
  console.timeEnd('Map Delete');
  
  console.time('Object Delete');
  for (let i = 0; i < size; i++) {
    delete obj[i];
  }
  console.timeEnd('Object Delete');
}

// Results typically show:
// Map is faster for frequent additions/removals
// Object is faster for simple lookups with string keys`}
          language="javascript"
          title="benchmark.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="⚡ Expert Performance Tips">
          <UnorderedList
            items={[
              <>Use <Bold>Map</Bold> when you need to add/remove entries frequently (O(1) operations)</>,
              <>Use <Bold>Object</Bold> for simple lookups with string keys (optimized by V8)</>,
              <>Use <Bold>WeakMap</Bold> for memory-sensitive applications</>,
              <>Use <Bold>Object.create(null)</Bold> for pure dictionaries</>,
              <>Use <Bold>Object.freeze()</Bold> for configuration objects</>,
              <>Use <Bold>Object.seal()</Bold> when you want to prevent changes</>,
              <>Always consider memory usage and garbage collection</>,
            ]}
          />
        </CardComponent>

        <Title level={4}>5. Converting Between Object and Map</Title>

        <CodeComponent
          code={`// Object → Map
const obj = { name: 'John', age: 30 };
const map = new Map(Object.entries(obj));

// Map → Object
const objFromMap = Object.fromEntries(map);

// Deep conversion
function deepMapToObject(map) {
  const result = {};
  for (const [key, value] of map) {
    if (value instanceof Map) {
      result[key] = deepMapToObject(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => 
        item instanceof Map ? deepMapToObject(item) : item
      );
    } else {
      result[key] = value;
    }
  }
  return result;
}

// Custom serialization
function serializeMap(map) {
  const obj = Object.fromEntries(map);
  return JSON.stringify(obj);
}

function deserializeMap(json) {
  const obj = JSON.parse(json);
  return new Map(Object.entries(obj));
}`}
          language="javascript"
          title="conversion.js"
          defaultOpen={false}
        />

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The choice between Object and Map should be based on your specific use case. Maps are generally better for dynamic collections, while Objects are better for fixed structures and JSON data. Understanding the underlying performance characteristics can help you make the right choice for your application.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> Don't use Maps when you need to serialize data to JSON frequently. The conversion overhead can be significant. Also, avoid using Objects as maps when keys are user-generated (risk of prototype pollution).
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
            <>Objects and Maps are both key-value stores but with different characteristics</>,
            <>Objects are <Bold>traditional</Bold>, Maps are <Bold>modern</Bold> (ES6+)</>,
            <>Objects have <Bold>string/symbol keys</Bold>, Maps can have <Bold>any key type</Bold></>,
            <>Maps <Bold>preserve insertion order</Bold>, Objects <Bold>do not</Bold> (except numeric keys)</>,
            <>Maps have <Bold>built-in size</Bold> property, Objects need manual tracking</>,
            <>Maps are <Bold>faster</Bold> for frequent additions/removals</>,
            <>Objects are <Bold>better for JSON</Bold> and API communication</>,
            <>Choose based on your specific use case and requirements</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> If you're unsure which to use, start with an <Bold>Object</Bold> for simple cases, and switch to <Bold>Map</Bold> when you need the additional features like non-string keys or better performance for frequent updates.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Choose <Bold>Object</Bold> for simple, known structures with string keys, and <Bold>Map</Bold> for dynamic data with any key type, frequent updates, or when order matters!
      </Note>
    </QuestionWrapper>
  );
}