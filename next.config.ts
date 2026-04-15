import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Your existing header config
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate, max-age=0',
            },
          ],
        },
      ]
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=*',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ]
  },

  // Update redirects to handle API securely
  async redirects() {
    // Skip redirects in development
    if (process.env.NODE_ENV === 'development') {
      return []
    }

    return [
      {
        source: '/api/:path*',
        has: [
          {
            type: 'header',
            key: 'x-skip-api-redirect',
          },
        ],
        destination: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://property.new'}/api/:path*`,
        permanent: true,
      },
    ]
  },

  // Add rewrites for API
  async rewrites() {
    // Skip rewrites in development
    if (process.env.NODE_ENV === 'development') {
      return []
    }

    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://property.new'}/api/:path*`,
      },
    ]
  },

  images: {
    remotePatterns: [
      { hostname: 'property.new' },
      { hostname: 'property.cladbe.com' },
      { hostname: 'lh3.googleusercontent.com' },
    ],
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },

  webpack: (config, { isServer, nextRuntime }) => {
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Your existing webpack config
    if(nextRuntime === "edge" || isServer){
      config.resolve.fallback = {
        ...config.resolve.fallback,
        http: false,
        https: false,
        querystring: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        "edge-runtime": false,
      };
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: "crypto-browserify",
        stream: "stream-browserify",
        util: "util/",
        buffer: "buffer/",
      };
    }

    return config;
  },

  output:"standalone",

  // Add environment variable
  env:{
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "https://property.new",
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://property.new",
  },

  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
