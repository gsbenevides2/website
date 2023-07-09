import { cert, initializeApp, getApps, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
const firebaseConfig = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

export default class Firebase {
  static app: App | undefined;

  static getAuth() {
    const app = Firebase.getApp();
    return getAuth(app)
  }

  static getApp() {
    if (Firebase.app) return Firebase.app;
    console.log(process.env);
    const app =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            projectId: "gui-dev-br",
            credential: cert(firebaseConfig),
          });
          console.log(app.options)
    Firebase.app = app;
    return app;
  }

  static getFirestore(){
    const app = Firebase.getApp();
    return getFirestore(app)
  }
}
