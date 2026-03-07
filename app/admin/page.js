'use client'
import AdminMaVie from '@/components/AdminMaVie'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else onLogin()
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
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const [famillePhotos, setFamillePhotos] = useState([])
  const [activeTab, setActiveTab] = useState('services')
  const [services, setServices] = useState([])
  const [siteSettings, setSiteSettings] = useState({})
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
    const [{ data: svcs }, { data: sets }] = await Promise.all([
      supabase.from('services').select('*').eq('locale', 'fr').order('order'),
      supabase.from('site_settings').select('*').eq('locale', 'fr').single(),
    ])
    setServices(svcs || [])
    setSiteSettings(sets || {})
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
          {[{ id: 'services', label: '🗂️ Services' }, { id: 'site', label: '🌐 Paramètres du site' },{ id: 'mavie', label: '🌿 Ma vie' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-dental-600 text-dental-600' : 'border-transparent text-warm-gray hover:text-charcoal'}`}>
              {tab.label}
            </button>
          ))}
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
      </div>
    </div>
  )
}

function ServiceEditor({ service, onSave, onCancel, saving }) {
  const [form, setForm] = useState({ ...service })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl text-charcoal">Modifier : {form.title}</h3>
        <button onClick={onCancel} className="text-warm-gray hover:text-charcoal text-sm">← Retour</button>
      </div>
      <div className="space-y-4 mb-6">
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
      <div className="flex gap-3">
        <button onClick={() => onSave(form)} disabled={saving}
          className="bg-dental-600 text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors">
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
        <button onClick={onCancel} className="border border-gray-200 text-warm-gray rounded-lg px-6 py-2 text-sm hover:bg-gray-50">Annuler</button>
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
