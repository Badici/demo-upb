import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/demo/**',
      },
      {
        pathname: '/images/**',
      },
      {
        pathname: '/logo-facultati/**',
      },
      {
        pathname: '/hero-sequence/**',
      },
      {
        pathname: '/sketch-assets/**',
      },
      {
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withNextIntl(nextConfig)
