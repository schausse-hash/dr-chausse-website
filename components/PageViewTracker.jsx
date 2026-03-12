'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function getSessionId() {
  if (typeof window === 'undefined') return null
  let sid = sessionStorage.getItem('_dsid')
  if (!sid) { sid = crypto.randomUUID(); sessionStorage.setItem('_dsid', sid) }
  return sid
}

export function PageViewTracker() {
  const pathname = usePathname()
  const lastTracked = useRef(null)

  useEffect(() => {
    if (!pathname || pathname === lastTracked.current) return
    lastTracked.current = pathname
    supabase.from('analytics_events').insert({
      event_type: 'page_view',
      page: pathname,
      session_id: getSessionId(),
      referrer: document.referrer || null,
    })
  }, [pathname])

  return null
}
