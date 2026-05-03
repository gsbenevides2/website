import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  OAuthProvider,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  linkWithPopup,
  linkWithCredential,
  signInWithRedirect,
} from "firebase/auth";
import Firebase from "./config";
import React from "react";

const adminEmail = "gsbenevides2@gmail.com";
export enum AuthState {
  Loading,
  Authenticated,
  Unauthenticated,
}

export async function adminGoogleLogIn() {
  const result = await googleLogIn(adminEmail);
  if (result.email !== adminEmail) throw new Error("Usuário não autorizado");
  return result;
}

export async function adminSsoLogIn() {
  const result = await ssoLogIn(adminEmail);
  if (result.email !== adminEmail) throw new Error("Usuário não autorizado");
  return result;
}

export async function googleLogIn(email?: string) {
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

export async function ssoLogIn(email?: string) {
  const auth = Firebase.getAuth();
  const provider = new OAuthProvider("oidc.sso");
  if (email) {
    provider.setCustomParameters({
      login_hint: email,
    });
  }
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (e: any) {
    if (e.code === "auth/account-exists-with-different-credential") {
      const confirmResult = window.confirm(
        "Parece que você já tem uma conta com um método de login diferente. Gostaria de fazer login usando o Google para vincular as contas?",
      );
      if (!confirmResult) throw new Error("Login cancelado pelo usuário");
      const pendingCred = OAuthProvider.credentialFromError(e);
      const email = e.customData.email;
      const googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({
        login_hint: email,
      });
      console.log(
        "Tentando login com Google devido a conta existente com credenciais diferentes",
      );
      const googleResult = await signInWithPopup(auth, googleProvider);
      await linkWithCredential(googleResult.user, pendingCred!);
      return googleResult.user;
    } else {
      throw e;
    }
  }
}

export async function logOut() {
  const auth = Firebase.getAuth();
  await signOut(auth);
}

export function useAuthentication() {
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
