self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.open('static-v1').then((cache) =>
      cache.match(event.request).then((res) => {
        return (
          res ||
          fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      })
    )
  );
});
