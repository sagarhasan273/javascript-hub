// data/questions/Question05.tsx
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
import { question04Meta } from './registry';

export function Question04({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question04Meta.id}
      title={question04Meta.title}
      definition={question04Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction */}
      <PlainText>
        <Bold>JSON</Bold> (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language.
      </PlainText>

      <PlainText>
        JSON is language-independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.
      </PlainText>

      <Gap size={2} />

      {/* JSON Characteristics */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f7df1e', mr: 1 }}>⭐</Box>
        JSON Characteristics
      </Title>

      <CardComponent variant="info" title="🎯 Key Features of JSON">
        <UnorderedList
          items={[
            <><Bold>Lightweight:</Bold> Minimal syntax, easy to transmit</>,
            <><Bold>Text-based:</Bold> Human-readable and writable</>,
            <><Bold>Language Independent:</Bold> Works with almost all programming languages</>,
            <><Bold>Self-describing:</Bold> Data structure is clear and understandable</>,
            <><Bold>Hierarchical:</Bold> Supports nested objects and arrays</>,
            <><Bold>Easy to Parse:</Bold> Built-in support in most languages</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      {/* JSON Syntax */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>📝</Box>
        JSON Syntax Rules
      </Title>

      <CodeComponent
        code={`// JSON Syntax Rules:
// 1. Data is in name/value pairs
// 2. Data is separated by commas
// 3. Curly braces hold objects
// 4. Square brackets hold arrays

{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["Reading", "Gaming", "Traveling"],
  "graduationYear": null
}`}
        language="json"
        title="json-syntax.json"
        defaultOpen={true}
      />

      <Note type="info" icon="💡">
        <Bold>Key Point:</Bold> JSON requires double quotes for keys and string values. Single quotes are not valid in JSON.
      </Note>

      <Gap size={2} />

      {/* JSON Data Types */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>🔢</Box>
        JSON Data Types
      </Title>

      <CardComponent variant="default" title="📊 Supported Data Types">
        <PlainText component="div">
          • <Bold>String:</Bold> <InlineCode>"Hello World"</InlineCode><br />
          • <Bold>Number:</Bold> <InlineCode>42</InlineCode>, <InlineCode>3.14</InlineCode><br />
          • <Bold>Boolean:</Bold> <InlineCode>true</InlineCode> or <InlineCode>false</InlineCode><br />
          • <Bold>Array:</Bold> <InlineCode>[1, 2, 3]</InlineCode><br />
          • <Bold>Object:</Bold> <InlineCode>{"{ \"key\": \"value\" }"}</InlineCode><br />
          • <Bold>null:</Bold> <InlineCode>null</InlineCode>
        </PlainText>
      </CardComponent>

      <Note type="warning" icon="⚠️">
        <Bold>Important:</Bold> JSON does NOT support comments, functions, or undefined values. These are JavaScript-specific and not valid in JSON.
      </Note>

      <Gap size={2} />

      {/* Common Operations */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚙️</Box>
        Common JSON Operations
      </Title>

      {/* 1. JSON.parse() */}
      <Title level={4}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>🔍</Box>
        1. JSON.parse() - Convert JSON String to JavaScript Object
      </Title>

      <CodeComponent
        code={`// JSON.parse() - Convert JSON string to JS object
const jsonString = '{"name":"John","age":30,"city":"New York"}';

// Parsing JSON string to JavaScript object
const user = JSON.parse(jsonString);

console.log(user.name); // "John"
console.log(user.age);  // 30
console.log(user.city); // "New York"

// Accessing nested data
const jsonNested = '{"person":{"name":"John","address":{"city":"NYC"}}}';
const data = JSON.parse(jsonNested);
console.log(data.person.address.city); // "NYC"

// JSON.parse with reviver function
const jsonDate = '{"date":"2024-01-01"}';
const parsed = JSON.parse(jsonDate, (key, value) => {
  if (key === 'date') return new Date(value);
  return value;
});
console.log(parsed.date instanceof Date); // true`}
        language="javascript"
        title="json-parse.js"
        defaultOpen={true}
      />

      <Note type="info" icon="💡">
        <Bold>Tip:</Bold> Always wrap <InlineCode>JSON.parse()</InlineCode> in try-catch to handle invalid JSON:
        <CodeComponent
          code={`try {
  const data = JSON.parse(jsonString);
} catch (error) {
  console.error('Invalid JSON:', error);
}`}
          language="javascript"
          title=""
          showTitle={false}
          showCopyButton={true}
          defaultOpen={true}
        />
      </Note>

      <Gap size={2} />

      {/* 2. JSON.stringify() */}
      <Title level={4}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>📦</Box>
        2. JSON.stringify() - Convert JavaScript Object to JSON String
      </Title>

      <CodeComponent
        code={`// JSON.stringify() - Convert JS object to JSON string
const user = {
  name: "John",
  age: 30,
  city: "New York",
  isActive: true,
  address: {
    street: "123 Main St",
    zip: "10001"
  },
  hobbies: ["Reading", "Gaming"]
};

const jsonString = JSON.stringify(user);
console.log(jsonString);
/*
{
  "name":"John",
  "age":30,
  "city":"New York",
  "isActive":true,
  "address":{"street":"123 Main St","zip":"10001"},
  "hobbies":["Reading","Gaming"]
}
*/

// Pretty print with indentation
const prettyJson = JSON.stringify(user, null, 2);
console.log(prettyJson); // Formatted with 2 spaces

// Using replacer function (filter properties)
const filtered = JSON.stringify(user, (key, value) => {
  if (key === 'age') return undefined; // Exclude age
  return value;
});
console.log(filtered); // {"name":"John","city":"New York",...}

// Using replacer array (only include specific keys)
const onlyNameCity = JSON.stringify(user, ['name', 'city']);
console.log(onlyNameCity); // {"name":"John","city":"New York"}`}
        language="javascript"
        title="json-stringify.js"
        defaultOpen={true}
      />

      <Gap size={2} />

      {/* Practical Examples */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#06b6d4', mr: 1 }}>🎯</Box>
        Practical Examples
      </Title>

      <PlainText>
        <Bold>Example 1: Storing user preferences in localStorage</Bold>
      </PlainText>

      <CodeComponent
        code={`// Saving data to localStorage
const userSettings = {
  theme: 'dark',
  language: 'en',
  notifications: true,
  fontSize: 16
};

// Convert to JSON and save
localStorage.setItem('user-settings', JSON.stringify(userSettings));

// Retrieve and parse
const savedSettings = localStorage.getItem('user-settings');
if (savedSettings) {
  const settings = JSON.parse(savedSettings);
  console.log(settings.theme); // 'dark'
}

// Updating data
function updateSetting(key, value) {
  const saved = localStorage.getItem('user-settings');
  const settings = saved ? JSON.parse(saved) : {};
  settings[key] = value;
  localStorage.setItem('user-settings', JSON.stringify(settings));
}

updateSetting('theme', 'light');`}
        language="javascript"
        title="localstorage-json.js"
        defaultOpen={false}
      />

      <Gap size={1} />

      <PlainText>
        <Bold>Example 2: Working with APIs</Bold>
      </PlainText>

      <CodeComponent
        code={`// Fetching data from API
async function fetchUserData() {
  try {
    const response = await fetch('https://api.example.com/user/1');
    
    // Response is JSON - parse it
    const user = await response.json();
    console.log(user.id, user.name);
    
    // Sending data to API
    const newUser = {
      name: "Alice",
      email: "alice@example.com",
      age: 25
    };
    
    const postResponse = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    
    const result = await postResponse.json();
    console.log('User created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchUserData();`}
        language="javascript"
        title="api-json-example.js"
        defaultOpen={false}
      />

      <Gap size={2} />

      {/* JSON vs JavaScript Objects */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#ec4899', mr: 1 }}>📊</Box>
        JSON vs JavaScript Objects
      </Title>

      <TableComponent
        headers={['Feature', 'JSON', 'JavaScript Objects']}
        rows={[
          ['Property Names', 'Must be double-quoted', 'Can be unquoted (valid identifiers)'],
          ['Strings', 'Must use double quotes', 'Can use single or double quotes'],
          ['Functions', 'Not allowed', 'Allowed'],
          ['Comments', 'Not allowed', 'Allowed (// or /* */)'],
          ['Methods', 'Not allowed', 'Allowed'],
          ['Undefined', 'Not allowed', 'Allowed'],
          ['Data Type', 'Text format', 'JavaScript object'],
          ['Parsing', 'JSON.parse()', 'Native object'],
          ['Serialization', 'JSON.stringify()', 'N/A'],
        ]}
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
            <>Always use double quotes for keys and strings</>,
            <>Use <InlineCode>try-catch</InlineCode> when parsing JSON from external sources</>,
            <>Use <InlineCode>JSON.stringify(data, null, 2)</InlineCode> for readable output</>,
            <>Validate JSON structure before processing</>,
            <>Use meaningful key names in JSON</>,
            <>Keep JSON files clean and well-formatted</>,
          ]}
        />
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ Don'ts">
        <UnorderedList
          items={[
            <>Don't include functions or undefined values</>,
            <>Don't use trailing commas (invalid in JSON)</>,
            <>Don't forget to handle parse errors</>,
            <>Don't store sensitive data in JSON without encryption</>,
            <>Don't use single quotes for JSON strings</>,
            <>Don't add comments in JSON (use separate documentation)</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      {/* Advanced Topics */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f472b6', mr: 1 }}>🚀</Box>
        Advanced JSON Operations
      </Title>

      <CodeComponent
        code={`// 1. Deep cloning using JSON (limitations)
const original = {
  name: "John",
  address: { city: "NYC" }
};

const clone = JSON.parse(JSON.stringify(original));
clone.address.city = "LA";
console.log(original.address.city); // "NYC" (unchanged)

// 2. Replacer function - processing data
const data = {
  name: "John",
  password: "secret123",
  age: 30,
  email: "john@example.com"
};

const safeData = JSON.stringify(data, (key, value) => {
  if (key === 'password') return '[REDACTED]';
  return value;
});

console.log(safeData);
// {"name":"John","password":"[REDACTED]","age":30,"email":"john@example.com"}

// 3. Reviver function - transforming data
const jsonStr = '{"name":"John","birthDate":"1990-01-15"}';
const parsedData = JSON.parse(jsonStr, (key, value) => {
  if (key === 'birthDate') return new Date(value);
  return value;
});

console.log(parsedData.birthDate instanceof Date); // true`}
        language="javascript"
        title="advanced-json.js"
        defaultOpen={false}
      />

      <Gap size={2} />

      {/* Summary */}
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

      <Gap size={2} />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> JSON is the backbone of modern web development. Mastering JSON operations is essential for working with APIs, storing data, and building full-stack applications.
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
            sm: '1fr',
          },
          gap: 2,
          my: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(37, 99, 235, 0.06)',
            borderRadius: 2,
            p: 2.5,
            border: '2px solid rgba(37, 99, 235, 0.1)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', mb: 1 }}>
            JSON.parse()
          </Box>
          <CodeComponent
            code={`// String → Object
const obj = JSON.parse(jsonString);`}
            language="javascript"
            title=""
            showTitle={false}
            showCopyButton={true}
            defaultOpen={true}
          />
          <PlainText variant="caption" sx={{ mt: 1, display: 'block', color: 'grey.600' }}>
            Converts JSON string to JavaScript object
          </PlainText>
        </Box>

        <Box
          sx={{
            bgcolor: 'rgba(139, 92, 246, 0.06)',
            borderRadius: 2,
            p: 2.5,
            border: '2px solid rgba(139, 92, 246, 0.1)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#8b5cf6', mb: 1 }}>
            JSON.stringify()
          </Box>
          <CodeComponent
            code={`// Object → String
const json = JSON.stringify(obj);`}
            language="javascript"
            title=""
            showTitle={false}
            showCopyButton={true}
            defaultOpen={true}
          />
          <PlainText variant="caption" sx={{ mt: 1, display: 'block', color: 'grey.600' }}>
            Converts JavaScript object to JSON string
          </PlainText>
        </Box>
      </Box>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> JSON is everywhere in modern web development - from APIs to databases to configuration files. Mastering JSON is a must-have skill for every JavaScript developer!
      </Note>
    </QuestionWrapper>
  );
}