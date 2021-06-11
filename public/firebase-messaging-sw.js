importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyC4ngJLgSnWp347vkfw_AQMdsAdnX7YgMs',
  authDomain: 'gui-benevides.firebaseapp.com',
  databaseURL: 'https://gui-benevides.firebaseio.com',
  projectId: 'gui-benevides',
  storageBucket: 'gui-benevides.appspot.com',
  messagingSenderId: '275309435614',
  appId: '1:275309435614:web:32584032f37c23066a804f',
  measurementId: 'G-8JWXTL94KZ'
});

firebase.messaging();
