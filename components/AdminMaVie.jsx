'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

function createSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

const CATEGORIES = [
  { id: 'famille', label: 'Famille', emoji: '👨‍👩‍👧‍👦' },
  { id: 'voyages', label: 'Voyages', emoji: '✈️' },
  { id: 'plongee', label: 'Plongée', emoji: '🤿' },
  { id: 'aventures', label: 'Aventures', emoji: '🌵' },
]

function PhotoGrid({ bucket, photos, onRefresh }) {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [message, setMessage] = useState('')

  function showMessage(msg) {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  async function handleUpload(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    const supabase = createSupabase()
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
      const { error } = await supabase.storage.from(bucket).upload(fileName, file)
      if (error) console.error('Upload error:', error)
    }
    await onRefresh()
    showMessage(`${files.length} photo(s) uploadée(s) ✓`)
    setUploading(false)
    e.target.value = ''
  }

  async function handleDelete(name) {
    if (!confirm(`Supprimer "${name}" ?`)) return
    setDeleting(name)
    const supabase = createSupabase()
    await supabase.storage.from(bucket).remove([name])
    await onRefresh()
    showMessage('Photo supprimée ✓')
    setDeleting(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-warm-gray text-sm">{photos.length} photo(s)</p>
        {message && <span className="text-green-600 text-sm font-medium">{message}</span>}
      </div>

      <label
        htmlFor={`upload-${bucket}`}
        className="border-2 border-dashed border-dental-300 rounded-2xl p-6 text-center mb-6 hover:border-dental-500 transition-colors cursor-pointer bg-cream block"
      >
        <div className="text-3xl mb-2">📸</div>
        <p className="text-charcoal font-medium text-sm mb-1">Cliquer pour ajouter des photos</p>
        <p className="text-warm-gray text-xs">JPG, PNG, WEBP — plusieurs à la fois</p>
        {uploading && <p className="text-dental-600 text-xs mt-2 font-medium">Upload en cours...</p>}
        <input id={`upload-${bucket}`} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
      </label>

      {photos.length === 0 ? (
        <p className="text-warm-gray text-center py-6 text-sm">Aucune photo pour l'instant.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map(photo => (
            <div key={photo.name} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
              <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <button
                  onClick={() => handleDelete(photo.name)}
                  disabled={deleting === photo.name}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-red-600 transition-all"
                >
                  {deleting === photo.name ? '...' : '🗑️ Supprimer'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AdminMaVie({ photos, onRefresh }) {
  const [activeTab, setActiveTab] = useState('famille')

  return (
    <div>
      <h2 className="font-display text-2xl text-charcoal mb-6">Ma vie — Gestion des photos</h2>

      {/* Onglets catégories */}
      <div className="flex gap-1 mb-8 border-b border-gray-200">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === cat.id
                ? 'border-dental-600 text-dental-700'
                : 'border-transparent text-warm-gray hover:text-charcoal'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Contenu onglet actif */}
      {CATEGORIES.map(cat => (
        activeTab === cat.id && (
          <PhotoGrid
            key={cat.id}
            bucket={cat.id}
            photos={photos[cat.id] || []}
            onRefresh={onRefresh}
          />
        )
      ))}
    </div>
  )
}
