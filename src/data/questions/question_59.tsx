// data/questions/Question59.tsx
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
import { question59Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question59({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question59Meta.id}
      title={question59Meta.title}
      definition={question59Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Server-Sent Events (SSE)</Bold> is a technology that allows a server to <Bold>push real-time updates</Bold> to the client over a single HTTP connection. Unlike WebSockets, SSE is <Bold>unidirectional</Bold> (server → client) and works over standard HTTP.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What are Server-Sent Events?
        </Title>

        <PlainText>
          Think of SSE like a <Bold>radio broadcast</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📻 Analogy">
          <PlainText>
            Imagine a radio station (server) broadcasting news updates. Anyone with a radio (client) can tune in and receive updates in real-time. The station broadcasts one-way (server to client), and listeners can't send messages back through the same channel. That's exactly how SSE works!
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic SSE Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// -------- CLIENT SIDE --------
// 1. Create an EventSource
const eventSource = new EventSource('/events');

// 2. Listen for messages
eventSource.onmessage = function(event) {
  console.log('New message:', event.data);
  document.getElementById('messages').innerHTML += '<p>' + event.data + '</p>';
};

// 3. Listen for specific event types
eventSource.addEventListener('notification', function(event) {
  console.log('Notification:', event.data);
  showNotification(event.data);
});

// 4. Handle errors
eventSource.onerror = function(event) {
  console.error('SSE error:', event);
};

// 5. Close connection
// eventSource.close();

// -------- SERVER SIDE (Node.js) --------
const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  
  // Send initial message
  res.write('data: Connected to SSE\\n\\n');
  
  // Send messages every 2 seconds
  let count = 0;
  const interval = setInterval(() => {
    count++;
    res.write(\`data: Message \${count}\\n\\n\`);
    
    // Send custom event
    if (count % 5 === 0) {
      res.write(\`event: notification\\ndata: Important update \${count}\\n\\n\`);
    }
  }, 2000);
  
  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});`}
          language="javascript"
          title="sse-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> SSE provides <Bold>real-time updates</Bold> from server to client with <Bold>automatic reconnection</Bold>.
        </Note>

        <CardComponent variant="success" title="✅ SSE Features">
          <PlainText component="div">
            • 🔄 <Bold>Auto-Reconnection:</Bold> Automatically reconnects if connection drops<br />
            • 📡 <Bold>Event Types:</Bold> Supports custom event types<br />
            • 🔧 <Bold>Simple API:</Bold> Easy to use EventSource API<br />
            • 🌐 <Bold>HTTP Compatible:</Bold> Works with standard HTTP/HTTPS<br />
            • 🔌 <Bold>Firewall Friendly:</Bold> Uses standard HTTP ports<br />
            • 📊 <Bold>Text Format:</Bold> Uses simple text-based protocol
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
          Advanced: SSE Patterns
        </Title>

        <PlainText>
          Advanced SSE patterns:
        </PlainText>

        <CodeComponent
          code={`// -------- CLIENT SIDE --------
class SSEManager {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.autoReconnect = true;
  }
  
  connect() {
    try {
      this.eventSource = new EventSource(this.url);
      this.setupListeners();
    } catch (error) {
      console.error('Failed to connect:', error);
      this.handleReconnection();
    }
  }
  
  setupListeners() {
    this.eventSource.onopen = () => {
      console.log('SSE connection opened');
      this.reconnectAttempts = 0;
    };
    
    this.eventSource.onmessage = (event) => {
      this.handleMessage('message', event.data);
    };
    
    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      this.handleReconnection();
    };
  }
  
  handleMessage(type, data) {
    const handlers = this.listeners.get(type) || [];
    handlers.forEach(handler => {
      try {
        const parsed = JSON.parse(data);
        handler(parsed);
      } catch {
        handler(data);
      }
    });
  }
  
  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
    
    // Add event listener for custom events
    if (this.eventSource) {
      this.eventSource.addEventListener(eventType, (event) => {
        this.handleMessage(eventType, event.data);
      });
    }
  }
  
  handleReconnection() {
    if (!this.autoReconnect) return;
    
    this.reconnectAttempts++;
    if (this.reconnectAttempts <= this.maxReconnectAttempts) {
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      console.log(\`Reconnecting in \${delay}ms (attempt \${this.reconnectAttempts})\`);
      setTimeout(() => this.connect(), delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }
  
  close() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
  
  isConnected() {
    return this.eventSource && this.eventSource.readyState === EventSource.OPEN;
  }
}

// -------- SERVER SIDE --------
class SSEServer {
  constructor() {
    this.clients = new Set();
  }
  
  handleClient(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    
    this.clients.add(res);
    
    req.on('close', () => {
      this.clients.delete(res);
    });
  }
  
  broadcast(data, event = 'message') {
    const message = \`event: \${event}\\ndata: \${JSON.stringify(data)}\\n\\n\`;
    this.clients.forEach(client => {
      try {
        client.write(message);
      } catch (error) {
        console.error('Error broadcasting:', error);
        this.clients.delete(client);
      }
    });
  }
  
  getClientCount() {
    return this.clients.size;
  }
}`}
          language="javascript"
          title="sse-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 SSE vs WebSockets">
          <TableComponent
            headers={['Feature', 'SSE', 'WebSockets']}
            rows={[
              ['Direction', 'Server → Client only', 'Bi-directional'],
              ['Protocol', 'HTTP/HTTPS', 'WS/WSS'],
              ['Auto-reconnect', '✅ Yes', '❌ No (manual)'],
              ['Binary Data', '❌ No', '✅ Yes'],
              ['Complexity', 'Simple', 'Complex'],
              ['Use Case', 'Real-time updates', 'Real-time communication'],
              ['Browser Support', '✅ Good', '✅ Good'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Use SSE when you need <Bold>server-to-client updates</Bold> (like news feeds, stock prices, notifications). Use WebSockets when you need <Bold>bi-directional communication</Bold> (like chat, gaming).
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced SSE Patterns
        </Title>

        <PlainText>
          Expert-level SSE patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. SSE with authentication
function connectWithAuth(url, token) {
  const eventSource = new EventSource(url, {
    withCredentials: true,
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
  
  // Some browsers don't support headers in EventSource
  // Alternative: Add token as URL parameter
  const urlWithToken = \`\${url}?token=\${token}\`;
  return new EventSource(urlWithToken);
}

// 2. SSE with retry and backoff
class ResilientSSE {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.isConnected = false;
    this.retryCount = 0;
    this.maxRetries = 10;
    this.baseDelay = 1000;
    this.maxDelay = 30000;
    this.shouldRetry = true;
  }
  
  connect() {
    try {
      this.eventSource = new EventSource(this.url);
      
      this.eventSource.onopen = () => {
        this.isConnected = true;
        this.retryCount = 0;
        console.log('SSE connected');
      };
      
      this.eventSource.onerror = (error) => {
        this.isConnected = false;
        console.error('SSE error:', error);
        this.eventSource.close();
        this.handleRetry();
      };
    } catch (error) {
      console.error('Connection failed:', error);
      this.handleRetry();
    }
  }
  
  handleRetry() {
    if (!this.shouldRetry) return;
    
    this.retryCount++;
    if (this.retryCount > this.maxRetries) {
      console.error('Max retries reached');
      return;
    }
    
    const delay = Math.min(
      this.baseDelay * Math.pow(1.5, this.retryCount),
      this.maxDelay
    );
    
    console.log(\`Reconnecting in \${delay}ms (attempt \${this.retryCount})\`);
    setTimeout(() => this.connect(), delay);
  }
  
  onMessage(callback) {
    if (this.eventSource) {
      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          callback(data);
        } catch {
          callback(event.data);
        }
      };
    }
  }
  
  close() {
    this.shouldRetry = false;
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

// 3. SSE with heartbeat (keep-alive)
class HeartbeatSSE {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.heartbeatInterval = null;
    this.lastHeartbeat = Date.now();
    this.heartbeatTimeout = 30000;
    this.timeoutId = null;
  }
  
  connect() {
    this.eventSource = new EventSource(this.url);
    
    this.eventSource.onmessage = (event) => {
      if (event.data === 'heartbeat') {
        this.lastHeartbeat = Date.now();
        this.resetTimeout();
      } else {
        // Process regular messages
        this.handleMessage(event.data);
      }
    };
    
    this.startHeartbeatMonitor();
  }
  
  startHeartbeatMonitor() {
    this.timeoutId = setInterval(() => {
      const timeSinceLastHeartbeat = Date.now() - this.lastHeartbeat;
      if (timeSinceLastHeartbeat > this.heartbeatTimeout) {
        console.warn('Heartbeat timeout, reconnecting...');
        this.reconnect();
      }
    }, 5000);
  }
  
  resetTimeout() {
    // Reset timeout logic
  }
  
  reconnect() {
    this.eventSource.close();
    this.connect();
  }
}

// 4. SSE with event replay
class SSEReplay {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
    this.messageHistory = [];
    this.maxHistory = 100;
  }
  
  connect(lastEventId = null) {
    const url = this.url + (lastEventId ? \`?lastEventId=\${lastEventId}\` : '');
    this.eventSource = new EventSource(url);
    
    this.eventSource.onmessage = (event) => {
      const message = {
        id: event.lastEventId,
        data: event.data,
        timestamp: Date.now()
      };
      
      this.messageHistory.push(message);
      if (this.messageHistory.length > this.maxHistory) {
        this.messageHistory.shift();
      }
      
      this.handleMessage(message);
    };
  }
  
  getHistory() {
    return this.messageHistory;
  }
  
  replayFrom(eventId) {
    const messages = this.messageHistory
      .filter(msg => msg.id > eventId)
      .map(msg => msg.data);
    
    messages.forEach(data => this.handleMessage(data));
  }
}

// 5. SSE with compression
function createCompressedSSE(url) {
  return new EventSource(url, {
    headers: {
      'Accept-Encoding': 'gzip, deflate'
    }
  });
}`}
          language="javascript"
          title="sse-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 SSE Best Practices">
          <PlainText component="div">
            • <Bold>Use proper headers</Bold> for SSE (text/event-stream)<br />
            • <Bold>Implement reconnection</Bold> logic with backoff<br />
            • <Bold>Use heartbeat</Bold> to detect connection drops<br />
            • <Bold>Handle errors</Bold> gracefully<br />
            • <Bold>Manage memory</Bold> with message limits<br />
            • <Bold>Use JSON</Bold> for structured data<br />
            • <Bold>Implement authentication</Bold> for secure connections
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Server-Sent Events are <Bold>underrated</Bold> but <Bold>powerful</Bold>. They're <Bold>simpler than WebSockets</Bold> for one-way communication and <Bold>automatically handle reconnection</Bold>. Use them for real-time updates in dashboards, notifications, and live feeds.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> SSE is a <Bold>simple, reliable</Bold> way to implement real-time updates. It's <Bold>easier</Bold> than WebSockets and <Bold>perfect</Bold> for server-to-client communication.
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
            <>SSE enables <Bold>real-time server-to-client updates</Bold></>,
            <>Uses <Bold>standard HTTP</Bold> and works through firewalls</>,
            <>Provides <Bold>auto-reconnection</Bold> by default</>,
            <>Supports <Bold>custom event types</Bold> for different messages</>,
            <>Simple <Bold>EventSource API</Bold> on the client side</>,
            <>Works with <Bold>JSON data</Bold> for structured communication</>,
            <>Ideal for <Bold>notifications</Bold>, <Bold>feeds</Bold>, <Bold>dashboards</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use SSE when you need <Bold>one-way real-time updates</Bold> from the server. It's <Bold>simpler</Bold> and more <Bold>reliable</Bold> than WebSockets for many use cases.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Server-Sent Events are a <Bold>powerful tool</Bold> for real-time web applications. They're <Bold>easy to implement</Bold> and <Bold>work everywhere</Bold> modern browsers do!
      </Note>
    </QuestionWrapper>
  );
}