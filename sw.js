const CACHE_NAME = 'english-v2';
const ASSETS = [
  './logo.png',
  './manifest.json',
  './icon512_maskable.png',
  './icon512_rounded.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first ONLY for ASSETS; everything else goes to network
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;

  const isPrecachedAsset = ASSETS.some((p) => url.pathname.endsWith(p.replace('./', '/')));

  if (!isPrecachedAsset) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
