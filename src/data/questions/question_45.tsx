// data/questions/Question45.tsx
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
import { question45Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question45({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question45Meta.id}
      title={question45Meta.title}
      definition={question45Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Web Storage can be accessed using the <Bold>localStorage</Bold> and <Bold>sessionStorage</Bold> objects, which are available globally in the browser. Both provide a <Bold>simple key-value API</Bold> for storing string data.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Accessing Web Storage
        </Title>

        <PlainText>
          Think of web storage like a <Bold>simple notebook</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📓 Analogy">
          <PlainText>
            Imagine you have a notebook where you write down information. You can write a note (setItem), read a note (getItem), remove a note (removeItem), or erase everything (clear). localStorage is a permanent notebook, while sessionStorage is a notebook that gets thrown away when you leave the room.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Web Storage Operations:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Setting data
localStorage.setItem('username', 'JohnDoe');
localStorage.setItem('age', '30');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark', fontSize: 16 }));

// 2. Getting data
const username = localStorage.getItem('username');
const age = localStorage.getItem('age');
const preferences = JSON.parse(localStorage.getItem('preferences'));

// 3. Checking if data exists
if (localStorage.getItem('username') !== null) {
  console.log('Username exists:', localStorage.getItem('username'));
}

// 4. Removing data
localStorage.removeItem('age');

// 5. Clearing all data
localStorage.clear();

// 6. Getting the number of stored items
const count = localStorage.length;
console.log('Items stored:', count);

// 7. Getting all keys
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(key, value);
}

// 8. SessionStorage - same API, different persistence
sessionStorage.setItem('sessionId', 'abc123');
const sessionId = sessionStorage.getItem('sessionId');`}
          language="javascript"
          title="webstorage-access-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Both <InlineCode>localStorage</InlineCode> and <InlineCode>sessionStorage</InlineCode> use the <Bold>same API</Bold> - you just access them differently.
        </Note>

        <CardComponent variant="success" title="✅ Quick Reference">
          <PlainText component="div">
            • <Bold>setItem(key, value):</Bold> Store data<br />
            • <Bold>getItem(key):</Bold> Retrieve data<br />
            • <Bold>removeItem(key):</Bold> Delete a specific item<br />
            • <Bold>clear():</Bold> Delete all items<br />
            • <Bold>length:</Bold> Number of stored items<br />
            • <Bold>key(index):</Bold> Get key by index<br />
            • <Bold>JSON.stringify/parse:</Bold> Store objects/arrays
          </PlainText>
        </CardComponent>

        <CardComponent variant="warning" title="⚠️ Important Note">
          <PlainText>
            Web Storage only stores <Bold>strings</Bold>. Use <InlineCode>JSON.stringify()</InlineCode> and <InlineCode>JSON.parse()</InlineCode> for objects and arrays.
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
          Advanced: Web Storage Patterns
        </Title>

        <PlainText>
          Advanced patterns for accessing web storage:
        </PlainText>

        <CodeComponent
          code={`// 1. Storage wrapper with type safety
class StorageWrapper {
  constructor(storage) {
    this.storage = storage;
  }
  
  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  
  get(key, defaultValue = null) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  }
  
  remove(key) {
    this.storage.removeItem(key);
  }
  
  clear() {
    this.storage.clear();
  }
  
  has(key) {
    return this.storage.getItem(key) !== null;
  }
  
  keys() {
    const keys = [];
    for (let i = 0; i < this.storage.length; i++) {
      keys.push(this.storage.key(i));
    }
    return keys;
  }
  
  getAll() {
    const data = {};
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      const value = this.storage.getItem(key);
      data[key] = JSON.parse(value);
    }
    return data;
  }
}

// Usage
const localStorageWrapper = new StorageWrapper(localStorage);
localStorageWrapper.set('user', { name: 'John', age: 30 });
const user = localStorageWrapper.get('user');
console.log(user); // { name: 'John', age: 30 }

// 2. Storage with expiration
class ExpiringStorage {
  constructor(storage) {
    this.storage = storage;
  }
  
  set(key, value, ttl = null) { // ttl in milliseconds
    const data = {
      value: value,
      expires: ttl ? Date.now() + ttl : null
    };
    this.storage.setItem(key, JSON.stringify(data));
  }
  
  get(key) {
    const raw = this.storage.getItem(key);
    if (!raw) return null;
    
    const data = JSON.parse(raw);
    if (data.expires && Date.now() > data.expires) {
      this.storage.removeItem(key);
      return null;
    }
    
    return data.value;
  }
  
  remove(key) {
    this.storage.removeItem(key);
  }
}

// 3. Storage event listener
window.addEventListener('storage', (event) => {
  console.log('Storage changed:', {
    key: event.key,
    oldValue: event.oldValue,
    newValue: event.newValue,
    url: event.url,
    storageArea: event.storageArea
  });
  
  // Update UI when storage changes in another tab
  if (event.key === 'theme') {
    applyTheme(event.newValue);
  }
});

// 4. Sync across tabs
function syncAcrossTabs() {
  // Send message to other tabs
  localStorage.setItem('__message', JSON.stringify({
    type: 'UPDATE',
    payload: { data: 'Hello from tab!' },
    timestamp: Date.now()
  }));
  
  // Listen for messages
  window.addEventListener('storage', (event) => {
    if (event.key === '__message') {
      const message = JSON.parse(event.newValue);
      console.log('Received message:', message);
      // Process message
    }
  });
}

// 5. Safe storage access with try-catch
function safeStorageOperation(operation) {
  try {
    return operation();
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded!');
    } else if (error.name === 'SecurityError') {
      console.error('Storage access denied!');
    } else {
      console.error('Storage error:', error);
    }
    return null;
  }
}

// Usage
const data = safeStorageOperation(() => {
  return localStorage.getItem('user');
});`}
          language="javascript"
          title="webstorage-access-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Best Practices">
          <PlainText component="div">
            • <Bold>Always use try-catch:</Bold> Handle quota exceeded errors<br />
            • <Bold>Serialize objects:</Bold> Use JSON.stringify/parse<br />
            • <Bold>Check for availability:</Bold> Verify storage is available<br />
            • <Bold>Use wrapper functions:</Bold> Create reusable storage helpers<br />
            • <Bold>Listen for changes:</Bold> Use storage events for cross-tab sync
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>storage</InlineCode> events only fire in <Bold>other tabs</Bold> (not the tab that made the change). They're great for cross-tab synchronization.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Access Patterns
        </Title>

        <PlainText>
          Expert-level patterns for accessing web storage:
        </PlainText>

        <CodeComponent
          code={`// 1. Reactive storage - notify on changes
class ReactiveStorage {
  constructor(storage) {
    this.storage = storage;
    this.subscribers = new Map();
  }
  
  get(key) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  
  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
    this.notify(key, value);
  }
  
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }
    this.subscribers.get(key).push(callback);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(key);
      const index = callbacks.indexOf(callback);
      if (index > -1) callbacks.splice(index, 1);
    };
  }
  
  notify(key, value) {
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      callbacks.forEach(callback => callback(value));
    }
  }
}

// 2. Namespaced storage
class NamespacedStorage {
  constructor(namespace, storage = localStorage) {
    this.namespace = namespace;
    this.storage = storage;
  }
  
  getKey(key) {
    return \`\${this.namespace}:\${key}\`;
  }
  
  get(key) {
    const value = this.storage.getItem(this.getKey(key));
    return value ? JSON.parse(value) : null;
  }
  
  set(key, value) {
    this.storage.setItem(this.getKey(key), JSON.stringify(value));
  }
  
  remove(key) {
    this.storage.removeItem(this.getKey(key));
  }
  
  getAll() {
    const data = {};
    const prefix = this.namespace + ':';
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key.startsWith(prefix)) {
        const actualKey = key.substring(prefix.length);
        const value = this.storage.getItem(key);
        data[actualKey] = JSON.parse(value);
      }
    }
    return data;
  }
  
  clear() {
    const keys = [];
    const prefix = this.namespace + ':';
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key.startsWith(prefix)) {
        keys.push(key);
      }
    }
    keys.forEach(key => this.storage.removeItem(key));
  }
}

// 3. Storage with migrations
class VersionedStorage {
  constructor(storage = localStorage) {
    this.storage = storage;
    this.version = 2;
    this.migrate();
  }
  
  migrate() {
    const currentVersion = this.storage.getItem('__version__');
    if (currentVersion !== String(this.version)) {
      this.runMigrations(currentVersion);
      this.storage.setItem('__version__', String(this.version));
    }
  }
  
  runMigrations(fromVersion) {
    if (!fromVersion) {
      // Initial migration
      this.migrateFromV1();
    } else if (fromVersion === '1') {
      this.migrateFromV1toV2();
    }
  }
  
  migrateFromV1() {
    // Migrate old data structure to new
    const oldData = this.storage.getItem('settings');
    if (oldData) {
      const parsed = JSON.parse(oldData);
      // Transform data
      this.storage.setItem('settings', JSON.stringify({
        ...parsed,
        migrated: true,
        version: 2
      }));
    }
  }
  
  migrateFromV1toV2() {
    // Migrate from version 1 to 2
    // Additional migration logic
  }
}

// 4. Storage with compression
class CompressedStorage {
  constructor(storage = localStorage) {
    this.storage = storage;
  }
  
  compress(data) {
    const json = JSON.stringify(data);
    // Simple compression - could use LZString library
    return btoa(encodeURIComponent(json));
  }
  
  decompress(compressed) {
    const json = decodeURIComponent(atob(compressed));
    return JSON.parse(json);
  }
  
  set(key, value) {
    const compressed = this.compress(value);
    this.storage.setItem(key, compressed);
  }
  
  get(key) {
    const compressed = this.storage.getItem(key);
    if (!compressed) return null;
    return this.decompress(compressed);
  }
}

// 5. Storage with query capabilities
class QueryableStorage {
  constructor(storage = localStorage) {
    this.storage = storage;
  }
  
  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  
  get(key) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  
  query(condition) {
    const results = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      const value = this.get(key);
      if (condition(value, key)) {
        results.push({ key, value });
      }
    }
    return results;
  }
  
  find(predicate) {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      const value = this.get(key);
      if (predicate(value, key)) {
        return { key, value };
      }
    }
    return null;
  }
  
  filter(predicate) {
    return this.query(predicate);
  }
}

// 6. Storage with encryption
class EncryptedStorage {
  constructor(storage = localStorage, secret = 'default-secret') {
    this.storage = storage;
    this.secret = secret;
  }
  
  encrypt(data) {
    // Simple XOR encryption (for demonstration - use proper encryption)
    const json = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(json));
    // Add your encryption logic here
    return encoded;
  }
  
  decrypt(encrypted) {
    // Decrypt and parse
    const decoded = decodeURIComponent(atob(encrypted));
    return JSON.parse(decoded);
  }
  
  set(key, value) {
    const encrypted = this.encrypt(value);
    this.storage.setItem(key, encrypted);
  }
  
  get(key) {
    const encrypted = this.storage.getItem(key);
    if (!encrypted) return null;
    return this.decrypt(encrypted);
  }
}`}
          language="javascript"
          title="webstorage-access-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Security Considerations">
          <PlainText component="div">
            • <Bold>Never store sensitive data</Bold> like passwords, tokens, or personal info<br />
            • <Bold>XSS vulnerability:</Bold> JavaScript can read localStorage/sessionStorage<br />
            • <Bold>Encrypt data</Bold> if you must store sensitive information<br />
            • <Bold>Consider using HttpOnly cookies</Bold> for authentication tokens<br />
            • <Bold>Validate data</Bold> when reading from storage<br />
            • <Bold>Use CSP headers</Bold> to prevent XSS attacks
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>wrappers</Bold> to abstract storage implementation</>,
              <>Implement <Bold>fallback mechanisms</Bold> when storage is unavailable</>,
              <>Use <Bold>namespaces</Bold> to organize data</>,
              <>Implement <Bold>migrations</Bold> for data versioning</>,
              <>Add <Bold>expiration</Bold> for time-sensitive data</>,
              <>Use <Bold>storage events</Bold> for cross-tab communication</>,
              <>Consider <Bold>compression</Bold> for large data sets</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Web Storage provides a <Bold>simple yet powerful API</Bold> for client-side data persistence. By using <Bold>wrappers, namespaces, and event listeners</Bold>, you can build sophisticated storage solutions that are <Bold>maintainable</Bold> and <Bold>performant</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Accessing web storage is <Bold>straightforward</Bold> with the built-in API, but <Bold>wrappers and patterns</Bold> can make it more powerful, maintainable, and secure.
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
            <>Web Storage is accessed via <Bold>localStorage</Bold> and <Bold>sessionStorage</Bold></>,
            <>Both use the <Bold>same API</Bold>: setItem, getItem, removeItem, clear</>,
            <>Only <Bold>strings</Bold> can be stored - use JSON for complex data</>,
            <>Always <Bold>handle errors</Bold> (QuotaExceededError, SecurityError)</>,
            <>Use <Bold>storage events</Bold> for cross-tab communication</>,
            <>Implement <Bold>wrappers</Bold> for cleaner code and additional features</>,
            <>Never store <Bold>sensitive data</Bold> in web storage</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Create a <Bold>simple wrapper</Bold> around localStorage/sessionStorage early in your project. This makes it easy to add features like <Bold>expiration, encryption, or logging</Bold> without changing your entire codebase.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Web Storage is <Bold>simple but powerful</Bold>. Use it wisely, and it will make your applications <Bold>faster</Bold> and <Bold>more user-friendly</Bold>!
      </Note>
    </QuestionWrapper>
  );
}