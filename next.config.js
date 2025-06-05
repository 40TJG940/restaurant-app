/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['eat.com'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;