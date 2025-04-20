self.addEventListener("install", function (event) {
    console.log("Service Worker instalado");
    event.waitUntil(
      caches.open("zeentt-cache").then(function (cache) {
        return cache.addAll([
          "/ZEENTT/",
          "login.html",
          "/ZEENTT/menu.html",
          "style/style.css", // Se você tiver
          "img/zeentt-ico.png",
          "js/script.js" // substitua pelo nome correto do seu JS
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  });
  