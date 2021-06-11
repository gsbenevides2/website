import { initializeApp, getApp, FirebaseApp } from 'firebase/app'
import {
  deleteToken as deleteMessagingToken,
  getMessaging,
  getToken as getMessagingToken,
  onMessage
} from 'firebase/messaging'

import { getConfig } from './config'

let app: FirebaseApp
try {
  app = getApp()
} catch {
  app = initializeApp(getConfig())
}
export function loadMessaging(): void {
  const messaging = getMessaging(app)
  onMessage(messaging, async msg => {
    const [swRegis] = await navigator.serviceWorker.getRegistrations()
    await swRegis.showNotification(msg.notification.title, {
      body: msg.notification.body,
      image: msg.notification.image,
      icon: '/profile.png'
    })
  })
}
export function getToken(): Promise<string> {
  const messaging = getMessaging(app)
  return getMessagingToken(messaging)
}
export function deleteToken(): Promise<boolean> {
  const messaging = getMessaging(app)
  return deleteMessagingToken(messaging)
}
