import { validateAdminUser } from "@/services/firebase/admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
interface Body {
  idToken?: string;
  pageUrl?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idToken, pageUrl } = req.body as Body;
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });
    if (!idToken) return res.status(401).json({ error: "Unauthorized missing token" });
    //if (!certificateId) return res.status(400).json({ error: "Missing certificateId" });
    const isAdmin = await validateAdminUser(idToken);
    if (!isAdmin) return res.status(401).json({ error: "Unauthorized by firebase" });
    if(pageUrl) await res.revalidate(pageUrl, {
      unstable_onlyGenerated: true,
    })
    return res.status(200).json({ message: "Page revalidated" });
  } catch (error) {
    console.error("erro da api",error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
