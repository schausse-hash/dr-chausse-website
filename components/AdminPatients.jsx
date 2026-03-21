// components/AdminPatients.jsx
// Onglet Patients dans app/admin/page.js
// Usage : import AdminPatients from '@/components/AdminPatients'

'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AdminPatients() {
  const supabase = createClient()

  // --- État patients ---
  const [patients, setPatients]       = useState([])
  const [total, setTotal]             = useState(0)
  const [loading, setLoading]         = useState(true)
  const [recherche, setRecherche]     = useState('')
  const [page, setPage]               = useState(0)
  const PAR_PAGE = 50

  // --- État envoi de masse ---
  const [onglet, setOnglet]           = useState('liste')  // 'liste' | 'envoi' | 'historique'
  const [sujet, setSujet]             = useState('')
  const [messageHtml, setMessageHtml] = useState('')
  const [envoyerEn, setEnvoyerEn]     = useState(false)
  const [resultatEnvoi, setResultatEnvoi] = useState(null)

  // --- État historique ---
  const [envois, setEnvois]           = useState([])

  // ============================================================
  // Chargement des patients
  // ============================================================
  const chargerPatients = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('patients')
      .select('*', { count: 'exact' })
      .order('nom')
      .range(page * PAR_PAGE, (page + 1) * PAR_PAGE - 1)

    if (recherche.trim()) {
      query = query.or(`nom.ilike.%${recherche}%,courriel.ilike.%${recherche}%,ville.ilike.%${recherche}%`)
    }

    const { data, count, error } = await query
    if (!error) {
      setPatients(data || [])
      setTotal(count || 0)
    }
    setLoading(false)
  }, [page, recherche])

  useEffect(() => { chargerPatients() }, [chargerPatients])
  useEffect(() => { setPage(0) }, [recherche])

  // ============================================================
  // Chargement historique des envois
  // ============================================================
  const chargerHistorique = async () => {
    const { data } = await supabase
      .from('envois')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    setEnvois(data || [])
  }

  useEffect(() => {
    if (onglet === 'historique') chargerHistorique()
  }, [onglet])

  // ============================================================
  // Désactiver / réactiver un patient
  // ============================================================
  const toggleActif = async (patient) => {
    await supabase
      .from('patients')
      .update({ actif: !patient.actif })
      .eq('id', patient.id)
    chargerPatients()
  }

  // ============================================================
  // Envoi de masse
  // ============================================================
  const envoyerMasse = async () => {
    if (!sujet.trim() || !messageHtml.trim()) {
      alert('Le sujet et le message sont requis.')
      return
    }
    if (!confirm(`Envoyer à tous les patients actifs non-désabonnés?\n\nSujet : ${sujet}`)) return

    setEnvoyerEn(true)
    setResultatEnvoi(null)

    try {
      const res = await fetch('/api/patients/send-mass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sujet, message_html: messageHtml })
      })
      const data = await res.json()
      setResultatEnvoi(data)
      if (data.success) {
        setSujet('')
        setMessageHtml('')
      }
    } catch (e) {
      setResultatEnvoi({ error: e.message })
    } finally {
      setEnvoyerEn(false)
    }
  }

  // ============================================================
  // Compter les destinataires actifs
  // ============================================================
  const [nbDestinataires, setNbDestinataires] = useState(0)
  useEffect(() => {
    supabase
      .from('patients')
      .select('id', { count: 'exact', head: true })
      .eq('actif', true)
      .eq('desabonne', false)
      .not('courriel', 'is', null)
      .then(({ count }) => setNbDestinataires(count || 0))
  }, [])

  // ============================================================
  // Rendu
  // ============================================================
  return (
    <div className="space-y-6">

      {/* Navigation onglets internes */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {[
          { key: 'liste',      label: `📋 Liste (${total})` },
          { key: 'envoi',      label: '📨 Envoyer un courriel' },
          { key: 'historique', label: '📊 Historique' },
        ].map(o => (
          <button
            key={o.key}
            onClick={() => setOnglet(o.key)}
            className={`px-4 py-2 rounded-t text-sm font-medium transition-colors
              ${onglet === o.key ? 'bg-white border border-b-white border-gray-200 text-green-700' : 'text-gray-500 hover:text-gray-800'}`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* =========== ONGLET LISTE =========== */}
      {onglet === 'liste' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Rechercher par nom, courriel ou ville..."
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />

          {loading ? (
            <p className="text-gray-400 text-sm">Chargement...</p>
          ) : (
            <>
              <div className="overflow-x-auto rounded border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="text-left px-3 py-2">Nom</th>
                      <th className="text-left px-3 py-2">Courriel</th>
                      <th className="text-left px-3 py-2">Ville</th>
                      <th className="text-left px-3 py-2">Statut</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {patients.map(p => (
                      <tr key={p.id} className={p.actif ? '' : 'opacity-40'}>
                        <td className="px-3 py-2 font-medium max-w-xs truncate">{p.nom}</td>
                        <td className="px-3 py-2 text-gray-500">{p.courriel || <span className="text-gray-300 italic">aucun</span>}</td>
                        <td className="px-3 py-2 text-gray-500">{p.ville || '—'}</td>
                        <td className="px-3 py-2">
                          {p.desabonne
                            ? <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Désabonné</span>
                            : p.actif
                              ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Actif</span>
                              : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactif</span>
                          }
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button
                            onClick={() => toggleActif(p)}
                            className="text-xs text-gray-400 hover:text-gray-700 underline"
                          >
                            {p.actif ? 'Désactiver' : 'Réactiver'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{total} patients · page {page + 1} / {Math.ceil(total / PAR_PAGE)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-3 py-1 border rounded disabled:opacity-30"
                  >← Précédent</button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={(page + 1) * PAR_PAGE >= total}
                    className="px-3 py-1 border rounded disabled:opacity-30"
                  >Suivant →</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* =========== ONGLET ENVOI =========== */}
      {onglet === 'envoi' && (
        <div className="space-y-5 max-w-2xl">
          <div className="bg-green-50 border border-green-200 rounded p-4 text-sm text-green-800">
            <strong>{nbDestinataires} destinataires</strong> — patients actifs, non désabonnés, avec courriel.
            <br/>
            <span className="text-xs text-green-600">Variables disponibles dans le message : {'{{nom}}'}, {'{{prenom}}'}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sujet du courriel</label>
            <input
              type="text"
              value={sujet}
              onChange={e => setSujet(e.target.value)}
              placeholder="Ex : Nouveau service d'implantologie — Dr Serge Chaussé"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message (HTML)</label>
            <textarea
              value={messageHtml}
              onChange={e => setMessageHtml(e.target.value)}
              rows={12}
              placeholder={`<p>Bonjour {{prenom}},</p>\n<p>Je suis heureux de vous informer...</p>\n<p>Consultez notre site : <a href="https://www.dentiste.com">dentiste.com</a></p>`}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">
              Le lien de désabonnement est ajouté automatiquement en bas de chaque courriel (obligatoire — Loi 25).
            </p>
          </div>

          {resultatEnvoi && (
            <div className={`rounded p-4 text-sm ${resultatEnvoi.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
              {resultatEnvoi.success
                ? `✅ Envoi terminé : ${resultatEnvoi.nb_envoyes} courriels envoyés, ${resultatEnvoi.nb_erreurs} erreur(s).`
                : `❌ Erreur : ${resultatEnvoi.error}`
              }
            </div>
          )}

          <button
            onClick={envoyerMasse}
            disabled={envoyerEn || !sujet || !messageHtml}
            className="bg-green-700 text-white px-6 py-2 rounded font-medium text-sm
              disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 transition"
          >
            {envoyerEn ? '⏳ Envoi en cours...' : `📨 Envoyer à ${nbDestinataires} patients`}
          </button>
        </div>
      )}

      {/* =========== ONGLET HISTORIQUE =========== */}
      {onglet === 'historique' && (
        <div className="space-y-3">
          {envois.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucun envoi pour l'instant.</p>
          ) : (
            <div className="overflow-x-auto rounded border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-3 py-2">Date</th>
                    <th className="text-left px-3 py-2">Sujet</th>
                    <th className="text-left px-3 py-2">Envoyés</th>
                    <th className="text-left px-3 py-2">Erreurs</th>
                    <th className="text-left px-3 py-2">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {envois.map(e => (
                    <tr key={e.id}>
                      <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                        {new Date(e.created_at).toLocaleString('fr-CA')}
                      </td>
                      <td className="px-3 py-2 font-medium">{e.sujet}</td>
                      <td className="px-3 py-2 text-green-700 font-medium">{e.nb_envoyes}</td>
                      <td className="px-3 py-2 text-red-500">{e.nb_erreurs}</td>
                      <td className="px-3 py-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full
                          ${e.statut === 'termine' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {e.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
