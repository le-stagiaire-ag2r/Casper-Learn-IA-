/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Casper-Learn-IA-' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Casper-Learn-IA-/' : '',
}

module.exports = nextConfig
