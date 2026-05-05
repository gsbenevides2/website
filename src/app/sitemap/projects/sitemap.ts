import { getAllProjectsIds } from "@/services/firebase/adminForEdge/projects";
import type { MetadataRoute } from "next";

const pages = ["/", "/about", "/blog", "/contact", "/minecraft", "/pix"];
const otherSitemaps = ["/blog-posts/sitemap.xml"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urlDomain = process.env.NEXT_DOMAIN || "http://localhost:3000";
  const allPostsIds = await getAllProjectsIds();

  const urls = allPostsIds.map<MetadataRoute.Sitemap[0]>((id) => {
    return {
      url: `${urlDomain}/project/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });

  return urls;
}
