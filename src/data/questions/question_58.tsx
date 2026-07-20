// data/questions/Question58.tsx
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
import { question58Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question58({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question58Meta.id}
      title={question58Meta.title}
      definition={question58Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Callback Hell</Bold> (also known as <Bold>"Pyramid of Doom"</Bold>) is a situation where <Bold>multiple nested callbacks</Bold> are used in sequence, creating deeply indented, difficult-to-read code. It occurs when asynchronous operations depend on each other's results.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is Callback Hell?
        </Title>

        <PlainText>
          Think of callback hell like a <Bold>Russian nesting doll</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🎪 Analogy">
          <PlainText>
            Imagine opening a nesting doll. Inside the first doll is another doll, inside that is another, and so on. To get to the smallest doll, you have to open each one in sequence. Callback hell is similar - each callback contains another callback, making the code hard to read and maintain.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Callback Hell Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// ❌ Callback Hell (Pyramid of Doom)
function getUser(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: 'John' };
    callback(null, user);
  }, 1000);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    const posts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' }
    ];
    callback(null, posts);
  }, 1000);
}

function getComments(postId, callback) {
  setTimeout(() => {
    const comments = [
      { id: 1, text: 'Comment 1' },
      { id: 2, text: 'Comment 2' }
    ];
    callback(null, comments);
  }, 1000);
}

function getLikes(commentId, callback) {
  setTimeout(() => {
    const likes = [1, 2, 3, 4, 5];
    callback(null, likes);
  }, 1000);
}

// The callback hell - deeply nested
getUser(1, (err, user) => {
  if (err) return console.error(err);
  console.log('User:', user);
  
  getPosts(user.id, (err, posts) => {
    if (err) return console.error(err);
    console.log('Posts:', posts);
    
    getComments(posts[0].id, (err, comments) => {
      if (err) return console.error(err);
      console.log('Comments:', comments);
      
      getLikes(comments[0].id, (err, likes) => {
        if (err) return console.error(err);
        console.log('Likes:', likes);
      });
    });
  });
});

// This creates a "pyramid" shape with increasing indentation
// It's hard to read, debug, and maintain!`}
          language="javascript"
          title="callback-hell-basics.js"
          defaultOpen={true}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Key Point:</Bold> Callback hell makes code <Bold>hard to read</Bold>, <Bold>hard to debug</Bold>, and <Bold>hard to maintain</Bold>.
        </Note>

        <CardComponent variant="success" title="✅ Problems with Callback Hell">
          <PlainText component="div">
            • 📖 <Bold>Poor Readability:</Bold> Hard to follow the logic<br />
            • 🐛 <Bold>Hard to Debug:</Bold> Difficult to trace errors<br />
            • 🔧 <Bold>Hard to Maintain:</Bold> Adding features is difficult<br />
            • 🧩 <Bold>Error Handling:</Bold> Errors get lost in nesting<br />
            • 📊 <Bold>Code Structure:</Bold> Becomes a pyramid shape<br />
            • 🚀 <Bold>Scalability:</Bold> Hard to add more operations
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
          Advanced: Avoiding Callback Hell
        </Title>

        <PlainText>
          Solutions to avoid callback hell:
        </PlainText>

        <CodeComponent
          code={`// 1. Named functions (instead of anonymous)
function handleUser(err, user) {
  if (err) return console.error(err);
  console.log('User:', user);
  getPosts(user.id, handlePosts);
}

function handlePosts(err, posts) {
  if (err) return console.error(err);
  console.log('Posts:', posts);
  getComments(posts[0].id, handleComments);
}

function handleComments(err, comments) {
  if (err) return console.error(err);
  console.log('Comments:', comments);
  getLikes(comments[0].id, handleLikes);
}

function handleLikes(err, likes) {
  if (err) return console.error(err);
  console.log('Likes:', likes);
}

getUser(1, handleUser);

// 2. Using Promises
function getUserPromise(userId) {
  return new Promise((resolve, reject) => {
    getUser(userId, (err, user) => {
      if (err) reject(err);
      else resolve(user);
    });
  });
}

function getPostsPromise(userId) {
  return new Promise((resolve, reject) => {
    getPosts(userId, (err, posts) => {
      if (err) reject(err);
      else resolve(posts);
    });
  });
}

// Clean promise chain
getUserPromise(1)
  .then(user => {
    console.log('User:', user);
    return getPostsPromise(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts);
    return getCommentsPromise(posts[0].id);
  })
  .then(comments => {
    console.log('Comments:', comments);
    return getLikesPromise(comments[0].id);
  })
  .then(likes => {
    console.log('Likes:', likes);
  })
  .catch(err => console.error(err));

// 3. Using Async/Await
async function getData() {
  try {
    const user = await getUserPromise(1);
    console.log('User:', user);
    
    const posts = await getPostsPromise(user.id);
    console.log('Posts:', posts);
    
    const comments = await getCommentsPromise(posts[0].id);
    console.log('Comments:', comments);
    
    const likes = await getLikesPromise(comments[0].id);
    console.log('Likes:', likes);
  } catch (err) {
    console.error(err);
  }
}

// 4. Using async library (for Node.js)
async.waterfall([
  function(callback) {
    getUser(1, callback);
  },
  function(user, callback) {
    getPosts(user.id, callback);
  },
  function(posts, callback) {
    getComments(posts[0].id, callback);
  },
  function(comments, callback) {
    getLikes(comments[0].id, callback);
  }
], function(err, likes) {
  if (err) return console.error(err);
  console.log('Likes:', likes);
});`}
          language="javascript"
          title="callback-hell-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Solutions Comparison">
          <TableComponent
            headers={['Solution', 'Readability', 'Error Handling', 'Learning Curve']}
            rows={[
              ['Named Functions', '📖 Good', '👍 Good', '🟢 Easy'],
              ['Promises', '📖 Great', '👍 Excellent', '🟡 Medium'],
              ['Async/Await', '📖 Excellent', '👍 Excellent', '🟡 Medium'],
              ['Async Library', '📖 Good', '👍 Good', '🟢 Easy'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Always prefer <Bold>Promises</Bold> or <Bold>Async/Await</Bold> over nested callbacks. They make your code <Bold>cleaner</Bold> and <Bold>more maintainable</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Patterns to Avoid Callback Hell
        </Title>

        <PlainText>
          Expert-level patterns for avoiding callback hell:
        </PlainText>

        <CodeComponent
          code={`// 1. Pipeline pattern
class Pipeline {
  constructor() {
    this.steps = [];
  }
  
  add(step) {
    this.steps.push(step);
    return this;
  }
  
  execute(initial, callback) {
    let index = 0;
    let data = initial;
    
    function next(err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      
      if (index < Pipeline.steps.length) {
        const step = Pipeline.steps[index++];
        data = result || data;
        step(data, next);
      } else {
        callback(null, data);
      }
    }
    
    next(null, initial);
  }
}

// 2. Composition pattern
function compose(...fns) {
  return function(data, callback) {
    let index = fns.length - 1;
    
    function next(err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      
      if (index >= 0) {
        const fn = fns[index--];
        fn(result, next);
      } else {
        callback(null, result);
      }
    }
    
    fns[index](data, next);
  };
}

// 3. Event-based pattern
const EventEmitter = {
  events: {},
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  
  emit(event, data) {
    const callbacks = this.events[event];
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
};

// 4. State machine pattern
class StateMachine {
  constructor() {
    this.states = {};
    this.currentState = null;
  }
  
  addState(name, handler) {
    this.states[name] = handler;
    return this;
  }
  
  start(initialState, data) {
    this.currentState = initialState;
    this.process(data);
  }
  
  process(data) {
    const handler = this.states[this.currentState];
    if (handler) {
      const result = handler(data, (nextState, result) => {
        this.currentState = nextState;
        this.process(result);
      });
    }
  }
}

// Usage
const workflow = new StateMachine()
  .addState('start', (data, next) => {
    console.log('Starting...');
    next('process', data);
  })
  .addState('process', (data, next) => {
    console.log('Processing:', data);
    const result = data + 1;
    next('end', result);
  })
  .addState('end', (data, next) => {
    console.log('Ending with:', data);
    next(null, data);
  });

workflow.start('start', 0);

// 5. Queue pattern
class TaskQueue {
  constructor() {
    this.tasks = [];
    this.isRunning = false;
  }
  
  add(task) {
    this.tasks.push(task);
    this.run();
  }
  
  run() {
    if (this.isRunning || this.tasks.length === 0) return;
    
    this.isRunning = true;
    const task = this.tasks.shift();
    
    task((err, result) => {
      this.isRunning = false;
      if (err) {
        console.error('Task failed:', err);
      }
      this.run();
    });
  }
}`}
          language="javascript"
          title="callback-hell-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Best Practices">
          <PlainText component="div">
            • <Bold>Use named functions</Bold> instead of anonymous callbacks<br />
            • <Bold>Prefer Promises</Bold> for async operations<br />
            • <Bold>Use Async/Await</Bold> for cleaner syntax<br />
            • <Bold>Modularize</Bold> your code into smaller functions<br />
            • <Bold>Use error-first</Bold> callback pattern<br />
            • <Bold>Consider event-based</Bold> architectures<br />
            • <Bold>Use queue patterns</Bold> for complex workflows
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Callback hell is a <Bold>design problem</Bold>, not a language problem. Modern JavaScript provides <Bold>multiple solutions</Bold> to avoid it. Choose the right pattern for your use case to write <Bold>clean, maintainable code</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Callback hell is <Bold>avoidable</Bold>. Use <Bold>Promises</Bold>, <Bold>Async/Await</Bold>, or <Bold>design patterns</Bold> to write <Bold>clean, readable asynchronous code</Bold>.
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
            <>Callback hell is <Bold>deeply nested callbacks</Bold> creating a pyramid shape</>,
            <>Makes code <Bold>hard to read</Bold>, <Bold>debug</Bold>, and <Bold>maintain</Bold></>,
            <>Caused by <Bold>sequential async operations</Bold> depending on each other</>,
            <>Solutions: <Bold>Named functions</Bold>, <Bold>Promises</Bold>, <Bold>Async/Await</Bold></>,
            <>Also solved with <Bold>design patterns</Bold> (pipeline, state machine, queue)</>,
            <>Modern JavaScript <Bold>avoids callback hell</Bold> with promises and async/await</>,
            <>Understanding callback hell <Bold>helps appreciate</Bold> modern patterns</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> If you find yourself writing nested callbacks, <Bold>stop and refactor</Bold>. Use <Bold>Promises</Bold> or <Bold>Async/Await</Bold> for cleaner, more maintainable code.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Callback hell is <Bold>not inevitable</Bold>. Modern JavaScript provides <Bold>elegant solutions</Bold> to write clean async code!
      </Note>
    </QuestionWrapper>
  );
}