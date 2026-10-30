var C="vendas-v1",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
// abre sempre do aparelho (rápido e offline) e atualiza a cópia em segundo plano quando há internet
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){
var net=fetch(e.request).then(function(n){if(n&&n.ok){var cp=n.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}return n}).catch(function(){return r});
return r||net}))});
