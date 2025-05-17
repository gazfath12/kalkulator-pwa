const CACHE_NAME = "kalkulator-pwa-v13";

// Daftar file yang akan di-cache
const ASSETS = ["/", "/index.html", "/style.css", "/script.js", "/icon.png"];
// Event saat Service Worker di-install
self.addEventListener("install", (event) => {
  event.waitUntil(
    // Buka cache dengan nama CACHE_NAME
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache terbuka");
      // Tambahkan semua asset ke cache
      return cache.addAll(ASSETS);
    })
  );
});

// hijek ketika offline
// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     new Response('<h1>Hello Indonesia</h1>', {
//       headers: {
//         'Content-Type': 'text/html',
//       },
//     })
//   );
// });

// Event saat ada request (fetch) tetap hanya cache yg pertama saja
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     // Cek apakah request ada di cache
//     caches.match(event.request).then((response) => {
//       // Jika ada di cache, kembalikan dari cache
//       // Jika tidak, fetch dari network
//       return response || fetch(event.request);
//     })
//   );
// });

// solusi ketika update version
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // Cek apakah request ada di cache
    caches.match(event.request).then((response) => {
      // Jika ada di cache, kembalikan dari cache
      // Jika tidak, fetch dari network
      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
