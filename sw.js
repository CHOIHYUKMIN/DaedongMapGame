// Service Worker for 대동맛지도 PWA
const CACHE_NAME = 'daedong-mapgame-v1.3.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/mobile.css',
    '/css/blocks.css',
    '/css/ui-enhancements.css',
    '/css/animations.css',
    '/css/costume.css',
    '/css/puzzle-layout.css',
    '/css/restaurant-collection.css',
    '/css/restaurant-map.css',
    '/css/audio-controls.css',
    '/js/data.js',
    '/js/game.js',
    '/js/puzzle.js',
    '/js/region-data.js',
    '/js/seoul-gu-data.js',
    '/js/gangnam-dong-data.js',
    '/js/junggu-dong-data.js',
    '/js/jongnogu-dong-data.js',
    '/js/restaurant.js',
    '/js/restaurant-detail.js',
    '/js/restaurant-collection.js',
    '/js/restaurant-map.js',
    '/js/costume.js',
    '/js/costume-ui.js',
    '/js/audio-manager.js',
    '/js/audio-ui.js',
    '/js/firebase-config.js',
    '/manifest.json'
];

// 설치 이벤트 - 캐시 저장
self.addEventListener('install', event => {
    console.log('🔧 Service Worker 설치 중...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 캐시 저장 중...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Service Worker 설치 완료');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('❌ 캐시 저장 실패:', err);
            })
    );
});

// 활성화 이벤트 - 이전 캐시 정리
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker 활성화 중...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ 이전 캐시 삭제:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Service Worker 활성화 완료');
            return self.clients.claim();
        })
    );
});

// Fetch 이벤트 - 네트워크 우선, 실패 시 캐시
self.addEventListener('fetch', event => {
    // 외부 API 요청은 캐시하지 않음
    if (event.request.url.includes('firebase') ||
        event.request.url.includes('googleapis') ||
        event.request.url.includes('tile.openstreetmap')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // 성공적인 응답이면 캐시에 저장
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // 네트워크 실패 시 캐시에서 제공
                return caches.match(event.request).then(response => {
                    if (response) {
                        return response;
                    }
                    // 캐시에도 없으면 오프라인 페이지 표시
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// 푸시 알림 이벤트 (향후 확장용)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : '새로운 맛집이 추가되었어요!',
        icon: '/images/icons/icon-192x192.png',
        badge: '/images/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('대동맛지도', options)
    );
});
