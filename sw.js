self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('airhorner').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/_includes/assets/css/main.css',
                '/_includes/assets/fonts/PublicSans-Roman-VF.woff2',
                '/_includes/assets/fonts/PublicSans-Italic-VF.woff2'
            ])
        })
    )
})