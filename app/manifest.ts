import type { MetadataRoute } from "next";
import { company } from "@/data/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.legalName,
    short_name: company.shortName,
    description: company.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#032014",
    theme_color: "#032014",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
