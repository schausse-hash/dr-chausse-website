/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/Divers/christ/eglise.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/guide-urgence-dent-cassee',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/drsmile/consultation-gratuite6',
        destination: '/#contact',
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig
