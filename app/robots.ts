import { MetadataRoute } from 'next'
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/cdn-cgi/',      // Stops the Cloudflare 404 error
        '/api/',          // Protects your backend routes
        // '/_next/',        // Ignored by default, but good practice
        '/private/',      // Any admin/private folders
      ], // Block API routes if you have any
    },
    sitemap: 'https://json-kit.com/sitemap.xml',
  }
}