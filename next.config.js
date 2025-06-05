/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/recipe-images/**',
      },
    ],
  },
  experimental: {
    // Enable static exports if needed
    // output: 'export',
  },
}

module.exports = nextConfig