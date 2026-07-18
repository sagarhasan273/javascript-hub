// data/questions/Question50.tsx
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
import { question50Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question50({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question50Meta.id}
      title={question50Meta.title}
      definition={question50Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Checking browser support for <Bold>Web Workers</Bold> is important because not all browsers support them, and they can be <Bold>disabled</Bold> in some environments. A simple check can help you provide <Bold>fallbacks</Bold> for unsupported browsers.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Checking Web Worker Support
        </Title>

        <PlainText>
          Think of checking web worker support like <Bold>checking if you have a helper available</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🧑‍🔧 Analogy">
          <PlainText>
            Imagine you have a helper (worker) who can do tasks in the background while you focus on other things. Before assigning tasks, you check if the helper is available. If not, you do the tasks yourself. That's exactly how web worker support checks work!
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Support Check:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Simple check for Web Worker support
function isWebWorkerSupported() {
  return typeof Worker !== 'undefined';
}

// 2. Check and use with fallback
if (isWebWorkerSupported()) {
  // Use Web Worker
  const worker = new Worker('worker.js');
  worker.postMessage('Hello Worker!');
  worker.onmessage = function(e) {
    console.log('Message from worker:', e.data);
  };
} else {
  // Fallback - run on main thread
  console.warn('Web Workers not supported, using main thread');
  doHeavyWork();
}

// 3. Check for specific worker features
function checkWorkerFeatures() {
  const features = {
    worker: typeof Worker !== 'undefined',
    sharedWorker: typeof SharedWorker !== 'undefined',
    serviceWorker: 'serviceWorker' in navigator
  };
  
  console.log('Worker features:', features);
  return features;
}

// 4. Create worker with fallback
function createWorkerWithFallback(workerScript) {
  if (typeof Worker !== 'undefined') {
    try {
      return new Worker(workerScript);
    } catch (e) {
      console.warn('Failed to create worker:', e);
      return null;
    }
  }
  return null;
}`}
          language="javascript"
          title="worker-support-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Always check for <InlineCode>typeof Worker !== 'undefined'</InlineCode> before creating a worker.
        </Note>

        <CardComponent variant="success" title="✅ Support Check Methods">
          <PlainText component="div">
            • <Bold>typeof check:</Bold> <InlineCode>typeof Worker !== 'undefined'</InlineCode><br />
            • <Bold>try-catch:</Bold> Attempt to create a worker<br />
            • <Bold>Feature detection:</Bold> Check for specific worker types<br />
            • <Bold>Blob URL check:</Bold> Check if blob URLs work with workers<br />
            • <Bold>Error handling:</Bold> Catch worker creation errors
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
          Advanced: Comprehensive Worker Support
        </Title>

        <PlainText>
          Advanced worker support checking:
        </PlainText>

        <CodeComponent
          code={`// 1. Complete worker support check
function checkWorkerSupport() {
  const support = {
    worker: false,
    sharedWorker: false,
    serviceWorker: false,
    blobWorker: false,
    workerModules: false
  };
  
  // Check standard workers
  support.worker = typeof Worker !== 'undefined';
  
  // Check shared workers
  support.sharedWorker = typeof SharedWorker !== 'undefined';
  
  // Check service workers
  support.serviceWorker = 'serviceWorker' in navigator;
  
  // Check blob URL workers
  try {
    const blob = new Blob(['console.log("test")'], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    worker.terminate();
    support.blobWorker = true;
  } catch (e) {
    support.blobWorker = false;
  }
  
  // Check worker modules (ES modules in workers)
  try {
    const blob = new Blob(['console.log("test")'], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url, { type: 'module' });
    worker.terminate();
    support.workerModules = true;
  } catch (e) {
    support.workerModules = false;
  }
  
  return support;
}

// 2. Worker with error handling
function createSafeWorker(workerUrl) {
  if (typeof Worker === 'undefined') {
    console.warn('Web Workers not supported');
    return null;
  }
  
  try {
    const worker = new Worker(workerUrl);
    
    // Handle worker errors
    worker.onerror = function(error) {
      console.error('Worker error:', error);
      // Notify user or fallback
    };
    
    return worker;
  } catch (error) {
    console.error('Failed to create worker:', error);
    return null;
  }
}

// 3. Feature detection with polyfill
class WorkerPolyfill {
  constructor(script) {
    this.script = script;
    this.listeners = new Map();
    this.runInMainThread();
  }
  
  runInMainThread() {
    // Execute worker script in main thread
    console.warn('Using worker polyfill (main thread)');
    // Execute the worker logic
    const fn = new Function('self', this.script);
    fn(this);
  }
  
  postMessage(data) {
    // Simulate worker message
    setTimeout(() => {
      this.dispatchEvent('message', { data });
    }, 10);
  }
  
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(callback);
  }
  
  dispatchEvent(type, event) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }
  }
  
  terminate() {
    // Clean up
    this.listeners.clear();
  }
}

// 4. Browser-specific worker support
function getWorkerSupportDetails() {
  const support = {
    isSupported: typeof Worker !== 'undefined',
    isSecure: window.isSecureContext,
    isLocal: window.location.protocol === 'file:',
    browser: navigator.userAgent
  };
  
  // Check for known issues
  if (navigator.userAgent.indexOf('Safari') !== -1) {
    support.knownIssues = ['Safari may restrict workers in private mode'];
  }
  
  if (navigator.userAgent.indexOf('Firefox') !== -1) {
    support.knownIssues = ['Firefox requires workers to be same-origin'];
  }
  
  return support;
}

// 5. Worker support with timeout
function checkWorkerWithTimeout() {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({ supported: false, reason: 'timeout' });
    }, 1000);
    
    try {
      const blob = new Blob(['postMessage("test")'], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);
      
      worker.onmessage = function() {
        clearTimeout(timeout);
        worker.terminate();
        resolve({ supported: true });
      };
      
      worker.postMessage('ping');
    } catch (error) {
      clearTimeout(timeout);
      resolve({ supported: false, reason: error.message });
    }
  });
}`}
          language="javascript"
          title="worker-support-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Browser Support Table">
          <TableComponent
            headers={['Browser', 'Web Workers', 'Shared Workers', 'Service Workers']}
            rows={[
              ['Chrome 4+', '✅ Yes', '✅ Yes', '✅ Yes'],
              ['Firefox 3.5+', '✅ Yes', '✅ Yes', '✅ Yes'],
              ['Safari 4+', '✅ Yes', '❌ No', '✅ Yes (11.1+)'],
              ['Edge', '✅ Yes', '✅ Yes', '✅ Yes'],
              ['IE 10+', '✅ Yes', '❌ No', '❌ No'],
              ['Opera 10.5+', '✅ Yes', '✅ Yes', '✅ Yes'],
              ['Mobile Safari', '✅ Yes', '❌ No', '✅ Yes'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Web Workers <Bold>require a secure context</Bold> (HTTPS or localhost) in some browsers. Shared Workers have <Bold>limited support</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Worker Support Patterns
        </Title>

        <PlainText>
          Expert-level worker support patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Progressive worker enhancement
class ProgressiveWorker {
  constructor() {
    this.worker = null;
    this.isSupported = this.checkSupport();
    this.fallbackQueue = [];
    
    if (this.isSupported) {
      this.initWorker();
    }
  }
  
  checkSupport() {
    try {
      return typeof Worker !== 'undefined';
    } catch {
      return false;
    }
  }
  
  initWorker() {
    try {
      this.worker = new Worker('worker.js');
      this.worker.onmessage = (e) => this.handleMessage(e);
      this.worker.onerror = (e) => this.handleError(e);
      this.processQueue();
    } catch (error) {
      this.isSupported = false;
      this.fallbackToMainThread(error);
    }
  }
  
  handleMessage(event) {
    // Process worker messages
  }
  
  handleError(error) {
    console.error('Worker error:', error);
    this.isSupported = false;
    this.fallbackToMainThread(error);
  }
  
  fallbackToMainThread(error) {
    console.warn('Falling back to main thread:', error);
    // Execute tasks on main thread
  }
  
  processQueue() {
    while (this.fallbackQueue.length > 0) {
      const task = this.fallbackQueue.shift();
      this.executeTask(task);
    }
  }
  
  executeTask(task) {
    if (this.isSupported && this.worker) {
      this.worker.postMessage(task);
    } else {
      // Execute on main thread
      this.executeOnMainThread(task);
    }
  }
}

// 2. Worker support with fallback strategies
class WorkerStrategy {
  constructor() {
    this.strategies = [
      this.tryNativeWorker,
      this.tryBlobWorker,
      this.tryInlineWorker,
      this.tryMainThread
    ];
    this.currentStrategy = 0;
  }
  
  tryNativeWorker(script) {
    try {
      const worker = new Worker(script);
      return { success: true, worker };
    } catch {
      return { success: false };
    }
  }
  
  tryBlobWorker(script) {
    try {
      const blob = new Blob([script], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);
      return { success: true, worker };
    } catch {
      return { success: false };
    }
  }
  
  tryInlineWorker(script) {
    try {
      const blob = new Blob([script], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      return { success: true, url };
    } catch {
      return { success: false };
    }
  }
  
  tryMainThread(script) {
    return { success: true, fallback: true };
  }
  
  createWorker(script) {
    for (const strategy of this.strategies) {
      const result = strategy.call(this, script);
      if (result.success) {
        return result;
      }
    }
    return { success: false };
  }
}

// 3. Worker feature detection
class WorkerFeatureDetector {
  constructor() {
    this.features = this.detectAll();
  }
  
  detectAll() {
    return {
      workers: this.detectWorkers(),
      sharedWorkers: this.detectSharedWorkers(),
      serviceWorkers: this.detectServiceWorkers(),
      workerModules: this.detectWorkerModules(),
      blobURLs: this.detectBlobURLs()
    };
  }
  
  detectWorkers() {
    try {
      return typeof Worker !== 'undefined';
    } catch {
      return false;
    }
  }
  
  detectSharedWorkers() {
    try {
      return typeof SharedWorker !== 'undefined';
    } catch {
      return false;
    }
  }
  
  detectServiceWorkers() {
    try {
      return 'serviceWorker' in navigator;
    } catch {
      return false;
    }
  }
  
  detectWorkerModules() {
    try {
      const blob = new Blob(['console.log("test")'], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url, { type: 'module' });
      worker.terminate();
      return true;
    } catch {
      return false;
    }
  }
  
  detectBlobURLs() {
    try {
      const blob = new Blob([''], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      return url.startsWith('blob:');
    } catch {
      return false;
    }
  }
  
  getSupportedFeatures() {
    return Object.entries(this.features)
      .filter(([_, supported]) => supported)
      .map(([name]) => name);
  }
}

// 4. Worker support with error recovery
class ResilientWorker {
  constructor(script) {
    this.script = script;
    this.worker = null;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.init();
  }
  
  init() {
    try {
      this.worker = this.createWorker();
      this.retryCount = 0;
    } catch (error) {
      this.handleFailure(error);
    }
  }
  
  createWorker() {
    return new Worker(this.script);
  }
  
  handleFailure(error) {
    console.error('Worker creation failed:', error);
    
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(\`Retrying (attempt \${this.retryCount})\`);
      setTimeout(() => this.init(), 1000 * this.retryCount);
    } else {
      console.error('All worker creation attempts failed');
      this.fallbackToMainThread();
    }
  }
  
  fallbackToMainThread() {
    // Execute worker logic on main thread
  }
  
  postMessage(data) {
    if (this.worker) {
      this.worker.postMessage(data);
    } else {
      this.handleMainThreadMessage(data);
    }
  }
  
  handleMainThreadMessage(data) {
    // Process on main thread
  }
}

// 5. Worker support monitoring
function monitorWorkerSupport() {
  const stats = {
    supported: typeof Worker !== 'undefined',
    attempts: 0,
    failures: 0,
    lastCheck: null
  };
  
  function checkSupport() {
    stats.attempts++;
    stats.lastCheck = new Date();
    
    try {
      const blob = new Blob(['postMessage("test")'], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const worker = new Worker(url);
      worker.terminate();
      stats.supported = true;
      return true;
    } catch {
      stats.supported = false;
      stats.failures++;
      return false;
    }
  }
  
  checkSupport();
  return stats;
}`}
          language="javascript"
          title="worker-support-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Security Considerations">
          <PlainText component="div">
            • <Bold>Secure Context:</Bold> Workers require HTTPS or localhost<br />
            • <Bold>Same-Origin Policy:</Bold> Worker scripts must be same-origin<br />
            • <Bold>CORS:</Bold> Cross-origin workers require CORS headers<br />
            • <Bold>Content Security Policy:</Bold> CSP can block workers<br />
            • <Bold>Private Mode:</Bold> Some browsers restrict workers in private mode
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Web Workers are <Bold>widely supported</Bold> in modern browsers, but <Bold>always check support</Bold> before using them. Provide <Bold>fallbacks</Bold> for unsupported browsers and <Bold>handle errors</Bold> gracefully.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Always check web worker support <Bold>before creating workers</Bold>. Use <Bold>try-catch</Bold> for error handling and provide <Bold>graceful fallbacks</Bold> for unsupported environments.
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
            <>Use <Bold>typeof Worker !== 'undefined'</Bold> to check support</>,
            <>Always use <Bold>try-catch</Bold> when creating workers</>,
            <>Check for <Bold>Shared Workers</Bold> and <Bold>Service Workers</Bold> separately</>,
            <>Provide <Bold>fallbacks</Bold> for unsupported browsers</>,
            <>Consider <Bold>secure context</Bold> requirements (HTTPS/localhost)</>,
            <>Test <Bold>error handling</Bold> for worker failures</>,
            <>Modern browsers <Bold>widely support</Bold> Web Workers</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use a <Bold>worker wrapper</Bold> that handles support checking, error handling, and fallbacks automatically. This makes your code <Bold>cleaner</Bold> and <Bold>more robust</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Checking browser support for web workers is <Bold>essential</Bold> for building reliable applications. Always <Bold>check, handle errors, and provide fallbacks</Bold>!
      </Note>
    </QuestionWrapper>
  );
}