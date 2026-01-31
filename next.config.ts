import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Empty turbopack config to silence Next.js 16 warning
  turbopack: {},

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude puppeteer from webpack bundling
      config.externals = [...(config.externals || []), 'puppeteer']
    }
    return config
  },
};

export default nextConfig;
