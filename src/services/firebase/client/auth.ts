import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Firebase from "./config";
import { useEffect } from "react";
import { useRouter } from "next/router";

export async function adminLogIn() {
  const adminEmail = "gsbenevides2@gmail.com";
  const result = await logIn(adminEmail);
  if (result.email !== adminEmail) throw new Error("Usuário não autorizado");
  return result;
}

export async function logIn(email?: string) {
  const auth = Firebase.getAuth();
  const provider = new GoogleAuthProvider();
  if (email) {
    provider.setCustomParameters({
      login_hint: email,
    });
  }
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function logOut() {
  const auth = Firebase.getAuth();
  await signOut(auth);
}

export async function useAdminAuthentication(
  callback: (user: User | null) => void
) {
  const router = useRouter();
  useEffect(() => {
    const auth = Firebase.getAuth();
    const listenner = auth.onAuthStateChanged((user) => {
      if (user !== null && user?.email !== "gsbenevides2@gmail.com") {
        logOut().then(() => {
          router.push("/admin");
        });
      }
      callback(user);
    });
    return () => {
      listenner();
    };
  }, [callback, router]);
}

export async function retriveIdToken() {
  const auth = Firebase.getAuth();
  const user = auth.currentUser;
  if (user === null) throw new Error("Usuário não autenticado");
  return user.getIdToken();
}
