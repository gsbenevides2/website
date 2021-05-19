import { FirebaseOptions } from 'firebase/app'

import { base64Decoder } from '../base64Decoder'
export function getConfig(): FirebaseOptions {
  const firebaseConfig: FirebaseOptions = JSON.parse(
    base64Decoder(process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS)
  )
  return firebaseConfig
}
