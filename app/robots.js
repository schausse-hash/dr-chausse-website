// ================================================================
// app/robots.js — Généré automatiquement par Next.js 14
// Place ce fichier dans: app/robots.js
// ================================================================

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        // Bloquer les robots d'IA qui scrappent pour entraîner des modèles
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web'],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.dentiste.com/sitemap.xml',
  }
}
