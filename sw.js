const CACHE_NAME = 'thai-6040-v1';
const ASSETS = [
  './index.html',
  'https://img1.pic.in.th/images/60402569W.png',
  'https://img1.pic.in.th/images/myIcon-192.png',
  'https://img2.pic.in.th/myIcon.png'
];

// ติดตั้ง Service Worker และ Cache ไฟล์
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// ดึงไฟล์จาก Cache เมื่อ Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});