import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → served by Firebase Hosting (CDN, scale-to-zero, cheap, secure)
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  // Assets are pre-optimized; static export can't run the Image Optimization server
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
