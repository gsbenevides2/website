import { getFirestore } from "./config";

export async function getStorage(id: string) {
  const firestoreConfig = await getFirestore();
  const response = await fetch(`${firestoreConfig.url}storage/${id}`, {
    headers: {
      Authorization: `Bearer ${firestoreConfig.accessToken}`,
    },
  });
  if (!response.ok) return null;
  const data = await response.json();
  return {
    id: id,
    visible: data.fields.visible.booleanValue,
    allowedUsers: data.fields.allowedUsers.arrayValue?.values?.map((value: any) => value.stringValue) || [],
  };
}
