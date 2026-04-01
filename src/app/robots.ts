import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/workbench-editor", "/nice-try"],
    },
    sitemap: "https://sonnytaylor.me/sitemap.xml",
  };
}
