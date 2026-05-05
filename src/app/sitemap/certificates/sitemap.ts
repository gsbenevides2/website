import { getAllCertificatesIds } from "@/services/firebase/adminForEdge/certificates";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urlDomain = process.env.NEXT_DOMAIN || "http://localhost:3000";
  const allPostsIds = await getAllCertificatesIds();

  const urls = allPostsIds.map<MetadataRoute.Sitemap[0]>((id) => {
    return {
      url: `${urlDomain}/certificate/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });

  return urls;
}
