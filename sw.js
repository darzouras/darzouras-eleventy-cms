cons pagesCacheName = 'pages';
const cacheList = [
    pagesCacheName
]

addEventListener('install', function() {
    caches.open('files').then(function(cache) {
        cache.addAll([
            '/index.html',
            '/_includes/assets/css/main.css',
            '/_includes/assets/fonts/PublicSans-Roman-VF.woff2',
            '/_includes/assets/fonts/PublicSans-Italic-VF.woff2'
        ])
    })
});

addEventListener('fetch', function(event) {
    const request = event.request;

    // ignore requests for the cms portion, non GET requests
    if (request.url.includes('/admin')) return;
    if (request.method !== 'GET') return;

    const retrieveFromCache = caches.match(request);
    // html requests try network first, then fall back to cache.
    // TODO: add fallback to an offline page
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWidth(
            new Promise( resolveWithPromise => {
                const timer = setTimeout( () => {
                    // time out: cache
                    retrieveFromCache
                    .then( responseFromCache => {
                        if (responseFromCache) {
                            resolveWithResponse(responseFromCache);
                        }
                    })
                }, timeout);

                const retrieveFromFetch = event.preloadResponse || fetch(request);

                retrieveFromFetch
                .then( responseFromFetch => {
                    clearTimeout(timer);
                    const copy = responseFromFetch.clone();
                    // stash a copy of the page in cache
                    try {
                        event.waitUntil(
                            caches.open(pagesCacheName)
                            .then( pagesCache => {
                                return pagesCache.put(request, copy);
                            })
                        )
                    } catch (error) {
                        console.log(error);
                    }
                    resolveWithResponse(responseFromFetch);
                })
                .catch( fetchError => {
                    clearTimeout(timer);
                    console.error(fetchError);
                    caches.match(request)
                    .then( responseFromCache => {
                        resolveWithResponse(
                            responseFromCache
                        )
                    })
                })
            })
        )
        return;
    }
})