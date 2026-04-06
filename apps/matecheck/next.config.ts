import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "matecheck-api.vibers.co.kr" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "https://matecheck-api.vibers.co.kr"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
