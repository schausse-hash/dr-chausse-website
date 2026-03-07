export const metadata = {
  title: 'Services | Dr Serge Chaussé - Dentiste Montréal',
  description: 'Découvrez tous les services dentaires offerts par le Dr Serge Chaussé : implants, CEREC 3D, orthodontie, blanchiment, chirurgie osseuse et plus.',
}

const services = [
  { emoji: '🦷', titre: 'Implants dentaires', desc: "Pose d'implants et réhabilitation complète incluant la technique All-on-4. Solution permanente pour remplacer les dents manquantes." },
  { emoji: '👑', titre: 'CEREC 3D', desc: "Couronnes et restaurations en céramique en une seule visite. Technologie numérique de pointe pour des résultats précis et naturels." },
  { emoji: '😊', titre: 'Orthodontie', desc: "Solutions orthodontiques pour aligner vos dents à tout âge. Appareils traditionnels et aligneurs transparents disponibles." },
  { emoji: '✨', titre: 'Dentisterie au laser', desc: "Traitements précis et confortables avec le Waterlaser MD. Moins de douleur, récupération plus rapide." },
  { emoji: '💎', titre: 'Blanchiment', desc: "Retrouvez un sourire éclatant avec nos traitements professionnels. Résultats visibles dès la première séance." },
  { emoji: '🏥', titre: 'Chirurgie osseuse', desc: "Greffes osseuses et élévations sinusales pour préparer les implants. Expertise reconnue internationalement." },
  { emoji: '🩺', titre: 'Examen & Prévention', desc: "Bilans complets, nettoyage professionnel et suivi personnalisé pour toute la famille. La prévention avant tout." },
  { emoji: '🎨', titre: 'Facettes & Esthétique', desc: "Facettes en porcelaine et résine pour un sourire naturellement parfait. Transformez votre sourire en une ou deux visites." },
  { emoji: '🌙', titre: 'Prothèses & Couronnes', desc: "Restaurations fixes ou amovibles adaptées à votre situation. Matériaux de haute qualité pour un confort optimal." },
  { emoji: '🔬', titre: 'Endodontie', desc: "Traitement de canal pour sauver vos dents naturelles. Procédure confortable grâce aux techniques modernes." },
  { emoji: '🛡️', titre: 'Parodontie', desc: "Traitement des maladies des gencives pour préserver vos dents. Soins complets pour la santé de vos tissus." },
  { emoji: '😴', titre: 'Apnée du sommeil', desc: "Appareils buccaux sur mesure pour traiter l'apnée du sommeil légère à modérée. Dormez mieux, vivez mieux." },
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
            {services.map((s, i) => (
              <div key={i} className="card-hover bg-cream rounded-2xl p-6 border border-gray-100">
                <span className="text-4xl">{s.emoji}</span>
                <h3 className="font-display text-xl mt-4 mb-2">{s.titre}</h3>
                <p className="text-warm-gray text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* BANDEAU PROBLÈMES */}
          <div className="bg-gradient-to-r from-dental-600 to-dental-700 rounded-3xl p-8 lg:p-12 text-white">
            <h2 className="font-display text-2xl mb-6">Je peux corriger tous ces problèmes « permanents »</h2>
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
