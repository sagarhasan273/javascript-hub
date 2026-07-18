// data/questions/Question53.tsx
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
import { question53Meta } from "../registry";
import { useLevel } from "../../hooks";
import { BlockOutlined } from "@mui/icons-material";

export function Question53({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question53Meta.id}
      title={question53Meta.title}
      definition={question53Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>Promise</Bold> is an object that represents the <Bold>eventual completion</Bold> (or failure) of an asynchronous operation. It's like a <Bold>placeholder</Bold> for a value that will be available in the future.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is a Promise?
        </Title>

        <PlainText>
          Think of a promise like a <Bold>coupon for a pizza</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🍕 Analogy">
          <PlainText>
            You order a pizza (async operation). They give you a receipt (promise). The receipt represents the pizza you'll get later. You can:
            - Wait for the pizza and eat it (resolve)
            - Get a call saying they ran out of ingredients (reject)
            - Do other things while waiting (non-blocking)
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Promise Basics:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  // Async operation
  const success = true;
  
  if (success) {
    resolve('Operation successful!');
  } else {
    reject('Operation failed!');
  }
});

// 2. Using a Promise
myPromise
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// 3. Real-world example
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (userId === 1) {
        resolve({ id: 1, name: 'John' });
      } else {
        reject('User not found');
      }
    }, 1000);
  });
}

// 4. Using the function
fetchUserData(1)
  .then(user => {
    console.log('User found:', user.name);
  })
  .catch(error => {
    console.log('Error:', error);
  });

// 5. Chaining Promises
fetchUserData(1)
  .then(user => {
    console.log('User:', user.name);
    return fetchUserData(2);
  })
  .then(user => {
    console.log('Second user:', user.name);
  })
  .catch(error => {
    console.log('Error in chain:', error);
  });`}
          language="javascript"
          title="promise-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> A promise is a <Bold>placeholder</Bold> for a future value. It allows you to write <Bold>asynchronous code</Bold> without blocking the main thread.
        </Note>

        <CardComponent variant="success" title="✅ Promise States">
          <PlainText component="div">
            • <Bold>Pending:</Bold> Initial state (not yet resolved or rejected)<br />
            • <Bold>Fulfilled:</Bold> Operation completed successfully<br />
            • <Bold>Rejected:</Bold> Operation failed<br />
            • <Bold>Settled:</Bold> Either fulfilled or rejected
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
          Advanced: Promise Patterns
        </Title>

        <PlainText>
          Advanced promise usage patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Promise.all - Wait for all promises
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [3, 42, 'foo']
  });

// 2. Promise.allSettled - Wait for all to settle
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another')
]).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('Success:', result.value);
    } else {
      console.log('Error:', result.reason);
    }
  });
});

// 3. Promise.race - First to settle wins
Promise.race([
  new Promise(resolve => setTimeout(resolve, 100, 'fast')),
  new Promise(resolve => setTimeout(resolve, 200, 'slow'))
]).then(value => {
  console.log(value); // 'fast'
});

// 4. Promise.any - First fulfilled wins
Promise.any([
  Promise.reject('Error 1'),
  Promise.resolve('Success 1'),
  Promise.resolve('Success 2')
]).then(value => {
  console.log(value); // 'Success 1'
});

// 5. Promise with timeout
function promiseWithTimeout(promise, timeout) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), timeout);
    })
  ]);
}

// 6. Promise retry pattern
function retryPromise(fn, retries = 3) {
  return new Promise((resolve, reject) => {
    function attempt() {
      fn().then(resolve).catch(error => {
        if (retries <= 0) {
          reject(error);
        } else {
          retries--;
          console.log(\`Retrying... \${retries} attempts left\`);
          attempt();
        }
      });
    }
    attempt();
  });
}

// 7. Promise with cancellation
class CancellablePromise {
  constructor(executor) {
    this.isCancelled = false;
    
    this.promise = new Promise((resolve, reject) => {
      executor(
        (value) => {
          if (!this.isCancelled) resolve(value);
        },
        (reason) => {
          if (!this.isCancelled) reject(reason);
        }
      );
    });
  }
  
  cancel() {
    this.isCancelled = true;
  }
}`}
          language="javascript"
          title="promise-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Promise Methods Summary">
          <TableComponent
            headers={['Method', 'Description', 'Returns']}
            rows={[
              ['Promise.all()', 'Wait for all to resolve', 'Array of results'],
              ['Promise.allSettled()', 'Wait for all to settle', 'Array of results'],
              ['Promise.race()', 'First to settle', 'First result'],
              ['Promise.any()', 'First to fulfill', 'First fulfilled'],
              ['Promise.resolve()', 'Create resolved promise', 'Fulfilled promise'],
              ['Promise.reject()', 'Create rejected promise', 'Rejected promise'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Always <Bold>handle rejections</Bold> with <InlineCode>.catch()</InlineCode> to avoid unhandled promise rejections.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Promise Under the Hood
        </Title>

        <PlainText>
          Expert-level promise understanding:
        </PlainText>

        <CodeComponent
          code={`// 1. Simplified Promise implementation
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
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onSuccess) {
    return new MyPromise((resolve) => {
      if (this.state === 'fulfilled') {
        const result = onSuccess(this.value);
        resolve(result);
      } else if (this.state === 'pending') {
        this.handlers.push((value) => {
          const result = onSuccess(value);
          resolve(result);
        });
      }
    });
  }
  
  catch(onError) {
    if (this.state === 'rejected') {
      onError(this.value);
    } else if (this.state === 'pending') {
      this.catchHandlers.push(onError);
    }
    return this;
  }
}

// 2. Promise with async/await
async function fetchData() {
  try {
    const data = await fetchUserData(1);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// 3. Converting callbacks to promises
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// 4. Promise queue for rate limiting
class PromiseQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  
  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => {
        task().then(resolve).catch(reject);
      });
      this.process();
    });
  }
  
  process() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift();
      this.running++;
      task().finally(() => {
        this.running--;
        this.process();
      });
    }
  }
}

// 5. Promise memory leak detection
function trackPromise(promise, label) {
  let isResolved = false;
  
  const tracked = promise
    .then(result => {
      isResolved = true;
      return result;
    })
    .catch(error => {
      isResolved = true;
      throw error;
    });
  
  // Check if promise is still pending after 5 seconds
  setTimeout(() => {
    if (!isResolved) {
      console.warn(\`Promise "\${label}" is still pending after 5 seconds\`);
    }
  }, 5000);
  
  return tracked;
}

// 6. Promise with progress reporting
function createProgressPromise(task, progressCallback) {
  return new Promise((resolve, reject) => {
    let progress = 0;
    
    const progressFunction = (value) => {
      progress = value;
      progressCallback(progress);
    };
    
    // Pass progress function to task
    task(progressFunction)
      .then(resolve)
      .catch(reject);
  });
}`}
          language="javascript"
          title="promise-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Promise Performance Tips">
          <PlainText component="div">
            • <Bold>Always handle rejections</Bold> to avoid unhandled rejections<br />
            • <Bold>Use Promise.all</Bold> for parallel operations<br />
            • <Bold>Be careful with loops</Bold> (avoid blocking the event loop)<br />
            • <Bold>Memory management:</Bold> Clean up promise references<br />
            • <Bold>Cancel patterns:</Bold> Implement cancellation when needed<br />
            • <Bold>Avoid promise nesting:</Bold> Use chaining instead
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Promises are a <Bold>powerful abstraction</Bold> for asynchronous programming. Understanding their <Bold>internal mechanics</Bold> helps you write <Bold>more efficient, reliable code</Bold>. Master patterns like <Bold>retry, timeout, and queue</Bold> for complex async scenarios.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Promises <Bold>revolutionized</Bold> async JavaScript. They provide a <Bold>clean, composable</Bold> way to handle asynchronous operations. Master them to write <Bold>better, more maintainable code</Bold>.
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
            <>A promise represents the <BlockOutlined>future result</BlockOutlined> of an async operation</>,
            <>Three states: <BlockOutlined>Pending</BlockOutlined>, <BlockOutlined>Fulfilled</BlockOutlined>, <BlockOutlined>Rejected</BlockOutlined></>,
            <>Use <BlockOutlined>.then()</BlockOutlined> for success and <BlockOutlined>.catch()</BlockOutlined> for errors</>,
            <>Promises are <BlockOutlined>chainable</BlockOutlined> for sequential operations</>,
            <>Use <BlockOutlined>Promise.all</BlockOutlined> for parallel operations</>,
            <>Always <BlockOutlined>handle rejections</BlockOutlined> to avoid errors</>,
            <>Async/await is <BlockOutlined>syntactic sugar</BlockOutlined> over promises</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Always <BlockOutlined>handle promise rejections</BlockOutlined> with <InlineCode>.catch()</InlineCode> or <InlineCode>try/catch</InlineCode> in async functions. Unhandled rejections can cause <BlockOutlined>unexpected crashes</BlockOutlined> in your application.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Promises are the <Bold>foundation</Bold> of modern async JavaScript. Master them to write <Bold>clean, maintainable, and reliable</Bold> asynchronous code!
      </Note>
    </QuestionWrapper>
  );
}