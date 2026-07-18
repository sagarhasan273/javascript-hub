// data/questions/Question48.tsx
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
import { question48Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question48({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question48Meta.id}
      title={question48Meta.title}
      definition={question48Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Web Storage</Bold> is essential for modern web applications because it provides a <Bold>simple, persistent way</Bold> to store data on the client side. It enables <Bold>offline capabilities</Bold>, <Bold>better performance</Bold>, and <Bold>improved user experience</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Why We Need Web Storage
        </Title>

        <PlainText>
          Think of web storage like a <Bold>wallet</Bold> for your browser:
        </PlainText>

        <CardComponent variant="info" title="👛 Analogy">
          <PlainText>
            Imagine you're shopping online. Every time you reload the page, you'd have to re-enter all your information if the website didn't have a way to remember it. Web storage is like a wallet that keeps your preferences and information handy, so you don't have to start from scratch every time.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Key Reasons for Web Storage:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Save user preferences
// Without web storage - lost on reload
let theme = 'light'; // Lost when page reloads

// With web storage - persists
localStorage.setItem('theme', 'dark');
const savedTheme = localStorage.getItem('theme');

// 2. Remember user state
localStorage.setItem('lastVisit', new Date().toISOString());

// 3. Cache data for offline use
const cachedData = localStorage.getItem('userData');
if (!cachedData) {
  // Fetch from API
  fetch('/api/user')
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('userData', JSON.stringify(data));
    });
}

// 4. Save form progress
function saveFormProgress(data) {
  localStorage.setItem('formData', JSON.stringify(data));
}

// 5. Keep user logged in
// Store token for authentication
localStorage.setItem('authToken', token);`}
          language="javascript"
          title="webstorage-why-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Web Storage makes web apps <Bold>faster</Bold>, <Bold>more user-friendly</Bold>, and <Bold>works offline</Bold>.
        </Note>

        <CardComponent variant="success" title="✅ Benefits of Web Storage">
          <UnorderedList
            items={[
              <>🚀 <Bold>Performance:</Bold> Faster load times with cached data</>,
              <>📡 <Bold>Offline Support:</Bold> Work without internet</>,
              <>🎨 <Bold>Personalization:</Bold> Remember user preferences</>,
              <>💾 <Bold>State Management:</Bold> Save application state</>,
              <>🔄 <Bold>Reduced Server Load:</Bold> Cache data locally</>,
              <>📱 <Bold>Better UX:</Bold> Seamless user experience</>,
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Why Web Storage Matters
        </Title>

        <PlainText>
          Advanced reasons for using web storage:
        </PlainText>

        <CodeComponent
          code={`// 1. Performance optimization
function optimizePerformance() {
  // Cache expensive computations
  const result = localStorage.getItem('cachedResult');
  if (result) {
    return JSON.parse(result);
  }
  
  // Compute and cache
  const computed = expensiveCalculation();
  localStorage.setItem('cachedResult', JSON.stringify(computed));
  return computed;
}

// 2. Offline-first architecture
class OfflineFirstApp {
  constructor() {
    this.syncQueue = [];
    this.loadOfflineData();
    this.setupSync();
  }
  
  loadOfflineData() {
    const data = localStorage.getItem('offlineData');
    if (data) {
      this.offlineData = JSON.parse(data);
    }
  }
  
  setupSync() {
    // Sync when online
    window.addEventListener('online', () => {
      this.syncData();
    });
  }
  
  syncData() {
    // Sync offline changes with server
    while (this.syncQueue.length > 0) {
      const change = this.syncQueue.shift();
      this.sendToServer(change);
    }
  }
  
  saveData(data) {
    // Save locally first
    this.offlineData.push(data);
    localStorage.setItem('offlineData', JSON.stringify(this.offlineData));
    
    // Queue for sync
    this.syncQueue.push(data);
  }
}

// 3. Progressive Web App (PWA) support
function setupPWA() {
  // Cache assets for offline use
  const assets = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js'
  ];
  localStorage.setItem('cachedAssets', JSON.stringify(assets));
}

// 4. Reduce API calls
function cachedApiCall(url) {
  const cached = localStorage.getItem(\`api_cache_\${url}\`);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    // Cache for 5 minutes
    if (Date.now() - timestamp < 300000) {
      return Promise.resolve(data);
    }
  }
  
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem(\`api_cache_\${url}\`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      return data;
    });
}

// 5. User session management
class SessionManager {
  constructor() {
    this.sessionKey = 'sessionData';
    this.loadSession();
  }
  
  loadSession() {
    const data = localStorage.getItem(this.sessionKey);
    if (data) {
      this.session = JSON.parse(data);
    }
  }
  
  saveSession(data) {
    this.session = data;
    localStorage.setItem(this.sessionKey, JSON.stringify(data));
  }
  
  clearSession() {
    localStorage.removeItem(this.sessionKey);
  }
  
  isAuthenticated() {
    return this.session && this.session.token;
  }
}`}
          language="javascript"
          title="webstorage-why-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Business Benefits">
          <PlainText component="div">
            • <Bold>Cost Savings:</Bold> Reduced server bandwidth<br />
            • <Bold>User Retention:</Bold> Better offline experience<br />
            • <Bold>Performance:</Bold> Faster load times = happier users<br />
            • <Bold>Scalability:</Bold> Reduced server load<br />
            • <Bold>Reliability:</Bold> Works in offline scenarios<br />
            • <Bold>Competitive Advantage:</Bold> Modern app features
          </PlainText>
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Strategic Importance of Web Storage
        </Title>

        <PlainText>
          Expert-level understanding of web storage importance:
        </PlainText>

        <CodeComponent
          code={`// 1. Data persistence strategy
class DataPersistenceStrategy {
  constructor() {
    this.strategy = {
      'user_preferences': 'localStorage',
      'session_data': 'sessionStorage',
      'cache': 'localStorage',
      'temporary': 'sessionStorage'
    };
  }
  
  save(key, data) {
    const target = this.strategy[key] || 'localStorage';
    if (target === 'localStorage') {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  }
}

// 2. Migration from cookies to web storage
function migrateFromCookies() {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [key, value] = cookie.trim().split('=');
    if (!key.startsWith('session')) {
      localStorage.setItem(key, value);
    }
  });
}

// 3. Web storage with service workers
// service-worker.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Cache successful responses
          if (response.status === 200) {
            const clone = response.clone();
            caches.open('api-cache')
              .then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
  );
});

// 4. Data synchronization strategy
class SyncStrategy {
  constructor() {
    this.syncKey = 'syncData';
    this.loadSyncData();
  }
  
  loadSyncData() {
    const data = localStorage.getItem(this.syncKey);
    this.syncData = data ? JSON.parse(data) : { pending: [] };
  }
  
  addSyncOperation(operation) {
    this.syncData.pending.push(operation);
    this.saveSyncData();
  }
  
  saveSyncData() {
    localStorage.setItem(this.syncKey, JSON.stringify(this.syncData));
  }
  
  async performSync() {
    while (this.syncData.pending.length > 0) {
      const operation = this.syncData.pending[0];
      try {
        await this.executeOperation(operation);
        this.syncData.pending.shift();
        this.saveSyncData();
      } catch (error) {
        console.error('Sync failed:', error);
        break;
      }
    }
  }
}

// 5. Web storage as a database
class StorageDatabase {
  constructor() {
    this.tables = new Map();
    this.loadTables();
  }
  
  loadTables() {
    const data = localStorage.getItem('db');
    if (data) {
      const parsed = JSON.parse(data);
      Object.entries(parsed).forEach(([name, rows]) => {
        this.tables.set(name, rows);
      });
    }
  }
  
  createTable(name) {
    if (!this.tables.has(name)) {
      this.tables.set(name, []);
      this.saveTables();
    }
  }
  
  insert(tableName, row) {
    const table = this.tables.get(tableName);
    if (table) {
      const id = Date.now() + Math.random();
      const newRow = { ...row, id, createdAt: new Date().toISOString() };
      table.push(newRow);
      this.saveTables();
      return newRow;
    }
    throw new Error(\`Table \${tableName} not found\`);
  }
  
  query(tableName, filter) {
    const table = this.tables.get(tableName);
    if (!table) return [];
    return table.filter(filter);
  }
  
  saveTables() {
    const data = {};
    this.tables.forEach((rows, name) => {
      data[name] = rows;
    });
    localStorage.setItem('db', JSON.stringify(data));
  }
}`}
          language="javascript"
          title="webstorage-why-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Strategic Benefits">
          <PlainText component="div">
            • <Bold>Cost Efficiency:</Bold> Reduce server bandwidth costs<br />
            • <Bold>User Experience:</Bold> Faster, more responsive apps<br />
            • <Bold>Offline Capability:</Bold> Work without internet<br />
            • <Bold>Scalability:</Bold> Offload storage to client<br />
            • <Bold>Competitive Edge:</Bold> Modern app capabilities<br />
            • <Bold>Data Resilience:</Bold> Persist across sessions
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Web storage is <Bold>fundamental</Bold> to modern web applications. It enables <Bold>offline-first architectures</Bold>, <Bold>better performance</Bold>, and <Bold>improved user experience</Bold>. Understanding when and how to use it is <Bold>essential</Bold> for building competitive web applications.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Web storage is <Bold>not optional</Bold> for modern web applications. It's <Bold>essential</Bold> for performance, offline support, and user experience. Use it wisely to build <Bold>competitive, feature-rich applications</Bold>.
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
            <>Web storage <Bold>improves performance</Bold> by caching data</>,
            <>Enables <Bold>offline capabilities</Bold> for web apps</>,
            <>Saves <Bold>user preferences</Bold> and <Bold>settings</Bold></>,
            <>Reduces <Bold>server load</Bold> and <Bold>bandwidth</Bold></>,
            <>Provides <Bold>persistent state</Bold> across sessions</>,
            <>Essential for <Bold>PWA development</Bold></>,
            <>Improves <Bold>user experience</Bold> and <Bold>retention</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use web storage strategically - <Bold>localStorage</Bold> for persistent data, <Bold>sessionStorage</Bold> for temporary data, and <Bold>IndexedDB</Bold> for large datasets. This combination gives you the <Bold>best of all worlds</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Web storage is <Bold>essential</Bold> for building modern, competitive web applications. It's the <Bold>foundation</Bold> of offline-first, performant user experiences!
      </Note>
    </QuestionWrapper>
  );
}