import { getAllPublicPostsIds } from "@/services/firebase/adminForEdge/posts";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urlDomain = process.env.NEXT_DOMAIN || "http://localhost:3000";
  const allPostsIds = await getAllPublicPostsIds();

  const urls = allPostsIds.map<MetadataRoute.Sitemap[0]>((id) => {
    return {
      url: `${urlDomain}/blog/post/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });

  return urls;
}
