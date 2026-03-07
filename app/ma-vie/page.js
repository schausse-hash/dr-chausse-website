'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

function createSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

const CATEGORIES = [
  { id: 'famille', label: 'Famille', emoji: '👨‍👩‍👧‍👦', description: 'Mon épouse Diane, mes quatre enfants et mes petits-enfants.' },
  { id: 'voyages', label: 'Voyages', emoji: '✈️', description: 'Explorer le monde en famille, découvrir de nouvelles cultures.' },
  { id: 'plongee', label: 'Plongée', emoji: '🤿', description: 'La beauté silencieuse des fonds marins.' },
  { id: 'aventures', label: 'Aventures', emoji: '🌵', description: 'Moto père-fille, randonnées et toutes les aventures de la vie.' },
]

export default function MaViePage() {
  const [photos, setPhotos] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('famille')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    loadAllPhotos()
  }, [])

  // Reset index quand on change de catégorie
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory])

  async function loadAllPhotos() {
    const supabase = createSupabase()
    const result = {}
    for (const cat of CATEGORIES) {
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

  const currentPhotos = photos[activeCategory] || []
  const VISIBLE = 5 // nombre de thumbnails visibles

  function prev() {
    setCurrentIndex(i => Math.max(0, i - 1))
  }

  function next() {
    setCurrentIndex(i => Math.min(currentPhotos.length - 1, i + 1))
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
      if (e.key === 'ArrowLeft') setLightbox(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setLightbox(i => Math.min(currentPhotos.length - 1, i + 1))
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, currentPhotos.length])

  const activeCat = CATEGORIES.find(c => c.id === activeCategory)

  // Index de début pour les thumbnails
  const thumbStart = Math.max(0, Math.min(currentIndex - Math.floor(VISIBLE / 2), currentPhotos.length - VISIBLE))

  return (
    <main>
      {/* BANNIÈRE */}
      <div className="relative pt-20 bg-dental-900">
        <div className="max-w-4xl mx-auto px-6 py-20 text-white text-center">
          <div className="section-divider mx-auto mb-4 bg-white" />
          <h1 className="font-display text-4xl md:text-5xl mb-4">Ma vie, mes passions</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            « Ma vie ne s'est pas arrêtée qu'à la dentisterie. Les plus beaux sourires
            sont ceux de mon épouse, de mes quatre enfants, et de mes petits-enfants. »
          </p>
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

      {/* SECTION CAROUSEL */}
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
          ) : currentPhotos.length === 0 ? (
            <p className="text-center text-warm-gray py-20 text-lg">Photos à venir...</p>
          ) : (
            <>
              {/* PHOTO PRINCIPALE */}
              <div className="relative bg-charcoal rounded-2xl overflow-hidden mb-4" style={{ height: '480px' }}>
                <img
                  src={currentPhotos[currentIndex]?.url}
                  alt={currentPhotos[currentIndex]?.caption}
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() => openLightbox(currentIndex)}
                />

                {/* Caption */}
                {currentPhotos[currentIndex]?.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                    <p className="text-white capitalize text-sm">{currentPhotos[currentIndex].caption}</p>
                  </div>
                )}

                {/* Boutons nav sur photo principale */}
                {currentIndex > 0 && (
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-all"
                  >‹</button>
                )}
                {currentIndex < currentPhotos.length - 1 && (
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-all"
                  >›</button>
                )}

                {/* Compteur */}
                <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
                  {currentIndex + 1} / {currentPhotos.length}
                </div>
              </div>

              {/* THUMBNAILS */}
              <div className="flex gap-2 items-center">
                {/* Flèche gauche thumbnails */}
                <button
                  onClick={prev}
                  disabled={currentIndex === 0}
                  className="flex-shrink-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-charcoal disabled:opacity-30 hover:bg-dental-50 transition-all"
                >‹</button>

                {/* Thumbnails visibles */}
                <div className="flex gap-2 flex-1 overflow-hidden">
                  {currentPhotos.slice(thumbStart, thumbStart + VISIBLE).map((photo, i) => {
                    const realIndex = thumbStart + i
                    return (
                      <button
                        key={photo.name}
                        onClick={() => setCurrentIndex(realIndex)}
                        className={`flex-1 rounded-lg overflow-hidden transition-all ${
                          realIndex === currentIndex
                            ? 'ring-2 ring-dental-600 ring-offset-2 opacity-100'
                            : 'opacity-60 hover:opacity-90'
                        }`}
                        style={{ height: '72px' }}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    )
                  })}
                </div>

                {/* Flèche droite thumbnails */}
                <button
                  onClick={next}
                  disabled={currentIndex === currentPhotos.length - 1}
                  className="flex-shrink-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-charcoal disabled:opacity-30 hover:bg-dental-50 transition-all"
                >›</button>
              </div>
            </>
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
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl z-10">×</button>

          {lightbox > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(i => i - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl z-10 px-4 py-2"
            >‹</button>
          )}

          <div className="max-w-5xl px-16 py-8" onClick={e => e.stopPropagation()}>
            <img
              src={currentPhotos[lightbox].url}
              alt={currentPhotos[lightbox].caption}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl mx-auto"
            />
            {currentPhotos[lightbox].caption && (
              <p className="text-white/70 text-center mt-3 text-sm capitalize">{currentPhotos[lightbox].caption}</p>
            )}
            <p className="text-white/40 text-center mt-1 text-xs">{lightbox + 1} / {currentPhotos.length}</p>
          </div>

          {lightbox < currentPhotos.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setLightbox(i => i + 1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl z-10 px-4 py-2"
            >›</button>
          )}
        </div>
      )}
    </main>
  )
}
