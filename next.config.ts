import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ecommerce.routemisr.com' },
      { protocol: 'https', hostname: '*.routemisr.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: '*.pexels.com' },
    ],
  },
};

export default nextConfig;