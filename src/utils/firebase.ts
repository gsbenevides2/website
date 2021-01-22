import firebase from 'firebase/app'
import 'firebase/performance'
import 'firebase/analytics'

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: 'site-do-guilherme',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  })
  firebase.analytics()
  firebase.performance()
}
export default firebase
