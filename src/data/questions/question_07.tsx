// data/questions/Question07.tsx
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
  TableComponent,
  InlineCode,
  UnorderedList,
} from '../../components/content';
import { question07Meta } from './registry';

export function Question07({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question07Meta.id}
      title={question07Meta.title}
      definition={question07Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction */}
      <PlainText>
        Both <Bold>Object</Bold> and <Bold>Map</Bold> are used to store key-value pairs in JavaScript, but they have <Bold>significant differences</Bold> in their behavior, performance, and use cases. Understanding these differences is crucial for choosing the right data structure.
      </PlainText>

      <PlainText>
        While Objects have been the traditional way to store key-value pairs, Maps were introduced in ES6 to address some of the limitations of Objects.
      </PlainText>

      <Gap size={2} />

      {/* Quick Comparison Table */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>📊</Box>
        Quick Comparison
      </Title>

      <TableComponent
        headers={['Feature', 'Object', 'Map']}
        rows={[
          ['Key Types', 'Strings, Symbols', 'Any (objects, functions, primitives)'],
          ['Key Order', 'Not guaranteed (except numeric)', 'Insertion order preserved'],
          ['Size', 'Manual tracking', 'Built-in .size property'],
          ['Iteration', 'Object.keys(), for...in', 'Built-in iterators (for...of)'],
          ['Performance', 'Slower for frequent additions/removals', 'Faster for frequent additions/removals'],
          ['Inheritance', 'Has prototypes (can override)', 'No prototypes (clean)'],
          ['Serialization', 'JSON.stringify() support', 'Not supported (custom)'],
          ['Default Keys', 'Has default keys (toString, etc.)', 'No default keys'],
          ['Memory Usage', 'Less memory for small data', 'More memory for small data'],
          ['Use Case', 'Simple objects, JSON data, fixed structure', 'Dynamic data, frequent updates, unknown keys'],
        ]}
      />

      <Gap size={2} />

      {/* 1. Object - Traditional Key-Value Store */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>📦</Box>
        1. Object - Traditional Key-Value Store
      </Title>

      <PlainText>
        Objects are the fundamental data structure in JavaScript. They are collections of properties where keys are strings or symbols.
      </PlainText>

      <CodeComponent
        code={`// Object creation and usage
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

// Accessing properties
console.log(user.name);      // 'John'
console.log(user['age']);    // 30

// Adding properties
user.city = 'New York';
user['country'] = 'USA';

// Checking if property exists
console.log('name' in user);        // true
console.log(user.hasOwnProperty('age')); // true

// Deleting properties
delete user.email;
console.log(user.email);     // undefined

// Getting keys
console.log(Object.keys(user));      // ['name', 'age', 'city', 'country']
console.log(Object.values(user));    // ['John', 30, 'New York', 'USA']
console.log(Object.entries(user));   // [['name','John'], ['age',30], ...]

// Objects can have dynamic keys
const dynamicKey = 'score';
user[dynamicKey] = 100;
console.log(user.score);     // 100

// Objects inherit from Object.prototype
console.log(user.toString()); // [object Object]
console.log(user.hasOwnProperty); // Function`}
        language="javascript"
        title="object-example.js"
        defaultOpen={true}
      />

      <Note type="warning" icon="⚠️">
        <Bold>Object Limitations:</Bold>
        <PlainText component="div">
          • Keys must be strings or symbols<br />
          • Key order is not guaranteed<br />
          • Has default prototype properties<br />
          • No built-in size property<br />
          • Slower for frequent additions and deletions<br />
          • Can be accidentally overridden by prototype keys
        </PlainText>
      </Note>

      <Gap size={2} />

      {/* 2. Map - Modern Key-Value Store */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>🗺️</Box>
        2. Map - Modern Key-Value Store
      </Title>

      <PlainText>
        Maps are a modern data structure that stores key-value pairs where keys can be any type (objects, functions, primitives). They preserve insertion order and have built-in size tracking.
      </PlainText>

      <CodeComponent
        code={`// Map creation and usage
const userMap = new Map([
  ['name', 'John'],
  ['age', 30],
  ['email', 'john@example.com']
]);

// Or create empty and add
const userMap2 = new Map();
userMap2.set('name', 'John');
userMap2.set('age', 30);
userMap2.set('email', 'john@example.com');

// Accessing values
console.log(userMap.get('name'));     // 'John'
console.log(userMap.get('age'));      // 30

// Checking if key exists
console.log(userMap.has('email'));    // true
console.log(userMap.has('phone'));    // false

// Deleting entries
userMap.delete('email');
console.log(userMap.has('email'));    // false

// Getting size
console.log(userMap.size);            // 2

// Clearing all entries
userMap.clear();
console.log(userMap.size);            // 0

// Maps support any key type
const map = new Map();
map.set('string', 'value');
map.set(123, 'number');
map.set(true, 'boolean');
map.set({ name: 'obj' }, 'object');
map.set(() => {}, 'function');

console.log(map.get('string'));       // 'value'
console.log(map.get(123));            // 'number'
console.log(map.get(true));           // 'boolean'
console.log(map.get({ name: 'obj' })); // 'object' (different reference!)

// Map preserves insertion order
const orderedMap = new Map();
orderedMap.set('a', 1);
orderedMap.set('b', 2);
orderedMap.set('c', 3);
console.log([...orderedMap.keys()]); // ['a', 'b', 'c']`}
        language="javascript"
        title="map-example.js"
        defaultOpen={true}
      />

      <Note type="info" icon="💡">
        <Bold>Map Advantages:</Bold>
        <PlainText component="div">
          • Keys can be any type (objects, functions, primitives)<br />
          • Preserves insertion order<br />
          • Built-in .size property<br />
          • Built-in iteration support<br />
          • Better performance for frequent additions/deletions<br />
          • No prototype pollution
        </PlainText>
      </Note>

      <Gap size={2} />

      {/* Key Differences */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>🔑</Box>
        Key Differences in Detail
      </Title>

      <CodeComponent
        code={`// 1. Key Types
// Object - Keys are strings or symbols
const obj = {};
obj[123] = 'number'; // Converts to string
obj[true] = 'boolean'; // Converts to string
obj[{ key: 'value' }] = 'object'; // Converts to '[object Object]'

console.log(Object.keys(obj)); // ['123', 'true', '[object Object]']

// Map - Keys can be any type
const map = new Map();
map.set(123, 'number');
map.set(true, 'boolean');
map.set({ key: 'value' }, 'object');

console.log(map.get(123)); // 'number'
console.log(map.get(true)); // 'boolean'
console.log(map.get({ key: 'value' })); // undefined (different reference!)

// 2. Iteration
// Object - Manual iteration
const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj).forEach(key => {
  console.log(key, obj[key]);
});
// for...in iterates prototype properties too
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}

// Map - Built-in iteration
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
// for...of iterates entries
for (let [key, value] of map) {
  console.log(key, value);
}
// Map methods
map.forEach((value, key) => console.log(key, value));

// 3. Size
// Object - No built-in size property
const obj = { a: 1, b: 2 };
console.log(Object.keys(obj).length); // 2

// Map - Built-in size property
const map = new Map([['a', 1], ['b', 2]]);
console.log(map.size); // 2

// 4. Performance
// Map is optimized for frequent additions/removals
const start = performance.now();
const map = new Map();
for (let i = 0; i < 100000; i++) {
  map.set(i, i);
}
const mapTime = performance.now() - start;

const start2 = performance.now();
const obj = {};
for (let i = 0; i < 100000; i++) {
  obj[i] = i;
}
const objTime = performance.now() - start2;

console.log(\`Map: \${mapTime}ms, Object: \${objTime}ms\`); // Map is often faster`}
        language="javascript"
        title="key-differences.js"
        defaultOpen={false}
      />

      <Gap size={2} />

      {/* Visual Comparison */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#06b6d4', mr: 1 }}>🎨</Box>
        Visual Comparison
      </Title>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
          gap: 3,
          my: 2,
        }}
      >
        {/* Object Visual */}
        <Box
          sx={{
            bgcolor: 'rgba(37, 99, 235, 0.06)',
            borderRadius: 2,
            p: 3,
            border: '2px solid rgba(37, 99, 235, 0.2)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', mb: 2 }}>
            📦 Object
          </Box>
          <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
            <Box sx={{ color: 'grey.600', mb: 1 }}>{`{`}</Box>
            <Box sx={{ pl: 2, color: '#2563eb' }}>name: "John",</Box>
            <Box sx={{ pl: 2, color: '#2563eb' }}>age: 30,</Box>
            <Box sx={{ pl: 2, color: '#2563eb' }}>email: "john@example.com"</Box>
            <Box sx={{ color: 'grey.600' }}>{`}`}</Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <PlainText variant="caption" sx={{ display: 'block', color: 'grey.600' }}>
              • Keys: Strings & Symbols only<br />
              • Order: Not guaranteed<br />
              • Size: Manual tracking<br />
              • Inherits: Object.prototype
            </PlainText>
          </Box>
        </Box>

        {/* Map Visual */}
        <Box
          sx={{
            bgcolor: 'rgba(139, 92, 246, 0.06)',
            borderRadius: 2,
            p: 3,
            border: '2px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#8b5cf6', mb: 2 }}>
            🗺️ Map
          </Box>
          <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
            <Box sx={{ color: 'grey.600', mb: 1 }}>{`Map(3) {`}</Box>
            <Box sx={{ pl: 2, color: '#8b5cf6' }}>'name' → "John",</Box>
            <Box sx={{ pl: 2, color: '#8b5cf6' }}>'age' → 30,</Box>
            <Box sx={{ pl: 2, color: '#8b5cf6' }}>'email' → "john@example.com"</Box>
            <Box sx={{ color: 'grey.600' }}>{`}`}</Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <PlainText variant="caption" sx={{ display: 'block', color: 'grey.600' }}>
              • Keys: Any type (objects, functions)<br />
              • Order: Insertion order preserved<br />
              • Size: Built-in .size property<br />
              • No prototype inheritance
            </PlainText>
          </Box>
        </Box>
      </Box>

      <Gap size={2} />

      {/* When to Use Which */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🎯</Box>
        When to Use Which?
      </Title>

      <CardComponent variant="success" title="✅ Use Object When:">
        <UnorderedList
          items={[
            <>You have simple key-value pairs with string keys</>,
            <>You need to work with JSON (serialization/deserialization)</>,
            <>You have a fixed, known structure</>,
            <>You're working with APIs that return objects</>,
            <>You need to use object methods like <InlineCode>Object.keys()</InlineCode>, <InlineCode>Object.values()</InlineCode></>,
            <>You want to use destructuring or spread operator</>,
            <>You need to pass data to third-party libraries that expect objects</>,
          ]}
        />
      </CardComponent>

      <CardComponent variant="info" title="✅ Use Map When:">
        <UnorderedList
          items={[
            <>You need keys that are not strings (objects, functions)</>,
            <>You need to preserve insertion order</>,
            <>You need to track the size of the collection</>,
            <>You're frequently adding and removing entries</>,
            <>You need to iterate over entries in insertion order</>,
            <>You want to avoid prototype pollution</>,
            <>You're working with dynamic data where keys are unknown</>,
            <>You need better performance for frequent modifications</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      {/* Practical Examples */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f472b6', mr: 1 }}>💻</Box>
        Practical Examples
      </Title>

      <PlainText>
        <Bold>Example 1: Caching with Map</Bold>
      </PlainText>

      <CodeComponent
        code={`// Using Map for caching (maintains insertion order)
class LRUCache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    
    // Refresh the entry (move to end)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry (first in Map)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

const cache = new LRUCache(3);
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
cache.get('a'); // Refresh 'a'
cache.set('d', 4); // Removes 'b' (least recently used)

console.log([...cache.cache.keys()]); // ['c', 'a', 'd']`}
        language="javascript"
        title="cache-example.js"
        defaultOpen={false}
      />

      <Gap size={1} />

      <PlainText>
        <Bold>Example 2: Object vs Map for Domain Data</Bold>
      </PlainText>

      <CodeComponent
        code={`// Object - Good for domain models (fixed structure)
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  roles: ['admin', 'user'],
  createdAt: new Date(),
  
  // Methods can be added
  getFullName() {
    return this.name;
  }
};

// Map - Good for dynamic data with frequent updates
const userSessions = new Map();

function trackUserSession(userId, sessionData) {
  userSessions.set(userId, {
    ...sessionData,
    lastActive: new Date()
  });
}

function getSession(userId) {
  return userSessions.get(userId);
}

function removeSession(userId) {
  userSessions.delete(userId);
}

trackUserSession(1, { device: 'mobile', location: 'NYC' });
console.log(userSessions.size); // 1
console.log(getSession(1).device); // 'mobile'
removeSession(1);
console.log(userSessions.size); // 0`}
        language="javascript"
        title="domain-example.js"
        defaultOpen={false}
      />

      <Gap size={2} />

      {/* Converting Between Object and Map */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#fbbf24', mr: 1 }}>🔄</Box>
        Converting Between Object and Map
      </Title>

      <CodeComponent
        code={`// Object to Map
const obj = { name: 'John', age: 30, city: 'NYC' };
const mapFromObj = new Map(Object.entries(obj));
console.log(mapFromObj); // Map { 'name' => 'John', 'age' => 30, 'city' => 'NYC' }

// Map to Object
const map = new Map([
  ['name', 'John'],
  ['age', 30],
  ['city', 'NYC']
]);
const objFromMap = Object.fromEntries(map);
console.log(objFromMap); // { name: 'John', age: 30, city: 'NYC' }

// Partial conversion
const partialObj = { name: 'John', age: 30 };
const partialMap = new Map();
Object.entries(partialObj).forEach(([key, value]) => {
  if (typeof value !== 'number') {
    partialMap.set(key, value);
  }
});
console.log(partialMap); // Map { 'name' => 'John' }`}
        language="javascript"
        title="convert-example.js"
        defaultOpen={false}
      />

      <Gap size={2} />

      {/* Best Practices */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#fbbf24', mr: 1 }}>⭐</Box>
        Best Practices
      </Title>

      <CardComponent variant="success" title="✅ Do's">
        <UnorderedList
          items={[
            <>Use <Bold>Objects</Bold> for simple, known structures with string keys</>,
            <>Use <Bold>Maps</Bold> when keys are dynamic or non-string</>,
            <>Use <Bold>Maps</Bold> when order of insertion matters</>,
            <>Use <Bold>Objects</Bold> for JSON serialization and API communication</>,
            <>Use <Bold>Maps</Bold> for caching and collections that change frequently</>,
            <>Use <Bold>Objects</Bold> when you need methods and prototype inheritance</>,
          ]}
        />
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ Don'ts">
        <UnorderedList
          items={[
            <>Don't use Objects for dynamic keys that change frequently</>,
            <>Don't use Maps when you need JSON serialization</>,
            <>Don't rely on key order in Objects (unless using numeric keys)</>,
            <>Don't use Objects as dictionaries if keys are user-generated (risk of prototype pollution)</>,
            <>Don't forget that Map equality checks use reference equality for object keys</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      {/* Summary */}
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

      <Gap size={2} />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> If you're unsure which to use, start with an <Bold>Object</Bold> for simple cases, and switch to <Bold>Map</Bold> when you need the additional features like non-string keys or better performance for frequent updates.
      </HLText>

      <Gap size={2} />

      {/* Quick Reference */}
      <Title level={4}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>📋</Box>
        Quick Reference Card
      </Title>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
          },
          gap: 2,
          my: 2,
        }}
      >
        {/* Object Card */}
        <Box
          sx={{
            bgcolor: 'rgba(37, 99, 235, 0.06)',
            borderRadius: 2,
            p: 2.5,
            border: '2px solid rgba(37, 99, 235, 0.15)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', mb: 1 }}>
            📦 Object
          </Box>
          <CodeComponent
            code={`const obj = { key: 'value' };
obj.key = 'new value';
obj['dynamic'] = 'works';

// Methods
Object.keys(obj);
Object.values(obj);
Object.entries(obj);`}
            language="javascript"
            title=""
            showTitle={false}
            showCopyButton={true}
            defaultOpen={true}
          />
          <PlainText variant="caption" sx={{ mt: 1, display: 'block', color: 'grey.600' }}>
            Best for: Fixed structure, JSON, methods
          </PlainText>
        </Box>

        {/* Map Card */}
        <Box
          sx={{
            bgcolor: 'rgba(139, 92, 246, 0.06)',
            borderRadius: 2,
            p: 2.5,
            border: '2px solid rgba(139, 92, 246, 0.15)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#8b5cf6', mb: 1 }}>
            🗺️ Map
          </Box>
          <CodeComponent
            code={`const map = new Map([['key','value']]);
map.set('key', 'value');
map.get('key');    // 'value'
map.size;          // 1
map.has('key');    // true
map.delete('key');`}
            language="javascript"
            title=""
            showTitle={false}
            showCopyButton={true}
            defaultOpen={true}
          />
          <PlainText variant="caption" sx={{ mt: 1, display: 'block', color: 'grey.600' }}>
            Best for: Dynamic keys, frequent updates, order
          </PlainText>
        </Box>
      </Box>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Choose <Bold>Object</Bold> for simple, known structures with string keys, and <Bold>Map</Bold> for dynamic data with any key type, frequent updates, or when order matters!
      </Note>
    </QuestionWrapper>
  );
}