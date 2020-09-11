const STATIC_CACHE_NAME = 'site-static-v3';
const DYNAMIC_CACHE_NAME = 'site-dynamic-v1'




const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/main.js',
    '/css/main.css',
    '/offline.html'
];

// limiting cache size

const limitCacheSize = (name, size)=>{
    caches.open(name).then(cache=>{
        cache.keys().then(keys=>{
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size)) 
            }
        })
    })
}


// install event
self.addEventListener('install', evt=>{
    // console.log('Service worker has been installed');
    evt.waitUntil(
        caches.open(STATIC_CACHE_NAME).then(cache=>{
            console.log('caching shell assets')
            cache.addAll(CACHE_ASSETS);
        })
    );
    
});
// 
// activate event
self.addEventListener('activate', evt=>{
    // console.log('Service worker has been activated')
    evt.waitUntil(
        caches.keys().then(keys => {
        console.log(keys)
         return Promise.all().then(keys
             .filter(key => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
             .map(key => caches.delete(key))
            

             )
        })

    )
});

// fetch event
self.addEventListener('fetch', evt=>{
    // console.log('fetch event')
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
             return cacheRes||fetch(evt.request).then(fetchRes=>{
                return caches.open(DYNAMIC_CACHE_NAME).then(cache=>{
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(DYNAMIC_CACHE_NAME, 20)
                    return fetchRes;
                })
             });
        }).catch(() => {
                if(evt.request.url.indexOf('.html') > -1){
                    cache.match('/offline.html')
                }
            })
        );
    });  