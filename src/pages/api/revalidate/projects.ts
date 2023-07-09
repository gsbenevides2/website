import { validateAdminUser } from "@/services/firebase/admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
interface Body {
  idToken?: string;
  projectId?: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idToken, projectId } = req.body as Body;
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });
    if (!idToken) return res.status(401).json({ error: "Unauthorized" });
    if (!projectId) return res.status(400).json({ error: "Missing projectId" });
    const isAdmin = await validateAdminUser(idToken);
    if (!isAdmin) return res.status(401).json({ error: "Unauthorized" });
    await res.revalidate('/projects')
    await res.revalidate(`/project/${encodeURIComponent(projectId)}`, {
      unstable_onlyGenerated: true,
    })
    return res.status(200).json({ message: "Project revalidated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
