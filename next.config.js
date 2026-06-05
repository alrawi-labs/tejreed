/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
  },
}

module.exports = nextConfig