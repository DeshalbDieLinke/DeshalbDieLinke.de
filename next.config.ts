import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Target must be serverless
  images: {
    domains: ["ddl.fra1.cdn.digitaloceanspaces.com", "ddl.fra1.digitaloceanspaces.com", "img.clerk.com"],

  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
