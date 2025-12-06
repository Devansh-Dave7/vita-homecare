import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb', // Increased from default 1mb to support hero image uploads
    },
  },
};

export default nextConfig;
