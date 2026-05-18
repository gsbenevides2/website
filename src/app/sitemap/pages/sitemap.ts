import type { MetadataRoute } from "next";

const pages = ["/", "/about", "/blog", "/contacts", "/minecraft", "/pix"];

export default function sitemap(): MetadataRoute.Sitemap {
  const urlDomain = process.env.NEXT_DOMAIN || "http://localhost:3000";

  const urls = pages.map<MetadataRoute.Sitemap[0]>((page) => {
    return {
      url: `${urlDomain}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    };
  });
  return urls;
}
