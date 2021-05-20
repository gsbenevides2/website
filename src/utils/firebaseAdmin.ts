import * as firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  const credentials = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS)
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials),
    storageBucket: `gs://${credentials.project_id}.appspot.com`
  })
}
export default firebaseAdmin
