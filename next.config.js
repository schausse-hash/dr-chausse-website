/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      // ── 404 corrigés ──
      { source: '/Divers/christ/eglise.html', destination: '/', permanent: true },
      { source: '/guide-urgence-dent-cassee', destination: '/blog', permanent: true },
      { source: '/drsmile/consultation-gratuite6', destination: '/#contact', permanent: true },

      // ── Accueil ──
      { source: '/en/smile-makeover.html', destination: '/services/rehabilitation-complete', permanent: true },
      { source: '/en/complete-dental-rehabilitation.html', destination: '/services/rehabilitation-complete', permanent: true },
      { source: '/en/complete-dental-rehabilitation.html/', destination: '/services/rehabilitation-complete', permanent: true },
      { source: '/conditions-utilisations.html', destination: '/', permanent: true },
      { source: '/terms-and-conditions.html', destination: '/', permanent: true },
      { source: '/drlalancette', destination: '/apropos', permanent: true },
      { source: '/accueil.html', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/index.html/', destination: '/', permanent: true },
      { source: '/plan-du-site.html', destination: '/', permanent: true },
      { source: '/en/home.html', destination: '/', permanent: true },
      { source: '/en/site-map.html', destination: '/', permanent: true },
      { source: '/en/general-clinic.html', destination: '/', permanent: true },

      // ── À propos / Équipe ──
      { source: '/equipe.html', destination: '/apropos', permanent: true },
      { source: '/equipe/divers', destination: '/apropos', permanent: true },
      { source: '/equipe/divers/', destination: '/apropos', permanent: true },
      { source: '/drlaframboise', destination: '/apropos', permanent: true },
      { source: '/a-propos.html', destination: '/apropos', permanent: true },
      { source: '/en/about-us.html', destination: '/apropos', permanent: true },
      { source: '/en/team.html', destination: '/apropos', permanent: true },
      { source: '/enseignement-tutorat.html', destination: '/apropos', permanent: true },
      { source: '/en/teaching-tutoring.html', destination: '/apropos', permanent: true },
      { source: '/certifications-dentaires.html', destination: '/apropos', permanent: true },
      { source: '/testimony.html', destination: '/apropos', permanent: true },
      { source: '/temoignages.html', destination: '/apropos', permanent: true },

      // ── Contact / RDV ──
      { source: '/nous-joindre.html', destination: '/#contact', permanent: true },
      { source: '/prise-rendez-vous.html', destination: '/#contact', permanent: true },
      { source: '/prise-rendez-vous.html/', destination: '/#contact', permanent: true },
      { source: '/en/dental-appointment.html', destination: '/#contact', permanent: true },
      { source: '/en/contact-us.html', destination: '/#contact', permanent: true },
      { source: '/payments.html', destination: '/#contact', permanent: true },
      { source: '/paiements.html', destination: '/#contact', permanent: true },
      { source: '/financement-dentaire.html', destination: '/#contact', permanent: true },
      { source: '/en/dental-financing.html', destination: '/#contact', permanent: true },

      // ── Implants dentaires ──
      { source: '/implantdentaire1.htm', destination: '/services/implants-dentaires', permanent: true },
      { source: '/implantdentaire1.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/implantdentaire1.html/', destination: '/services/implants-dentaires', permanent: true },
      { source: '/implantdentaire2.htm', destination: '/services/implants-dentaires', permanent: true },
      { source: '/implantdentaire2.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/implantdentaire3.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/implant-dentaire.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/implants.htm', destination: '/services/implants-dentaires', permanent: true },
      { source: '/implantvideo.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/clinique-implantologie-dentaire.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/en/dental-implant.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/en/dental-implantology-clinic.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/en/nobelguide-dental-implant-surgery.html', destination: '/services/implants-dentaires', permanent: true },
      { source: '/couronnes-protheses-implant-dentaire.html', destination: '/services/implants-dentaires', permanent: true },

      // ── All-on-4 ──
      { source: '/all-on-4.html', destination: '/services/all-on-4', permanent: true },
      { source: '/en/all-on-4.html', destination: '/services/all-on-4', permanent: true },
      { source: '/implantdentaire1/implant-all-on-4.html', destination: '/services/all-on-4', permanent: true },
      { source: '/implantdentaire1/implant-all-on-4.html/', destination: '/services/all-on-4', permanent: true },
      { source: '/en/dental-zirconium-implant-bridge.html', destination: '/services/all-on-4', permanent: true },

      // ── Chirurgie osseuse / Greffes ──
      { source: '/chirurgieosseuse.html', destination: '/services/chirurgie-osseuse', permanent: true },
      { source: '/chirurgieosseuse.html/', destination: '/services/chirurgie-osseuse', permanent: true },
      { source: '/chirurgie-dentaire-osseuse.html', destination: '/services/chirurgie-osseuse', permanent: true },
      { source: '/chirurgie-implantaire-nobelguide.html', destination: '/services/chirurgie-osseuse', permanent: true },
      { source: '/greffes-osseuses-maxillaires.html', destination: '/services/chirurgie-osseuse', permanent: true },
      { source: '/en/bone-graft.html', destination: '/services/chirurgie-osseuse', permanent: true },
      { source: '/en/dental-bone-surgery.html', destination: '/services/chirurgie-osseuse', permanent: true },

      // ── Dents de sagesse ──
      { source: '/chirurgie-extraction-dents-sagesses.html', destination: '/services/chirurgie-dents-de-sagesse', permanent: true },
      { source: '/en/wisdom-teeth-extraction-surgery.html', destination: '/services/chirurgie-dents-de-sagesse', permanent: true },

      // ── Orthodontie / Invisalign ──
      { source: '/ortho.htm', destination: '/services/orthodontie-invisalign', permanent: true },
      { source: '/ortho.html', destination: '/services/orthodontie-invisalign', permanent: true },
      { source: '/ortho.html/', destination: '/services/orthodontie-invisalign', permanent: true },
      { source: '/orthodontie.html', destination: '/services/orthodontie-invisalign', permanent: true },
      { source: '/en/orthodontics.html', destination: '/services/orthodontie-invisalign', permanent: true },
      { source: '/presentation/ortho/sld017.htm', destination: '/services/orthodontie-invisalign', permanent: true },

      // ── Parodontie ──
      { source: '/parodontie.html', destination: '/services/parodontie', permanent: true },
      { source: '/en/periodontal.html', destination: '/services/parodontie', permanent: true },

      // ── Réhabilitation complète ──
      { source: '/rehabilitation-dentaire-complete.html', destination: '/services/rehabilitation-complete', permanent: true },
      { source: '/reconstruction-esthetique-dentaire.html', destination: '/services/rehabilitation-complete', permanent: true },
      { source: '/prothese-dentaire-complete.html', destination: '/services/rehabilitation-complete', permanent: true },
      { source: '/en/complete-denture-smile.html', destination: '/services/rehabilitation-complete', permanent: true },

      // ── Services généraux (pas de page dédiée) ──
      { source: '/blanchiment.html', destination: '/services', permanent: true },
      { source: '/blanchiment.html/', destination: '/services', permanent: true },
      { source: '/laser.html', destination: '/services', permanent: true },
      { source: '/laser.html/', destination: '/services', permanent: true },
      { source: '/dentisterie-laser.html', destination: '/services', permanent: true },
      { source: '/en/laser-dentistry.html', destination: '/services', permanent: true },
      { source: '/en/laser-whitening.html', destination: '/services', permanent: true },
      { source: '/couronne.html', destination: '/services', permanent: true },
      { source: '/couronne.html/', destination: '/services', permanent: true },
      { source: '/couronnes-protheses', destination: '/services', permanent: true },
      { source: '/couronnes-protheses.html', destination: '/services', permanent: true },
      { source: '/couronnes-cerec.html', destination: '/services', permanent: true },
      { source: '/couronne-pont-dentaire.html', destination: '/services', permanent: true },
      { source: '/en/cerec-crowns.html', destination: '/services', permanent: true },
      { source: '/en/crowns-dental-implant-denture.html', destination: '/services', permanent: true },
      { source: '/en/crowns-bridges.html', destination: '/services', permanent: true },
      { source: '/dentisterie-esthetique.html', destination: '/services', permanent: true },
      { source: '/en/cosmetic-dentistry.html', destination: '/services', permanent: true },
      { source: '/clinique-dentaire-generale.html', destination: '/services', permanent: true },
      { source: '/equilibration-occlusion.html', destination: '/services', permanent: true },
      { source: '/apnee-sommeil.html', destination: '/services', permanent: true },
      { source: '/en/sleep-apnea.html', destination: '/services', permanent: true },
      { source: '/en/dental-sealant.html', destination: '/services', permanent: true },

      // ── Ma Vie / Famille / Projets ──
      { source: '/famille.html', destination: '/ma-vie', permanent: true },
      { source: '/en/family.html', destination: '/ma-vie', permanent: true },
      { source: '/projets-realisations/:path*', destination: '/ma-vie', permanent: true },
      { source: '/projects-accomplishments/:path*', destination: '/ma-vie', permanent: true },
      { source: '/en/projects-accomplishments.html', destination: '/ma-vie', permanent: true },
    ]
  },
}
module.exports = nextConfig
