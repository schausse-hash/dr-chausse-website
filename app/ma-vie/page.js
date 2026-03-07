'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

function createSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

const CATEGORIES = [
  { id: 'famille', label: 'Famille', emoji: '👨‍👩‍👧‍👦', description: 'Mon épouse Diane, mes quatre enfants et mes petits-enfants — mes plus beaux sourires.' },
  { id: 'voyages', label: 'Voyages', emoji: '✈️', description: 'Explorer le monde en famille, découvrir de nouvelles cultures et créer des souvenirs inoubliables.' },
  { id: 'plongee', label: 'Plongée sous-marine', emoji: '🤿', description: 'La beauté silencieuse des fonds marins — une passion qui me ressource profondément.' },
  { id: 'aventures', label: 'Aventures', emoji: '🌵', description: 'Moto père-fille, randonnées et toutes les aventures qui pimentent la vie.' },
]

export default function MaViePage() {
  const [photos, setPhotos] = useState({})
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null) // { photos: [], index: 0 }

  useEffect(() => {
    loadAllPhotos()
  }, [])

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

  function openLightbox(catPhotos, index) {
    setLightbox({ photos: catPhotos, index })
    document.body.style.overflow = 'hidden'
  }

  function closeLightbox() {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  function prevPhoto() {
    setLightbox(lb => ({ ...lb, index: (lb.index - 1 + lb.photos.length) % lb.photos.length }))
  }

  function nextPhoto() {
    setLightbox(lb => ({ ...lb, index: (lb.index + 1) % lb.photos.length }))
  }

  useEffect(() => {
    function handleKey(e) {
      if (!lightbox) return
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  return (
    <main>
      {/* BANNIÈRE */}
      <div className="relative pt-20 bg-dental-900">
        <div className="max-w-4xl mx-auto px-6 py-20 text-white text-center">
          <div className="section-divider mx-auto mb-4 bg-white" />
          <h1 className="font-display text-4xl md:text-5xl mb-4">Ma vie, mes passions</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            « Ma vie ne s'est pas arrêtée qu'à la dentisterie. Malgré toutes les reconstructions
            et remodelages de milliers de sourires, il reste que les plus beaux sont ceux de
            mon épouse, de mes quatre enfants, et de mes petits-enfants. »
          </p>
        </div>
      </div>

      {/* NAVIGATION SECTIONS */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="flex items-center gap-2 px-4 py-4 text-sm font-medium text-warm-gray hover:text-dental-700 whitespace-nowrap border-b-2 border-transparent hover:border-dental-500 transition-all"
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* SECTIONS */}
      {CATEGORIES.map((cat, catIndex) => {
        const catPhotos = photos[cat.id] || []
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={`py-20 ${catIndex % 2 === 0 ? 'bg-white' : 'bg-cream'}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              {/* Header section */}
              <div className="text-center mb-12">
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-3">{cat.label}</h2>
                <p className="text-warm-gray max-w-xl mx-auto">{cat.description}</p>
              </div>

              {/* Galerie */}
              {loading ? (
                <p className="text-center text-warm-gray">Chargement...</p>
              ) : catPhotos.length === 0 ? (
                <p className="text-center text-warm-gray py-8">Photos à venir...</p>
              ) : (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {catPhotos.map((photo, i) => (
                    <div
                      key={photo.name}
                      className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                      onClick={() => openLightbox(catPhotos, i)}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {photo.caption && (
                        <div className="absolute inset-0 bg-dental-900/0 group-hover:bg-dental-900/40 transition-all duration-300 flex items-end">
                          <p className="text-white text-sm px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 capitalize">
                            {photo.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-16 bg-dental-900 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl text-white mb-4">Venez nous rencontrer</h2>
          <p className="text-white/70 mb-8">Prenez rendez-vous pour une consultation.</p>
          <a href="tel:5145214141" className="btn-primary inline-flex items-center gap-2 bg-white text-dental-900 hover:bg-cream">
            📞 514.521.4141
          </a>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && lightbox.photos[lightbox.index] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl leading-none z-10">×</button>

          <button
            onClick={e => { e.stopPropagation(); prevPhoto() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none z-10 px-4 py-2"
          >‹</button>

          <div className="max-w-5xl max-h-screen px-16 py-8" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.photos[lightbox.index].url}
              alt={lightbox.photos[lightbox.index].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
            />
            {lightbox.photos[lightbox.index].caption && (
              <p className="text-white/80 text-center mt-4 text-sm capitalize">
                {lightbox.photos[lightbox.index].caption}
              </p>
            )}
            <p className="text-white/40 text-center mt-1 text-xs">
              {lightbox.index + 1} / {lightbox.photos.length}
            </p>
          </div>

          <button
            onClick={e => { e.stopPropagation(); nextPhoto() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none z-10 px-4 py-2"
          >›</button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
            {lightbox.photos.map((p, i) => (
              <img
                key={p.name}
                src={p.url}
                alt={p.caption}
                onClick={e => { e.stopPropagation(); setLightbox(lb => ({ ...lb, index: i })) }}
                className={`h-12 w-16 object-cover rounded cursor-pointer flex-shrink-0 transition-all ${
                  i === lightbox.index ? 'ring-2 ring-white opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
