// data/questions/Question44.tsx
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
import { question44Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question44({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question44Meta.id}
      title={question44Meta.title}
      definition={question44Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The main difference between <Bold>localStorage</Bold> and <Bold>sessionStorage</Bold> is their <Bold>lifespan</Bold> and <Bold>scope</Bold>. localStorage persists <Bold>indefinitely</Bold> until manually cleared, while sessionStorage is <Bold>cleared</Bold> when the <Bold>tab or window</Bold> is closed.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: localStorage vs sessionStorage
        </Title>

        <PlainText>
          Think of localStorage like a <Bold>permanent marker</Bold> and sessionStorage like a <Bold>whiteboard marker</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🖊️ Analogy">
          <PlainText>
            • <Bold>localStorage:</Bold> A permanent marker on a whiteboard - it stays until you erase it yourself<br />
            • <Bold>sessionStorage:</Bold> A whiteboard marker - it's gone when you leave the room (close the tab)
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Simple Examples:</Bold>
        </PlainText>

        <CodeComponent
          code={`// localStorage - Stays forever
localStorage.setItem('theme', 'dark'); // Still there after browser restart

// sessionStorage - Cleared on tab close
sessionStorage.setItem('formData', 'John Doe'); // Lost when tab closes

// Same API, different behavior
console.log(localStorage.getItem('theme')); // 'dark'
console.log(sessionStorage.getItem('formData')); // 'John Doe' (if tab still open)

// Both have the same methods
// setItem, getItem, removeItem, clear()`}
          language="javascript"
          title="storage-main-diff-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> The <Bold>only difference</Bold> is how long the data lasts. The API is exactly the same.
        </Note>

        <CardComponent variant="success" title="✅ Main Differences">
          <PlainText component="div">
            • <Bold>localStorage:</Bold> Persists until manually removed<br />
            • <Bold>sessionStorage:</Bold> Cleared when tab/window closes<br />
            • <Bold>Both:</Bold> Same API, same storage size, same data type
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
          Advanced: Detailed Differences
        </Title>

        <PlainText>
          Understanding the practical implications:
        </PlainText>

        <CardComponent variant="info" title="📊 Detailed Comparison">
          <TableComponent
            headers={['Feature', 'localStorage', 'sessionStorage']}
            rows={[
              ['Persistence', 'Until manually cleared', 'Until tab/window closes'],
              ['Scope', 'All tabs in the same origin', 'Single tab only'],
              ['Shared across tabs', '✅ Yes', '❌ No'],
              ['Cleared on browser close', '❌ No', '✅ Yes (if last tab)'],
              ['Use case', 'Settings, preferences', 'Form data, temporary state'],
              ['Storage limit', '5-10MB', '5-10MB'],
              ['Data type', 'String only', 'String only'],
              ['API', 'Same', 'Same'],
            ]}
          />
        </CardComponent>

        <CodeComponent
          code={`// 1. localStorage - Shared across tabs
// In Tab 1
localStorage.setItem('shared', 'value');

// In Tab 2 (same origin)
console.log(localStorage.getItem('shared')); // 'value' (shared!)

// 2. sessionStorage - Tab-specific
// In Tab 1
sessionStorage.setItem('private', 'value');

// In Tab 2 (same origin)
console.log(sessionStorage.getItem('private')); // null (not shared!)

// 3. Event listeners - localStorage triggers 'storage' event
window.addEventListener('storage', (event) => {
  console.log(\`Storage changed in another tab: \${event.key}\`);
});

// sessionStorage does NOT trigger events across tabs

// 4. Practical example: Multi-tab sync
// Use localStorage for cross-tab communication
localStorage.setItem('tabId', Date.now().toString());

// 5. When to use which
const useLocalStorage = () => {
  // User preferences
  // Theme settings
  // Language preference
  // Cached data
  // Application state
};

const useSessionStorage = () => {
  // Shopping cart (tab-specific)
  // Form data in progress
  // Session-specific state
  // Temporary calculation results
};`}
          language="javascript"
          title="storage-main-diff-advanced.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Use <Bold>localStorage</Bold> for data that should persist across sessions, and <Bold>sessionStorage</Bold> for data that's only relevant for the current browsing session.
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
          Expert-level patterns for using both storage types:
        </PlainText>

        <CodeComponent
          code={`// 1. Cross-tab communication with localStorage
class TabMessenger {
  constructor() {
    this.listeners = [];
    this.setupListener();
  }
  
  setupListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'message') {
        const data = JSON.parse(event.newValue);
        this.listeners.forEach(listener => listener(data));
      }
    });
  }
  
  sendMessage(data) {
    localStorage.setItem('message', JSON.stringify({
      ...data,
      timestamp: Date.now()
    }));
    // Clear after sending
    setTimeout(() => {
      localStorage.removeItem('message');
    }, 100);
  }
  
  addListener(callback) {
    this.listeners.push(callback);
  }
}

// 2. Hybrid storage strategy
class SmartStorage {
  constructor() {
    this.persistent = localStorage;
    this.temporary = sessionStorage;
  }
  
  save(key, value, persistent = true) {
    if (persistent) {
      this.persistent.setItem(key, JSON.stringify(value));
    } else {
      this.temporary.setItem(key, JSON.stringify(value));
    }
  }
  
  get(key, persistent = true) {
    const data = persistent 
      ? this.persistent.getItem(key)
      : this.temporary.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  remove(key, persistent = true) {
    if (persistent) {
      this.persistent.removeItem(key);
    } else {
      this.temporary.removeItem(key);
    }
  }
}

// 3. Session-aware storage
class SessionAwareStorage {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }
  
  getOrCreateSessionId() {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = \`session_\${Date.now()}_\${Math.random()}\`;
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }
  
  saveSessionData(key, value) {
    sessionStorage.setItem(\`\${this.sessionId}_\${key}\`, JSON.stringify(value));
  }
  
  getSessionData(key) {
    const data = sessionStorage.getItem(\`\${this.sessionId}_\${key}\`);
    return data ? JSON.parse(data) : null;
  }
  
  clearSession() {
    // Clear all session data for this session
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith(this.sessionId)) {
        sessionStorage.removeItem(key);
      }
    });
  }
}

// 4. Storage monitoring
function monitorStorageUsage() {
  let localStorageSize = 0;
  let sessionStorageSize = 0;
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageSize += key.length + value.length;
  }
  
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    sessionStorageSize += key.length + value.length;
  }
  
  console.log(\`localStorage: \${(localStorageSize / 1024 / 1024).toFixed(2)}MB\`);
  console.log(\`sessionStorage: \${(sessionStorageSize / 1024 / 1024).toFixed(2)}MB\`);
}`}
          language="javascript"
          title="storage-main-diff-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Best Practices">
          <PlainText component="div">
            • <Bold>localStorage:</Bold> Use for preferences, settings, and cached data<br />
            • <Bold>sessionStorage:</Bold> Use for temporary, tab-specific data<br />
            • <Bold>Data Privacy:</Bold> Don't store sensitive data in either<br />
            • <Bold>Performance:</Bold> Don't use for large datasets (use IndexedDB)<br />
            • <Bold>Cross-tab Sync:</Bold> Use localStorage for cross-tab communication<br />
            • <Bold>Cleanup:</Bold> Regularly clean up old localStorage data
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>localStorage</Bold> for data that should <Bold>survive</Bold> browser restarts</>,
              <>Use <Bold>sessionStorage</Bold> for data that's <Bold>ephemeral</Bold> to the current tab</>,
              <>Both have the <Bold>same API</Bold> - easy to switch between them</>,
              <><Bold>localStorage</Bold> can be used for <Bold>cross-tab communication</Bold></>,
              <>Consider <Bold>encryption</Bold> for sensitive data in localStorage</>,
              <>Monitor <Bold>storage usage</Bold> to avoid hitting limits</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The main difference between localStorage and sessionStorage is <Bold>lifespan and scope</Bold>. This simple difference has <Bold>significant implications</Bold> for how you architect your application's data persistence strategy.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> <Bold>localStorage</Bold> is for data that should <Bold>last</Bold> across sessions, while <Bold>sessionStorage</Bold> is for data that should <Bold>die</Bold> with the tab. Choose based on your data's <Bold>lifetime requirements</Bold>.
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
            <>localStorage persists <Bold>indefinitely</Bold> until manually cleared</>,
            <>sessionStorage is <Bold>cleared</Bold> when the tab or window closes</>,
            <>Both have <Bold>identical APIs</Bold> (setItem, getItem, removeItem, clear)</>,
            <>Both have the <Bold>same storage capacity</Bold> (5-10MB)</>,
            <>localStorage is <Bold>shared across tabs</Bold>, sessionStorage is <Bold>tab-specific</Bold></>,
            <>localStorage can be used for <Bold>cross-tab communication</Bold></>,
            <>Choose based on <Bold>data persistence needs</Bold> and <Bold>scope requirements</Bold></>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> If you're unsure which to use, ask yourself: "Should this data survive a browser restart?" If yes, use <Bold>localStorage</Bold>. If not, use <Bold>sessionStorage</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> localStorage and sessionStorage are <Bold>almost identical</Bold> except for <Bold>lifespan and scope</Bold>. Choose wisely based on your data's needs!
      </Note>
    </QuestionWrapper>
  );
}