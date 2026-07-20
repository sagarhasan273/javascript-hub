// data/questions/Question57.tsx
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
  UnorderedList,
  TableComponent,
} from "../../components/content";
import { question57Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question57({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question57Meta.id}
      title={question57Meta.title}
      definition={question57Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Callbacks</Bold> are essential in JavaScript because they enable <Bold>asynchronous programming</Bold>. They allow us to <Bold>continue executing code</Bold> while waiting for operations to complete, preventing the browser from freezing.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Why We Need Callbacks
        </Title>

        <PlainText>
          Think of callbacks like a <Bold>notification system</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📱 Analogy">
          <PlainText>
            Without callbacks, you'd have to wait (block) for every operation to complete. With callbacks, you can <Bold>start an operation</Bold> and get <Bold>notified when it's done</Bold>. This is like ordering food and getting a notification when it's ready, instead of standing at the counter and waiting.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Why Callbacks are Necessary:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Without callbacks - Synchronous (blocking)
function fetchDataSync() {
  // Simulate blocking operation
  const start = Date.now();
  while (Date.now() - start < 3000) {
    // Busy waiting (blocks everything)
  }
  return { data: 'Result' };
}

console.log('Start');
const result = fetchDataSync(); // Blocks for 3 seconds
console.log('Result:', result);
console.log('End');
// UI is frozen for 3 seconds!

// 2. With callbacks - Asynchronous (non-blocking)
function fetchDataAsync(callback) {
  setTimeout(() => {
    const data = { data: 'Result' };
    callback(data);
  }, 3000);
}

console.log('Start');
fetchDataAsync((result) => {
  console.log('Result:', result);
});
console.log('End');
// UI stays responsive!

// 3. Real-world example: API call
function getUserData(userId, callback) {
  // Simulate API call
  setTimeout(() => {
    const user = { id: userId, name: 'John' };
    callback(user);
  }, 1000);
}

getUserData(1, (user) => {
  console.log('User:', user);
});`}
          language="javascript"
          title="callbacks-why-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Callbacks allow JavaScript to be <Bold>non-blocking</Bold> and <Bold>responsive</Bold>.
        </Note>

        <CardComponent variant="success" title="✅ Why Callbacks Matter">
          <UnorderedList
            items={[
              <>🔄 <Bold>Non-Blocking:</Bold> Keep UI responsive</>,
              <>⚡ <Bold>Performance:</Bold> Don't waste time waiting</>,
              <>📱 <Bold>User Experience:</Bold> No freezing or lag</>,
              <>🌐 <Bold>Network Operations:</Bold> Handle API calls efficiently</>,
              <>🎯 <Bold>Event Handling:</Bold> Respond to user interactions</>,
              <>📊 <Bold>Data Processing:</Bold> Process data as it arrives</>,
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
          Advanced: Callback Use Cases
        </Title>

        <PlainText>
          Advanced scenarios where callbacks are essential:
        </PlainText>

        <CodeComponent
          code={`// 1. File operations (Node.js)
const fs = require('fs');

fs.readFile('/path/to/file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

// 2. Database operations
function queryDatabase(sql, callback) {
  // Simulate DB query
  setTimeout(() => {
    const results = [{ id: 1, name: 'John' }];
    callback(null, results);
  }, 500);
}

queryDatabase('SELECT * FROM users', (err, results) => {
  if (err) return console.error(err);
  console.log('Results:', results);
});

// 3. User interaction
document.getElementById('searchInput').addEventListener('input', (event) => {
  console.log('Search term:', event.target.value);
});

// 4. Animation completion
function animateElement(element, callback) {
  element.style.transition = 'all 0.5s';
  element.style.transform = 'translateX(100px)';
  
  setTimeout(() => {
    callback();
  }, 500);
}

const el = document.getElementById('box');
animateElement(el, () => {
  console.log('Animation complete!');
});

// 5. Data streaming
function processDataStream(callback) {
  let data = [];
  
  // Simulate data chunks
  setTimeout(() => data.push('chunk1'), 100);
  setTimeout(() => data.push('chunk2'), 200);
  setTimeout(() => data.push('chunk3'), 300);
  
  // Process when all chunks received
  setTimeout(() => {
    callback(data.join(''));
  }, 400);
}

// 6. Parallel operations
function fetchAllData(callback) {
  let completed = 0;
  const results = {};
  
  function checkComplete() {
    completed++;
    if (completed === 3) {
      callback(results);
    }
  }
  
  getUserData(1, (user) => {
    results.user = user;
    checkComplete();
  });
  
  getPosts(1, (posts) => {
    results.posts = posts;
    checkComplete();
  });
  
  getComments(1, (comments) => {
    results.comments = comments;
    checkComplete();
  });
}`}
          language="javascript"
          title="callbacks-why-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Callback vs Synchronous">
          <TableComponent
            headers={['Feature', 'Synchronous', 'Callback']}
            rows={[
              ['Blocking', '✅ Blocks', '❌ Non-blocking'],
              ['UI Responsive', '❌ No', '✅ Yes'],
              ['Performance', '❌ Wastes time', '✅ Efficient'],
              ['Complexity', '✅ Simple', '⚠️ Can be complex'],
              ['Error Handling', '✅ Try-catch', '⚠️ Error-first pattern'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Callbacks enable <Bold>non-blocking I/O</Bold>, which is why JavaScript is so efficient for <Bold>network operations</Bold> and <Bold>user interfaces</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Strategic Importance of Callbacks
        </Title>

        <PlainText>
          Expert-level understanding of why callbacks are critical:
        </PlainText>

        <CodeComponent
          code={`// 1. Event-driven architecture
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }
  
  emit(event, data) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

// 2. Promise implementation using callbacks
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = null;
    this.handlers = [];
    this.catchHandlers = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.handlers.forEach(handler => handler(value));
      }
    };
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.catchHandlers.forEach(handler => handler(reason));
      }
    };
    
    executor(resolve, reject);
  }
  
  then(onSuccess) {
    return new MyPromise((resolve) => {
      if (this.state === 'fulfilled') {
        const result = onSuccess(this.value);
        resolve(result);
      } else {
        this.handlers.push((value) => {
          const result = onSuccess(value);
          resolve(result);
        });
      }
    });
  }
}

// 3. Middleware pattern with callbacks
class Middleware {
  constructor() {
    this.middlewares = [];
  }
  
  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }
  
  execute(context, callback) {
    let index = 0;
    
    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(context, next);
      } else {
        callback(context);
      }
    };
    
    next();
  }
}

// 4. Stream processing with callbacks
class StreamProcessor {
  constructor() {
    this.handlers = [];
  }
  
  pipe(handler) {
    this.handlers.push(handler);
    return this;
  }
  
  process(data) {
    let result = data;
    this.handlers.forEach(handler => {
      result = handler(result);
    });
    return result;
  }
  
  processAsync(data, callback) {
    let result = data;
    let index = 0;
    
    const next = () => {
      if (index < this.handlers.length) {
        const handler = this.handlers[index++];
        handler(result, (newResult) => {
          result = newResult;
          next();
        });
      } else {
        callback(result);
      }
    };
    
    next();
  }
}

// 5. Callback-based state machine
class StateMachine {
  constructor(initialState) {
    this.state = initialState;
    this.transitions = new Map();
  }
  
  addTransition(from, to, callback) {
    if (!this.transitions.has(from)) {
      this.transitions.set(from, []);
    }
    this.transitions.get(from).push({ to, callback });
  }
  
  transition(event, data, callback) {
    const transitions = this.transitions.get(this.state) || [];
    const transition = transitions.find(t => t.to === event);
    
    if (transition) {
      const oldState = this.state;
      this.state = event;
      transition.callback(data, (error, result) => {
        if (error) {
          this.state = oldState;
          callback(error, null);
        } else {
          callback(null, { state: this.state, result });
        }
      });
    } else {
      callback(new Error('Invalid transition'), null);
    }
  }
}

// 6. Callback-based caching
class CallbackCache {
  constructor() {
    this.cache = new Map();
  }
  
  get(key, fetcher, callback) {
    if (this.cache.has(key)) {
      callback(null, this.cache.get(key));
      return;
    }
    
    fetcher((error, value) => {
      if (error) {
        callback(error, null);
      } else {
        this.cache.set(key, value);
        callback(null, value);
      }
    });
  }
}`}
          language="javascript"
          title="callbacks-why-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Callback Architecture Benefits">
          <PlainText component="div">
            • <Bold>Event-Driven:</Bold> Respond to user interactions<br />
            • <Bold>Non-Blocking:</Bold> Efficient resource usage<br />
            • <Bold>Flexible:</Bold> Customizable behavior<br />
            • <Bold>Composable:</Bold> Build complex flows<br />
            • <Bold>Testable:</Bold> Easy to test in isolation<br />
            • <Bold>Scalable:</Bold> Handle many concurrent operations
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Callbacks are the <Bold>foundation</Bold> of JavaScript's event-driven, non-blocking architecture. They enable <Bold>responsive applications</Bold> and <Bold>efficient resource usage</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Callbacks are <Bold>essential</Bold> for JavaScript's asynchronous nature. They enable <Bold>responsive, efficient applications</Bold> and are the foundation for <Bold>more advanced patterns</Bold>.
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
            <>Callbacks enable <Bold>non-blocking</Bold> code execution</>,
            <>They keep the <Bold>UI responsive</Bold> and prevent freezing</>,
            <>Essential for <Bold>network operations</Bold>, <Bold>events</Bold>, and <Bold>I/O</Bold></>,
            <>Allow <Bold>parallel operations</Bold> without blocking</>,
            <>Enable <Bold>event-driven architecture</Bold></>,
            <>Foundation for <Bold>promises</Bold> and <Bold>async/await</Bold></>,
            <>Still widely used in <Bold>Node.js</Bold> and <Bold>browser APIs</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> While modern patterns like promises exist, callbacks remain <Bold>fundamental</Bold> to JavaScript. Understanding them helps you <Bold>appreciate</Bold> the evolution of the language and <Bold>work with</Bold> legacy code.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Callbacks are <Bold>not obsolete</Bold>. They're the <Bold>foundation</Bold> of JavaScript's async model and are still <Bold>widely used</Bold> in many contexts!
      </Note>
    </QuestionWrapper>
  );
}