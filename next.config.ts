import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     images: {
    domains: ['fakestoreapi.com'],
  },
  output: 'standalone',
  reactStrictMode: true,
};

export default nextConfig;
