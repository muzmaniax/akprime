import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first, then WebP — significant size savings over JPEG/PNG
    formats: ["image/avif", "image/webp"],
    // Explicit size breakpoints used by <Image sizes="..."> props
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.vercel.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
    ],
  },
  // Inline critical CSS to remove render-blocking stylesheet requests
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
