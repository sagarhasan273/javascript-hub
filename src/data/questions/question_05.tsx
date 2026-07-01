// data/questions/Question05.tsx
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
import { question05Meta } from './registry';
import { useLevel } from '../../hooks';

export function Question05({ isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question05Meta.id}
      title={question05Meta.title}
      definition={question05Meta.definition}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The <InlineCode>slice()</InlineCode> method is a powerful array method in JavaScript that returns a <Bold>shallow copy</Bold> of a portion of an array into a new array object selected from <InlineCode>start</InlineCode> to <InlineCode>end</InlineCode> (<InlineCode>end</InlineCode> not included). The original array will not be modified.
      </PlainText>

      <PlainText>
        The <InlineCode>slice()</InlineCode> method is used to extract elements from an array without mutating the original array, making it an <Bold>immutable</Bold> operation.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding slice()
        </Title>

        <PlainText>
          Think of <InlineCode>slice()</InlineCode> like making a <Bold>photocopy</Bold> of a portion of a document - you get a copy without changing the original.
        </PlainText>

        <CardComponent variant="info" title="🎯 Simple Analogy">
          <PlainText>
            • Imagine you have a book with 10 pages<br />
            • You want to copy pages 3-5<br />
            • You use a photocopier to make a copy<br />
            • The original book stays unchanged<br />
            • <InlineCode>slice()</InlineCode> does the same thing with arrays!
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Examples:</Bold>
        </PlainText>

        <CodeComponent
          code={`// slice() - Copying without modifying
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// Copy elements from index 1 to 3 (end exclusive)
const sliced = fruits.slice(1, 3);
console.log(sliced);  // ['Banana', 'Cherry']
console.log(fruits);  // ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'] (unchanged)

// Copy from index 2 to end
const fromTwo = fruits.slice(2);
console.log(fromTwo);  // ['Cherry', 'Date', 'Elderberry']

// Copy last 2 elements (using negative index)
const lastTwo = fruits.slice(-2);
console.log(lastTwo);  // ['Date', 'Elderberry']

// Copy the entire array
const fullCopy = fruits.slice();
console.log(fullCopy); // ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']`}
          language="javascript"
          title="basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold>
          <PlainText component="div">
            • <InlineCode>slice()</InlineCode> = <Bold>Safe</Bold> (doesn't change the original)<br />
            • Uses <Bold>start</Bold> (inclusive) and <Bold>end</Bold> (exclusive) indices<br />
            • Negative indices count from the <Bold>end</Bold><br />
            • Returns a <Bold>new array</Bold>
          </PlainText>
        </Note>

        <CardComponent variant="success" title="✅ When to Use slice() (Beginner)">
          <UnorderedList
            items={[
              <>Copying an array without modifying the original</>,
              <>Getting a portion of an array</>,
              <>Creating a new array for display (like pagination)</>,
              <>Making a safe copy before modifying</>,
            ]}
          />
        </CardComponent>

        <Note type="success" icon="✅">
          <Bold>Quick Rule:</Bold> If you want to keep the original array unchanged, use <InlineCode>slice()</InlineCode>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Deep Dive & Use Cases
        </Title>

        <PlainText>
          Understanding the detailed behavior and advanced use cases of <InlineCode>slice()</InlineCode>:
        </PlainText>

        <CodeComponent
          code={`// Advanced slice() patterns
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Cloning an array (shallow copy)
const clone = numbers.slice();
console.log(clone); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(numbers === clone); // false (different references)

// 2. Converting array-like objects to arrays
function convertToArray() {
  // arguments is array-like, not a real array
  const args = Array.prototype.slice.call(arguments);
  return args;
}
console.log(convertToArray(1, 2, 3)); // [1, 2, 3]

// 3. Removing elements without mutating
const withoutMiddle = numbers.slice(0, 3).concat(numbers.slice(6));
console.log(withoutMiddle); // [1, 2, 3, 7, 8, 9, 10]

// 4. Chaining with other methods
const result = numbers
  .slice(3, 8)        // [4, 5, 6, 7, 8]
  .filter(n => n % 2 === 0) // [4, 6, 8]
  .map(n => n * 2);   // [8, 12, 16]
console.log(result); // [8, 12, 16]

// 5. Shallow copy warning
const people = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
const copy = people.slice();
copy[0].age = 40; // Modifies the original too!
console.log(people[0].age); // 40 (shallow copy!)`}
          language="javascript"
          title="advanced.js"
          defaultOpen={false}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>slice()</InlineCode> creates a <Bold>shallow copy</Bold>. Nested objects are copied by reference, not by value.
        </Note>

        <Title level={4}>slice() vs splice()</Title>

        <TableComponent
          headers={['Feature', 'slice()', 'splice()']}
          rows={[
            ['Modifies original', '❌ No', '✅ Yes'],
            ['Returns', 'New array (shallow copy)', 'Array of removed elements'],
            ['Parameters', 'start, end (optional)', 'start, deleteCount, items...'],
            ['Mutates array', 'No (immutable)', 'Yes (mutable)'],
            ['Use case', 'Extract without changing', 'Add/remove elements'],
          ]}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Remember:</Bold> <InlineCode>slice()</InlineCode> is <Bold>immutable</Bold> (doesn't change the original), while <InlineCode>splice()</InlineCode> is <Bold>mutable</Bold> (changes the original).
        </Note>

        <Title level={4}>Pagination Implementation</Title>

        <CodeComponent
          code={`// Advanced pagination with slice
class Paginator {
  constructor(data, pageSize = 10) {
    this.data = data;
    this.pageSize = pageSize;
  }
  
  getPage(pageNumber) {
    const start = (pageNumber - 1) * this.pageSize;
    const end = start + this.pageSize;
    return {
      data: this.data.slice(start, end),
      currentPage: pageNumber,
      totalPages: Math.ceil(this.data.length / this.pageSize),
      hasNext: pageNumber < this.totalPages,
      hasPrev: pageNumber > 1
    };
  }
  
  get totalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }
}

// Usage
const items = Array.from({ length: 100 }, (_, i) => ({ id: i, name: \`Item \${i}\` }));
const paginator = new Paginator(items, 10);
console.log(paginator.getPage(1).data.length); // 10 items`}
          language="javascript"
          title="pagination.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="📋 When to Use slice() (Advanced)">
          <UnorderedList
            items={[
              <>Creating a copy of an array</>,
              <>Extracting a portion of an array for processing</>,
              <>Converting array-like objects to arrays</>,
              <>Implementing pagination (showing subsets)</>,
              <>Creating a new array without modifying the original</>,
              <>Removing elements in a functional programming style</>,
              <>Chaining with other array methods</>,
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
          Expert: Advanced Patterns & Performance
        </Title>

        <PlainText>
          Deep dive into advanced patterns, performance considerations, and expert-level techniques.
        </PlainText>

        <Title level={4}>1. Performance Benchmarks</Title>

        <CodeComponent
          code={`// Performance comparison
const arraySize = 100000;
const testArray = Array.from({ length: arraySize }, (_, i) => i);

// slice() performance
console.time('slice');
const sliced = testArray.slice(1000, 2000);
console.timeEnd('slice');

// Manual copy performance
console.time('manual');
const manual = [];
for (let i = 1000; i < 2000; i++) {
  manual.push(testArray[i]);
}
console.timeEnd('manual');

// slice() is optimized and generally faster than manual loops`}
          language="javascript"
          title="performance.js"
          defaultOpen={false}
        />

        <Title level={4}>2. React State Management Pattern</Title>

        <CodeComponent
          code={`// React immutable updates with slice
const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);

// 1. Remove item (immutable)
const removeItem = (index) => {
  setItems([
    ...items.slice(0, index),
    ...items.slice(index + 1)
  ]);
};

// 2. Insert item (immutable)
const insertItem = (index, newItem) => {
  setItems([
    ...items.slice(0, index),
    newItem,
    ...items.slice(index)
  ]);
};

// 3. Replace item (immutable)
const replaceItem = (index, newItem) => {
  setItems([
    ...items.slice(0, index),
    newItem,
    ...items.slice(index + 1)
  ]);
};

// 4. Move item (immutable)
const moveItem = (fromIndex, toIndex) => {
  const item = items[fromIndex];
  const newItems = [
    ...items.slice(0, fromIndex),
    ...items.slice(fromIndex + 1)
  ];
  setItems([
    ...newItems.slice(0, toIndex),
    item,
    ...newItems.slice(toIndex)
  ]);
};`}
          language="javascript"
          title="react-pattern.js"
          defaultOpen={false}
        />

        <Title level={4}>3. Data Transformation Pipeline</Title>

        <CodeComponent
          code={`// Functional pipeline with slice
const pipeline = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data);

// Data transformation pipeline
const processData = pipeline(
  (data) => data.slice(0, 100),           // Limit to 100 items
  (data) => data.filter(item => item.active),
  (data) => data.map(item => ({ ...item, processed: true })),
  (data) => data.sort((a, b) => a.id - b.id),
  (data) => data.slice(0, 10)             // Take top 10
);

// Usage
const results = processData(largeDataset);

// Advanced: Lazy evaluation with slice
function lazySlice(array, start, end) {
  return {
    *[Symbol.iterator]() {
      for (let i = start; i < end && i < array.length; i++) {
        yield array[i];
      }
    },
    toArray() {
      return Array.from(this);
    }
  };
}

const lazy = lazySlice([1, 2, 3, 4, 5], 1, 4);
console.log([...lazy]); // [2, 3, 4]`}
          language="javascript"
          title="pipeline.js"
          defaultOpen={false}
        />

        <Title level={4}>4. Memory Management</Title>

        <CodeComponent
          code={`// Memory considerations
const largeArray = Array.from({ length: 1000000 }, (_, i) => i);

// 1. slice creates a new array (uses memory)
const subset = largeArray.slice(0, 1000); // New array in memory

// 2. Memory efficient alternative (when possible)
function processInChunks(array, chunkSize, callback) {
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    callback(chunk);
  }
}

// 3. When to use slice for memory
// Use slice for: Small to medium arrays
// Avoid slice for: Very large arrays (consider iterators)

// 4. Garbage collection
let data = largeArray.slice(); // Creates new reference
data = null; // Allows garbage collection

// 5. Best practice for large datasets
function processLargeArray(array) {
  // Use slice in chunks to manage memory
  const chunkSize = 10000;
  const results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    results.push(processChunk(chunk));
  }
  return results.flat();
}`}
          language="javascript"
          title="memory.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="⚡ Expert Performance Tips">
          <UnorderedList
            items={[
              <>Use <Bold>slice()</Bold> for immutability in React and Redux</>,
              <>For large arrays, consider using <Bold>iterators</Bold> instead of <InlineCode>slice()</InlineCode></>,
              <>Use <Bold>slice()</Bold> in data pipelines for functional programming</>,
              <>Be aware of <Bold>shallow copy</Bold> behavior with nested objects</>,
              <>Use <Bold>slice(0)</Bold> as an alternative to spread operator for copying</>,
              <>Consider memory usage when copying large arrays</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> <InlineCode>slice()</InlineCode> is essential for writing <Bold>immutable</Bold> and <Bold>functional</Bold> JavaScript. It's particularly valuable in React, Redux, and other state management libraries where immutability is key for predictable state updates.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> While <InlineCode>slice()</InlineCode> is very useful, be mindful of performance with very large arrays (100,000+ elements). Consider using <Bold>iterators</Bold> or <Bold>generators</Bold> for memory-intensive operations.
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

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Master <InlineCode>slice()</InlineCode> for clean, functional-style JavaScript. It's one of the most useful array methods for working with data without side effects.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> <InlineCode>slice()</InlineCode> is your go-to method for extracting array elements without changing the original array. It's essential for writing clean, immutable code!
      </Note>
    </QuestionWrapper>
  );
}