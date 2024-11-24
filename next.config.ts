import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.google.com'
      },
      {
        protocol: "https",
        hostname: "lh3.google.com", // 추가: Google 이미지 URL 호스트
      },
    ]
  }
};

export default nextConfig;
