// Nama cache (versi bisa diupdate untuk cache busting)
const CACHE_NAME = 'kalkulator-pwa-v1';

// Daftar file yang akan di-cache
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/icon.png'
];

// Event saat Service Worker di-install
self.addEventListener('install', (event) => {
  event.waitUntil(
    // Buka cache dengan nama CACHE_NAME
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache terbuka');
        // Tambahkan semua asset ke cache
        return cache.addAll(ASSETS);
      })
  );
});

// Event saat ada request (fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Cek apakah request ada di cache
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, kembalikan dari cache
        // Jika tidak, fetch dari network
        return response || fetch(event.request);
      })
  );
});