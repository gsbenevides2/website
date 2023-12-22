import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Firebase from "./config";
import React from "react";

const adminEmail = "gsbenevides2@gmail.com";
export enum AuthState {
  Loading,
  Authenticated,
  Unauthenticated,
}

export async function adminLogIn() {
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

export async function useAuthentication() {
  const [state, setState] = React.useState(AuthState.Loading);
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const auth = Firebase.getAuth();
    const listenner = auth.onAuthStateChanged((user) => {
      setState(user ? AuthState.Authenticated : AuthState.Unauthenticated);
      setUser(user);
    });
    return () => {
      listenner();
    };
  }, []);
  return { state, user };
}

export function useAdminAuthentication() {
  const [state, setState] = React.useState(AuthState.Loading);
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const auth = Firebase.getAuth();
    const listenner = onAuthStateChanged(auth, (user) => {
      if (user?.email === adminEmail) setState(AuthState.Authenticated);
      else setState(AuthState.Unauthenticated);
      setUser(user);
    });
    return () => {
      listenner();
    };
  }, []);
  return { state, user };
}

export async function getLoggedUser() {
  const auth = Firebase.getAuth();
  return auth.currentUser;
}

export async function retriveIdToken() {
  const auth = Firebase.getAuth();
  const user = auth.currentUser;
  if (user === null) throw new Error("Usuário não autenticado");
  return user.getIdToken();
}
