// data/questions/Question47.tsx
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
import { question47Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question47({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question47Meta.id}
      title={question47Meta.title}
      definition={question47Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The <Bold>storage event</Bold> is fired when a storage area (<InlineCode>localStorage</InlineCode> or <InlineCode>sessionStorage</InlineCode>) is modified. It allows <Bold>cross-tab communication</Bold> and <Bold>real-time updates</Bold> across different tabs or windows of the same origin.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is a Storage Event?
        </Title>

        <PlainText>
          Think of a storage event like a <Bold>notification system</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🔔 Analogy">
          <PlainText>
            Imagine you have multiple people in different rooms (tabs) looking at the same whiteboard (storage). When someone writes something new on the whiteboard, a bell rings in all other rooms to notify everyone that something changed. That's exactly what a storage event does!
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Storage Event Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Listening for storage events
window.addEventListener('storage', function(event) {
  console.log('Storage changed:', event);
  console.log('Key:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('Storage area:', event.storageArea);
});

// 2. Making a change that triggers the event
// This will trigger the event in OTHER tabs/windows
localStorage.setItem('theme', 'dark');

// 3. Practical example - theme sync across tabs
window.addEventListener('storage', function(event) {
  if (event.key === 'theme') {
    // Apply theme change in this tab
    document.body.className = event.newValue;
    console.log(\`Theme changed to: \${event.newValue}\`);
  }
});

// 4. Another tab changes the theme
// This will trigger the event in all other tabs
localStorage.setItem('theme', 'light');`}
          language="javascript"
          title="storage-event-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Storage events only fire in <Bold>other tabs/windows</Bold>, not in the tab that made the change.
        </Note>

        <CardComponent variant="success" title="✅ Event Properties">
          <PlainText component="div">
            • <Bold>key:</Bold> The key that was changed<br />
            • <Bold>oldValue:</Bold> The previous value (null if new)<br />
            • <Bold>newValue:</Bold> The new value (null if removed)<br />
            • <Bold>storageArea:</Bold> The storage object (localStorage or sessionStorage)<br />
            • <Bold>url:</Bold> The URL of the document that made the change
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
          Advanced: Storage Event Patterns
        </Title>

        <PlainText>
          Advanced usage of storage events:
        </PlainText>

        <CodeComponent
          code={`// 1. Cross-tab communication
class TabMessenger {
  constructor() {
    this.listeners = new Map();
    this.setupStorageListener();
  }
  
  setupStorageListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === '__message__' && event.newValue) {
        try {
          const message = JSON.parse(event.newValue);
          const callbacks = this.listeners.get(message.channel);
          if (callbacks) {
            callbacks.forEach(callback => callback(message.data));
          }
        } catch (e) {
          console.error('Invalid message format');
        }
      }
    });
  }
  
  sendMessage(channel, data) {
    const message = {
      channel,
      data,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    };
    localStorage.setItem('__message__', JSON.stringify(message));
    // Clear after sending
    setTimeout(() => {
      localStorage.removeItem('__message__');
    }, 100);
  }
  
  subscribe(channel, callback) {
    if (!this.listeners.has(channel)) {
      this.listeners.set(channel, []);
    }
    this.listeners.get(channel).push(callback);
    
    return () => {
      const callbacks = this.listeners.get(channel);
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    };
  }
}

// 2. State synchronization across tabs
class TabStateSync {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
    this.setupSync();
  }
  
  setupSync() {
    // Listen for state changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === '__state__' && event.newValue) {
        try {
          const newState = JSON.parse(event.newValue);
          this.state = newState;
          this.notifyListeners();
        } catch (e) {
          console.error('Invalid state sync');
        }
      }
    });
    
    // Update state and broadcast to other tabs
    this.broadcastState();
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.broadcastState();
    this.notifyListeners();
  }
  
  broadcastState() {
    localStorage.setItem('__state__', JSON.stringify(this.state));
  }
  
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) this.listeners.splice(index, 1);
    };
  }
  
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// 3. Session storage events (limited)
// sessionStorage events only fire in the same tab
// Different tabs have separate sessionStorage

// 4. Debouncing storage events
function debounceStorageEvents(handler, delay = 100) {
  let timeoutId;
  
  return function(event) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handler(event);
    }, delay);
  };
}

window.addEventListener('storage', debounceStorageEvents((event) => {
  console.log('Debounced storage event:', event.key);
}));

// 5. Storage event with error handling
function safeStorageListener(event) {
  try {
    if (event.key === 'auth_token') {
      // Handle token change
      console.log('Auth token changed in another tab');
    }
  } catch (error) {
    console.error('Error handling storage event:', error);
  }
}

window.addEventListener('storage', safeStorageListener);

// 6. Conditional storage event handling
window.addEventListener('storage', (event) => {
  // Only handle specific keys
  if (['theme', 'language', 'preferences'].includes(event.key)) {
    handlePreferenceChange(event.key, event.newValue);
  }
});`}
          language="javascript"
          title="storage-event-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Storage Event Use Cases">
          <PlainText component="div">
            • <Bold>Cross-tab sync:</Bold> Keep tabs in sync<br />
            • <Bold>Real-time updates:</Bold> Update UI across tabs<br />
            • <Bold>Preferences sync:</Bold> Theme, language changes<br />
            • <Bold>Logout:</Bold> Log out from all tabs at once<br />
            • <Bold>Data consistency:</Bold> Keep data consistent across tabs<br />
            • <Bold>Multi-tab apps:</Bold> Manage state across tabs
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Storage events <Bold>do not fire</Bold> in the same tab that made the change. They only fire in <Bold>other tabs/windows</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Storage Event Patterns
        </Title>

        <PlainText>
          Expert-level storage event patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Distributed state management
class DistributedStore {
  constructor(namespace = 'app') {
    this.namespace = namespace;
    this.state = {};
    this.listeners = [];
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === \`\${this.namespace}_state\`) {
        this.syncState(event.newValue);
      }
    });
  }
  
  syncState(newState) {
    if (newState) {
      try {
        this.state = JSON.parse(newState);
        this.notify();
      } catch (e) {
        console.error('Failed to sync state');
      }
    }
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    localStorage.setItem(\`\${this.namespace}_state\`, JSON.stringify(this.state));
    this.notify();
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
  
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

// 2. Broadcast channel pattern
class BroadcastChannelManager {
  constructor(channelName) {
    this.channel = new BroadcastChannel(channelName);
    this.listeners = new Map();
    this.setupListener();
  }
  
  setupListener() {
    this.channel.onmessage = (event) => {
      const { type, payload } = event.data;
      const callbacks = this.listeners.get(type);
      if (callbacks) {
        callbacks.forEach(callback => callback(payload));
      }
    };
  }
  
  send(type, payload) {
    this.channel.postMessage({ type, payload });
  }
  
  subscribe(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(callback);
  }
}

// 3. Storage event with retry mechanism
class ReliableStorageSync {
  constructor() {
    this.pendingChanges = [];
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === '__sync__') {
        this.processChange(event);
      }
    });
  }
  
  processChange(event) {
    try {
      const change = JSON.parse(event.newValue);
      // Process change
      this.applyChange(change);
      // Acknowledge
      this.sendAck(change.id);
    } catch (error) {
      // Retry later
      this.pendingChanges.push(event);
      setTimeout(() => this.processPending(), 1000);
    }
  }
  
  processPending() {
    while (this.pendingChanges.length > 0) {
      const event = this.pendingChanges.shift();
      this.processChange(event);
    }
  }
  
  sendChange(change) {
    const id = Math.random().toString(36).substr(2, 9);
    localStorage.setItem('__sync__', JSON.stringify({ ...change, id }));
  }
  
  applyChange(change) {
    // Apply the change
    console.log('Applying change:', change);
  }
  
  sendAck(id) {
    localStorage.setItem('__ack__', JSON.stringify({ id, timestamp: Date.now() }));
  }
}

// 4. Storage event monitoring
class StorageMonitor {
  constructor() {
    this.events = [];
    this.maxEvents = 100;
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('storage', (event) => {
      this.logEvent(event);
      this.analyzeEvent(event);
    });
  }
  
  logEvent(event) {
    this.events.push({
      key: event.key,
      oldValue: event.oldValue,
      newValue: event.newValue,
      url: event.url,
      timestamp: Date.now()
    });
    
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
  }
  
  analyzeEvent(event) {
    // Detect frequent changes
    const keyEvents = this.events.filter(e => e.key === event.key);
    if (keyEvents.length > 10) {
      console.warn(\`Frequent changes detected for key: \${event.key}\`);
    }
    
    // Detect large values
    if (event.newValue && event.newValue.length > 1024) {
      console.warn(\`Large value stored for key: \${event.key}\`);
    }
  }
  
  getEvents() {
    return [...this.events];
  }
  
  getStats() {
    const stats = {};
    this.events.forEach(event => {
      stats[event.key] = (stats[event.key] || 0) + 1;
    });
    return stats;
  }
}

// 5. Storage event with security
function secureStorageListener(event) {
  // Validate origin
  if (event.url && !event.url.startsWith(window.location.origin)) {
    console.warn('Storage event from different origin');
    return;
  }
  
  // Validate data
  if (event.key === 'auth_token') {
    // Validate token format
    const token = event.newValue;
    if (token && !isValidToken(token)) {
      console.warn('Invalid auth token detected');
      return;
    }
  }
  
  // Process valid event
  handleStorageEvent(event);
}

function isValidToken(token) {
  // Implement token validation
  return token && token.length > 10;
}`}
          language="javascript"
          title="storage-event-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Best Practices">
          <PlainText component="div">
            • <Bold>Validate data:</Bold> Always validate incoming data<br />
            • <Bold>Debounce events:</Bold> Prevent rapid-fire updates<br />
            • <Bold>Handle errors:</Bold> Graceful error handling<br />
            • <Bold>Secure:</Bold> Validate origins and data<br />
            • <Bold>Version data:</Bold> Handle version mismatches<br />
            • <Bold>Clear messages:</Bold> Clean up after processing
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Storage events enable <Bold>powerful cross-tab communication</Bold> and <Bold>real-time synchronization</Bold>. When combined with proper <Bold>validation</Bold> and <Bold>error handling</Bold>, they provide a <Bold>simple yet effective</Bold> way to build <Bold>multi-tab applications</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Storage events are a <Bold>powerful tool</Bold> for cross-tab communication. Use them wisely with <Bold>proper validation</Bold> and <Bold>error handling</Bold> to build <Bold>responsive, multi-tab applications</Bold>.
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
            <>Storage events fire when <Bold>localStorage</Bold> or <Bold>sessionStorage</Bold> changes</>,
            <>Events only fire in <Bold>other tabs/windows</Bold>, not the one that made the change</>,
            <>Event properties include <Bold>key</Bold>, <Bold>oldValue</Bold>, <Bold>newValue</Bold>, and <Bold>storageArea</Bold></>,
            <>Used for <Bold>cross-tab communication</Bold> and <Bold>real-time sync</Bold></>,
            <>Always <Bold>validate data</Bold> and <Bold>handle errors</Bold></>,
            <>Consider <Bold>debouncing</Bold> for frequent updates</>,
            <>sessionStorage events <Bold>only work in the same tab</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use storage events for <Bold>cross-tab synchronization</Bold> of user preferences, authentication state, and real-time data. Always <Bold>validate</Bold> incoming data to prevent security issues.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Storage events are the <Bold>native way</Bold> to communicate between tabs. They're <Bold>simple, reliable, and widely supported</Bold>!
      </Note>
    </QuestionWrapper>
  );
}