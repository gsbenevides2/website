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

  await res.revalidate("/");
  await res.revalidate("/about");
  res.status(200).json({ message: "Content revalidated" });
}
