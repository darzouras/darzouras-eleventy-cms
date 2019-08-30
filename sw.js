const pagesCacheName = 'pages';
const timeout = 3000;
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