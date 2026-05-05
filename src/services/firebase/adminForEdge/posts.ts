import { getFirestore } from "./config";

export async function getAllPublicPostsIds(): Promise<string[]> {
  const firestoreConfig = await getFirestore();

  const response = await fetch(`${firestoreConfig.url}posts`, {
    headers: {
      Authorization: `Bearer ${firestoreConfig.accessToken}`,
    },
  });

  if (!response.ok) return [];
  const data = await response.json();
  return data.documents
    .filter((doc: any) => doc.fields.visible.booleanValue === true)
    .map((doc: any) => doc.name.split("/").pop());
}
