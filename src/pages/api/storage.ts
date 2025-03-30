import { getFileInfo } from "@/services/firebase/admin/storage";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    if (typeof req.query.id !== "string") return res.status(400).json({ error: "Invalid id" });
    console.log("Download direct file with id:", req.query.id);
    const fileInfo = await getFileInfo(req.query.id);
    if (!fileInfo) return res.status(404).json({ error: "File not found" });
    if (!fileInfo.visible) return res.status(403).json({ error: "File not visible" });
    const isProduction = process.env.NODE_ENV !== "development";
    if (isProduction) return res.redirect("https://storage.functions.gui.dev.br/" + req.query.id);
    else return res.redirect("http://127.0.0.1:5001/gui-dev-br/us-central1/storage/" + req.query.id);
  } catch (error) {
    console.log("Api error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
