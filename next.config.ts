import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "freelogopng.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "api.rumon.top",
      },
      {
        protocol: "https",
        hostname: "api.idealessons.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
