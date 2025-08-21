// Basic service worker for PWA
self.addEventListener("install", function (event) {
  console.log("Service Worker installed");
});

self.addEventListener("activate", function (event) {
  console.log("Service Worker activated");
});
