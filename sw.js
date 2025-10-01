const CACHE = "wx-prestsbakki-v2";  // nýtt version til að hreinsa gamalt cache
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
  // Bættu við "icon-192.png", "icon-512.png" ef þær eru settar inn
];

// Install: setur allt í cache
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

// Activate: hreinsar út gamalt cache
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

// Fetch: sækir úr cache ef mögulegt, annars netið
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
