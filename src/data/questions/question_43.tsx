// data/questions/Question43.tsx
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
import { question43Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question43({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question43Meta.id}
      title={question43Meta.title}
      definition={question43Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Cookies, localStorage, and sessionStorage are all <Bold>client-side storage mechanisms</Bold> in the browser, but they have <Bold>significant differences</Bold> in how they work, their capacity, and their use cases. Choosing the right one depends on your specific needs.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding the Differences
        </Title>

        <PlainText>
          Think of these storage options like <Bold>different types of storage containers</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📦 Analogy">
          <PlainText>
            • <Bold>Cookie:</Bold> A post-it note that's sent to the server with every request (small, automatic)<br />
            • <Bold>localStorage:</Bold> A filing cabinet that stays forever until you clean it (persistent, large)<br />
            • <Bold>sessionStorage:</Bold> A whiteboard that's cleared when you leave the room (temporary, tab-specific)
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Quick Comparison:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Cookie - Server-side accessible
document.cookie = "username=John; expires=Fri, 31 Dec 2024 23:59:59 GMT";

// 2. localStorage - Persistent client-side
localStorage.setItem('username', 'John');
const user = localStorage.getItem('username');

// 3. sessionStorage - Tab-specific
sessionStorage.setItem('sessionId', 'abc123');
const session = sessionStorage.getItem('sessionId');`}
          language="javascript"
          title="storage-comparison-basics.js"
          defaultOpen={true}
        />

        <CardComponent variant="success" title="✅ Quick Summary">
          <PlainText component="div">
            • <Bold>Cookie:</Bold> Small (4KB), sent to server, can expire<br />
            • <Bold>localStorage:</Bold> Large (5-10MB), stays forever, not sent to server<br />
            • <Bold>sessionStorage:</Bold> Large (5-10MB), cleared when tab closes, not sent to server
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
          Advanced: Detailed Comparison
        </Title>

        <PlainText>
          Detailed comparison of all three storage mechanisms:
        </PlainText>

        <CardComponent variant="info" title="📊 Complete Comparison">
          <TableComponent
            headers={['Feature', 'Cookie', 'localStorage', 'sessionStorage']}
            rows={[
              ['Size Limit', '4KB', '5-10MB', '5-10MB'],
              ['Data Type', 'String only', 'String only', 'String only'],
              ['Expiration', 'Custom (set by developer)', 'Persistent (manual deletion)', 'Tab close'],
              ['Sent to Server', '✅ Yes (automatically)', '❌ No', '❌ No'],
              ['Accessible in', 'All tabs', 'All tabs', 'Single tab'],
              ['Cross-tab sync', '✅ Yes', '✅ Yes', '❌ No'],
              ['Server-side read', '✅ Yes', '❌ No', '❌ No'],
              ['JavaScript access', '✅ Yes (non-HttpOnly)', '✅ Yes', '✅ Yes'],
              ['Security flags', 'HttpOnly, Secure, SameSite', 'None', 'None'],
              ['Use case', 'Auth, sessions', 'Persistent preferences', 'Temporary data'],
            ]}
          />
        </CardComponent>

        <CodeComponent
          code={`// 1. Cookie - Good for authentication
function setAuthCookie(token) {
  document.cookie = \`authToken=\${token}; path=/; secure; HttpOnly; SameSite=Strict\`;
}

// 2. localStorage - Good for persistent settings
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

function getTheme() {
  return localStorage.getItem('theme') || 'light';
}

// 3. sessionStorage - Good for temporary data
function saveFormData(data) {
  sessionStorage.setItem('formData', JSON.stringify(data));
}

function getFormData() {
  const data = sessionStorage.getItem('formData');
  return data ? JSON.parse(data) : null;
}

// 4. When to use each
// Cookie: Authentication tokens, session IDs
// localStorage: User preferences, theme, language settings
// sessionStorage: Shopping cart, form data, temporary state`}
          language="javascript"
          title="storage-comparison-advanced.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Use <Bold>cookies</Bold> for authentication, <Bold>localStorage</Bold> for persistent preferences, and <Bold>sessionStorage</Bold> for temporary tab-specific data.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Choosing the Right Storage
        </Title>

        <PlainText>
          Expert-level decision-making for storage choices:
        </PlainText>

        <CodeComponent
          code={`// 1. Security considerations
// Cookie with HttpOnly - secure for auth
document.cookie = "session=value; HttpOnly; Secure; SameSite=Strict";

// localStorage - vulnerable to XSS
localStorage.setItem('token', value); // Not recommended for sensitive data

// 2. Performance implications
// Cookies sent with every request (increases bandwidth)
// localStorage/sessionStorage - client-side only (no network overhead)

// 3. Storage decisions based on use case
const storageStrategy = {
  authentication: 'cookie',
  userPreferences: 'localStorage',
  sessionData: 'sessionStorage',
  shoppingCart: 'sessionStorage',
  persistentSettings: 'localStorage',
  temporaryState: 'sessionStorage'
};

// 4. Hybrid approach
function getStorage(type) {
  switch(type) {
    case 'auth':
      return document.cookie; // Cookies for auth
    case 'preferences':
      return localStorage; // localStorage for preferences
    case 'temporary':
      return sessionStorage; // sessionStorage for temporary
  }
}

// 5. Storage migration strategy
function migrateStorage(from, to, key) {
  const data = from.getItem(key);
  if (data) {
    to.setItem(key, data);
    from.removeItem(key);
  }
}

// 6. Storage lifecycle management
function manageStorage() {
  // Clear sessionStorage on logout
  sessionStorage.clear();
  
  // Keep localStorage preferences
  const theme = localStorage.getItem('theme');
  
  // Clear specific cookies
  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}`}
          language="javascript"
          title="storage-comparison-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Security Considerations">
          <PlainText component="div">
            • <Bold>Cookies with HttpOnly:</Bold> Protected from XSS<br />
            • <Bold>localStorage:</Bold> Vulnerable to XSS attacks<br />
            • <Bold>sessionStorage:</Bold> Vulnerable to XSS in the same tab<br />
            • <Bold>Cookie SameSite:</Bold> Protects against CSRF<br />
            • <Bold>Best Practice:</Bold> Don't store sensitive data in localStorage/sessionStorage
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>cookies</Bold> for authentication with HttpOnly and Secure flags</>,
              <>Use <Bold>localStorage</Bold> for non-sensitive persistent data</>,
              <>Use <Bold>sessionStorage</Bold> for temporary tab-specific data</>,
              <>Never store <Bold>sensitive data</Bold> in localStorage/sessionStorage</>,
              <>Use <Bold>IndexedDB</Bold> for large, complex data</>,
              <>Consider <Bold>encryption</Bold> for sensitive client-side data</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The choice between cookies, localStorage, and sessionStorage should be <Bold>driven by security needs</Bold>, <Bold>data persistence requirements</Bold>, and <Bold>performance considerations</Bold>. Each has its place in a well-designed application.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Choose <Bold>cookies</Bold> for server-side needs, <Bold>localStorage</Bold> for long-term client data, and <Bold>sessionStorage</Bold> for temporary tab data. Never store sensitive data in localStorage or sessionStorage!
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
            <>Cookies are <Bold>small (4KB)</Bold> and sent to the server with every request</>,
            <>localStorage is <Bold>persistent</Bold> and stays until manually cleared</>,
            <>sessionStorage is <Bold>tab-specific</Bold> and cleared when the tab closes</>,
            <>Both localStorage and sessionStorage have <Bold>5-10MB</Bold> capacity</>,
            <>Cookies support <Bold>security flags</Bold> (HttpOnly, Secure, SameSite)</>,
            <>localStorage and sessionStorage are <Bold>vulnerable to XSS</Bold></>,
            <>Choose based on <Bold>security needs</Bold> and <Bold>data persistence</Bold> requirements</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use <Bold>cookies</Bold> for authentication, <Bold>localStorage</Bold> for user preferences, and <Bold>sessionStorage</Bold> for temporary data. This combination gives you the best of all three worlds!
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Each storage type has its <Bold>strengths and weaknesses</Bold>. Use the right tool for the right job!
      </Note>
    </QuestionWrapper>
  );
}