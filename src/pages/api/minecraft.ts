import { getLatestVersionDataByPath } from "@/services/firebase/client/cms";
import { pingBedrock } from "@minescope/mineping";
import { NextApiRequest, NextApiResponse } from "next";
import { CMSData } from "../minecraft";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const cms = await getLatestVersionDataByPath<CMSData>("/minecraft");
    if (!cms) {
      return res.status(404).json({ error: "Minecraft page not found" });
    }
    const { ip, port } = cms;
    const data = await pingBedrock(ip, {
      port: port as number & { _brand: "Port" },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
