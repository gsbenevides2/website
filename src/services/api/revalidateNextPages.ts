import { retriveIdToken } from "@/services/firebase/client/auth";

type Services = "certificates" | "projects" | "blog" | "cms";
const idsNames: Record<Services, string> = {
  certificates: "certificateId",
  projects: "projectId",
  blog: "postId",
  cms: "pageUrl",
};

export async function revalidateNextPages(
  services: Services,
  contentId: string
) {
  const idToken = await retriveIdToken();
  const idName = idsNames[services];
  const response = await fetch(`/api/revalidate/${services}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [idName]: contentId,
      idToken,
    }),
  });
  if (!response.ok) throw new Error("Falha ao revalidar páginas");
}
