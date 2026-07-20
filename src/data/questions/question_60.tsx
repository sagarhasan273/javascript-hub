// data/questions/Question60.tsx
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
import { question60Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question60({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question60Meta.id}
      title={question60Meta.title}
      definition={question60Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        To receive Server-Sent Event notifications, you use the <Bold>EventSource API</Bold> on the client side. This API creates a <Bold>persistent connection</Bold> to the server and listens for incoming events.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Receiving SSE Notifications
        </Title>

        <PlainText>
          Think of receiving SSE notifications like <Bold>tuning into a radio station</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📻 Analogy">
          <PlainText>
            To listen to a radio station, you turn on your radio and tune to the right frequency (create EventSource). Then you listen (onmessage) and hear the broadcasts as they happen. When you want to stop, you turn off the radio (close the connection).
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic SSE Reception:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Create EventSource connection
const eventSource = new EventSource('/api/events');

// 2. Listen for general messages
eventSource.onmessage = function(event) {
  console.log('Received:', event.data);
  displayMessage(event.data);
};

// 3. Listen for specific event types
eventSource.addEventListener('user-joined', function(event) {
  const user = JSON.parse(event.data);
  console.log('User joined:', user.name);
  showUserJoinedNotification(user);
});

eventSource.addEventListener('new-message', function(event) {
  const message = JSON.parse(event.data);
  console.log('New message:', message.text);
  addMessageToChat(message);
});

// 4. Handle connection open
eventSource.onopen = function(event) {
  console.log('Connection opened!');
  showStatus('Connected to server');
};

// 5. Handle errors
eventSource.onerror = function(event) {
  console.error('Connection error:', event);
  showStatus('Connection error, reconnecting...');
};

// 6. Close the connection when done
function disconnect() {
  eventSource.close();
  console.log('Disconnected');
  showStatus('Disconnected');
}

// 7. Example: Displaying notifications
function displayMessage(data) {
  const container = document.getElementById('notifications');
  const div = document.createElement('div');
  div.textContent = data;
  div.className = 'notification';
  container.prepend(div);
}

function showUserJoinedNotification(user) {
  // Show notification
  const notification = new Notification(\`\${user.name} joined the chat!\`);
}`}
          language="javascript"
          title="sse-receive-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Use <InlineCode>EventSource</InlineCode> to receive SSE notifications. Listen to <InlineCode>onmessage</InlineCode> for all events and <InlineCode>addEventListener</InlineCode> for specific event types.
        </Note>

        <CardComponent variant="success" title="✅ EventSource Methods">
          <PlainText component="div">
            • <Bold>new EventSource(url):</Bold> Create connection<br />
            • <Bold>onmessage:</Bold> Handle all messages<br />
            • <Bold>addEventListener:</Bold> Handle specific events<br />
            • <Bold>onopen:</Bold> Handle connection open<br />
            • <Bold>onerror:</Bold> Handle errors<br />
            • <Bold>close():</Bold> Close the connection
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
          Advanced: SSE Reception Patterns
        </Title>

        <PlainText>
          Advanced SSE reception patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. SSE with automatic reconnection
class SSEConnection {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }
  
  connect() {
    try {
      this.eventSource = new EventSource(this.url);
      
      this.eventSource.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        console.log('Connected to SSE');
        this.onConnect();
      };
      
      this.eventSource.onmessage = (event) => {
        this.handleMessage(event.data);
      };
      
      this.eventSource.onerror = () => {
        this.isConnected = false;
        this.eventSource.close();
        this.handleDisconnect();
      };
    } catch (error) {
      console.error('Connection failed:', error);
      this.handleDisconnect();
    }
  }
  
  handleDisconnect() {
    this.reconnectAttempts++;
    if (this.reconnectAttempts <= this.maxReconnectAttempts) {
      const delay = Math.min(1000 * this.reconnectAttempts, 10000);
      console.log(\`Reconnecting in \${delay}ms...\`);
      setTimeout(() => this.connect(), delay);
    } else {
      console.error('Max reconnection attempts reached');
      this.onMaxReconnectAttempts();
    }
  }
  
  handleMessage(data) {
    try {
      const parsed = JSON.parse(data);
      console.log('Received:', parsed);
      this.onMessage(parsed);
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  }
  
  // Override these methods
  onConnect() {}
  onMessage(data) {}
  onMaxReconnectAttempts() {}
  
  close() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.isConnected = false;
    }
  }
}

// 2. SSE with multiple event handlers
class SSEEventManager {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.handlers = new Map();
    this.defaultHandler = null;
  }
  
  connect() {
    this.eventSource = new EventSource(this.url);
    
    this.eventSource.onmessage = (event) => {
      if (this.defaultHandler) {
        this.defaultHandler(event.data);
      }
    };
    
    // Setup custom event listeners
    this.handlers.forEach((handler, eventType) => {
      this.eventSource.addEventListener(eventType, (event) => {
        handler(event.data);
      });
    });
  }
  
  on(eventType, handler) {
    this.handlers.set(eventType, handler);
    
    if (this.eventSource) {
      this.eventSource.addEventListener(eventType, (event) => {
        handler(event.data);
      });
    }
  }
  
  onDefault(handler) {
    this.defaultHandler = handler;
  }
  
  close() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

// 3. SSE with message parsing
class SSEMessageParser {
  constructor(eventSource) {
    this.eventSource = eventSource;
    this.setupListeners();
  }
  
  setupListeners() {
    this.eventSource.onmessage = (event) => {
      this.parseAndHandle(event.data);
    };
  }
  
  parseAndHandle(data) {
    try {
      const parsed = JSON.parse(data);
      this.handleParsedMessage(parsed);
    } catch (error) {
      // If not JSON, treat as plain text
      this.handlePlainText(data);
    }
  }
  
  handleParsedMessage(message) {
    // Handle structured message
    console.log('Structured message:', message);
    
    if (message.type === 'notification') {
      this.showNotification(message);
    } else if (message.type === 'update') {
      this.applyUpdate(message);
    }
  }
  
  handlePlainText(text) {
    // Handle plain text message
    console.log('Plain text:', text);
    this.displayText(text);
  }
  
  showNotification(message) {
    // Show notification
    if (Notification.permission === 'granted') {
      new Notification(message.title, {
        body: message.body,
        icon: message.icon
      });
    }
  }
  
  applyUpdate(message) {
    // Apply update to UI
    const element = document.getElementById(message.target);
    if (element) {
      element.textContent = message.value;
    }
  }
  
  displayText(text) {
    // Display text
    const container = document.getElementById('messages');
    const div = document.createElement('div');
    div.textContent = text;
    container.appendChild(div);
  }
}

// 4. SSE with event filtering
class SSEFilter {
  constructor(eventSource) {
    this.eventSource = eventSource;
    this.filters = [];
    this.setupListener();
  }
  
  setupListener() {
    this.eventSource.onmessage = (event) => {
      const data = event.data;
      if (this.shouldProcess(data)) {
        this.process(data);
      }
    };
  }
  
  addFilter(filterFn) {
    this.filters.push(filterFn);
  }
  
  shouldProcess(data) {
    return this.filters.every(filter => filter(data));
  }
  
  process(data) {
    console.log('Processing:', data);
    // Process the message
  }
}`}
          language="javascript"
          title="sse-receive-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 EventSource States">
          <PlainText component="div">
            • <Bold>CONNECTING (0):</Bold> Connection not yet established<br />
            • <Bold>OPEN (1):</Bold> Connection established and active<br />
            • <Bold>CLOSED (2):</Bold> Connection closed (or failed)<br />
            • Check state: <InlineCode>eventSource.readyState</InlineCode>
          </PlainText>
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Always handle <Bold>reconnection</Bold> logic yourself or use libraries that handle it. While SSE auto-reconnects, you may want <Bold>exponential backoff</Bold> for better reliability.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced SSE Reception
        </Title>

        <PlainText>
          Expert-level SSE reception patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. SSE with message queue
class SSEQueue {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.queue = [];
    this.isProcessing = false;
    this.maxQueueSize = 1000;
    this.connect();
  }
  
  connect() {
    this.eventSource = new EventSource(this.url);
    this.eventSource.onmessage = (event) => {
      this.enqueue(event.data);
    };
  }
  
  enqueue(data) {
    if (this.queue.length >= this.maxQueueSize) {
      console.warn('Queue full, dropping oldest message');
      this.queue.shift();
    }
    this.queue.push(data);
    this.process();
  }
  
  async process() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const data = this.queue.shift();
      try {
        await this.handleMessage(data);
      } catch (error) {
        console.error('Failed to process message:', error);
        // Re-add to queue for retry
        this.queue.unshift(data);
        break;
      }
    }
    
    this.isProcessing = false;
  }
  
  async handleMessage(data) {
    // Process message
    console.log('Processing:', data);
  }
}

// 2. SSE with message batching
class SSEBatcher {
  constructor(url, batchSize = 10, batchDelay = 1000) {
    this.url = url;
    this.batchSize = batchSize;
    this.batchDelay = batchDelay;
    this.eventSource = null;
    this.batch = [];
    this.timer = null;
    this.connect();
  }
  
  connect() {
    this.eventSource = new EventSource(this.url);
    this.eventSource.onmessage = (event) => {
      this.batch.push(event.data);
      this.scheduleBatch();
    };
  }
  
  scheduleBatch() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    if (this.batch.length >= this.batchSize) {
      this.flushBatch();
    } else {
      this.timer = setTimeout(() => this.flushBatch(), this.batchDelay);
    }
  }
  
  flushBatch() {
    if (this.batch.length === 0) return;
    
    const messages = [...this.batch];
    this.batch = [];
    this.processBatch(messages);
    
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  
  processBatch(messages) {
    console.log(\`Processing \${messages.length} messages\`);
    messages.forEach(msg => this.handleMessage(msg));
  }
  
  handleMessage(data) {
    // Handle individual message
  }
}

// 3. SSE with error recovery
class SSERecovery {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.lastEventId = null;
    this.reconnectAttempts = 0;
    this.isRecovering = false;
  }
  
  connect() {
    const url = this.lastEventId ? \`\${this.url}?lastEventId=\${this.lastEventId}\` : this.url;
    this.eventSource = new EventSource(url);
    
    this.eventSource.onmessage = (event) => {
      this.lastEventId = event.lastEventId;
      this.isRecovering = false;
      this.reconnectAttempts = 0;
      this.handleMessage(event.data);
    };
    
    this.eventSource.onerror = () => {
      this.eventSource.close();
      this.recover();
    };
  }
  
  recover() {
    if (this.isRecovering) return;
    this.isRecovering = true;
    this.reconnectAttempts++;
    
    const delay = this.calculateDelay();
    console.log(\`Recovering in \${delay}ms (attempt \${this.reconnectAttempts})\`);
    
    setTimeout(() => {
      this.connect();
    }, delay);
  }
  
  calculateDelay() {
    const base = 1000;
    const max = 30000;
    const delay = base * Math.pow(2, Math.min(this.reconnectAttempts - 1, 5));
    return Math.min(delay, max);
  }
  
  handleMessage(data) {
    // Process message
  }
}

// 4. SSE with WebWorker for background processing
class SSEWorkerManager {
  constructor(url) {
    this.url = url;
    this.worker = null;
    this.mainListeners = [];
    this.setupWorker();
  }
  
  setupWorker() {
    // Create worker
    const workerCode = \`
      self.addEventListener('message', (event) => {
        const { url } = event.data;
        const eventSource = new EventSource(url);
        eventSource.onmessage = (event) => {
          self.postMessage(event.data);
        };
        eventSource.onerror = (error) => {
          self.postMessage({ error: 'SSE connection error' });
        };
      });
    \`;
    
    const blob = new Blob([workerCode], { type: 'text/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    this.worker = new Worker(workerUrl);
    
    this.worker.onmessage = (event) => {
      this.mainListeners.forEach(listener => listener(event.data));
    };
    
    this.worker.postMessage({ url: this.url });
  }
  
  addListener(callback) {
    this.mainListeners.push(callback);
  }
  
  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

// 5. SSE with persistent storage
class SSEPersistent {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.store = [];
    this.maxStore = 1000;
    this.connect();
  }
  
  connect() {
    this.eventSource = new EventSource(this.url);
    this.eventSource.onmessage = (event) => {
      this.storeMessage(event.data);
    };
  }
  
  storeMessage(data) {
    this.store.push({
      id: Date.now() + Math.random(),
      data: data,
      timestamp: Date.now()
    });
    
    if (this.store.length > this.maxStore) {
      this.store.shift();
    }
  }
  
  getMessages(count = 10) {
    return this.store.slice(-count);
  }
  
  getMessagesSince(timestamp) {
    return this.store.filter(msg => msg.timestamp > timestamp);
  }
}`}
          language="javascript"
          title="sse-receive-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Best Practices">
          <PlainText component="div">
            • <Bold>Implement reconnection</Bold> with exponential backoff<br />
            • <Bold>Batch messages</Bold> for better performance<br />
            • <Bold>Store messages</Bold> for history/offline support<br />
            • <Bold>Use workers</Bold> for background processing<br />
            • <Bold>Handle errors</Bold> gracefully<br />
            • <Bold>Monitor connection state</Bold><br />
            • <Bold>Process messages</Bold> asynchronously
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Receiving SSE notifications is <Bold>simple</Bold> but can be <Bold>enhanced</Bold> with patterns like <Bold>message queuing</Bold>, <Bold>batching</Bold>, and <Bold>error recovery</Bold>. These patterns make your SSE implementation <Bold>robust and production-ready</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Receiving SSE notifications is <Bold>straightforward</Bold> with the EventSource API. Advanced patterns like <Bold>queuing</Bold>, <Bold>batching</Bold>, and <Bold>recovery</Bold> make it <Bold>production-ready</Bold>.
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
            <>Use <Bold>EventSource API</Bold> to receive SSE notifications</>,
            <>Listen to <Bold>onmessage</Bold> for all messages</>,
            <>Use <Bold>addEventListener</Bold> for specific event types</>,
            <>Handle <Bold>connection states</Bold> (CONNECTING, OPEN, CLOSED)</>,
            <>Implement <Bold>reconnection logic</Bold> for reliability</>,
            <>Use <Bold>message queuing</Bold> for high-volume scenarios</>,
            <>Consider <Bold>Web Workers</Bold> for background processing</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Always implement <Bold>proper error handling</Bold> and <Bold>reconnection logic</Bold> for production SSE applications. This ensures your app remains <Bold>reliable</Bold> even when connections drop.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Receiving SSE notifications is <Bold>simple and reliable</Bold>. With the right patterns, you can build <Bold>robust real-time applications</Bold>!
      </Note>
    </QuestionWrapper>
  );
}