import { FirebaseOptions } from 'firebase/app'
import { decode } from 'js-base64'
export function getConfig(): FirebaseOptions {
  const firebaseConfig: FirebaseOptions = JSON.parse(
    decode(process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS)
  )
  return firebaseConfig
}
