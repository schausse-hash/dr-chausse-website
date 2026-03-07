import Link from 'next/link'
import { notFound } from 'next/navigation'

const services = [
  {
    slug: 'implants-dentaires',
    emoji: '🦷',
    titre: 'Implants dentaires',
    excerpt: "Pose d'implants et réhabilitation complète incluant la technique All-on-4.",
    categorie: 'Chirurgie',
    contenu: [
      { titre: "Qu'est-ce qu'un implant dentaire?", texte: "Un implant est une vis en titane biocompatible insérée dans l'os de la mâchoire pour remplacer la racine d'une dent. Une couronne sur mesure est ensuite fixée sur l'implant pour un résultat esthétique et fonctionnel optimal. Le Dr Chaussé pratique la chirurgie implantaire depuis plus de 30 ans." },
      { titre: "La technique All-on-4", texte: "Cette technique révolutionnaire permet de réhabiliter une mâchoire complète avec seulement 4 implants, souvent en une seule journée. Elle est idéale pour les patients qui ont perdu plusieurs dents ou qui portent une prothèse complète." },
      { titre: "Avantages", liste: ["Solution permanente et durable (toute la vie avec un bon entretien)", "Aspect et sensation naturels", "Préserve l'os de la mâchoire", "Aucun impact sur les dents adjacentes", "Facilité d'entretien (comme vos dents naturelles)"] },
    ],
  },
  {
    slug: 'cerec-3d',
    emoji: '👑',
    titre: 'CEREC 3D',
    excerpt: 'Couronnes et restaurations en céramique en une seule visite.',
    categorie: 'Technologie',
    contenu: [
      { titre: "Comment ça fonctionne?", texte: "Une caméra numérique prend une empreinte 3D de votre dent. Le logiciel conçoit la restauration idéale, puis une fraiseuse usine la céramique en quelques minutes. La restauration est ensuite collée le jour même." },
      { titre: "Ce que l'on peut traiter", liste: ["Couronnes complètes", "Inlays et onlays", "Facettes", "Bridges (dans certains cas)"] },
      { titre: "Avantages", liste: ["Une seule visite au lieu de deux ou trois", "Pas de prothèse provisoire inconfortable", "Précision numérique supérieure", "Céramique de haute qualité, très esthétique", "Résultat le jour même"] },
    ],
  },
  {
    slug: 'orthodontie',
    emoji: '😊',
    titre: 'Orthodontie',
    excerpt: 'Solutions orthodontiques pour aligner vos dents à tout âge.',
    categorie: 'Orthodontie',
    contenu: [
      { titre: "Aligneurs transparents", texte: "Les aligneurs transparents sont des gouttières amovibles quasi-invisibles qui déplacent progressivement les dents. Idéals pour les adultes qui souhaitent corriger leur sourire discrètement." },
      { titre: "Appareils traditionnels", texte: "Les brackets métalliques ou en céramique restent une option efficace et économique pour les cas complexes, particulièrement chez les adolescents." },
      { titre: "Avantages des aligneurs", liste: ["Quasi-invisibles", "Amovibles pour manger et se brosser les dents", "Confortables (pas de fils ni de brackets)", "Consultations moins fréquentes"] },
    ],
  },
  {
    slug: 'dentisterie-laser',
    emoji: '✨',
    titre: 'Dentisterie au laser',
    excerpt: 'Traitements précis et confortables avec le Waterlaser MD.',
    categorie: 'Technologie',
    contenu: [
      { titre: "Le Waterlaser MD", texte: "Le Dr Chaussé utilise le Waterlaser MD, une technologie de pointe qui combine laser et eau pour des traitements plus précis, moins douloureux et à récupération plus rapide." },
      { titre: "Applications cliniques", liste: ["Traitements des gencives (parodontie)", "Décontamination des poches parodontales", "Chirurgie des tissus mous", "Traitement des aphtes et herpès labial", "Désensibilisation des dents", "Préparation de cavités (souvent sans anesthésie)"] },
      { titre: "Avantages", liste: ["Moins de douleur pendant et après le traitement", "Saignements réduits", "Cicatrisation plus rapide", "Moins d'anesthésie nécessaire", "Stérilisation instantanée de la zone traitée"] },
    ],
  },
  {
    slug: 'blanchiment',
    emoji: '💎',
    titre: 'Blanchiment dentaire',
    excerpt: 'Retrouvez un sourire éclatant avec nos traitements professionnels.',
    categorie: 'Esthétique',
    contenu: [
      { titre: "Blanchiment au cabinet", texte: "La procédure en cabinet utilise un gel de peroxyde d'hydrogène concentré activé par une lumière spéciale. En une séance d'environ 90 minutes, vos dents peuvent éclaircir de plusieurs teintes." },
      { titre: "Blanchiment à domicile", texte: "Des gouttières sur mesure sont fabriquées à partir d'empreintes de vos dents. Vous appliquez le gel chez vous, selon un protocole personnalisé, pendant 1 à 2 semaines." },
      { titre: "À savoir", liste: ["Résultats variables selon la nature des taches", "Certaines colorations (tétracycline) résistent au blanchiment", "Les restaurations existantes ne blanchissent pas", "Sensibilités temporaires possibles pendant le traitement"] },
    ],
  },
  {
    slug: 'chirurgie-osseuse',
    emoji: '🏥',
    titre: 'Chirurgie osseuse',
    excerpt: 'Greffes osseuses et élévations sinusales pour préparer les implants.',
    categorie: 'Chirurgie',
    contenu: [
      { titre: "Greffe osseuse", texte: "Lorsque l'os de la mâchoire est insuffisant, une greffe osseuse peut reconstruire le volume nécessaire. Le greffon peut provenir du patient lui-même, d'une banque osseuse ou de substituts synthétiques." },
      { titre: "Élévation sinusale", texte: "Pour poser des implants dans la mâchoire supérieure postérieure, il faut parfois augmenter la hauteur d'os sous le sinus maxillaire. Cette procédure est réalisée en cabinet sous anesthésie locale." },
      { titre: "Récupération", texte: "La cicatrisation de la greffe prend généralement 4 à 6 mois avant que les implants puissent être posés. Le Dr Chaussé assure un suivi rigoureux tout au long du processus." },
    ],
  },
  {
    slug: 'examen-prevention',
    emoji: '🩺',
    titre: 'Examen & Prévention',
    excerpt: 'Bilans complets, nettoyage professionnel et suivi personnalisé.',
    categorie: 'Prévention',
    contenu: [
      { titre: "L'examen complet", texte: "Un examen complet comprend une évaluation visuelle de toutes les dents et des gencives, des radiographies pour détecter ce qui n'est pas visible à l'oeil nu, et un dépistage du cancer buccal." },
      { titre: "Le nettoyage professionnel", texte: "Même avec un excellent brossage quotidien, le tartre s'accumule dans des zones difficiles d'accès. Le nettoyage professionnel est recommandé tous les 6 à 12 mois selon votre situation." },
      { titre: "Pour toute la famille", texte: "Le cabinet accueille les patients de tous âges, de la première dent du nourrisson jusqu'aux soins des aînés. Des conseils personnalisés d'hygiène buccale sont donnés à chaque visite." },
    ],
  },
  {
    slug: 'facettes-esthetique',
    emoji: '🎨',
    titre: 'Facettes & Esthétique',
    excerpt: 'Facettes en porcelaine pour un sourire naturellement parfait.',
    categorie: 'Esthétique',
    contenu: [
      { titre: "Facettes en porcelaine", texte: "Les facettes en porcelaine sont ultra-minces (0,3 à 0,5 mm) et très esthétiques. Elles reproduisent parfaitement la translucidité naturelle de l'émail et sont conçues avec la technologie CEREC 3D." },
      { titre: "Facettes en composite", texte: "Réalisées en une seule visite, les facettes en résine composite sont une option plus économique pour corriger des fissures, des espaces ou des discolorations légères." },
      { titre: "Cas idéaux pour les facettes", liste: ["Dents tachées résistant au blanchiment", "Dents légèrement mal alignées", "Dents ébréchées ou fracturées", "Espaces entre les dents (diastèmes)", "Dents trop petites ou inégales"] },
    ],
  },
  {
    slug: 'protheses-couronnes',
    emoji: '🌙',
    titre: 'Prothèses & Couronnes',
    excerpt: 'Restaurations fixes ou amovibles de haute qualité.',
    categorie: 'Restauration',
    contenu: [
      { titre: "Couronnes", texte: "Une couronne recouvre entièrement une dent endommagée pour lui redonner forme, solidité et esthétique. Elles sont indiquées après un traitement de canal, pour une dent fissurée ou très délabrée." },
      { titre: "Bridges", texte: "Un bridge est une prothèse fixe qui remplace une ou plusieurs dents manquantes en prenant appui sur les dents adjacentes. C'est une alternative aux implants lorsque ceux-ci ne sont pas possibles." },
      { titre: "Prothèses amovibles", texte: "Les prothèses partielles ou complètes amovibles sont une solution économique pour remplacer plusieurs dents manquantes. Elles sont fabriquées sur mesure pour un confort optimal." },
    ],
  },
  {
    slug: 'endodontie',
    emoji: '🔬',
    titre: 'Endodontie (traitement de canal)',
    excerpt: 'Traitement de canal pour sauver vos dents naturelles.',
    categorie: 'Restauration',
    contenu: [
      { titre: "Quand est-il nécessaire?", texte: "Un traitement de canal est indiqué lorsque la carie a atteint la pulpe de la dent, en cas d'abcès, de douleur intense ou spontanée, ou après un traumatisme dentaire." },
      { titre: "Déroulement", texte: "Sous anesthésie locale, le Dr Chaussé retire la pulpe infectée, nettoie et désinfecte les canaux radiculaires, puis les obture avec un matériau biocompatible. La dent est ensuite reconstruite avec une couronne." },
      { titre: "La douleur du traitement", texte: "Contrairement aux idées reçues, un traitement de canal bien réalisé sous anesthésie n'est pas plus douloureux qu'une extraction. C'est souvent la douleur de l'infection avant le traitement qui est intense." },
    ],
  },
  {
    slug: 'parodontie',
    emoji: '🛡️',
    titre: 'Parodontie',
    excerpt: 'Traitement des maladies des gencives pour préserver vos dents.',
    categorie: 'Parodontie',
    contenu: [
      { titre: "Les stades de la maladie", texte: "La gingivite est le stade initial, réversible avec un bon traitement. La parodontite est le stade avancé où l'os et les tissus de soutien sont détruits. Sans traitement, elle mène à la perte des dents." },
      { titre: "Traitement parodontal", texte: "Le traitement comprend un détartrage et surfaçage radiculaire en profondeur, parfois complété par une antibiothérapie ou une chirurgie parodontale. Le laser Waterlaser MD est utilisé pour désinfecter efficacement les poches parodontales." },
      { titre: "Lien avec la santé générale", texte: "Les maladies parodontales sont associées à des risques accrus de maladies cardiovasculaires, de diabète et de complications pendant la grossesse. Prendre soin de vos gencives, c'est prendre soin de votre santé globale." },
    ],
  },
  {
    slug: 'apnee-sommeil',
    emoji: '😴',
    titre: 'Apnée du sommeil',
    excerpt: "Appareils buccaux sur mesure pour un meilleur sommeil.",
    categorie: 'Médecine du sommeil',
    contenu: [
      { titre: "Rôle du dentiste", texte: "Pour les cas légers à modérés, un appareil buccal sur mesure (orthèse d'avancée mandibulaire) peut être une alternative au masque CPAP. Cet appareil maintient la mâchoire inférieure légèrement avancée pendant le sommeil." },
      { titre: "Avantages de l'orthèse", liste: ["Petit, discret et silencieux", "Facile à voyager avec", "Tolérance souvent meilleure que le CPAP", "Efficace pour les cas légers à modérés"] },
      { titre: "Diagnostic", texte: "Le diagnostic de l'apnée du sommeil doit être établi par un médecin ou un spécialiste du sommeil. Une fois confirmé, le Dr Chaussé peut fabriquer l'orthèse adaptée à votre situation." },
    ],
  },
]

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  return {
    title: `${service.titre} | Dr Serge Chaussé`,
    description: service.excerpt,
  }
}

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  return (
    <main>
      {/* BANNIÈRE */}
      <div className="relative pt-20 bg-dental-900">
        <div className="max-w-4xl mx-auto px-6 py-20 text-white text-center">
          <div className="text-6xl mb-6">{service.emoji}</div>
          <div className="text-dental-300 text-sm font-medium uppercase tracking-widest mb-3">{service.categorie}</div>
          <h1 className="font-display text-4xl md:text-5xl mb-4">{service.titre}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{service.excerpt}</p>
        </div>
      </div>

      {/* CONTENU */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">

          {/* Retour */}
          <Link href="/services" className="inline-flex items-center gap-2 text-dental-600 hover:underline mb-12 text-sm">
            ← Tous les services
          </Link>

          {/* Sections de contenu */}
          <div className="space-y-10">
            {service.contenu.map((section, i) => (
              <div key={i}>
                <h2 className="font-display text-2xl text-charcoal mb-3">{section.titre}</h2>
                {section.texte && (
                  <p className="text-warm-gray leading-relaxed">{section.texte}</p>
                )}
                {section.liste && (
                  <ul className="space-y-2 mt-2">
                    {section.liste.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-warm-gray">
                        <span className="text-dental-500 mt-1 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-cream rounded-3xl p-8 text-center">
            <h3 className="font-display text-2xl text-charcoal mb-3">Vous avez des questions?</h3>
            <p className="text-warm-gray mb-6">Contactez-nous pour une consultation gratuite.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:5145214141" className="btn-primary inline-flex items-center gap-2">
                📞 514.521.4141
              </a>
              <a href="/#contact" className="btn-outline border-dental-600 text-dental-600 hover:bg-dental-600 hover:text-white inline-block">
                Envoyer un message
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
