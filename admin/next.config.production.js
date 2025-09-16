/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'https://your-backend-url.com',
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/admin' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/admin' : '',
}

module.exports = nextConfig
