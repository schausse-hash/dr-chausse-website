'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { PageViewTracker } from '@/components/PageViewTracker'

function createSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

const CATEGORIES = [
  { id: 'famille', label: 'Famille', emoji: '👨‍👩‍👧‍👦', description: 'Mon épouse Diane, mes quatre enfants et mes petits-enfants.', type: 'photos' },
  { id: 'voyages', label: 'Voyages', emoji: '✈️', description: 'Explorer le monde en famille, découvrir de nouvelles cultures.', type: 'photos' },
  { id: 'plongee', label: 'Plongée', emoji: '🤿', description: 'La beauté silencieuse des fonds marins.', type: 'photos' },
  { id: 'aventures', label: 'Aventures', emoji: '🌵', description: 'Moto père-fille, randonnées et toutes les aventures de la vie.', type: 'photos' },
  { id: 'videos', label: 'Vidéos', emoji: '🎬', description: 'Moments de vie en vidéo.', type: 'videos' },
]

export default function MaViePage() {
  const [photos, setPhotos] = useState({})
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('famille')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    loadAllPhotos()
    loadVideos()
  }, [])

  useEffect(() => {
    setLightbox(null)
  }, [activeCategory])

  async function loadAllPhotos() {
    const supabase = createSupabase()
    const result = {}
    for (const cat of CATEGORIES.filter(c => c.type === 'photos')) {
      const { data } = await supabase.storage.from(cat.id).list('', {
        sortBy: { column: 'name', order: 'asc' }
      })
      result[cat.id] = (data || [])
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => ({
          name: f.name,
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${cat.id}/${f.name}`,
          caption: f.name.replace(/^\d+-/, '').replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        }))
    }
    setPhotos(result)
    setLoading(false)
  }

  async function loadVideos() {
    const supabase = createSupabase()
    const { data } = await supabase
      .from('ma_vie_videos')
      .select('*')
      .eq('published', true)
      .order('ordre', { ascending: true })
    setVideos(data || [])
  }

  function openLightbox(index) {
    setLightbox(index)
    document.body.style.overflow = 'hidden'
  }

  function closeLightbox() {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    function handleKey(e) {
      if (lightbox === null) return
      const photos = currentPhotos
      if (e.key === 'ArrowLeft') setLightbox(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setLightbox(i => Math.min(photos.length - 1, i + 1))
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  const activeCat = CATEGORIES.find(c => c.id === activeCategory)
  const currentPhotos = photos[activeCategory] || []

  return (
    <main>
 <PageViewTracker />
    
      {/* BANNIÈRE — desktop seulement */}
<div className="relative pt-20 bg-dental-900 hidden lg:block">
  <div className="max-w-4xl mx-auto px-6 py-20 text-white text-center">
    <div className="section-divider mx-auto mb-4 bg-white" />
    <h1 className="font-display text-4xl md:text-5xl mb-4">Ma vie, mes passions</h1>
    <p className="text-xl text-white/80 max-w-2xl mx-auto">
      « Ma vie ne s'est pas arrêtée qu'à la dentisterie. Les plus beaux sourires
      sont ceux de mon épouse, de mes quatre enfants, et de mes petits-enfants. »
    </p>
  </div>
</div>

{/* BANNIÈRE MOBILE — titre compact seulement */}
<div className="lg:hidden pt-20 bg-dental-900">
  <div className="max-w-4xl mx-auto px-6 py-8 text-white text-center">
   <h1 className="font-display text-xl text-white/80">Ma vie, mes passions</h1>
  </div>
</div>

      {/* SOUS-MENU CATÉGORIES */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                activeCategory === cat.id
                  ? 'border-dental-600 text-dental-700'
                  : 'border-transparent text-warm-gray hover:text-charcoal hover:border-gray-300'
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION PRINCIPALE */}
      <section className="py-16 bg-cream min-h-[600px]">
        <div className="max-w-5xl mx-auto px-6">

          {/* Titre section */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-3">{activeCat?.emoji}</div>
            <h2 className="font-display text-3xl text-charcoal mb-2">{activeCat?.label}</h2>
            <p className="text-warm-gray">{activeCat?.description}</p>
          </div>

          {loading ? (
            <p className="text-center text-warm-gray py-20">Chargement...</p>
          ) : activeCat?.type === 'videos' ? (
            /* ── GRILLE VIDÉOS ── */
            videos.length === 0 ? (
              <p className="text-center text-warm-gray py-20 text-lg">Vidéos à venir...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map(video => (
                  <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-md">
                    <div className="relative" style={{ paddingTop: '56.25%' }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.youtube_id}`}
                        title={video.titre}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-charcoal">{video.titre}</h3>
                      {video.description && <p className="text-sm text-warm-gray mt-1">{video.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* ── GRILLE PHOTOS ── */
            currentPhotos.length === 0 ? (
              <p className="text-center text-warm-gray py-20 text-lg">Photos à venir...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {currentPhotos.map((photo, index) => (
                  <button
                    key={photo.name}
                    onClick={() => openLightbox(index)}
                    className="relative aspect-square rounded-xl overflow-hidden group bg-gray-100"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {photo.caption && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end">
                        <p className="text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-all capitalize">
                          {photo.caption}
                        </p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* NOS PASSIONS */}
      <section className="py-12 bg-dental-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-3">Nos passions</p>
          <div className="flex flex-wrap justify-center gap-4 text-white/80">
            <span>🏍️ Moto père-fille</span>
            <span className="text-white/30">•</span>
            <span>✈️ Voyages en famille</span>
            <span className="text-white/30">•</span>
            <span>🤿 Plongée sous-marine</span>
            <span className="text-white/30">•</span>
            <span>🌵 Aventures</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl text-charcoal mb-4">Venez nous rencontrer</h2>
          <p className="text-warm-gray mb-8">Prenez rendez-vous pour une consultation.</p>
          <a href="tel:5145214141" className="btn-primary inline-flex items-center gap-2">
            📞 514.521.4141
          </a>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && currentPhotos[lightbox] && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl z-10">×</button>
          {lightbox > 0 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(i => i - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl z-10 px-4 py-2">‹</button>
          )}
          <div className="max-w-5xl px-16 py-8" onClick={e => e.stopPropagation()}>
            <img src={currentPhotos[lightbox].url} alt={currentPhotos[lightbox].caption}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl mx-auto" />
            {currentPhotos[lightbox].caption && (
              <p className="text-white/70 text-center mt-3 text-sm capitalize">{currentPhotos[lightbox].caption}</p>
            )}
            <p className="text-white/40 text-center mt-1 text-xs">{lightbox + 1} / {currentPhotos.length}</p>
          </div>
          {lightbox < currentPhotos.length - 1 && (
            <button onClick={e => { e.stopPropagation(); setLightbox(i => i + 1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl z-10 px-4 py-2">›</button>
          )}
        </div>
      )}
    </main>
  )
}
