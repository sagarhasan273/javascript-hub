// data/questions/Question52.tsx
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
import { question52Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question52({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question52Meta.id}
      title={question52Meta.title}
      definition={question52Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Web Workers have <Bold>strict restrictions</Bold> on DOM access because they run in a <Bold>separate thread</Bold> from the main UI thread. They <Bold>cannot directly interact</Bold> with the DOM, window, or document objects.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: DOM Restrictions
        </Title>

        <PlainText>
          Think of DOM restrictions like a <Bold>locked room</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🚪 Analogy">
          <PlainText>
            Imagine the DOM is a room with all the furniture (elements). The main thread is in the room and can rearrange everything. The worker is in another room and can't see or touch anything in the DOM room. They can only send messages through the wall (postMessage).
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>What Workers CANNOT Do:</Bold>
        </PlainText>

        <CodeComponent
          code={`// -------- THIS WILL NOT WORK IN A WORKER --------
// ❌ Cannot access DOM elements
const element = document.getElementById('myElement');
const divs = document.querySelectorAll('.my-class');

// ❌ Cannot modify DOM
document.body.innerHTML = '<h1>Hello</h1>';
element.style.color = 'red';

// ❌ Cannot access window properties
console.log(window.innerWidth);
console.log(window.location.href);

// ❌ Cannot create DOM elements
const newDiv = document.createElement('div');

// ❌ Cannot access document
console.log(document.title);
console.log(document.cookie);

// ❌ Cannot use methods that depend on DOM
element.addEventListener('click', function() {});

// ✅ WHAT WORKERS CAN DO:
// - Perform heavy computations
// - Process data
// - Fetch data (using fetch API)
// - Use setTimeout, setInterval
// - Use WebSocket
// - Use IndexedDB
// - Use XMLHttpRequest`}
          language="javascript"
          title="worker-dom-restrictions-basics.js"
          defaultOpen={true}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Workers <Bold>cannot access</Bold> the DOM, <Bold>window</Bold>, or <Bold>document</Bold> objects. They are isolated from the main thread.
        </Note>

        <CardComponent variant="success" title="✅ What Workers CAN Access">
          <PlainText component="div">
            • <Bold>self</Bold> (worker context)<br />
            • <Bold>postMessage()</Bold> and <Bold>onmessage</Bold><br />
            • <Bold>fetch()</Bold> API<br />
            • <Bold>setTimeout</Bold> and <Bold>setInterval</Bold><br />
            • <Bold>IndexedDB</Bold><br />
            • <Bold>WebSocket</Bold><br />
            • <Bold>XMLHttpRequest</Bold><br />
            • <Bold>console</Bold> (for debugging)<br />
            • <Bold>importScripts()</Bold>
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
          Advanced: Working Around DOM Restrictions
        </Title>

        <PlainText>
          How to work around DOM restrictions using message passing:
        </PlainText>

        <CodeComponent
          code={`// -------- MAIN THREAD --------
// 1. Create worker
const worker = new Worker('worker.js');

// 2. Listen for DOM update requests from worker
worker.onmessage = function(event) {
  const { type, data } = event.data;
  
  switch(type) {
    case 'UPDATE_TEXT':
      document.getElementById(data.id).textContent = data.text;
      break;
    case 'UPDATE_STYLE':
      const element = document.getElementById(data.id);
      if (element) {
        element.style[data.property] = data.value;
      }
      break;
    case 'CREATE_ELEMENT':
      createDOMElement(data);
      break;
    case 'FETCH_DATA':
      // Worker can fetch data directly
      // Or main thread can fetch and send back
      break;
  }
};

// 3. Function to create DOM elements based on worker request
function createDOMElement(data) {
  const element = document.createElement(data.tag);
  element.textContent = data.content;
  element.id = data.id;
  document.body.appendChild(element);
}

// -------- WORKER THREAD --------
// Worker requests DOM updates
self.postMessage({
  type: 'UPDATE_TEXT',
  data: {
    id: 'myElement',
    text: 'Updated from worker!'
  }
});

// Worker can request style changes
self.postMessage({
  type: 'UPDATE_STYLE',
  data: {
    id: 'myElement',
    property: 'color',
    value: 'red'
  }
});

// Worker can request element creation
self.postMessage({
  type: 'CREATE_ELEMENT',
  data: {
    tag: 'div',
    id: 'newElement',
    content: 'Created by worker'
  }
});`}
          language="javascript"
          title="worker-dom-restrictions-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Communication Pattern">
          <PlainText component="div">
            • <Bold>Worker → Main:</Bold> Send DOM update requests via <InlineCode>postMessage</InlineCode><br />
            • <Bold>Main → Worker:</Bold> Send data for processing<br />
            • <Bold>Main Thread:</Bold> Updates DOM based on worker messages<br />
            • <Bold>Benefits:</Bold> Keeps DOM manipulation on main thread<br />
            • <Bold>Trade-off:</Bold> Slight latency due to message passing
          </PlainText>
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Use <Bold>message passing</Bold> to let workers <Bold>request</Bold> DOM updates. The main thread should be the <Bold>only place</Bold> that manipulates the DOM.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced DOM Communication
        </Title>

        <PlainText>
          Expert-level patterns for DOM communication with workers:
        </PlainText>

        <CodeComponent
          code={`// 1. DOM update queue from worker
class DOMUpdateQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }
  
  addUpdate(update) {
    this.queue.push(update);
    if (!this.isProcessing) {
      this.processQueue();
    }
  }
  
  async processQueue() {
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const update = this.queue.shift();
      await this.applyUpdate(update);
    }
    
    this.isProcessing = false;
  }
  
  applyUpdate(update) {
    return new Promise((resolve) => {
      const { type, target, data } = update;
      
      switch(type) {
        case 'text':
          document.getElementById(target).textContent = data;
          break;
        case 'html':
          document.getElementById(target).innerHTML = data;
          break;
        case 'style':
          const el = document.getElementById(target);
          Object.entries(data).forEach(([prop, value]) => {
            el.style[prop] = value;
          });
          break;
        case 'class':
          document.getElementById(target).className = data;
          break;
      }
      
      setTimeout(resolve, 16); // RequestAnimationFrame timing
    });
  }
}

// 2. Worker DOM service
class WorkerDOMService {
  constructor() {
    this.worker = null;
    this.updateQueue = new DOMUpdateQueue();
    this.init();
  }
  
  init() {
    this.worker = new Worker('dom-worker.js');
    this.worker.onmessage = (event) => {
      const { type, payload } = event.data;
      
      if (type === 'DOM_UPDATE') {
        this.updateQueue.addUpdate(payload);
      }
    };
  }
  
  sendToWorker(data) {
    this.worker.postMessage(data);
  }
  
  terminate() {
    if (this.worker) {
      this.worker.terminate();
    }
  }
}

// 3. Worker with virtual DOM updates
// The worker computes the difference and sends only the changes
class VirtualDOMWorker {
  constructor() {
    this.worker = new Worker('vdom-worker.js');
    this.currentState = {};
    this.setupListener();
  }
  
  setupListener() {
    this.worker.onmessage = (event) => {
      const { type, patches } = event.data;
      
      if (type === 'DOM_PATCH') {
        this.applyPatches(patches);
      }
    };
  }
  
  applyPatches(patches) {
    patches.forEach(patch => {
      const element = document.getElementById(patch.id);
      if (element) {
        if (patch.type === 'text') {
          element.textContent = patch.value;
        } else if (patch.type === 'attribute') {
          element.setAttribute(patch.attribute, patch.value);
        } else if (patch.type === 'style') {
          element.style[patch.property] = patch.value;
        }
      }
    });
  }
  
  updateState(newState) {
    this.currentState = newState;
    this.worker.postMessage({
      type: 'COMPUTE_DIFF',
      oldState: this.currentState,
      newState: newState
    });
  }
}

// 4. Safe DOM access through proxy
class DOMProxy {
  constructor(worker) {
    this.worker = worker;
    this.pendingRequests = new Map();
    this.requestId = 0;
    this.setupListener();
  }
  
  setupListener() {
    this.worker.onmessage = (event) => {
      const { id, result, error } = event.data;
      const pending = this.pendingRequests.get(id);
      
      if (pending) {
        if (error) {
          pending.reject(error);
        } else {
          pending.resolve(result);
        }
        this.pendingRequests.delete(id);
      }
    };
  }
  
  // Request DOM information from main thread
  getElementInfo(id) {
    return new Promise((resolve, reject) => {
      const requestId = this.requestId++;
      this.pendingRequests.set(requestId, { resolve, reject });
      
      this.worker.postMessage({
        type: 'GET_ELEMENT_INFO',
        id,
        requestId
      });
    });
  }
  
  // Request DOM update
  updateElement(id, updates) {
    const requestId = this.requestId++;
    
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(requestId, { resolve, reject });
      
      this.worker.postMessage({
        type: 'UPDATE_ELEMENT',
        id,
        updates,
        requestId
      });
    });
  }
}

// -------- MAIN THREAD HANDLER --------
// Handle DOM requests from worker
function setupDOMHandler() {
  const worker = new Worker('worker.js');
  
  worker.onmessage = (event) => {
    const { type, id, requestId, updates } = event.data;
    
    if (type === 'GET_ELEMENT_INFO') {
      const element = document.getElementById(id);
      const info = {
        text: element ? element.textContent : null,
        styles: element ? window.getComputedStyle(element) : null,
        attributes: element ? [...element.attributes].reduce((acc, attr) => {
          acc[attr.name] = attr.value;
          return acc;
        }, {}) : null
      };
      
      worker.postMessage({
        type: 'ELEMENT_INFO',
        requestId,
        info
      });
    }
    
    if (type === 'UPDATE_ELEMENT') {
      const element = document.getElementById(id);
      if (element) {
        Object.entries(updates).forEach(([key, value]) => {
          if (key === 'text') {
            element.textContent = value;
          } else if (key === 'className') {
            element.className = value;
          } else if (key === 'style') {
            Object.entries(value).forEach(([prop, val]) => {
              element.style[prop] = val;
            });
          }
        });
      }
      
      worker.postMessage({
        type: 'UPDATE_COMPLETE',
        requestId
      });
    }
  };
}`}
          language="javascript"
          title="worker-dom-restrictions-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 DOM Access Restrictions Summary">
          <PlainText component="div">
            • <Bold>No Direct DOM Access:</Bold> Workers cannot touch the DOM<br />
            • <Bold>No Window/Document:</Bold> Cannot access window or document<br />
            • <Bold>No Events:</Bold> Cannot add event listeners<br />
            • <Bold>Message Passing:</Bold> Use postMessage for DOM updates<br />
            • <Bold>Main Thread:</Bold> All DOM manipulation must happen here<br />
            • <Bold>Performance:</Bold> Minimize message passing overhead
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The DOM restriction is a <Bold>feature, not a bug</Bold>. It prevents <Bold>race conditions</Bold> and <Bold>thread safety issues</Bold>. Use <Bold>message passing</Bold> to coordinate DOM updates from workers, keeping all DOM manipulation on the <Bold>main thread</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Web Workers <Bold>cannot access the DOM</Bold> - this is by design. Use <Bold>postMessage</Bold> to communicate DOM updates from workers to the main thread, where all DOM manipulation should happen.
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
            <>Workers <Bold>cannot access</Bold> the DOM, window, or document</>,
            <>This is by design to <Bold>prevent race conditions</Bold></>,
            <>Workers communicate with the main thread via <Bold>postMessage</Bold></>,
            <>All DOM manipulation must happen on the <Bold>main thread</Bold></>,
            <>Workers can <Bold>request</Bold> DOM updates via messages</>,
            <>Use <Bold>message passing</Bold> for all DOM interactions</>,
            <>This pattern ensures <Bold>thread safety</Bold> and <Bold>performance</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Design your worker <Bold>message protocol</Bold> to clearly define DOM operations. Use <Bold>typed messages</Bold> and <Bold>request-response patterns</Bold> for reliable DOM updates.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Workers can't touch the DOM, but they can <Bold>communicate</Bold> with the main thread to request DOM updates. This <Bold>separation</Bold> is what makes workers safe and performant!
      </Note>
    </QuestionWrapper>
  );
}