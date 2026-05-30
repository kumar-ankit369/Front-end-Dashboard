import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Build will succeed even if there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build will succeed even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
