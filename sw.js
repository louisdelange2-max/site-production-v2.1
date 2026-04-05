const CACHE_NAME = 'site-production-v4-sync-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS.map(url => new Request(url, { cache: 'reload' })))).catch(() => null)
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put('./index.html', fresh.clone()).catch(() => null);
        return fresh;
      } catch (err) {
        const cached = await caches.match('./index.html');
        if (cached) return cached;
        throw err;
      }
    })());
    return;
  }

  if (!isSameOrigin) {
    event.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    const fetchPromise = fetch(request)
      .then(async response => {
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone()).catch(() => null);
        }
        return response;
      })
      .catch(() => cached);

    return cached || fetchPromise;
  })());
});
