/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Enable type checking in production
  },
  images: {
    unoptimized: false,
    domains: [
      'localhost',
      'priyaherbal.com',
      'www.priyaherbal.com',
      'geisrdwsimouxlalschy.supabase.co', // Supabase image storage
    ],
    formats: ['image/webp', 'image/avif'],
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig
