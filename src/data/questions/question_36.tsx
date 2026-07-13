// data/questions/Question36.tsx
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
  TableComponent,
  UnorderedList,
} from "../../components/content";
import { question36Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question36({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question36Meta.id}
      title={question36Meta.title}
      definition={question36Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>IndexedDB</Bold> is a <Bold>low-level API</Bold> for storing large amounts of structured data in the browser. It's a <Bold>NoSQL database</Bold> that allows you to store and retrieve data asynchronously, supporting <Bold>indexes</Bold>, <Bold>transactions</Bold>, and <Bold>complex queries</Bold>.
      </PlainText>

      <PlainText>
        IndexedDB is designed for <Bold>high-performance</Bold> data storage and is ideal for applications that need to work <Bold>offline</Bold> or handle <Bold>large datasets</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is IndexedDB?
        </Title>

        <PlainText>
          Think of IndexedDB like a <Bold>digital filing cabinet</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📁 Analogy">
          <PlainText>
            Imagine a filing cabinet with drawers (databases), folders (object stores), and labeled tabs (indexes). You can organize your documents (data) in a structured way, add labels to find them quickly, and access them even when you're offline.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic IndexedDB Example:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Open a database
const request = indexedDB.open('MyDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  
  // Create an object store
  if (!db.objectStoreNames.contains('users')) {
    const store = db.createObjectStore('users', { 
      keyPath: 'id', 
      autoIncrement: true 
    });
    
    // Create an index
    store.createIndex('name', 'name', { unique: false });
    store.createIndex('email', 'email', { unique: true });
  }
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('Database opened successfully!');
};

request.onerror = (event) => {
  console.error('Database error:', event.target.error);
};

// 2. Add data
function addUser(db, user) {
  const transaction = db.transaction(['users'], 'readwrite');
  const store = transaction.objectStore('users');
  const request = store.add(user);
  
  request.onsuccess = () => {
    console.log('User added successfully!');
  };
  
  request.onerror = () => {
    console.error('Failed to add user:', request.error);
  };
}

// 3. Get data
function getUser(db, id) {
  const transaction = db.transaction(['users'], 'readonly');
  const store = transaction.objectStore('users');
  const request = store.get(id);
  
  request.onsuccess = () => {
    console.log('User found:', request.result);
  };
}`}
          language="javascript"
          title="indexeddb-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> IndexedDB is <Bold>asynchronous</Bold> and <Bold>event-driven</Bold>. All operations happen through events and callbacks.
        </Note>

        <CardComponent variant="success" title="✅ Key Features">
          <PlainText component="div">
            • 📦 <Bold>Large Storage:</Bold> Stores hundreds of megabytes<br />
            • 🔍 <Bold>Indexes:</Bold> Fast lookups on specific fields<br />
            • 📝 <Bold>Transactions:</Bold> Atomic operations<br />
            • 🔄 <Bold>Asynchronous:</Bold> Doesn't block the main thread<br />
            • 🏠 <Bold>Offline Support:</Bold> Works without internet<br />
            • 🗂️ <Bold>Structured Data:</Bold> Stores objects and blobs
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
          Advanced: IndexedDB Patterns
        </Title>

        <PlainText>
          Advanced IndexedDB operations:
        </PlainText>

        <CodeComponent
          code={`// 1. CRUD Operations
class IndexedDBManager {
  constructor(dbName, version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
  }
  
  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        this.createStores();
      };
      
      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };
      
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
  
  createStores() {
    // Create users store
    if (!this.db.objectStoreNames.contains('users')) {
      const store = this.db.createObjectStore('users', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      store.createIndex('name', 'name');
      store.createIndex('email', 'email', { unique: true });
      store.createIndex('age', 'age');
    }
    
    // Create products store
    if (!this.db.objectStoreNames.contains('products')) {
      const store = this.db.createObjectStore('products', { 
        keyPath: 'id', 
        autoIncrement: true 
      });
      store.createIndex('category', 'category');
      store.createIndex('price', 'price');
    }
  }
  
  async add(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async get(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async update(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async delete(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async queryByIndex(storeName, indexName, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async getByRange(storeName, field, min, max) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(field);
      const range = IDBKeyRange.bound(min, max);
      const request = index.getAll(range);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// 2. Using the manager
async function example() {
  const db = new IndexedDBManager('MyApp', 1);
  await db.open();
  
  // Add data
  const userId = await db.add('users', {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  });
  
  // Get data
  const user = await db.get('users', userId);
  console.log('User:', user);
  
  // Query by index
  const johns = await db.queryByIndex('users', 'name', 'John Doe');
  console.log('Johns:', johns);
  
  // Range query
  const adults = await db.getByRange('users', 'age', 18, 65);
  console.log('Adults:', adults);
}`}
          language="javascript"
          title="indexeddb-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 IndexedDB vs Other Storage">
          <TableComponent
            headers={['Feature', 'IndexedDB', 'localStorage', 'Cookies']}
            rows={[
              ['Storage Size', '~500MB+', '~5-10MB', '~4KB'],
              ['Data Type', 'Any (objects, blobs)', 'Strings only', 'Strings'],
              ['Async/Sync', 'Async', 'Sync', 'Sync'],
              ['Indexes', '✅ Yes', '❌ No', '❌ No'],
              ['Transactions', '✅ Yes', '❌ No', '❌ No'],
              ['Query Support', '✅ Yes', '❌ No', '❌ No'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> IndexedDB operations are <Bold>asynchronous</Bold> and <Bold>event-based</Bold>. Always handle errors properly.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced IndexedDB Patterns
        </Title>

        <PlainText>
          Expert-level IndexedDB patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Batch operations with transactions
async function batchOperation(db, storeName, operations) {
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  
  const promises = operations.map((op) => {
    return new Promise((resolve, reject) => {
      let request;
      switch(op.type) {
        case 'add':
          request = store.add(op.data);
          break;
        case 'put':
          request = store.put(op.data);
          break;
        case 'delete':
          request = store.delete(op.id);
          break;
      }
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  });
  
  return Promise.all(promises);
}

// 2. Cursor-based iteration
async function iterateData(db, storeName, callback) {
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  const cursorRequest = store.openCursor();
  
  return new Promise((resolve, reject) => {
    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        callback(cursor.value, cursor.key);
        cursor.continue();
      } else {
        resolve();
      }
    };
    cursorRequest.onerror = () => reject(cursorRequest.error);
  });
}

// 3. Full-text search with IndexedDB
async function searchUsers(db, searchTerm) {
  const results = [];
  const transaction = db.transaction(['users'], 'readonly');
  const store = transaction.objectStore('users');
  const cursorRequest = store.openCursor();
  
  return new Promise((resolve, reject) => {
    cursorRequest.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const user = cursor.value;
        if (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(user);
        }
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    cursorRequest.onerror = () => reject(cursorRequest.error);
  });
}

// 4. IndexedDB with service worker
// In service worker
self.addEventListener('install', async (event) => {
  event.waitUntil(
    (async () => {
      const db = await openDB();
      await initializeData(db);
    })()
  );
});

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SWDatabase', 1);
    // ... setup
  });
}

// 5. Data migration with version upgrades
function upgradeDatabase(db, oldVersion, newVersion) {
  if (oldVersion < 2) {
    // Add new store
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings', { keyPath: 'key' });
    }
  }
  
  if (oldVersion < 3) {
    // Add indexes to existing stores
    const store = db.transaction.objectStore('users');
    store.createIndex('createdAt', 'createdAt');
  }
}

// 6. Performance optimization
// Use compound indexes for complex queries
store.createIndex('name_age', ['name', 'age']);

// Use getAll for better performance than cursor
const allUsers = await store.getAll();

// Batch operations in a single transaction
const transaction = db.transaction(['users'], 'readwrite');
// Add multiple items
transaction.oncomplete = () => console.log('All operations complete');

// 7. Error handling strategy
async function safeIndexedDB(operation) {
  try {
    return await operation();
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
      // Handle quota exceeded
    } else if (error.name === 'VersionError') {
      console.error('Database version mismatch');
      // Handle version error
    } else {
      console.error('IndexedDB error:', error);
    }
    throw error;
  }
}`}
          language="javascript"
          title="indexeddb-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Best Practices">
          <PlainText component="div">
            • <Bold>Batch Operations:</Bold> Use transactions for multiple operations<br />
            • <Bold>Use Indexes:</Bold> Create indexes for frequently queried fields<br />
            • <Bold>Limit Data:</Bold> Don't store unnecessary data<br />
            • <Bold>Clean Up:</Bold> Delete expired or unused data<br />
            • <Bold>Version Management:</Bold> Plan database version upgrades<br />
            • <Bold>Error Handling:</Bold> Implement robust error recovery
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> IndexedDB is the <Bold>most powerful client-side storage</Bold> available. It's ideal for <Bold>offline-first applications</Bold>, <Bold>large datasets</Bold>, and <Bold>complex data structures</Bold>. However, it requires careful design and error handling.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> IndexedDB provides <Bold>powerful, scalable storage</Bold> for web applications. Master it for <Bold>offline-first experiences</Bold> and <Bold>data-intensive applications</Bold>.
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
            <>IndexedDB is a <Bold>NoSQL database</Bold> in the browser</>,
            <>Stores <Bold>large amounts</Bold> of structured data</>,
            <>Supports <Bold>indexes</Bold>, <Bold>transactions</Bold>, and <Bold>queries</Bold></>,
            <>Works <Bold>asynchronously</Bold> without blocking the main thread</>,
            <>Ideal for <Bold>offline applications</Bold> and <Bold>large datasets</Bold></>,
            <>More powerful than <Bold>localStorage</Bold> and <Bold>cookies</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use IndexedDB when you need to store <Bold>structured data</Bold> with <Bold>complex queries</Bold> and <Bold>large storage capacity</Bold>. For simple key-value data, consider using <Bold>localStorage</Bold> instead.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> IndexedDB is the <Bold>most powerful storage API</Bold> in the browser. It's essential for building <Bold>sophisticated, data-driven web applications</Bold>!
      </Note>
    </QuestionWrapper>
  );
}