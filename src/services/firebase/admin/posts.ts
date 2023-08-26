import { CollectionReference, DocumentData, Firestore, Timestamp } from "firebase-admin/firestore";
import Firebase from "./config";

interface Assent {
  alt: string;
  name: string;
  url: string;
  type: string;
  blur: string;
}

interface Thumbnail {
  alt: string;
  list: string;
  metaTag: string;
  originalPng: string;
  originalWebp: string;
  blur: string;
}

export interface PostInDb extends DocumentData {
  assets: Assent[];
  content: string;
  date: Timestamp;
  description: string;
  id: string;
  name: string;
  thumbnail: Thumbnail;
  views: string[];
  visible: boolean;
}

export interface Post extends DocumentData {
  assets: Assent[];
  content: string;
  date: string;
  description: string;
  id: string;
  name: string;
  thumbnail: Thumbnail;
  views: string[];
  visible: boolean;
}


export function transformPostInDbToPost(postInDb: PostInDb): Post {
  const data = postInDb.date.toDate();

  return {
    ...postInDb,
    date: data.toISOString().split("T")[0],
  };
}

const getPostsCollection = (db: Firestore) => {
    return db.collection("/posts") as CollectionReference<PostInDb>;
  };

export async function getPost(id: string) {
    const db = Firebase.getFirestore();
    const postsCollection = getPostsCollection(db);
    const postDocumento = postsCollection.doc(id);
    try {
      const postDoc = await postDocumento.get();
  
      const docData = postDoc.data();
      if (!postDoc.exists || docData === undefined) {
        return null;
      }
      return transformPostInDbToPost(docData);
    } catch (e) {
      console.log(e);
      return null;
    }
  }