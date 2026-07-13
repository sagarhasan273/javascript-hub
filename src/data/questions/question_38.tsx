// data/questions/Question38.tsx
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
import { question38Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question38({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question38Meta.id}
      title={question38Meta.title}
      definition={question38Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Post Message</Bold> (also known as <Bold>window.postMessage</Bold>) is a <Bold>secure API</Bold> that enables <Bold>cross-origin communication</Bold> between different browsing contexts, such as <Bold>windows</Bold>, <Bold>iframes</Bold>, <Bold>workers</Bold>, and <Bold>service workers</Bold>.
      </PlainText>

      <PlainText>
        It provides a <Bold>safe way</Bold> for scripts from different origins to communicate with each other, bypassing the <Bold>same-origin policy</Bold> that normally restricts such interactions.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is Post Message?
        </Title>

        <PlainText>
          Think of postMessage like <Bold>sending a letter</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📮 Analogy">
          <PlainText>
            Imagine you're in a building with different offices (browsing contexts). You can't walk into other offices (cross-origin restrictions), but you can send a letter (postMessage) through the mail system, addressed to a specific office, and that office can send a response back.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Post Message Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// -------- Sender (parent window) --------
// Send message to an iframe
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage({
  type: 'GREETING',
  payload: 'Hello from parent!'
}, 'https://example.com');

// -------- Receiver (iframe) --------
// Listen for messages
window.addEventListener('message', (event) => {
  // Verify the origin for security
  if (event.origin !== 'https://parent-domain.com') {
    return;
  }
  
  console.log('Received message:', event.data);
  
  // Send response back
  event.source.postMessage({
    type: 'RESPONSE',
    payload: 'Hello back from iframe!'
  }, event.origin);
});

// -------- Parent window listening for response --------
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://example.com') {
    return;
  }
  
  console.log('Response from iframe:', event.data);
});`}
          language="javascript"
          title="postmessage-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Always <Bold>verify the origin</Bold> of incoming messages to prevent security issues.
        </Note>

        <CardComponent variant="success" title="✅ Use Cases">
          <PlainText component="div">
            • 🔄 <Bold>Cross-Origin Communication:</Bold> Between different domains<br />
            • 🖼️ <Bold>Iframe Communication:</Bold> Parent ↔ Iframe<br />
            • 👷 <Bold>Worker Communication:</Bold> Main thread ↔ Worker<br />
            • 📱 <Bold>WebView Communication:</Bold> Native apps ↔ Web content<br />
            • 🔐 <Bold>Secure Messaging:</Bold> With origin verification
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
          Advanced: Post Message Patterns
        </Title>

        <PlainText>
          Advanced postMessage patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Two-way communication with MessageChannel
function setupCommunication() {
  const channel = new MessageChannel();
  const port1 = channel.port1;
  const port2 = channel.port2;
  
  // Send port2 to the iframe
  iframe.contentWindow.postMessage('init', '*', [port2]);
  
  // Use port1 to communicate
  port1.onmessage = (event) => {
    console.log('Received via port:', event.data);
    port1.postMessage('Response from main');
  };
  
  // Send message via port
  port1.postMessage('Hello from main!');
}

// 2. Promise-based messaging
function postMessageWithResponse(target, message, origin = '*') {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const port = channel.port1;
    
    port.onmessage = (event) => {
      resolve(event.data);
      port.close();
    };
    
    // Timeout after 5 seconds
    const timeoutId = setTimeout(() => {
      port.close();
      reject(new Error('Message timeout'));
    }, 5000);
    
    port.onmessage = (event) => {
      clearTimeout(timeoutId);
      resolve(event.data);
    };
    
    target.postMessage(message, origin, [channel.port2]);
  });
}

// 3. Message bus pattern
class MessageBus {
  constructor() {
    this.listeners = new Map();
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('message', (event) => {
      // Verify origin
      if (!this.isValidOrigin(event.origin)) {
        return;
      }
      
      const { type, payload } = event.data;
      const handlers = this.listeners.get(type);
      if (handlers) {
        handlers.forEach(handler => handler(payload, event));
      }
    });
  }
  
  isValidOrigin(origin) {
    const allowedOrigins = [
      'https://example.com',
      'https://sub.example.com'
    ];
    return allowedOrigins.includes(origin);
  }
  
  subscribe(type, handler) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(handler);
    
    return () => {
      const handlers = this.listeners.get(type);
      const index = handlers.indexOf(handler);
      if (index > -1) handlers.splice(index, 1);
    };
  }
  
  publish(target, type, payload, origin = '*') {
    target.postMessage({ type, payload }, origin);
  }
}

// 4. State synchronization with postMessage
class SyncManager {
  constructor() {
    this.state = {};
    this.synced = new Set();
    this.setupSync();
  }
  
  setupSync() {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'SYNC_STATE') {
        this.state = { ...this.state, ...event.data.payload };
        this.notifyListeners();
      }
    });
  }
  
  syncState(target, state, origin = '*') {
    target.postMessage({
      type: 'SYNC_STATE',
      payload: state
    }, origin);
  }
  
  getState() {
    return { ...this.state };
  }
}

// 5. Secure message validation
function validateMessage(event, allowedOrigins) {
  // Verify origin
  if (!allowedOrigins.includes(event.origin)) {
    console.warn('Invalid origin:', event.origin);
    return false;
  }
  
  // Verify message structure
  const { type, payload, timestamp } = event.data;
  if (!type || typeof type !== 'string') {
    console.warn('Invalid message type');
    return false;
  }
  
  // Verify timestamp (prevent replay attacks)
  if (timestamp && Date.now() - timestamp > 5000) {
    console.warn('Message too old');
    return false;
  }
  
  return true;
}`}
          language="javascript"
          title="postmessage-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Security Considerations">
          <PlainText component="div">
            • <Bold>Origin Verification:</Bold> Always check <InlineCode>event.origin</InlineCode><br />
            • <Bold>Data Validation:</Bold> Validate message structure and content<br />
            • <Bold>Target Origin:</Bold> Specify target origin in <InlineCode>postMessage</InlineCode><br />
            • <Bold>Message Channel:</Bold> Use for secure two-way communication<br />
            • <Bold>Rate Limiting:</Bold> Prevent message flooding<br />
            • <Bold>Sanitization:</Bold> Sanitize received data before use
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Always <Bold>verify origins</Bold> and <Bold>validate messages</Bold> to prevent security vulnerabilities like XSS and CSRF.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Post Message Patterns
        </Title>

        <PlainText>
          Expert-level postMessage patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Message routing with service worker
// service-worker.js
self.addEventListener('message', (event) => {
  const { type, payload, target } = event.data;
  
  // Route message to specific clients
  if (target) {
    self.clients.get(target).then(client => {
      client.postMessage({ type, payload });
    });
  } else {
    // Broadcast to all clients
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ type, payload });
      });
    });
  }
});

// 2. RPC (Remote Procedure Call) with postMessage
class RPCClient {
  constructor(target, origin = '*') {
    this.target = target;
    this.origin = origin;
    this.id = 0;
    this.promises = new Map();
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('message', (event) => {
      if (event.origin !== this.origin) return;
      
      const { id, response, error } = event.data;
      if (this.promises.has(id)) {
        const { resolve, reject } = this.promises.get(id);
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
        this.promises.delete(id);
      }
    });
  }
  
  call(method, params) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.promises.set(id, { resolve, reject });
      
      this.target.postMessage({
        id,
        method,
        params
      }, this.origin);
    });
  }
}

// 3. Cross-origin iframe communication
class IFrameCommunicator {
  constructor(iframe, allowedOrigin) {
    this.iframe = iframe;
    this.allowedOrigin = allowedOrigin;
    this.ready = false;
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('message', (event) => {
      if (event.origin !== this.allowedOrigin) return;
      
      if (event.data.type === 'READY') {
        this.ready = true;
        console.log('Iframe ready');
      }
    });
  }
  
  async sendMessage(message, timeout = 5000) {
    if (!this.ready) {
      await this.waitForReady();
    }
    
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => {
        resolve(event.data);
      };
      
      this.iframe.contentWindow.postMessage(message, this.allowedOrigin, [channel.port2]);
      
      setTimeout(() => {
        reject(new Error('Timeout waiting for response'));
      }, timeout);
    });
  }
  
  waitForReady() {
    return new Promise((resolve) => {
      if (this.ready) {
        resolve();
        return;
      }
      
      const checkReady = () => {
        if (this.ready) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    });
  }
}

// 4. Message queue for offline scenarios
class MessageQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('message', (event) => {
      // Validate and process messages
      if (this.isValidMessage(event)) {
        this.enqueue(event.data);
      }
    });
  }
  
  isValidMessage(event) {
    // Validation logic
    return true;
  }
  
  enqueue(message) {
    this.queue.push(message);
    this.processQueue();
  }
  
  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const message = this.queue.shift();
      try {
        await this.processMessage(message);
      } catch (error) {
        console.error('Failed to process message:', error);
        // Retry later
        this.queue.push(message);
        break;
      }
    }
    
    this.processing = false;
  }
  
  async processMessage(message) {
    // Process message
    console.log('Processing message:', message);
    // Send response if needed
  }
}

// 5. Cross-origin state management
class CrossOriginStore {
  constructor(targets, origins) {
    this.targets = targets;
    this.origins = origins;
    this.state = {};
    this.setupSync();
  }
  
  setupSync() {
    window.addEventListener('message', (event) => {
      if (!this.origins.includes(event.origin)) return;
      
      if (event.data.type === 'STATE_UPDATE') {
        this.state = { ...this.state, ...event.data.payload };
        this.syncToOthers(event.source);
      }
    });
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.syncAll();
  }
  
  syncAll() {
    this.targets.forEach(target => {
      target.postMessage({
        type: 'STATE_UPDATE',
        payload: this.state
      }, '*');
    });
  }
  
  syncToOthers(sender) {
    // Sync to all targets except the sender
    this.targets.forEach(target => {
      if (target !== sender) {
        target.postMessage({
          type: 'STATE_UPDATE',
          payload: this.state
        }, '*');
      }
    });
  }
}`}
          language="javascript"
          title="postmessage-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance & Security">
          <PlainText component="div">
            • <Bold>Message Size:</Bold> Keep messages small for performance<br />
            • <Bold>Rate Limiting:</Bold> Implement throttling for frequent messages<br />
            • <Bold>Origin Whitelist:</Bold> Maintain a list of allowed origins<br />
            • <Bold>Message Validation:</Bold> Validate all incoming messages<br />
            • <Bold>Timeouts:</Bold> Set timeouts for responses<br />
            • <Bold>Error Handling:</Bold> Handle failures gracefully
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> PostMessage is a <Bold>powerful, secure API</Bold> for cross-origin communication. When properly implemented with origin verification and message validation, it enables <Bold>complex, distributed web applications</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> PostMessage enables <Bold>secure cross-origin communication</Bold>. Always verify origins, validate data, and handle errors to build <Bold>robust applications</Bold>.
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
            <>PostMessage enables <Bold>cross-origin communication</Bold></>,
            <>Works between <Bold>windows</Bold>, <Bold>iframes</Bold>, <Bold>workers</Bold></>,
            <>Always <Bold>verify origins</Bold> for security</>,
            <>Use <Bold>MessageChannel</Bold> for two-way communication</>,
            <>Supports <Bold>structured data</Bold> and <Bold>ports</Bold></>,
            <>Essential for <Bold>iframe integration</Bold> and <Bold>microservices</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Always use <Bold>origin verification</Bold> and <Bold>data validation</Bold> when using postMessage. This is <Bold>critical</Bold> for security in cross-origin communication.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> PostMessage is the <Bold>standard way</Bold> to communicate across origins. It's <Bold>secure, flexible, and widely supported</Bold>!
      </Note>
    </QuestionWrapper>
  );
}