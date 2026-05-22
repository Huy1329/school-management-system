import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    //turbopackFileSystemCacheForDev: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      { protocol: "https",
         hostname: "*.onrender.com" 
      },
    ],
  },
};

export default nextConfig;