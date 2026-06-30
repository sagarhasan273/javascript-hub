// data/questions/Question09.tsx
import { useState } from 'react';
import { QuestionWrapper } from '../../components/QuestionWrapper';
import { LevelToggle, ContentLevel } from '../../components/LevelToggle';
import { LevelContent } from '../../components/LevelContent';
import {
  Title,
  PlainText,
  Bold,
  Divider,
  CardComponent,
  HLText,
  CodeComponent,
  Note,
  Gap,
  TableComponent,
  InlineCode,
  UnorderedList,
} from '../../components/content';
import { question09Meta } from './registry';
import { Box } from '@mui/material';

export function Question09({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const [level, setLevel] = useState<ContentLevel>('beginner');

  return (
    <QuestionWrapper
      id={question09Meta.id}
      title={question09Meta.title}
      definition={question09Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Level Toggle */}
      <LevelToggle level={level} onLevelChange={setLevel} />

      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Arrow functions</Bold> (also known as <Bold>lambda expressions</Bold>) are a concise way to write function expressions in JavaScript. They were introduced in ES6 and provide a <Bold>shorter syntax</Bold> compared to traditional function expressions.
      </PlainText>

      {/* BEGINNER LEVEL */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Arrow Functions Basics
        </Title>

        <PlainText>
          Arrow functions are a shorter way to write functions. Here's the basic syntax:
        </PlainText>

        <CodeComponent
          code={`// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function - same thing
const add = (a, b) => {
  return a + b;
};

// Arrow function - even shorter (implicit return)
const add = (a, b) => a + b;

// Single parameter - no parentheses needed
const double = x => x * 2;

// No parameters - need empty parentheses
const greet = () => console.log('Hello!');`}
          language="javascript"
          title="basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> Arrow functions with a single expression can use <Bold>implicit return</Bold> - no <InlineCode>return</InlineCode> keyword needed!
        </Note>

        <CardComponent variant="success" title="🎯 When to Use">
          <UnorderedList
            items={[
              'Simple transformations with array methods like map(), filter()',
              'Short callback functions',
              'Functional programming style',
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ADVANCED LEVEL */}
      <LevelContent level="advanced" currentLevel={level}>
        <Divider sx={{ my: 3 }} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: this Binding & Use Cases
        </Title>

        <PlainText>
          The most important difference is how arrow functions handle <Bold>this</Bold>:
        </PlainText>

        <CodeComponent
          code={`// Traditional function - this depends on how it's called
const person = {
  name: 'John',
  greet: function() {
    console.log('Hello, ' + this.name);
  }
};
person.greet(); // Hello, John

// Arrow function - this is inherited from parent scope
const person2 = {
  name: 'John',
  greet: () => {
    console.log('Hello, ' + this.name); // this = window
  }
};
person2.greet(); // Hello, undefined

// Real-world example - Timer
function Timer() {
  this.seconds = 0;
  
  // This fails - loses this
  setInterval(function() {
    this.seconds++; // this = window
  }, 1000);
  
  // This works - arrow function preserves this
  setInterval(() => {
    this.seconds++; // this = Timer instance
  }, 1000);
}`}
          language="javascript"
          title="this-binding.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Arrow vs Traditional">
          <TableComponent
            headers={['Feature', 'Arrow Function', 'Traditional Function']}
            rows={[
              ['this binding', 'Lexical (inherited)', 'Dynamic (depends on call)'],
              ['arguments object', '❌ Not available', '✅ Available'],
              ['Constructor', '❌ Cannot use new', '✅ Can use new'],
              ['Prototype', '❌ No prototype', '✅ Has prototype'],
              ['Implicit return', '✅ Yes', '❌ No'],
            ]}
          />
        </CardComponent>

        <Title level={4}>When to Use Arrow Functions</Title>
        <CardComponent variant="success" title="✅ Perfect Use Cases">
          <UnorderedList
            items={[
              'Callbacks - array methods, setTimeout, Promises',
              'React components and class methods',
              'Functional programming',
              'When you want to preserve this context',
            ]}
          />
        </CardComponent>

        <Title level={4}>When NOT to Use Arrow Functions</Title>
        <CardComponent variant="warning" title="⚠️ Avoid When">
          <UnorderedList
            items={[
              'Object methods (need dynamic this)',
              'Constructors (can\'t use new)',
              'Event handlers (need this = element)',
              'When you need the arguments object',
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* EXPERT LEVEL */}
      <LevelContent level="expert" currentLevel={level}>
        <Divider sx={{ my: 3 }} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Patterns & Performance
        </Title>

        <PlainText>
          Deep dive into advanced arrow function patterns and performance considerations:
        </PlainText>

        <CodeComponent
          code={`// 1. Higher-order functions with arrow functions
const createMultiplier = (factor) => (value) => value * factor;

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 2. Pipeline with arrow functions
const processData = (data) =>
  data
    .filter(item => item.active)
    .map(item => item.value)
    .reduce((sum, val) => sum + val, 0);

// 3. Currying with arrow functions
const curriedAdd = a => b => c => a + b + c;
const add5 = curriedAdd(5);
const add5and3 = add5(3);
console.log(add5and3(2)); // 10

// 4. Performance considerations
// Arrow functions are slightly slower in V8 (negligible)
// But they're more memory efficient when used as callbacks
// because they don't create their own this binding

// 5. Advanced React patterns
const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  
  return { count, increment, decrement };
};`}
          language="javascript"
          title="advanced-patterns.js"
          defaultOpen={false}
        />

        <Title level={4}>Performance Considerations</Title>
        <CardComponent variant="info" title="⚡ Performance Tips">
          <UnorderedList
            items={[
              'Arrow functions are slightly slower in V8 (negligible)',
              'Memory efficient - no own this binding',
              'Great for functional programming with immutability',
              'Use useCallback with arrow functions in React',
              'Avoid arrow functions in hot code paths if performance is critical',
            ]}
          />
        </CardComponent>

        <Title level={4}>Expert Tips</Title>
        <CardComponent variant="default" title="💡 Pro Insights">
          <UnorderedList
            items={[
              'Combine arrow functions with destructuring for clean code',
              'Use arrow functions in pipelines for data transformation',
              'Master higher-order functions with arrow syntax',
              'Understand the lexical scoping implications',
              'Use arrow functions for immutability patterns',
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Arrow functions are a powerful tool for functional programming. Understanding their behavior with <InlineCode>this</InlineCode>, <InlineCode>arguments</InlineCode>, and <InlineCode>new.target</InlineCode> is essential for writing advanced JavaScript applications.
        </HLText>
      </LevelContent>

      <Gap size={2} />

      {/* Summary - Shown at all levels */}
      <Divider />
      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>📌</Box>
        Summary
      </Title>

      <CardComponent variant="info" title="🎯 Key Takeaways">
        <UnorderedList
          items={[
            <>Arrow functions provide a <Bold>concise</Bold> syntax for writing functions</>,
            <>They have <Bold>lexical this binding</Bold> - inherit <InlineCode>this</InlineCode> from parent scope</>,
            <>They <Bold>cannot</Bold> be used as constructors (no <InlineCode>new</InlineCode>)</>,
            <>Perfect for <Bold>callbacks</Bold>, <Bold>array methods</Bold>, and <Bold>functional programming</Bold></>,
            <>Understanding when to use arrow vs traditional functions is <Bold>essential</Bold> for writing clean code</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Arrow functions are perfect for when you want a <Bold>short, concise function</Bold> that doesn't need its own <InlineCode>this</InlineCode> binding. Use traditional functions when you need dynamic <InlineCode>this</InlineCode> or the <InlineCode>arguments</InlineCode> object.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Master arrow functions to write cleaner, more modern JavaScript code!
      </Note>
    </QuestionWrapper>
  );
}