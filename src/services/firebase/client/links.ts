import {
  CollectionReference,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import Firebase from "./config";
import MyError from "@/utils/MyError";

interface Link {
  id: string;
  url: string;
}

interface LinkInFirestore extends Omit<Link, "id"> {}



function getLinksCollection() {
  const firestore = Firebase.getFirestore();
  return collection(firestore, "links") as CollectionReference<LinkInFirestore>;
}


export async function addOrUpdateLink(link: Link) {
  const linksRef = getLinksCollection();
  const linkDoc = doc(linksRef, link.id);
  
  await setDoc(linkDoc, {
    url: link.url
  });
  return link.id;
}

export async function listLinks(): Promise<Link[]> {
  const links = await getDocs(getLinksCollection());
  const linksList: Link[] = links.docs.map(
    (link) => {
      const data = link.data();
      return {
        id: link.id,
        url: data.url,
      };
    }
  );
  return linksList;
}

export async function deleteLink(linkId: string) {
  const linkRef = doc(getLinksCollection(), linkId);
  deleteDoc(linkRef);
}

export async function getLink(linkId: string): Promise<Link> {
  const linkRef = doc(getLinksCollection(), linkId);
  const linkDoc = await getDoc(linkRef);
  const link = linkDoc.data();
  if (!link) throw new MyError("link-not-found", `Link não encontrado. O certificado com id: ${linkId} não foi encontrado no Firebase Firestore!`);
  return {
    id: linkDoc.id,
    ...link,
  }
}