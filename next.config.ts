import type { NextConfig } from "next";

const CANONICAL_HOST = "akprime.co.ke";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://assets.mixkit.co",
      "connect-src 'self' https://www.google-analytics.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www → non-www (permanent)
      {
        source: "/:path*",
        has: [{ type: "host", value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      // http → https (permanent, non-www)
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    // Serve AVIF first, then WebP — significant size savings over JPEG/PNG
    formats: ["image/avif", "image/webp"],
    // Serve compressed images longer — avoids re-optimising on every new deploy
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Explicit size breakpoints used by <Image sizes="..."> props
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.vercel.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
    ],
  },
  experimental: {
    // next/font/google needs TLS access to fonts.googleapis.com at build time
    turbopackUseSystemTlsCerts: true,
    // Inline critical CSS to remove render-blocking stylesheet requests
    optimizeCss: true,
  },
};

export default nextConfig;
