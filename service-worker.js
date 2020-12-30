self.addEventListener("install", function (event) {
  // Perform install steps
});

self.addEventListener("fetch", function (event) {
  //nothing for now
});

self.addEventListener("activate", function (event) {
  /*
  event.waitUntil(
    // The caches built-in is a promise-based API that helps you cache responses,
    // as well as finding and deleting them.
    //
    caches
      // You can open a cache by name, and this method returns a promise. We use
      // a versioned cache name here so that we can remove old cache entries in
      // one fell swoop later, when phasing out an older service worker.
      //
      .open("v1::LingvoTV")
      .then(function (cache) {
        // After the cache is opened, we can fill it with the offline fundamentals.
        // The method below will add all resources we've indicated to the cache,
        // after making HTTP requests for each of them.
        //         return cache.addAll(["/service-worker.js"]);
      })
  );
  */
});

self.skipWaiting();
