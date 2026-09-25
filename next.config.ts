import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // workout images come from this host
    remotePatterns: [{ protocol: "https", hostname: "img.magnific.com" }],
  },
};

export default nextConfig;
