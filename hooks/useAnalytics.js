// hooks/useAnalytics.js
// Usage: const { track } = useAnalytics()
//        track('click_phone', '514-521-4141')

import { usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Génère ou récupère un session_id anonyme (persiste le temps de la session)
function getSessionId() {
  if (typeof window === 'undefined') return null
  let sid = sessionStorage.getItem('_dsid')
  if (!sid) {
    sid = crypto.randomUUID()
    sessionStorage.setItem('_dsid', sid)
  }
  return sid
}

export function useAnalytics() {
  const pathname = usePathname()

  const track = useCallback(async (eventType, label = null) => {
    try {
      await supabase.from('analytics_events').insert({
        event_type:  eventType,
        label:       label,
        page:        pathname,
        referrer:    typeof document !== 'undefined' ? document.referrer || null : null,
        session_id:  getSessionId(),
        user_agent:  typeof navigator !== 'undefined' ? navigator.userAgent : null,
        screen_size: typeof window !== 'undefined'
                       ? `${window.screen.width}x${window.screen.height}`
                       : null,
      })
    } catch (err) {
      // Silencieux — ne jamais bloquer l'UI pour un événement analytics
      console.warn('[analytics]', err)
    }
  }, [pathname])

  return { track }
}


// ================================================================
// Composant wrapper pour tracker les page_views automatiquement
// À placer dans app/layout.js ou un composant parent
// ================================================================
// 'use client'
// import { useEffect } from 'react'
// import { useAnalytics } from '@/hooks/useAnalytics'
//
// export function PageViewTracker() {
//   const { track } = useAnalytics()
//   useEffect(() => { track('page_view') }, [track])
//   return null
// }
