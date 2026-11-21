const V='tadris-v1',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'],CDN=['https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js','https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);await Promise.all(CDN.map(u=>c.add(new Request(u,{mode:'no-cors'})).catch(()=>{})))}).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
 if(!(u.origin===location.origin||['cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com'].includes(u.hostname)))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const k=res.clone();caches.open(V).then(c=>c.put(r,k))}return res}).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):Response.error()));return hit||net}))});
