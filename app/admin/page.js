'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// ─── Login ────────────────────────────────────────────────────────────────────
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
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dental-500"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dental-500"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-dental-600 text-white rounded-lg py-3 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const [activeTab, setActiveTab] = useState('services')
  const [services, setServices] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [editingService, setEditingService] = useState(null)
  const supabase = createClient()

  useEffect(() => { loadData() }, [])

  async function loadData() {
    setLoading(true)
    const [{ data: svcs }, { data: sets }] = await Promise.all([
      supabase.from('services').select('*').order('ordre'),
      supabase.from('site_settings').select('*'),
    ])
    setServices(svcs || [])
    const settingsMap = {}
    ;(sets || []).forEach(s => { settingsMap[s.cle] = s.valeur })
    setSettings(settingsMap)
    setLoading(false)
  }

  async function saveSetting(cle, valeur) {
    setSaving(true)
    await supabase.from('site_settings').upsert({ cle, valeur, updated_at: new Date().toISOString() }, { onConflict: 'cle' })
    showMessage('Sauvegardé ✓')
    setSaving(false)
  }

  async function saveService(service) {
    setSaving(true)
    await supabase.from('services').upsert({ ...service, updated_at: new Date().toISOString() })
    await loadData()
    setEditingService(null)
    showMessage('Service sauvegardé ✓')
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
      {/* Header */}
      <header className="bg-dental-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦷</span>
          <div>
            <div className="font-display text-lg">Administration</div>
            <div className="text-white/60 text-xs">Dr Serge Chaussé</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {message && <span className="text-green-400 text-sm">{message}</span>}
          <a href="/" target="_blank" className="text-white/70 hover:text-white text-sm">Voir le site →</a>
          <button onClick={logout} className="text-white/70 hover:text-white text-sm">Déconnexion</button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1">
          {[
            { id: 'services', label: '🗂️ Services' },
            { id: 'accueil', label: '🏠 Page d\'accueil' },
            { id: 'contact', label: '📞 Contact' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-dental-600 text-dental-600'
                  : 'border-transparent text-warm-gray hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── TAB SERVICES ── */}
        {activeTab === 'services' && (
          <div>
            {editingService ? (
              <ServiceEditor
                service={editingService}
                onSave={saveService}
                onCancel={() => setEditingService(null)}
                saving={saving}
              />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl text-charcoal">Services</h2>
                </div>
                <div className="space-y-3">
                  {services.map(s => (
                    <div key={s.id} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                      <span className="text-2xl">{s.emoji}</span>
                      <div className="flex-1">
                        <div className="font-medium text-charcoal">{s.titre}</div>
                        <div className="text-sm text-warm-gray">{s.categorie} · {s.excerpt?.substring(0, 60)}...</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => togglePublished(s)}
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            s.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {s.published ? 'Publié' : 'Masqué'}
                        </button>
                        <button
                          onClick={() => setEditingService(s)}
                          className="text-sm text-dental-600 hover:underline"
                        >
                          Modifier
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── TAB ACCUEIL ── */}
        {activeTab === 'accueil' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-charcoal">Textes de la page d'accueil</h2>
            {[
              { cle: 'hero_titre', label: 'Titre principal (Hero)', type: 'text' },
              { cle: 'hero_sous_titre', label: 'Sous-titre (Hero)', type: 'text' },
              { cle: 'hero_description', label: 'Description (Hero)', type: 'textarea' },
              { cle: 'apropos_titre', label: 'Titre section À propos', type: 'text' },
              { cle: 'apropos_texte', label: 'Texte section À propos', type: 'textarea' },
            ].map(field => (
              <SettingField
                key={field.cle}
                field={field}
                value={settings[field.cle] || ''}
                onChange={val => setSettings(prev => ({ ...prev, [field.cle]: val }))}
                onSave={() => saveSetting(field.cle, settings[field.cle])}
                saving={saving}
              />
            ))}
          </div>
        )}

        {/* ── TAB CONTACT ── */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-charcoal">Informations de contact</h2>
            {[
              { cle: 'telephone_montreal', label: 'Téléphone Montréal', type: 'text' },
              { cle: 'telephone_sjsr', label: 'Téléphone Saint-Jean-sur-Richelieu', type: 'text' },
              { cle: 'email', label: 'Email', type: 'text' },
              { cle: 'adresse_montreal', label: 'Adresse Montréal', type: 'text' },
              { cle: 'adresse_sjsr', label: 'Adresse Saint-Jean-sur-Richelieu', type: 'text' },
            ].map(field => (
              <SettingField
                key={field.cle}
                field={field}
                value={settings[field.cle] || ''}
                onChange={val => setSettings(prev => ({ ...prev, [field.cle]: val }))}
                onSave={() => saveSetting(field.cle, settings[field.cle])}
                saving={saving}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Composant éditeur de service ─────────────────────────────────────────────
function ServiceEditor({ service, onSave, onCancel, saving }) {
  const [form, setForm] = useState({ ...service })

  function updateSection(index, key, value) {
    const newContenu = [...(form.contenu || [])]
    newContenu[index] = { ...newContenu[index], [key]: value }
    setForm(prev => ({ ...prev, contenu: newContenu }))
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl text-charcoal">Modifier : {form.titre}</h3>
        <button onClick={onCancel} className="text-warm-gray hover:text-charcoal text-sm">← Retour</button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-warm-gray mb-1">Emoji</label>
            <input value={form.emoji || ''} onChange={e => setForm(p => ({...p, emoji: e.target.value}))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-warm-gray mb-1">Catégorie</label>
            <input value={form.categorie || ''} onChange={e => setForm(p => ({...p, categorie: e.target.value}))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-warm-gray mb-1">Titre</label>
          <input value={form.titre || ''} onChange={e => setForm(p => ({...p, titre: e.target.value}))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-warm-gray mb-1">Extrait (résumé court)</label>
          <textarea value={form.excerpt || ''} onChange={e => setForm(p => ({...p, excerpt: e.target.value}))} rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none" />
        </div>
      </div>

      {/* Sections de contenu */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-charcoal mb-3">Sections de contenu</h4>
        <div className="space-y-4">
          {(form.contenu || []).map((section, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-warm-gray">Section {i + 1}</span>
              </div>
              <input
                value={section.titre || ''}
                onChange={e => updateSection(i, 'titre', e.target.value)}
                placeholder="Titre de la section"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-dental-500"
              />
              <textarea
                value={section.texte || ''}
                onChange={e => updateSection(i, 'texte', e.target.value)}
                placeholder="Texte de la section"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="bg-dental-600 text-white rounded-lg px-6 py-2 text-sm font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
        <button onClick={onCancel} className="border border-gray-200 text-warm-gray rounded-lg px-6 py-2 text-sm hover:bg-gray-50">
          Annuler
        </button>
      </div>
    </div>
  )
}

// ─── Composant champ de paramètre ─────────────────────────────────────────────
function SettingField({ field, value, onChange, onSave, saving }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <label className="block text-sm font-medium text-charcoal mb-2">{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 resize-none mb-3"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-dental-500 mb-3"
        />
      )}
      <button
        onClick={onSave}
        disabled={saving}
        className="bg-dental-600 text-white rounded-lg px-4 py-1.5 text-xs font-medium hover:bg-dental-700 disabled:opacity-50 transition-colors"
      >
        {saving ? 'Sauvegarde...' : 'Sauvegarder'}
      </button>
    </div>
  )
}

// ─── Page principale ───────────────────────────────────────────────────────────
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
