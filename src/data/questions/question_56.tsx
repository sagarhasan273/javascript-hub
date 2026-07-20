// data/questions/Question56.tsx
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
} from "../../components/content";
import { question56Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question56({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question56Meta.id}
      title={question56Meta.title}
      definition={question56Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>callback function</Bold> is a function that is <Bold>passed as an argument</Bold> to another function and is <Bold>executed later</Bold> after some operation completes. It's a fundamental concept in JavaScript for handling <Bold>asynchronous operations</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is a Callback Function?
        </Title>

        <PlainText>
          Think of a callback like a <Bold>restaurant buzzer</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🔔 Analogy">
          <PlainText>
            When you order food at a restaurant, they give you a buzzer. You can do other things while waiting. When your food is ready, the buzzer goes off (callback is called) and you go get your food. The buzzer is a "callback" that notifies you when something is ready.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Callback Examples:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Simple callback example
function greet(name, callback) {
  console.log('Hello, ' + name);
  callback();
}

function sayGoodbye() {
  console.log('Goodbye!');
}

greet('John', sayGoodbye);
// Output:
// Hello, John
// Goodbye!

// 2. Callback with parameters
function calculate(a, b, callback) {
  const result = a + b;
  callback(result);
}

calculate(5, 3, function(result) {
  console.log('Result is:', result); // Result is: 8
});

// 3. Arrow function callback
calculate(10, 5, (result) => {
  console.log('Result:', result); // Result: 15
});

// 4. Event listener callback
document.getElementById('btn').addEventListener('click', function() {
  console.log('Button clicked!');
});

// 5. Array methods with callbacks
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(function(num) {
  console.log(num * 2);
});

// 6. setTimeout callback
setTimeout(function() {
  console.log('Executed after 2 seconds');
}, 2000);`}
          language="javascript"
          title="callback-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> A callback is a function that is <Bold>passed as an argument</Bold> to another function and is <Bold>executed later</Bold>.
        </Note>

        <CardComponent variant="success" title="✅ Common Use Cases">
          <PlainText component="div">
            • <Bold>Event Listeners:</Bold> Click, hover, keypress events<br />
            • <Bold>Array Methods:</Bold> forEach, map, filter, reduce<br />
            • <Bold>Timers:</Bold> setTimeout, setInterval<br />
            • <Bold>API Calls:</Bold> AJAX, fetch responses<br />
            • <Bold>File Operations:</Bold> Reading/writing files<br />
            • <Bold>Custom Functions:</Bold> User-defined callbacks
          </PlainText>
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Callback Patterns
        </Title>

        <PlainText>
          Advanced callback patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Callback with error handling (Node.js style)
function fetchData(callback) {
  // Simulate async operation
  setTimeout(() => {
    const error = null;
    const data = { id: 1, name: 'John' };
    
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data:', data);
  }
});

// 2. Callback chaining
function step1(callback) {
  setTimeout(() => {
    console.log('Step 1 complete');
    callback(null, 'data1');
  }, 1000);
}

function step2(data, callback) {
  setTimeout(() => {
    console.log('Step 2 complete with:', data);
    callback(null, 'data2');
  }, 1000);
}

function step3(data, callback) {
  setTimeout(() => {
    console.log('Step 3 complete with:', data);
    callback(null, 'final');
  }, 1000);
}

step1((err, data1) => {
  if (err) return console.error(err);
  step2(data1, (err, data2) => {
    if (err) return console.error(err);
    step3(data2, (err, result) => {
      if (err) return console.error(err);
      console.log('Final result:', result);
    });
  });
});

// 3. Callback with context binding
class UserService {
  constructor() {
    this.users = [];
  }
  
  addUser(user, callback) {
    this.users.push(user);
    callback(null, this.users);
  }
  
  getUsers(callback) {
    callback(null, this.users);
  }
}

const service = new UserService();
service.addUser({ name: 'John' }, (err, users) => {
  if (err) return console.error(err);
  console.log('Users:', users);
});

// 4. Higher-order functions with callbacks
function createProcessor(processFn) {
  return function(data, callback) {
    try {
      const result = processFn(data);
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  };
}

const doubleProcessor = createProcessor((data) => data * 2);
doubleProcessor(5, (err, result) => {
  if (err) return console.error(err);
  console.log('Doubled:', result); // 10
});

// 5. Callback with timeout
function asyncOperation(callback) {
  const timeout = setTimeout(() => {
    callback(new Error('Operation timed out'), null);
  }, 5000);
  
  // Simulate async work
  setTimeout(() => {
    clearTimeout(timeout);
    callback(null, 'Success!');
  }, 1000);
}

asyncOperation((err, result) => {
  if (err) return console.error('Error:', err.message);
  console.log('Result:', result);
});`}
          language="javascript"
          title="callback-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Callback Types">
          <PlainText component="div">
            • <Bold>Synchronous Callback:</Bold> Executed immediately<br />
            • <Bold>Asynchronous Callback:</Bold> Executed later (after async operation)<br />
            • <Bold>Error-first Callback:</Bold> First parameter is error (Node.js style)<br />
            • <Bold>Higher-Order Callback:</Bold> Returns a function<br />
            • <Bold>Event Callback:</Bold> Responds to events
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Callbacks can lead to <Bold>callback hell</Bold> when deeply nested. Use <Bold>promises</Bold> or <Bold>async/await</Bold> for better readability.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Callback Patterns
        </Title>

        <PlainText>
          Expert-level callback patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Callback with cancellation
function cancellableCallback(callback, delay) {
  let cancelled = false;
  let timeoutId = null;
  
  const wrappedCallback = function(...args) {
    if (!cancelled) {
      callback(...args);
    }
  };
  
  timeoutId = setTimeout(wrappedCallback, delay);
  
  return {
    cancel: function() {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }
  };
}

// Usage
const task = cancellableCallback(() => {
  console.log('Callback executed!');
}, 5000);

// Cancel before it executes
task.cancel();

// 2. Callback with retry mechanism
function retryCallback(fn, retries = 3, delay = 1000) {
  return function(...args) {
    let attempts = 0;
    
    function attempt() {
      try {
        return fn(...args);
      } catch (error) {
        attempts++;
        if (attempts < retries) {
          console.log(\`Retry \${attempts} of \${retries}\`);
          setTimeout(attempt, delay);
        } else {
          throw error;
        }
      }
    }
    
    return attempt();
  };
}

// 3. Callback queue
class CallbackQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }
  
  add(callback) {
    this.queue.push(callback);
    this.process();
  }
  
  process() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    const callback = this.queue.shift();
    
    try {
      callback();
    } catch (error) {
      console.error('Callback error:', error);
    } finally {
      this.isProcessing = false;
      this.process();
    }
  }
}

// 4. Callback with priority
class PriorityCallbackQueue {
  constructor() {
    this.highPriority = [];
    this.normalPriority = [];
    this.lowPriority = [];
    this.isProcessing = false;
  }
  
  add(callback, priority = 'normal') {
    const queue = {
      high: this.highPriority,
      normal: this.normalPriority,
      low: this.lowPriority
    }[priority];
    
    queue.push(callback);
    this.process();
  }
  
  process() {
    if (this.isProcessing) return;
    
    const nextCallback = this.getNextCallback();
    if (!nextCallback) return;
    
    this.isProcessing = true;
    try {
      nextCallback();
    } catch (error) {
      console.error('Callback error:', error);
    } finally {
      this.isProcessing = false;
      this.process();
    }
  }
  
  getNextCallback() {
    if (this.highPriority.length > 0) return this.highPriority.shift();
    if (this.normalPriority.length > 0) return this.normalPriority.shift();
    if (this.lowPriority.length > 0) return this.lowPriority.shift();
    return null;
  }
}

// 5. Callback with debouncing
function debounce(callback, delay) {
  let timeoutId = null;
  
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };
}

// 6. Callback with throttling
function throttle(callback, limit) {
  let inThrottle = false;
  
  return function(...args) {
    if (!inThrottle) {
      callback(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// 7. Callback with progress reporting
function progressCallback(callback) {
  let progress = 0;
  
  return {
    update: function(value) {
      progress = value;
      callback(progress);
    },
    complete: function(result) {
      callback(100, result);
    }
  };
}

// Usage
const progress = progressCallback((progress, result) => {
  console.log('Progress:', progress + '%');
  if (result) {
    console.log('Complete:', result);
  }
});

// Simulate progress
let count = 0;
const interval = setInterval(() => {
  count += 10;
  progress.update(count);
  if (count >= 100) {
    clearInterval(interval);
    progress.complete('Done!');
  }
}, 500);`}
          language="javascript"
          title="callback-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Best Practices">
          <PlainText component="div">
            • <Bold>Avoid callback hell:</Bold> Use promises or async/await<br />
            • <Bold>Error handling:</Bold> Always handle callback errors<br />
            • <Bold>Memory leaks:</Bold> Clean up event listeners<br />
            • <Bold>Debouncing:</Bold> Prevent excessive callback calls<br />
            • <Bold>Throttling:</Bold> Rate-limit callback execution<br />
            • <Bold>Context binding:</Bold> Use bind() or arrow functions
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Callbacks are the <Bold>foundation</Bold> of asynchronous JavaScript. While modern patterns like promises are preferred, understanding callbacks is <Bold>essential</Bold> for working with legacy code and understanding the evolution of JavaScript.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Callbacks are a <Bold>fundamental concept</Bold> in JavaScript. Master them to understand async programming, then move to <Bold>promises</Bold> and <Bold>async/await</Bold> for cleaner code.
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
            <>A callback is a function <Bold>passed as an argument</Bold> to another function</>,
            <>It is <Bold>executed later</Bold> after some operation completes</>,
            <>Used for <Bold>asynchronous operations</Bold>, <Bold>events</Bold>, and <Bold>array methods</Bold></>,
            <>Can be <Bold>synchronous</Bold> or <Bold>asynchronous</Bold></>,
            <>Node.js style uses <Bold>error-first</Bold> callbacks</>,
            <>Deep nesting leads to <Bold>callback hell</Bold></>,
            <>Modern alternatives: <Bold>Promises</Bold> and <Bold>async/await</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> While callbacks are still used, modern JavaScript favors <Bold>promises</Bold> and <Bold>async/await</Bold> for better readability. However, understanding callbacks is <Bold>essential</Bold> for reading and maintaining older codebases.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Callbacks are the <Bold>building blocks</Bold> of async JavaScript. Master them to understand the <Bold>evolution</Bold> of the language!
      </Note>
    </QuestionWrapper>
  );
}