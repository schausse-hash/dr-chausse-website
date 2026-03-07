'use client'

import { useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

function createSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export default function AdminPhotos({ photos, onRefresh }) {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [message, setMessage] = useState('')
  const inputRef = useRef()

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
      await supabase.storage.from('famille').upload(fileName, file)
    }
    await onRefresh()
    showMessage(`${files.length} photo(s) uploadée(s) ✓`)
    setUploading(false)
    inputRef.current.value = ''
  }

  async function handleDelete(name) {
    if (!confirm(`Supprimer "${name}" ?`)) return
    setDeleting(name)
    const supabase = createSupabase()
    await supabase.storage.from('famille').remove([name])
    await onRefresh()
    showMessage('Photo supprimée ✓')
    setDeleting(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-charcoal">Photos de famille ({photos.length})</h2>
        {message && <span className="text-green-600 text-sm font-medium">{message}</span>}
      </div>

      {/* Zone upload */}
      <div
        className="border-2 border-dashed border-dental-300 rounded-2xl p-8 text-center mb-8 hover:border-dental-500 transition-colors cursor-pointer bg-cream"
        onClick={() => inputRef.current?.click()}
      >
        <div className="text-4xl mb-3">📸</div>
        <p className="text-charcoal font-medium mb-1">Cliquer pour ajouter des photos</p>
        <p className="text-warm-gray text-sm">JPG, PNG, WEBP — plusieurs fichiers à la fois</p>
        {uploading && <p className="text-dental-600 text-sm mt-2 font-medium">Upload en cours...</p>}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {/* Grille photos */}
      {photos.length === 0 ? (
        <p className="text-warm-gray text-center py-8">Aucune photo pour l'instant.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div key={photo.name} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <button
                  onClick={() => handleDelete(photo.name)}
                  disabled={deleting === photo.name}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-red-600 transition-all"
                >
                  {deleting === photo.name ? '...' : '🗑️ Supprimer'}
                </button>
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-2 py-1 truncate capitalize opacity-0 group-hover:opacity-100 transition-opacity">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
