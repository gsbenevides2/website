import { getLink } from "@/services/firebase/admin/links";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
    const { linkId } = req.query;
    const linkInfo = await getLink(linkId as string);
    if (!linkInfo) return res.status(404).json({ error: "Link not found" });
    return res.redirect(linkInfo.url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
