// data/questions/Question37.tsx
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
import { question37Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question37({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question37Meta.id}
      title={question37Meta.title}
      definition={question37Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Web Storage</Bold> is a <Bold>client-side storage API</Bold> that allows web applications to store data <Bold>persistently</Bold> in the user's browser. It comes in two flavors: <Bold>localStorage</Bold> and <Bold>sessionStorage</Bold>.
      </PlainText>

      <PlainText>
        Web Storage is <Bold>synchronous</Bold>, <Bold>key-value</Bold> based, and can store <Bold>up to 5-10MB</Bold> of data per domain. It's widely supported and easy to use.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is Web Storage?
        </Title>

        <PlainText>
          Think of web storage like <Bold>post-it notes</Bold> on your browser:
        </PlainText>

        <CardComponent variant="info" title="📝 Analogy">
          <PlainText>
            Imagine you have two types of post-it notes. One type stays on your desk until you remove it (localStorage - persists). Another type gets thrown away when you leave your desk (sessionStorage - cleared when the tab closes). Both hold small amounts of information you want to remember.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Web Storage Types:</Bold>
        </PlainText>

        <CodeComponent
          code={`// localStorage - persists until manually cleared
// Store data
localStorage.setItem('username', 'JohnDoe');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark', fontSize: 16 }));

// Get data
const username = localStorage.getItem('username');
const preferences = JSON.parse(localStorage.getItem('preferences'));

// Remove data
localStorage.removeItem('username');

// Clear all data
localStorage.clear();

// sessionStorage - cleared when tab/window is closed
sessionStorage.setItem('sessionId', 'abc123');
sessionStorage.setItem('formData', JSON.stringify({ name: 'John', email: 'john@example.com' }));

// Get session data
const sessionId = sessionStorage.getItem('sessionId');
const formData = JSON.parse(sessionStorage.getItem('formData'));

// Remove session data
sessionStorage.removeItem('sessionId');

// Key differences
console.log(localStorage.length); // Number of items
console.log(sessionStorage.key(0)); // Get key by index

// Events - listen for storage changes
window.addEventListener('storage', (event) => {
  console.log('Storage changed:', event.key, event.newValue, event.oldValue);
});`}
          language="javascript"
          title="webstorage-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> <InlineCode>localStorage</InlineCode> persists until manually cleared, while <InlineCode>sessionStorage</InlineCode> clears when the tab closes.
        </Note>

        <CardComponent variant="success" title="✅ Web Storage Features">
          <PlainText component="div">
            • 📦 <Bold>Simple API:</Bold> Easy to use get/set methods<br />
            • 🔄 <Bold>Synchronous:</Bold> Operations are blocking<br />
            • 💾 <Bold>5-10MB:</Bold> Storage capacity per domain<br />
            • 🏠 <Bold>Persistent:</Bold> Data survives page reloads<br />
            • 🔑 <Bold>Key-Value:</Bold> Simple key-value pair storage<br />
            • 📊 <Bold>String Only:</Bold> Values are stored as strings
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
          Advanced web storage patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Storage wrapper with expiration
class StorageWrapper {
  constructor(storage) {
    this.storage = storage;
  }
  
  setItem(key, value, ttl = null) {
    const data = {
      value: value,
      timestamp: Date.now(),
      ttl: ttl
    };
    this.storage.setItem(key, JSON.stringify(data));
  }
  
  getItem(key) {
    const raw = this.storage.getItem(key);
    if (!raw) return null;
    
    const data = JSON.parse(raw);
    if (data.ttl && Date.now() - data.timestamp > data.ttl) {
      this.storage.removeItem(key);
      return null;
    }
    
    return data.value;
  }
  
  removeItem(key) {
    this.storage.removeItem(key);
  }
  
  clear() {
    this.storage.clear();
  }
}

// Usage
const localStorageWithTTL = new StorageWrapper(localStorage);
localStorageWithTTL.setItem('token', 'abc123', 3600000); // Expires in 1 hour
const token = localStorageWithTTL.getItem('token');

// 2. Storage event handling
function setupStorageSync(tabId) {
  window.addEventListener('storage', (event) => {
    if (event.key === 'sharedData') {
      // Update UI or state
      const data = JSON.parse(event.newValue);
      updateUI(data);
    }
  });
}

// 3. Namespaced storage
class NamespacedStorage {
  constructor(namespace, storage = localStorage) {
    this.namespace = namespace;
    this.storage = storage;
  }
  
  getKey(key) {
    return \`\${this.namespace}_\${key}\`;
  }
  
  setItem(key, value) {
    this.storage.setItem(this.getKey(key), JSON.stringify(value));
  }
  
  getItem(key) {
    const value = this.storage.getItem(this.getKey(key));
    return value ? JSON.parse(value) : null;
  }
  
  removeItem(key) {
    this.storage.removeItem(this.getKey(key));
  }
  
  clear() {
    // Only clear items with this namespace
    const keysToRemove = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key.startsWith(this.namespace + '_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => this.storage.removeItem(key));
  }
}

// 4. Storage with encryption (basic)
class EncryptedStorage {
  constructor(storage, secret) {
    this.storage = storage;
    this.secret = secret;
  }
  
  setItem(key, value) {
    const encrypted = btoa(encodeURIComponent(JSON.stringify(value)));
    this.storage.setItem(key, encrypted);
  }
  
  getItem(key) {
    const encrypted = this.storage.getItem(key);
    if (!encrypted) return null;
    try {
      const decoded = decodeURIComponent(atob(encrypted));
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}

// 5. Storage quota management
function getStorageUsage() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    total += key.length + value.length;
  }
  return total;
}

function checkStorageQuota() {
  const used = getStorageUsage();
  const max = 5 * 1024 * 1024; // 5MB
  const percent = (used / max) * 100;
  console.log(\`Storage used: \${(used / 1024 / 1024).toFixed(2)}MB (\${percent.toFixed(1)}%)\`);
  
  if (percent > 80) {
    console.warn('Storage is getting full!');
    return false;
  }
  return true;
}`}
          language="javascript"
          title="webstorage-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Web Storage Comparison">
          <TableComponent
            headers={['Feature', 'localStorage', 'sessionStorage']}
            rows={[
              ['Persistence', 'Until manually cleared', 'Until tab closes'],
              ['Scope', 'All tabs', 'Single tab'],
              ['Shared across tabs', '✅ Yes', '❌ No'],
              ['Storage limit', '5-10MB', '5-10MB'],
              ['Data type', 'Strings only', 'Strings only'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Web Storage only stores <Bold>strings</Bold>. Use <InlineCode>JSON.stringify()</InlineCode> and <InlineCode>JSON.parse()</InlineCode> for objects.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Storage Patterns
        </Title>

        <PlainText>
          Expert-level storage patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Storage with schema validation
class SchemaStorage {
  constructor(schema, storage = localStorage) {
    this.schema = schema;
    this.storage = storage;
  }
  
  validate(key, value) {
    if (!this.schema[key]) return false;
    const type = this.schema[key];
    if (type === 'string' && typeof value !== 'string') return false;
    if (type === 'number' && typeof value !== 'number') return false;
    if (type === 'boolean' && typeof value !== 'boolean') return false;
    if (type === 'object' && typeof value !== 'object') return false;
    return true;
  }
  
  setItem(key, value) {
    if (!this.validate(key, value)) {
      throw new Error(\`Invalid data type for key: \${key}\`);
    }
    this.storage.setItem(key, JSON.stringify(value));
  }
  
  getItem(key) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}

// 2. Storage with versioning
class VersionedStorage {
  constructor(version, storage = localStorage) {
    this.version = version;
    this.storage = storage;
    this.migrate();
  }
  
  migrate() {
    const currentVersion = this.storage.getItem('__version__');
    if (currentVersion !== this.version) {
      // Perform migration
      this.migrateData(currentVersion);
      this.storage.setItem('__version__', this.version);
    }
  }
  
  migrateData(fromVersion) {
    // Migration logic
    if (fromVersion === '1.0.0') {
      // Migrate from 1.0.0 to 2.0.0
      // Transform data
    }
  }
}

// 3. Reactive storage
class ReactiveStorage {
  constructor(storage = localStorage) {
    this.storage = storage;
    this.listeners = new Map();
  }
  
  setItem(key, value) {
    const oldValue = this.storage.getItem(key);
    this.storage.setItem(key, JSON.stringify(value));
    this.notify(key, value, oldValue);
  }
  
  getItem(key) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
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
  
  notify(key, newValue, oldValue) {
    const callbacks = this.listeners.get(key);
    if (callbacks) {
      callbacks.forEach(callback => callback(newValue, oldValue));
    }
  }
}

// 4. Storage with compression
function compressData(data) {
  // Simple compression - base64 encode
  const json = JSON.stringify(data);
  return btoa(encodeURIComponent(json));
}

function decompressData(compressed) {
  const json = decodeURIComponent(atob(compressed));
  return JSON.parse(json);
}

class CompressedStorage {
  constructor(storage = localStorage) {
    this.storage = storage;
  }
  
  setItem(key, value) {
    const compressed = compressData(value);
    this.storage.setItem(key, compressed);
  }
  
  getItem(key) {
    const compressed = this.storage.getItem(key);
    if (!compressed) return null;
    return decompressData(compressed);
  }
}

// 5. Storage with default values
function getWithDefault(key, defaultValue) {
  const value = localStorage.getItem(key);
  if (value === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(value);
}

// 6. Storage monitoring
class StorageMonitor {
  constructor(storage = localStorage) {
    this.storage = storage;
    this.metrics = {
      reads: 0,
      writes: 0,
      errors: 0
    };
  }
  
  getItem(key) {
    this.metrics.reads++;
    try {
      return this.storage.getItem(key);
    } catch (error) {
      this.metrics.errors++;
      throw error;
    }
  }
  
  setItem(key, value) {
    this.metrics.writes++;
    try {
      this.storage.setItem(key, value);
    } catch (error) {
      this.metrics.errors++;
      throw error;
    }
  }
  
  getMetrics() {
    return { ...this.metrics };
  }
}`}
          language="javascript"
          title="webstorage-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Tips">
          <PlainText component="div">
            • <Bold>Batch Operations:</Bold> Minimize storage calls<br />
            • <Bold>Compress Data:</Bold> Reduce storage usage<br />
            • <Bold>Use Schema:</Bold> Validate data structure<br />
            • <Bold>Monitor Usage:</Bold> Track storage consumption<br />
            • <Bold>Handle Errors:</Bold> Quota exceeded, security errors<br />
            • <Bold>Version Data:</Bold> Handle schema changes
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Web Storage is <Bold>simple and effective</Bold> for small amounts of data. However, for <Bold>complex applications</Bold>, consider using <Bold>IndexedDB</Bold> for more powerful features and larger storage capacity.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Web Storage is <Bold>perfect</Bold> for simple key-value data like user preferences, session data, and small application state. It's <Bold>widely supported</Bold> and <Bold>easy to use</Bold>.
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
            <>Web Storage includes <Bold>localStorage</Bold> and <Bold>sessionStorage</Bold></>,
            <>Stores <Bold>key-value pairs</Bold> as strings</>,
            <><Bold>localStorage</Bold> persists until manually cleared</>,
            <><Bold>sessionStorage</Bold> clears when tab closes</>,
            <>Simple <Bold>synchronous API</Bold> (getItem, setItem, removeItem)</>,
            <>Limit of <Bold>5-10MB</Bold> per domain</>,
            <>Great for <Bold>user preferences</Bold>, <Bold>session data</Bold>, <Bold>caching</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use <Bold>localStorage</Bold> for data that needs to persist between sessions, and <Bold>sessionStorage</Bold> for temporary data that should be cleared when the user leaves.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Web Storage is <Bold>simple, powerful, and widely supported</Bold>. It's a great choice for storing small amounts of data in the browser!
      </Note>
    </QuestionWrapper>
  );
}