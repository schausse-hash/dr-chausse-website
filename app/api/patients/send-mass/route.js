// app/api/patients/send-mass/route.js
// Envoi de masse aux patients via Resend
// Accès : POST /api/patients/send-mass (authentifié)

import { createClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = 'Dr Serge Chaussé <schausse@dentiste.com>'
const BATCH_SIZE = 50   // Resend permet 100 max, on prend 50 pour la marge
const DELAY_MS   = 1000 // 1 sec entre chaque batch (anti-spam)

export async function POST(request) {
  try {
    const supabase = createClient()

    // Vérifier que l'utilisateur est authentifié
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { sujet, message_html, message_texte } = await request.json()

    if (!sujet || !message_html) {
      return NextResponse.json({ error: 'sujet et message_html sont requis' }, { status: 400 })
    }

    // Créer l'entrée dans la table envois
    const { data: envoi, error: envoisError } = await supabase
      .from('envois')
      .insert({
        sujet,
        message_html,
        message_texte: message_texte || '',
        statut: 'en_cours',
        envoye_par: user.email
      })
      .select()
      .single()

    if (envoisError) throw envoisError

    // Récupérer tous les patients actifs avec courriel, non désabonnés
    const { data: patients, error: patientsError } = await supabase
      .from('patients')
      .select('id, nom, courriel')
      .eq('actif', true)
      .eq('desabonne', false)
      .not('courriel', 'is', null)

    if (patientsError) throw patientsError

    let nb_envoyes = 0
    let nb_erreurs = 0
    const logs = []

    // Envoyer par batch
    for (let i = 0; i < patients.length; i += BATCH_SIZE) {
      const batch = patients.slice(i, i + BATCH_SIZE)

      for (const patient of batch) {
        // Personnaliser le message avec le nom du patient
        const prenom = patient.nom.split(' ')[0] // Premier mot comme prénom approximatif
        const html_perso = message_html
          .replace(/{{nom}}/g, patient.nom)
          .replace(/{{prenom}}/g, prenom)
          // Lien de désabonnement obligatoire (Loi 25)
          + `
          <div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;font-size:12px;color:#999;text-align:center;">
            <p>Vous recevez ce courriel car vous êtes patient de la clinique du Dr Serge Chaussé.</p>
            <p><a href="https://www.dentiste.com/desabonnement?email=${encodeURIComponent(patient.courriel)}" style="color:#999;">Me désabonner</a></p>
          </div>`

        try {
          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: FROM_EMAIL,
              to: patient.courriel,
              subject: sujet,
              html: html_perso,
              text: message_texte || undefined
            })
          })

          if (res.ok) {
            nb_envoyes++
            logs.push({ envoi_id: envoi.id, patient_id: patient.id, courriel: patient.courriel, statut: 'envoye' })
          } else {
            const err = await res.json()
            nb_erreurs++
            logs.push({ envoi_id: envoi.id, patient_id: patient.id, courriel: patient.courriel, statut: 'erreur', erreur: err.message || 'Erreur Resend' })
          }
        } catch (e) {
          nb_erreurs++
          logs.push({ envoi_id: envoi.id, patient_id: patient.id, courriel: patient.courriel, statut: 'erreur', erreur: e.message })
        }
      }

      // Insérer les logs du batch dans Supabase
      if (logs.length > 0) {
        await supabase.from('envois_log').insert(logs.splice(0, logs.length))
      }

      // Pause entre les batches (sauf le dernier)
      if (i + BATCH_SIZE < patients.length) {
        await new Promise(r => setTimeout(r, DELAY_MS))
      }
    }

    // Mettre à jour le statut de l'envoi
    await supabase
      .from('envois')
      .update({ nb_envoyes, nb_erreurs, statut: 'termine' })
      .eq('id', envoi.id)

    return NextResponse.json({
      success: true,
      envoi_id: envoi.id,
      nb_envoyes,
      nb_erreurs,
      total: patients.length
    })

  } catch (error) {
    console.error('Erreur send-mass:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
