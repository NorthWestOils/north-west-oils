import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/company";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  /* Bump when page content changes. A lastmod that is always "now" tells
     search engines the field is meaningless. */
  const lastModified = new Date("2026-09-26");

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/products`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...products.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/quality`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
