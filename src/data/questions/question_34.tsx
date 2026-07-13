// data/questions/Question34.tsx
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
import { question34Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question34({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question34Meta.id}
      title={question34Meta.title}
      definition={question34Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Service workers can <Bold>restart</Bold> at any time due to browser optimizations. To <Bold>persist and reuse information</Bold> across restarts, you need to use <Bold>persistent storage mechanisms</Bold> like <Bold>Cache Storage</Bold>, <Bold>IndexedDB</Bold>, or <Bold>localStorage</Bold>.
      </PlainText>

      <PlainText>
        The most reliable approaches are <Bold>IndexedDB</Bold> for complex data and <Bold>Cache Storage</Bold> for network responses. <Bold>localStorage</Bold> is available but limited to strings and <Bold>synchronous</Bold> operations.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Persisting Data in Service Workers
        </Title>

        <PlainText>
          Think of service worker restart like <Bold>restarting your computer</Bold>:
        </PlainText>

        <CardComponent variant="info" title="💾 Analogy">
          <PlainText>
            When you restart your computer, your applications close. To remember what you were doing, you save your work to a file on your hard drive. Similarly, service workers save their state to <Bold>persistent storage</Bold> so they can pick up where they left off.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Storage Options:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Cache Storage - Store network responses
const CACHE_NAME = 'my-cache-v1';

// Store data in cache
function storeInCache(key, data) {
  return caches.open(CACHE_NAME)
    .then(cache => {
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
      return cache.put(key, response);
    });
}

// Retrieve data from cache
function getFromCache(key) {
  return caches.open(CACHE_NAME)
    .then(cache => cache.match(key))
    .then(response => {
      if (response) {
        return response.json();
      }
      return null;
    });
}

// 2. localStorage - Simple key-value storage
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save:', error);
    return false;
  }
}

function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to retrieve:', error);
    return null;
  }
}

// 3. IndexedDB - Complex data storage
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyDatabase', 1);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('data')) {
        db.createObjectStore('data', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}`}
          language="javascript"
          title="persistence-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Service workers use <Bold>persistent storage</Bold> to maintain state across restarts. Choose the right storage based on your data needs.
        </Note>

        <CardComponent variant="success" title="✅ Storage Options Comparison">
          <PlainText component="div">
            • <Bold>Cache Storage:</Bold> Best for network responses and assets<br />
            • <Bold>IndexedDB:</Bold> Best for complex, large data sets<br />
            • <Bold>localStorage:</Bold> Best for simple, small data<br />
            • <Bold>Session Storage:</Bold> Not persistent (cleared on restart)
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
          Advanced: Persistence Patterns
        </Title>

        <PlainText>
          Advanced patterns for persisting data:
        </PlainText>

        <CodeComponent
          code={`// 1. Service worker with IndexedDB
class SWDatabase {
  constructor() {
    this.dbName = 'SWDatabase';
    this.version = 1;
    this.db = null;
    this.init();
  }
  
  async init() {
    this.db = await this.openDB();
  }
  
  openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create stores
        if (!db.objectStoreNames.contains('config')) {
          db.createObjectStore('config', { keyPath: 'key' });
        }
        
        if (!db.objectStoreNames.contains('data')) {
          db.createObjectStore('data', { keyPath: 'id', autoIncrement: true });
        }
        
        if (!db.objectStoreNames.contains('queue')) {
          const queueStore = db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
          queueStore.createIndex('timestamp', 'timestamp');
        }
      };
      
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }
  
  async get(key, store = 'config') {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(store, 'readonly');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.get(key);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async set(key, value, store = 'config') {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(store, 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.put({ key, value });
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async add(data, store = 'data') {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(store, 'readwrite');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.add(data);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async getAll(store = 'data') {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(store, 'readonly');
      const objectStore = transaction.objectStore(store);
      const request = objectStore.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// 2. Using the database in service worker
const db = new SWDatabase();

// Store state on install
self.addEventListener('install', async event => {
  event.waitUntil(
    (async () => {
      // Store initial state
      await db.set('version', '1.0.0');
      await db.set('installDate', Date.now());
      await db.set('lastUpdate', Date.now());
      
      // Store cache metadata
      await db.add({
        name: 'static-cache',
        version: 1,
        urls: ['/', '/index.html', '/styles.css']
      });
    })()
  );
});

// Restore state on activate
self.addEventListener('activate', async event => {
  event.waitUntil(
    (async () => {
      // Get previous state
      const version = await db.get('version');
      const lastUpdate = await db.get('lastUpdate');
      
      console.log(\`Restored state: version=\${version}, lastUpdate=\${lastUpdate}\`);
      
      // Restore any pending operations
      const pending = await db.getAll('queue');
      if (pending.length > 0) {
        console.log(\`Processing \${pending.length} pending operations\`);
        await processPendingOperations(pending);
      }
    })()
  );
});

// 3. Backup and restore mechanism
async function backupState() {
  const db = new SWDatabase();
  
  // Get all data
  const config = await db.getAll('config');
  const data = await db.getAll('data');
  const queue = await db.getAll('queue');
  
  // Store backup
  const backup = { config, data, queue, timestamp: Date.now() };
  await db.set('backup', backup);
  
  // Also store in cache as fallback
  const response = new Response(JSON.stringify(backup));
  await cache.put('/backup.json', response);
}

async function restoreFromBackup() {
  const db = new SWDatabase();
  const backup = await db.get('backup');
  
  if (backup) {
    // Restore data
    // Implementation depends on your data structure
    console.log('Restored from backup:', backup.timestamp);
    return backup;
  }
  
  return null;
}`}
          language="javascript"
          title="persistence-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Persistence Strategies">
          <PlainText component="div">
            • <Bold>State Restoration:</Bold> Load saved state on activation<br />
            • <Bold>Queue Persistence:</Bold> Store pending operations<br />
            • <Bold>Backup Mechanism:</Bold> Regular state backups<br />
            • <Bold>Version Management:</Bold> Track data versions<br />
            • <Bold>Error Recovery:</Bold> Handle storage failures<br />
            • <Bold>Cache Invalidation:</Bold> Update cached data
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Always handle <Bold>storage errors</Bold> gracefully. Implement <Bold>fallback mechanisms</Bold> when storage is unavailable.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Persistence Patterns
        </Title>

        <PlainText>
          Expert-level persistence patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Complete State Management System
class SWStateManager {
  constructor() {
    this.db = null;
    this.state = {};
    this.listeners = [];
    this.isRestored = false;
    this.init();
  }
  
  async init() {
    this.db = await this.openDB();
    await this.restoreState();
    this.isRestored = true;
  }
  
  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('SWStateDB', 2);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // State store
        if (!db.objectStoreNames.contains('state')) {
          const stateStore = db.createObjectStore('state', { keyPath: 'key' });
          stateStore.createIndex('updated', 'updated');
        }
        
        // History store
        if (!db.objectStoreNames.contains('history')) {
          const historyStore = db.createObjectStore('history', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          historyStore.createIndex('timestamp', 'timestamp');
          historyStore.createIndex('action', 'action');
        }
        
        // Queue store
        if (!db.objectStoreNames.contains('queue')) {
          const queueStore = db.createObjectStore('queue', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          queueStore.createIndex('status', 'status');
          queueStore.createIndex('created', 'created');
        }
      };
      
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });
  }
  
  async restoreState() {
    try {
      // Get all state entries
      const transaction = this.db.transaction('state', 'readonly');
      const store = transaction.objectStore('state');
      const allStates = await this.getAll(store);
      
      // Restore state
      allStates.forEach(item => {
        this.state[item.key] = item.value;
      });
      
      // Check for pending queue items
      const queueItems = await this.getPendingQueue();
      if (queueItems.length > 0) {
        console.log(\`Restored \${queueItems.length} queue items\`);
        await this.processQueue(queueItems);
      }
      
      console.log('State restored successfully');
    } catch (error) {
      console.error('Failed to restore state:', error);
      // Use default state
      this.state = this.getDefaultState();
    }
  }
  
  async getPendingQueue() {
    const transaction = this.db.transaction('queue', 'readonly');
    const store = transaction.objectStore('queue');
    const index = store.index('status');
    const request = index.getAll('pending');
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async processQueue(queueItems) {
    for (const item of queueItems) {
      try {
        await this.processQueueItem(item);
        await this.updateQueueStatus(item.id, 'processed');
      } catch (error) {
        console.error('Failed to process queue item:', error);
        await this.updateQueueStatus(item.id, 'failed', error.message);
      }
    }
  }
  
  async updateQueueStatus(id, status, error = null) {
    const transaction = this.db.transaction('queue', 'readwrite');
    const store = transaction.objectStore('queue');
    const request = store.get(id);
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const item = request.result;
        item.status = status;
        if (error) item.error = error;
        item.updated = Date.now();
        store.put(item);
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  }
  
  async setState(key, value) {
    this.state[key] = value;
    
    // Save to database
    const transaction = this.db.transaction('state', 'readwrite');
    const store = transaction.objectStore('state');
    store.put({
      key: key,
      value: value,
      updated: Date.now()
    });
    
    // Add to history
    await this.addHistory('setState', { key, value });
    
    // Notify listeners
    this.notifyListeners();
  }
  
  async addHistory(action, data) {
    const transaction = this.db.transaction('history', 'readwrite');
    const store = transaction.objectStore('history');
    store.add({
      action,
      data,
      timestamp: Date.now()
    });
  }
  
  getState(key) {
    return this.state[key];
  }
  
  getAllState() {
    return { ...this.state };
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
  
  getDefaultState() {
    return {
      version: '1.0.0',
      lastSync: null,
      pendingSync: false
    };
  }
}

// 2. Using the state manager in service worker
const stateManager = new SWStateManager();

self.addEventListener('install', async event => {
  event.waitUntil(
    (async () => {
      await stateManager.setState('installed', true);
      await stateManager.setState('installDate', Date.now());
      await stateManager.setState('version', '1.0.0');
    })()
  );
});

self.addEventListener('activate', async event => {
  event.waitUntil(
    (async () => {
      // Check if we have pending sync
      const pendingSync = await stateManager.getState('pendingSync');
      if (pendingSync) {
        console.log('Restoring pending sync...');
        await performSync();
        await stateManager.setState('pendingSync', false);
      }
    })()
  );
});

// 3. Periodic state backup
async function createPeriodicBackup() {
  const state = stateManager.getAllState();
  const backup = {
    state,
    timestamp: Date.now(),
    version: '1.0'
  };
  
  // Store in cache
  const response = new Response(JSON.stringify(backup), {
    headers: { 'Content-Type': 'application/json' }
  });
  await cache.put('/backup/state.json', response);
  
  // Store in IndexedDB
  await stateManager.setState('lastBackup', backup);
}

// 4. Recovery from backup
async function recoverFromBackup() {
  try {
    // Try to get from cache first
    const cache = await caches.open('backup-cache');
    const response = await cache.match('/backup/state.json');
    
    if (response) {
      const backup = await response.json();
      return backup;
    }
    
    // Fallback to IndexedDB
    const backup = await stateManager.getState('lastBackup');
    if (backup) {
      return backup;
    }
    
    return null;
  } catch (error) {
    console.error('Recovery failed:', error);
    return null;
  }
}

// 5. Data version migration
async function migrateData(fromVersion, toVersion) {
  if (fromVersion === toVersion) return;
  
  console.log(\`Migrating from \${fromVersion} to \${toVersion}\`);
  
  // Perform migration steps
  const state = await stateManager.getAllState();
  
  switch(fromVersion) {
    case '1.0.0':
      // Migrate from 1.0.0 to 1.1.0
      state.dataFormat = 'v2';
      break;
    case '1.1.0':
      // Migrate from 1.1.0 to 2.0.0
      state.cacheVersion = 2;
      break;
  }
  
  // Save migrated state
  await stateManager.setState('migrated', true);
  await stateManager.setState('dataVersion', toVersion);
}`}
          language="javascript"
          title="persistence-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Persistence Best Practices">
          <PlainText component="div">
            • <Bold>Use IndexedDB</Bold> for complex, structured data<br />
            • <Bold>Use Cache Storage</Bold> for network responses and assets<br />
            • <Bold>Implement Versioning</Bold> for data migrations<br />
            • <Bold>Handle Errors</Bold> gracefully with fallbacks<br />
            • <Bold>Queue Operations</Bold> for offline scenarios<br />
            • <Bold>Backup Regularly</Bold> to prevent data loss
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>IndexedDB</Bold> for large, complex data sets</>,
              <>Implement <Bold>queue-based persistence</Bold> for offline operations</>,
              <>Use <Bold>version management</Bold> for data migrations</>,
              <>Implement <Bold>backup and recovery</Bold> mechanisms</>,
              <>Use <Bold>state managers</Bold> for complex applications</>,
              <>Monitor <Bold>storage usage</Bold> to avoid quota limits</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Building <Bold>resilient service workers</Bold> requires careful attention to <Bold>persistence</Bold>. By using <Bold>multiple storage mechanisms</Bold> and implementing <Bold>proper recovery strategies</Bold>, you can ensure your service worker <Bold>survives restarts</Bold> and <Bold>maintains state</Bold> reliably.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Persistence is <Bold>essential</Bold> for reliable service workers. Use <Bold>IndexedDB</Bold> for complex data, <Bold>Cache Storage</Bold> for network responses, and implement <Bold>proper recovery strategies</Bold> to handle restarts gracefully.
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
            <>Use <Bold>IndexedDB</Bold> for complex, structured data</>,
            <>Use <Bold>Cache Storage</Bold> for network responses</>,
            <>Use <Bold>localStorage</Bold> for simple key-value data</>,
            <>Implement <Bold>state restoration</Bold> on activation</>,
            <>Use <Bold>queues</Bold> for pending operations</>,
            <>Implement <Bold>backup and recovery</Bold> mechanisms</>,
            <>Handle <Bold>storage errors</Bold> gracefully</>,
            <>Use <Bold>version management</Bold> for data migrations</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Design your persistence layer to handle <Bold>failures gracefully</Bold>. Always have <Bold>fallback mechanisms</Bold> and <Bold>recovery strategies</Bold> in place.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Service workers restart frequently. Use <Bold>persistent storage</Bold> to maintain state and provide <Bold>reliable, consistent experiences</Bold>!
      </Note>
    </QuestionWrapper>
  );
}