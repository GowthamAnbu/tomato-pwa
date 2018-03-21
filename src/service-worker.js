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
  .then(function(jsonObjs) {
    return Promise.all(jsonObjs.map(function(_user) {
      let payload = _user.payload;
      let _url = `https://pwa.techaffinity.com/updateUser/${_user._id}`;
      return fetch(_url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.success === 1) {
          return store.user_profile('readwrite').then(function(_user_profile) {
            return _user_profile.delete(_user._id);
          });
        }else {
          console.log('err in database');
        }
      })
    }));
  })
  .then(function() {
    return self.registration.showNotification("Profile updates",{
      "body": "Hurray ! You Profile Details are updated",
      "icon":"/assets/icon/android-chrome-256x256.png",
      actions: [
        {action: 'open', title: '👍open'},
        {action: 'close', title: '⤻ close'}
      ]
    });
  })
  .catch(function(err) { console.error(err); })
}

self.addEventListener('notificationclick', function(event) {
  var messageId = event.notification.data;

  event.notification.close();

  if (event.action === 'open') {
    clients.openWindow("https://tomato-567.firebaseapp.com/");
  }
  else if (event.action === 'close') {
    return
  }
  else {
    clients.openWindow("https://tomato-567.firebaseapp.com/");
  }
}, false);
