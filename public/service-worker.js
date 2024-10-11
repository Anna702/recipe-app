const CACHE_NAME = "recipe-cache-v1";
const urlsToCache = ["https://dummyjson.com/recipes?select=name"];

// Install event - Cache the recipe API URLs
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache:", CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - Use cache-first strategy to reduce network usage
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Serve the cached response immediately if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Fetch from network and cache if not cached already
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Do not cache non-GET requests (e.g., POST requests)
          if (event.request.method === "GET") {
            cache.put(event.request, networkResponse.clone()); // Cache the new response
          }
          return networkResponse; // Return the network response
        });
      });
    })
  );
});

// Activate event - Remove old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Only keep the current cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
