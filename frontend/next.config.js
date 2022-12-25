/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["picsum.photos"] },
  output: 'standalone',
}

module.exports = nextConfig
