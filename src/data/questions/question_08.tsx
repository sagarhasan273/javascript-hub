// data/questions/Question08.tsx
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
import { question08Meta } from './registry';

export function Question08({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question08Meta.id}
      title={question08Meta.title}
      definition={question08Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction */}
      <PlainText>
        The <Bold>==</Bold> (equality) and <Bold>===</Bold> (strict equality) operators are used to compare values in JavaScript. The key difference is that <InlineCode>==</InlineCode> performs <Bold>type coercion</Bold> (converts values to the same type before comparison), while <InlineCode>===</InlineCode> does <Bold>not</Bold> perform type coercion (values must be of the same type to be considered equal).
      </PlainText>

      <PlainText>
        Understanding this difference is crucial for writing <Bold>bug-free</Bold> and <Bold>predictable</Bold> JavaScript code.
      </PlainText>

      <Gap size={2} />

      {/* Quick Comparison */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>📊</Box>
        Quick Comparison
      </Title>

      <TableComponent
        headers={['Feature', '== (Loose Equality)', '=== (Strict Equality)']}
        rows={[
          ['Type Coercion', '✅ Yes (converts types)', '❌ No (no type conversion)'],
          ['Compares', 'Values after type conversion', 'Values and types'],
          ['Performance', 'Slower (needs type conversion)', 'Faster (no type conversion)'],
          ['Predictability', 'Less predictable', 'More predictable'],
          ['Best Practice', 'Avoid when possible', 'Always prefer'],
          ['Use Case', 'When you know types will be compatible', 'Default choice'],
          ['ES6+', 'Used less often', 'Recommended standard'],
        ]}
      />

      <Gap size={2} />

      {/* 1. Loose Equality (==) */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>🔀</Box>
        1. Loose Equality (==) - With Type Coercion
      </Title>

      <PlainText>
        The <InlineCode>==</InlineCode> operator compares two values for equality <Bold>after</Bold> converting both values to a common type. This can lead to <Bold>unexpected results</Bold> if you're not careful.
      </PlainText>

      <CodeComponent
        code={`// == - Loose Equality Examples
// 1. String vs Number
console.log(5 == '5');        // true (string '5' converts to number 5)
console.log(true == 1);       // true (true converts to 1)
console.log(false == 0);      // true (false converts to 0)
console.log('' == 0);         // true (empty string converts to 0)
console.log('' == false);     // true (both convert to 0)

// 2. Null vs Undefined
console.log(null == undefined); // true (special case)

// 3. Objects
console.log([] == false);     // true ([] converts to '', then 0)
console.log([1] == 1);        // true ([1] converts to '1', then 1)
console.log([1,2] == '1,2');  // true (array joins to string)

// 4. Truthy/Falsy pitfalls
console.log('' == 0);         // true (both false)
console.log(' ' == 0);        // true (space trims to '')
console.log('0' == false);    // true ('0' converts to 0, false to 0)

// 5. NaN never equals NaN
console.log(NaN == NaN);      // false (NaN is not equal to itself)

// 6. Objects with same content but different references
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 == obj2);    // false (different references)`}
        language="javascript"
        title="loose-equality.js"
        defaultOpen={true}
      />

      <Note type="warning" icon="⚠️">
        <Bold>Beware:</Bold> The <InlineCode>==</InlineCode> operator can produce <Bold>unexpected results</Bold> due to its complex type coercion rules. It's recommended to use <InlineCode>===</InlineCode> instead.
      </Note>

      <Gap size={2} />

      {/* 2. Strict Equality (===) */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>🎯</Box>
        2. Strict Equality (===) - No Type Coercion
      </Title>

      <PlainText>
        The <InlineCode>===</InlineCode> operator compares two values for equality <Bold>without</Bold> performing type coercion. It returns <InlineCode>true</InlineCode> only if both the <Bold>value</Bold> and the <Bold>type</Bold> are the same.
      </PlainText>

      <CodeComponent
        code={`// === - Strict Equality Examples
// 1. Same type, same value -> true
console.log(5 === 5);         // true
console.log('hello' === 'hello'); // true
console.log(true === true);   // true
console.log(null === null);   // true
console.log(undefined === undefined); // true

// 2. Different types -> false
console.log(5 === '5');       // false (number vs string)
console.log(true === 1);      // false (boolean vs number)
console.log(false === 0);     // false (boolean vs number)
console.log(null === undefined); // false (different types)

// 3. Same value, different objects -> false
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2);   // false (different references)
console.log(obj1 === obj1);   // true (same reference)

// 4. NaN is never equal to NaN
console.log(NaN === NaN);     // false

// 5. Arrays
console.log([] === []);       // false (different references)
console.log([1] === [1]);     // false (different references)

// 6. 0 and -0
console.log(0 === -0);        // true (both are zero)

// 7. Functions
const func1 = () => {};
const func2 = () => {};
console.log(func1 === func2); // false (different references)
console.log(func1 === func1); // true (same reference)`}
        language="javascript"
        title="strict-equality.js"
        defaultOpen={true}
      />

      <Note type="info" icon="💡">
        <Bold>Best Practice:</Bold> Always use <InlineCode>===</InlineCode> by default. It's <Bold>faster</Bold>, <Bold>more predictable</Bold>, and helps avoid bugs caused by type coercion.
      </Note>

      <Gap size={2} />

      {/* Type Coercion Rules */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>🔄</Box>
        Type Coercion Rules for ==
      </Title>

      <PlainText>
        When using <InlineCode>==</InlineCode>, JavaScript follows these rules for type coercion:
      </PlainText>

      <CardComponent variant="info" title="📋 Coercion Rules">
        <PlainText component="div">
          • <Bold>Number vs String:</Bold> String is converted to Number<br />
          • <Bold>Boolean vs Any:</Bold> Boolean is converted to Number (true=1, false=0)<br />
          • <Bold>Object vs Primitive:</Bold> Object is converted to primitive using <InlineCode>valueOf()</InlineCode> or <InlineCode>toString()</InlineCode><br />
          • <Bold>Null vs Undefined:</Bold> Equal (special case)<br />
          • <Bold>NaN vs Any:</Bold> Always false (even with itself)<br />
          • <Bold>Objects:</Bold> Compared by reference (not content)
        </PlainText>
      </CardComponent>

      <Gap size={2} />

      {/* Common Pitfalls */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>⚠️</Box>
        Common Pitfalls with ==
      </Title>

      <CodeComponent
        code={`// Common pitfalls with ==
// 1. Empty strings and numbers
console.log('' == 0);         // true (surprising!)
console.log('   ' == 0);      // true (whitespace converts to 0)

// 2. Arrays and strings
console.log([] == '');        // true (empty array converts to '')
console.log(['hello'] == 'hello'); // true (array joins to string)
console.log([1,2] == '1,2');  // true

// 3. Truthy/Falsy confusion
console.log('0' == false);    // true (both convert to 0)
console.log('' == false);     // true (both convert to 0)
console.log(' ' == false);    // true (space trims to '')

// 4. Object equality
console.log({} == {});        // false (different references)
console.log({} == '[object Object]'); // false (different refs)

// 5. Null and undefined
console.log(null == 0);       // false (null is only equal to undefined)
console.log(undefined == 0);  // false (undefined is only equal to null)

// 6. Number vs Boolean
console.log(1 == true);       // true (both are 1)
console.log(0 == false);      // true (both are 0)
console.log(2 == true);       // false (2 is not 1)`}
        language="javascript"
        title="pitfalls.js"
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
        {/* == Visual */}
        <Box
          sx={{
            bgcolor: 'rgba(245, 158, 11, 0.06)',
            borderRadius: 2,
            p: 3,
            border: '2px solid rgba(245, 158, 11, 0.2)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b', mb: 2 }}>
            🔀 == (Loose Equality)
          </Box>
          <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Box sx={{ color: '#f59e0b' }}>5</Box>
              <Box sx={{ color: 'rgba(255,255,255,0.3)' }}>==</Box>
              <Box sx={{ color: '#f59e0b' }}>'5'</Box>
            </Box>
            <Box sx={{ color: 'grey.600', fontSize: '0.75rem' }}>↓ Type Coercion</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ color: '#10b981' }}>5</Box>
              <Box sx={{ color: 'rgba(255,255,255,0.3)' }}>==</Box>
              <Box sx={{ color: '#10b981' }}>5</Box>
            </Box>
            <Box sx={{ color: '#10b981', fontWeight: 600 }}>✅ true</Box>
          </Box>
          <PlainText variant="caption" sx={{ mt: 2, display: 'block', color: 'grey.600' }}>
            Converts types before comparing
          </PlainText>
        </Box>

        {/* === Visual */}
        <Box
          sx={{
            bgcolor: 'rgba(37, 99, 235, 0.06)',
            borderRadius: 2,
            p: 3,
            border: '2px solid rgba(37, 99, 235, 0.2)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', mb: 2 }}>
            🎯 === (Strict Equality)
          </Box>
          <Box sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Box sx={{ color: '#2563eb' }}>5</Box>
              <Box sx={{ color: 'rgba(255,255,255,0.3)' }}>===</Box>
              <Box sx={{ color: '#ef4444' }}>'5'</Box>
            </Box>
            <Box sx={{ color: 'grey.600', fontSize: '0.75rem' }}>↓ Type Check</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ color: '#2563eb' }}>number</Box>
              <Box sx={{ color: 'rgba(255,255,255,0.3)' }}>vs</Box>
              <Box sx={{ color: '#ef4444' }}>string</Box>
            </Box>
            <Box sx={{ color: '#ef4444', fontWeight: 600 }}>❌ false</Box>
          </Box>
          <PlainText variant="caption" sx={{ mt: 2, display: 'block', color: 'grey.600' }}>
            Compares both type and value
          </PlainText>
        </Box>
      </Box>

      <Gap size={2} />

      {/* When to Use Which */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🎯</Box>
        When to Use Which?
      </Title>

      <CardComponent variant="success" title="✅ When to Use === (Strict Equality)">
        <UnorderedList
          items={[
            <>As the <Bold>default</Bold> choice for all comparisons</>,
            <>When comparing values where type matters</>,
            <>When you want <Bold>predictable</Bold> results</>,
            <>In <Bold>if statements</Bold> and conditionals</>,
            <>When comparing with <InlineCode>null</InlineCode> or <InlineCode>undefined</InlineCode></>,
            <>In <Bold>production code</Bold> (avoid surprises)</>,
            <>When checking for <Bold>true/false</Bold> values</>,
          ]}
        />
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ When to Use == (Loose Equality)">
        <UnorderedList
          items={[
            <>Checking if a value is <InlineCode>null</InlineCode> or <InlineCode>undefined</InlineCode> (<InlineCode>value == null</InlineCode>)</>,
            <>When you <Bold>intentionally</Bold> want type coercion</>,
            <>Working with <Bold>legacy code</Bold> (be careful)</>,
            <>Quick checks where types are <Bold>already known</Bold></>,
            <>When comparing <Bold>DOM properties</Bold> (sometimes return strings)</>,
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
        <Bold>Example 1: Form Validation</Bold>
      </PlainText>

      <CodeComponent
        code={`// Form validation - Using == for null/undefined check
function validateInput(input) {
  // Check if input is null or undefined
  if (input == null) {
    return 'Input is required';
  }
  
  // Strict comparison for values
  if (input === '') {
    return 'Input cannot be empty';
  }
  
  if (typeof input === 'number' && input === 0) {
    return 'Input cannot be zero';
  }
  
  return 'Valid input';
}

console.log(validateInput(null));     // 'Input is required'
console.log(validateInput(undefined)); // 'Input is required'
console.log(validateInput(''));       // 'Input cannot be empty'
console.log(validateInput(0));        // 'Input cannot be zero'
console.log(validateInput('hello'));  // 'Valid input'`}
        language="javascript"
        title="validation-example.js"
        defaultOpen={false}
      />

      <Gap size={1} />

      <PlainText>
        <Bold>Example 2: API Response Handling</Bold>
      </PlainText>

      <CodeComponent
        code={`// API response with mixed types
function handleResponse(data) {
  // Use == for null/undefined check
  if (data == null) {
    console.log('No data received');
    return;
  }

  // Use === for specific type checks
  if (Array.isArray(data)) {
    console.log('Processing array with \${data.length} items');
    return data.length;
  }

  if (typeof data === 'object' && data !== null) {
    console.log('Processing object');
    return Object.keys(data).length;
  }

  if (typeof data === 'string' && data === '') {
    console.log('Empty string received');
    return 0;
  }

  return data;
}

console.log(handleResponse(null));    // 'No data received'
console.log(handleResponse(undefined)); // 'No data received'
console.log(handleResponse([]));      // 'Processing array with 0 items'
console.log(handleResponse({}));      // 'Processing object'
console.log(handleResponse(''));      // 'Empty string received'`}
        language="javascript"
        title="api-example.js"
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
            <>Always use <InlineCode>===</InlineCode> as the <Bold>default</Bold> comparison operator</>,
            <>Use <InlineCode>==</InlineCode> only when you <Bold>intentionally</Bold> need type coercion</>,
            <>Use <InlineCode>== null</InlineCode> as a shorthand to check for both <InlineCode>null</InlineCode> and <InlineCode>undefined</InlineCode></>,
            <>Use <InlineCode>Object.is()</InlineCode> for special cases (NaN, -0, +0)</>,
            <>Be explicit about type checks with <InlineCode>typeof</InlineCode> or <InlineCode>instanceof</InlineCode></>,
            <>Use ESLint rules to enforce <InlineCode>===</InlineCode> usage</>,
          ]}
        />
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ Don'ts">
        <UnorderedList
          items={[
            <>Don't rely on <InlineCode>==</InlineCode> for equality checks in production</>,
            <>Don't use <InlineCode>==</InlineCode> when you're unsure about types</>,
            <>Don't compare <InlineCode>NaN</InlineCode> with any operator (use <InlineCode>isNaN()</InlineCode>)</>,
            <>Don't assume <InlineCode>==</InlineCode> works the same across all JavaScript engines</>,
            <>Don't use <InlineCode>==</InlineCode> for comparing objects (use deep equality check)</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      {/* Special Cases */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#ec4899', mr: 1 }}>🔍</Box>
        Special Cases
      </Title>

      <CodeComponent
        code={`// Special cases to be aware of
// 1. NaN comparisons
console.log(NaN === NaN);     // false
console.log(NaN == NaN);      // false
console.log(isNaN(NaN));      // true (use isNaN or Number.isNaN)

// 2. Object.is() - Modern solution
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, +0));   // false
console.log(Object.is(0, 0));     // true

// 3. null and undefined
console.log(null === undefined);  // false
console.log(null == undefined);   // true
console.log(Object.is(null, undefined)); // false

// 4. 0 and -0
console.log(0 === -0);        // true
console.log(Object.is(0, -0)); // false (distinguishes negative zero)

// 5. Checking for null or undefined in one check
const value = null;
if (value == null) {
  console.log('Value is null or undefined');
}

// Better practice for clarity
if (value === null || value === undefined) {
  console.log('Value is null or undefined');
}`}
        language="javascript"
        title="special-cases.js"
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
            <><InlineCode>==</InlineCode> performs <Bold>type coercion</Bold> before comparison</>,
            <><InlineCode>===</InlineCode> compares <Bold>both type and value</Bold> without coercion</>,
            <>Always prefer <InlineCode>===</InlineCode> for <Bold>predictable</Bold> and <Bold>bug-free</Bold> code</>,
            <>Use <InlineCode>== null</InlineCode> as a shorthand for <InlineCode>null</InlineCode> or <InlineCode>undefined</InlineCode> check</>,
            <><InlineCode>NaN</InlineCode> is never equal to itself (use <InlineCode>isNaN()</InlineCode> or <InlineCode>Number.isNaN()</InlineCode>)</>,
            <>Objects are compared by <Bold>reference</Bold>, not content (use deep equality for content)</>,
            <>Use <InlineCode>Object.is()</InlineCode> for <InlineCode>NaN</InlineCode> and <InlineCode>-0</InlineCode> comparisons</>,
            <>Enable ESLint rules to enforce consistent usage</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Always default to <InlineCode>===</InlineCode> and only use <InlineCode>==</InlineCode> when you <Bold>intentionally</Bold> want type coercion, like checking for <InlineCode>null</InlineCode> or <InlineCode>undefined</InlineCode>. This will save you from countless bugs!
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
        {/* == Card */}
        <Box
          sx={{
            bgcolor: 'rgba(245, 158, 11, 0.06)',
            borderRadius: 2,
            p: 2.5,
            border: '2px solid rgba(245, 158, 11, 0.15)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b', mb: 1 }}>
            🔀 == (Loose)
          </Box>
          <CodeComponent
            code={`5 == '5'     // true
1 == true     // true
0 == false    // true
null == undefined // true
[] == false   // true`}
            language="javascript"
            title=""
            showTitle={false}
            showCopyButton={true}
            defaultOpen={true}
          />
          <PlainText variant="caption" sx={{ mt: 1, display: 'block', color: 'grey.600' }}>
            Coerces types before comparing
          </PlainText>
        </Box>

        {/* === Card */}
        <Box
          sx={{
            bgcolor: 'rgba(37, 99, 235, 0.06)',
            borderRadius: 2,
            p: 2.5,
            border: '2px solid rgba(37, 99, 235, 0.15)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', mb: 1 }}>
            🎯 === (Strict)
          </Box>
          <CodeComponent
            code={`5 === '5'    // false
1 === true    // false
0 === false   // false
null === undefined // false
[] === false  // false`}
            language="javascript"
            title=""
            showTitle={false}
            showCopyButton={true}
            defaultOpen={true}
          />
          <PlainText variant="caption" sx={{ mt: 1, display: 'block', color: 'grey.600' }}>
            Compares type and value
          </PlainText>
        </Box>
      </Box>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> <InlineCode>===</InlineCode> is your <Bold>friend</Bold> - it's safe, predictable, and will save you from many bugs. Use <InlineCode>==</InlineCode> only when you <Bold>know</Bold> what you're doing!
      </Note>
    </QuestionWrapper>
  );
}