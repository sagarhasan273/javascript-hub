// data/questions/Question40.tsx
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
  TableComponent,
} from "../../components/content";
import { question40Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question40({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question40Meta.id}
      title={question40Meta.title}
      definition={question40Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        <Bold>Cookies</Bold> are essential for building <Bold>stateful web applications</Bold> because HTTP is a <Bold>stateless protocol</Bold>. Without cookies, websites would not remember who you are, what you've done, or your preferences between page visits.
      </PlainText>

      <PlainText>
        Cookies bridge the gap between <Bold>stateless HTTP</Bold> and the need for <Bold>stateful user experiences</Bold>, enabling features like <Bold>authentication</Bold>, <Bold>personalization</Bold>, and <Bold>session persistence</Bold>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Why Do We Need Cookies?
        </Title>

        <PlainText>
          Think of cookies like <Bold>name tags at a conference</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🏷️ Analogy">
          <PlainText>
            Imagine you're at a conference with 1000 people. Every time you walk up to someone, they don't know who you are. But with a name tag (cookie), they can see your name and remember your previous conversations (session state). Without the name tag, you'd be a stranger every time.
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Why Cookies Are Essential:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Without Cookies - Stateless HTTP
// Every request is independent
GET /profile
// Server response: "Who are you?"

// 2. With Cookies - Stateful Experience
// First visit: Server sets a cookie
Set-Cookie: sessionId=abc123
// Subsequent requests: Browser sends the cookie
Cookie: sessionId=abc123
GET /profile
// Server response: "Welcome back, John!"

// 3. Real-world scenarios requiring cookies
// Remembering login status
// Shopping cart persistence
// User preferences (theme, language)
// Tracking for analytics
// Personalization`}
          language="javascript"
          title="cookies-why-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Cookies make the <Bold>stateless web</Bold> become <Bold>stateful</Bold>, enabling personalized user experiences.
        </Note>

        <CardComponent variant="success" title="✅ Essential Use Cases">
          <PlainText component="div">
            • 🔐 <Bold>Authentication:</Bold> Keep users logged in<br />
            • 🛒 <Bold>E-commerce:</Bold> Shopping cart persistence<br />
            • ⚙️ <Bold>Preferences:</Bold> Remember user settings<br />
            • 📊 <Bold>Analytics:</Bold> Track user behavior<br />
            • 🎯 <Bold>Personalization:</Bold> Custom user experience<br />
            • 🔄 <Bold>Session Management:</Bold> Maintain session state
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
          Advanced: Why Cookies Matter
        </Title>

        <PlainText>
          Advanced understanding of why cookies are needed:
        </PlainText>

        <CodeComponent
          code={`// 1. Session Management
// Without cookies, each request is independent
function handleRequest(request) {
  // Request doesn't know about previous requests
  // Can't maintain session state
}

// With cookies, session state is maintained
function handleAuthenticatedRequest(request) {
  const sessionId = request.cookies.sessionId;
  const user = sessionStore.get(sessionId);
  if (user) {
    // User is authenticated
    return userData(user);
  }
  return loginPage();
}

// 2. User Preferences Persistence
// Save user preferences
function savePreference(userId, key, value) {
  // Server stores preference
  // Browser stores cookie with preference ID
}

// 3. Cross-tab communication
// Cookies are shared across all tabs
// Enables cross-tab state synchronization

// 4. Third-party cookies for analytics
// Track user behavior across sites

// 5. Security and CSRF protection
// Cookies can be used with CSRF tokens
// Secure cookies prevent unauthorized access

// 6. Shopping cart persistence
// Users can leave and return without losing cart items
// Without cookies, cart would be empty on reload

// 7. A/B testing
// Track which version of page user sees
// Consistent experience across sessions

// 8. Marketing and retargeting
// Track user interests for targeted ads
// Remember user across different sites`}
          language="javascript"
          title="cookies-why-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Cookie Alternatives Comparison">
          <TableComponent
            headers={['Feature', 'Cookies', 'localStorage', 'sessionStorage']}
            rows={[
              ['Sent to server automatically', '✅ Yes', '❌ No', '❌ No'],
              ['Expiration', '✅ Yes', '✅ Yes', '❌ No (tab only)'],
              ['Cross-tab sync', '✅ Yes', '✅ Yes', '❌ No'],
              ['Server-side access', '✅ Yes', '❌ No', '❌ No'],
              ['Security flags (HttpOnly)', '✅ Yes', '❌ No', '❌ No'],
              ['Size limit', '4KB', '5-10MB', '5-10MB'],
            ]}
          />
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> While there are alternatives like <Bold>localStorage</Bold>, cookies are still <Bold>essential</Bold> for server-side session management and authentication.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Why Cookies Are Critical
        </Title>

        <PlainText>
          Expert perspective on why cookies are essential:
        </PlainText>

        <CodeComponent
          code={`// 1. Stateless HTTP and the need for state
// HTTP is inherently stateless
// Each request is independent
// Cookies provide state management

// 2. Authentication and session management
// Secure cookie with HttpOnly prevents XSS
// Session ID stored in cookie
// Server validates session on each request

// 3. Security and CSRF protection
// SameSite attribute prevents CSRF
// Secure flag ensures HTTPS
// HttpOnly prevents XSS access

// 4. Personalization and UX
// Cookies enable personalized experiences
// Remember user preferences
// Customize content based on history

// 5. E-commerce and shopping carts
// Persistent shopping cart across sessions
// Abandoned cart recovery
// Purchase history tracking

// 6. Analytics and optimization
// User behavior tracking
// Performance optimization
// A/B testing
// Conversion tracking

// 7. Cross-site tracking (third-party cookies)
// Track users across sites (marketing)
// Privacy concerns led to changes

// 8. Cookie alternatives and their limitations
// JWT tokens (stored in memory)
// OAuth tokens
// Server-side sessions

// 9. Industry trends
// Third-party cookies are being phased out
// First-party cookies remain essential
// Privacy-first approaches emerging`}
          language="javascript"
          title="cookies-why-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Critical Cookie Use Cases">
          <PlainText component="div">
            • <Bold>Session Management:</Bold> Essential for login and state<br />
            • <Bold>Security:</Bold> CSRF protection with SameSite<br />
            • <Bold>Performance:</Bold> Cache optimization<br />
            • <Bold>Personalization:</Bold> User preferences<br />
            • <Bold>Analytics:</Bold> User behavior tracking<br />
            • <Bold>Commerce:</Bold> Shopping carts and payments
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Insights">
          <UnorderedList
            items={[
              <>Cookies are <Bold>essential</Bold> for authentication and session management</>,
              <>They provide <Bold>security features</Bold> (HttpOnly, Secure, SameSite)</>,
              <>While alternatives exist, none fully replace cookies for <Bold>server-side state</Bold></>,
              <>The role of <Bold>third-party cookies</Bold> is diminishing</>,
              <>First-party cookies remain <Bold>critical</Bold> for user experience</>,
              <>Future web may rely more on <Bold>token-based auth</Bold> with minimal cookies</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Cookies are <Bold>fundamental</Bold> to the modern web. While their role is evolving with privacy regulations, they remain <Bold>essential</Bold> for authentication, session management, and personalized experiences.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Cookies are <Bold>not obsolete</Bold> - they're <Bold>evolving</Bold>. First-party cookies remain <Bold>critical</Bold> for security, authentication, and user experience.
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
            <>Cookies enable <Bold>stateful experiences</Bold> on stateless HTTP</>,
            <>Essential for <Bold>authentication</Bold> and <Bold>session management</Bold></>,
            <>Enable <Bold>personalization</Bold> and <Bold>preferences</Bold></>,
            <>Provide <Bold>security features</Bold> (HttpOnly, Secure, SameSite)</>,
            <>Power <Bold>e-commerce</Bold> and <Bold>shopping cart</Bold> functionality</>,
            <>Enable <Bold>analytics</Bold> and <Bold>user tracking</Bold></>,
            <>While evolving, cookies remain <Bold>essential</Bold> for web applications</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Use cookies for <Bold>authentication</Bold> and <Bold>session management</Bold> with proper security settings. Use <Bold>localStorage</Bold> for client-side preferences and caching.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Cookies are <Bold>not going away</Bold> - they're <Bold>evolving</Bold> to be more secure and privacy-focused!
      </Note>
    </QuestionWrapper>
  );
}