import type { Metadata } from "next";
import { company } from "@/data/company";

const DEFAULT_IMAGE = {
  url: "/og/default.jpg",
  width: 1200,
  height: 630,
  alt: "North West Oils: soyabean refined oil, Kachi Ghani mustard oil and refined palmolein oil",
};

/**
 * Open Graph and Twitter tags for one page.
 *
 * Next.js replaces a parent's `openGraph` wholesale rather than merging it, so
 * a page that sets none inherits the homepage's title and URL — every shared
 * link then previews as the homepage. Every page goes through this instead.
 */
export function socialMetadata({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: company.legalName,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
