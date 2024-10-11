const CACHE_NAME = "recipe-cache-v3";
const urlsToCache = [
  "/index.html", // Cache the main page
  "/static/css/main.css", // Cache your CSS file
  // Include other assets like images, icons, fonts if needed
  // "/static/js/main.js",
];

// Install event - Cache the necessary resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache:", CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - Serve cached resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.method === "GET") {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});
