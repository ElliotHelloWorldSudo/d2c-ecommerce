import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow external image sources used for mock data and future CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
