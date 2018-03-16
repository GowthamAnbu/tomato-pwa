'use strict';
importScripts('./build/sw-toolbox.js');
importScripts('./js/idb.js');
importScripts('./js/store.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

// Initialize Firebase App

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '48068424744'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
var messaging = firebase.messaging();


// Handle Background Notifications

// If you would like to customize notifications that are received in the background (Web app is closed or not in browser focus) then you should implement this optional method
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.'

  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// Background Sync
self.addEventListener('sync', function (event) {
  console.log('inside sync');
  if (event.tag == 'user_profile') {
    event.waitUntil(getuserDetails());
  } else {
    console.log('else block');
  }
});

function getuserDetails() {
  store.user_profile('readonly').then(function(_user_profile) {
    return _user_profile.getAll();
  })
  .then(function(item) {
    console.log(item);
  })
  .catch(function(err) { console.error(err); })
}
