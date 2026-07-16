// data/questions/Question41.tsx
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
import { question41Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question41({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question41Meta.id}
      title={question41Meta.title}
      definition={question41Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        Cookies come with <Bold>various options (attributes)</Bold> that control their <Bold>behavior</Bold>, <Bold>security</Bold>, and <Bold>scope</Bold>. These options determine when cookies are sent, where they're accessible, and how long they persist.
      </PlainText>

      <PlainText>
        Understanding cookie options is <Bold>crucial</Bold> for implementing <Bold>secure</Bold> and <Bold>effective</Bold> cookie usage in web applications.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Cookie Options
        </Title>

        <PlainText>
          Think of cookie options like <Bold>delivery instructions for a package</Bold>:
        </PlainText>

        <CardComponent variant="info" title="📦 Analogy">
          <PlainText>
            When you send a package, you can specify: who can receive it (domain/path), how long it should be kept (expires), if it should be signed for (secure), and who else can see it (HttpOnly/SameSite). Cookie options are similar - they control where, when, and how cookies are used.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Main Cookie Options:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Expires / Max-Age
// Set when cookie expires
document.cookie = "session=abc123; expires=Fri, 31 Dec 2024 23:59:59 GMT";
document.cookie = "session=abc123; max-age=3600"; // 1 hour

// 2. Path
// Which URL path the cookie is valid for
document.cookie = "admin=token; path=/admin";
document.cookie = "all=shared; path=/"; // Valid everywhere

// 3. Domain
// Which domain the cookie is valid for
document.cookie = "site=cookie; domain=.example.com";
document.cookie = "sub=only; domain=sub.example.com";

// 4. Secure
// Only send cookie over HTTPS
document.cookie = "token=secure; secure";

// 5. HttpOnly
// Cannot be accessed by JavaScript
// Set by server: Set-Cookie: token=value; HttpOnly

// 6. SameSite
// Controls cross-site request behavior
// Strict: Only send for same-site requests
document.cookie = "strict=value; SameSite=Strict";

// Lax: Send for top-level navigations
document.cookie = "lax=value; SameSite=Lax";

// None: Send for all requests (requires Secure)
document.cookie = "none=value; SameSite=None; secure";`}
          language="javascript"
          title="cookie-options-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Cookie options control <Bold>security</Bold>, <Bold>scope</Bold>, and <Bold>lifetime</Bold> of cookies.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: Cookie Options in Depth
        </Title>

        <PlainText>
          Detailed explanation of each cookie option:
        </PlainText>

        <CodeComponent
          code={`// 1. Expires vs Max-Age
// Expires: Absolute expiration date
const date = new Date();
date.setDate(date.getDate() + 7);
document.cookie = \`session=abc123; expires=\${date.toUTCString()}\`;

// Max-Age: Seconds until expiration
document.cookie = "session=abc123; max-age=604800"; // 7 days
// Max-Age takes precedence over Expires

// 2. Path - URL scope
// Cookie only sent for paths starting with /admin
document.cookie = "adminSession=xyz; path=/admin";

// Cookie sent for all paths
document.cookie = "globalSession=abc; path=/";

// 3. Domain - Domain scope
// Available on example.com and all subdomains
document.cookie = "user=john; domain=.example.com";

// Only available on sub.example.com
document.cookie = "subUser=john; domain=sub.example.com";

// 4. Secure - HTTPS only
document.cookie = "sensitive=data; secure";
// Only sent over HTTPS, not HTTP

// 5. HttpOnly - JavaScript inaccessible
// Cannot be read by document.cookie
// Set-Cookie: token=value; HttpOnly

// 6. SameSite - CSRF protection
// Strict - only same-site requests
document.cookie = "csrf=token; SameSite=Strict";

// Lax - top-level navigation allowed
document.cookie = "session=id; SameSite=Lax";

// None - cross-site allowed (requires Secure)
document.cookie = "tracker=id; SameSite=None; secure";

// 7. Priority (Chrome specific)
document.cookie = "important=value; priority=high";
document.cookie = "normal=value; priority=medium";
document.cookie = "low=value; priority=low";

// 8. Max-Age with Secure
document.cookie = "secureSession=abc; max-age=3600; secure; HttpOnly";

// 9. Multiple options combined
document.cookie = \`authToken=\${token}; expires=\${expires}; path=/; domain=.example.com; secure; HttpOnly; SameSite=Strict\`;`}
          language="javascript"
          title="cookie-options-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Cookie Options Summary">
          <TableComponent
            headers={['Option', 'Purpose', 'Example']}
            rows={[
              ['Expires', 'Absolute expiration date', 'expires=Fri, 31 Dec 2024'],
              ['Max-Age', 'Seconds until expiration', 'max-age=3600'],
              ['Path', 'URL path scope', 'path=/admin'],
              ['Domain', 'Domain scope', 'domain=.example.com'],
              ['Secure', 'HTTPS only', 'secure'],
              ['HttpOnly', 'No JavaScript access', 'HttpOnly'],
              ['SameSite', 'Cross-site request control', 'SameSite=Strict'],
              ['Priority', 'Eviction priority', 'priority=high'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>SameSite=None</InlineCode> requires the <InlineCode>Secure</InlineCode> attribute to be set.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Cookie Options
        </Title>

        <PlainText>
          Expert-level understanding of cookie options:
        </PlainText>

        <CodeComponent
          code={`// 1. Security-focused cookie configuration
function createSecureCookie(name, value, options = {}) {
  const defaultOptions = {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'Strict',
    maxAge: 86400 // 24 hours
  };
  
  const config = { ...defaultOptions, ...options };
  let cookie = \`\${name}=\${encodeURIComponent(value)}\`;
  
  if (config.maxAge) {
    cookie += \`; max-age=\${config.maxAge}\`;
  }
  if (config.expires) {
    cookie += \`; expires=\${config.expires.toUTCString()}\`;
  }
  if (config.path) {
    cookie += \`; path=\${config.path}\`;
  }
  if (config.domain) {
    cookie += \`; domain=\${config.domain}\`;
  }
  if (config.secure) {
    cookie += '; secure';
  }
  if (config.httpOnly) {
    cookie += '; HttpOnly';
  }
  if (config.sameSite) {
    cookie += \`; SameSite=\${config.sameSite}\`;
  }
  if (config.priority) {
    cookie += \`; priority=\${config.priority}\`;
  }
  
  return cookie;
}

// 2. Cookie with different SameSite values
const cookieConfigs = {
  // Strict - best for sensitive operations
  strict: {
    sameSite: 'Strict',
    secure: true,
    httpOnly: true
  },
  // Lax - good for session cookies
  lax: {
    sameSite: 'Lax',
    secure: true,
    httpOnly: true
  },
  // None - for cross-site tracking (rare)
  none: {
    sameSite: 'None',
    secure: true
  }
};

// 3. Cookie priority for browser eviction
// Chrome uses priority when cookies exceed limit
document.cookie = "critical=value; priority=high; max-age=3600";
document.cookie = "normal=value; priority=medium; max-age=1800";
document.cookie = "optional=value; priority=low; max-age=900";

// 4. Best practices for cookie options
function getBestPracticeCookie(name, value, isSensitive = false) {
  const baseOptions = {
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'Lax'
  };
  
  if (isSensitive) {
    return {
      ...baseOptions,
      httpOnly: true,
      sameSite: 'Strict',
      maxAge: 3600 // 1 hour
    };
  }
  
  return {
    ...baseOptions,
    maxAge: 604800 // 7 days
  };
}

// 5. Cookie option validation
function validateCookieOptions(options) {
  const validOptions = ['expires', 'maxAge', 'path', 'domain', 'secure', 'httpOnly', 'sameSite', 'priority'];
  
  Object.keys(options).forEach(key => {
    if (!validOptions.includes(key)) {
      console.warn(\`Invalid cookie option: \${key}\`);
    }
  });
  
  if (options.sameSite === 'None' && !options.secure) {
    console.warn('SameSite=None requires Secure attribute');
  }
}

// 6. Cookie option migration
function migrateCookieOptions(oldOptions, newOptions) {
  // Handle domain changes
  if (oldOptions.domain !== newOptions.domain) {
    // Need to delete old cookie and set new one
    deleteCookie('name', oldOptions);
    setCookie('name', value, newOptions);
  }
}`}
          language="javascript"
          title="cookie-options-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Security Recommendations">
          <PlainText component="div">
            • <Bold>Authentication:</Bold> Use HttpOnly, Secure, SameSite=Strict<br />
            • <Bold>Session Cookies:</Bold> Use SameSite=Lax for better UX<br />
            • <Bold>Sensitive Data:</Bold> Always use Secure and HttpOnly<br />
            • <Bold>CSRF Protection:</Bold> Use SameSite=Strict or use CSRF tokens<br />
            • <Bold>Cross-Site Tracking:</Bold> Avoid unless necessary<br />
            • <Bold>Expiration:</Bold> Set appropriate max-age for session lifetime
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>HttpOnly</Bold> for authentication cookies</>,
              <>Always use <Bold>Secure</Bold> in production</>,
              <>Use <Bold>SameSite=Strict</Bold> for sensitive operations</>,
              <>Set <Bold>appropriate expiration</Bold> based on use case</>,
              <>Use <Bold>path</Bold> to limit cookie scope</>,
              <>Avoid storing <Bold>sensitive data</Bold> in cookies</>,
              <>Consider <Bold>privacy implications</Bold> of cookie choices</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Cookie options are <Bold>critical</Bold> for security and functionality. Understanding each option helps you <Bold>implement secure cookies</Bold> that <Bold>balance</Bold> security, performance, and user experience.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Always choose cookie options <Bold>deliberately</Bold> based on your specific use case. Use <Bold>secure defaults</Bold> and only relax restrictions when necessary.
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
            <>Cookie options control <Bold>security</Bold>, <Bold>scope</Bold>, and <Bold>lifetime</Bold></>,
            <>Key options: <Bold>Expires</Bold>, <Bold>Path</Bold>, <Bold>Domain</Bold>, <Bold>Secure</Bold></>,
            <>Security options: <Bold>HttpOnly</Bold>, <Bold>SameSite</Bold>, <Bold>Secure</Bold></>,
            <><Bold>SameSite</Bold> options: Strict, Lax, None</>,
            <>Always use <Bold>Secure</Bold> and <Bold>HttpOnly</Bold> for sensitive data</>,
            <>Choose <Bold>appropriate expiration</Bold> based on use case</>,
            <>Use <Bold>Path</Bold> and <Bold>Domain</Bold> to limit cookie scope</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> For authentication cookies, always use <Bold>HttpOnly</Bold>, <Bold>Secure</Bold>, and <Bold>SameSite=Strict</Bold> to maximize security.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Cookie options are your <Bold>security toolkit</Bold>. Use them wisely to build <Bold>secure, reliable web applications</Bold>!
      </Note>
    </QuestionWrapper>
  );
}