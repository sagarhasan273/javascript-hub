// data/questions/Question46.tsx
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
  InlineCode,
  UnorderedList,
} from "../../components/content";
import { question46Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question46({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question46Meta.id}
      title={question46Meta.title}
      definition={question46Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>sessionStorage</Bold> provides the same methods as <Bold>localStorage</Bold>. These methods allow you to <Bold>store</Bold>, <Bold>retrieve</Bold>, <Bold>delete</Bold>, and <Bold>manage</Bold> data that persists only for the duration of the page session.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: sessionStorage Methods
        </Title>

        <PlainText>
          sessionStorage has <Bold>6 main methods</Bold> that are easy to use:
        </PlainText>

        <CodeComponent
          code={`// 1. setItem(key, value) - Store data
sessionStorage.setItem('username', 'JohnDoe');
sessionStorage.setItem('age', '30');
sessionStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }));

// 2. getItem(key) - Retrieve data
const username = sessionStorage.getItem('username');
const preferences = JSON.parse(sessionStorage.getItem('preferences'));

// 3. removeItem(key) - Delete specific item
sessionStorage.removeItem('age');

// 4. clear() - Delete all items
sessionStorage.clear();

// 5. key(index) - Get key by index
const firstKey = sessionStorage.key(0);

// 6. length - Get number of stored items
const itemCount = sessionStorage.length;`}
          language="javascript"
          title="sessionstorage-methods-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> All methods are <Bold>synchronous</Bold> and <Bold>blocking</Bold> operations.
        </Note>

        <CardComponent variant="success" title="✅ Quick Reference">
          <TableComponent
            headers={['Method', 'Description', 'Example']}
            rows={[
              ['setItem(key, value)', 'Store a value', 'setItem("name", "John")'],
              ['getItem(key)', 'Retrieve a value', 'getItem("name")'],
              ['removeItem(key)', 'Delete a value', 'removeItem("name")'],
              ['clear()', 'Delete all values', 'clear()'],
              ['key(index)', 'Get key by index', 'key(0)'],
              ['length', 'Number of items', 'length'],
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
          Advanced: Using sessionStorage Methods
        </Title>

        <PlainText>
          Advanced usage patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Storing complex data
const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

// Store as JSON
sessionStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const storedUser = JSON.parse(sessionStorage.getItem('user'));
console.log(storedUser.name); // John Doe

// 2. Checking if key exists
function hasItem(key) {
  return sessionStorage.getItem(key) !== null;
}

if (hasItem('username')) {
  console.log('Username exists');
}

// 3. Getting all keys
function getAllKeys() {
  const keys = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    keys.push(sessionStorage.key(i));
  }
  return keys;
}

console.log(getAllKeys());

// 4. Getting all data
function getAllData() {
  const data = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    data[key] = sessionStorage.getItem(key);
  }
  return data;
}

// 5. Safe storage operations
function safeSetItem(key, value) {
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded!');
      // Clear some space or notify user
    }
    return false;
  }
}

// 6. Batch operations
function batchSet(items) {
  Object.entries(items).forEach(([key, value]) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  });
}

function batchGet(keys) {
  return keys.reduce((result, key) => {
    const value = sessionStorage.getItem(key);
    if (value !== null) {
      result[key] = JSON.parse(value);
    }
    return result;
  }, {});
}`}
          language="javascript"
          title="sessionstorage-methods-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Method Comparison">
          <PlainText component="div">
            • <Bold>setItem:</Bold> Adds or updates a key-value pair<br />
            • <Bold>getItem:</Bold> Returns value or null if not found<br />
            • <Bold>removeItem:</Bold> Removes the specified key<br />
            • <Bold>clear:</Bold> Removes all key-value pairs<br />
            • <Bold>key:</Bold> Returns the key at the specified index<br />
            • <Bold>length:</Bold> Returns the number of stored items
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>sessionStorage</InlineCode> methods are <Bold>synchronous</Bold>, so they can block the main thread. Use them sparingly for large data operations.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced sessionStorage Patterns
        </Title>

        <PlainText>
          Expert-level usage patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. sessionStorage with expiration
function setItemWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}

function getItemWithExpiry(key) {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) return null;
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  if (now.getTime() > item.expiry) {
    sessionStorage.removeItem(key);
    return null;
  }
  
  return item.value;
}

// 2. Session storage manager
class SessionStorageManager {
  constructor() {
    this.prefix = 'app_';
  }
  
  getKey(key) {
    return \`\${this.prefix}\${key}\`;
  }
  
  set(key, value) {
    sessionStorage.setItem(this.getKey(key), JSON.stringify(value));
  }
  
  get(key) {
    const value = sessionStorage.getItem(this.getKey(key));
    return value ? JSON.parse(value) : null;
  }
  
  remove(key) {
    sessionStorage.removeItem(this.getKey(key));
  }
  
  clear() {
    const keysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => sessionStorage.removeItem(key));
  }
  
  getAll() {
    const data = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith(this.prefix)) {
        const actualKey = key.substring(this.prefix.length);
        const value = sessionStorage.getItem(key);
        data[actualKey] = JSON.parse(value);
      }
    }
    return data;
  }
}

// 3. Session storage with versioning
class VersionedSessionStorage {
  constructor(version = 1) {
    this.version = version;
    this.migrate();
  }
  
  migrate() {
    const currentVersion = sessionStorage.getItem('__version__');
    if (currentVersion !== String(this.version)) {
      this.runMigration();
      sessionStorage.setItem('__version__', String(this.version));
    }
  }
  
  runMigration() {
    // Migration logic
    const oldData = sessionStorage.getItem('old_data');
    if (oldData) {
      const transformed = this.transformData(oldData);
      sessionStorage.setItem('new_data', transformed);
      sessionStorage.removeItem('old_data');
    }
  }
  
  transformData(data) {
    // Transform data from old format to new
    return JSON.stringify(JSON.parse(data));
  }
}

// 4. Session storage with compression
function compressData(data) {
  const json = JSON.stringify(data);
  return btoa(encodeURIComponent(json));
}

function decompressData(compressed) {
  const json = decodeURIComponent(atob(compressed));
  return JSON.parse(json);
}

function setCompressed(key, value) {
  const compressed = compressData(value);
  sessionStorage.setItem(key, compressed);
}

function getCompressed(key) {
  const compressed = sessionStorage.getItem(key);
  if (!compressed) return null;
  return decompressData(compressed);
}

// 5. Session storage monitoring
function monitorSessionStorage() {
  const items = {};
  let totalSize = 0;
  
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    const size = key.length + value.length;
    totalSize += size;
    items[key] = {
      size: size,
      sizeKB: (size / 1024).toFixed(2),
      type: typeof JSON.parse(value)
    };
  }
  
  return {
    items,
    totalItems: sessionStorage.length,
    totalSize: totalSize,
    totalSizeKB: (totalSize / 1024).toFixed(2)
  };
}

// 6. Session storage event wrapper
class SessionStorageEvents {
  constructor() {
    this.listeners = new Map();
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === sessionStorage) {
        const callbacks = this.listeners.get(event.key);
        if (callbacks) {
          callbacks.forEach(callback => callback(event));
        }
      }
    });
  }
  
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key).push(callback);
    
    return () => {
      const callbacks = this.listeners.get(key);
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    };
  }
}`}
          language="javascript"
          title="sessionstorage-methods-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Considerations">
          <PlainText component="div">
            • <Bold>Synchronous:</Bold> All methods block the main thread<br />
            • <Bold>Memory:</Bold> Data stays in memory until tab closes<br />
            • <Bold>Size Limit:</Bold> ~5-10MB per origin<br />
            • <Bold>Best Practice:</Bold> Use for small, temporary data<br />
            • <Bold>Alternative:</Bold> IndexedDB for larger datasets
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> sessionStorage provides a <Bold>simple, synchronous API</Bold> for temporary data storage. While it's easy to use, be mindful of <Bold>performance implications</Bold> and <Bold>storage limits</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> sessionStorage has <Bold>6 main methods</Bold> that are easy to use. For complex applications, consider <Bold>wrappers</Bold> and <Bold>patterns</Bold> to add features like <Bold>expiration</Bold>, <Bold>versioning</Bold>, and <Bold>encryption</Bold>.
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
            <>sessionStorage has <Bold>6 methods</Bold>: setItem, getItem, removeItem, clear, key, length</>,
            <>All methods are <Bold>synchronous</Bold> and <Bold>blocking</Bold></>,
            <>Data is <Bold>cleared</Bold> when the tab or window closes</>,
            <>Use <Bold>JSON.stringify/parse</Bold> for objects and arrays</>,
            <>Always <Bold>handle errors</Bold> (QuotaExceededError)</>,
            <>Create <Bold>wrappers</Bold> for additional features (expiration, versioning)</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use a <Bold>wrapper class</Bold> around sessionStorage to add <Bold>expiration, namespacing, and error handling</Bold> without changing your application logic.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> sessionStorage methods are <Bold>simple yet powerful</Bold>. Use them wisely for temporary, tab-specific data!
      </Note>
    </QuestionWrapper>
  );
}