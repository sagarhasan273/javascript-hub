// data/questions/Question32.tsx
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
import { question32Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question32({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question32Meta.id}
      title={question32Meta.title}
      definition={question32Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>Service Worker</Bold> is a <Bold>script</Bold> that runs in the <Bold>background</Bold> of a web page, separate from the main browser thread. It acts as a <Bold>proxy server</Bold> between your web application and the network, enabling features like <Bold>offline support</Bold>, <Bold>push notifications</Bold>, and <Bold>background sync</Bold>.
      </PlainText>

      <PlainText>
        Service workers are a <Bold>core technology</Bold> for building <Bold>Progressive Web Apps (PWAs)</Bold> and provide <Bold>reliable, fast, and engaging</Bold> user experiences even in unreliable network conditions.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: What is a Service Worker?
        </Title>

        <PlainText>
          Think of a service worker like a <Bold>personal assistant</Bold>:
        </PlainText>

        <CardComponent variant="info" title="🤵 Analogy">
          <PlainText>
            Imagine you have a personal assistant who manages your mail. When you're online, they bring you mail immediately. When you're offline, they remember all the mail and deliver it when you're back online. They also handle special requests like notifications. That's exactly what a service worker does for your web app!
          </PlainText>
        </CardComponent>

        <PlainText>
          <Bold>Key Concepts:</Bold>
        </PlainText>

        <CodeComponent
          code={`// 1. Registering a service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered:', registration);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}

// 2. Basic service worker lifecycle
// sw.js - Service Worker file
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  // Cache static assets
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  // Clean up old caches
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
  // Handle network requests
});

// 3. Simple caching
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});`}
          language="javascript"
          title="service-worker-basics.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Key Point:</Bold> Service workers run in the <Bold>background</Bold> and can intercept network requests to provide <Bold>offline support</Bold>.
        </Note>

        <CardComponent variant="success" title="✅ Key Features">
          <PlainText component="div">
            • 📡 <Bold>Offline Support:</Bold> Cache resources for offline use<br />
            • 🔔 <Bold>Push Notifications:</Bold> Send notifications to users<br />
            • 🔄 <Bold>Background Sync:</Bold> Sync data when online<br />
            • ⚡ <Bold>Performance:</Bold> Serve cached resources faster<br />
            • 🛡️ <Bold>Security:</Bold> Only works over HTTPS
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
          Advanced: Service Worker Lifecycle
        </Title>

        <PlainText>
          Understanding the service worker lifecycle:
        </PlainText>

        <CodeComponent
          code={`// 1. Service Worker Lifecycle Events
self.addEventListener('install', event => {
  console.log('Install event');
  // Cache static assets
  event.waitUntil(
    caches.open('static-v1')
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js'
      ]))
  );
});

self.addEventListener('activate', event => {
  console.log('Activate event');
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'static-v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event:', event.request.url);
  
  // Cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return cached response
        }
        return fetch(event.request).then(response => {
          // Cache the fetched response
          const responseClone = response.clone();
          caches.open('dynamic-v1')
            .then(cache => {
              cache.put(event.request, responseClone);
            });
          return response;
        });
      })
  );
});

// 2. Skip waiting and claim clients
self.addEventListener('install', event => {
  event.waitUntil(
    self.skipWaiting() // Force activation
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    self.clients.claim() // Take control of all clients
  );
});

// 3. Handling push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('Notification Title', options)
  );
});

// 4. Background sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Sync data with server
  const pendingData = await getPendingData();
  await sendToServer(pendingData);
  await clearPendingData();
}`}
          language="javascript"
          title="service-worker-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="📊 Service Worker Lifecycle">
          <PlainText component="div">
            • <Bold>Registration:</Bold> Browser registers the service worker<br />
            • <Bold>Install:</Bold> Download and install the service worker<br />
            • <Bold>Activate:</Bold> Service worker takes control<br />
            • <Bold>Idle:</Bold> Waiting for events<br />
            • <Bold>Fetch:</Bold> Intercepting network requests<br />
            • <Bold>Termination:</Bold> Browser terminates to save memory
          </PlainText>
        </CardComponent>

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> Service workers <Bold>only work over HTTPS</Bold> (or localhost for development) for security reasons.
        </Note>

        <CardComponent variant="warning" title="⚠️ Common Service Worker Issues">
          <UnorderedList
            items={[
              <>Not updating when new version is available</>,
              <>Cache invalidation problems</>,
              <>Scope issues (service worker only controls specific paths)</>,
              <>Memory leaks from holding onto resources</>,
              <>Not handling offline scenarios properly</>,
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Service Worker Patterns
        </Title>

        <PlainText>
          Expert-level service worker patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Advanced caching strategies
// Network-first strategy
function networkFirst(request) {
  return fetch(request)
    .then(response => {
      const responseClone = response.clone();
      caches.open('dynamic-v1')
        .then(cache => cache.put(request, responseClone));
      return response;
    })
    .catch(() => caches.match(request));
}

// Stale-while-revalidate strategy
function staleWhileRevalidate(request) {
  return caches.match(request)
    .then(cachedResponse => {
      const fetchPromise = fetch(request)
        .then(networkResponse => {
          caches.open('dynamic-v1')
            .then(cache => cache.put(request, networkResponse.clone()));
          return networkResponse;
        })
        .catch(() => {
          // Return cached response if network fails
          return cachedResponse;
        });
      
      return cachedResponse || fetchPromise;
    });
}

// Cache-first strategy with network fallback
function cacheFirst(request) {
  return caches.match(request)
    .then(cachedResponse => cachedResponse || fetch(request));
}

// 2. Message passing between service worker and client
self.addEventListener('message', event => {
  console.log('Message received:', event.data);
  
  if (event.data.action === 'cache-update') {
    // Update cache
    updateCache(event.data.url);
  }
  
  // Send response back
  event.ports[0].postMessage({ status: 'success' });
});

// 3. Periodic background sync
self.addEventListener('periodicsync', event => {
  if (event.tag === 'periodic-sync') {
    event.waitUntil(updateContent());
  }
});

// 4. Managing multiple caches
const CACHE_STRATEGIES = {
  STATIC: 'static-v1',
  DYNAMIC: 'dynamic-v1',
  IMAGES: 'images-v1',
  FONTS: 'fonts-v1'
};

function getCacheStrategy(request) {
  const url = new URL(request.url);
  if (url.pathname.match(/.(png|jpg|jpeg|gif|svg)$/)) {
    return CACHE_STRATEGIES.IMAGES;
  }
  if (url.pathname.match(/.(woff|woff2|ttf)$/)) {
    return CACHE_STRATEGIES.FONTS;
  }
  if (url.pathname.match(/.(css|js)$/)) {
    return CACHE_STRATEGIES.STATIC;
  }
  return CACHE_STRATEGIES.DYNAMIC;
}

// 5. Error handling and offline fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match('/offline.html')
          .then(response => {
            if (response) return response;
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// 6. Cache versioning and updates
const VERSION = '1.0.0';
const CACHE_NAME = \`app-\${VERSION}\`;

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
  );
});

// 7. Performance optimization
self.addEventListener('fetch', event => {
  // Prioritize critical resources
  const request = event.request;
  const url = new URL(request.url);
  
  if (url.pathname === '/app.js') {
    // Use cache-first for critical resources
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/images/')) {
    // Use stale-while-revalidate for images
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Use network-first for everything else
    event.respondWith(networkFirst(request));
  }
});`}
          language="javascript"
          title="service-worker-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Performance Optimization">
          <PlainText component="div">
            • <Bold>Cache Partitioning:</Bold> Separate caches for different asset types<br />
            • <Bold>Pre-caching:</Bold> Cache critical assets during installation<br />
            • <Bold>Lazy Caching:</Bold> Cache assets on first request<br />
            • <Bold>Cache Invalidation:</Bold> Version-based cache updates<br />
            • <Bold>Network Fallback:</Bold> Graceful degradation offline<br />
            • <Bold>Background Sync:</Bold> Queue operations when offline
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>cache versioning</Bold> for easy updates</>,
              <>Implement <Bold>fallback strategies</Bold> for offline scenarios</>,
              <>Monitor <Bold>cache size</Bold> to avoid storage limits</>,
              <>Use <Bold>background sync</Bold> for reliable data persistence</>,
              <>Implement <Bold>push notifications</Bold> for user engagement</>,
              <>Test <Bold>offline scenarios</Bold> thoroughly</>,
              <>Use <Bold>service worker tools</Bold> for debugging</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> Service workers are a <Bold>powerful tool</Bold> for building <Bold>resilient web applications</Bold>. They enable <Bold>offline experiences</Bold>, <Bold>background processing</Bold>, and <Bold>push notifications</Bold>. Mastering service workers is essential for <Bold>Progressive Web App</Bold> development.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> Service workers transform web applications into <Bold>reliable, fast, and engaging experiences</Bold> that work even in challenging network conditions.
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
            <>Service workers run in the <Bold>background</Bold> as proxy servers</>,
            <>They enable <Bold>offline support</Bold>, <Bold>push notifications</Bold>, and <Bold>background sync</Bold></>,
            <>Service workers <Bold>only work over HTTPS</Bold></>,
            <>They have a <Bold>lifecycle</Bold>: install → activate → idle → fetch</>,
            <>Caching strategies include <Bold>cache-first</Bold>, <Bold>network-first</Bold>, and <Bold>stale-while-revalidate</Bold></>,
            <>Service workers are <Bold>essential</Bold> for <Bold>PWA development</Bold></>,
            <>They <Bold>intercept network requests</Bold> to provide fast, reliable experiences</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Start with <Bold>simple caching</Bold> and gradually add more features like <Bold>push notifications</Bold> and <Bold>background sync</Bold>. This ensures your service worker remains <Bold>maintainable</Bold> and <Bold>reliable</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Service workers are the <Bold>backbone</Bold> of modern Progressive Web Apps. They enable <Bold>offline-first experiences</Bold> that keep users engaged even without internet!
      </Note>
    </QuestionWrapper>
  );
}