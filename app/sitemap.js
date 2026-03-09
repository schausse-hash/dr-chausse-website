// ================================================================
// app/sitemap.js — Généré automatiquement par Next.js 14
// Place ce fichier dans: app/sitemap.js
// ================================================================

export default function sitemap() {
  const baseUrl = 'https://www.dentiste.com'
  const now = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/apropos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/formation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/avantapres`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ma-vie`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
