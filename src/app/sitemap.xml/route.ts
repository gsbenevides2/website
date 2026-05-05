export function GET() {
  const indexes = ["pages", "blog-posts", "certificates", "projects"];
  const xml = `
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${indexes
          .map((index) => {
            return `
                    <sitemap>
                        <loc>${process.env.NEXT_DOMAIN || "http://localhost:3000"}/sitemap/${index}/sitemap.xml</loc>
                        <lastmod>${new Date().toISOString()}</lastmod>
                    </sitemap>
                `;
          })
          .join("")}
    </sitemapindex>
    `;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
