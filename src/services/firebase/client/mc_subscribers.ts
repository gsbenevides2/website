import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Firebase from "./config";
import { CollectionReference } from "firebase/firestore";

export interface SubscribersDocument {
  tokens: string[];
}

export function getSubsDoc(userId: string) {
  const firestore = Firebase.getFirestore();
  const col = collection(
    firestore,
    "mc_push_subscriptions"
  ) as CollectionReference<SubscribersDocument>;
  return doc(col, userId);
}

export async function saveToken(userId: string, token: string) {
  const doc = getSubsDoc(userId);
  await setDoc(doc,{},{merge:true})
  await updateDoc(doc, {
    tokens: arrayUnion(token),
  });
}

export async function vertifySavedToken(userId:string, token:string){
  const doc = getSubsDoc(userId);
  const docSnap = await getDoc(doc);
  const data = docSnap.data();
  if(!data) return false;
  return data.tokens.includes(token);
}

export async function removeToken(userId: string, token: string) {
  const doc = getSubsDoc(userId);
  await updateDoc(doc, {
    tokens: arrayRemove(token),
  });
}