import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content/blog";
import { getShopProducts } from "@/lib/content/shop";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const [shopProducts, blogPosts] = await Promise.all([
    getShopProducts(),
    getBlogPosts(),
  ]);

  const staticRoutes = [
    "",
    "/menu",
    "/checkout",
    "/about",
    "/gallery",
    "/blog",
    "/contact",
    "/reservation",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...shopProducts.map((product) => ({
      url: `${base}/shop/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
