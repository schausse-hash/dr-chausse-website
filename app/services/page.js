import Link from 'next/link'

export const metadata = {
  title: 'Services | Dr Serge Chaussé - Dentiste Montréal',
  description: 'Découvrez tous les services dentaires offerts par le Dr Serge Chaussé : implants, CEREC 3D, orthodontie, blanchiment, chirurgie osseuse et plus.',
}

const services = [
  { slug: 'implants-dentaires', emoji: '🦷', titre: 'Implants dentaires', excerpt: "Pose d'implants et réhabilitation complète incluant la technique All-on-4.", categorie: 'Chirurgie' },
  { slug: 'cerec-3d', emoji: '👑', titre: 'CEREC 3D', excerpt: 'Couronnes et restaurations en céramique en une seule visite.', categorie: 'Technologie' },
  { slug: 'orthodontie', emoji: '😊', titre: 'Orthodontie', excerpt: 'Solutions orthodontiques pour aligner vos dents à tout âge.', categorie: 'Orthodontie' },
  { slug: 'dentisterie-laser', emoji: '✨', titre: 'Dentisterie au laser', excerpt: 'Traitements précis et confortables avec le Waterlaser MD.', categorie: 'Technologie' },
  { slug: 'blanchiment', emoji: '💎', titre: 'Blanchiment dentaire', excerpt: 'Retrouvez un sourire éclatant avec nos traitements professionnels.', categorie: 'Esthétique' },
  { slug: 'chirurgie-osseuse', emoji: '🏥', titre: 'Chirurgie osseuse', excerpt: 'Greffes osseuses et élévations sinusales pour préparer les implants.', categorie: 'Chirurgie' },
  { slug: 'examen-prevention', emoji: '🩺', titre: 'Examen & Prévention', excerpt: 'Bilans complets, nettoyage professionnel et suivi personnalisé.', categorie: 'Prévention' },
  { slug: 'facettes-esthetique', emoji: '🎨', titre: 'Facettes & Esthétique', excerpt: 'Facettes en porcelaine pour un sourire naturellement parfait.', categorie: 'Esthétique' },
  { slug: 'protheses-couronnes', emoji: '🌙', titre: 'Prothèses & Couronnes', excerpt: 'Restaurations fixes ou amovibles de haute qualité.', categorie: 'Restauration' },
  { slug: 'endodontie', emoji: '🔬', titre: 'Endodontie', excerpt: 'Traitement de canal pour sauver vos dents naturelles.', categorie: 'Restauration' },
  { slug: 'parodontie', emoji: '🛡️', titre: 'Parodontie', excerpt: 'Traitement des maladies des gencives pour préserver vos dents.', categorie: 'Parodontie' },
  { slug: 'apnee-sommeil', emoji: '😴', titre: 'Apnée du sommeil', excerpt: 'Appareils buccaux sur mesure pour un meilleur sommeil.', categorie: 'Médecine du sommeil' },
]

export default function ServicesPage() {
  return (
    <main>
      {/* BANNIÈRE */}
      <div className="relative pt-20">
        <img
          src="/images/clinique-1.jpg"
          alt="Dr Chaussé en consultation"
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-dental-900/50 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <div className="section-divider mx-auto mb-4 bg-white" />
            <h1 className="font-display text-4xl md:text-5xl mb-4">Nos services</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Des soins complets pour toute la famille, avec les technologies les plus avancées
            </p>
          </div>
        </div>
      </div>

      {/* GRILLE DE SERVICES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card-hover bg-cream rounded-2xl p-6 border border-gray-100 block group transition-all hover:shadow-lg hover:border-dental-300"
              >
                <span className="text-4xl">{s.emoji}</span>
                <div className="mt-4 mb-1 text-xs font-medium text-dental-500 uppercase tracking-wider">{s.categorie}</div>
                <h3 className="font-display text-xl mb-2 group-hover:text-dental-600 transition-colors">{s.titre}</h3>
                <p className="text-warm-gray text-sm">{s.excerpt}</p>
                <div className="mt-4 text-dental-600 text-sm font-medium group-hover:underline">En savoir plus →</div>
              </Link>
            ))}
          </div>

          {/* BANDEAU PROBLÈMES */}
          <div className="bg-gradient-to-r from-dental-600 to-dental-700 rounded-3xl p-8 lg:p-12 text-white">
            <h2 className="font-display text-2xl mb-6">Je peux corriger tous ces problèmes</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                "Dents manquantes, dents trop espacées, trouble de l'occlusion",
                "Dents ébréchées, fissurées ou usées",
                "Obturations inesthétiques",
                "Dents irrémédiablement tachées ou décolorées",
                "Malposition dentaire",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-accent-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a href="/#contact" className="btn-primary bg-white text-dental-700 hover:bg-accent-400 inline-block">
              Consultation gratuite
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl text-charcoal mb-4">Prêt à transformer votre sourire?</h2>
          <p className="text-warm-gray mb-8">Prenez rendez-vous dès aujourd'hui pour une consultation gratuite.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:5145214141" className="btn-primary inline-flex items-center gap-2">
              📞 514.521.4141
            </a>
            <a href="/#contact" className="btn-outline border-dental-600 text-dental-600 hover:bg-dental-600 hover:text-white inline-block">
              Envoyer un message
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
