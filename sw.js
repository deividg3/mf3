const CACHE_NAME = "travel-pwa-v1";

const archivos = [

    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/manifest.json"

];


/*
Instalación
*/

self.addEventListener("install", event => {

    console.log("SW instalado");

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll(archivos);

        })

    );

});


/*
Recuperación desde caché
*/

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
        .then(response => {

            return response || fetch(event.request);

        })

    );

});