import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { prenom, nom, email, telephone, sujet, message } = await req.json()

  try {
    await resend.emails.send({
      from: 'Dr Chaussé <schausse@dentiste.com>',
      to: 'info@cliniquedentaireboulevardsaintjoseph.ca',
      subject: `Nouveau message — ${sujet || 'Sans sujet'}`,
      html: `
        <h2>Nouveau message du site web</h2>
        <p><strong>Nom:</strong> ${prenom} ${nom}</p>
        <p><strong>Courriel:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${telephone || '—'}</p>
        <p><strong>Sujet:</strong> ${sujet || '—'}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      reply_to: email,
    })
    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ ok: false }, { status: 500 })
  }
}
