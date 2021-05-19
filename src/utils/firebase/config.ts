import { FirebaseOptions } from 'firebase/app'

export function getConfig(): FirebaseOptions {
  let firebaseConfig: FirebaseOptions

  try {
    firebaseConfig = JSON.parse(
      atob(process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS)
    )
  } catch (e) {
    firebaseConfig = JSON.parse(
      Buffer.from(
        process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS,
        'base64'
      ).toString('utf8')
    )
  }
  return firebaseConfig
}
