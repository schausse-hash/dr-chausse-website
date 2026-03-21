// app/api/desabonnement/route.js
// Lien de désabonnement (Loi 25 Québec) — public, sans auth
// Accès : GET /api/desabonnement?email=xxx@xxx.com

import { createClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email manquant' }, { status: 400 })
  }

  try {
    const supabase = createClient()

    const { error } = await supabase
      .from('patients')
      .update({ desabonne: true })
      .eq('courriel', email.toLowerCase())

    if (error) throw error

    // Rediriger vers une page de confirmation
    return NextResponse.redirect(new URL('/desabonnement-confirme', request.url))

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
