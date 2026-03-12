'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'

export function PageViewTracker() {
  const { track } = useAnalytics()
  const pathname = usePathname()

  useEffect(() => {
    track('page_view')
  }, [pathname]) // ← clé : pathname comme dépendance
  
  return null
}
