import * as firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  const data = Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS, 'base64')
  const credentials = JSON.parse(data.toString('utf8'))
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(credentials),
    storageBucket: `gs://${credentials.project_id}.appspot.com`
  })
}
export default firebaseAdmin
