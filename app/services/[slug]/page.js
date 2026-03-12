import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function createSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export async function generateMetadata({ params }) {
  const supabase = createSupabase()
  const { data } = await supabase
    .from('services')
    .select('title, excerpt, seo_title, seo_description')
    .eq('slug', params.slug)
    .eq('locale', 'fr')
    .single()
  if (!data) return {}
  return {
    title: data.seo_title || `${data.title} | Dr Serge Chaussé`,
    description: data.seo_description || data.excerpt,
  }
}

const categoryMap = {
  'Implantologie': ['Implants', 'Implantologie'],
  'Chirurgie': ['Chirurgie', 'Extraction'],
  'Orthodontie': ['Orthodontie', 'Invisalign'],
  'Parodontie': ['Parodontie', 'Gencives'],
  'Réhabilitation': ['Réhabilitation', 'Prothèse'],
  'ATM / Botox': ['Botox', 'ATM', 'Douleur'],
  'Botox esthétique': ['Botox', 'Esthétique'],
}

export default async function ServiceDetailPage({ params }) {
  const supabase = createSupabase()
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.slug)
    .eq('locale', 'fr')
    .eq('published', true)
    .single()

  if (!service) notFound()

  // Articles reliés par catégorie
  const categories = categoryMap[service.category] || []
  let articlesRelies = []
  if (categories.length > 0) {
    const { data } = await supabase
      .from('articles')
      .select('title, slug, excerpt, image_url, categorie, date_publication')
      .eq('published', true)
      .eq('locale', 'fr')
      .in('categorie', categories)
      .order('date_publication', { ascending: false })
      .limit(3)
    articlesRelies = data || []
  }
  // Si aucun article relié, prendre les 2 plus récents
  if (articlesRelies.length === 0) {
    const { data } = await supabase
      .from('articles')
      .select('title, slug, excerpt, image_url, categorie, date_publication')
      .eq('published', true)
      .eq('locale', 'fr')
      .order('date_publication', { ascending: false })
      .limit(2)
    articlesRelies = data || []
  }

  const categoryEmojis = {
    'Chirurgie': '🏥', 'Implantologie': '🦷', 'Réhabilitation': '👑',
    'Orthodontie': '😊', 'Technologie': '✨', 'Esthétique': '💎',
    'Prévention': '🩺', 'Parodontie': '🛡️', 'Restauration': '🔬',
    'ATM / Botox': '💉', 'Botox esthétique': '✨', 'Médecine du sommeil': '😴',
  }

  const content = Array.isArray(service.content)
    ? service.content
    : typeof service.content === 'string'
      ? JSON.parse(service.content)
      : []

  return (
    <main>
      {/* HERO */}
      <div className="relative pt-20 bg-dental-900">
        <div className="max-w-4xl mx-auto px-6 py-20 text-white text-center">
          <div className="text-6xl mb-6">{categoryEmojis[service.category] || '🦷'}</div>
          <div className="text-dental-300 text-sm font-medium uppercase tracking-widest mb-3">
            {service.category}
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{service.title}</h1>
          {service.excerpt && (
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{service.excerpt}</p>
          )}
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/services" className="inline-flex items-center gap-2 text-dental-600 hover:underline mb-12 text-sm">
            ← Tous les services
          </Link>

          {/* CONTENU DYNAMIQUE DEPUIS SUPABASE */}
          {content.length > 0 ? (
            <div className="space-y-10">
              {content.map((section, i) => (
                <div key={i}>
                  {section.titre && (
                    <h2 className="font-display text-2xl text-charcoal mb-4">{section.titre}</h2>
                  )}
                  {section.texte && (
                    <p className="text-warm-gray leading-relaxed mb-4">{section.texte}</p>
                  )}
                  {section.liste && section.liste.length > 0 && (
                    <ul className="space-y-3 mt-3">
                      {section.liste.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-warm-gray">
                          <span className="text-dental-500 mt-1 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-warm-gray">Contenu à venir. Contactez-nous pour plus d'informations.</p>
          )}

          {/* ARTICLES RELIÉS */}
          {articlesRelies.length > 0 && (
            <div className="mt-16">
              <div className="section-divider mb-4" />
              <h3 className="font-display text-2xl text-charcoal mb-2">
                📖 Articles reliés
              </h3>
              <p className="text-warm-gray text-sm mb-6">
                Apprenez-en plus sur ce sujet dans notre blogue
              </p>
              <div className="space-y-4">
                {articlesRelies.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="flex gap-4 p-4 bg-cream rounded-xl hover:bg-dental-50 transition-colors group"
                  >
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-16 bg-dental-100 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl">
                        🦷
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-charcoal group-hover:text-dental-600 transition-colors">
                        {article.title}
                      </div>
                      {article.excerpt && (
                        <p className="text-sm text-warm-gray mt-1 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                      {article.categorie && (
                        <span className="text-xs text-dental-500 mt-1 inline-block">
                          📁 {article.categorie}
                        </span>
                      )}
                    </div>
                    <div className="text-dental-400 group-hover:text-dental-600 transition-colors self-center flex-shrink-0">
                      →
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 mt-6 text-dental-600 hover:underline text-sm font-medium"
              >
                Voir tous les articles →
              </Link>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-cream rounded-3xl p-8 text-center">
            <h3 className="font-display text-2xl text-charcoal mb-3">Vous avez des questions?</h3>
            <p className="text-warm-gray mb-6">Contactez-nous pour une consultation gratuite.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:5145214141" className="btn-primary inline-flex items-center gap-2">
                📞 514.521.4141
              </a>
              <a href="/#contact" className="btn-outline border-dental-600 text-dental-600 hover:bg-dental-600 hover:text-white inline-block">
                Envoyer un message
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
