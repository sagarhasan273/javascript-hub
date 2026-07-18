// data/questions/Question54.tsx
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
  InlineCode,
  UnorderedList,
  TableComponent,
} from "../../components/content";
import { question54Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question54({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question54Meta.id}
      title={question54Meta.title}
      definition={question54Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Promises</Bold> are essential for handling <Bold>asynchronous operations</Bold> in JavaScript. They provide a <Bold>clean, manageable way</Bold> to work with operations that don't complete immediately, like API calls, file I/O, or timers.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Why Promises?
        </Title>

        <PlainText>
          Think of promises like a <Bold>takeout order system</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📱 Analogy">
          <PlainText>
            Without promises, you'd have to wait at the counter (blocking) until your food is ready. With promises, you get a notification (callback) when it's ready, and you can do other things while waiting (non-blocking). Promises make this process <Bold>organized and manageable</Bold>.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Why Promises are Better:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Without Promises - Callback Hell
function getData(callback) {
  getUser((user) => {
    getPosts(user.id, (posts) => {
      getComments(posts[0].id, (comments) => {
        getLikes(comments[0].id, (likes) => {
          callback(likes);
        });
      });
    });
  });
}

// 2. With Promises - Clean and Readable
function getData() {
  return getUser()
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => getLikes(comments[0].id));
}

// 3. With async/await - Even Cleaner
async function getData() {
  const user = await getUser();
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  const likes = await getLikes(comments[0].id);
  return likes;
}

// 4. Promise Advantages
// - Avoid callback hell
// - Better error handling
// - Chainable operations
// - Parallel operations with Promise.all
// - Cleaner code
// - Better flow control`}
          language="javascript"
          title="promise-why-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Promises make asynchronous code <Bold>readable</Bold> and <Bold>maintainable</Bold> by avoiding <Bold>callback hell</Bold>.
        </Note>

        <CardComponent variant="success" title="✅ Benefits of Promises">
          <UnorderedList
            items={[
              <>📖 <Bold>Readability:</Bold> Clean, linear code flow</>,
              <>🔧 <Bold>Error Handling:</Bold> Single catch for all errors</>,
              <>🔄 <Bold>Chaining:</Bold> Sequential async operations</>,
              <>⚡ <Bold>Parallel:</Bold> Promise.all for parallel operations</>,
              <>🧹 <Bold>No Callback Hell:</Bold> Avoid nested callbacks</>,
              <>🛡️ <Bold>Type Safety:</Bold> Better with TypeScript</>,
            ]}
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
          Advanced: Promise Use Cases
        </Title>

        <PlainText>
          Real-world scenarios where promises are essential:
        </PlainText>

        <CodeComponent
          code={`// 1. API Calls
function fetchUserData(userId) {
  return fetch(\`/api/users/\${userId}\`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process data
      return data;
    })
    .catch(error => {
      console.error('API Error:', error);
      throw error;
    });
}

// 2. Sequential API Calls
function getUserWithPosts(userId) {
  return fetchUserData(userId)
    .then(user => {
      return fetchUserPosts(user.id)
        .then(posts => ({ user, posts }));
    });
}

// 3. Parallel API Calls
function fetchDashboardData(userId) {
  return Promise.all([
    fetchUserData(userId),
    fetchUserPosts(userId),
    fetchUserSettings(userId)
  ])
  .then(([user, posts, settings]) => ({
    user,
    posts,
    settings
  }));
}

// 4. Error Handling with Retry
function fetchWithRetry(url, retries = 3) {
  return fetch(url)
    .catch(error => {
      if (retries > 0) {
        console.log(\`Retrying... \${retries} attempts left\`);
        return fetchWithRetry(url, retries - 1);
      }
      throw error;
    });
}

// 5. Promise with Timeout
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), timeout);
    })
  ]);
}

// 6. Data Pipeline with Promises
function processData(data) {
  return validateData(data)
    .then(validData => transformData(validData))
    .then(transformedData => enrichData(transformedData))
    .then(enrichedData => storeData(enrichedData))
    .then(result => {
      console.log('Data processed successfully');
      return result;
    })
    .catch(error => {
      console.error('Data processing failed:', error);
      throw error;
    });
}

// 7. Promise-based Debouncing
function debouncePromise(fn, delay) {
  let timeoutId;
  let resolveList = [];
  let rejectList = [];
  
  return function(...args) {
    return new Promise((resolve, reject) => {
      resolveList.push(resolve);
      rejectList.push(reject);
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        try {
          const result = fn(...args);
          resolveList.forEach(resolve => resolve(result));
        } catch (error) {
          rejectList.forEach(reject => reject(error));
        } finally {
          resolveList = [];
          rejectList = [];
        }
      }, delay);
    });
  };
}`}
          language="javascript"
          title="promise-why-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Promise vs Callbacks">
          <TableComponent
            headers={['Feature', 'Promises', 'Callbacks']}
            rows={[
              ['Readability', '✅ Clean', '❌ Nested'],
              ['Error Handling', '✅ Centralized', '❌ Scattered'],
              ['Chaining', '✅ Easy', '❌ Complex'],
              ['Parallel Operations', '✅ Promise.all', '❌ Manual'],
              ['Async/Await', '✅ Support', '❌ No'],
              ['Type Safety', '✅ Better', '❌ Limited'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Use <Bold>async/await</Bold> for even cleaner syntax. It's built on promises and makes async code look <Bold>synchronous</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Strategic Importance of Promises
        </Title>

        <PlainText>
          Expert-level understanding of why promises matter:
        </PlainText>

        <CodeComponent
          code={`// 1. Promise-based Architecture
class AsyncPipeline {
  constructor() {
    this.steps = [];
  }
  
  add(step) {
    this.steps.push(step);
    return this;
  }
  
  execute(initialData) {
    return this.steps.reduce(
      (promise, step) => promise.then(step),
      Promise.resolve(initialData)
    );
  }
}

// 2. Promise with Transaction Support
class TransactionManager {
  constructor() {
    this.operations = [];
  }
  
  add(operation) {
    this.operations.push(operation);
    return this;
  }
  
  async execute() {
    const results = [];
    const errors = [];
    
    for (const operation of this.operations) {
      try {
        const result = await operation();
        results.push(result);
      } catch (error) {
        errors.push(error);
        // Rollback all previous operations
        await this.rollback(results);
        throw new Error(\`Transaction failed: \${error.message}\`);
      }
    }
    
    return results;
  }
  
  async rollback(results) {
    // Rollback logic
    for (const result of results.reverse()) {
      await this.rollbackOperation(result);
    }
  }
}

// 3. Promise-based State Management
class PromiseStateManager {
  constructor() {
    this.state = {};
    this.pending = new Map();
    this.history = [];
  }
  
  async dispatch(action, payload) {
    const id = Date.now() + Math.random();
    const promise = new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
    
    try {
      const result = await this.executeAction(action, payload);
      this.pending.get(id).resolve(result);
      this.history.push({ action, payload, result, timestamp: Date.now() });
      return result;
    } catch (error) {
      this.pending.get(id).reject(error);
      throw error;
    } finally {
      this.pending.delete(id);
    }
  }
  
  async executeAction(action, payload) {
    // Execute action logic
    return { action, payload };
  }
}

// 4. Promise-based Rate Limiter
class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }
  
  async execute(fn) {
    const now = Date.now();
    this.requests = this.requests.filter(
      timestamp => now - timestamp < this.timeWindow
    );
    
    if (this.requests.length >= this.maxRequests) {
      const waitTime = this.timeWindow - (now - this.requests[0]);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.execute(fn);
    }
    
    this.requests.push(now);
    return fn();
  }
}

// 5. Promise-based Dependency Injection
class PromiseDI {
  constructor() {
    this.dependencies = new Map();
    this.resolved = new Map();
  }
  
  register(name, factory) {
    this.dependencies.set(name, factory);
    return this;
  }
  
  async resolve(name) {
    if (this.resolved.has(name)) {
      return this.resolved.get(name);
    }
    
    const factory = this.dependencies.get(name);
    if (!factory) {
      throw new Error(\`Dependency "\${name}" not found\`);
    }
    
    const instance = await factory(this);
    this.resolved.set(name, instance);
    return instance;
  }
}

// 6. Promise-based Caching
class PromiseCache {
  constructor(ttl = 60000) {
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  async get(key, fetcher) {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.value;
    }
    
    const value = await fetcher();
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
    
    return value;
  }
  
  invalidate(key) {
    this.cache.delete(key);
  }
  
  clear() {
    this.cache.clear();
  }
}`}
          language="javascript"
          title="promise-why-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Strategic Benefits">
          <PlainText component="div">
            • <Bold>Code Quality:</Bold> Clean, maintainable async code<br />
            • <Bold>Error Handling:</Bold> Centralized error management<br />
            • <Bold>Scalability:</Bold> Easy to add new async operations<br />
            • <Bold>Testing:</Bold> Simple to test promise-based code<br />
            • <Bold>Integration:</Bold> Works with all modern frameworks<br />
            • <Bold>Future-Proof:</Bold> Async/await support built-in
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Promises are <Bold>fundamental</Bold> to modern JavaScript. They enable <Bold>clean, maintainable asynchronous code</Bold> and are the foundation of <Bold>modern web frameworks</Bold>. Mastering promises is <Bold>essential</Bold> for any JavaScript developer.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Promises <Bold>revolutionized</Bold> how we handle asynchronous operations. They're <Bold>essential</Bold> for building modern, responsive web applications. Learn them well to <Bold>write better code</Bold>!
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
            <>Promises make <Bold>async code readable</Bold> and <Bold>maintainable</Bold></>,
            <>They <Bold>avoid callback hell</Bold> with clean chaining</>,
            <>Provide <Bold>centralized error handling</Bold> with <InlineCode>.catch()</InlineCode></>,
            <>Enable <Bold>parallel operations</Bold> with <InlineCode>Promise.all</InlineCode></>,
            <>Support <Bold>async/await</Bold> for even cleaner syntax</>,
            <>Essential for <Bold>modern web development</Bold></>,
            <>Used in <Bold>all major frameworks</Bold> (React, Vue, Angular)</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Embrace promises and async/await in your projects. They'll make your code <Bold>cleaner</Bold>, <Bold>more maintainable</Bold>, and <Bold>easier to debug</Bold>!
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Promises are <Bold>not optional</Bold> in modern JavaScript. They're the <Bold>standard way</Bold> to handle asynchronous operations. Master them to become a <Bold>better developer</Bold>!
      </Note>
    </QuestionWrapper>
  );
}