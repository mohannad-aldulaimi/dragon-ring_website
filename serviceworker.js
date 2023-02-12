// This is the service worker with the combined code for all the caches.
// Check the Debugging section in the README for more information.

const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html", 
  "/news.html",
  "/about.html",
  "/bootstrap/style.css",
  "/bootstrap/jq.js",
  "/bootstrap/bootstrap.css"
];

// Install the service worker and cache all the static assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached assets when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update the cache with the new assets if there is a new version available
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
