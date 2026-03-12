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
                  {section.liste && (
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
