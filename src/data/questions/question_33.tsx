// data/questions/Question33.tsx
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
import { question33Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question33({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question33Meta.id}
      title={question33Meta.title}
      definition={question33Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Service workers <Bold>cannot directly manipulate the DOM</Bold> because they run in a <Bold>separate thread</Bold> from the main browser thread. However, they can <Bold>communicate</Bold> with the main thread using <Bold>message passing</Bold> (PostMessage API), and the main thread can then <Bold>update the DOM</Bold> accordingly.
      </PlainText>

      <PlainText>
        This communication allows service workers to <Bold>trigger DOM updates</Bold> based on events like <Bold>push notifications</Bold>, <Bold>background sync</Bold>, or <Bold>cache updates</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Communication with Service Workers
        </Title>

        <PlainText>
          Service workers and DOM manipulation work like a <Bold>two-way radio</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📻 Analogy">
          <PlainText>
            Imagine you're in a different room (service worker) and want to move furniture (DOM manipulation) in another room (main thread). You can't directly move the furniture, but you can use a walkie-talkie (PostMessage) to tell someone in the other room to move it for you.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Communication Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// -------- Main Thread (page.js) --------
// Listen for messages from service worker
navigator.serviceWorker.addEventListener('message', event => {
  console.log('Message from service worker:', event.data);
  
  // Update DOM based on message
  if (event.data.type === 'update-data') {
    document.getElementById('data').textContent = event.data.payload;
  }
  
  if (event.data.type === 'show-notification') {
    showNotification(event.data.message);
  }
});

// Send message to service worker
function sendMessageToSW(message) {
  navigator.serviceWorker.controller.postMessage(message);
}

// -------- Service Worker (sw.js) --------
// Send message to all clients
self.clients.matchAll().then(clients => {
  clients.forEach(client => {
    client.postMessage({
      type: 'update-data',
      payload: 'New data from service worker!'
    });
  });
});

// Listen for messages from clients
self.addEventListener('message', event => {
  console.log('Message from client:', event.data);
  
  // Process the message
  if (event.data.action === 'fetch-data') {
    // Fetch data and send back
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        event.ports[0].postMessage(data);
      });
  }
});`}
          language="javascript"
          title="dom-communication-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Service workers <Bold>cannot</Bold> directly manipulate the DOM. They use <Bold>PostMessage API</Bold> to communicate with the main thread.
        </Note>

        <CardComponent variant="success" title="✅ Communication Methods">
          <PlainText component="div">
            • <Bold>postMessage():</Bold> Send messages between service worker and main thread<br />
            • <Bold>message event:</Bold> Listen for incoming messages<br />
            • <Bold>MessageChannel:</Bold> Two-way communication<br />
            • <Bold>BroadcastChannel:</Bold> Broadcast to multiple contexts<br />
            • <Bold>Cache Storage:</Bold> Share data via cache<br />
            • <Bold>IndexedDB:</Bold> Share data via database
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
          Advanced: DOM Manipulation Patterns
        </Title>

        <PlainText>
          Advanced patterns for DOM manipulation with service workers:
        </PlainText>

        <CodeComponent
          code={`// -------- Main Thread (page.js) --------
// 1. Setup message listener
navigator.serviceWorker.addEventListener('message', event => {
  const { type, payload } = event.data;
  
  switch(type) {
    case 'PUSH_NOTIFICATION':
      handlePushNotification(payload);
      break;
    case 'CACHE_UPDATED':
      handleCacheUpdate(payload);
      break;
    case 'SYNC_COMPLETE':
      handleSyncComplete(payload);
      break;
    case 'DATA_UPDATE':
      handleDataUpdate(payload);
      break;
  }
});

function handlePushNotification(data) {
  // Update UI for push notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = data.message;
  document.body.prepend(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => notification.remove(), 5000);
}

function handleCacheUpdate(data) {
  // Show cache update status
  document.getElementById('cache-status').textContent = 
    \`Cache updated at \${new Date().toLocaleTimeString()}\`;
}

function handleSyncComplete(data) {
  // Update UI after sync completes
  document.getElementById('sync-status').textContent = 
    \`Last synced: \${new Date().toLocaleTimeString()}\`;
  document.getElementById('pending-count').textContent = data.pendingCount || 0;
}

function handleDataUpdate(data) {
  // Update the main content
  const container = document.getElementById('content');
  container.innerHTML = renderData(data);
}

// 2. Send messages to service worker
function requestDataUpdate() {
  navigator.serviceWorker.controller.postMessage({
    type: 'REQUEST_DATA',
    timestamp: Date.now()
  });
}

function requestSync() {
  navigator.serviceWorker.controller.postMessage({
    type: 'REQUEST_SYNC'
  });
}

// 3. Using MessageChannel for two-way communication
function sendMessageWithResponse(message) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    
    channel.port1.onmessage = event => {
      resolve(event.data);
    };
    
    navigator.serviceWorker.controller.postMessage(message, [channel.port2]);
    
    // Timeout after 5 seconds
    setTimeout(() => reject(new Error('Timeout')), 5000);
  });
}

// Usage
async function fetchDataFromSW() {
  try {
    const data = await sendMessageWithResponse({
      action: 'fetch-data',
      url: '/api/users'
    });
    console.log('Received data:', data);
    // Update DOM with data
    renderUsers(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

// -------- Service Worker (sw.js) --------
// 1. Handle incoming messages
self.addEventListener('message', event => {
  const { type, action } = event.data;
  
  if (type === 'REQUEST_DATA') {
    // Fetch data and send back
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        event.ports[0].postMessage({
          success: true,
          data: data
        });
      })
      .catch(error => {
        event.ports[0].postMessage({
          success: false,
          error: error.message
        });
      });
  }
  
  if (action === 'fetch-data') {
    // Handle specific data fetch
    handleDataFetch(event);
  }
});

// 2. Broadcast updates to all clients
function broadcastUpdate(data) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'BROADCAST_UPDATE',
        payload: data,
        timestamp: Date.now()
      });
    });
  });
}

// 3. Send notification to clients
function notifyClients(message, type = 'info') {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'NOTIFICATION',
        payload: {
          message,
          type,
          timestamp: Date.now()
        }
      });
    });
  });
}`}
          language="javascript"
          title="dom-communication-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Communication Patterns">
          <PlainText component="div">
            • <Bold>Broadcast:</Bold> Send same message to all clients<br />
            • <Bold>One-to-One:</Bold> Direct communication with specific client<br />
            • <Bold>Request-Response:</Bold> Ask for data and get response<br />
            • <Bold>Event-Driven:</Bold> React to service worker events<br />
            • <Bold>Data Sharing:</Bold> Share data via cache or IndexedDB
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Service workers <Bold>cannot</Bold> access the DOM. All DOM updates must be handled by the <Bold>main thread</Bold>.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Issues">
          <UnorderedList
            items={[
              <>Trying to access DOM directly from service worker</>,
              <>Not handling message events properly</>,
              <>Missing message listeners on the main thread</>,
              <>Not checking if service worker is active</>,
              <>Memory leaks from unclosed message channels</>,
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Communication Patterns
        </Title>

        <PlainText>
          Expert-level patterns for service worker communication:
        </PlainText>

        <CodeComponent
          code={`// -------- Main Thread (page.js) --------
// 1. State management with service worker
class SWStateManager {
  constructor() {
    this.state = {};
    this.listeners = [];
    this.setupSWCommunication();
  }
  
  setupSWCommunication() {
    navigator.serviceWorker.addEventListener('message', event => {
      const { type, payload } = event.data;
      
      if (type === 'STATE_UPDATE') {
        this.setState(payload);
      }
    });
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }
  
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
  
  async dispatch(action) {
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = event => {
        resolve(event.data);
      };
      
      navigator.serviceWorker.controller.postMessage(
        { type: 'ACTION', action },
        [channel.port2]
      );
    });
  }
}

// 2. React-like state updates
class SWStore {
  constructor() {
    this.state = {};
    this.listeners = [];
    this.setupSWListener();
  }
  
  setupSWListener() {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.type === 'STORE_UPDATE') {
        this.state = { ...this.state, ...event.data.payload };
        this.notifyListeners();
      }
    });
  }
  
  getState() {
    return this.state;
  }
  
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// 3. Component updates from service worker
class SWComponent {
  constructor(element) {
    this.element = element;
    this.setupSWListener();
  }
  
  setupSWListener() {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.type === 'COMPONENT_UPDATE') {
        if (event.data.target === this.element.id) {
          this.update(event.data.props);
        }
      }
    });
  }
  
  update(props) {
    // Update component with new props
    this.element.textContent = props.content;
    this.element.className = props.className || '';
    this.element.style.backgroundColor = props.backgroundColor || 'transparent';
  }
}

// 4. Real-time DOM updates
class RealTimeUpdater {
  constructor() {
    this.updates = [];
    this.setupSWListener();
  }
  
  setupSWListener() {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.type === 'REAL_TIME_UPDATE') {
        this.applyUpdate(event.data.payload);
      }
    });
  }
  
  applyUpdate(update) {
    // Apply update to DOM
    const element = document.getElementById(update.target);
    if (element) {
      element.textContent = update.content;
      element.classList.add('updated');
      setTimeout(() => element.classList.remove('updated'), 1000);
    }
  }
}

// -------- Service Worker (sw.js) --------
// 1. State management in service worker
let swState = {};

function updateSWState(newState) {
  swState = { ...swState, ...newState };
  
  // Broadcast state update to all clients
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'STATE_UPDATE',
        payload: swState
      });
    });
  });
}

// 2. Handle actions
self.addEventListener('message', event => {
  if (event.data.type === 'ACTION') {
    const { action } = event.data;
    
    switch(action.type) {
      case 'INCREMENT_COUNTER':
        updateSWState({ counter: swState.counter + 1 });
        event.ports[0].postMessage({ success: true });
        break;
      
      case 'FETCH_DATA':
        fetch('/api/data')
          .then(response => response.json())
          .then(data => {
            updateSWState({ data });
            event.ports[0].postMessage({ success: true, data });
          });
        break;
    }
  }
});

// 3. Push notification handling
self.addEventListener('push', event => {
  const data = event.data.json();
  
  // Send notification to clients
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'PUSH_NOTIFICATION',
        payload: {
          title: data.title,
          body: data.body,
          url: data.url
        }
      });
    });
  });
  
  // Show notification
  const options = {
    body: data.body,
    icon: '/icon.png',
    data: { url: data.url }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});`}
          language="javascript"
          title="dom-communication-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Communication Best Practices">
          <PlainText component="div">
            • <Bold>Message Batching:</Bold> Batch messages to reduce overhead<br />
            • <Bold>Error Handling:</Bold> Handle message failures gracefully<br />
            • <Bold>State Management:</Bold> Keep state consistent between SW and client<br />
            • <Bold>Performance:</Bold> Avoid excessive message passing<br />
            • <Bold>Security:</Bold> Validate messages before processing<br />
            • <Bold>Cleanup:</Bold> Remove event listeners when not needed
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>MessageChannel</Bold> for request-response patterns</>,
              <>Implement <Bold>state synchronization</Bold> between SW and client</>,
              <>Use <Bold>debouncing</Bold> for frequent updates</>,
              <>Implement <Bold>fallback mechanisms</Bold> for offline scenarios</>,
              <>Use <Bold>IndexedDB</Bold> for sharing large datasets</>,
              <>Implement <Bold>versioning</Bold> for message protocols</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> While service workers <Bold>cannot directly manipulate the DOM</Bold>, they can <Bold>orchestrate DOM updates</Bold> through efficient communication patterns. This enables <Bold>rich, interactive experiences</Bold> even in offline scenarios.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Service workers use <Bold>message passing</Bold> to trigger DOM updates. This pattern enables <Bold>offline-first applications</Bold> that provide <Bold>seamless user experiences</Bold>.
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
            <>Service workers <Bold>cannot</Bold> directly manipulate the DOM</>,
            <>They use <Bold>PostMessage API</Bold> to communicate with the main thread</>,
            <>The main thread <Bold>updates the DOM</Bold> based on messages</>,
            <>Use <Bold>MessageChannel</Bold> for two-way communication</>,
            <>Patterns include <Bold>broadcast</Bold>, <Bold>request-response</Bold>, and <Bold>state management</Bold></>,
            <>Always <Bold>validate messages</Bold> for security</>,
            <>Implement <Bold>error handling</Bold> for communication failures</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Design your <Bold>message protocol</Bold> carefully to handle different types of updates. Use <Bold>structured messages</Bold> with types and payloads for maintainability.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> While service workers can't touch the DOM, they can <Bold>trigger powerful DOM updates</Bold> through clean communication patterns!
      </Note>
    </QuestionWrapper>
  );
}