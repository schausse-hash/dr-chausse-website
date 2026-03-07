'use client'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Footer from './Footer'

export default function ConditionalLayout({ children }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  return (
    <>
      {!isAdmin && <Navigation />}
      {children}
      {!isAdmin && <Footer />}
    </>
  )
}
