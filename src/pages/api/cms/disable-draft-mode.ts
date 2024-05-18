import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.setDraftMode({ enable: false });
  res.send({ message: "Draft mode disabled" });
}
