// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBv4EeACzYMQDAvaLW7zegRuhQO589b7oU",
  authDomain: "gui-dev-br.firebaseapp.com",
  projectId: "gui-dev-br",
  storageBucket: "gui-dev-br.appspot.com",
  messagingSenderId: "918741232747",
  appId: "1:918741232747:web:24251cc7143856362d552e",
  measurementId: "G-6R818VVYDT",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
   
  });
