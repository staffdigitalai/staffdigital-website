import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // Suppress next-intl dynamic import parsing warnings
    config.infrastructureLogging = {
      level: 'error',
    }
    return config
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.staffdigital.ai',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sectores/peluquerias',
        destination: '/sectores/centros-belleza',
        permanent: true,
      },
      {
        source: '/sectores/almacenes',
        destination: '/sectores/logistica',
        permanent: true,
      },
      {
        source: '/sectores/dentistas',
        destination: '/sectores/clinicas',
        permanent: true,
      },
      {
        source: '/car-dealerships',
        destination: '/sectores/concesionarios',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
