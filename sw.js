// Mi Espacio — service worker del prototipo. Cachea el shell para que sea instalable y funcione sin conexión.
const CACHE = "miespacio-proto-v1";
const ASSETS = [
  "./","index.html","estilos.css","app.js","manifest.json",
  "icons/icon-192.png","icons/icon-512.png","icons/icon-180.png",
  "assets/banner-mi-espacio.png","assets/onboarding-01-espacio.png",
  "assets/onboarding-02-emociones.png","assets/onboarding-03-proceso.png",
  "assets/icono-mi-espacio.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match("index.html"))));
});
