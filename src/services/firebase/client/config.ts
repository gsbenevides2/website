import { getAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { Firestore, connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { Messaging, getMessaging } from "firebase/messaging";
import { FirebaseStorage, connectStorageEmulator, getStorage } from "firebase/storage";
import getEnviromentConfig from "../config";
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CREDENTIALS);

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
    const enviromentData = getEnviromentConfig("firestore", "merged");
    if (enviromentData.isEmulator) {
      try {
        connectFirestoreEmulator(firestore, enviromentData.host, enviromentData.port);
      } catch (e) {
        console.error(e);
      }
    }
    Firebase.firestore = firestore;
    return firestore;
  }

  static getAuth() {
    if (Firebase.auth) return Firebase.auth;
    const app = Firebase.getApp();
    const auth = getAuth(app);
    const enviromentData = getEnviromentConfig("auth", "merged");
    if (enviromentData.isEmulator) {
      connectAuthEmulator(auth, `http://${enviromentData.host}:${enviromentData.port}`, {
        disableWarnings: true,
      });
    }
    Firebase.auth = auth;
    return auth;
  }

  static getStorage() {
    if (Firebase.storage) return Firebase.storage;
    const app = Firebase.getApp();
    const storage = getStorage(app);
    const enviromentData = getEnviromentConfig("storage", "merged");
    if (enviromentData.isEmulator) connectStorageEmulator(storage, enviromentData.host, enviromentData.port);
    Firebase.storage = storage;
    return storage;
  }

  static getApp() {
    if (Firebase.app) return Firebase.app;
    const app = initializeApp(firebaseConfig);

    const isServer = typeof window === "undefined";
    if (process.env.NODE_ENV !== "development" && !isServer) getAnalytics(app);
    const functions = getFunctions(app);

    const enviromentData = getEnviromentConfig("functions", "merged");
    if (enviromentData.isEmulator) connectFunctionsEmulator(functions, enviromentData.host, enviromentData.port);

    Firebase.app = app;
    return app;
  }

  static getMessaging() {
    if (Firebase.messaging) return Firebase.messaging;
    const app = Firebase.getApp();
    const messaging = getMessaging(app);
    Firebase.messaging = messaging;
    return messaging;
  }
}
