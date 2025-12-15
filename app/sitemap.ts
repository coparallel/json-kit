import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://json-kit.com'
  
  // List all your static pages here
  const routes = [
    '',                 // Homepage
    '/json-formatter',
    '/json-visualizer',
    '/json-minifier',
    '/json-diff',
    '/json-to-csv',
    '/json-to-xml',
    '/json-to-yaml',
    // Add your other new tools here
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8, // Homepage is 1.0, tools are 0.8
  }))
}