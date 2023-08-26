import {
  collection,
  CollectionReference,
  getDocs,
  Timestamp,
  DocumentData,
  orderBy,
  query,
  Firestore,
  getDoc,
  limit,
  where,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import Firebase from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { get } from "https";

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

const getPostsCollection = (db: Firestore) => {
  return collection(db, "/posts") as CollectionReference<PostInDb>;
};

export function transformPostInDbToPost(postInDb: PostInDb): Post {
  const data = postInDb.date.toDate();

  return {
    ...postInDb,
    date: data.toISOString().split("T")[0],
  };
}

export async function getAllPosts() {
  const db = Firebase.getFirestore();
  const postsCollection = getPostsCollection(db);

  const postsDocs = await getDocs(
    query(postsCollection, orderBy("date", "desc"))
  );
  const posts: Post[] = postsDocs.docs.map((doc) => {
    const docData = doc.data();
    return transformPostInDbToPost(docData);
  });
  return posts;
}

export async function getVisiblePosts() {
  const db = Firebase.getFirestore();
  const postsCollection = getPostsCollection(db);

  const postsDocs = await getDocs(
    query(
      postsCollection,
      orderBy("date", "desc"),
      where("visible", "==", true)
    )
  );
  const posts: Post[] = postsDocs.docs.map((doc) => {
    const docData = doc.data();
    return transformPostInDbToPost(docData);
  });
  return posts;
}

export async function getFirstTenVisblePostsIds() {
  const db = Firebase.getFirestore();
  const postsCollection = getPostsCollection(db);
  const postsDocs = await getDocs(
    query(
      postsCollection,
      orderBy("date", "desc"),
      limit(10),
      where("visible", "==", true)
    )
  );
  const postsIds: string[] = postsDocs.docs.map((doc) => {
    return doc.id;
  });
  return postsIds;
}

export async function getPost(id: string) {
  const db = Firebase.getFirestore();
  const postsCollection = getPostsCollection(db);
  const postDocumento = doc(postsCollection, id);
  try {
    const postDoc = await getDoc(postDocumento);

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

export async function updatePostVisible(id: string, newVisible: boolean) {
  const db = Firebase.getFirestore();
  const postsCollection = getPostsCollection(db);
  const postDocumento = doc(postsCollection, id);
  try {
    await updateDoc(postDocumento, { visible: newVisible });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

interface AssetToCreate {
  alt: string;
  name: string;
  file: File;
  type: string;
  blur: string;
}

interface ThumbnailToCreate {
  alt: string;
  list: File;
  metaTag: File;
  originalPng: File;
  originalWebp: File;
  blur: string;
}

interface PostInDbToCreate {
  assets: AssetToCreate[];
  content: string;
  date: Date;
  description: string;
  id?: string;
  name: string;
  thumbnail: ThumbnailToCreate;
}

async function saveThumbnailInStorage(
  thumbnail: ThumbnailToCreate,
  id: string
): Promise<Thumbnail> {
  const storage = Firebase.getStorage();
  const storageRef = ref(storage, `/posts/${id}/thumbnail`);
  await uploadBytes(ref(storageRef, "original.png"), thumbnail.originalPng),
    await uploadBytes(ref(storageRef, "original.webp"), thumbnail.originalWebp),
    await uploadBytes(ref(storageRef, "metaTag.png"), thumbnail.metaTag),
    await uploadBytes(ref(storageRef, "list.webp"), thumbnail.list);
  return {
    alt: thumbnail.alt,
    list: await getDownloadURL(ref(storageRef, "list.webp")),
    metaTag: await getDownloadURL(ref(storageRef, "metaTag.png")),
    originalPng: await getDownloadURL(ref(storageRef, "original.png")),
    originalWebp: await getDownloadURL(ref(storageRef, "original.webp")),
    blur: thumbnail.blur,
  };
}

async function saveAssetsInStorage(
  assets: AssetToCreate[],
  id: string
): Promise<Assent[]> {
  const storage = Firebase.getStorage();
  const assetsRef = ref(storage, `/posts/${id}/assets`);
  const assetsToSave: Assent[] = [];
  for (const asset of assets) {
    const assetRef = ref(assetsRef, asset.name);
    await uploadBytes(assetRef, asset.file);
    const url = await getDownloadURL(assetRef);
    assetsToSave.push({
      alt: asset.alt,
      name: asset.name,
      url,
      type: asset.type,
      blur: asset.blur,
    });
  }
  return assetsToSave;
}

function generatePostId(postName: string): string {
  return postName.toLowerCase().replace(/\s/g, "-");
}

export async function createOrUpdatePost(
  post: PostInDbToCreate
): Promise<string> {
  const db = Firebase.getFirestore();
  const postsCollection = getPostsCollection(db);
  const postId = post.id || generatePostId(post.name);
  const postDoc = doc(postsCollection, postId);

  await setDoc(postDoc, {
    ...post,
    id: postId,
    date: Timestamp.fromDate(post.date),
    thumbnail: await saveThumbnailInStorage(post.thumbnail, postDoc.id),
    assets: await saveAssetsInStorage(post.assets, postDoc.id),
    views: [],
    visible: false,
  });

  return postId;
}

export async function deletePost(postId: string) {
  const firestore = Firebase.getFirestore();
  await deleteDoc(doc(getPostsCollection(firestore), postId));
}
