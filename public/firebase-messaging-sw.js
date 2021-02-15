importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCMEFLL4YWMlZSmdcJtm01gHzrnRi0E900',
  authDomain: 'site-do-guilherme.firebaseapp.com',
  databaseURL: 'https://site-do-guilherme.firebaseio.com',
  projectId: 'site-do-guilherme',
  storageBucket: 'site-do-guilherme.appspot.com',
  messagingSenderId: '1029814609739',
  appId: '1:1029814609739:web:152bd893e5bbbeafcaaace',
  measurementId: 'G-6QGQT3B2C1'
})
firebase.messaging()
