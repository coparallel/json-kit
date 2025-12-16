import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'JSON-Kit',
    short_name: 'JSON-Kit',
    description: 'The Universal JSON Workbench',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png', // You can use a 512 version here if you have it
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}