// data/questions/Question06.tsx
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
import { question05Meta } from './registry';

export function Question05({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question05Meta.id}
      title={question05Meta.title}
      definition={question05Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction */}
      <PlainText>
        The <InlineCode>slice()</InlineCode> method is a powerful array method in JavaScript that returns a <Bold>shallow copy</Bold> of a portion of an array into a new array object selected from <InlineCode>start</InlineCode> to <InlineCode>end</InlineCode> (<InlineCode>end</InlineCode> not included). The original array will not be modified.
      </PlainText>

      <PlainText>
        The <InlineCode>slice()</InlineCode> method is used to extract elements from an array without mutating the original array, making it an <Bold>immutable</Bold> operation.
      </PlainText>

      <Gap size={2} />

      {/* Syntax */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>📝</Box>
        Syntax
      </Title>

      <CodeComponent
        code={`// Syntax
arr.slice([start[, end]])

// Parameters:
// start (optional): Zero-based index at which to begin extraction
// end (optional): Zero-based index at which to end extraction (exclusive)

// Returns: A new array containing the extracted elements`}
        language="javascript"
        title="slice-syntax.js"
        defaultOpen={true}
      />

      <Note type="info" icon="💡">
        <Bold>Important:</Bold> <InlineCode>slice()</InlineCode> does not modify the original array - it returns a new array.
      </Note>

      <Gap size={2} />

      {/* Basic Usage */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>🔢</Box>
        Basic Usage Examples
      </Title>

      <CodeComponent
        code={`// Basic slice examples
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig'];

// 1. Slice with both start and end
const firstThree = fruits.slice(0, 3);
console.log(firstThree); // ['Apple', 'Banana', 'Cherry']

// 2. Slice with only start
const fromSecond = fruits.slice(2);
console.log(fromSecond); // ['Cherry', 'Date', 'Elderberry', 'Fig']

// 3. Slice with negative start
const lastThree = fruits.slice(-3);
console.log(lastThree); // ['Date', 'Elderberry', 'Fig']

// 4. Slice with negative end
const exceptLastTwo = fruits.slice(0, -2);
console.log(exceptLastTwo); // ['Apple', 'Banana', 'Cherry', 'Date']

// 5. Slice with both negative values
const middle = fruits.slice(-4, -1);
console.log(middle); // ['Cherry', 'Date', 'Elderberry']

// 6. Original array remains unchanged
console.log(fruits); // ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']`}
        language="javascript"
        title="slice-basic.js"
        defaultOpen={true}
      />

      <Gap size={2} />

      {/* Advanced Examples */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>🚀</Box>
        Advanced Usage & Patterns
      </Title>

      <CodeComponent
        code={`// 1. Cloning an entire array
const original = [1, 2, 3, 4, 5];
const clone = original.slice();
console.log(clone); // [1, 2, 3, 4, 5]
console.log(original === clone); // false (different reference)

// 2. Converting array-like objects to arrays
function convertArgs() {
  // arguments is array-like, not a real array
  const argsArray = Array.prototype.slice.call(arguments);
  // Or using modern syntax: const argsArray = Array.from(arguments);
  return argsArray;
}
console.log(convertArgs(1, 2, 3)); // [1, 2, 3]

// 3. Removing elements without mutating
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
// Remove middle elements (index 2 to 5)
const removed = numbers.slice(2, 6);
console.log(removed); // [3, 4, 5, 6]

// 4. Chaining with other array methods
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = data
  .slice(3, 8) // Get elements from index 3 to 7
  .filter(n => n % 2 === 0) // Keep only even numbers
  .map(n => n * 2); // Double each number
console.log(result); // [8, 12] (from [4, 6] doubled)

// 5. Creating a shallow copy of an array of objects
const people = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];
const copy = people.slice();
copy[0].age = 40; // Modifies the original too (shallow copy!)
console.log(people[0].age); // 40`}
        language="javascript"
        title="slice-advanced.js"
        defaultOpen={false}
      />

      <Note type="warning" icon="⚠️">
        <Bold>Important:</Bold> <InlineCode>slice()</InlineCode> creates a <Bold>shallow copy</Bold>. If the array contains objects, the objects themselves are not cloned - only references are copied.
      </Note>

      <Gap size={2} />

      {/* Visual Examples */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#06b6d4', mr: 1 }}>🎨</Box>
        Visual Examples
      </Title>

      <PlainText>
        <Bold>Example 1: Visual representation of slice</Bold>
      </PlainText>

      <Box
        sx={{
          bgcolor: '#0a0f1e',
          borderRadius: 2,
          p: 3,
          overflowX: 'auto',
          border: '1px solid rgba(255,255,255,0.05)',
          my: 2,
          fontFamily: 'monospace',
          fontSize: '0.9rem',
        }}
      >
        <Box sx={{ color: 'rgba(255,255,255,0.5)', mb: 1 }}>
          Original array: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box sx={{ 
            bgcolor: 'rgba(96, 165, 250, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #2563eb',
            textAlign: 'center',
            minWidth: 60,
          }}>
            <Box sx={{ color: '#60a5fa' }}>Apple</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>0</Box>
          </Box>
          <Box sx={{ 
            bgcolor: 'rgba(96, 165, 250, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #2563eb',
            textAlign: 'center',
            minWidth: 60,
          }}>
            <Box sx={{ color: '#60a5fa' }}>Banana</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>1</Box>
          </Box>
          <Box sx={{ 
            bgcolor: 'rgba(251, 191, 36, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #fbbf24',
            textAlign: 'center',
            minWidth: 60,
          }}>
            <Box sx={{ color: '#fcd34d' }}>Cherry</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>2</Box>
          </Box>
          <Box sx={{ 
            bgcolor: 'rgba(251, 191, 36, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #fbbf24',
            textAlign: 'center',
            minWidth: 60,
          }}>
            <Box sx={{ color: '#fcd34d' }}>Date</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>3</Box>
          </Box>
          <Box sx={{ 
            bgcolor: 'rgba(96, 165, 250, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #2563eb',
            textAlign: 'center',
            minWidth: 60,
          }}>
            <Box sx={{ color: '#60a5fa' }}>Elderberry</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>4</Box>
          </Box>
          <Box sx={{ 
            bgcolor: 'rgba(96, 165, 250, 0.2)', 
            p: 2, 
            borderRadius: 2,
            border: '2px solid #2563eb',
            textAlign: 'center',
            minWidth: 60,
          }}>
            <Box sx={{ color: '#60a5fa' }}>Fig</Box>
            <Box sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>5</Box>
          </Box>
        </Box>
        <Box sx={{ color: 'rgba(255,255,255,0.4)', mt: 2, textAlign: 'center' }}>
          <span style={{ color: '#fbbf24' }}>⬅️ slice(2, 4) extracts 'Cherry' and 'Date'</span>
        </Box>
      </Box>

      <Gap size={2} />

      {/* Slice vs Splice */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#ec4899', mr: 1 }}>📊</Box>
        Slice vs Splice Comparison
      </Title>

      <TableComponent
        headers={['Feature', 'slice()', 'splice()']}
        rows={[
          ['Modifies original array', '❌ No', '✅ Yes'],
          ['Returns', 'New array (shallow copy)', 'Array of removed elements'],
          ['Parameters', 'start, end (optional)', 'start, deleteCount, items...'],
          ['Mutates array', 'No (immutable)', 'Yes (mutable)'],
          ['Use case', 'Extract without changing', 'Add/remove elements'],
          ['Performance', 'Faster (no mutation)', 'Slower (mutates in place)'],
        ]}
      />

      <Note type="warning" icon="⚠️">
        <Bold>Remember:</Bold> <InlineCode>slice()</InlineCode> is immutable (doesn't change the original), while <InlineCode>splice()</InlineCode> is mutable (changes the original).
      </Note>

      <Gap size={2} />

      {/* Common Use Cases */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🎯</Box>
        Common Use Cases
      </Title>

      <CardComponent variant="success" title="📋 When to Use slice()">
        <UnorderedList
          items={[
            <>Creating a copy of an array</>,
            <>Extracting a portion of an array for processing</>,
            <>Converting array-like objects to arrays</>,
            <>Implementing pagination (showing subsets)</>,
            <>Creating a new array without modifying the original</>,
            <>Removing elements in a functional programming style</>,
            <>Chaining with other array methods like <InlineCode>map()</InlineCode> and <InlineCode>filter()</InlineCode></>,
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
        <Bold>Example: Pagination implementation</Bold>
      </PlainText>

      <CodeComponent
        code={`// Pagination with slice
const items = [
  'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
  'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
  'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'
];

function paginate(array, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: array.slice(start, end),
    currentPage: pageNumber,
    totalPages: Math.ceil(array.length / pageSize),
    totalItems: array.length
  };
}

const page1 = paginate(items, 1, 5);
console.log(page1);
// {
//   data: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
//   currentPage: 1,
//   totalPages: 3,
//   totalItems: 15
// }

// Get last 3 items
const lastThreeItems = items.slice(-3);
console.log(lastThreeItems); // ['Item 13', 'Item 14', 'Item 15']

// Get first 5 items
const firstFive = items.slice(0, 5);
console.log(firstFive); // ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

// Get middle items (skip first 3, take 5)
const middleItems = items.slice(3, 8);
console.log(middleItems); // ['Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']`}
        language="javascript"
        title="pagination-example.js"
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
            <>Use <InlineCode>slice()</InlineCode> for immutability when you don't want to modify the original array</>,
            <>Use <InlineCode>slice()</InlineCode> for creating copies of arrays</>,
            <>Use negative indices when you need to count from the end</>,
            <>Chain <InlineCode>slice()</InlineCode> with <InlineCode>map()</InlineCode>, <InlineCode>filter()</InlineCode>, and <InlineCode>reduce()</InlineCode> for clean functional code</>,
            <>Use <InlineCode>slice()</InlineCode> for implementing pagination</>,
            <>Always check that start index is less than end index</>,
          ]}
        />
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ Don'ts">
        <UnorderedList
          items={[
            <>Don't use <InlineCode>slice()</InlineCode> when you need to modify the original array (use <InlineCode>splice()</InlineCode>)</>,
            <>Don't assume <InlineCode>slice()</InlineCode> creates a deep copy for nested objects</>,
            <>Don't use <InlineCode>slice()</InlineCode> with large arrays when memory is a concern</>,
            <>Don't use <InlineCode>slice()</InlineCode> on non-array objects without converting them first</>,
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
            <><InlineCode>slice()</InlineCode> creates a shallow copy of a portion of an array</>,
            <>It's <Bold>immutable</Bold> - does not modify the original array</>,
            <>Uses zero-based indices: <InlineCode>start</InlineCode> (inclusive) and <InlineCode>end</InlineCode> (exclusive)</>,
            <>Negative indices count from the end of the array</>,
            <>Returns a new array with the extracted elements</>,
            <>Common use cases: cloning, pagination, converting array-like objects</>,
            <>Different from <InlineCode>splice()</InlineCode> which mutates the original array</>,
            <>Essential for functional programming and maintaining immutability</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Master <InlineCode>slice()</InlineCode> for clean, functional-style JavaScript. It's one of the most useful array methods for working with data without side effects.
      </HLText>

      <Gap size={2} />

      {/* Quick Reference */}
      <Title level={4}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>📋</Box>
        Quick Reference
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
        {[
          {
            title: 'Copy entire array',
            code: 'arr.slice()',
            color: '#2563eb',
          },
          {
            title: 'Copy from index',
            code: 'arr.slice(2)',
            color: '#8b5cf6',
          },
          {
            title: 'Copy range',
            code: 'arr.slice(2, 5)',
            color: '#f59e0b',
          },
          {
            title: 'Get last N items',
            code: 'arr.slice(-3)',
            color: '#06b6d4',
          },
          {
            title: 'Remove first N items',
            code: 'arr.slice(N)',
            color: '#10b981',
          },
          {
            title: 'Get middle items',
            code: 'arr.slice(2, -2)',
            color: '#ec4899',
          },
        ].map((item) => (
          <Box
            key={item.title}
            sx={{
              bgcolor: `${item.color}08`,
              borderRadius: 2,
              p: 2,
              border: `2px solid ${item.color}20`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${item.color}15`,
                borderColor: item.color,
              },
            }}
          >
            <Box sx={{ fontWeight: 600, color: item.color, mb: 1, fontSize: '0.85rem' }}>
              {item.title}
            </Box>
            <CodeComponent
              code={item.code}
              language="javascript"
              title=""
              showTitle={false}
              showCopyButton={true}
              defaultOpen={true}
            />
          </Box>
        ))}
      </Box>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> <InlineCode>slice()</InlineCode> is your go-to method for extracting array elements without changing the original array. It's essential for writing clean, immutable code!
      </Note>
    </QuestionWrapper>
  );
}