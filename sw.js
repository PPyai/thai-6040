const CACHE_NAME = 'thai6040-cache-v3';
const urlsToCache = [
    './',
    './index.html',
    './mini.html', // หรือ mini2.html ตามที่คุณตั้งชื่อ
    './manifest.json',
    './manifest-mini.json',
    './myIcon-512-mini.png',
    'https://raw.githubusercontent.com/PPyai/thai-6040/refs/heads/main/60402569W-mini.png'
];

// ขั้นตอนติดตั้ง: โหลดไฟล์เก็บไว้ในเครื่อง
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// ขั้นตอนใช้งาน: ถ้ามีเน็ตก็ดึงปกติ ถ้าไม่มีเน็ตให้ดึงจากที่โหลดไว้ (Cache)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // ดึงข้อมูลออฟไลน์
                }
                return fetch(event.request); // ดึงข้อมูลออนไลน์
            })
    );
});

// ล้าง Cache เก่าเมื่อมีการอัปเดตเวอร์ชันแอป
self.addEventListener('activate', event => {
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