import { getFirestore } from "./config";

export async function getLink(id: string) {
  const firestoreConfig = await getFirestore();
  const response = await fetch(`${firestoreConfig.url}links/${id}`, {
    headers: {
      Authorization: `Bearer ${firestoreConfig.accessToken}`,
    },
  });
  if (!response.ok) return null;
  const data = await response.json();
  return {
    id: id,
    url: data.fields.url.stringValue,
  };
}
