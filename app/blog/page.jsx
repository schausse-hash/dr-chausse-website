import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Clock, Tag } from 'lucide-react'


export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const metadata = {
  title: 'Blog — Implantologie & Soins Dentaires | Dr Serge Chaussé',
  description: "Articles et conseils du Dr Serge Chaussé sur l'implantologie et les soins dentaires.",
  alternates: { canonical: 'https://www.dentiste.com/blog' },
  openGraph: {
    title: 'Blog — Dr Serge Chaussé',
    description: "Articles et conseils sur l'implantologie et les soins dentaires.",
    url: 'https://www.dentiste.com/blog',
  },
}

export default async function BlogPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, image_url, categorie, date_publication')
    .eq('published', true)
    .eq('locale', 'fr')
    .order('date_publication', { ascending: false })

  const categories = [...new Set(articles?.map(a => a.categorie).filter(Boolean))]

  return (
    <main>

      

      {/* HERO */}
     <section className="hero-gradient pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-2xl md:text-3xl text-white mb-4">
              Blog &mdash; Informations pour mes patients
            </h1>
            <p className="text-white/70 text-lg">
              Conseils dentaires, explications sur les traitements et réflexions sur la dentisterie moderne.
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map(cat => (
                <span key={cat} className="px-4 py-1.5 bg-white border border-dental-200 text-dental-700 rounded-full text-sm font-medium">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {!articles || articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-warm-gray text-lg">Aucun article publié pour l'instant.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
                    {article.image_url ? (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-32 bg-dental-50 flex items-center justify-center">
                        <span className="text-4xl">🦷</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {article.date_publication && (
                        <div className="flex items-center gap-2 text-xs text-warm-gray mb-3">
                          <Clock className="w-3 h-3" />
                          {new Date(article.date_publication).toLocaleDateString('fr-CA', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </div>
                      )}
                      {article.categorie && (
                        <div className="flex items-center gap-1 text-xs text-dental-600 mb-2">
                          <Tag className="w-3 h-3" />
                          {article.categorie}
                        </div>
                      )}
                      <h2 className="font-display text-lg text-charcoal mb-3 leading-snug group-hover:text-dental-600 transition-colors">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-warm-gray text-sm leading-relaxed flex-1">
                          {article.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-dental-600 font-medium text-sm mt-4 group-hover:translate-x-1 transition-transform">
                        Lire l'article →
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
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
