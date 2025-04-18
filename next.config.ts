import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ulvpgbldyzocunff.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
