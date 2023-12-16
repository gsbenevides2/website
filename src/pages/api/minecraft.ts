import { NextApiRequest, NextApiResponse } from "next";
import { pingBedrock } from "@minescope/mineping";
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await pingBedrock("google.gui.dev.br");
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
