/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  staticPageGenerationTimeout: 180,
};

module.exports = nextConfig;