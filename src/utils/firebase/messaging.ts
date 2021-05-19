import { initializeApp, getApp, FirebaseApp } from 'firebase/app'
import {
  deleteToken as deleteMessagingToken,
  getMessaging,
  getToken as getMessagingToken
} from 'firebase/messaging'

import { getConfig } from './config'

let app: FirebaseApp
try {
  app = getApp()
} catch {
  app = initializeApp(getConfig())
}
export function getToken(): Promise<string> {
  const messaging = getMessaging(app)
  return getMessagingToken(messaging)
}
export function deleteToken(): Promise<boolean> {
  const messaging = getMessaging(app)
  return deleteMessagingToken(messaging)
}
