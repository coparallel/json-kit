import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/', '/cdn-cgi/'],
    },
    sitemap: 'https://json-kit.com/sitemap.xml',
  }
}