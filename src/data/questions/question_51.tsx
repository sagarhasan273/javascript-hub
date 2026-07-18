// data/questions/Question51.tsx
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
} from "../../components/content";
import { question51Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question51({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question51Meta.id}
      title={question51Meta.title}
      definition={question51Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>Web Worker</Bold> is a script that runs in the <Bold>background</Bold> on a separate thread, allowing you to perform <Bold>heavy computations</Bold> without blocking the main UI thread. Here's a complete example of using a web worker.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Simple Web Worker Example
        </Title>

        <PlainText>
          Think of a web worker like a <Bold>helper who works in the background</Bold> while you focus on other tasks:
        </PlainText>

        <CardComponent variant="info" title="🧑‍🔧 Analogy">
          <PlainText>
            Imagine you're cooking (main thread) and need to chop vegetables (heavy task). Instead of stopping all cooking, you ask a helper (worker) to chop vegetables in the kitchen (background thread). You continue cooking, and when the helper is done, they bring you the chopped vegetables (result).
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Complete Web Worker Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// -------- MAIN THREAD (main.js) --------
// 1. Check if browser supports workers
if (typeof Worker !== 'undefined') {
  // 2. Create a new worker
  const worker = new Worker('worker.js');
  
  // 3. Send data to worker
  worker.postMessage({ numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] });
  
  // 4. Listen for messages from worker
  worker.onmessage = function(event) {
    console.log('Result from worker:', event.data);
    document.getElementById('result').textContent = event.data;
  };
  
  // 5. Handle worker errors
  worker.onerror = function(error) {
    console.error('Worker error:', error);
  };
  
  // 6. Terminate worker when done
  // worker.terminate();
} else {
  console.log('Web Workers not supported');
}

// -------- WORKER THREAD (worker.js) --------
// 1. Listen for messages from main thread
self.onmessage = function(event) {
  const numbers = event.data.numbers;
  
  // 2. Perform heavy computation
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  
  // 3. Send result back to main thread
  self.postMessage(sum);
};

// Alternative: Using addEventListener
self.addEventListener('message', function(event) {
  const numbers = event.data.numbers;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  self.postMessage(sum);
});`}
          language="javascript"
          title="worker-example-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Workers communicate with the main thread using <InlineCode>postMessage()</InlineCode> and the <InlineCode>onmessage</InlineCode> event handler.
        </Note>

        <CardComponent variant="success" title="✅ Worker Communication Flow">
          <PlainText component="div">
            • <Bold>Main → Worker:</Bold> <InlineCode>worker.postMessage(data)</InlineCode><br />
            • <Bold>Worker → Main:</Bold> <InlineCode>self.postMessage(data)</InlineCode><br />
            • <Bold>Listen:</Bold> <InlineCode>worker.onmessage = function(event) {}</InlineCode><br />
            • <Bold>Errors:</Bold> <InlineCode>worker.onerror = function(error) {}</InlineCode><br />
            • <Bold>Terminate:</Bold> <InlineCode>worker.terminate()</InlineCode>
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
          Advanced: Real-World Worker Example
        </Title>

        <PlainText>
          Advanced web worker example with data processing:
        </PlainText>

        <CodeComponent
          code={`// -------- MAIN THREAD --------
class DataProcessor {
  constructor() {
    this.worker = null;
    this.isProcessing = false;
    this.init();
  }
  
  init() {
    if (typeof Worker === 'undefined') {
      console.warn('Web Workers not supported');
      return;
    }
    
    this.worker = new Worker('data-worker.js');
    this.setupListeners();
  }
  
  setupListeners() {
    this.worker.onmessage = (event) => {
      const { type, data, progress } = event.data;
      
      switch(type) {
        case 'progress':
          this.updateProgress(progress);
          break;
        case 'result':
          this.handleResult(data);
          this.isProcessing = false;
          break;
        case 'error':
          this.handleError(data);
          this.isProcessing = false;
          break;
      }
    };
    
    this.worker.onerror = (error) => {
      console.error('Worker error:', error);
      this.isProcessing = false;
    };
  }
  
  processData(data) {
    if (this.isProcessing) {
      console.warn('Already processing');
      return;
    }
    
    this.isProcessing = true;
    this.worker.postMessage({
      type: 'process',
      data: data
    });
  }
  
  updateProgress(progress) {
    console.log(\`Progress: \${progress}%\`);
    // Update UI progress bar
  }
  
  handleResult(result) {
    console.log('Processing complete:', result);
    // Update UI with result
  }
  
  handleError(error) {
    console.error('Processing error:', error);
    // Show error to user
  }
  
  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

// -------- WORKER THREAD (data-worker.js) --------
self.addEventListener('message', function(event) {
  const { type, data } = event.data;
  
  if (type === 'process') {
    processLargeDataset(data);
  }
});

function processLargeDataset(data) {
  try {
    const total = data.length;
    let processed = 0;
    const results = [];
    
    for (let i = 0; i < total; i++) {
      // Simulate heavy processing
      const result = heavyCalculation(data[i]);
      results.push(result);
      
      processed++;
      // Send progress every 10%
      if (processed % Math.floor(total / 10) === 0) {
        const progress = Math.round((processed / total) * 100);
        self.postMessage({
          type: 'progress',
          progress: progress
        });
      }
    }
    
    self.postMessage({
      type: 'result',
      data: results
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      data: error.message
    });
  }
}

function heavyCalculation(value) {
  // Simulate heavy work
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(value * i);
  }
  return result;
}

// -------- USAGE --------
const processor = new DataProcessor();
processor.processData(largeArray);
// Later: processor.terminate();`}
          language="javascript"
          title="worker-example-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Worker Use Cases">
          <PlainText component="div">
            • <Bold>Data Processing:</Bold> Large datasets, sorting, filtering<br />
            • <Bold>Calculations:</Bold> Mathematical computations, simulations<br />
            • <Bold>File Processing:</Bold> Image manipulation, PDF generation<br />
            • <Bold>Machine Learning:</Bold> Inference, training (with libraries)<br />
            • <Bold>Real-time Data:</Bold> WebSocket processing, streaming<br />
            • <Bold>Encryption:</Bold> Hashing, encryption/decryption
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Web Workers <Bold>cannot access the DOM</Bold>. They communicate with the main thread through message passing.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Worker Patterns
        </Title>

        <PlainText>
          Expert-level web worker patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Worker pool for parallel processing
class WorkerPool {
  constructor(workerScript, poolSize = 4) {
    this.workerScript = workerScript;
    this.poolSize = poolSize;
    this.workers = [];
    this.tasks = [];
    this.activeWorkers = 0;
    this.init();
  }
  
  init() {
    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(this.workerScript);
      worker.isBusy = false;
      worker.id = i;
      
      worker.onmessage = (event) => {
        this.handleWorkerMessage(worker, event);
      };
      
      worker.onerror = (error) => {
        console.error(\`Worker \${worker.id} error:\`, error);
        this.handleWorkerError(worker);
      };
      
      this.workers.push(worker);
    }
  }
  
  handleWorkerMessage(worker, event) {
    worker.isBusy = false;
    
    if (this.tasks.length > 0) {
      const task = this.tasks.shift();
      this.executeTask(worker, task);
    }
  }
  
  handleWorkerError(worker) {
    // Replace failed worker
    const index = this.workers.indexOf(worker);
    if (index !== -1) {
      this.workers.splice(index, 1);
      const newWorker = new Worker(this.workerScript);
      newWorker.isBusy = false;
      newWorker.id = index;
      this.workers.push(newWorker);
    }
  }
  
  executeTask(worker, task) {
    worker.isBusy = true;
    worker.postMessage(task.data);
    task.resolve = task.resolve || (() => {});
    task.reject = task.reject || (() => {});
  }
  
  run(data) {
    return new Promise((resolve, reject) => {
      const availableWorker = this.workers.find(w => !w.isBusy);
      
      if (availableWorker) {
        this.executeTask(availableWorker, { data, resolve, reject });
      } else {
        this.tasks.push({ data, resolve, reject });
      }
    });
  }
  
  terminate() {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.tasks = [];
  }
}

// 2. Web worker with transferable objects
// Transferable objects are moved, not copied (better performance)
function transferData() {
  // Create a large array buffer
  const arrayBuffer = new ArrayBuffer(1024 * 1024 * 10); // 10MB
  const int32Array = new Int32Array(arrayBuffer);
  
  // Fill with data
  for (let i = 0; i < int32Array.length; i++) {
    int32Array[i] = i;
  }
  
  // Transfer ownership to worker (zero-copy)
  worker.postMessage({ buffer: arrayBuffer }, [arrayBuffer]);
  // The main thread can no longer access arrayBuffer
}

// 3. Worker with error recovery and retry
class ResilientWorker {
  constructor(script) {
    this.script = script;
    this.worker = null;
    this.maxRetries = 3;
    this.retryCount = 0;
    this.pendingMessages = [];
    this.init();
  }
  
  init() {
    try {
      this.worker = new Worker(this.script);
      this.setupListeners();
      this.retryCount = 0;
      this.processPending();
    } catch (error) {
      this.handleWorkerError(error);
    }
  }
  
  setupListeners() {
    this.worker.onmessage = (event) => {
      if (this._resolve) {
        this._resolve(event.data);
        this._resolve = null;
        this._reject = null;
      }
    };
    
    this.worker.onerror = (error) => {
      this.handleWorkerError(error);
    };
  }
  
  postMessage(data) {
    return new Promise((resolve, reject) => {
      if (this.worker) {
        this._resolve = resolve;
        this._reject = reject;
        this.worker.postMessage(data);
      } else {
        this.pendingMessages.push({ data, resolve, reject });
      }
    });
  }
  
  processPending() {
    while (this.pendingMessages.length > 0) {
      const { data, resolve, reject } = this.pendingMessages.shift();
      this._resolve = resolve;
      this._reject = reject;
      this.worker.postMessage(data);
    }
  }
  
  handleWorkerError(error) {
    console.error('Worker error:', error);
    
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      setTimeout(() => {
        this.worker = new Worker(this.script);
        this.setupListeners();
        this.processPending();
      }, 1000 * this.retryCount);
    } else {
      if (this._reject) {
        this._reject(error);
        this._resolve = null;
        this._reject = null;
      }
    }
  }
  
  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

// 4. Worker with shared memory (SharedArrayBuffer)
// Requires cross-origin isolation
function useSharedMemory() {
  const sharedBuffer = new SharedArrayBuffer(1024);
  const sharedArray = new Int32Array(sharedBuffer);
  
  // Worker can access the same memory
  worker.postMessage({ buffer: sharedBuffer });
}

// 5. Worker with dynamic import
// worker.js
self.onmessage = async function(event) {
  const { module, data } = event.data;
  
  try {
    const importedModule = await import(module);
    const result = importedModule.process(data);
    self.postMessage({ success: true, result });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
};`}
          language="javascript"
          title="worker-example-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Best Practices">
          <PlainText component="div">
            • <Bold>Transferable Objects:</Bold> Use for large data (zero-copy)<br />
            • <Bold>Worker Pool:</Bold> Reuse workers for multiple tasks<br />
            • <Bold>Error Handling:</Bold> Implement retry logic<br />
            • <Bold>Message Size:</Bold> Keep messages small<br />
            • <Bold>Terminate:</Bold> Clean up workers when done<br />
            • <Bold>Shared Memory:</Bold> Use SharedArrayBuffer for performance
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Web Workers enable <Bold>true parallel processing</Bold> in the browser. Use them for <Bold>CPU-intensive tasks</Bold> to keep your UI responsive. Advanced patterns like <Bold>worker pools</Bold> and <Bold>shared memory</Bold> can significantly improve performance.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Web Workers are a <Bold>powerful tool</Bold> for handling heavy computations without blocking the UI. Use them wisely with <Bold>proper error handling</Bold> and <Bold>performance optimizations</Bold>.
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
            <>Web Workers run on <Bold>separate threads</Bold> in the background</>,
            <>Communicate with workers via <Bold>postMessage</Bold> and <Bold>onmessage</Bold></>,
            <>Workers <Bold>cannot access the DOM</Bold></>,
            <>Use workers for <Bold>heavy computations</Bold> to keep UI responsive</>,
            <>Always <Bold>check browser support</Bold> before using workers</>,
            <>Use <Bold>transferable objects</Bold> for large data</>,
            <>Implement <Bold>error handling</Bold> and <Bold>retry logic</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use <Bold>worker pools</Bold> for multiple parallel tasks and <Bold>transferable objects</Bold> for large data to <Bold>maximize performance</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Web Workers are the <Bold>key to responsive, high-performance web applications</Bold>. Master them to create <Bold>smooth, professional user experiences</Bold>!
      </Note>
    </QuestionWrapper>
  );
}