import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Code Bin',
    short_name: 'Code Bin',
    description:
      'Create, edit, customize and share your code snippets in just a few clicks.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#09090f',
    theme_color: '#09090f',
    icons: [
      { src: '/logo-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/maskable_icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    shortcuts: [{ name: 'My Pastes', url: '/my-pastes' }]
  };
}
