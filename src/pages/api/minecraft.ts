import { NextApiRequest, NextApiResponse } from "next";
import { ping } from "bedrock-protocol";
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await ping({ host: "google.gui.dev.br", port: 19132 });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
