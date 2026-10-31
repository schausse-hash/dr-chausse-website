import { Resend } from 'resend'
import { CLINIQUES } from '@/lib/cliniques'

const resend = new Resend(process.env.RESEND_API_KEY)

// Courriel de destination de chaque clinique (variables d'environnement Vercel)
const COURRIELS = {
  'st-joseph': process.env.CONTACT_EMAIL_ST_JOSEPH,
  'st-luc': process.env.CONTACT_EMAIL_ST_LUC,
  'rosemont': process.env.CONTACT_EMAIL_ROSEMONT,
  'bedard-couture': process.env.CONTACT_EMAIL_BEDARD_COUTURE,
}
// Le Dr Chaussé reçoit une copie de chaque message
const COPIE = process.env.CONTACT_EMAIL_CC

export async function POST(req) {
  const { prenom, nom, email, telephone, clinique, sujet, message } = await req.json()

  const cliniqueChoisie = CLINIQUES.find(c => c.cle === clinique)
  if (!cliniqueChoisie) {
    return Response.json({ ok: false, error: 'Clinique inconnue' }, { status: 400 })
  }
  const destinataire = COURRIELS[clinique]
  if (!destinataire) {
    console.error(`Courriel de destination manquant pour la clinique « ${clinique} »`)
    return Response.json({ ok: false }, { status: 500 })
  }
  // Sans copie, le message part quand même à la clinique
  if (!COPIE) {
    console.error('CONTACT_EMAIL_CC manquant : message envoyé sans copie au Dr Chaussé')
  }

  try {
    // Resend ne lève pas d'exception en cas d'échec : il renvoie { error }
    const { error } = await resend.emails.send({
      from: 'Dr Chaussé <schausse@dentiste.com>',
      to: destinataire,
      cc: COPIE,
      subject: `Nouveau message — ${sujet || 'Sans sujet'}`,
      html: `
        <h2>Nouveau message du site web</h2>
        <p><strong>Nom:</strong> ${prenom} ${nom}</p>
        <p><strong>Courriel:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${telephone || '—'}</p>
        <p><strong>Clinique:</strong> ${cliniqueChoisie.nom}</p>
        <p><strong>Sujet:</strong> ${sujet || '—'}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    })
    if (error) {
      console.error(`Échec de l'envoi Resend (clinique « ${clinique} ») :`, error)
      return Response.json({ ok: false }, { status: 500 })
    }
    return Response.json({ ok: true })
  } catch (error) {
    console.error(`Échec de l'envoi Resend (clinique « ${clinique} ») :`, error)
    return Response.json({ ok: false }, { status: 500 })
  }
}
