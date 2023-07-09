import { User, GoogleAuthProvider, signInWithPopup,signOut } from "firebase/auth";
import Firebase from "./config";
import { useEffect } from "react";

export async function logIn(){
    const auth = Firebase.getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if(result.user.email !== "gsbenevides2@gmail.com") throw new Error("Usuário não autorizado");
    return result.user;
}

export async function logOut(){
    const auth =  Firebase.getAuth();
    await signOut(auth);
}


export async function useAdminAuthentication(
  callback: (user: User | null) => void
) {

  useEffect(() => {
    const auth =  Firebase.getAuth();
    const listenner = auth.onAuthStateChanged(user=>{
        if(user !== null && user?.email !== "gsbenevides2@gmail.com") return;
        callback(user);
    });
    return () => {
      listenner();
    };
  }, [callback]);
}

export async function retriveIdToken(){
  const auth =  Firebase.getAuth();
  const user = auth.currentUser;
  if(user === null) throw new Error("Usuário não autenticado");
  return user.getIdToken();
}
