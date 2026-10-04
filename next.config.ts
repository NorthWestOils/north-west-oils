import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF first — the packshots are flat colour and large areas of paper,
       which is exactly where it beats WebP. */
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384, 512],
    qualities: [75, 90, 95],
  },
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.1.2", "192.168.1.*"],
};

export default nextConfig;
