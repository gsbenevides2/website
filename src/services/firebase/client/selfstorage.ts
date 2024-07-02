import { CollectionReference, DocumentData, Firestore, Timestamp, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Firebase from "./config";

export interface SelfStorageFileDocument extends DocumentData {
  dateOfCreation: Timestamp;
  dateOfLastUpdate: Timestamp;
  visible: boolean;
  filename: string;
  allowedUsers: string[];
}

type SelfStorageFileCollection = CollectionReference<SelfStorageFileDocument>;

export const getServerUrl = () => {
  const enviromentVariable = process.env.NEXT_PUBLIC_SELFHOSTED_STORAGE_URL || process.env.SELFHOSTED_STORAGE_URL;
  if (!enviromentVariable) throw new Error("NEXT_PUBLIC_SELFHOSTED_STORAGE_URL is not defined");
  return enviromentVariable;
};

const getCollection = (db: Firestore) => collection(db, "storage") as SelfStorageFileCollection;

export const createNewFile = async (id: string, file: File) => {
  const db = Firebase.getFirestore();
  const collection = getCollection(db);
  const document = doc(collection, id);
  await setDoc(document, {
    allowedUsers: [],
    dateOfCreation: Timestamp.now(),
    dateOfLastUpdate: Timestamp.now(),
    filename: file.name,
    visible: false,
  });
  const formData = new FormData();
  formData.append("file", file);
  await fetch(`${getServerUrl()}/file/${id}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: (await Firebase.getAuth().currentUser?.getIdToken()) ?? "",
    },
  });
};

export const deleteFile = async (id: string) => {
  const db = Firebase.getFirestore();
  const collection = getCollection(db);
  const document = doc(collection, id);
  await deleteDoc(document);
  await fetch(`${getServerUrl()}/file/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: (await Firebase.getAuth().currentUser?.getIdToken()) ?? "",
    },
  });
};

export const reuploadFile = async (id: string, file: File) => {
  const db = Firebase.getFirestore();
  const collection = getCollection(db);
  const document = doc(collection, id);
  await updateDoc(document, {
    dateOfLastUpdate: Timestamp.now(),
    filename: file.name,
  });
  const formData = new FormData();
  formData.append("file", file);
  await fetch(`${getServerUrl()}/file/${id}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: (await Firebase.getAuth().currentUser?.getIdToken()) ?? "",
    },
  });
};

export const changeVisibility = async (id: string, visible: boolean) => {
  const db = Firebase.getFirestore();
  const collection = getCollection(db);
  const document = doc(collection, id);
  await updateDoc(document, {
    visible,
  });
};
export const addEmailToAllowedUsers = async (id: string, email: string) => {
  const db = Firebase.getFirestore();
  const collection = getCollection(db);
  const document = doc(collection, id);
  await updateDoc(document, {
    allowedUsers: arrayUnion(email),
  });
};
export const removeEmailFromAllowedUsers = async (id: string, email: string) => {
  const db = Firebase.getFirestore();
  const collection = getCollection(db);
  const document = doc(collection, id);
  await updateDoc(document, {
    allowedUsers: arrayRemove(email),
  });
};

export const useRealtimeListenFile = () => {
  const [files, setFiles] = useState<Array<SelfStorageFileDocument & { id: string }>>([]);
  useEffect(() => {
    const db = Firebase.getFirestore();
    const collection = getCollection(db);
    const q = query(collection, orderBy("dateOfLastUpdate", "desc"));
    const snapshot = onSnapshot(q, (snapshot) => {
      const newFiles = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFiles(newFiles);
    });
    return () => snapshot();
  }, []);
  return files;
};

export const getFile = async (id: string) => {
  const db = Firebase.getFirestore();
  const collection = getCollection(db);
  const document = doc(collection, id);
  const snapshot = await getDoc(document);
  if (!snapshot.exists()) return null;
  return snapshot.data();
};
