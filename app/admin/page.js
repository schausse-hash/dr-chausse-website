'use client'
import ReactMarkdown from 'react-markdown'
import AdminMaVie from '@/components/AdminMaVie'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminPatients from '@/components/AdminPatients'

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('login') // 'login' | 'reset'
  const [resetSent, setResetSent] = useState(false)
  const supabase = createClient()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else onLogin()
    setLoading(false)
  }

  async function handleReset() {
    if (!email) { setError('Entrez votre email d\'abord.'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://www.dentiste.com/admin',
    })
    if (error) setError(error.message)
    else setResetSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dental-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🦷</div>
          <h1 className="font-display text-2xl text-charcoal">Administration</h1>
          <p className="text-warm-gray text-sm mt-1">Dr Serge Chaussé</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">{error}</div>
        )}

        {mode === 'login' ? (
          <div className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dental-500" />
            <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dental-500" />
            <button onClick={handleLogin} disabled={loading}
              className="w-full bg-dental-600 text-white rounded-lg py-3 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
            <div className="text-center">
              <button onClick={() => { setMode('reset'); setError('') }}
                className="text-sm text-warm-gray hover:text-dental-600 underline underline-offset-2">
                Mot de passe oublié?
              </button>
            </div>
          </div>
        ) : resetSent ? (
          <div className="text-center space-y-4">
            <div className="text-4xl">📧</div>
            <p className="text-charcoal font-medium">Email envoyé!</p>
            <p className="text-warm-gray text-sm">Vérifiez votre boîte courriel pour réinitialiser votre mot de passe.</p>
            <button onClick={() => { setMode('login'); setResetSent(false) }}
              className="text-sm text-dental-600 hover:underline">
              ← Retour à la connexion
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-warm-gray text-center">Entrez votre email pour recevoir un lien de réinitialisation.</p>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleReset()}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dental-500" />
            <button onClick={handleReset} disabled={loading}
              className="w-full bg-dental-600 text-white rounded-lg py-3 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors">
              {loading ? 'Envoi...' : 'Envoyer le lien'}
            </button>
            <div className="text-center">
              <button onClick={() => { setMode('login'); setError('') }}
                className="text-sm text-warm-gray hover:text-dental-600 underline underline-offset-2">
                ← Retour à la connexion
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// ADMIN AVANT/APRÈS
// ============================================
function AdminAvantApres({ cas, onRefresh }) {
  const [editingCas, setEditingCas] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  function showMessage(msg) {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  async function deleteCas(id) {
    if (!confirm('Supprimer ce cas clinique?')) return
    await supabase.from('avant_apres').delete().eq('id', id)
    onRefresh()
    showMessage('Cas supprimé ✓')
  }

  async function saveCas(form) {
    setSaving(true)
    if (form.id) {
      const { id, created_at, ...data } = form
      await supabase.from('avant_apres').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
    } else {
      const { id, created_at, ...data } = form
      await supabase.from('avant_apres').insert({ ...data })
    }
    await onRefresh()
    setEditingCas(null)
    showMessage('Cas sauvegardé ✓')
    setSaving(false)
  }

  async function togglePublished(item) {
    await supabase.from('avant_apres').update({ published: !item.published }).eq('id', item.id)
    onRefresh()
  }

  if (editingCas) {
    return <CasEditor cas={editingCas} onSave={saveCas} onCancel={() => setEditingCas(null)} saving={saving} />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-charcoal">Avant/Après ({cas.length})</h2>
        <div className="flex items-center gap-3">
          {message && <span className="text-green-600 text-sm font-medium">{message}</span>}
          <button onClick={() => setEditingCas({ titre: '', description: '', photo_avant_url: '', photo_apres_url: '', ordre: cas.length + 1, published: true })}
            className="bg-dental-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-dental-700 transition-colors">
            + Nouveau cas
          </button>
        </div>
      </div>

      {cas.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl text-warm-gray">
          <div className="text-4xl mb-3">🦷</div>
          <p className="text-sm">Aucun cas clinique. Cliquez sur "Nouveau cas" pour commencer.</p>
        </div>
      )}

      <div className="space-y-3">
        {cas.map(item => (
          <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100 flex gap-4">
            {/* Aperçu photos */}
            <div className="flex gap-2 flex-shrink-0">
              {item.photo_avant_url ? (
                <img src={item.photo_avant_url} alt="avant" className="w-20 h-16 object-cover rounded-lg" />
              ) : (
                <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-warm-gray">Avant</div>
              )}
              {item.photo_apres_url ? (
                <img src={item.photo_apres_url} alt="après" className="w-20 h-16 object-cover rounded-lg" />
              ) : (
                <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-warm-gray">Après</div>
              )}
            </div>
            {/* Infos */}
            <div className="flex-1">
              <div className="font-medium text-charcoal">{item.titre}</div>
              {item.description && <div className="text-sm text-warm-gray mt-0.5 truncate max-w-lg">{item.description}</div>}
              <div className="text-xs text-warm-gray mt-1">Ordre: {item.ordre}</div>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={() => togglePublished(item)}
                className={`text-xs px-3 py-1 rounded-full font-medium ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {item.published ? 'Publié' : 'Masqué'}
              </button>
              <button onClick={() => setEditingCas(item)} className="text-sm text-dental-600 hover:underline">Modifier</button>
              <button onClick={() => deleteCas(item.id)} className="text-sm text-red-400 hover:text-red-600">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// ÉDITEUR D'UN CAS CLINIQUE
// ============================================
function CasEditor({ cas, onSave, onCancel, saving }) {
  const [form, setForm] = useState({ ...cas })
  const [uploadingAvant, setUploadingAvant] = useState(false)
  const [uploadingApres, setUploadingApres] = useState(false)
  const fileAvantRef = useRef(null)
  const fileApresRef = useRef(null)
  const supabase = createClient()

  async function uploadPhoto(file, type) {
    const setter = type === 'avant' ? setUploadingAvant : setUploadingApres
    setter(true)
    const ext = file.name.split('.').pop()
    const fileName = `avant-apres/${type}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true })
    if (!error) {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`
      setForm(p => ({ ...p, [`photo_${type}_url`]: url }))
    }
    setter(false)
  }

  function PhotoUploader({ type, label, url, uploading, inputRef }) {
    return (
      <div>
        <label className="block text-xs font-medium text-warm-gray mb-2">{label}</label>
        {url ? (
          <div className="relative inline-block">
            <img src={url} alt={label} className="w-full h-48 object-cover rounded-xl border border-gray-200" />
            <button onClick={() => setForm(p => ({ ...p, [`photo_${type}_url`]: '' }))}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-600">
              ✕
            </button>
          </div>
        ) : (
          <div onClick={() => inputRef.current?.click()}
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-dental-400 hover:bg-dental-50 transition-colors">
            {uploading ? (
              <div className="text-warm-gray text-sm">Téléversement...</div>
            ) : (
              <>
                <div className="text-3xl mb-2">📸</div>
                <div className="text-warm-gray text-sm">Cliquer pour ajouter</div>
                <div className="text-warm-gray text-xs mt-1">JPG, PNG, WebP</div>
              </>
            )}
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/*"
          onChange={e => e.target.files[0] && uploadPhoto(e.target.files[0], type)}
          className="hidden" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-charcoal">{form.id ? 'Modifier le cas' : 'Nouveau cas clinique'}</h3>
        <button onClick={onCancel} className="text-warm-gray hover:text-charcoal text-sm">← Retour</button>
      </div>

      {/* Photos avant/après */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-3">📸 Photos</label>
        <div className="grid grid-cols-2 gap-4">
          <PhotoUploader type="avant" label="Photo AVANT" url={form.photo_avant_url}
            uploading={uploadingAvant} inputRef={fileAvantRef} />
          <PhotoUploader type="apres" label="Photo APRÈS" url={form.photo_apres_url}
            uploading={uploadingApres} inputRef={fileApresRef} />
        </div>
      </div>

      {/* Titre */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">📋 Titre du cas</label>
        <input value={form.titre || ''} onChange={e => setForm(p => ({ ...p, titre: e.target.value }))}
          placeholder="ex: Réhabilitation tout céramique"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">💬 Description / Citation patient</label>
        <textarea value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          placeholder='ex: « Ma vie a changée! »' rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none" />
      </div>

      {/* Ordre + Publié */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="block text-xs font-medium text-warm-gray mb-1">Ordre d'affichage</label>
          <input type="number" value={form.ordre || 0} onChange={e => setForm(p => ({ ...p, ordre: parseInt(e.target.value) }))}
            className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input type="checkbox" id="published" checked={form.published ?? true}
            onChange={e => setForm(p => ({ ...p, published: e.target.checked }))}
            className="w-4 h-4 accent-dental-600" />
          <label htmlFor="published" className="text-sm text-charcoal">Publié (visible sur le site)</label>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button onClick={() => onSave(form)} disabled={saving}
          className="bg-dental-600 text-white rounded-lg px-8 py-2.5 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors">
          {saving ? 'Sauvegarde...' : '💾 Sauvegarder'}
        </button>
        <button onClick={onCancel} className="border border-gray-200 text-warm-gray rounded-lg px-6 py-2.5 text-sm hover:bg-gray-50">
          Annuler
        </button>
      </div>
    </div>
  )
}

// ============================================
// ADMIN BLOG
// ============================================
function AdminBlog() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => { loadArticles() }, [])

  async function loadArticles() {
    setLoading(true)
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('locale', 'fr')
      .order('date_publication', { ascending: false })
    setArticles(data || [])
    setLoading(false)
  }

  function showMessage(msg) {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

 async function saveArticle(form) {
    setSaving(true)
    if (form.id) {
      const { id, created_at, ...data } = form
      await supabase.from('articles').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
    } else {
      const { id, created_at, updated_at, ...data } = form
      const { error } = await supabase.from('articles').insert({ ...data, locale: 'fr' })
      if (error) { alert('Erreur: ' + error.message); setSaving(false); return }
    }
    await loadArticles()
    setEditing(null)
    showMessage('Article sauvegardé ✓')
    setSaving(false)
  }

  async function deleteArticle(id) {
    if (!confirm('Supprimer cet article?')) return
    await supabase.from('articles').delete().eq('id', id)
    await loadArticles()
    showMessage('Article supprimé ✓')
  }

  async function togglePublished(article) {
    await supabase.from('articles').update({ published: !article.published }).eq('id', article.id)
    await loadArticles()
  }

  const nouveauArticle = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    categorie: '',
    published: false,
    date_publication: new Date().toISOString(),
    locale: 'fr',
  }

  if (loading) return <div className="text-warm-gray py-10 text-center">Chargement...</div>

  if (editing) return (
    <ArticleBlogEditor
      article={editing}
      onSave={saveArticle}
      onCancel={() => setEditing(null)}
      saving={saving}
    />
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-charcoal">Blog ({articles.length})</h2>
        <div className="flex items-center gap-3">
          {message && <span className="text-green-600 text-sm font-medium">{message}</span>}
          <button
            onClick={() => setEditing(nouveauArticle)}
            className="bg-dental-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-dental-700 transition-colors">
            + Nouvel article
          </button>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl text-warm-gray">
          <div className="text-4xl mb-3">✍️</div>
          <p className="text-sm">Aucun article. Cliquez sur "Nouvel article" pour commencer.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map(article => (
            <div key={article.id} className="bg-white rounded-xl p-4 border border-gray-100 flex gap-4 items-center">
              {article.image_url ? (
                <img src={article.image_url} alt={article.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0" />
              ) : (
                <div className="w-20 h-16 bg-dental-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">🦷</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-charcoal truncate">{article.title}</div>
                <div className="text-xs text-warm-gray mt-0.5">
                  {article.categorie && <span className="mr-2">📁 {article.categorie}</span>}
                  {article.date_publication && new Date(article.date_publication).toLocaleDateString('fr-CA', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
                {article.excerpt && <div className="text-xs text-warm-gray mt-1 truncate max-w-lg">{article.excerpt}</div>}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => togglePublished(article)}
                  className={`text-xs px-3 py-1 rounded-full font-medium ${article.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {article.published ? 'Publié' : 'Brouillon'}
                </button>
                <button onClick={() => setEditing(article)} className="text-sm text-dental-600 hover:underline">Modifier</button>
                <button onClick={() => deleteArticle(article.id)} className="text-sm text-red-400 hover:text-red-600">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// ÉDITEUR D'ARTICLE BLOG
// ============================================
function ArticleBlogEditor({ article, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    ...article,
    content: Array.isArray(article.content) ? article.content : []
  })
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)
  const supabase = createClient()

  function generateSlug(title) {
    return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
  }

  async function uploadCover(file) {
    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `blog/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true })
    if (!error) {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`
      setForm(p => ({ ...p, image_url: url }))
    }
    setUploading(false)
  }

  async function uploadSectionPhoto(blockIdx, file) {
    const ext = file.name.split('.').pop()
    const fileName = `blog/sections/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true })
    if (!error) {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`
      setForm(p => {
        const content = [...p.content]
        content[blockIdx] = { ...content[blockIdx], photos: [...(content[blockIdx].photos || []), url] }
        return { ...p, content }
      })
    }
  }

  function addBlock(type) {
    const bloc = type === 'intro'
      ? { type: 'intro', contenu: '' }
      : type === 'section'
      ? { type: 'section', titre: '', photos: [], texte: '', liste: [] }
      : { type: 'resume', titre: '✅ En résumé', contenu: '', liste: [] }
    setForm(p => ({ ...p, content: [...p.content, bloc] }))
  }

  function updateBlock(i, field, value) {
    setForm(p => {
      const content = [...p.content]
      content[i] = { ...content[i], [field]: value }
      return { ...p, content }
    })
  }

  function removeBlock(i) {
    setForm(p => ({ ...p, content: p.content.filter((_, idx) => idx !== i) }))
  }

  function moveBlock(i, dir) {
    setForm(p => {
      const content = [...p.content]
      const j = i + dir
      if (j < 0 || j >= content.length) return p
      ;[content[i], content[j]] = [content[j], content[i]]
      return { ...p, content }
    })
  }

  function removePhoto(blockIdx, photoIdx) {
    setForm(p => {
      const content = [...p.content]
      content[blockIdx] = { ...content[blockIdx], photos: content[blockIdx].photos.filter((_, i) => i !== photoIdx) }
      return { ...p, content }
    })
  }

  function addListItem(i) {
    setForm(p => {
      const content = [...p.content]
      content[i] = { ...content[i], liste: [...(content[i].liste || []), ''] }
      return { ...p, content }
    })
  }

  function updateListItem(blockIdx, itemIdx, value) {
    setForm(p => {
      const content = [...p.content]
      const liste = [...(content[blockIdx].liste || [])]
      liste[itemIdx] = value
      content[blockIdx] = { ...content[blockIdx], liste }
      return { ...p, content }
    })
  }

  function removeListItem(blockIdx, itemIdx) {
    setForm(p => {
      const content = [...p.content]
      content[blockIdx] = { ...content[blockIdx], liste: content[blockIdx].liste.filter((_, i) => i !== itemIdx) }
      return { ...p, content }
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-charcoal">{form.id ? "Modifier l'article" : 'Nouvel article'}</h3>
        <button onClick={onCancel} className="text-warm-gray hover:text-charcoal text-sm">← Retour</button>
      </div>

      {/* Infos de base */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-warm-gray mb-1">Titre *</label>
          <input value={form.title || ''} onChange={e => setForm(p => ({ ...p, title: e.target.value, slug: generateSlug(e.target.value) }))}
            placeholder="Titre de l'article"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-warm-gray mb-1">Slug (URL)</label>
            <input value={form.slug || ''} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 font-mono text-xs" />
          </div>
          <div>
            <label className="block text-xs font-medium text-warm-gray mb-1">Catégorie</label>
            <input value={form.categorie || ''} onChange={e => setForm(p => ({ ...p, categorie: e.target.value }))}
              placeholder="ex: Implants, Hygiène..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-warm-gray mb-1">Date de publication</label>
          <input type="date" value={form.date_publication ? form.date_publication.substring(0, 10) : ''}
            onChange={e => setForm(p => ({ ...p, date_publication: new Date(e.target.value).toISOString() }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
        </div>
      </div>

      {/* Image couverture */}
      <div>
        <label className="block text-xs font-medium text-warm-gray mb-2">Image de couverture</label>
        {form.image_url ? (
          <div className="relative inline-block">
            <img src={form.image_url} alt="couverture" className="w-full max-w-md h-40 object-cover rounded-xl border border-gray-200" />
            <button onClick={() => setForm(p => ({ ...p, image_url: '' }))}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-600">✕</button>
          </div>
        ) : (
          <div onClick={() => fileRef.current?.click()}
            className="w-full max-w-md h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-dental-400 hover:bg-dental-50 transition-colors">
            {uploading ? <div className="text-warm-gray text-sm">Téléversement...</div> : (
              <><div className="text-2xl mb-1">📸</div><div className="text-warm-gray text-sm">Image de couverture</div></>
            )}
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={e => e.target.files[0] && uploadCover(e.target.files[0])} className="hidden" />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-xs font-medium text-warm-gray mb-1">Résumé (excerpt)</label>
        <textarea value={form.excerpt || ''} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
          placeholder="Court résumé visible dans la liste du blog..." rows={2}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none" />
      </div>

      {/* Blocs de contenu */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-charcoal">📝 Contenu de l'article</label>
          <div className="flex gap-2">
            <button onClick={() => addBlock('intro')}
              className="bg-blue-50 text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5 text-xs hover:bg-blue-100">
              + Intro
            </button>
            <button onClick={() => addBlock('section')}
              className="bg-dental-50 text-dental-600 border border-dental-200 rounded-lg px-3 py-1.5 text-xs hover:bg-dental-100">
              + Section
            </button>
            <button onClick={() => addBlock('resume')}
              className="bg-green-50 text-green-600 border border-green-200 rounded-lg px-3 py-1.5 text-xs hover:bg-green-100">
              + Résumé
            </button>
          </div>
        </div>

        {form.content.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl text-warm-gray text-sm">
            Cliquez sur "+ Intro", "+ Section" ou "+ Résumé" pour commencer.
          </div>
        )}

        <div className="space-y-4">
          {form.content.map((bloc, i) => (
            <div key={i} className={`border rounded-xl p-4 ${
              bloc.type === 'intro' ? 'border-blue-200 bg-blue-50/30' :
              bloc.type === 'resume' ? 'border-green-200 bg-green-50/30' :
              'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                  bloc.type === 'intro' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                  bloc.type === 'resume' ? 'bg-green-100 text-green-700 border-green-200' :
                  'bg-white text-warm-gray border-gray-200'
                }`}>
                  {bloc.type === 'intro' ? '📄 Introduction' : bloc.type === 'resume' ? '✅ Résumé' : `🦷 Section ${i}`}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => moveBlock(i, -1)} disabled={i === 0} className="text-warm-gray hover:text-charcoal disabled:opacity-30 text-sm px-1">↑</button>
                  <button onClick={() => moveBlock(i, 1)} disabled={i === form.content.length - 1} className="text-warm-gray hover:text-charcoal disabled:opacity-30 text-sm px-1">↓</button>
                  <button onClick={() => removeBlock(i)} className="text-red-400 hover:text-red-600 text-xs">✕ Supprimer</button>
                </div>
              </div>

              {/* Titre (section et résumé) */}
              {(bloc.type === 'section' || bloc.type === 'resume') && (
                <div className="mb-3">
                  <label className="block text-xs font-medium text-warm-gray mb-1">Titre</label>
                  <input value={bloc.titre || ''} onChange={e => updateBlock(i, 'titre', e.target.value)}
                    placeholder={bloc.type === 'section' ? "ex: 🦷 1. Évaluation et planification" : "ex: ✅ En résumé"}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 bg-white" />
                </div>
              )}

              {/* Photos (section seulement) */}
              {bloc.type === 'section' && (
                <div className="mb-3">
                  <label className="block text-xs font-medium text-warm-gray mb-2">Photos de la section</label>
                  <div className="flex gap-2 flex-wrap">
                    {(bloc.photos || []).map((url, j) => (
                      <div key={j} className="relative">
                        <img src={url} alt="" className="w-24 h-20 object-cover rounded-lg border border-gray-200" />
                        <button onClick={() => removePhoto(i, j)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">✕</button>
                      </div>
                    ))}
                    <label className="w-24 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-dental-400 hover:bg-dental-50 transition-colors">
                      <div className="text-xl">📸</div>
                      <div className="text-xs text-warm-gray mt-1">Ajouter</div>
                      <input type="file" accept="image/*" className="hidden"
                        onChange={e => e.target.files[0] && uploadSectionPhoto(i, e.target.files[0])} />
                    </label>
                  </div>
                </div>
              )}

              {/* Texte */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-warm-gray mb-1">
                  {bloc.type === 'intro' ? 'Texte d\'introduction' : 'Texte'}
                </label>
                <textarea
                  value={bloc.type === 'intro' ? (bloc.contenu || '') : (bloc.texte || '')}
                  onChange={e => updateBlock(i, bloc.type === 'intro' ? 'contenu' : 'texte', e.target.value)}
                  rows={3} placeholder="Texte..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none bg-white" />
              </div>

              {/* Liste (section et résumé) */}
              {(bloc.type === 'section' || bloc.type === 'resume') && (
                <div>
                  <label className="block text-xs font-medium text-warm-gray mb-2">Liste à puces</label>
                  <div className="space-y-2">
                    {(bloc.liste || []).map((item, j) => (
                      <div key={j} className="flex gap-2 items-center">
                        <span className="text-dental-500 text-sm">•</span>
                        <input value={item} onChange={e => updateListItem(i, j, e.target.value)}
                          placeholder="Élément..."
                          className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-dental-500 bg-white" />
                        <button onClick={() => removeListItem(i, j)} className="text-red-400 hover:text-red-600 text-xs w-5">✕</button>
                      </div>
                    ))}
                    <button onClick={() => addListItem(i)} className="text-dental-600 text-xs hover:underline">+ Ajouter un élément</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Publié */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="published" checked={form.published ?? false}
          onChange={e => setForm(p => ({ ...p, published: e.target.checked }))}
          className="w-4 h-4 accent-dental-600" />
        <label htmlFor="published" className="text-sm text-charcoal">Publié (visible sur le site)</label>
      </div>

      {/* Boutons */}
      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button onClick={() => onSave(form)} disabled={saving}
          className="bg-dental-600 text-white rounded-lg px-8 py-2.5 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors">
          {saving ? 'Sauvegarde...' : '💾 Sauvegarder'}
        </button>
        <button onClick={onCancel} className="border border-gray-200 text-warm-gray rounded-lg px-6 py-2.5 text-sm hover:bg-gray-50">
          Annuler
        </button>
      </div>
    </div>
  )
}

function AdminBackup() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function exportTable(tableName) {
    setLoading(true)
    setMessage('')
    const { data, error } = await supabase.from(tableName).select('*')
    if (error) {
      setMessage(`Erreur: ${error.message}`)
      setLoading(false)
      return
    }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${tableName}-backup-${new Date().toISOString().substring(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage(`${tableName} exporté ✓`)
    setLoading(false)
  }

  async function exportAll() {
    setLoading(true)
    setMessage('')
    const tables = ['services', 'articles', 'avant_apres', 'site_settings']
    const backup = {}
    for (const table of tables) {
      const { data } = await supabase.from(table).select('*')
      backup[table] = data || []
    }
    backup._exported_at = new Date().toISOString()
    const json = JSON.stringify(backup, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dentiste-backup-complet-${new Date().toISOString().substring(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Backup complet exporté ✓')
    setLoading(false)
  }

  const tables = [
    { id: 'services', label: 'Services', emoji: '🗂️' },
    { id: 'articles', label: 'Articles blog', emoji: '✍️' },
    { id: 'avant_apres', label: 'Avant/Après', emoji: '🦷' },
    { id: 'site_settings', label: 'Paramètres du site', emoji: '🌐' },
  ]

  return (
    <div>
      <h2 className="font-display text-2xl text-charcoal mb-2">Backup des données</h2>
      <p className="text-warm-gray text-sm mb-8">Exportez vos données en JSON. Conservez ces fichiers sur votre ordinateur ou disque externe.</p>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6 text-sm">{message}</div>
      )}

      {/* Bouton tout exporter */}
      <div className="bg-dental-900 rounded-2xl p-6 mb-6 flex items-center justify-between">
        <div>
          <div className="text-white font-display text-lg">📦 Backup complet</div>
          <div className="text-white/60 text-sm mt-1">Toutes les tables en un seul fichier JSON</div>
        </div>
        <button
          onClick={exportAll}
          disabled={loading}
          className="bg-white text-dental-900 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 transition-colors">
          {loading ? 'Export...' : '📥 Tout exporter'}
        </button>
      </div>

      {/* Boutons par table */}
      <div className="space-y-3">
        {tables.map(table => (
          <div key={table.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{table.emoji}</span>
              <div>
                <div className="font-medium text-charcoal">{table.label}</div>
                <div className="text-xs text-warm-gray">{table.id}</div>
              </div>
            </div>
            <button
              onClick={() => exportTable(table.id)}
              disabled={loading}
              className="border border-gray-200 text-warm-gray rounded-lg px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 transition-colors">
              📥 Exporter
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="text-amber-800 text-sm font-medium mb-1">💡 Conseil</div>
        <div className="text-amber-700 text-sm">Faites un backup complet une fois par mois et conservez-le sur un disque externe ou Google Drive.</div>
      </div>
    </div>
  )
}
                                                                             
function Dashboard() {
  const [famillePhotos, setFamillePhotos] = useState([])
  const [activeTab, setActiveTab] = useState('services')
  const [services, setServices] = useState([])
  const [siteSettings, setSiteSettings] = useState({})
  const [avantApres, setAvantApres] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [editingService, setEditingService] = useState(null)
  const supabase = createClient()

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    const BUCKETS = ['famille', 'voyages', 'plongee', 'aventures']
    const allPhotos = {}
    for (const bucket of BUCKETS) {
      const { data } = await supabase.storage.from(bucket).list('')
      allPhotos[bucket] = (data || [])
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => ({
          name: f.name,
          url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${f.name}`,
          caption: f.name.replace(/^\d+-/, '').replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        }))
    }
    setFamillePhotos(allPhotos)
    const [{ data: svcs }, { data: sets }, { data: aa }] = await Promise.all([
      supabase.from('services').select('*').eq('locale', 'fr').order('order'),
      supabase.from('site_settings').select('*').eq('locale', 'fr').single(),
      supabase.from('avant_apres').select('*').order('ordre'),
    ])
    setServices(svcs || [])
    setSiteSettings(sets || {})
    setAvantApres(aa || [])
    setLoading(false)
  }

  async function saveService(service) {
    setSaving(true)
    const { id, ...data } = service
    await supabase.from('services').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
    await loadData()
    setEditingService(null)
    showMessage('Service sauvegardé ✓')
    setSaving(false)
  }

  async function saveSiteSettings(settings) {
    setSaving(true)
    const { id, created_at, ...data } = settings
    await supabase.from('site_settings').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
    await loadData()
    showMessage('Paramètres sauvegardés ✓')
    setSaving(false)
  }

  async function togglePublished(service) {
    await supabase.from('services').update({ published: !service.published }).eq('id', service.id)
    await loadData()
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  function showMessage(msg) {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-warm-gray">Chargement...</div>
    </div>
  )

const TABS = [
  { id: 'services', label: '🗂️ Services' },
  { id: 'site', label: '🌐 Paramètres du site' },
  { id: 'mavie', label: '🌿 Ma vie' },
  { id: 'avantapres', label: '🦷 Avant/Après' },
  { id: 'blog', label: '✍️ Blog' },
  { id: 'backup', label: '💾 Backup' },
  { id: 'patients', label: '👥 Patients' },
]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dental-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦷</span>
          <div>
            <div className="font-display text-lg">Administration</div>
            <div className="text-white/60 text-xs">Dr Serge Chaussé</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {message && <span className="text-green-400 text-sm font-medium">{message}</span>}
          <a href="/" target="_blank" className="text-white/70 hover:text-white text-sm">Voir le site →</a>
          <button onClick={logout} className="text-white/70 hover:text-white text-sm">Déconnexion</button>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-dental-600 text-dental-600' : 'border-transparent text-warm-gray hover:text-charcoal'}`}>
              {tab.label}
            </button>
          ))}
          <a href="/admin/analytics"
            className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-warm-gray hover:text-charcoal transition-colors">
            📊 Analytics
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === 'services' && (
          <div>
            {editingService ? (
              <ServiceEditor service={editingService} onSave={saveService} onCancel={() => setEditingService(null)} saving={saving} />
            ) : (
              <>
                <h2 className="font-display text-2xl text-charcoal mb-6">Services ({services.length})</h2>
                <div className="space-y-3">
                  {services.map(s => (
                    <div key={s.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                      {s.image_url && (
                        <img src={s.image_url} alt={s.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-charcoal">{s.title}</div>
                        <div className="text-sm text-warm-gray">{s.category} · /services/{s.slug}</div>
                        {s.excerpt && <div className="text-xs text-warm-gray mt-1 truncate max-w-lg">{s.excerpt}</div>}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button onClick={() => togglePublished(s)}
                          className={`text-xs px-3 py-1 rounded-full font-medium ${s.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {s.published ? 'Publié' : 'Masqué'}
                        </button>
                        <button onClick={() => setEditingService(s)} className="text-sm text-dental-600 hover:underline">Modifier</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'site' && (
          <SiteSettingsEditor settings={siteSettings} onSave={saveSiteSettings} saving={saving} />
        )}
        {activeTab === 'mavie' && (
          <AdminMaVie photos={famillePhotos} onRefresh={loadData} />
        )}
        {activeTab === 'avantapres' && (
          <AdminAvantApres cas={avantApres} onRefresh={loadData} />
        )}
        {activeTab === 'blog' && (
  <AdminBlog />
)}
{activeTab === 'backup' && (
  <AdminBackup />
)}
{activeTab === 'patients' && (
  <AdminPatients />
)}
    
      </div>
    </div>
  )
}

// ============================================
// SERVICE EDITOR COMPLET
// ============================================
function ServiceEditor({ service, onSave, onCancel, saving }) {
const [form, setForm] = useState({ 
  ...service, 
  content: typeof service.content === 'string' 
    ? JSON.parse(service.content) 
    : (service.content || []) 
})
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef(null)
  const supabase = createClient()

  async function handleImageUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploadingImage(true)
    const ext = file.name.split('.').pop()
    const fileName = `services/${form.slug}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(fileName, file, { upsert: true })
    if (!error) {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${fileName}`
      setForm(p => ({ ...p, image_url: url }))
    }
    setUploadingImage(false)
  }

  async function removeImage() {
    setForm(p => ({ ...p, image_url: '' }))
  }

  function addSection() {
    setForm(p => ({ ...p, content: [...p.content, { titre: '', texte: '', liste: [] }] }))
  }

  function updateSection(i, field, value) {
    setForm(p => {
      const content = [...p.content]
      content[i] = { ...content[i], [field]: value }
      return { ...p, content }
    })
  }

  function removeSection(i) {
    setForm(p => ({ ...p, content: p.content.filter((_, idx) => idx !== i) }))
  }

  function moveSection(i, dir) {
    setForm(p => {
      const content = [...p.content]
      const j = i + dir
      if (j < 0 || j >= content.length) return p
      ;[content[i], content[j]] = [content[j], content[i]]
      return { ...p, content }
    })
  }

  function addListItem(i) {
    setForm(p => {
      const content = [...p.content]
      content[i] = { ...content[i], liste: [...(content[i].liste || []), ''] }
      return { ...p, content }
    })
  }

  function updateListItem(sectionIdx, itemIdx, value) {
    setForm(p => {
      const content = [...p.content]
      const liste = [...(content[sectionIdx].liste || [])]
      liste[itemIdx] = value
      content[sectionIdx] = { ...content[sectionIdx], liste }
      return { ...p, content }
    })
  }

  function removeListItem(sectionIdx, itemIdx) {
    setForm(p => {
      const content = [...p.content]
      const liste = (content[sectionIdx].liste || []).filter((_, idx) => idx !== itemIdx)
      content[sectionIdx] = { ...content[sectionIdx], liste }
      return { ...p, content }
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-charcoal">Modifier : {form.title}</h3>
        <button onClick={onCancel} className="text-warm-gray hover:text-charcoal text-sm">← Retour</button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal mb-3">🖼️ Image principale</label>
        {form.image_url ? (
          <div className="relative inline-block">
            <img src={form.image_url} alt="Service" className="w-full max-w-md h-48 object-cover rounded-xl border border-gray-200" />
            <button onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-600">
              ✕
            </button>
          </div>
        ) : (
          <div onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-md h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-dental-400 hover:bg-dental-50 transition-colors">
            {uploadingImage ? (
              <div className="text-warm-gray text-sm">Téléversement...</div>
            ) : (
              <>
                <div className="text-3xl mb-2">📸</div>
                <div className="text-warm-gray text-sm">Cliquez pour ajouter une image</div>
                <div className="text-warm-gray text-xs mt-1">JPG, PNG, WebP</div>
              </>
            )}
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        {!form.image_url && !uploadingImage && (
          <button onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-dental-600 text-sm hover:underline">
            + Choisir une image
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal mb-3">📋 Informations de base</label>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-warm-gray mb-1">Catégorie</label>
              <input value={form.category || ''} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-warm-gray mb-1">Slug (URL)</label>
              <input value={form.slug || ''} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 bg-gray-50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-warm-gray mb-1">Titre</label>
            <input value={form.title || ''} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-warm-gray mb-1">Extrait (résumé court)</label>
            <textarea value={form.excerpt || ''} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal mb-3">🔍 SEO</label>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-warm-gray mb-1">SEO Title</label>
            <input value={form.seo_title || ''} onChange={e => setForm(p => ({ ...p, seo_title: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-warm-gray mb-1">SEO Description</label>
            <textarea value={form.seo_description || ''} onChange={e => setForm(p => ({ ...p, seo_description: e.target.value }))} rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-charcoal">📝 Contenu de la page</label>
          <button onClick={addSection}
            className="bg-dental-600 text-white rounded-lg px-4 py-1.5 text-sm hover:bg-dental-700 transition-colors">
            + Ajouter une section
          </button>
        </div>

        {form.content.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl text-warm-gray text-sm">
            Aucune section. Cliquez sur "Ajouter une section" pour commencer.
          </div>
        )}

        <div className="space-y-4">
          {form.content.map((section, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-warm-gray bg-white border border-gray-200 rounded-full px-3 py-1">
                  Section {i + 1}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => moveSection(i, -1)} disabled={i === 0}
                    className="text-warm-gray hover:text-charcoal disabled:opacity-30 text-sm px-2">↑</button>
                  <button onClick={() => moveSection(i, 1)} disabled={i === form.content.length - 1}
                    className="text-warm-gray hover:text-charcoal disabled:opacity-30 text-sm px-2">↓</button>
                  <button onClick={() => removeSection(i)}
                    className="text-red-400 hover:text-red-600 text-sm px-2">✕ Supprimer</button>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-warm-gray mb-1">Titre de la section</label>
                <input value={section.titre || ''} onChange={e => updateSection(i, 'titre', e.target.value)}
                  placeholder="ex: Avantages, Le processus..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 bg-white" />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-warm-gray mb-1">Texte (paragraphe)</label>
                <textarea value={section.texte || ''} onChange={e => updateSection(i, 'texte', e.target.value)}
                  placeholder="Texte descriptif..." rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none bg-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-warm-gray mb-2">Liste à puces</label>
                <div className="space-y-2">
                  {(section.liste || []).map((item, j) => (
                    <div key={j} className="flex gap-2 items-center">
                      <span className="text-dental-500 text-sm">✓</span>
                      <input value={item} onChange={e => updateListItem(i, j, e.target.value)}
                        placeholder="Élément de liste..."
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-dental-500 bg-white" />
                      <button onClick={() => removeListItem(i, j)}
                        className="text-red-400 hover:text-red-600 text-sm w-6">✕</button>
                    </div>
                  ))}
                  <button onClick={() => addListItem(i)}
                    className="text-dental-600 text-sm hover:underline mt-1">
                    + Ajouter un élément
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button onClick={() => onSave(form)} disabled={saving}
          className="bg-dental-600 text-white rounded-lg px-8 py-2.5 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors">
          {saving ? 'Sauvegarde...' : '💾 Sauvegarder'}
        </button>
        <button onClick={onCancel} className="border border-gray-200 text-warm-gray rounded-lg px-6 py-2.5 text-sm hover:bg-gray-50">
          Annuler
        </button>
      </div>
    </div>
  )
}

function SiteSettingsEditor({ settings, onSave, saving }) {
  const [form, setForm] = useState({ ...settings })

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-charcoal">Paramètres du site (FR)</h2>
      {[
        { key: 'site_name', label: 'Nom du site', type: 'text' },
        { key: 'tagline', label: 'Tagline', type: 'text' },
        { key: 'seo_title_default', label: 'SEO Title par défaut', type: 'text' },
        { key: 'seo_description_default', label: 'SEO Description par défaut', type: 'textarea' },
    
      ].map(field => (
        <div key={field.key} className="bg-white rounded-xl border border-gray-100 p-4">
          <label className="block text-sm font-medium text-charcoal mb-2">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea value={form[field.key] || ''} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none" />
          ) : (
            <input type="text" value={form[field.key] || ''} onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
          )}
        </div>
      ))}
      <button onClick={() => onSave(form)} disabled={saving}
        className="bg-dental-600 text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors">
        {saving ? 'Sauvegarde...' : 'Sauvegarder tous les paramètres'}
      </button>
    </div>
  )
}

export default function AdminPage() {
  const [user, setUser] = useState(undefined)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (user === undefined) return (
    <div className="min-h-screen bg-dental-900 flex items-center justify-center">
      <div className="text-white/60">Chargement...</div>
    </div>
  )

  if (!user) return <LoginForm onLogin={() => supabase.auth.getUser().then(({ data }) => setUser(data.user))} />

  return <Dashboard />
}
