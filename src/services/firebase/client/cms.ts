import { addDoc, collection, CollectionReference, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, Timestamp, updateDoc, where } from "firebase/firestore";
import Firebase from "./config";

export interface Page {
    name: string;
    description: string;
    path: string;
    latestVersion?: string;
}

export interface PageVersionRead {
    content: string;
    createdAt: Timestamp;
}

export interface PageVersionWrite {
    content: string;
}


function getPagesCollection() {
    const firestore = Firebase.getFirestore();
    return collection(firestore, "cms") as CollectionReference<Page, Page>;
}

export function listPages() {
    const pagesRef = getPagesCollection();
    return getDocs(pagesRef);
}


export function addPage(page: Page) {
    const pagesRef = getPagesCollection();
    return addDoc(pagesRef, page);
}

export function updatePage(pageId: string, page: Page) {
    const pagesRef = doc(getPagesCollection(), pageId);
    return updateDoc(pagesRef, page);
}

export function getPage(pageId: string) {
    const pagesRef = doc(getPagesCollection(), pageId);
    return getDoc(pagesRef);
}

export function deletePage(pageId: string) {
    const pagesRef = doc(getPagesCollection(), pageId);
    return deleteDoc(pagesRef);
}

function getVersionsCollection(pageId: string) {
    const pagesRef = getPagesCollection();
    return collection(pagesRef, pageId, "versions") as CollectionReference<PageVersionRead, PageVersionWrite>;
}

export function listVersions(pageId: string) {
    const versionsRef = getVersionsCollection(pageId);
    return getDocs(query(versionsRef, orderBy("createdAt", "desc")));
}

export function addVersion(pageId: string, version: PageVersionWrite) {
    const versionsRef = collection(getPagesCollection(), pageId, "versions");
    return addDoc(versionsRef, {
        content: version.content,
        createdAt: serverTimestamp(),
    });
}

export function getVersion(pageId: string, versionId: string) {
    const versionsRef = doc(getVersionsCollection(pageId), versionId);
    return getDoc(versionsRef);
}

export async function getLatestVersion(pageId: string) {
    const pageRef = await getPage(pageId);
    const latestVersion = pageRef.data()?.latestVersion;
    if (latestVersion) {
        return getVersion(pageId, latestVersion);
    }
    return null;
}

export async function updateLatestVersion(pageId: string, versionId: string) {
    const pageRef = doc(getPagesCollection(), pageId);
    return updateDoc(pageRef, {
        latestVersion: versionId,
    });
}

export async function getPageByPath(path: string) {
    const pagesRef = getPagesCollection();
    const q = query(pagesRef, where("path", "==", path));
    const snapshot = await getDocs(q);
    return snapshot.docs[0];
}

export async function getLatestVersionDataByPath<T>(path: string) {
    const pageRef = await getPageByPath(path);
    if (!pageRef) return null;
    const latestVersion = await getLatestVersion(pageRef.id);
    if (!latestVersion) return null;
    const data = latestVersion.data()?.content;
    if (!data) return null;
    return JSON.parse(data) as T;
}