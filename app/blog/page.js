import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const metadata = {
  title: 'Blog | Dr Serge Chaussé',
  description: 'Conseils dentaires et actualités par Dr Serge Chaussé, dentiste à Montréal.',
}

export default async function BlogPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('id, titre, slug, excerpt, image_url, categorie, date_publication')
    .eq('publie', true)
    .order('date_publication', { ascending: false })

  const categories = [...new Set(articles?.map(a => a.categorie).filter(Boolean))]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-cream pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* En-tête */}
          <div className="text-center mb-16">
            <p className="text-dental-600 text-sm tracking-widest uppercase mb-3">Conseils & actualités</p>
            <h1 className="font-display text-5xl text-charcoal mb-4">Le blogue</h1>
            <p className="text-warm-gray max-w-xl mx-auto">
              Des conseils dentaires, des explications sur les traitements et mes réflexions sur la dentisterie moderne.
            </p>
          </div>

          {/* Filtres catégories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map(cat => (
                <span key={cat} className="px-4 py-1.5 bg-white border border-dental-200 text-dental-700 rounded-full text-sm font-medium">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Grille articles */}
          {articles?.length === 0 ? (
            <p className="text-center text-warm-gray py-20">Aucun article publié pour l'instant.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles?.map(article => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                    {article.image_url ? (
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.titre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="h-52 bg-dental-50 flex items-center justify-center">
                        <span className="text-dental-300 text-5xl">🦷</span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {article.categorie && (
                        <span className="text-dental-600 text-xs tracking-widest uppercase mb-2 font-medium">
                          {article.categorie}
                        </span>
                      )}
                      <h2 className="font-display text-xl text-charcoal mb-3 group-hover:text-dental-600 transition-colors line-clamp-2">
                        {article.titre}
                      </h2>
                      {article.excerpt && (
                        <p className="text-warm-gray text-sm leading-relaxed flex-1 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                        <time className="text-xs text-warm-gray">
                          {new Date(article.date_publication).toLocaleDateString('fr-CA', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </time>
                        <span className="text-dental-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                          Lire →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
