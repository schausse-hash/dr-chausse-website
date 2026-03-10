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
  { id: 'famille', label: 'Famille', emoji: '👨‍👩‍👧‍👦' },
  { id: 'voyages', label: 'Voyages', emoji: '✈️' },
  { id: 'plongee', label: 'Plongée', emoji: '🤿' },
  { id: 'aventures', label: 'Aventures', emoji: '🌵' },
  { id: 'videos', label: 'Vidéos', emoji: '🎬' },
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
      <label htmlFor={`upload-${bucket}`} className="border-2 border-dashed border-dental-300 rounded-2xl p-6 text-center mb-6 hover:border-dental-500 transition-colors cursor-pointer bg-cream block">
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
                <button onClick={() => handleDelete(photo.name)} disabled={deleting === photo.name}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-red-600 transition-all">
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

function VideoManager() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ titre: '', youtube_id: '', description: '', ordre: 0, published: true })
  const [editing, setEditing] = useState(null)

  useEffect(() => { loadVideos() }, [])

  function showMessage(msg) {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  async function loadVideos() {
    const supabase = createSupabase()
    const { data } = await supabase.from('ma_vie_videos').select('*').order('ordre', { ascending: true })
    setVideos(data || [])
    setLoading(false)
  }

  async function handleSave() {
    if (!form.titre || !form.youtube_id) return alert('Titre et ID YouTube requis')
    setSaving(true)
    const supabase = createSupabase()
    if (editing) {
      await supabase.from('ma_vie_videos').update(form).eq('id', editing)
      showMessage('Vidéo modifiée ✓')
      setEditing(null)
    } else {
      await supabase.from('ma_vie_videos').insert(form)
      showMessage('Vidéo ajoutée ✓')
    }
    setForm({ titre: '', youtube_id: '', description: '', ordre: 0, published: true })
    await loadVideos()
    setSaving(false)
  }

  function handleEdit(video) {
    setEditing(video.id)
    setForm({ titre: video.titre, youtube_id: video.youtube_id, description: video.description || '', ordre: video.ordre, published: video.published })
  }

  async function handleDelete(id, titre) {
    if (!confirm(`Supprimer "${titre}" ?`)) return
    const supabase = createSupabase()
    await supabase.from('ma_vie_videos').delete().eq('id', id)
    showMessage('Vidéo supprimée ✓')
    await loadVideos()
  }

  async function togglePublished(video) {
    const supabase = createSupabase()
    await supabase.from('ma_vie_videos').update({ published: !video.published }).eq('id', video.id)
    await loadVideos()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-warm-gray text-sm">{videos.length} vidéo(s)</p>
        {message && <span className="text-green-600 text-sm font-medium">{message}</span>}
      </div>

      {/* Formulaire */}
      <div className="bg-cream rounded-2xl p-6 mb-8 border border-gray-100">
        <h3 className="font-medium text-charcoal mb-4">{editing ? '✏️ Modifier la vidéo' : '➕ Ajouter une vidéo'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-warm-gray mb-1">Titre *</label>
            <input type="text" value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-400" placeholder="Ex: Plongée aux Maldives" />
          </div>
          <div>
            <label className="block text-xs text-warm-gray mb-1">ID YouTube * <span className="text-gray-400">(ex: k649xMCcHLo)</span></label>
            <input type="text" value={form.youtube_id} onChange={e => setForm(f => ({ ...f, youtube_id: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-400" placeholder="k649xMCcHLo" />
          </div>
          <div>
            <label className="block text-xs text-warm-gray mb-1">Description</label>
            <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-400" placeholder="Courte description..." />
          </div>
          <div>
            <label className="block text-xs text-warm-gray mb-1">Ordre</label>
            <input type="number" value={form.ordre} onChange={e => setForm(f => ({ ...f, ordre: parseInt(e.target.value) || 0 }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="rounded" />
            Publié
          </label>
          <button onClick={handleSave} disabled={saving}
            className="bg-dental-600 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-all">
            {saving ? '...' : editing ? 'Enregistrer' : 'Ajouter'}
          </button>
          {editing && (
            <button onClick={() => { setEditing(null); setForm({ titre: '', youtube_id: '', description: '', ordre: 0, published: true }) }}
              className="text-warm-gray text-sm hover:text-charcoal">Annuler</button>
          )}
        </div>
      </div>

      {/* Liste vidéos */}
      {loading ? <p className="text-warm-gray text-sm">Chargement...</p> : videos.length === 0 ? (
        <p className="text-warm-gray text-center py-6 text-sm">Aucune vidéo pour l'instant.</p>
      ) : (
        <div className="space-y-3">
          {videos.map(video => (
            <div key={video.id} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4">
              <img src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} alt={video.titre}
                className="w-24 h-14 object-cover rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-charcoal text-sm truncate">{video.titre}</p>
                <p className="text-xs text-warm-gray">{video.youtube_id}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => togglePublished(video)}
                  className={`text-xs px-2 py-1 rounded-full ${video.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {video.published ? 'Publié' : 'Masqué'}
                </button>
                <button onClick={() => handleEdit(video)} className="text-dental-600 text-xs hover:underline">✏️</button>
                <button onClick={() => handleDelete(video.id, video.titre)} className="text-red-500 text-xs hover:underline">🗑️</button>
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
      <h2 className="font-display text-2xl text-charcoal mb-6">Ma vie — Gestion des photos & vidéos</h2>

      {/* Onglets */}
      <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px whitespace-nowrap ${
              activeTab === cat.id ? 'border-dental-600 text-dental-700' : 'border-transparent text-warm-gray hover:text-charcoal'
            }`}>
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Contenu */}
      {activeTab === 'videos' ? (
        <VideoManager />
      ) : (
        CATEGORIES.filter(c => c.id !== 'videos').map(cat => (
          activeTab === cat.id && (
            <PhotoGrid key={cat.id} bucket={cat.id} photos={photos[cat.id] || []} onRefresh={onRefresh} />
          )
        ))
      )}
    </div>
  )
}
