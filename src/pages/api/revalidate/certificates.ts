import { validateAdminUser } from "@/services/firebase/admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
interface Body {
  idToken?: string;
  certificateId?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idToken, certificateId } = req.body as Body;
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });
    if (!idToken) return res.status(401).json({ error: "Unauthorized missing token" });
    //if (!certificateId) return res.status(400).json({ error: "Missing certificateId" });
    const isAdmin = await validateAdminUser(idToken);
    if (!isAdmin) return res.status(401).json({ error: "Unauthorized by firebase" });
    await res.revalidate('/certificates')
    if(certificateId) await res.revalidate(`/certificate/${encodeURIComponent(certificateId)}`, {
      unstable_onlyGenerated: true,
    })
    return res.status(200).json({ message: "Certificate revalidated" });
  } catch (error) {
    console.error("erro da api",error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
