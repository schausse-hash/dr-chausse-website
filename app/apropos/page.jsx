'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAnalytics } from '@/hooks/useAnalytics'
import {
  Award,           // ← manquant!
  GraduationCap, CheckCircle2,
  Heart, Sparkles, Shield, Star, Phone
} from 'lucide-react'

const formations = [
  "All-on-4 du Dr Paulo Malo", "Orthodontie IAO", "Prosthodontie Institut Dr Yvan Poitras",
  "Chirurgie implantaire Maxicourse Toronto (350h)", "Chirurgie osseuse California Implant Institute",
  "CEREC 3D par Dr Marc Morin", "Pacific Training Institute for Facial Aesthetics & Therapeutics",
  "Manipulation tissus mous", "Élévation sinusale Dr Al Farage Vancouver",
]

export default function AProposPage() {
  const { track } = useAnalytics()

  // Track page view
  useEffect(() => {
    track('page_view', '/apropos')
  }, [])

  return (
    <main>

     {/* ── HERO COMPACT — desktop seulement ── */}
<section className="hidden lg:block hero-gradient py-20 relative overflow-hidden">
  <div className="absolute inset-0 bg-black/20" />
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 mb-6">
        <Award className="w-4 h-4 text-accent-400" />
        <span className="text-sm text-white">Plus de 42 ans d'expérience</span>
      </div>
      <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
        À propos du Dr Chaussé
      </h1>
      <p className="text-white/70 text-lg">
        Dentiste, formateur et passionné par l'excellence en soins dentaires depuis 1984.
      </p>
    </div>
  </div>
</section>

{/* ── HERO MOBILE seulement ── */}
<section className="lg:hidden hero-gradient pt-24 pb-6 relative overflow-hidden">
  <div className="absolute inset-0 bg-black/20" />
  <div className="max-w-7xl mx-auto px-6 relative z-10">
  </div>
</section>

      {/* ── PORTRAIT + BIO ───────────────────────────────────────── */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Vidéo — visible partout */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden shadow-xl aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed/k649xMCcHLo"
            title="Dr Serge Chaussé — Clinique d'implant dentaire"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            style={{ minHeight: '320px' }}
          />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-dental-600 text-white rounded-xl p-5 shadow-lg hidden md:block">
          <p className="font-display text-lg">Dr Serge Chaussé</p>
          <p className="text-white/70 text-sm">DMD, Université de Montréal</p>
        </div>
      </div>

      {/* Texte */}
      <div className="space-y-6">
        <div className="section-divider" />
        <h2 className="font-display text-4xl lg:text-5xl text-charcoal">Dr Serge Chaussé</h2>
        <p className="text-lg text-warm-gray">
          Depuis 1984, je suis une référence en soins de dentisterie à Montréal.
          Mes patients de tous âges apprécient mon professionnalisme, ma délicatesse
          ainsi que l'efficacité de mes soins.
        </p>
        <p className="text-lg text-warm-gray">
          <strong className="text-charcoal">
            Ce ne sont pas 32 dents que je traite, c'est votre personne qui m'importe.
          </strong>{' '}
          Mes 42 années d'existence sont basées sur l'honnêteté, l'intégrité et la qualité de mes soins.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
          <div className="text-center">
            <div className="font-display text-3xl text-dental-600">42+</div>
            <div className="text-xs text-warm-gray mt-1">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl text-dental-600">2000+</div>
            <div className="text-xs text-warm-gray mt-1">Heures de formation</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl text-dental-600">17+</div>
            <div className="text-xs text-warm-gray mt-1">Années formateur</div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Heart,         text: 'Approche humaine' },
            { icon: Sparkles,      text: 'Technologies de pointe' },
            { icon: Shield,        text: 'Intégrité & Qualité' },
            { icon: GraduationCap, text: 'Formateur hands on' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-dental-600" />
              </div>
              <span className="text-charcoal">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a href="tel:5145214141"
          onClick={() => track('click_phone', '514-521-4141')}
          className="inline-flex items-center gap-2 btn-primary mt-2">
          <Phone className="w-4 h-4" /> 514.521.4141
        </a>
      </div>

    </div>
  </div>
</section>
      {/* ── FORMATION ACADÉMIQUE ─────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="font-display text-4xl text-charcoal mb-3">Formation & Certifications</h2>
            <p className="text-warm-gray text-lg">Plus de 2000 heures d'éducation continue</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">

            {/* Académique */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <GraduationCap className="w-12 h-12 text-dental-600 mb-4" />
              <h3 className="font-display text-2xl mb-5">Formation académique</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dental-500 mt-0.5 shrink-0" />
                  <span><strong>Certificat en chimie</strong> — Université de Montréal (1979)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dental-500 mt-0.5 shrink-0" />
                  <span><strong>Doctorat en médecine dentaire</strong> — Université de Montréal (1984)</span>
                </li>
              </ul>
            </div>

            {/* En cours */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <Award className="w-12 h-12 text-accent-500 mb-4" />
              <h3 className="font-display text-2xl mb-5">Certifications en cours</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                  <span><strong>Fellow AAID</strong> — American Academy of Implant Dentistry</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-accent-500 mt-0.5 shrink-0" />
                  <span><strong>Diplomate ABOI</strong> — American Board of Oral Implantology</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Éducation continue */}
          <div className="bg-dental-600 text-white p-8 rounded-2xl">
            <h3 className="font-display text-2xl mb-6 text-center">Éducation continue (2000+ heures)</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formations.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 text-accent-400 shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-display text-2xl text-charcoal mb-3">
            « Votre sourire est souvent le reflet de votre personnalité. Prenez-en soin. »
          </p>
          <p className="text-warm-gray mb-8">Une consultation gratuite vous enchantera!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#contact"
              onClick={() => track('click_rdv', 'apropos-cta')}
              className="btn-primary">
              Prendre rendez-vous
            </Link>
            <a href="tel:5145214141"
              onClick={() => track('click_phone', '514-521-4141')}
              className="btn-outline border-dental-600 text-dental-600 hover:bg-dental-600 hover:text-white">
              <Phone className="w-4 h-4 inline mr-2" />514.521.4141
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
