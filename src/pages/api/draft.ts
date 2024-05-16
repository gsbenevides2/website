import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setDraftMode({ enable: true });
  res.redirect(req.query.path as string);
}
