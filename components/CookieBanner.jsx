'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Cookie, X, Check } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Vérifier si le choix a déjà été fait
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Afficher après 1 seconde
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    // Activer Google Analytics si accepté
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
      })
    }
  }

  const handleRefuse = () => {
    localStorage.setItem('cookie-consent', 'refused')
    setVisible(false)
    // Désactiver Google Analytics si refusé
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      })
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-charcoal text-white rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        
        {/* Icône + Texte */}
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 bg-dental-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold mb-1">🍪 Ce site utilise des témoins (cookies)</p>
            <p className="text-white/70 text-sm leading-relaxed">
              Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience. 
              Vos données restent anonymes et ne sont jamais vendues.{' '}
              <Link href="/confidentialite" className="text-accent-400 hover:underline">
                Politique de confidentialité
              </Link>
            </p>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={handleRefuse}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors text-sm"
          >
            <X className="w-4 h-4" /> Refuser
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-dental-600 hover:bg-dental-500 text-white transition-colors text-sm font-medium"
          >
            <Check className="w-4 h-4" /> Accepter
          </button>
        </div>

      </div>
    </div>
  )
}
