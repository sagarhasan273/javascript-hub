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
import { question06Meta } from './registry';

export function Question06({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question06Meta.id}
      title={question06Meta.title}
      definition={question06Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction */}
      <PlainText>
        <Bold>slice()</Bold> and <Bold>splice()</Bold> are two commonly used array methods in JavaScript that are often confused. While they sound similar, they serve <Bold>completely different purposes</Bold> and have different behaviors.
      </PlainText>

      <PlainText>
        The key difference is that <Bold>slice()</Bold> is <Bold>immutable</Bold> (doesn't change the original array) and returns a new array, while <Bold>splice()</Bold> is <Bold>mutable</Bold> (modifies the original array) and changes the array in place.
      </PlainText>

      <Gap size={2} />

      {/* Quick Comparison */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>📊</Box>
        Quick Comparison
      </Title>

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
          ['Used For', 'Extracting, copying, pagination', 'Adding, removing, replacing'],
          ['Performance', 'Faster (no mutation)', 'Slower (mutates in place)'],
        ]}
      />

      <Gap size={2} />

      {/* 1. slice() Method */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#2563eb', mr: 1 }}>📋</Box>
        1. slice() - Immutable Extraction
      </Title>

      <PlainText>
        The <InlineCode>slice()</InlineCode> method returns a <Bold>shallow copy</Bold> of a portion of an array into a new array object, selected from <InlineCode>start</InlineCode> to <InlineCode>end</InlineCode> (end not included). The original array is <Bold>not modified</Bold>.
      </PlainText>

      <CodeComponent
        code={`// slice() - Immutable
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// Extract elements from index 1 to 3 (end exclusive)
const sliced = fruits.slice(1, 3);
console.log(sliced);        // ['Banana', 'Cherry']
console.log(fruits);        // ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'] (unchanged)

// Extract from index 2 to end
const fromTwo = fruits.slice(2);
console.log(fromTwo);       // ['Cherry', 'Date', 'Elderberry']

// Extract last 2 elements
const lastTwo = fruits.slice(-2);
console.log(lastTwo);       // ['Date', 'Elderberry']

// Full copy
const fullCopy = fruits.slice();
console.log(fullCopy);      // ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

// Original array remains the same
console.log(fruits.length); // 5 (unchanged)`}
        language="javascript"
        title="slice-example.js"
        defaultOpen={true}
      />

      <Note type="info" icon="💡">
        <Bold>Key Points:</Bold>
        <PlainText component="div">
          • Returns a <Bold>new array</Bold> with extracted elements<br />
          • <Bold>Does NOT modify</Bold> the original array<br />
          • Takes <InlineCode>start</InlineCode> (inclusive) and <InlineCode>end</InlineCode> (exclusive) parameters<br />
          • Can use negative indices to count from the end
        </PlainText>
      </Note>

      <Gap size={2} />

      {/* 2. splice() Method */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>✂️</Box>
        2. splice() - Mutable Modifier
      </Title>

      <PlainText>
        The <InlineCode>splice()</InlineCode> method <Bold>modifies the original array</Bold> by removing, replacing, or adding elements. It returns an array containing the removed elements.
      </PlainText>

      <CodeComponent
        code={`// splice() - Mutable
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// 1. Remove elements (start, deleteCount)
const removed = fruits.splice(1, 2);
console.log(removed);        // ['Banana', 'Cherry']
console.log(fruits);         // ['Apple', 'Date', 'Elderberry'] (modified)

// 2. Remove and add elements
const moreFruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
const removed2 = moreFruits.splice(2, 1, 'Grape', 'Kiwi');
console.log(removed2);       // ['Cherry']
console.log(moreFruits);     // ['Apple', 'Banana', 'Grape', 'Kiwi', 'Date', 'Elderberry']

// 3. Insert elements without removing
const insertFruits = ['Apple', 'Banana', 'Date'];
insertFruits.splice(2, 0, 'Cherry');
console.log(insertFruits);   // ['Apple', 'Banana', 'Cherry', 'Date']

// 4. Replace all elements
const replaceFruits = ['Apple', 'Banana', 'Cherry'];
replaceFruits.splice(0, 3, 'Grape', 'Kiwi', 'Orange');
console.log(replaceFruits);  // ['Grape', 'Kiwi', 'Orange']

// 5. Remove from end
const removeLast = ['Apple', 'Banana', 'Cherry'];
const last = removeLast.splice(-1, 1);
console.log(last);           // ['Cherry']
console.log(removeLast);     // ['Apple', 'Banana']`}
        language="javascript"
        title="splice-example.js"
        defaultOpen={true}
      />

      <Note type="warning" icon="⚠️">
        <Bold>Key Points:</Bold>
        <PlainText component="div">
          • <Bold>Modifies</Bold> the original array<br />
          • Returns an array of <Bold>removed elements</Bold><br />
          • Can <Bold>remove, add, or replace</Bold> elements<br />
          • Changes the array's length<br />
          • More flexible but <Bold>mutates</Bold> data
        </PlainText>
      </Note>

      <Gap size={2} />

      {/* Side by Side Comparison */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#8b5cf6', mr: 1 }}>🔄</Box>
        Side by Side Comparison
      </Title>

      <CodeComponent
        code={`// Same input, different results
const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// 1. SLICE - Immutable
const slicedResult = fruits.slice(1, 3);
console.log('slice result:', slicedResult);   // ['Banana', 'Cherry']
console.log('original after slice:', fruits); // ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

// Reset array for splice example
const fruits2 = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

// 2. SPLICE - Mutable
const splicedResult = fruits2.splice(1, 3);
console.log('splice result:', splicedResult); // ['Banana', 'Cherry', 'Date']
console.log('original after splice:', fruits2); // ['Apple', 'Elderberry']

// When to use each:
// SLICE: When you want to extract data without modifying
// SPLICE: When you want to modify the original array`}
        language="javascript"
        title="slice-vs-splice.js"
        defaultOpen={true}
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
        {/* slice Visual */}
        <Box
          sx={{
            bgcolor: 'rgba(37, 99, 235, 0.06)',
            borderRadius: 2,
            p: 3,
            border: '2px solid rgba(37, 99, 235, 0.2)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', mb: 2 }}>
            📋 slice()
          </Box>
          <Box sx={{ mb: 2 }}>
            <PlainText variant="body2" sx={{ fontWeight: 600, color: 'grey.700' }}>
              Original Array:
            </PlainText>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: i >= 1 && i < 3 ? '#60a5fa' : 'rgba(255,255,255,0.8)',
                    p: 1,
                    px: 1.5,
                    borderRadius: 1,
                    border: i >= 1 && i < 3 ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    color: i >= 1 && i < 3 ? 'white' : 'grey.700',
                    fontSize: '0.8rem',
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
            <Box sx={{ color: 'rgba(255,255,255,0.4)', mt: 1, fontSize: '0.7rem' }}>
              <span style={{ color: '#2563eb' }}>⬅️ slice(1, 3) extracts Banana & Cherry</span>
            </Box>
          </Box>
          <Box>
            <PlainText variant="body2" sx={{ fontWeight: 600, color: 'grey.700' }}>
              Result:
            </PlainText>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {['Banana', 'Cherry'].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: '#2563eb',
                    p: 1,
                    px: 1.5,
                    borderRadius: 1,
                    color: 'white',
                    fontSize: '0.8rem',
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
          <PlainText variant="caption" sx={{ color: 'success.main', mt: 1, display: 'block' }}>
            ✅ Original array unchanged
          </PlainText>
        </Box>

        {/* splice Visual */}
        <Box
          sx={{
            bgcolor: 'rgba(245, 158, 11, 0.06)',
            borderRadius: 2,
            p: 3,
            border: '2px solid rgba(245, 158, 11, 0.2)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b', mb: 2 }}>
            ✂️ splice()
          </Box>
          <Box sx={{ mb: 2 }}>
            <PlainText variant="body2" sx={{ fontWeight: 600, color: 'grey.700' }}>
              Original Array:
            </PlainText>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: i >= 1 && i < 3 ? '#fbbf24' : 'rgba(255,255,255,0.8)',
                    p: 1,
                    px: 1.5,
                    borderRadius: 1,
                    border: i >= 1 && i < 3 ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                    color: i >= 1 && i < 3 ? 'black' : 'grey.700',
                    fontSize: '0.8rem',
                    position: 'relative',
                  }}
                >
                  {item}
                  {i >= 1 && i < 3 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -12,
                        right: -8,
                        fontSize: '0.6rem',
                        color: '#f59e0b',
                      }}
                    >
                      removed
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            <Box sx={{ color: 'rgba(255,255,255,0.4)', mt: 1, fontSize: '0.7rem' }}>
              <span style={{ color: '#f59e0b' }}>⬅️ splice(1, 2) removes Banana & Cherry</span>
            </Box>
          </Box>
          <Box>
            <PlainText variant="body2" sx={{ fontWeight: 600, color: 'grey.700' }}>
              Result:
            </PlainText>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {['Apple', 'Date', 'Elderberry'].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.8)',
                    p: 1,
                    px: 1.5,
                    borderRadius: 1,
                    border: '1px solid #e2e8f0',
                    color: 'grey.700',
                    fontSize: '0.8rem',
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
          <PlainText variant="caption" sx={{ color: 'warning.main', mt: 1, display: 'block' }}>
            ⚠️ Original array modified
          </PlainText>
        </Box>
      </Box>

      <Gap size={2} />

      {/* When to Use Which */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🎯</Box>
        When to Use Which?
      </Title>

      <CardComponent variant="success" title="✅ When to Use slice()">
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

      <CardComponent variant="warning" title="⚠️ When to Use splice()">
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

      <Gap size={2} />

      {/* Practical Examples */}
      <Title level={3}>
        <Box component="span" sx={{ color: '#f472b6', mr: 1 }}>💻</Box>
        Practical Examples
      </Title>

      <PlainText>
        <Bold>Example 1: Removing items from a todo list</Bold>
      </PlainText>

      <CodeComponent
        code={`// Using splice to remove from a list
const todos = [
  { id: 1, task: 'Learn JavaScript', done: false },
  { id: 2, task: 'Learn React', done: false },
  { id: 3, task: 'Build a project', done: true },
  { id: 4, task: 'Deploy to production', done: false }
];

// Remove completed tasks (mutates)
function removeCompleted(todos) {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].done) {
      todos.splice(i, 1);
    }
  }
  return todos;
}

const completedRemoved = removeCompleted([...todos]);
console.log(completedRemoved);
// [{ id: 1, task: 'Learn JavaScript', done: false }, ...]

// Using slice for pagination (immutable)
function paginateTodos(todos, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    page,
    totalPages: Math.ceil(todos.length / pageSize),
    data: todos.slice(start, end)
  };
}

const page1 = paginateTodos(todos, 1, 2);
console.log(page1.data); // First 2 items`}
        language="javascript"
        title="todo-example.js"
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
            <>Use <InlineCode>slice()</InlineCode> when you need to keep the original array intact</>,
            <>Use <InlineCode>splice()</InlineCode> when you explicitly want to modify the array</>,
            <>Always store the result of <InlineCode>splice()</InlineCode> to get removed elements</>,
            <>Use <InlineCode>slice()</InlineCode> for functional programming and immutability</>,
            <>Use spread operator <InlineCode>[...arr]</InlineCode> as an alternative to <InlineCode>slice()</InlineCode> for copying</>,
          ]}
        />
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ Don'ts">
        <UnorderedList
          items={[
            <>Don't use <InlineCode>splice()</InlineCode> when you need to keep the original array</>,
            <>Don't use <InlineCode>slice()</InlineCode> when you need to modify the array</>,
            <>Don't confuse the parameter order (slice uses end, splice uses deleteCount)</>,
            <>Don't use <InlineCode>splice()</InlineCode> in loops without considering index shifts</>,
            <>Don't mutate data in React state (use <InlineCode>slice()</InlineCode> or other immutable methods)</>,
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

      <Gap size={2} />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Remember the mnemonic: <Bold>"S"</Bold>lice = <Bold>"S"</Bold>afe (doesn't modify), <Bold>"P"</Bold>lice = <Bold>"P"</Bold>ainful (modifies the original)! 
        This will help you remember which one mutates the array.
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
        {/* slice Card */}
        <Box
          sx={{
            bgcolor: 'rgba(37, 99, 235, 0.06)',
            borderRadius: 2,
            p: 2.5,
            border: '2px solid rgba(37, 99, 235, 0.15)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', mb: 1 }}>
            📋 slice()
          </Box>
          <CodeComponent
            code={`arr.slice(start, end)
// Returns: new array
// Original: unchanged`}
            language="javascript"
            title=""
            showTitle={false}
            showCopyButton={true}
            defaultOpen={true}
          />
          <PlainText variant="caption" sx={{ mt: 1, display: 'block', color: 'success.main' }}>
            ✅ Immutable - Safe to use
          </PlainText>
        </Box>

        {/* splice Card */}
        <Box
          sx={{
            bgcolor: 'rgba(245, 158, 11, 0.06)',
            borderRadius: 2,
            p: 2.5,
            border: '2px solid rgba(245, 158, 11, 0.15)',
          }}
        >
          <Box sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b', mb: 1 }}>
            ✂️ splice()
          </Box>
          <CodeComponent
            code={`arr.splice(start, deleteCount, items)
// Returns: removed elements
// Original: modified`}
            language="javascript"
            title=""
            showTitle={false}
            showCopyButton={true}
            defaultOpen={true}
          />
          <PlainText variant="caption" sx={{ mt: 1, display: 'block', color: 'warning.main' }}>
            ⚠️ Mutable - Modifies original
          </PlainText>
        </Box>
      </Box>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> The key difference is <Bold>immutability</Bold>. Use <Bold>slice()</Bold> when you want to keep the original array, and <Bold>splice()</Bold> when you want to modify it!
      </Note>
    </QuestionWrapper>
  );
}