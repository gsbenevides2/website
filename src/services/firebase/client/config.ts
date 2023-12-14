import { FirebaseApp, initializeApp } from "firebase/app";
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import {
  FirebaseStorage,
  connectStorageEmulator,
  getStorage,
} from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import {getMessaging, Messaging} from 'firebase/messaging'
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS)

export default class Firebase {
  static app: FirebaseApp | undefined;
  static auth: Auth | undefined;
  static firestore: Firestore | undefined;
  static storage: FirebaseStorage | undefined;
  static messaging: Messaging | undefined;

  static getFirestore() {
    if (Firebase.firestore) return Firebase.firestore;
    const app = Firebase.getApp();
    const firestore = getFirestore(app);
    if (process.env.NODE_ENV === "development")
      try {
        connectFirestoreEmulator(firestore, "localhost", 8080);
      } catch (e) {
        console.error(e);
      }
    Firebase.firestore = firestore;
    return firestore;
  }

  static getAuth() {
    if (Firebase.auth) return Firebase.auth;
    const app = Firebase.getApp();
    const auth = getAuth(app);
    if (process.env.NODE_ENV === "development")
      connectAuthEmulator(auth, "http://localhost:9099", {
        disableWarnings: true,
      });
    Firebase.auth = auth;
    return auth;
  }

  static getStorage() {
    if (Firebase.storage) return Firebase.storage;
    const app = Firebase.getApp();
    const storage = getStorage(app);
    if (process.env.NODE_ENV === "development")
      connectStorageEmulator(storage, "localhost", 9199);
    Firebase.storage = storage;
    return storage;
  }

  static getApp() {
    if (Firebase.app) return Firebase.app;
    const app = initializeApp(firebaseConfig);
    const isServer = typeof window === 'undefined';
    if (process.env.NODE_ENV !== "development" && !isServer) getAnalytics(app);
    const functions = getFunctions(app);
    if (process.env.NODE_ENV !== "development")
      connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    Firebase.app = app;
    return app;
  }

  static getMessaging(){
    if(Firebase.messaging) return Firebase.messaging;
    const app = Firebase.getApp();
    const messaging = getMessaging(app);
    Firebase.messaging = messaging;
    return messaging;
  }
}
