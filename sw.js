//Service Worker, guardado de archivos en el telefono para que pueda usarse offline

const CACHE = "tracker-v2";

const FILES = [
  "./",
  "index.html",
  "css/style.css",
  "js/app.js",
  "js/db.js",
  "dat/manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
];

//Guardar archivos en instalación
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

//Borrar versiones anteriores
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

//Usa copia guardada, busca en internet si no existe
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches
      .match(event.request)
      .then((cached) => cached || fetch(event.request)),
  );
});
