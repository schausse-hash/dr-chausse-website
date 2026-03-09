'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import {
  Phone, Mail, MousePointer, Eye, Users, TrendingUp,
  Calendar, Clock, Monitor, Smartphone, RefreshCw
} from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// ── Helpers ──────────────────────────────────────────────────────
const EVENT_META = {
  page_view:         { label: 'Pages vues',         icon: Eye,          color: 'bg-blue-100 text-blue-700' },
  click_phone:       { label: 'Clics téléphone',    icon: Phone,        color: 'bg-green-100 text-green-700' },
  click_email:       { label: 'Clics courriel',     icon: Mail,         color: 'bg-purple-100 text-purple-700' },
  form_submit:       { label: 'Formulaires envoyés',icon: TrendingUp,   color: 'bg-emerald-100 text-emerald-700' },
  click_clinic:      { label: 'Clics cliniques',    icon: MousePointer, color: 'bg-amber-100 text-amber-700' },
  click_rdv:         { label: 'Clics rendez-vous',  icon: Calendar,     color: 'bg-rose-100 text-rose-700' },
}

function fmt(n) { return n?.toLocaleString('fr-CA') ?? '—' }

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const m = Math.floor(diff / 60000)
  if (m < 1)  return "à l'instant"
  if (m < 60) return `il y a ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `il y a ${h}h`
  return `il y a ${Math.floor(h / 24)}j`
}

// ── Composants ───────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-3xl font-bold text-charcoal">{fmt(value)}</p>
      <p className="text-sm text-warm-gray mt-1">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}

function EventRow({ event }) {
  const meta = EVENT_META[event.event_type] || { label: event.event_type, color: 'bg-gray-100 text-gray-600' }
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${meta.color}`}>
        {meta.label}
      </span>
      {event.label && (
        <span className="text-sm text-charcoal font-medium truncate">{event.label}</span>
      )}
      <span className="text-xs text-gray-400 ml-auto shrink-0">{event.page}</span>
      <span className="text-xs text-gray-400 shrink-0">{timeAgo(event.created_at)}</span>
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────
export default function AnalyticsDashboard() {
  const [period, setPeriod]     = useState('7')   // jours
  const [events, setEvents]     = useState([])
  const [recent, setRecent]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [lastRefresh, setLastRefresh] = useState(null)

  const load = async () => {
    setLoading(true)
    const since = new Date(Date.now() - parseInt(period) * 86400000).toISOString()

    // Agrégats par type
    const { data: agg } = await supabase
      .from('analytics_events')
      .select('event_type, label, session_id, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false })

    // 20 derniers événements
    const { data: rec } = await supabase
      .from('analytics_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    setEvents(agg || [])
    setRecent(rec || [])
    setLastRefresh(new Date())
    setLoading(false)
  }

  useEffect(() => { load() }, [period])

  // Calculs
  const total        = events.length
  const sessions     = new Set(events.map(e => e.session_id)).size
  const pageViews    = events.filter(e => e.event_type === 'page_view').length
  const phoneCLicks  = events.filter(e => e.event_type === 'click_phone').length
  const formSubmits  = events.filter(e => e.event_type === 'form_submit').length
  const rdvClicks    = events.filter(e => e.event_type === 'click_rdv').length

  // Top pages
  const pageCount = events
    .filter(e => e.event_type === 'page_view')
    .reduce((acc, e) => { acc[e.page] = (acc[e.page] || 0) + 1; return acc }, {})
  const topPages = Object.entries(pageCount).sort((a, b) => b[1] - a[1]).slice(0, 5)

  // Top cliniques
  const clinicCount = events
    .filter(e => e.event_type === 'click_clinic')
    .reduce((acc, e) => { acc[e.label] = (acc[e.label] || 0) + 1; return acc }, {})

  return (
    <div className="min-h-screen bg-cream py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-charcoal">Analytics</h1>
            <p className="text-warm-gray text-sm mt-1">
              {lastRefresh ? `Mis à jour ${timeAgo(lastRefresh)}` : 'Chargement...'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Sélecteur période */}
            <div className="flex rounded-xl overflow-hidden border border-gray-200 text-sm">
              {[['7', '7 jours'], ['30', '30 jours'], ['90', '90 jours']].map(([val, lbl]) => (
                <button key={val} onClick={() => setPeriod(val)}
                  className={`px-4 py-2 transition-colors ${period === val ? 'bg-dental-600 text-white' : 'bg-white text-warm-gray hover:bg-gray-50'}`}>
                  {lbl}
                </button>
              ))}
            </div>
            <button onClick={load} disabled={loading}
              className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
              <RefreshCw className={`w-4 h-4 text-warm-gray ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <StatCard icon={Eye}         label="Pages vues"     value={pageViews}   color="bg-blue-100 text-blue-700"     sub={`${sessions} sessions`} />
          <StatCard icon={Users}       label="Sessions"       value={sessions}    color="bg-indigo-100 text-indigo-700" />
          <StatCard icon={Phone}       label="Clics tél."     value={phoneCLicks} color="bg-green-100 text-green-700"   />
          <StatCard icon={TrendingUp}  label="Formulaires"    value={formSubmits} color="bg-emerald-100 text-emerald-700" />
          <StatCard icon={Calendar}    label="Clics RDV"      value={rdvClicks}   color="bg-rose-100 text-rose-700"     />
          <StatCard icon={MousePointer}label="Total événements" value={total}    color="bg-amber-100 text-amber-700"   />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Top pages */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-dental-500" /> Pages populaires
            </h2>
            {topPages.length === 0 && <p className="text-warm-gray text-sm">Aucune donnée</p>}
            {topPages.map(([page, count]) => (
              <div key={page} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-charcoal font-medium">{page || '/'}</span>
                    <span className="text-warm-gray">{fmt(count)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-dental-500 rounded-full"
                      style={{ width: `${(count / (topPages[0]?.[1] || 1)) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cliniques */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
              <MousePointer className="w-4 h-4 text-dental-500" /> Intérêt par clinique
            </h2>
            {Object.keys(clinicCount).length === 0 && (
              <p className="text-warm-gray text-sm">Aucun clic clinique enregistré</p>
            )}
            {Object.entries(clinicCount).sort((a, b) => b[1] - a[1]).map(([clinic, count]) => (
              <div key={clinic} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <span className="text-charcoal font-medium text-sm">{clinic}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${(count / (Math.max(...Object.values(clinicCount)))) * 100}%` }} />
                  </div>
                  <span className="text-warm-gray text-sm w-6 text-right">{count}</span>
                </div>
              </div>
            ))}

            {/* Téléphones */}
            <h3 className="font-semibold text-sm text-charcoal mt-5 mb-3 flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-600" /> Numéros appelés
            </h3>
            {(() => {
              const phoneCounts = events
                .filter(e => e.event_type === 'click_phone')
                .reduce((acc, e) => { acc[e.label] = (acc[e.label] || 0) + 1; return acc }, {})
              const entries = Object.entries(phoneCounts).sort((a, b) => b[1] - a[1])
              if (entries.length === 0) return <p className="text-warm-gray text-sm">Aucun clic téléphone</p>
              return entries.map(([num, count]) => (
                <div key={num} className="flex justify-between text-sm py-1">
                  <span className="text-charcoal">{num}</span>
                  <span className="text-warm-gray">{count} clic{count > 1 ? 's' : ''}</span>
                </div>
              ))
            })()}
          </div>

        </div>

        {/* Flux en temps réel */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-display text-lg text-charcoal mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-dental-500" /> Activité récente
            <span className="ml-auto text-xs text-gray-400 font-normal">20 derniers événements</span>
          </h2>
          {loading && <p className="text-warm-gray text-sm">Chargement...</p>}
          {!loading && recent.length === 0 && <p className="text-warm-gray text-sm">Aucun événement enregistré</p>}
          {recent.map(e => <EventRow key={e.id} event={e} />)}
        </div>

      </div>
    </div>
  )
}
