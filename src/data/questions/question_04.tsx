// data/questions/Question04.tsx
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
import { question04Meta } from './registry';
import { useLevel } from '../../hooks';

export function Question04({ isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question04Meta.id}
      title={question04Meta.title}
      definition={question04Meta.definition}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>JSON</Bold> (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language.
      </PlainText>

      <PlainText>
        JSON is language-independent but uses conventions that are familiar to programmers of the C-family of languages. These properties make JSON an ideal data-interchange language.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is JSON?
        </Title>

        <PlainText>
          Think of JSON as a <Bold>universal language</Bold> for data exchange. It's like a translator that helps different applications talk to each other.
        </PlainText>

        <CardComponent variant="info" title="🎯 Simple Analogy">
          <PlainText>
            • Imagine you're sending a package with a label<br />
            • The label has a specific format (name, address, items)<br />
            • Anyone who knows the format can read and understand it<br />
            • JSON is that format for data exchange between applications
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>JSON Syntax Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// JSON - A simple data format
{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["Reading", "Gaming"]
}

// Key rules:
// 1. Data is in name/value pairs: "name": "John"
// 2. Keys and strings MUST use double quotes
// 3. Data is separated by commas
// 4. Curly braces { } hold objects
// 5. Square brackets [ ] hold arrays`}
          language="json"
          title="json-basics.json"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> JSON uses <Bold>double quotes</Bold> for keys and string values. Single quotes are not valid in JSON!
        </Note>

        <CardComponent variant="success" title="📊 JSON Data Types">
          <UnorderedList
            items={[
              <>String: <InlineCode>"Hello"</InlineCode></>,
              <>Number: <InlineCode>42</InlineCode> or <InlineCode>3.14</InlineCode></>,
              <>Boolean: <InlineCode>true</InlineCode> or <InlineCode>false</InlineCode></>,
              <>Array: <InlineCode>[1, 2, 3]</InlineCode></>,
              <>Object: <InlineCode>{"{ \"key\": \"value\" }"}</InlineCode></>,
              <>null: <InlineCode>null</InlineCode></>,
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> JSON does NOT support comments, functions, or undefined values. These are JavaScript-specific and not valid in JSON.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: JSON Operations & Patterns
        </Title>

        <PlainText>
          Mastering the two main JSON operations: <Bold>parsing</Bold> and <Bold>stringifying</Bold>.
        </PlainText>

        <Title level={4}>1. JSON.parse() - Convert String to Object</Title>

        <CodeComponent
          code={`// JSON.parse() - Convert JSON string to JS object
const jsonString = '{"name":"John","age":30,"city":"New York"}';

// Basic parsing
const user = JSON.parse(jsonString);
console.log(user.name); // "John"
console.log(user.age);  // 30

// Parsing with nested data
const nestedJson = '{"person":{"name":"John","address":{"city":"NYC"}}}';
const data = JSON.parse(nestedJson);
console.log(data.person.address.city); // "NYC"

// Using reviver function for transformation
const jsonWithDate = '{"name":"John","birthDate":"2024-01-01"}';
const parsed = JSON.parse(jsonWithDate, (key, value) => {
  if (key === 'birthDate') return new Date(value);
  return value;
});
console.log(parsed.birthDate instanceof Date); // true

// Always handle errors with try-catch
try {
  const invalidData = JSON.parse('invalid json');
} catch (error) {
  console.error('Invalid JSON:', error.message);
}`}
          language="javascript"
          title="json-parse.js"
          defaultOpen={true}
        />

        <Title level={4}>2. JSON.stringify() - Convert Object to String</Title>

        <CodeComponent
          code={`// JSON.stringify() - Convert JS object to JSON string
const user = {
  name: "John",
  age: 30,
  city: "New York",
  isActive: true,
  address: { street: "123 Main St" },
  hobbies: ["Reading", "Gaming"]
};

// Basic stringify
const jsonString = JSON.stringify(user);
console.log(jsonString);

// Pretty print with indentation (2 spaces)
const prettyJson = JSON.stringify(user, null, 2);
console.log(prettyJson);

// Filtering data with replacer function
const safeData = JSON.stringify(user, (key, value) => {
  if (key === 'age') return undefined; // Exclude age
  return value;
});
console.log(safeData); // {"name":"John","city":"New York",...}

// Include only specific keys with replacer array
const onlyNameCity = JSON.stringify(user, ['name', 'city']);
console.log(onlyNameCity); // {"name":"John","city":"New York"}`}
          language="javascript"
          title="json-stringify.js"
          defaultOpen={true}
        />

        <Title level={4}>JSON vs JavaScript Objects</Title>

        <TableComponent
          headers={['Feature', 'JSON', 'JavaScript Objects']}
          rows={[
            ['Property Names', 'Must be double-quoted', 'Can be unquoted (valid identifiers)'],
            ['Strings', 'Must use double quotes', 'Can use single or double quotes'],
            ['Functions', 'Not allowed', 'Allowed'],
            ['Comments', 'Not allowed', 'Allowed'],
            ['Undefined', 'Not allowed', 'Allowed'],
            ['Data Type', 'Text format', 'JavaScript object'],
          ]}
        />

        <Title level={4}>Real-World Example: LocalStorage</Title>

        <CodeComponent
          code={`// Working with localStorage
const userSettings = {
  theme: 'dark',
  language: 'en',
  notifications: true,
  fontSize: 16
};

// Save to localStorage (convert to JSON)
localStorage.setItem('user-settings', JSON.stringify(userSettings));

// Retrieve and parse
const savedSettings = localStorage.getItem('user-settings');
if (savedSettings) {
  const settings = JSON.parse(savedSettings);
  console.log(settings.theme); // 'dark'
}

// Update a setting
function updateSetting(key, value) {
  const saved = localStorage.getItem('user-settings');
  const settings = saved ? JSON.parse(saved) : {};
  settings[key] = value;
  localStorage.setItem('user-settings', JSON.stringify(settings));
}

updateSetting('theme', 'light');`}
          language="javascript"
          title="localstorage.js"
          defaultOpen={false}
        />

        <Note type="info" icon="💡">
          <Bold>Advanced Tip:</Bold> Use <InlineCode>JSON.stringify(data, null, 2)</InlineCode> for human-readable, formatted JSON output.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Patterns & Performance
        </Title>

        <PlainText>
          Deep dive into advanced JSON operations, performance considerations, and expert-level techniques.
        </PlainText>

        <Title level={4}>1. Deep Cloning with JSON</Title>

        <CodeComponent
          code={`// Deep cloning using JSON (limitations)
const original = {
  name: "John",
  address: { city: "NYC" },
  date: new Date(), // Will become string
  func: () => {},   // Will be omitted
};

// Deep clone
const clone = JSON.parse(JSON.stringify(original));
clone.address.city = "LA";
console.log(original.address.city); // "NYC" (unchanged)

// Limitations of this method:
// 1. Functions are removed
// 2. Dates become strings
// 3. undefined values are removed
// 4. Circular references cause errors
// 5. Special objects (Map, Set, RegExp) lose their type

// Better approach for complex objects:
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Map) return new Map(Array.from(obj, ([k, v]) => [k, deepClone(v)]));
  if (obj instanceof Set) return new Set(Array.from(obj, v => deepClone(v)));
  
  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}`}
          language="javascript"
          title="deep-clone.js"
          defaultOpen={false}
        />

        <Title level={4}>2. Custom Serialization & Deserialization</Title>

        <CodeComponent
          code={`// Custom serialization with class support
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.createdAt = new Date();
  }

  // Custom toJSON for serialization
  toJSON() {
    return {
      __type: 'User',
      name: this.name,
      age: this.age,
      createdAt: this.createdAt.toISOString()
    };
  }

  // Static method for deserialization
  static fromJSON(json) {
    const user = new User(json.name, json.age);
    user.createdAt = new Date(json.createdAt);
    return user;
  }
}

// Serialize
const user = new User('John', 30);
const json = JSON.stringify(user);
console.log(json);
// {"__type":"User","name":"John","age":30,"createdAt":"2024-01-01T00:00:00.000Z"}

// Deserialize with custom reviver
const parsed = JSON.parse(json, (key, value) => {
  if (value && value.__type === 'User') {
    return User.fromJSON(value);
  }
  return value;
});

console.log(parsed instanceof User); // true
console.log(parsed.createdAt instanceof Date); // true`}
          language="javascript"
          title="custom-serialization.js"
          defaultOpen={false}
        />

        <Title level={4}>3. Performance Optimization</Title>

        <CodeComponent
          code={`// Performance benchmarks
const largeData = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: \`Item \${i}\`,
  value: Math.random()
}));

// Measure stringify performance
console.time('stringify');
const jsonString = JSON.stringify(largeData);
console.timeEnd('stringify');

// Measure parse performance
console.time('parse');
const parsedData = JSON.parse(jsonString);
console.timeEnd('parse');

// Optimization tips:
// 1. Use replacer to exclude unnecessary fields
// 2. Avoid deep nesting (flatten when possible)
// 3. Use streaming for very large datasets
// 4. Consider using msgpack or protobuf for binary data

// Replacer optimization
function optimizeData(key, value) {
  // Exclude large/complex fields
  if (key === 'largeField' || key === 'unusedData') {
    return undefined;
  }
  return value;
}

const optimized = JSON.stringify(largeData, optimizeData);`}
          language="javascript"
          title="performance.js"
          defaultOpen={false}
        />

        <Title level={4}>4. API Response Handling</Title>

        <CodeComponent
          code={`// Advanced API handling with JSON
class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Handle request body
    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON response from server');
      }
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint);
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

// Usage
const api = new API('https://api.example.com');
const user = await api.get('/users/1');
console.log(user);`}
          language="javascript"
          title="api-handling.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="⚡ Expert Performance Tips">
          <UnorderedList
            items={[
              <>Use <Bold>replacer</Bold> and <Bold>reviver</Bold> functions for custom transformations</>,
              <>Consider <Bold>streaming</Bold> for very large JSON responses</>,
              <>Use <Bold>caching</Bold> to avoid repeated parsing of the same data</>,
              <>For binary data, consider <Bold>Protocol Buffers</Bold> or <Bold>MessagePack</Bold></>,
              <>Implement <Bold>custom serialization</Bold> for complex objects</>,
              <>Use <Bold>compression</Bold> for large JSON payloads</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> JSON is powerful but not always the most efficient. For performance-critical applications with large datasets, consider alternatives like <Bold>Protocol Buffers</Bold>, <Bold>MessagePack</Bold>, or <Bold>BSON</Bold>. However, JSON remains the best choice for most web applications due to its simplicity and universal support.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> Be careful with <InlineCode>JSON.parse(JSON.stringify())</InlineCode> for deep cloning. It doesn't work with:
          • Functions
          • Dates (they become strings)
          • undefined values (they're omitted)
          • Circular references (throws error)
          • Special objects (Map, Set, RegExp)
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
            <>JSON is a lightweight data interchange format</>,
            <>It's language-independent but based on JavaScript syntax</>,
            <>JSON data types: string, number, boolean, array, object, null</>,
            <><InlineCode>JSON.parse()</InlineCode> converts JSON string to JavaScript object</>,
            <><InlineCode>JSON.stringify()</InlineCode> converts JavaScript object to JSON string</>,
            <>Always handle errors when parsing JSON from external sources</>,
            <>JSON is the most common format for web APIs</>,
            <>Use JSON for configuration files, data storage, and data transfer</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> JSON is the backbone of modern web development. Mastering JSON operations is essential for working with APIs, storing data, and building full-stack applications.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> JSON is everywhere in modern web development - from APIs to databases to configuration files. Mastering JSON is a must-have skill for every JavaScript developer!
      </Note>
    </QuestionWrapper>
  );
}