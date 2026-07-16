// data/questions/Question42.tsx
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
import { question42Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question42({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question42Meta.id}
      title={question42Meta.title}
      definition={question42Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        To delete a cookie, you need to <Bold>set its expiration date to a past date</Bold>. When a cookie's expiration date is in the past, the browser automatically removes it. You must also match the <Bold>path</Bold> and <Bold>domain</Bold> that were used when the cookie was created.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Deleting a Cookie
        </Title>

        <PlainText>
          Think of deleting a cookie like <Bold>throwing away a sticky note</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🗑️ Analogy">
          <PlainText>
            When you want to remove a sticky note, you simply take it off. With cookies, you tell the browser to remove it by setting a past expiration date. The cookie will then be automatically cleaned up.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Basic Cookie Deletion:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Simple way to delete a cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

// 2. Function to delete a cookie
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Usage
deleteCookie('username');
deleteCookie('sessionId');

// 3. Delete cookie with specific path
function deleteCookieWithPath(name, path) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
}

// 4. Delete cookie with domain
function deleteCookieWithDomain(name, domain) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + domain + "; path=/;";
}

// 5. Complete delete function
function deleteCookieAll(name) {
  // Delete with current path
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Delete with specific path if needed
  // document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
}`}
          language="javascript"
          title="cookie-delete-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> To delete a cookie, set its <Bold>expires</Bold> attribute to a date in the past (like January 1, 1970).
        </Note>

        <CardComponent variant="success" title="✅ Important Rules">
          <PlainText component="div">
            • <Bold>Path must match:</Bold> Use the same path as when the cookie was created<br />
            • <Bold>Domain must match:</Bold> Use the same domain as when the cookie was created<br />
            • <Bold>Secure attribute:</Bold> If the cookie was created with Secure, you must include it<br />
            • <Bold>HttpOnly:</Bold> Cannot be deleted via JavaScript (must be done server-side)
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
          Advanced: Cookie Deletion Strategies
        </Title>

        <PlainText>
          Advanced cookie deletion techniques:
        </PlainText>

        <CodeComponent
          code={`// 1. Complete cookie manager with delete functionality
class CookieManager {
  set(name, value, options = {}) {
    const { expires, path = '/', domain, secure, sameSite = 'Lax' } = options;
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
    const { path = '/', domain } = options;
    let cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC\`;
    if (path) cookie += \`; path=\${path}\`;
    if (domain) cookie += \`; domain=\${domain}\`;
    document.cookie = cookie;
  }
  
  deleteAll() {
    const cookies = this.getAll();
    Object.keys(cookies).forEach(name => {
      this.delete(name);
    });
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
}

// 2. Delete cookie with specific options
function deleteCookieWithOptions(name, options = {}) {
  const { path = '/', domain, secure } = options;
  let cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC\`;
  if (path) cookie += \`; path=\${path}\`;
  if (domain) cookie += \`; domain=\${domain}\`;
  if (secure) cookie += '; secure';
  document.cookie = cookie;
}

// 3. Delete all cookies (be careful!)
function deleteAllCookies() {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\`;
  });
}

// 4. Delete cookies by pattern
function deleteCookiesByPattern(pattern) {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    if (name.includes(pattern)) {
      document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\`;
    }
  });
}

// 5. Delete cookies with same path
function deleteCookiesByPath(path) {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=\${path};\`;
  });
}`}
          language="javascript"
          title="cookie-delete-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Cookie Deletion Scenarios">
          <PlainText component="div">
            • <Bold>Simple Deletion:</Bold> Set expires to past date<br />
            • <Bold>Path-Specific:</Bold> Match the path used when setting<br />
            • <Bold>Domain-Specific:</Bold> Match the domain used when setting<br />
            • <Bold>Secure Cookies:</Bold> Must include Secure attribute<br />
            • <Bold>HttpOnly Cookies:</Bold> Cannot be deleted from JavaScript<br />
            • <Bold>All Cookies:</Bold> Loop through all and delete
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> You <Bold>cannot delete</Bold> cookies with the <Bold>HttpOnly</Bold> flag using JavaScript. These must be deleted server-side.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Cookie Deletion
        </Title>

        <PlainText>
          Expert-level cookie deletion patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Secure cookie deletion
function deleteSecureCookie(name) {
  // Must match the secure flag
  document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; SameSite=Strict\`;
}

// 2. Delete cookie with versioning
function deleteVersionedCookie(name, version) {
  const cookieName = \`\${name}_v\${version}\`;
  document.cookie = \`\${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\`;
}

// 3. Batch delete by domain
function deleteCookiesByDomain(domain) {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=\${domain}; path=/;\`;
  });
}

// 4. Delete cookies with expiration tracking
function deleteAndTrackCookie(name) {
  const value = getCookie(name);
  if (value) {
    document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\`;
    console.log(\`Cookie \${name} deleted with value: \${value}\`);
    return value;
  }
  return null;
}

// 5. Conditional cookie deletion
function deleteCookieConditionally(name, condition) {
  const value = getCookie(name);
  if (condition(value)) {
    document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\`;
    console.log(\`Cookie \${name} deleted, condition met\`);
    return true;
  }
  console.log(\`Cookie \${name} not deleted, condition not met\`);
  return false;
}

// 6. Delete cookie and notify user
function deleteCookieWithNotification(name, message) {
  document.cookie = \`\${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;\`;
  
  // Show notification
  const notification = document.createElement('div');
  notification.textContent = message || \`Cookie \${name} has been deleted\`;
  notification.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #333; color: white; padding: 10px; border-radius: 4px; z-index: 9999;';
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}`}
          language="javascript"
          title="cookie-delete-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Best Practices">
          <PlainText component="div">
            • <Bold>Always match path and domain</Bold> when deleting cookies<br />
            • <Bold>Check for HttpOnly</Bold> before attempting JavaScript deletion<br />
            • <Bold>Use secure deletion</Bold> for sensitive cookies<br />
            • <Bold>Handle errors gracefully</Bold> when deleting cookies<br />
            • <Bold>Log deletion events</Bold> for debugging and security<br />
            • <Bold>Consider user experience</Bold> when deleting session cookies
          </PlainText>
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Deleting cookies is <Bold>more complex</Bold> than it seems. You must match all the attributes that were used when the cookie was created. <Bold>HttpOnly</Bold> cookies require server-side deletion for security reasons.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Always use <Bold>the same path and domain</Bold> when deleting a cookie as were used when creating it. For <Bold>HttpOnly</Bold> cookies, you must use server-side deletion.
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
            <>Set <Bold>expires</Bold> to a past date to delete a cookie</>,
            <>Must match <Bold>path</Bold> and <Bold>domain</Bold> when deleting</>,
            <><Bold>HttpOnly</Bold> cookies cannot be deleted via JavaScript</>,
            <>Use <Bold>Secure</Bold> attribute when deleting secure cookies</>,
            <>You can delete <Bold>all cookies</Bold> by looping through them</>,
            <>Always <Bold>handle errors</Bold> when deleting cookies</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> When deleting cookies, always <Bold>match the exact attributes</Bold> (path, domain, secure) that were used when setting them. This ensures the cookie is properly removed.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Deleting cookies is all about <Bold>matching attributes</Bold> - use the same path, domain, and security settings as when the cookie was created!
      </Note>
    </QuestionWrapper>
  );
}