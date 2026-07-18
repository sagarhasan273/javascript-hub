// data/questions/Question49.tsx
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
  TableComponent,
} from "../../components/content";
import { question49Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question49({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question49Meta.id}
      title={question49Meta.title}
      definition={question49Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Checking browser support for web storage is <Bold>essential</Bold> for building robust applications that work across different browsers. While modern browsers support web storage, it's <Bold>good practice</Bold> to check for availability and provide <Bold>fallbacks</Bold> when needed.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Checking Web Storage Support
        </Title>

        <PlainText>
          Checking web storage support is like <Bold>checking if a tool is available</Bold> before using it:
        </PlainText>

        <CardComponent variant="info" title="🔧 Analogy">
          <PlainText>
            Imagine you're working on a project and need a specific tool. Before you start, you check if the tool is available. If it is, you use it. If not, you use an alternative method. That's exactly what browser support checks do for web storage.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Support Check:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// 2. Check if sessionStorage is available
function isSessionStorageAvailable() {
  try {
    const test = '__storage_test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// 3. Simple check for both
function isWebStorageSupported() {
  return isLocalStorageAvailable() && isSessionStorageAvailable();
}

// 4. Usage with fallback
if (isLocalStorageAvailable()) {
  // Use localStorage
  localStorage.setItem('key', 'value');
} else {
  // Fallback to cookies or memory
  console.warn('localStorage not supported, using fallback');
}

// 5. Feature detection
if (typeof Storage !== 'undefined') {
  // Web storage is supported
  console.log('Web storage is supported');
} else {
  console.log('Web storage is not supported');
}`}
          language="javascript"
          title="webstorage-support-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Always use <Bold>try-catch</Bold> when checking web storage support because some browsers may throw errors (e.g., in private mode).
        </Note>

        <CardComponent variant="success" title="✅ Browser Support Check Methods">
          <PlainText component="div">
            • <Bold>typeof check:</Bold> <InlineCode>typeof Storage !== 'undefined'</InlineCode><br />
            • <Bold>try-catch:</Bold> Attempt to set/get an item<br />
            • <Bold>Feature detection:</Bold> Check for specific methods<br />
            • <Bold>Quota check:</Bold> Check storage capacity<br />
            • <Bold>Private mode check:</Bold> Safari private mode limitations
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
          Advanced: Comprehensive Support Checking
        </Title>

        <PlainText>
          Advanced support checking with fallbacks:
        </PlainText>

        <CodeComponent
          code={`// 1. Complete storage support check
function checkStorageSupport() {
  const support = {
    localStorage: false,
    sessionStorage: false,
    cookie: false,
    quota: false
  };
  
  // Check localStorage
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    support.localStorage = true;
    support.quota = true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      support.quota = false;
    }
  }
  
  // Check sessionStorage
  try {
    const test = '__test__';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    support.sessionStorage = true;
  } catch (e) {
    support.sessionStorage = false;
  }
  
  // Check cookies
  try {
    document.cookie = '__test__=test';
    support.cookie = document.cookie.indexOf('__test__') !== -1;
    document.cookie = '__test__=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  } catch (e) {
    support.cookie = false;
  }
  
  return support;
}

// 2. Storage with fallback
class FallbackStorage {
  constructor() {
    this.storage = this.getStorage();
  }
  
  getStorage() {
    try {
      localStorage.setItem('__test__', 'test');
      localStorage.removeItem('__test__');
      return localStorage;
    } catch {
      // Fallback to memory storage
      return new MemoryStorage();
    }
  }
  
  set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  
  get(key) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}

// 3. Memory storage fallback
class MemoryStorage {
  constructor() {
    this.data = new Map();
  }
  
  setItem(key, value) {
    this.data.set(key, String(value));
  }
  
  getItem(key) {
    return this.data.get(key) || null;
  }
  
  removeItem(key) {
    this.data.delete(key);
  }
  
  clear() {
    this.data.clear();
  }
  
  get length() {
    return this.data.size;
  }
  
  key(index) {
    const keys = Array.from(this.data.keys());
    return keys[index] || null;
  }
}

// 4. Private mode detection (Safari)
function isSafariPrivateMode() {
  try {
    localStorage.setItem('__test__', 'test');
    localStorage.removeItem('__test__');
    return false;
  } catch {
    return true;
  }
}

// 5. Storage quota check
function checkStorageQuota() {
  try {
    const test = 'x'.repeat(1024 * 1024); // 1MB
    localStorage.setItem('__quota_test__', test);
    localStorage.removeItem('__quota_test__');
    return { available: true, quota: 'unknown' };
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      return { available: false, reason: 'quota_exceeded' };
    }
    return { available: false, reason: e.message };
  }
}

// 6. Browser detection for storage support
function getStorageSupportInfo() {
  const info = {
    browser: navigator.userAgent,
    localStorage: false,
    sessionStorage: false,
    quota: 'unknown',
    privateMode: false
  };
  
  try {
    localStorage.setItem('__test__', 'test');
    localStorage.removeItem('__test__');
    info.localStorage = true;
  } catch (e) {
    info.privateMode = true;
  }
  
  try {
    sessionStorage.setItem('__test__', 'test');
    sessionStorage.removeItem('__test__');
    info.sessionStorage = true;
  } catch (e) {
    info.sessionStorage = false;
  }
  
  return info;
}`}
          language="javascript"
          title="webstorage-support-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Browser Support Table">
          <TableComponent
            headers={['Browser', 'localStorage', 'sessionStorage', 'Notes']}
            rows={[
              ['Chrome 4+', '✅ Yes', '✅ Yes', 'Full support'],
              ['Firefox 3.5+', '✅ Yes', '✅ Yes', 'Full support'],
              ['Safari 4+', '✅ Yes', '✅ Yes', 'Private mode issue'],
              ['Edge', '✅ Yes', '✅ Yes', 'Full support'],
              ['IE 8+', '✅ Yes', '✅ Yes', 'Limited quota'],
              ['Opera 10.5+', '✅ Yes', '✅ Yes', 'Full support'],
              ['Mobile Chrome', '✅ Yes', '✅ Yes', 'Full support'],
              ['Mobile Safari', '✅ Yes', '✅ Yes', 'Private mode issue'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Safari <Bold>private browsing</Bold> mode throws an error when trying to use localStorage. Always handle this case.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Support Patterns
        </Title>

        <PlainText>
          Expert-level support checking patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Storage support with polyfill
function setupStoragePolyfill() {
  if (!window.localStorage) {
    // Polyfill localStorage with memory storage
    window.localStorage = new MemoryStorage();
    console.warn('localStorage polyfill applied');
  }
  
  if (!window.sessionStorage) {
    window.sessionStorage = new MemoryStorage();
    console.warn('sessionStorage polyfill applied');
  }
}

// 2. Storage support with feature detection
class StorageDetector {
  constructor() {
    this.features = this.detectFeatures();
  }
  
  detectFeatures() {
    return {
      localStorage: this.checkLocalStorage(),
      sessionStorage: this.checkSessionStorage(),
      indexedDB: this.checkIndexedDB(),
      cookies: this.checkCookies(),
      quota: this.checkQuota()
    };
  }
  
  checkLocalStorage() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
  
  checkSessionStorage() {
    try {
      const test = '__test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
  
  checkIndexedDB() {
    return 'indexedDB' in window;
  }
  
  checkCookies() {
    try {
      document.cookie = '__test__=test';
      const result = document.cookie.indexOf('__test__') !== -1;
      document.cookie = '__test__=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
      return result;
    } catch {
      return false;
    }
  }
  
  checkQuota() {
    try {
      const test = 'x'.repeat(1024 * 1024); // 1MB
      localStorage.setItem('__quota_test__', test);
      localStorage.removeItem('__quota_test__');
      return { available: true, quota: 'unlimited' };
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        return { available: false, reason: 'quota_exceeded' };
      }
      return { available: false, reason: e.message };
    }
  }
  
  getReport() {
    return {
      ...this.features,
      browser: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
  }
}

// 3. Progressive enhancement with storage
function progressiveStorage() {
  const storage = {
    // Try localStorage first
    get: (key) => {
      try {
        return localStorage.getItem(key);
      } catch {
        // Fallback to sessionStorage
        try {
          return sessionStorage.getItem(key);
        } catch {
          // Fallback to memory
          return memoryStore[key] || null;
        }
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        try {
          sessionStorage.setItem(key, value);
        } catch {
          memoryStore[key] = value;
        }
      }
    }
  };
  
  return storage;
}

// 4. Storage support with error reporting
function reportStorageSupport() {
  const support = {
    localStorage: false,
    sessionStorage: false,
    indexedDB: false,
    cookies: false
  };
  
  try {
    support.localStorage = !!localStorage;
    support.sessionStorage = !!sessionStorage;
    support.indexedDB = 'indexedDB' in window;
    support.cookies = navigator.cookieEnabled;
  } catch (e) {
    // Report error but don't fail
    console.warn('Storage detection error:', e);
  }
  
  // Send report to analytics
  if (window.analytics) {
    window.analytics.track('storage_support', support);
  }
  
  return support;
}

// 5. Graceful degradation
function gracefulStorage() {
  const storage = {
    set: function(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        // Try cookies as fallback
        try {
          document.cookie = \`\${key}=\${value}; path=/\`;
          return true;
        } catch {
          // Log error but don't fail
          console.warn(\`Failed to store \${key}\`);
          return false;
        }
      }
    },
    get: function(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        // Try cookies
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const [k, v] = cookie.trim().split('=');
          if (k === key) return v;
        }
        return null;
      }
    }
  };
  
  return storage;
}`}
          language="javascript"
          title="webstorage-support-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Best Practices">
          <PlainText component="div">
            • <Bold>Always check support</Bold> before using storage<br />
            • <Bold>Provide fallbacks</Bold> for unsupported browsers<br />
            • <Bold>Handle private mode</Bold> (especially Safari)<br />
            • <Bold>Check quota</Bold> to avoid errors<br />
            • <Bold>Use try-catch</Bold> for all storage operations<br />
            • <Bold>Test in multiple browsers</Bold> before deployment<br />
            • <Bold>Consider progressive enhancement</Bold> approach
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Checking web storage support is <Bold>not optional</Bold> - it's a <Bold>critical part</Bold> of building robust web applications. Always <Bold>handle edge cases</Bold> (private mode, quota limits) and provide <Bold>graceful fallbacks</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Always check web storage support <Bold>before using it</Bold>. Use <Bold>try-catch</Bold> for all storage operations and provide <Bold>fallbacks</Bold> for unsupported browsers or private mode.
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
            <>Use <Bold>try-catch</Bold> to check web storage support</>,
            <>Handle <Bold>private mode</Bold> in Safari</>,
            <>Check <Bold>localStorage</Bold> and <Bold>sessionStorage</Bold> separately</>,
            <>Provide <Bold>fallbacks</Bold> (memory, cookies) when not supported</>,
            <>Test <Bold>quota limits</Bold> to avoid errors</>,
            <>Use <Bold>feature detection</Bold> for progressive enhancement</>,
            <>Modern browsers <Bold>widely support</Bold> web storage</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Create a <Bold>storage wrapper</Bold> that handles support checking, fallbacks, and error handling automatically. This makes your code <Bold>cleaner</Bold> and <Bold>more robust</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Checking browser support is <Bold>essential</Bold> for building reliable web applications. Don't assume support - <Bold>always check and provide fallbacks</Bold>!
      </Note>
    </QuestionWrapper>
  );
}