import { getFirestore } from "./config";

export async function getAllCertificatesIds(): Promise<string[]> {
  const firestoreConfig = await getFirestore();

  const response = await fetch(`${firestoreConfig.url}certifications`, {
    headers: {
      Authorization: `Bearer ${firestoreConfig.accessToken}`,
    },
  });

  if (!response.ok) return [];
  const data = await response.json();
  console.log(data);
  return data.documents.map((doc: any) => doc.name.split("/").pop());
}
