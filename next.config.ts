import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',       // important for Amplify SSR
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false, // ensures TypeScript errors break the build
  },
     images: {
    domains: ['fakestoreapi.com'],
  },
 
};

export default nextConfig;
