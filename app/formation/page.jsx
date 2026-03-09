'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useAnalytics } from '@/hooks/useAnalytics'
import {
  GraduationCap, Users, Globe, Calendar,
  Phone, ExternalLink, CheckCircle2, Award, Star
} from 'lucide-react'

export default function FormationPage() {
  const { track } = useAnalytics()

  useEffect(() => {
    track('page_view', '/formation')
  }, [])

  return (
    <main>

      {/* ── HERO COMPACT ─────────────────────────────────────────── */}
      <section className="bg-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #3a9e8e 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent-500/20 text-accent-400 px-4 py-2 rounded-full text-sm mb-6">
              <GraduationCap className="w-4 h-4" /> Formateur depuis 2007
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
              Enseignement & Tutorat
            </h1>
            <p className="text-white/70 text-lg">
              Formation internationale en implantologie et chirurgie complexe.
              Plus de 17 ans d'expérience comme formateur.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION PRINCIPALE ───────────────────────────────────── */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Contenu */}
            <div className="space-y-6">
              <p className="text-xl text-white/80">
                J'offre des cours « hands-on » en chirurgie complexe, greffe osseuse,
                élévation sinusale, implant dentaire (partie chirurgicale ou prothétique).
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border border-white/10">
                  <Users className="w-6 h-6 text-accent-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Formation personnalisée</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      En compagnie de vos patients et de votre personnel, je vous guide
                      vers l'autonomie en réhabilitation complexe sur implant.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border border-white/10">
                  <Globe className="w-6 h-6 text-accent-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Clinicien international — Trinon (Allemagne)</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Clinicien en chirurgie osseuse et implantologie depuis 2007.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border border-white/10">
                  <Calendar className="w-6 h-6 text-accent-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Cours en République Dominicaine</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      5 jours intensifs de chirurgies sur patients.
                      Sessions en février et décembre chaque année.
                    </p>
                    <a href="https://www.implantologycourses.com/" target="_blank" rel="noopener noreferrer"
                      onClick={() => track('click_site_externe', 'implantologycourses.com')}
                      className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 text-sm mt-2 transition-colors">
                      implantologycourses.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <a href="tel:5145214141"
                onClick={() => track('click_phone', '514-521-4141')}
                className="btn-primary bg-accent-500 text-charcoal hover:bg-accent-400 inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> 514.521.4141
              </a>
            </div>

            {/* Image */}
            <div>
              <img src="/images/clinique-2.jpg" alt="Dr Chaussé en formation"
                className="rounded-2xl shadow-2xl w-full" />
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { val: '17+', label: 'Ans formateur' },
              { val: '2000+', label: 'Heures de formation' },
              { val: '350h', label: 'Chirurgie Maxicourse' },
              { val: '2×/an', label: 'Sessions République Dom.' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-4xl text-accent-400 mb-2">{s.val}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS PERTINENTES ───────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-divider mx-auto mb-4" />
            <h2 className="font-display text-3xl text-charcoal mb-3">Formations spécialisées</h2>
            <p className="text-warm-gray">Éducation continue — plus de 2000 heures</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "All-on-4 du Dr Paulo Malo",
              "Chirurgie implantaire Maxicourse Toronto (350h)",
              "Chirurgie osseuse California Implant Institute",
              "Élévation sinusale Dr Al Farage Vancouver",
              "Manipulation tissus mous",
              "Pacific Training Institute for Facial Aesthetics & Therapeutics",
              "Prosthodontie Institut Dr Yvan Poitras",
              "CEREC 3D par Dr Marc Morin",
              "Orthodontie IAO",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-dental-500 shrink-0" />
                <span className="text-sm text-charcoal">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl mb-3">Intéressé par une formation?</h2>
          <p className="text-white/60 mb-8">
            Contactez-moi pour discuter d'un programme adapté à vos besoins.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#contact"
              onClick={() => track('click_rdv', 'formation-cta')}
              className="btn-primary bg-accent-500 text-charcoal hover:bg-accent-400">
              Envoyer un message
            </Link>
            <a href="tel:5145214141"
              onClick={() => track('click_phone', '514-521-4141')}
              className="btn-outline border-white/40 text-white hover:border-white inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> 514.521.4141
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
