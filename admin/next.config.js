/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000',
  },
}

module.exports = nextConfig

