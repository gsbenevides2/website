import { CollectionReference, DocumentData, Firestore, Timestamp } from "firebase-admin/firestore";
import Firebase from "./config";


export interface LinkInDb extends DocumentData {
  url: string;
}

export interface Link extends DocumentData {
  id: string;
  url: string;
}



const getLinksCollection = (db: Firestore) => {
    return db.collection("/links") as CollectionReference<LinkInDb>;
  };

export async function getLink(id: string) {
    const db = Firebase.getFirestore();
    const linksCollection = getLinksCollection(db);
    const linkDocumento = linksCollection.doc(id);
    try {
      const linkDoc = await linkDocumento.get();
  
      const docData = linkDoc.data();
      if (!linkDoc.exists || docData === undefined) {
        return null;
      }
      return {
        id: linkDoc.id,
        url: docData.url,
      }
    } catch (e) {

      return null;
    }
  }