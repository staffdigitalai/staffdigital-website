/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/car-dealerships',
        destination: '/sectores/concesionarios',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
