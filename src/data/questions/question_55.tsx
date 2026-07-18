// data/questions/Question55.tsx
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
import { question55Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question55({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question55Meta.id}
      title={question55Meta.title}
      definition={question55Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A Promise has <Bold>three states</Bold> that represent its lifecycle:
        <Bold>Pending</Bold>, <Bold>Fulfilled</Bold>, and <Bold>Rejected</Bold>. Understanding these states is <Bold>crucial</Bold> for working effectively with promises.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Promise States
        </Title>

        <PlainText>
          Think of promise states like a <Bold>pizza delivery</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🍕 Analogy">
          <PlainText>
            • <Bold>Pending:</Bold> You ordered pizza and it's being prepared (waiting)<br />
            • <Bold>Fulfilled:</Bold> Pizza arrived! 🎉 (success)<br />
            • <Bold>Rejected:</Bold> Pizza place ran out of dough (failure)<br />
            • <Bold>Settled:</Bold> Either arrived or failed (done)
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Promise States in Code:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Pending State
const pendingPromise = new Promise((resolve, reject) => {
  // Still processing (waiting)
});
console.log(pendingPromise); // Promise { <pending> }

// 2. Fulfilled State
const fulfilledPromise = Promise.resolve('Success!');
console.log(fulfilledPromise); // Promise { 'Success!' }

// 3. Rejected State
const rejectedPromise = Promise.reject('Error!');
console.log(rejectedPromise); // Promise { <rejected> 'Error!' }

// 4. State Transitions
const promise = new Promise((resolve, reject) => {
  // Pending → Fulfilled
  resolve('Completed!');
  // or Pending → Rejected
  // reject('Failed!');
});

// 5. Checking State with then/catch
promise
  .then(result => {
    console.log('Fulfilled:', result);
  })
  .catch(error => {
    console.log('Rejected:', error);
  })
  .finally(() => {
    console.log('Settled (either way)');
  });

// 6. Visual Example
function simulateOrder(shouldSucceed) {
  return new Promise((resolve, reject) => {
    console.log('Pending: Order placed...');
    
    setTimeout(() => {
      if (shouldSucceed) {
        console.log('Fulfilled: Order delivered! 🎉');
        resolve('Delicious food!');
      } else {
        console.log('Rejected: Order failed! 😢');
        reject('Out of stock!');
      }
    }, 2000);
  });
}

simulateOrder(true);
simulateOrder(false);`}
          language="javascript"
          title="promise-states-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> A promise starts <Bold>pending</Bold> and can only transition to <Bold>fulfilled</Bold> or <Bold>rejected</Bold> once (it's <Bold>irreversible</Bold>).
        </Note>

        <CardComponent variant="success" title="✅ State Summary">
          <PlainText component="div">
            • <Bold>Pending:</Bold> Initial state, waiting for completion<br />
            • <Bold>Fulfilled:</Bold> Operation completed successfully<br />
            • <Bold>Rejected:</Bold> Operation failed<br />
            • <Bold>Settled:</Bold> Either fulfilled or rejected (final state)<br />
            • <Bold>Irreversible:</Bold> Once a promise settles, it can't change
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
          Advanced: State Management
        </Title>

        <PlainText>
          Advanced promise state handling:
        </PlainText>

        <CodeComponent
          code={`// 1. Creating promises with different states
class PromiseStateDemo {
  static pending() {
    return new Promise(() => {});
  }
  
  static fulfilled(value) {
    return Promise.resolve(value);
  }
  
  static rejected(reason) {
    return Promise.reject(reason);
  }
  
  static settling() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Settled'), 1000);
    });
  }
}

// 2. Checking promise state (not built-in, but we can track)
function createTrackablePromise() {
  let state = 'pending';
  let value = null;
  
  const promise = new Promise((resolve, reject) => {
    const wrappedResolve = (val) => {
      state = 'fulfilled';
      value = val;
      resolve(val);
    };
    
    const wrappedReject = (reason) => {
      state = 'rejected';
      value = reason;
      reject(reason);
    };
    
    // Store resolve/reject for later use
    promise._resolve = wrappedResolve;
    promise._reject = wrappedReject;
  });
  
  promise.getState = () => state;
  promise.getValue = () => value;
  
  return promise;
}

// 3. State transition patterns
function handlePromiseStates(promise) {
  return promise
    .then(result => {
      console.log('Fulfilled with:', result);
      return { state: 'fulfilled', value: result };
    })
    .catch(error => {
      console.log('Rejected with:', error);
      return { state: 'rejected', value: error };
    })
    .finally(() => {
      console.log('Settled (either way)');
    });
}

// 4. Promise with state logging
function logPromiseState(promise, label = 'Promise') {
  console.log(\`\${label} started: pending\`);
  
  return promise
    .then(result => {
      console.log(\`\${label} completed: fulfilled\`);
      return result;
    })
    .catch(error => {
      console.log(\`\${label} failed: rejected\`);
      throw error;
    });
}

// 5. Race condition with state
function waitForState(promises, state = 'fulfilled') {
  return Promise.race(
    promises.map(p => 
      p.then(
        value => ({ state: 'fulfilled', value }),
        error => ({ state: 'rejected', error })
      )
    )
  ).then(result => {
    if (result.state === state) {
      return result;
    }
    return null;
  });
}

// 6. State-based promise handling
class PromiseStateHandler {
  constructor() {
    this.pending = new Set();
    this.fulfilled = new Set();
    this.rejected = new Set();
  }
  
  track(promise) {
    const id = Symbol('promise');
    this.pending.add(id);
    
    promise
      .then(value => {
        this.pending.delete(id);
        this.fulfilled.add(id);
        return value;
      })
      .catch(error => {
        this.pending.delete(id);
        this.rejected.add(id);
        throw error;
      });
    
    return promise;
  }
  
  getStats() {
    return {
      pending: this.pending.size,
      fulfilled: this.fulfilled.size,
      rejected: this.rejected.size,
      total: this.pending.size + this.fulfilled.size + this.rejected.size
    };
  }
}`}
          language="javascript"
          title="promise-states-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 State Transition Table">
          <TableComponent
            headers={['From State', 'To State', 'Trigger']}
            rows={[
              ['Pending', 'Fulfilled', 'resolve() called'],
              ['Pending', 'Rejected', 'reject() called'],
              ['Fulfilled', 'Fulfilled', 'Cannot change (irreversible)'],
              ['Rejected', 'Rejected', 'Cannot change (irreversible)'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Once a promise is <Bold>settled</Bold>, its state <Bold>cannot change</Bold>. This ensures <Bold>predictable behavior</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced State Patterns
        </Title>

        <PlainText>
          Expert-level promise state patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. State machine for promises
class PromiseStateMachine {
  constructor() {
    this.states = {
      PENDING: 'pending',
      FULFILLED: 'fulfilled',
      REJECTED: 'rejected'
    };
    
    this.transitions = {
      pending: {
        resolve: 'fulfilled',
        reject: 'rejected'
      },
      fulfilled: {
        resolve: 'fulfilled'
      },
      rejected: {
        reject: 'rejected'
      }
    };
  }
  
  canTransition(from, action) {
    return this.transitions[from] && this.transitions[from][action];
  }
  
  nextState(from, action) {
    if (this.canTransition(from, action)) {
      return this.transitions[from][action];
    }
    throw new Error(\`Invalid transition from \${from} with action \${action}\`);
  }
}

// 2. Promise with state subscription
class ObservablePromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = null;
    this.subscribers = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.notify('fulfilled', value);
      }
    };
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.notify('rejected', reason);
      }
    };
    
    executor(resolve, reject);
  }
  
  notify(state, value) {
    this.subscribers.forEach(sub => sub(state, value));
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    if (this.state !== 'pending') {
      callback(this.state, this.value);
    }
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }
  
  getState() {
    return this.state;
  }
  
  getValue() {
    return this.value;
  }
}

// 3. State-aware promise utilities
class PromiseUtils {
  static isPending(promise) {
    // Not directly possible, but we can create a wrapper
    let pending = true;
    const wrapped = promise.finally(() => { pending = false; });
    return {
      promise: wrapped,
      isPending: () => pending
    };
  }
  
  static getStateInfo(promise) {
    let state = 'pending';
    let value = null;
    
    const wrapped = promise
      .then(v => {
        state = 'fulfilled';
        value = v;
        return v;
      })
      .catch(e => {
        state = 'rejected';
        value = e;
        throw e;
      });
    
    return {
      promise: wrapped,
      getState: () => state,
      getValue: () => value
    };
  }
  
  static waitForState(promise, targetState, timeout = 5000) {
    let currentState = 'pending';
    
    const statePromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(\`Timeout waiting for \${targetState} state\`));
      }, timeout);
      
      promise
        .then(() => {
          currentState = 'fulfilled';
          if (targetState === 'fulfilled') {
            clearTimeout(timer);
            resolve('fulfilled');
          }
        })
        .catch(() => {
          currentState = 'rejected';
          if (targetState === 'rejected') {
            clearTimeout(timer);
            resolve('rejected');
          }
        });
    });
    
    return statePromise;
  }
}

// 4. State-based caching
class StateBasedCache {
  constructor() {
    this.cache = new Map();
    this.pending = new Map();
  }
  
  async get(key, fetcher) {
    // Check cache
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      if (entry.state === 'fulfilled') {
        return entry.value;
      }
      if (entry.state === 'rejected') {
        throw entry.error;
      }
    }
    
    // Check if already pending
    if (this.pending.has(key)) {
      return this.pending.get(key);
    }
    
    // Start new fetch
    const promise = fetcher()
      .then(value => {
        this.cache.set(key, { state: 'fulfilled', value });
        this.pending.delete(key);
        return value;
      })
      .catch(error => {
        this.cache.set(key, { state: 'rejected', error });
        this.pending.delete(key);
        throw error;
      });
    
    this.pending.set(key, promise);
    return promise;
  }
  
  getState(key) {
    if (this.cache.has(key)) {
      return this.cache.get(key).state;
    }
    if (this.pending.has(key)) {
      return 'pending';
    }
    return null;
  }
}

// 5. State transformation pipeline
class PromiseStatePipeline {
  constructor() {
    this.steps = [];
    this.state = 'pending';
    this.result = null;
  }
  
  add(step) {
    this.steps.push(step);
    return this;
  }
  
  execute(initial) {
    return this.steps.reduce(
      (promise, step) => {
        return promise
          .then(result => {
            this.state = 'fulfilled';
            this.result = result;
            return result;
          })
          .catch(error => {
            this.state = 'rejected';
            this.result = error;
            throw error;
          });
      },
      Promise.resolve(initial)
    );
  }
  
  getState() {
    return this.state;
  }
}`}
          language="javascript"
          title="promise-states-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 State Management Best Practices">
          <PlainText component="div">
            • <Bold>Always handle both states:</Bold> Use <InlineCode>.then()</InlineCode> and <InlineCode>.catch()</InlineCode><br />
            • <Bold>Use finally:</Bold> For cleanup regardless of state<br />
            • <Bold>State tracking:</Bold> Create wrappers for state monitoring<br />
            • <Bold>Error recovery:</Bold> Handle rejected states gracefully<br />
            • <Bold>State caching:</Bold> Cache fulfilled results for performance<br />
            • <Bold>Race conditions:</Bold> Handle concurrent state changes
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Understanding promise states is <Bold>fundamental</Bold> to writing robust async code. The <Bold>state machine</Bold> nature of promises ensures <Bold>predictable behavior</Bold> and makes complex async workflows <Bold>manageable</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Promise states (<Bold>pending</Bold>, <Bold>fulfilled</Bold>, <Bold>rejected</Bold>) provide a <Bold>clear, predictable lifecycle</Bold> for asynchronous operations. Mastering them is <Bold>essential</Bold> for writing reliable async code.
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
            <>Promises have <Bold>three states</Bold>: Pending, Fulfilled, Rejected</>,
            <>Starts <Bold>pending</Bold> and transitions to <Bold>fulfilled</Bold> or <Bold>rejected</Bold></>,
            <>State changes are <Bold>irreversible</Bold> (once settled, stays settled)</>,
            <><Bold>Fulfilled</Bold> means the operation succeeded</>,
            <><Bold>Rejected</Bold> means the operation failed</>,
            <>Use <Bold>.then()</Bold> for fulfillment and <Bold>.catch()</Bold> for rejection</>,
            <>Use <Bold>.finally()</Bold> for cleanup regardless of state</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Always handle <Bold>both fulfillment and rejection</Bold> states in your promises. This ensures your application <Bold>handles errors gracefully</Bold> and provides a <Bold>good user experience</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Promise states are the <Bold>key to understanding</Bold> how promises work. Master them to write <Bold>reliable, predictable asynchronous code</Bold>!
      </Note>
    </QuestionWrapper>
  );
}