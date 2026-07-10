// data/questions/Question25.tsx
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
import { question25Meta } from "./registry";
import { useLevel } from "../../hooks";

export function Question25({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question25Meta.id}
      title={question25Meta.title}
      definition={question25Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        JavaScript provides built-in functions for <Bold>encoding</Bold> and <Bold>decoding</Bold> URLs. These functions convert special characters into a format that can be safely transmitted over the internet and decoded back to their original form.
      </PlainText>

      <PlainText>
        There are two main pairs of functions: <InlineCode>encodeURI()</InlineCode>/<InlineCode>decodeURI()</InlineCode> and <InlineCode>encodeURIComponent()</InlineCode>/<InlineCode>decodeURIComponent()</InlineCode>. They serve different purposes and have different behaviors.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Basic URL Encoding/Decoding
        </Title>

        <PlainText>
          URL encoding replaces special characters with a <InlineCode>%</InlineCode> followed by two hexadecimal digits:
        </PlainText>

        <CodeComponent
          code={`// Basic examples
const url = 'https://example.com/search?q=hello world';

// Encoding a URL
const encoded = encodeURI(url);
console.log(encoded);
// https://example.com/search?q=hello%20world

// Decoding a URL
const decoded = decodeURI(encoded);
console.log(decoded);
// https://example.com/search?q=hello world

// encodeURIComponent - encodes more characters
const query = 'hello world & more!';
const encodedComponent = encodeURIComponent(query);
console.log(encodedComponent);
// hello%20world%20%26%20more%21

const decodedComponent = decodeURIComponent(encodedComponent);
console.log(decodedComponent);
// hello world & more!`}
          language="javascript"
          title="url-encoding-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> <InlineCode>encodeURI()</InlineCode> is for full URLs, while <InlineCode>encodeURIComponent()</InlineCode> is for URL parameters.
        </Note>

        <CardComponent variant="info" title="🎯 Common Use Cases">
          <UnorderedList
            items={[
              <>🔗 <Bold>Building Query Strings:</Bold> Encoding user input for URLs</>,
              <>📧 <Bold>Email Links:</Bold> Encoding email addresses in mailto links</>,
              <>📱 <Bold>Deep Links:</Bold> Encoding app-specific URLs</>,
              <>🔄 <Bold>API Calls:</Bold> Sending data in URL parameters</>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>Practical Example: Building a Search URL</Bold>
        </PlainText>

        <CodeComponent
          code={`function buildSearchUrl(baseUrl, query, filters) {
  const params = new URLSearchParams();
  params.append('q', query);
  params.append('filter', filters);
  
  return baseUrl + '?' + params.toString();
}

const searchUrl = buildSearchUrl(
  'https://example.com/search',
  'javascript tutorial',
  'free'
);
console.log(searchUrl);
// https://example.com/search?q=javascript+tutorial&filter=free`}
          language="javascript"
          title="build-search-url.js"
          defaultOpen={true}
        />
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Understanding URL Encoding
        </Title>

        <PlainText>
          Deep dive into the differences between encoding functions:
        </PlainText>

        <CodeComponent
          code={`// 1. encodeURI vs encodeURIComponent
const text = 'Hello World! @#$%^&*()';

// encodeURI - preserves characters that are part of the URL
console.log(encodeURI(text));
// Hello%20World!%20@#$%25%5E&*()

// encodeURIComponent - encodes everything
console.log(encodeURIComponent(text));
// Hello%20World%21%20%40%23%24%25%5E%26%2A%28%29

// 2. Characters that are NOT encoded by encodeURI
// A-Z a-z 0-9 ; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #

// Characters that ARE encoded by encodeURIComponent
// Everything except A-Z a-z 0-9 - _ . ! ~ * ' ( )

// 3. Real-world scenario: Building a URL with parameters
const baseUrl = 'https://example.com/api';
const searchParams = {
  query: 'JavaScript & React',
  filter: 'free courses',
  page: 1
};

// Building URL correctly
function buildUrl(base, params) {
  const queryString = Object.entries(params)
    .map(([key, value]) => 
      \`\${encodeURIComponent(key)}=\${encodeURIComponent(value)}\`
    )
    .join('&');
  
  return \`\${base}?\${queryString}\`;
}

console.log(buildUrl(baseUrl, searchParams));
// https://example.com/api?query=JavaScript%20%26%20React&filter=free%20courses&page=1

// 4. Decoding URL parameters
function parseUrl(url) {
  const urlObj = new URL(url);
  const params = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

const url = 'https://example.com/api?query=JavaScript%20%26%20React&page=1';
console.log(parseUrl(url));
// { query: 'JavaScript & React', page: '1' }`}
          language="javascript"
          title="url-encoding-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Encoding Comparison">
          <TableComponent
            headers={['Character', 'encodeURI', 'encodeURIComponent']}
            rows={[
              ['space', '%20', '%20'],
              ['!', '!', '%21'],
              ['@', '@', '%40'],
              ['#', '#', '%23'],
              ['$', '$', '%24'],
              ['%', '%25', '%25'],
              ['^', '%5E', '%5E'],
              ['&', '&', '%26'],
              ['*', '*', '%2A'],
              ['(', '(', '%28'],
              [')', ')', '%29'],
              ['/', '/', '%2F'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Use <InlineCode>encodeURIComponent()</InlineCode> for query parameters and <InlineCode>encodeURI()</InlineCode> for the entire URL.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Mistakes">
          <UnorderedList
            items={[
              <>Using <InlineCode>encodeURI()</InlineCode> for query parameters (not safe)</>,
              <>Using <InlineCode>encodeURIComponent()</InlineCode> for the full URL (breaks it)</>,
              <>Forgetting to decode URL parameters</>,
              <>Not handling <InlineCode>null</InlineCode> or <InlineCode>undefined</InlineCode> values</>,
              <>Not handling special characters in URLs</>,
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
          Expert: Advanced URL Handling
        </Title>

        <PlainText>
          Expert-level URL encoding and decoding techniques:
        </PlainText>

        <CodeComponent
          code={`// 1. Custom encoding/decoding for special cases
function safeEncode(str) {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
}

function safeDecode(str) {
  return decodeURIComponent(str.replace(/[+]/g, ' '));
}

// 2. URLSearchParams - Modern API for URL parameters
const params = new URLSearchParams();
params.append('name', 'John Doe');
params.append('age', '30');
params.append('hobbies', ['reading', 'gaming', 'coding']);

console.log(params.toString());
// name=John+Doe&age=30&hobbies=reading%2Cgaming%2Ccoding

// 3. Working with URL objects
const urlObj = new URL('https://example.com/search');
urlObj.searchParams.set('q', 'hello world');
urlObj.searchParams.set('lang', 'en');
console.log(urlObj.toString());
// https://example.com/search?q=hello+world&lang=en

// 4. Decoding all parameters
function decodeAllParams(url) {
  const urlObj = new URL(url);
  const params = {};
  urlObj.searchParams.forEach((value, key) => {
    // Handle multiple values
    if (params[key]) {
      params[key] = Array.isArray(params[key]) 
        ? [...params[key], value] 
        : [params[key], value];
    } else {
      params[key] = value;
    }
  });
  return params;
}

// 5. Building complex query strings
function buildComplexQuery(params) {
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, v));
    } else if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  }
  
  return searchParams.toString();
}

const complexParams = {
  q: 'JavaScript',
  tags: ['beginner', 'tutorial'],
  page: 1,
  sort: undefined,
  filter: null
};

console.log(buildComplexQuery(complexParams));
// q=JavaScript&tags=beginner&tags=tutorial&page=1

// 6. Escaping special characters
function escapeSpecialChars(str) {
  const escaped = encodeURIComponent(str);
  return escaped.replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

console.log(escapeSpecialChars("Hello! World"));
// Hello%21%20World

// 7. URL encoding with Node.js and browser
// Both use the same functions
// But Node.js also has querystring module

// 8. Performance considerations
// - encodeURIComponent is slightly faster than encodeURI
// - Avoid decoding/encoding large strings in loops
// - Use URLSearchParams for complex operations`}
          language="javascript"
          title="url-encoding-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Advanced Techniques">
          <PlainText component="div">
            • <Bold>URLSearchParams:</Bold> Modern API for query string handling<br />
            • <Bold>URL Object:</Bold> Parsing and manipulating URLs<br />
            • <Bold>Base64 Encoding:</Bold> <InlineCode>btoa()</InlineCode> and <InlineCode>atob()</InlineCode><br />
            • <Bold>Custom Encoding:</Bold> Handling special cases<br />
            • <Bold>Array Parameters:</Bold> Handling multiple values<br />
            • <Bold>Nested Objects:</Bold> Complex query string structures
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>URLSearchParams</Bold> for modern URL handling</>,
              <>Use <Bold>new URL()</Bold> for parsing and building URLs</>,
              <>Always <Bold>encode</Bold> user input in URLs</>,
              <>Use <Bold>encodeURIComponent()</Bold> for query parameters</>,
              <>Use <Bold>encodeURI()</Bold> for full URLs</>,
              <>Handle <Bold>arrays</Bold> and <Bold>objects</Bold> in query strings carefully</>,
              <>Consider <Bold>security</Bold> - prevent XSS via URL encoding</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Best Practices">
          <PlainText component="div">
            • <Bold>encodeURIComponent()</Bold> for dynamic query parameters<br />
            • <Bold>URLSearchParams</Bold> for building query strings<br />
            • <Bold>new URL()</Bold> for parsing and validating URLs<br />
            • <Bold>decodeURIComponent()</Bold> for reading query parameters<br />
            • Always <Bold>decode</Bold> before using URL parameters<br />
            • Use <Bold>try-catch</Bold> for URL parsing errors
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Modern JavaScript provides <Bold>URL</Bold> and <Bold>URLSearchParams</Bold> APIs that make URL handling much easier and safer. They handle encoding and decoding automatically, reducing the chance of errors.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Understanding URL encoding is <Bold>essential</Bold> for building web applications. Use the right encoding function for the right purpose, and always handle user input carefully.
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
            <>Use <InlineCode>encodeURI()</InlineCode> for <Bold>full URLs</Bold></>,
            <>Use <InlineCode>encodeURIComponent()</InlineCode> for <Bold>query parameters</Bold></>,
            <>Use <InlineCode>decodeURI()</InlineCode> and <InlineCode>decodeURIComponent()</InlineCode> for decoding</>,
            <>Modern APIs: <Bold>URL</Bold> and <Bold>URLSearchParams</Bold></>,
            <>URL encoding replaces special characters with <InlineCode>%</InlineCode> + hex code</>,
            <>Always encode <Bold>user input</Bold> in URLs</>,
            <>Handle <Bold>arrays</Bold> and <Bold>nested objects</Bold> carefully</>,
            <>Consider <Bold>security</Bold> when building URLs</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use <Bold>URLSearchParams</Bold> for building query strings and <Bold>new URL()</Bold> for parsing URLs. They handle encoding and decoding automatically, making your code safer and more maintainable.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> URL encoding is <Bold>critical</Bold> for web development. Always encode user input, decode URL parameters, and use the right function for the job!
      </Note>
    </QuestionWrapper>
  );
}