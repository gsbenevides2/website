import { getBlob, getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

interface Project {
  id: string;
  name: string;
  github?: string;
  youtube?: string;
  descriptionDesktop: string;
  descriptionMobile: string;
  image: string;
  keywords: string[];
  imageBlur: string;
}

type ProjectInFirestore = Omit<Project, "id">;

interface ProjectToAddOrUpdate extends Omit<Project, "id" | "image"> {
  id?: string;
  image: File;
}

interface ProjectSet {
  id: string;
  name: string;
  image: string;
  keywords: string[];
  imageBlur: string;
}

function getProjectsCollection() {
  const firestore = Firebase.getFirestore();
  return collection(firestore, "projects") as CollectionReference<
    Omit<ProjectInFirestore, "id">
  >;
}

async function uploadProjectImageFile(certificationId: string, file: File) {
  const storage = Firebase.getStorage();
  const certificationsRef = ref(storage, `projects`);
  const certificationRef = ref(certificationsRef, `${certificationId}.pdf`);
  await uploadBytes(certificationRef, file);
  return await getDownloadURL(certificationRef);
}

export async function addOrUpdateProject(project: ProjectToAddOrUpdate) {
  const projectsRef = getProjectsCollection();
  const projectDoc = project.id
    ? doc(projectsRef, project.id)
    : doc(projectsRef);
  const projectId = projectDoc.id;
  const imageDownloadUrl = await uploadProjectImageFile(
    projectId,
    project.image
  );
  await setDoc(projectDoc, {
    name: project.name,
    github: project.github,
    youtube: project.youtube,
    descriptionDesktop: project.descriptionDesktop,
    descriptionMobile: project.descriptionMobile,
    image: imageDownloadUrl,
    keywords: project.keywords,
    imageBlur: project.imageBlur,
  });

  return projectId;
}

export async function listProjects(): Promise<ProjectSet[]> {
  const projects = await getDocs(getProjectsCollection());
  const projectsList: ProjectSet[] = projects.docs.map((project) => {
    const { name, image, keywords, imageBlur } = project.data();
    const id = project.id;
    return { id, name, image, keywords, imageBlur };
  });
  return projectsList;
}

export async function deleteProject(projectId: string) {
  const projectRef = doc(getProjectsCollection(), projectId);
  await deleteDoc(projectRef);
}

export async function getProject(projectId: string): Promise<Project> {
  const projectRef = doc(getProjectsCollection(), projectId);
  const project = await getDoc(projectRef);
  const projectData = project.data();
  if (!projectData)
    throw new MyError(
      "project-not-found",
      `Projeto não encontrado. O projeto com id: ${projectId} não foi encontrado no Firebase Firestore!`
    );
  return {
    id: project.id,
    ...projectData,
  };
}

export async function getProjectImageFile(projectId: string): Promise<File> {
  const fileName = `${projectId}.pdf`;
  const storage = Firebase.getStorage();
  const projectsRef = ref(storage, `projects`);
  const projectRef = ref(projectsRef, fileName);
  const blob = await getBlob(projectRef);
  return new File([blob], fileName, { type: blob.type });
}
