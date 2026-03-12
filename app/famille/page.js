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

export default function FamillePage() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null) // index photo ouverte

  useEffect(() => {
    loadPhotos()
  }, [])

  async function loadPhotos() {
    const supabase = createSupabase()
    const { data, error } = await supabase.storage.from('famille').list('', {
      sortBy: { column: 'name', order: 'asc' }
    })
    if (data) {
      const urls = data
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => ({
          name: f.name,
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/famille/${f.name}`,
          caption: f.name.replace(/\.[^.]+$/, '').replace(/-/g, ' ').replace(/_/g, ' '),
        }))
      setPhotos(urls)
    }
    setLoading(false)
  }

  function openLightbox(index) {
    setLightbox(index)
    document.body.style.overflow = 'hidden'
  }

  function closeLightbox() {
    setLightbox(null)
    document.body.style.overflow = ''
  }

  function prevPhoto() {
    setLightbox(i => (i - 1 + photos.length) % photos.length)
  }

  function nextPhoto() {
    setLightbox(i => (i + 1) % photos.length)
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (lightbox === null) return
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox, photos.length])

  return (
    <main>
  <PageViewTracker />
    
      {/* BANNIÈRE */}
      <div className="relative pt-20 bg-dental-900">
        <div className="max-w-4xl mx-auto px-6 py-20 text-white text-center">
          <div className="section-divider mx-auto mb-4 bg-white" />
          <h1 className="font-display text-4xl md:text-5xl mb-4">Ma famille</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ma vie ne s'est pas arrêtée qu'à la dentisterie. Malgré toutes les reconstructions
            et remodelages de milliers de sourires, il reste que les plus beaux sont ceux de
            mon épouse, de mes quatre enfants, et de mes petits-enfants.
          </p>
        </div>
      </div>

      {/* GALERIE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center text-warm-gray py-20">Chargement des photos...</div>
          ) : photos.length === 0 ? (
            <div className="text-center text-warm-gray py-20">Aucune photo pour l'instant.</div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {photos.map((photo, i) => (
                <div
                  key={photo.name}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                  onClick={() => openLightbox(i)}
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

      {/* CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl text-charcoal mb-4">Venez nous rencontrer</h2>
          <p className="text-warm-gray mb-8">Prenez rendez-vous pour une consultation.</p>
          <a href="tel:5145214141" className="btn-primary inline-flex items-center gap-2">
            📞 514.521.4141
          </a>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && photos[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl leading-none z-10"
          >
            ×
          </button>

          {/* Bouton précédent */}
          <button
            onClick={e => { e.stopPropagation(); prevPhoto() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none z-10 px-4 py-2"
          >
            ‹
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-screen px-16 py-8" onClick={e => e.stopPropagation()}>
            <img
              src={photos[lightbox].url}
              alt={photos[lightbox].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
            />
            {photos[lightbox].caption && (
              <p className="text-white/80 text-center mt-4 text-sm capitalize">
                {photos[lightbox].caption}
              </p>
            )}
            <p className="text-white/40 text-center mt-1 text-xs">
              {lightbox + 1} / {photos.length}
            </p>
          </div>

          {/* Bouton suivant */}
          <button
            onClick={e => { e.stopPropagation(); nextPhoto() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl leading-none z-10 px-4 py-2"
          >
            ›
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
            {photos.map((p, i) => (
              <img
                key={p.name}
                src={p.url}
                alt={p.caption}
                onClick={e => { e.stopPropagation(); setLightbox(i) }}
                className={`h-12 w-16 object-cover rounded cursor-pointer flex-shrink-0 transition-all ${
                  i === lightbox ? 'ring-2 ring-white opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
