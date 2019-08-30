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
    if (event.request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(event.request)
            .then(function(response) {
                return response;
            })
            /* .catch(function(error) {
                return caches.match('/index.html')
            }) */
        )
    }
})