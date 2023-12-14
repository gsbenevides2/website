import {
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import Firebase from "./config";
import { CollectionReference } from "firebase/firestore";

export interface StatusDocument {
  type: string;
  message: string;
  date: Timestamp;
}

export interface Status extends Omit<StatusDocument, "date"> {
  id: string;
  date: Date;
}

export interface StatusToAdd extends Omit<StatusDocument, "id"> {}

export function getStatusCollection() {
  const firestore = Firebase.getFirestore();
  return collection(
    firestore,
    "mc_status"
  ) as CollectionReference<StatusDocument>;
}

export async function getLatestStatus(): Promise<Status | null> {
  const statusCollection = getStatusCollection();
  const q = query(statusCollection, orderBy("date", "desc"), limit(1));
  const documents = await getDocs(q);
  if (documents.empty) return null;
  const document = documents.docs[0];
  console.log(document.data());
  return {
    id: document.id,
    ...document.data(),
    date: document.data().date.toDate(),
  };
}
