import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'images.clerk.dev' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/MUkCmQjUSr',
        permanent: false
      },
      {
        source: '/github',
        destination: 'https://github.com/CodeBinGit',
        permanent: false
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/TheCodeBin',
        permanent: false
      },
      {
        source: '/status',
        destination: 'https://codebin.instatus.com',
        permanent: false
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
        ]
      }
    ];
  }
};

export default nextConfig;
