'use client'
import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function BlogTracker() {
  const { track } = useAnalytics()
  useEffect(() => { track('page_view') }, [track])
  return null
}
