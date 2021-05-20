import { FirebaseOptions } from 'firebase/app'

export function getConfig(): FirebaseOptions {
  const firebaseConfig: FirebaseOptions = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS
  )
  return firebaseConfig
}
