import { validateAdminUser } from "@/services/firebase/admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
interface Body {
  idToken?: string;
  postId?: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idToken, postId } = req.body as Body;
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });
    if (!idToken) return res.status(401).json({ error: "Unauthorized" });
    if (!postId) return res.status(400).json({ error: "Missing postId" });
    const isAdmin = await validateAdminUser(idToken);
    if (!isAdmin) return res.status(401).json({ error: "Unauthorized" });
    await res.revalidate('/blog')
    await res.revalidate(`/blog/post/${encodeURIComponent(postId)}`, {
      unstable_onlyGenerated: true,
    })
    return res.status(200).json({ message: "Post revalidated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
