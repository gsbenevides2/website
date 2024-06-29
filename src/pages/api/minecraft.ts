import { getCMSDataForMinecraftPage } from "@/services/cms/minecraft";
import { pingBedrock } from "@minescope/mineping";
import console from "console";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req;
  const isPreview = url?.includes("isPreview=true") || false;
  try {
    const cmsData = await getCMSDataForMinecraftPage(isPreview);
    const { ip, port } = cmsData.entries.items[0].fields;
    const data = await pingBedrock(ip, {
      port,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
