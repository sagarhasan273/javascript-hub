// data/questions/Question39.tsx
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
import { question39Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question39({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question39Meta.id}
      title={question39Meta.title}
      definition={question39Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>Cookie</Bold> is a small piece of data stored in the user's browser by a website. It's used to <Bold>remember information</Bold> about the user, such as <Bold>preferences</Bold>, <Bold>login status</Bold>, or <Bold>tracking</Bold> information for analytics.
      </PlainText>

      <PlainText>
        Cookies are <Bold>sent with every HTTP request</Bold> to the server, making them useful for <Bold>session management</Bold> and <Bold>personalization</Bold>. They have a <Bold>maximum size of 4KB</Bold> and can be set with various <Bold>attributes</Bold> for security and control.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is a Cookie?
        </Title>

        <PlainText>
          Think of a cookie like a <Bold>sticky note</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📝 Analogy">
          <PlainText>
            Imagine you walk into a store. The cashier gives you a sticky note (cookie) with your name and preferences. Every time you visit, you show this note, and the cashier remembers who you are and what you like. The note stays with you until it expires or you throw it away.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Cookie Basics:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Setting a cookie
document.cookie = "username=JohnDoe";
document.cookie = "theme=dark; expires=Fri, 31 Dec 2024 23:59:59 GMT";
document.cookie = "preferences={\\"lang\\":\\"en\\",\\"fontSize\\":16}; path=/";

// 2. Reading cookies
console.log(document.cookie);
// username=JohnDoe; theme=dark; preferences={"lang":"en","fontSize":16}

// 3. Parsing cookies
function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

const username = getCookie('username');
console.log(username); // JohnDoe

// 4. Setting cookie with expiration
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

setCookie('sessionId', 'abc123', 7); // Expires in 7 days

// 5. Deleting a cookie
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}`}
          language="javascript"
          title="cookies-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Cookies are <Bold>sent automatically</Bold> with every HTTP request to the server.
        </Note>

        <CardComponent variant="success" title="✅ Common Uses">
          <PlainText component="div">
            • 🔐 <Bold>Authentication:</Bold> Keep users logged in<br />
            • ⚙️ <Bold>Preferences:</Bold> Remember user settings<br />
            • 🛒 <Bold>Session Management:</Bold> Shopping cart data<br />
            • 📊 <Bold>Analytics:</Bold> Track user behavior<br />
            • 📝 <Bold>Personalization:</Bold> Customize user experience<br />
            • 🔄 <Bold>Remember Me:</Bold> Persistent login sessions
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
          Advanced: Cookie Management
        </Title>

        <PlainText>
          Advanced cookie management:
        </PlainText>

        <CodeComponent
          code={`// 1. Cookie manager class
class CookieManager {
  constructor() {
    this.defaultPath = '/';
    this.defaultDomain = '';
  }
  
  set(name, value, options = {}) {
    const {
      expires = null,
      path = this.defaultPath,
      domain = this.defaultDomain,
      secure = false,
      httpOnly = false,
      sameSite = 'Lax'
    } = options;
    
    let cookie = \`\${name}=\${encodeURIComponent(value)}\`;
    
    if (expires) {
      if (typeof expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
        cookie += \`; expires=\${date.toUTCString()}\`;
      } else {
        cookie += \`; expires=\${expires.toUTCString()}\`;
      }
    }
    
    if (path) cookie += \`; path=\${path}\`;
    if (domain) cookie += \`; domain=\${domain}\`;
    if (secure) cookie += \`; secure\`;
    if (httpOnly) cookie += \`; HttpOnly\`;
    if (sameSite) cookie += \`; SameSite=\${sameSite}\`;
    
    document.cookie = cookie;
  }
  
  get(name) {
    const value = \`; \${document.cookie}\`;
    const parts = value.split(\`; \${name}=\`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
  }
  
  delete(name, options = {}) {
    const { path = this.defaultPath, domain = this.defaultDomain } = options;
    const expires = new Date(0);
    let cookie = \`\${name}=; expires=\${expires.toUTCString()}\`;
    if (path) cookie += \`; path=\${path}\`;
    if (domain) cookie += \`; domain=\${domain}\`;
    document.cookie = cookie;
  }
  
  getAll() {
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name) {
        cookies[name] = decodeURIComponent(value);
      }
    });
    return cookies;
  }
  
  clear() {
    const cookies = this.getAll();
    Object.keys(cookies).forEach(name => {
      this.delete(name);
    });
  }
}

// 2. Secure cookie handling
function setSecureCookie(name, value, options = {}) {
  const cookieOptions = {
    ...options,
    secure: true,
    sameSite: 'Strict',
    httpOnly: false // Can't set HttpOnly from JavaScript
  };
  
  // Encrypt sensitive data before storing
  const encryptedValue = encryptData(value);
  document.cookie = \`\${name}=\${encryptedValue}; Secure; SameSite=Strict\`;
}

function getSecureCookie(name) {
  const value = getCookie(name);
  if (!value) return null;
  return decryptData(value);
}

// 3. Cookie with domain scope
function setDomainCookie(name, value, domain) {
  document.cookie = \`\${name}=\${value}; domain=\${domain}; path=/\`;
}

// 4. Cookie with path scope
function setPathCookie(name, value, path) {
  document.cookie = \`\${name}=\${value}; path=\${path}\`;
}

// 5. Cookie validation
function validateCookie(name) {
  const value = getCookie(name);
  if (!value) return false;
  
  // Check if cookie is expired
  // Check if cookie has valid format
  // Check if cookie is not tampered with
  
  return true;
}`}
          language="javascript"
          title="cookies-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Cookie Attributes">
          <TableComponent
            headers={['Attribute', 'Description', 'Example']}
            rows={[
              ['Expires', 'When cookie expires', 'expires=Fri, 31 Dec 2024'],
              ['Max-Age', 'Lifetime in seconds', 'max-age=3600'],
              ['Path', 'URL path where cookie is valid', 'path=/admin'],
              ['Domain', 'Domain where cookie is valid', 'domain=.example.com'],
              ['Secure', 'Only send over HTTPS', 'secure'],
              ['HttpOnly', 'Not accessible via JavaScript', 'HttpOnly'],
              ['SameSite', 'Cross-site request policy', 'SameSite=Strict'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Cookies with <Bold>HttpOnly</Bold> attribute cannot be accessed via JavaScript, providing additional security.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Cookie Patterns
        </Title>

        <PlainText>
          Expert-level cookie patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Encrypted cookies
class EncryptedCookieManager {
  constructor(secret) {
    this.secret = secret;
  }
  
  set(name, value, options = {}) {
    // Encrypt value before storing
    const encrypted = this.encrypt(JSON.stringify(value));
    document.cookie = \`\${name}=\${encrypted}; \${this.serializeOptions(options)}\`;
  }
  
  get(name) {
    const value = this.getCookieValue(name);
    if (!value) return null;
    
    try {
      const decrypted = this.decrypt(value);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }
  
  encrypt(data) {
    // Simple encryption (use a proper library in production)
    return btoa(encodeURIComponent(data));
  }
  
  decrypt(data) {
    return decodeURIComponent(atob(data));
  }
  
  getCookieValue(name) {
    const value = \`; \${document.cookie}\`;
    const parts = value.split(\`; \${name}=\`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }
  
  serializeOptions(options) {
    const parts = [];
    if (options.expires) {
      parts.push(\`expires=\${options.expires.toUTCString()}\`);
    }
    if (options.path) parts.push(\`path=\${options.path}\`);
    if (options.domain) parts.push(\`domain=\${options.domain}\`);
    if (options.secure) parts.push('secure');
    if (options.sameSite) parts.push(\`SameSite=\${options.sameSite}\`);
    return parts.join('; ');
  }
}

// 2. Cookie consent management
class CookieConsentManager {
  constructor() {
    this.consentKey = 'cookie_consent';
    this.necessary = ['session', 'csrf'];
    this.preferences = ['theme', 'language'];
    this.analytics = ['_ga', '_gid'];
    this.marketing = ['_fbp', '_gcl'];
  }
  
  getConsent() {
    const consent = localStorage.getItem(this.consentKey);
    return consent ? JSON.parse(consent) : null;
  }
  
  setConsent(consent) {
    localStorage.setItem(this.consentKey, JSON.stringify(consent));
    this.updateCookies(consent);
  }
  
  updateCookies(consent) {
    if (consent.preferences) {
      this.enablePreferences();
    } else {
      this.disablePreferences();
    }
    
    if (consent.analytics) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }
    
    if (consent.marketing) {
      this.enableMarketing();
    } else {
      this.disableMarketing();
    }
  }
  
  enablePreferences() {
    // Set preference cookies
  }
  
  disablePreferences() {
    // Remove preference cookies
    this.removeCookies(this.preferences);
  }
  
  removeCookies(cookieNames) {
    cookieNames.forEach(name => {
      document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/\`;
    });
  }
  
  hasConsent() {
    const consent = this.getConsent();
    return consent && consent.necessary !== false;
  }
}

// 3. Cookie with SameSite handling
function setCookieWithSameSite(name, value, options = {}) {
  const sameSite = options.sameSite || 'Lax';
  const secure = options.secure || (sameSite === 'None');
  
  let cookie = \`\${name}=\${encodeURIComponent(value)}\`;
  if (options.expires) {
    cookie += \`; expires=\${options.expires.toUTCString()}\`;
  }
  if (options.path) cookie += \`; path=\${options.path}\`;
  if (options.domain) cookie += \`; domain=\${options.domain}\`;
  if (secure) cookie += '; Secure';
  cookie += \`; SameSite=\${sameSite}\`;
  
  document.cookie = cookie;
}

// 4. Cookie size management
class CookieSizeManager {
  constructor() {
    this.maxSize = 4096; // 4KB limit
    this.currentSize = 0;
    this.updateSize();
  }
  
  updateSize() {
    this.currentSize = document.cookie.length;
  }
  
  canAdd(name, value) {
    const additionalSize = name.length + value.length + 2; // = and ;
    return (this.currentSize + additionalSize) <= this.maxSize;
  }
  
  getSize() {
    return this.currentSize;
  }
  
  getRemainingSpace() {
    return this.maxSize - this.currentSize;
  }
}

// 5. Cookie with versioning
class VersionedCookieManager {
  constructor() {
    this.version = 2;
  }
  
  set(name, value, options = {}) {
    const versionedValue = JSON.stringify({
      version: this.version,
      data: value,
      timestamp: Date.now()
    });
    document.cookie = \`\${name}=\${encodeURIComponent(versionedValue)}; \${this.serializeOptions(options)}\`;
  }
  
  get(name) {
    const value = this.getCookieValue(name);
    if (!value) return null;
    
    try {
      const parsed = JSON.parse(decodeURIComponent(value));
      if (parsed.version !== this.version) {
        // Handle migration
        return this.migrate(parsed);
      }
      return parsed.data;
    } catch {
      return null;
    }
  }
  
  migrate(oldData) {
    // Version migration logic
    console.log('Migrating cookie from version', oldData.version);
    return oldData.data;
  }
  
  getCookieValue(name) {
    const value = \`; \${document.cookie}\`;
    const parts = value.split(\`; \${name}=\`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }
  
  serializeOptions(options) {
    // Serialize cookie options
    const parts = [];
    if (options.expires) {
      parts.push(\`expires=\${options.expires.toUTCString()}\`);
    }
    return parts.join('; ');
  }
}`}
          language="javascript"
          title="cookies-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Cookie Security Best Practices">
          <PlainText component="div">
            • <Bold>HttpOnly:</Bold> Prevent JavaScript access for sensitive cookies<br />
            • <Bold>Secure:</Bold> Only send over HTTPS<br />
            • <Bold>SameSite:</Bold> Prevent CSRF attacks<br />
            • <Bold>Encryption:</Bold> Encrypt sensitive data<br />
            • <Bold>Expiration:</Bold> Set appropriate expiry times<br />
            • <Bold>Size Limit:</Bold> {`Keep cookies small (< 4KB)`}
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Cookies are <Bold>essential</Bold> for web applications but require <Bold>careful security considerations</Bold>. Always use <Bold>Secure</Bold>, <Bold>HttpOnly</Bold>, and <Bold>SameSite</Bold> attributes for sensitive data.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Cookies are <Bold>powerful but must be used securely</Bold>. Always consider <Bold>security implications</Bold> and <Bold>user privacy</Bold> when implementing cookies.
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
            <>Cookies are <Bold>small pieces of data</Bold> stored in the browser</>,
            <>Sent with <Bold>every HTTP request</Bold> to the server</>,
            <>Maximum size of <Bold>4KB</Bold> per cookie</>,
            <>Used for <Bold>authentication</Bold>, <Bold>preferences</Bold>, <Bold>tracking</Bold></>,
            <>Can be set with various <Bold>attributes</Bold> (Secure, HttpOnly, SameSite)</>,
            <>Always use <Bold>security best practices</Bold> for sensitive data</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use <Bold>HttpOnly</Bold> and <Bold>Secure</Bold> flags for authentication cookies, and <Bold>SameSite=Strict</Bold> to prevent CSRF attacks.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Cookies are <Bold>fundamental</Bold> to web applications but require <Bold>careful implementation</Bold> for security and privacy!
      </Note>
    </QuestionWrapper>
  );
}