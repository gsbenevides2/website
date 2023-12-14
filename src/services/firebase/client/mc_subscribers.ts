import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
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
