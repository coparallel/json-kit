import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Block API routes if you have any
    },
    sitemap: 'https://json-kit.com/sitemap.xml',
  }
}