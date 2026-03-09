// app/blog/page.jsx
// Fetche automatiquement les articles de docchausse.blogspot.com via RSS

import Link from 'next/link'
import { ExternalLink, BookOpen, Clock, Tag } from 'lucide-react'

// ── Fetch RSS côté serveur (Next.js Server Component) ────────────
async function getBlogPosts() {
  try {
    const res = await fetch(
      'https://docchausse.blogspot.com/feeds/posts/default?alt=rss&max-results=20',
      {
        next: { revalidate: 3600 }, // Re-fetche toutes les heures
      }
    )
    if (!res.ok) throw new Error('RSS fetch failed')
    const xml = await res.text()

    // Parser le XML manuellement (pas de lib externe nécessaire)
    const items = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    let match

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1]

      const title = decodeHtmlEntities(extractTag(itemXml, 'title'))
      const link = extractTag(itemXml, 'link') || extractTag(itemXml, 'guid')
      const pubDate = extractTag(itemXml, 'pubDate')
      const description = extractTag(itemXml, 'description')
      const categories = extractAllTags(itemXml, 'category')

      // Extraire une image de la description si disponible
      const imgMatch = description.match(/<img[^>]+src="([^"]+)"/)
      const image = imgMatch ? imgMatch[1] : null

      // Nettoyer le texte de la description (retirer HTML)
      const cleanDesc = description
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 200)

      items.push({
        title,
        link,
        pubDate: pubDate ? new Date(pubDate) : null,
        description: cleanDesc,
        image,
        categories,
      })
    }

    return items
  } catch (err) {
    console.error('RSS Error:', err)
    return []
  }
}

function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)
  const cdataMatch = xml.match(regex)
  if (cdataMatch) return cdataMatch[1].trim()

  const simpleRegex = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`)
  const simpleMatch = xml.match(simpleRegex)
  return simpleMatch ? simpleMatch[1].trim() : ''
}

function extractAllTags(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`, 'g')
  const results = []
  let match
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim())
  }
  return results
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function formatDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ── Métadonnées SEO ───────────────────────────────────────────────
export const metadata = {
  title: 'Blog — Implantologie & Soins Dentaires | Dr Serge Chaussé',
  description: 'Articles et conseils du Dr Serge Chaussé sur l\'implantologie, les soins dentaires et les nouvelles technologies. Information pour les patients.',
  keywords: 'blog dentiste Montréal, articles implantologie, conseils soins dentaires, implants dentaires information',
  alternates: { canonical: 'https://www.dentiste.com/blog' },
  openGraph: {
    title: 'Blog — Dr Serge Chaussé | Implantologie & Soins Dentaires',
    description: 'Articles et conseils sur l\'implantologie et les soins dentaires.',
    url: 'https://www.dentiste.com/blog',
  },
}

// ── Composant page ────────────────────────────────────────────────
export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-white">Articles & Conseils</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
              Blog — Informations pour mes patients
            </h1>
            <p className="text-white/70 text-lg">
              Tout ce que vous devez savoir sur l'implantologie, les soins dentaires et les nouvelles technologies.
            </p>
          </div>
        </div>
      </section>

      {/* ── ARTICLES ─────────────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-warm-gray text-lg">Chargement des articles...</p>
              <a
                href="https://docchausse.blogspot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 mt-6"
              >
                Voir le blog <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="section-divider mx-auto mb-4" />
                <h2 className="font-display text-3xl text-charcoal mb-2">
                  {posts.length} articles disponibles
                </h2>
                <p className="text-warm-gray">
                  Source:{' '}
                  <a
                    href="https://docchausse.blogspot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dental-600 hover:underline inline-flex items-center gap-1"
                  >
                    docchausse.blogspot.com <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                  <article
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Image si disponible */}
                    {post.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {!post.image && (
                      <div className="h-32 bg-dental-50 flex items-center justify-center">
                        <span className="text-4xl">🦷</span>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      {/* Date */}
                      {post.pubDate && (
                        <div className="flex items-center gap-2 text-xs text-warm-gray mb-3">
                          <Clock className="w-3 h-3" />
                          {formatDate(post.pubDate)}
                        </div>
                      )}

                      {/* Titre */}
                      <h3 className="font-display text-lg text-charcoal mb-3 leading-snug">
                        {post.title}
                      </h3>

                      {/* Extrait */}
                      <p className="text-warm-gray text-sm leading-relaxed flex-1 mb-4">
                        {post.description}
                        {post.description.length >= 200 ? '...' : ''}
                      </p>

                      {/* Catégories */}
                      {post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.categories.slice(0, 3).map((cat, j) => (
                            <span
                              key={j}
                              className="inline-flex items-center gap-1 text-xs bg-dental-50 text-dental-700 rounded-full px-3 py-1"
                            >
                              <Tag className="w-3 h-3" />
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Lien */}
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-dental-600 hover:text-dental-800 font-medium text-sm mt-auto"
                      >
                        Lire l'article <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* CTA vers blog complet */}
              <div className="text-center mt-12">
                <a
                  href="https://docchausse.blogspot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Voir tous les articles sur le blog <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </>
          )}

        </div>
      </section>

      {/* ── CTA CONTACT ──────────────────────────────────────────── */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-display text-2xl text-charcoal mb-3">
            Une question après votre lecture?
          </p>
          <p className="text-warm-gray mb-8">Je suis disponible pour une consultation gratuite.</p>
          <Link href="/#contact" className="btn-primary">
            Me contacter
          </Link>
        </div>
      </section>

    </main>
  )
}
