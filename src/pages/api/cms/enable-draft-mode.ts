import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const preview =
    req.query.secret === process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  if (!preview) {
    return res.status(401).json({ message: "Invalid secret" });
  }

  res.setDraftMode({ enable: true });
  res.redirect(req.query.path as string);
}
