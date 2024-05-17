import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setDraftMode({ enable: false });
  res.send({ message: "Draft mode disabled" });
}
