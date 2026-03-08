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
    .select('title, intro, meta_title, meta_description')
    .eq('slug', params.slug)
    .eq('lang', 'fr')  // ✅ corrigé: 'locale' → 'lang'
    .single()
  if (!data) return {}
  return {
    title: data.meta_title || `${data.title} | Dr Serge Chaussé`,
    description: data.meta_description || data.intro,
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
    'ATM / Botox': '💉', 'Médecine du sommeil': '😴',
  }

  const benefits = Array.isArray(service.benefits) ? service.benefits : []
  const process = Array.isArray(service.process) ? service.process : []
  const faq = Array.isArray(service.faq) ? service.faq : []

  return (
    <main>
      {/* HERO */}
      <div className="relative pt-20 bg-dental-900">
        <div className="max-w-4xl mx-auto px-6 py-20 text-white text-center">
          <div className="text-6xl mb-6">{service.icon || categoryEmojis[service.category] || '🦷'}</div>
          {service.hero_tagline && (
            <div className="text-dental-300 text-sm font-medium uppercase tracking-widest mb-3">
              {service.hero_tagline}
            </div>
          )}
          <h1 className="font-display text-4xl md:text-5xl mb-4">{service.title}</h1>
          {service.hero_subtitle && (
            <p className="text-xl text-white/80 max-w-2xl mx-auto">{service.hero_subtitle}</p>
          )}
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/services" className="inline-flex items-center gap-2 text-dental-600 hover:underline mb-12 text-sm">
            ← Tous les services
          </Link>

          {/* INTRO */}
          {service.intro && (
            <p className="text-warm-gray leading-relaxed text-lg mb-16">{service.intro}</p>
          )}

          {/* BÉNÉFICES */}
          {benefits.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl text-charcoal mb-8">Pourquoi choisir ce traitement?</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className="bg-cream rounded-2xl p-6">
                    <div className="text-3xl mb-3">{b.icon}</div>
                    <h3 className="font-semibold text-charcoal mb-2">{b.title}</h3>
                    <p className="text-warm-gray text-sm leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROCESSUS */}
          {process.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl text-charcoal mb-8">Comment ça se passe?</h2>
              <div className="space-y-6">
                {process.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dental-100 flex items-center justify-center text-dental-700 font-bold text-sm">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">{step.title}</h3>
                      <p className="text-warm-gray text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIDÉO */}
          {service.video_id && (
            <div className="mb-16">
              <h2 className="font-display text-2xl text-charcoal mb-6">{service.video_title || 'En savoir plus'}</h2>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${service.video_id}`}
                  title={service.video_title || service.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* FAQ */}
          {faq.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl text-charcoal mb-8">Questions fréquentes</h2>
              <div className="space-y-6">
                {faq.map((item, i) => (
                  <div key={i} className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-charcoal mb-2">{item.q}</h3>
                    <p className="text-warm-gray text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
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
