// data/questions/Question26.tsx
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

import { useLevel } from "../../hooks";
import { question26Meta } from "../registry";

export function Question26({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question26Meta.id}
      title={question26Meta.title}
      definition={question26Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Memoization</Bold> is an optimization technique that <Bold>caches</Bold> the results of expensive function calls and returns the cached result when the same inputs occur again. It's a form of <Bold>caching</Bold> that improves performance by avoiding redundant computations.
      </PlainText>

      <PlainText>
        Memoization is particularly useful for <Bold>pure functions</Bold> (functions that always return the same output for the same input) and is widely used in <Bold>functional programming</Bold> and <Bold>React applications</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is Memoization?
        </Title>

        <PlainText>
          Think of memoization like a <Bold>cheat sheet</Bold> for your functions:
        </PlainText>

        <CardComponent variant="info" title="📝 Analogy">
          <PlainText>
            Imagine you're a student studying for an exam. Every time you solve a math problem, you write down the answer in a notebook. When you see the same problem again, you check your notebook instead of solving it from scratch. That's exactly what memoization does!
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Simple Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// Without memoization - computes every time
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(5)); // 5
console.log(fibonacci(5)); // 5 (recomputes everything!)

// With memoization - caches results
const memo = {};
function fibonacciMemo(n) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n]; // Return cached result
  memo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
  return memo[n];
}

console.log(fibonacciMemo(5)); // 5 (computes once)
console.log(fibonacciMemo(5)); // 5 (returns from cache!)

// Performance comparison
function timeFunction(fn, n) {
  const start = performance.now();
  const result = fn(n);
  const end = performance.now();
  console.log(\`Result: \${result}, Time: \${(end - start).toFixed(2)}ms\`);
}

timeFunction(fibonacci, 40); // Takes ~500ms
timeFunction(fibonacciMemo, 40); // Takes ~0.1ms (cached!)`}
          language="javascript"
          title="memoization-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Memoization trades <Bold>memory</Bold> for <Bold>speed</Bold> - it stores results to avoid recomputing them.
        </Note>

        <CardComponent variant="success" title="✅ Simple Memoization Example">
          <PlainText>
            Here's a simple memoization function you can use:
          </PlainText>
          <CodeComponent
            code={`// Simple memoization function
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log('Returning cached result');
      return cache[key];
    }
    console.log('Computing result');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Using memoization
const slowSquare = (n) => {
  // Simulate expensive computation
  for (let i = 0; i < 1000000000; i++) {}
  return n * n;
};

const memoizedSquare = memoize(slowSquare);
console.log(memoizedSquare(5)); // Computing result... 25
console.log(memoizedSquare(5)); // Returning cached result... 25`}
            language="javascript"
            title="simple-memoize.js"
            defaultOpen={true}
            showTitle={false}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Memoization Patterns
        </Title>

        <PlainText>
          Advanced memoization techniques and real-world applications:
        </PlainText>

        <CodeComponent
          code={`// 1. Advanced memoization with Map
function advancedMemoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// 2. Memoization with expiration (TTL - Time To Live)
function memoizeWithExpiry(fn, ttl = 60000) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    
    const result = fn(...args);
    cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  };
}

// 3. Memoization with limited cache size (LRU - Least Recently Used)
function memoizeLRU(fn, maxSize = 100) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    const result = fn(...args);
    
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
}

// 4. Memoizing recursive functions
function memoizeRecursive(fn) {
  const cache = new Map();
  
  function memoized(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(memoized, ...args);
    cache.set(key, result);
    return result;
  }
  
  return memoized;
}

// 5. Real-world: API call memoization
const apiCache = new Map();

async function memoizedFetch(url) {
  const cacheKey = url;
  if (apiCache.has(cacheKey)) {
    console.log('Returning cached response');
    return apiCache.get(cacheKey);
  }
  
  console.log('Making API call');
  const response = await fetch(url);
  const data = await response.json();
  apiCache.set(cacheKey, data);
  return data;
}

// 6. React useMemo hook
import { useMemo, useState } from 'react';

function ExpensiveComponent({ data }) {
  // Only recompute when 'data' changes
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return data.map(item => item * 2);
  }, [data]);
  
  return <div>{processedData}</div>;
}`}
          language="javascript"
          title="memoization-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Memoization Use Cases">
          <PlainText component="div">
            • <Bold>Fibonacci & Recursion:</Bold> Avoid exponential time complexity<br />
            • <Bold>API Calls:</Bold> Cache repeated API requests<br />
            • <Bold>React Components:</Bold> <InlineCode>useMemo</InlineCode>, <InlineCode>useCallback</InlineCode><br />
            • <Bold>Data Processing:</Bold> Cache expensive transformations<br />
            • <Bold>DOM Manipulation:</Bold> Cache computed styles<br />
            • <Bold>String Operations:</Bold> Cache regex results
          </PlainText>
        </CardComponent>

        <TableComponent
          headers={['Pattern', 'Use Case', 'Trade-off']}
          rows={[
            ['Basic Caching', 'Simple pure functions', 'Memory vs Speed'],
            ['TTL Cache', 'API calls', 'Stale data vs Freshness'],
            ['LRU Cache', 'Large datasets', 'Cache size vs Hit rate'],
            ['React useMemo', 'Component optimization', 'Memory vs Re-renders'],
          ]}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Memoization only works with <Bold>pure functions</Bold>. If a function has side effects or depends on external state, memoization can lead to <Bold>stale data</Bold> and <Bold>bugs</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Memoization Deep Dive
        </Title>

        <PlainText>
          Expert-level understanding of memoization:
        </PlainText>

        <CodeComponent
          code={`// 1. Automatic memoization with Proxy
function autoMemoize(fn) {
  const cache = new Map();
  
  return new Proxy(fn, {
    apply(target, thisArg, argumentsList) {
      const key = JSON.stringify(argumentsList);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = Reflect.apply(target, thisArg, argumentsList);
      cache.set(key, result);
      return result;
    }
  });
}

// 2. Memoization with weak references
function weakMemoize(fn) {
  const cache = new WeakMap();
  
  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}

// 3. Memoization with complex keys
function memoizeComplex(fn) {
  const cache = new Map();
  
  return function(...args) {
    // Create a deterministic key from all arguments
    const key = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg);
      }
      return String(arg);
    }).join('|');
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// 4. Memoization with error handling
function memoizeSafe(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    try {
      const result = fn(...args);
      cache.set(key, result);
      return result;
    } catch (error) {
      // Store error to avoid re-throwing
      cache.set(key, error);
      throw error;
    }
  };
}

// 5. Performance benchmarking
function benchmark(fn, label, iterations = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn(i % 100);
  }
  const end = performance.now();
  console.log(\`\${label}: \${(end - start).toFixed(2)}ms\`);
}

// 6. React advanced memoization
import { useMemo, useCallback, memo } from 'react';

// Component memoization
const ExpensiveComponent = memo(({ data, onSelect }) => {
  // Component only re-renders when props change
  return <div>{data.map(item => (
    <button key={item.id} onClick={() => onSelect(item.id)}>
      {item.name}
    </button>
  ))}</div>;
});

// Selector memoization (Redux style)
const createSelector = (inputSelectors, resultFn) => {
  const cache = new Map();
  
  return function(state) {
    const inputValues = inputSelectors.map(fn => fn(state));
    const key = JSON.stringify(inputValues);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = resultFn(...inputValues);
    cache.set(key, result);
    return result;
  };
};

// 7. Memoization pitfalls
// Memory leaks - cached objects can't be garbage collected
// Stale data - cache might become outdated
// Overhead - cache lookup has cost
// Complexity - adds cognitive load`}
          language="javascript"
          title="memoization-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Analysis">
          <PlainText component="div">
            • <Bold>Time Complexity:</Bold> O(1) for cache lookup vs O(n) for computation<br />
            • <Bold>Space Complexity:</Bold> O(n) where n is number of unique inputs<br />
            • <Bold>Cache Hit Rate:</Bold> Higher hit rate = better performance<br />
            • <Bold>Trade-off:</Bold> Memory usage vs CPU usage<br />
            • <Bold>Best For:</Bold> Functions called frequently with same inputs
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use memoization for <Bold>pure functions</Bold> with expensive computations</>,
              <>Consider <Bold>cache size limits</Bold> to prevent memory leaks</>,
              <>Use <Bold>WeakMap</Bold> for object keys to allow garbage collection</>,
              <>Implement <Bold>TTL (Time To Live)</Bold> for data that becomes stale</>,
              <>Use <Bold>React.memo</Bold> and <Bold>useMemo</Bold> for component optimization</>,
              <>Be careful with <Bold>deep equality</Bold> checks in memoization</>,
              <>Profile your code to identify <Bold>actual bottlenecks</Bold> before memoizing</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ When to Use Memoization">
          <PlainText component="div">
            • ✅ <Bold>Recursive functions</Bold> (Fibonacci, factorial)<br />
            • ✅ <Bold>Data processing</Bold> (sorting, filtering, mapping)<br />
            • ✅ <Bold>API calls</Bold> (cache repeated requests)<br />
            • ✅ <Bold>React components</Bold> (prevent unnecessary re-renders)<br />
            • ✅ <Bold>Expensive calculations</Bold> (statistical computations)<br />
            • ❌ <Bold>Functions with side effects</Bold> (API calls that mutate data)<br />
            • ❌ <Bold>Functions depending on external state</Bold> (Date, Math.random)
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Memoization is a <Bold>powerful optimization technique</Bold>, but it's not a silver bullet. Use it <Bold>strategically</Bold> where it provides the most benefit - for expensive pure functions that are called frequently with repeated inputs. The <Bold>cost of caching</Bold> (memory usage) should be weighed against the <Bold>cost of recomputation</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Memoization is a <Bold>trade-off</Bold> between <Bold>memory</Bold> and <Bold>speed</Bold>. When used correctly, it can dramatically improve performance. When used incorrectly, it can lead to <Bold>memory leaks</Bold> and <Bold>stale data</Bold>.
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
            <>Memoization <Bold>caches</Bold> function results to avoid recomputation</>,
            <>Works best with <Bold>pure functions</Bold> (same input → same output)</>,
            <>Trades <Bold>memory</Bold> for <Bold>speed</Bold></>,
            <>Common use cases: <Bold>recursion</Bold>, <Bold>API calls</Bold>, <Bold>React</Bold></>,
            <>Implement with <Bold>Map</Bold>, <Bold>WeakMap</Bold>, or <Bold>object cache</Bold></>,
            <>Consider <Bold>cache size limits</Bold> and <Bold>TTL</Bold></>,
            <>React provides <Bold>useMemo</Bold>, <Bold>useCallback</Bold>, <Bold>memo</Bold></>,
            <>Profile before optimizing to avoid <Bold>premature optimization</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Start with simple memoization for expensive pure functions, then gradually implement more advanced patterns (TTL, LRU) as needed. Always <Bold>measure performance</Bold> before and after to ensure memoization is actually improving your application.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Memoization is a <Bold>powerful tool</Bold> in your optimization toolbox. Use it wisely, and it will <Bold>significantly improve</Bold> the performance of your applications!
      </Note>
    </QuestionWrapper>
  );
}