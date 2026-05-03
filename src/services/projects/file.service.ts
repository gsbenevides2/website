import { getProjectImageFile } from "@/services/firebase/client/projects";

export async function downloadProjectImageFile(projectId: string): Promise<File> {
  return await getProjectImageFile(projectId);
}
