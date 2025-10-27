import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',       // important for Amplify SSR
  trailingSlash: true,
  env: {
    DATABASE_URL:process.env.DATABAE_URL, // ensures TypeScript errors break the build
    JWT_SECRET:process.env.JWT_CESRET
  },
     images: {
    domains: ['fakestoreapi.com'],
  },
 
};

export default nextConfig;
