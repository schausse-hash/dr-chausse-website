import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Tag, ArrowLeft } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function generateMetadata({ params }) {
  const { data } = await supabase
    .from('articles')
    .select('title, excerpt')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!data) return { title: 'Article introuvable' }
  return {
    title: `${data.title} | Dr Serge Chaussé`,
    description: data.excerpt,
  }
}

export default async function ArticlePage({ params }) {
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!article) notFound()

  const { data: relies } = article.categorie ? await supabase
    .from('articles')
    .select('id, title, slug, excerpt, image_url, date_publication')
    .eq('published', true)
    .eq('locale', 'fr')
    .eq('categorie', article.categorie)
    .neq('id', article.id)
    .limit(3) : { data: [] }

  const contentText = typeof article.content === 'string' ? article.content : ''

  return (
    <main className="min-h-screen bg-cream">

      {/* HERO */}
      <section className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {article.categorie && (
            <div className="flex items-center gap-1 text-white/60 text-sm mb-4">
              <Tag className="w-3 h-3" />
              {article.categorie}
            </div>
          )}
       <h1 className="font-display text-xl md:text-2xl text-white leading-tight mb-2">
            {article.title}
          </h1>
          {article.date_publication && (
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Clock className="w-3 h-3" />
              {new Date(article.date_publication).toLocaleDateString('fr-CA', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </div>
          )}
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">

          {article.image_url && (
            <div className="rounded-2xl overflow-hidden mb-10 shadow-sm">
              <img src={article.image_url} alt={article.title} className="w-full h-72 object-cover" />
            </div>
          )}

          <div className="prose prose-lg prose-stone max-w-none">
            {contentText.split('\n').map((para, i) =>
              para.trim() ? <p key={i} className="mb-4 text-warm-gray leading-relaxed">{para}</p> : null
            )}
          </div>

          {relies?.length > 0 && (
            <section className="mt-16 pt-12 border-t border-stone-200">
              <h2 className="font-display text-2xl text-charcoal mb-8">Articles reliés</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relies.map(r => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {r.image_url ? (
                        <img src={r.image_url} alt={r.title} className="w-full h-32 object-cover" />
                      ) : (
                        <div className="h-32 bg-dental-50 flex items-center justify-center text-3xl">🦷</div>
                      )}
                      <div className="p-4">
                        <h3 className="font-medium text-charcoal text-sm group-hover:text-dental-600 transition-colors line-clamp-2">
                          {r.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-dental-600 hover:text-dental-700 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Retour au blogue
            </Link>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-display text-2xl text-charcoal mb-3">Une question après votre lecture?</p>
          <p className="text-warm-gray mb-8">Je suis disponible pour une consultation.</p>
          <Link href="/#contact" className="btn-primary">Me contacter</Link>
        </div>
      </section>

    </main>
  )
}
