import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for full-screen photos so they stay crisp on the projector.
    qualities: [75, 90],
  },
};

export default nextConfig;
