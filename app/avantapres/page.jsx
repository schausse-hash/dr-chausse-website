'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Star, ExternalLink, Phone } from 'lucide-react'
import Link from 'next/link'

const cas = [
  {
    titre: 'Réhabilitation tout céramique',
    desc: 'Un bel exemple d\'une réhabilitation complète en zirconium et céramique',
    photo: null,
  },
  {
    titre: 'Réhabilitation All-On-Four',
    desc: '« Ma vie a changée! »',
    photo: null,
  },
]

export default function AvantApresPage() {
  const { track } = useAnalytics()

  useEffect(() => {
    track('page_view', '/avantapres')
  }, [])

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-white">Ce que disent mes patients</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
              Avant / Après & Témoignages
            </h1>
            <p className="text-white/70 text-lg">
              Des transformations réelles. Des sourires qui parlent d'eux-mêmes.
            </p>
          </div>
        </div>
      </section>

      {/* ── AVIS INDÉPENDANTS ────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="section-divider mx-auto mb-4" />
          <h2 className="font-display text-3xl text-charcoal mb-3">Avis de mes patients</h2>
          <p className="text-warm-gray max-w-2xl mx-auto mb-8">
            Conformément au code des professions, nous vous invitons à consulter
            les avis authentiques sur des sites indépendants.
          </p>
          <a href="https://www.ratemds.com/doctor-ratings/875036/Dr-Serge-Chausse-Montreal-QC.html/"
            target="_blank" rel="noopener noreferrer"
            onClick={() => track('click_site_externe', 'ratemds')}
            className="btn-primary inline-flex items-center gap-2">
            <Star className="w-5 h-5" /> Voir les avis sur RateMDs <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ── CAS CLINIQUES AVANT/APRÈS ────────────────────────────── */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="font-display text-3xl text-charcoal mb-3">Cas cliniques</h2>
            <p className="text-warm-gray">Des transformations réalisées dans nos cliniques</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {cas.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                {/* Zone photo */}
                {c.photo ? (
                  <img src={c.photo} alt={c.titre} className="w-full h-64 object-cover" />
                ) : (
                  <div className="bg-dental-50 h-64 flex flex-col items-center justify-center gap-3 border-b border-dental-100">
                    <span className="text-4xl">🦷</span>
                    <span className="text-dental-400 text-sm font-medium">Photos avant/après à ajouter</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal mb-2">{c.titre}</h3>
                  <p className="text-warm-gray text-sm">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="font-display text-2xl text-charcoal mb-3">
            Votre sourire pourrait être le prochain!
          </p>
          <p className="text-warm-gray mb-8">Une consultation gratuite vous enchantera.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#contact"
              onClick={() => track('click_rdv', 'avantapres-cta')}
              className="btn-primary">
              Prendre rendez-vous
            </Link>
            <a href="tel:5145214141"
              onClick={() => track('click_phone', '514-521-4141')}
              className="btn-outline border-dental-600 text-dental-600 hover:bg-dental-600 hover:text-white inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> 514.521.4141
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
