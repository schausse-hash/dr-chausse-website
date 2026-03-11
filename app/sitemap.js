import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function sitemap() {
  const baseUrl = 'https://www.dentiste.com'
  const now = new Date().toISOString()

  // Pages statiques
  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/apropos`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/formation`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/avantapres`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/ma-vie`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  ].map(p => ({ ...p, lastModified: now }))

  // Services dynamiques
  const { data: services } = await supabase
    .from('services')
    .select('slug, updated_at')
    .eq('locale', 'fr')
    .eq('published', true)

  const servicePages = (services || []).map(s => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.updated_at || now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Articles de blog dynamiques
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('locale', 'fr')
    .eq('published', true)

  const articlePages = (articles || []).map(a => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: a.updated_at || now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...articlePages]
}
