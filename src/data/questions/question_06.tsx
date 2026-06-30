// data/questions/Question06.tsx
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
import { question06Meta } from './registry';
import { useLevel } from '../../context/LevelContext';

export function Question06({ isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question06Meta.id}
      title={question06Meta.title}
      definition={question06Meta.definition}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>slice()</Bold> and <Bold>splice()</Bold> are two commonly used array methods in JavaScript that are often confused. While they sound similar, they serve <Bold>completely different purposes</Bold> and have different behaviors.
      </PlainText>

      <PlainText>
        The key difference is that <Bold>slice()</Bold> is <Bold>immutable</Bold> (doesn't change the original array) and returns a new array, while <Bold>splice()</Bold> is <Bold>mutable</Bold> (modifies the original array) and changes the array in place.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding slice() and splice()
        </Title>

        <PlainText>
          Think of <InlineCode>slice()</InlineCode> and <InlineCode>splice()</InlineCode> like this:
        </PlainText>

        <CardComponent variant="info" title="🎯 Simple Analogy">
          <PlainText>
            • <Bold>slice()</Bold> is like <Bold>copying</Bold> - you take a copy of a portion without touching the original<br />
            • <Bold>splice()</Bold> is like <Bold>editing</Bold> - you modify the original by cutting, adding, or replacing
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Examples:</Bold>
        </PlainText>

        <CodeComponent
          code={`// SLICE - Copy without modifying
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// Copy elements from index 1 to 3 (end exclusive)
const sliced = fruits.slice(1, 3);
console.log(sliced);  // ['Banana', 'Cherry']
console.log(fruits);  // ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'] (unchanged)

// SPLICE - Modify the original
const fruits2 = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// Remove 2 elements starting from index 1
const spliced = fruits2.splice(1, 2);
console.log(spliced);  // ['Banana', 'Cherry']
console.log(fruits2);  // ['Apple', 'Date', 'Elderberry'] (modified!)`}
          language="javascript"
          title="basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold>
          <PlainText component="div">
            • <InlineCode>slice()</InlineCode> = <Bold>Safe</Bold> (doesn't change original)<br />
            • <InlineCode>splice()</InlineCode> = <Bold>Changes</Bold> (modifies original)
          </PlainText>
        </Note>

        <TableComponent
          headers={['Method', 'Changes Original?', 'Use For']}
          rows={[
            ['slice()', '❌ No', 'Copying, extracting'],
            ['splice()', '✅ Yes', 'Removing, adding, replacing'],
          ]}
        />

        <CardComponent variant="success" title="✅ When to Use (Beginner)">
          <UnorderedList
            items={[
              <>Use <Bold>slice()</Bold> when you need a copy without changing the original</>,
              <>Use <Bold>splice()</Bold> when you want to modify the original array</>,
              <>Use <Bold>slice()</Bold> for pagination and displaying subsets</>,
              <>Use <Bold>splice()</Bold> for removing items from a list</>,
            ]}
          />
        </CardComponent>

        <Note type="success" icon="✅">
          <Bold>Quick Rule:</Bold> If you want to keep the original array, use <InlineCode>slice()</InlineCode>. If you want to change it, use <InlineCode>splice()</InlineCode>.
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
          Understanding the detailed differences and when to use each method:
        </PlainText>

        <TableComponent
          headers={['Feature', 'slice()', 'splice()']}
          rows={[
            ['Mutates Original Array', '❌ No (Immutable)', '✅ Yes (Mutable)'],
            ['Returns', 'New array (shallow copy)', 'Array of removed elements'],
            ['Parameters', 'start, end (optional)', 'start, deleteCount, items...'],
            ['Can Add Elements', '❌ No', '✅ Yes'],
            ['Can Remove Elements', '✅ Yes (via extraction)', '✅ Yes'],
            ['Can Replace Elements', '❌ No', '✅ Yes'],
            ['Original Array Size', 'Unchanged', 'Changes'],
            ['Performance', 'Faster (no mutation)', 'Slower (mutates in place)'],
          ]}
        />

        <Title level={4}>slice() - Immutable Extraction</Title>

        <CodeComponent
          code={`// slice() in detail
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// 1. Basic extraction
const sliced1 = fruits.slice(1, 3);  // ['Banana', 'Cherry']

// 2. Negative indices (count from end)
const sliced2 = fruits.slice(-2);     // ['Date', 'Elderberry']
const sliced3 = fruits.slice(0, -2);  // ['Apple', 'Banana', 'Cherry']

// 3. Full copy
const fullCopy = fruits.slice();      // ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

// 4. Array-like to array conversion
function toArray() {
  return Array.prototype.slice.call(arguments);
}
console.log(toArray(1, 2, 3));  // [1, 2, 3]

// 5. Chaining with other methods
const result = fruits
  .slice(1, 4)  // ['Banana', 'Cherry', 'Date']
  .filter(f => f.length > 5)  // ['Banana', 'Elderberry'] (in original)
  .map(f => f.toUpperCase());  // ['BANANA', 'ELDERBERRY']`}
          language="javascript"
          title="slice-advanced.js"
          defaultOpen={false}
        />

        <Title level={4}>splice() - Mutable Modifier</Title>

        <CodeComponent
          code={`// splice() in detail
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// 1. Remove elements
const removed = fruits.splice(1, 2);  // ['Banana', 'Cherry']
console.log(fruits);  // ['Apple', 'Date', 'Elderberry']

// 2. Add elements (deleteCount = 0)
const fruits2 = ['Apple', 'Banana', 'Date'];
fruits2.splice(2, 0, 'Cherry');  // Insert at index 2
console.log(fruits2);  // ['Apple', 'Banana', 'Cherry', 'Date']

// 3. Replace elements
const fruits3 = ['Apple', 'Banana', 'Cherry'];
fruits3.splice(1, 1, 'Grape', 'Kiwi');  // Replace 'Banana' with two items
console.log(fruits3);  // ['Apple', 'Grape', 'Kiwi', 'Cherry']

// 4. Remove from end
const fruits4 = ['Apple', 'Banana', 'Cherry'];
const last = fruits4.splice(-1, 1);
console.log(last);  // ['Cherry']
console.log(fruits4);  // ['Apple', 'Banana']

// 5. Clear array
const fruits5 = ['Apple', 'Banana', 'Cherry'];
fruits5.splice(0);
console.log(fruits5);  // []`}
          language="javascript"
          title="splice-advanced.js"
          defaultOpen={false}
        />

        <Title level={4}>When to Use Which (Advanced)</Title>

        <CardComponent variant="success" title="✅ Use slice() When:">
          <UnorderedList
            items={[
              <>Creating a copy of an array</>,
              <>Extracting data without modifying the original</>,
              <>Implementing pagination (showing subsets)</>,
              <>Functional programming (immutability)</>,
              <>Converting array-like objects to arrays</>,
              <>When you need a new array for chaining methods</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="warning" title="⚠️ Use splice() When:">
          <UnorderedList
            items={[
              <>Removing elements from an array</>,
              <>Adding elements at a specific position</>,
              <>Replacing elements in place</>,
              <>When you need to modify the original array</>,
              <>When performance is critical (modifies in place)</>,
              <>Working with data that should be mutated</>,
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Always remember that <InlineCode>splice()</InlineCode> modifies the original array. This can lead to bugs if you're not careful, especially in React or other frameworks where immutability is important.
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
          Deep dive into advanced patterns, performance considerations, and expert-level techniques.
        </PlainText>

        <Title level={4}>1. Performance Benchmarks</Title>

        <CodeComponent
          code={`// Performance comparison: slice vs splice
const arraySize = 100000;
const testArray = Array.from({ length: arraySize }, (_, i) => i);

// SLICE - Creating a copy
console.time('slice');
const sliced = testArray.slice(1000, 2000);
console.timeEnd('slice');

// SPLICE - Removing elements
const testArray2 = Array.from({ length: arraySize }, (_, i) => i);
console.time('splice');
const spliced = testArray2.splice(1000, 1000);
console.timeEnd('splice');

// Results: slice is generally faster for extraction
// splice is faster when you need to modify in place

// Best practice: Use slice for copying, splice for mutation`}
          language="javascript"
          title="performance.js"
          defaultOpen={false}
        />

        <Title level={4}>2. Advanced Pagination Pattern</Title>

        <CodeComponent
          code={`// Advanced pagination with slice
class Paginator {
  constructor(data, pageSize = 10) {
    this.data = data;
    this.pageSize = pageSize;
    this.currentPage = 1;
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
  
  next() {
    if (this.hasNext) {
      return this.getPage(this.currentPage + 1);
    }
    return null;
  }
  
  prev() {
    if (this.hasPrev) {
      return this.getPage(this.currentPage - 1);
    }
    return null;
  }
  
  get totalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }
  
  get hasNext() {
    return this.currentPage < this.totalPages;
  }
  
  get hasPrev() {
    return this.currentPage > 1;
  }
}

// Usage
const data = Array.from({ length: 100 }, (_, i) => ({ id: i, name: \`Item \${i}\` }));
const paginator = new Paginator(data, 10);
console.log(paginator.getPage(1).data.length); // 10 items`}
          language="javascript"
          title="pagination.js"
          defaultOpen={false}
        />

        <Title level={4}>3. Reactive State Management (React Pattern)</Title>

        <CodeComponent
          code={`// React pattern - Immutable updates with slice
const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);

// 1. Add item (use spread)
const addItem = (newItem) => {
  setItems([...items, newItem]);
};

// 2. Remove item (use filter or slice)
const removeItem = (index) => {
  setItems(items.filter((_, i) => i !== index));
  // or
  setItems([...items.slice(0, index), ...items.slice(index + 1)]);
};

// 3. Update item (use map)
const updateItem = (index, newValue) => {
  setItems(items.map((item, i) => i === index ? newValue : item));
};

// 4. Insert at position (use slice)
const insertItem = (index, newItem) => {
  setItems([
    ...items.slice(0, index),
    newItem,
    ...items.slice(index)
  ]);
};

// 5. Move item (use slice)
const moveItem = (fromIndex, toIndex) => {
  const item = items[fromIndex];
  const newItems = [...items];
  newItems.splice(fromIndex, 1);
  newItems.splice(toIndex, 0, item);
  setItems(newItems);
};`}
          language="javascript"
          title="react-pattern.js"
          defaultOpen={false}
        />

        <Title level={4}>4. Advanced Data Transformation</Title>

        <CodeComponent
          code={`// Pipeline with slice for immutability
const pipeline = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data);

// Data transformation pipeline
const processData = pipeline(
  (data) => data.slice(0, 100), // Limit to 100 items
  (data) => data.filter(item => item.active),
  (data) => data.map(item => ({ ...item, processed: true })),
  (data) => data.sort((a, b) => a.timestamp - b.timestamp),
  (data) => data.slice(0, 10) // Take top 10
);

// Usage
const results = processData(largeDataset);`}
          language="javascript"
          title="pipeline.js"
          defaultOpen={false}
        />

        <Title level={4}>5. Memory Management</Title>

        <CodeComponent
          code={`// Memory considerations
const largeArray = Array.from({ length: 1000000 }, (_, i) => i);

// 1. slice creates a new array (uses memory)
const subset = largeArray.slice(0, 1000); // New array in memory

// 2. splice modifies in place (more memory efficient)
const largeArray2 = Array.from({ length: 1000000 }, (_, i) => i);
largeArray2.splice(0, 1000); // Modifies original, less memory

// 3. When to use each
// Use slice for: Maintaining original data
// Use splice for: Memory efficiency, modifying in place

// 4. Garbage collection
let data = largeArray.slice(); // Creates new reference
data = null; // Allows garbage collection

// 5. Best practice for large datasets
function processLargeArray(array) {
  // Use splice for in-place modifications
  array.splice(0, 1000);
  return array;
}`}
          language="javascript"
          title="memory.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="⚡ Expert Performance Tips">
          <UnorderedList
            items={[
              <>Use <Bold>slice()</Bold> for copying when you need to preserve the original</>,
              <>Use <Bold>splice()</Bold> for in-place modifications for better memory efficiency</>,
              <>Avoid <Bold>splice()</Bold> in React state updates (use filter, map, or slice)</>,
              <>Use <Bold>slice()</Bold> for pagination to avoid mutating the original data</>,
              <>Consider memory usage when working with large arrays</>,
              <>Use <Bold>slice(0)</Bold> for shallow copying (or spread operator)</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The choice between <InlineCode>slice()</InlineCode> and <InlineCode>splice()</InlineCode> comes down to <Bold>immutability</Bold> vs <Bold>performance</Bold>. In modern JavaScript, prefer <InlineCode>slice()</InlineCode> for functional programming and React state management. Use <InlineCode>splice()</InlineCode> when performance is critical and you want to avoid creating new arrays.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> Be careful with <InlineCode>splice()</InlineCode> in loops - it changes the array length and index positions. Always iterate from the end when removing items in a loop.
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
            <><Bold>slice()</Bold> is <Bold>immutable</Bold> - returns a new array, original unchanged</>,
            <><Bold>splice()</Bold> is <Bold>mutable</Bold> - modifies the original array</>,
            <><Bold>slice(start, end)</Bold> - extracts elements (end exclusive)</>,
            <><Bold>splice(start, deleteCount, items...)</Bold> - removes/adds elements</>,
            <>Use <Bold>slice</Bold> for copying, extracting, and functional programming</>,
            <>Use <Bold>splice</Bold> for removing, adding, and replacing in place</>,
            <>Choose based on whether you need to <Bold>preserve</Bold> or <Bold>modify</Bold> the original array</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Remember the mnemonic: <Bold>"S"</Bold>lice = <Bold>"S"</Bold>afe (doesn't modify), <Bold>"P"</Bold>lice = <Bold>"P"</Bold>ainful (modifies the original)! 
        This will help you remember which one mutates the array.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> The key difference is <Bold>immutability</Bold>. Use <Bold>slice()</Bold> when you want to keep the original array, and <Bold>splice()</Bold> when you want to modify it!
      </Note>
    </QuestionWrapper>
  );
}