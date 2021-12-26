/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
};
