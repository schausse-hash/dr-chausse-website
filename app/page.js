'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Phone, Mail, MapPin, Clock, Award, GraduationCap,
  CheckCircle2, Users, Calendar, Globe,
  Heart, Sparkles, Shield, Star, ChevronDown, ExternalLink
} from 'lucide-react'

// HERO
function Hero() {
  return (
    <section id="accueil" className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-accent-400" />
              <span className="text-sm">Plus de 40 ans d'expérience</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              Votre sourire,<br /><span className="text-accent-400">mon expertise</span>
            </h1>
            <p className="text-xl text-white/80 max-w-lg">
              Dentiste et formateur international en implantologie. 
              Il suffit d'un petit rien pour transformer votre sourire.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary bg-white text-dental-700 hover:bg-accent-400 hover:text-charcoal">
                Prendre rendez-vous
              </a>
              <a href="#apropos" className="btn-outline border-white text-white hover:bg-white hover:text-dental-700">
                En savoir plus
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div><div className="font-display text-3xl text-accent-400">40+</div><div className="text-sm text-white/60">Années d'expérience</div></div>
              <div><div className="font-display text-3xl text-accent-400">2000+</div><div className="text-sm text-white/60">Heures de formation</div></div>
              <div><div className="font-display text-3xl text-accent-400">17+</div><div className="text-sm text-white/60">Ans formateur</div></div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <img src="/images/portrait-principal.jpg" alt="Dr Serge Chaussé" 
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto" />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                <p className="text-dental-600 font-semibold">Dr Serge Chaussé</p>
                <p className="text-sm text-gray-500">DMD, Université de Montréal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/50" />
      </div>
    </section>
  )
}

// À PROPOS
function About() {
  return (
    <section id="apropos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="/images/portrait-principal.jpg" alt="Dr Serge Chaussé" className="rounded-2xl shadow-xl w-full" />
          </div>
          <div className="space-y-6">
            <div className="section-divider" />
            <h2 className="font-display text-4xl lg:text-5xl text-charcoal">Dr Serge Chaussé</h2>
            <p className="text-lg text-warm-gray">
              Depuis 1984, je suis une référence en soins de dentisterie à Montréal. 
              Mes patients de tous âges apprécient mon professionnalisme, ma délicatesse 
              ainsi que l'efficacité de mes soins.
            </p>
            <p className="text-lg text-warm-gray">
              <strong className="text-charcoal">Ce ne sont pas 32 dents que je traite, c'est votre personne qui m'importe.</strong>{' '}
              Mes 42 années d'existence sont basées sur l'honnêteté, l'intégrité et la qualité de mes soins.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Heart, text: 'Approche humaine' },
                { icon: Sparkles, text: 'Technologies de pointe' },
                { icon: Shield, text: 'Intégrité & Qualité' },
                { icon: GraduationCap, text: 'Formateur international' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-dental-600" />
                  </div>
                  <span className="text-charcoal">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// CERTIFICATIONS
function Certifications() {
  const formations = [
    "All-on-4 du Dr Paulo Malo", "Orthodontie IAO", "Prosthodontie Institut Dr Yvan Poitras",
    "Chirurgie implantaire Maxicourse Toronto (350h)", "Chirurgie osseuse California Implant Institute",
    "CEREC 3D par Dr Marc Morin", "Pacific Training Institute for Facial Aesthetics & Therapeutics",
    "Manipulation tissus mous", "Élévation sinusale Dr Al Farage Vancouver",
  ]
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl text-charcoal mb-4">Formation & Certifications</h2>
          <p className="text-warm-gray text-lg">Plus de 2000 heures d'éducation continue</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <GraduationCap className="w-12 h-12 text-dental-600 mb-4" />
            <h3 className="font-display text-2xl mb-4">Formation académique</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-dental-500 mt-0.5" />
                <span><strong>Certificat en chimie</strong> - Université de Montréal (1979)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-dental-500 mt-0.5" />
                <span><strong>Doctorat en médecine dentaire</strong> - Université de Montréal (1984)</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <Award className="w-12 h-12 text-accent-500 mb-4" />
            <h3 className="font-display text-2xl mb-4">En cours</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-accent-500 mt-0.5" />
                <span><strong>Fellow AAIO</strong> - American Academy of Implant Orthodontics</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-accent-500 mt-0.5" />
                <span><strong>Diplomate ABOI</strong> - American Board of Oral Implantology</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-dental-600 text-white p-8 rounded-2xl">
          <h3 className="font-display text-2xl mb-6 text-center">Éducation continue (2000+ heures)</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formations.map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// SERVICES
function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl text-charcoal mb-4">Services cliniques</h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">Technologies de pointe maîtrisées pour des résultats optimaux</p>
        </div>
        <div className="mb-16">
          <img src="/images/clinique-1.jpg" alt="Dr Chaussé en consultation" className="w-full h-80 object-cover rounded-2xl shadow-lg" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { emoji: '🦷', titre: 'Implants dentaires', desc: "Pose d'implants et réhabilitation complète incluant la technique All-on-4" },
            { emoji: '👑', titre: 'CEREC 3D', desc: "Couronnes et restaurations en céramique en une seule visite" },
            { emoji: '😊', titre: 'Orthodontie', desc: "Solutions orthodontiques pour aligner vos dents à tout âge" },
            { emoji: '✨', titre: 'Dentisterie au laser', desc: "Traitements précis et confortables avec le Waterlaser MD" },
            { emoji: '💎', titre: 'Blanchiment', desc: "Retrouvez un sourire éclatant avec nos traitements professionnels" },
            { emoji: '🏥', titre: 'Chirurgie osseuse', desc: "Greffes osseuses et élévations sinusales pour préparer les implants" },
          ].map((s, i) => (
            <div key={i} className="card-hover bg-cream rounded-2xl p-6 border border-gray-100">
              <span className="text-4xl">{s.emoji}</span>
              <h3 className="font-display text-xl mt-4 mb-2">{s.titre}</h3>
              <p className="text-warm-gray text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-dental-600 to-dental-700 rounded-3xl p-8 lg:p-12 text-white">
          <h3 className="font-display text-2xl mb-6">Je peux corriger tous ces problèmes « permanents »</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Dents manquantes, dents trop espacées, trouble de l'occlusion",
              "Dents ébréchées, fissurées ou usées",
              "Obturations inesthétiques",
              "Dents irrémédiablement tachées ou décolorées",
              "Malposition dentaire",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="#contact" className="btn-primary bg-white text-dental-700 hover:bg-accent-400">
              Consultation gratuite
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// FORMATION
function Formation() {
  return (
    <section id="formation" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-accent-500/20 text-accent-400 px-4 py-2 rounded-full text-sm">
              <GraduationCap className="w-4 h-4" /> Formateur depuis 2007
            </div>
            <h2 className="font-display text-4xl lg:text-5xl">Enseignement & Tutorat</h2>
            <p className="text-xl text-white/80">
              J'offre des cours « hands-on » en chirurgie complexe, greffe osseuse, 
              élévation sinusale, implant dentaire (partie chirurgicale ou prothétique).
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl">
                <Users className="w-6 h-6 text-accent-400 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Formation personnalisée</h4>
                  <p className="text-white/70 text-sm">En compagnie de vos patients et de votre personnel, je vous guide vers l'autonomie en réhabilitation complexe sur implant.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl">
                <Globe className="w-6 h-6 text-accent-400 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Clinicien international - Trinon (Allemagne)</h4>
                  <p className="text-white/70 text-sm">Clinicien en chirurgie osseuse et implantologie depuis 2007.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 p-4 rounded-xl">
                <Calendar className="w-6 h-6 text-accent-400 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Cours en République Dominicaine</h4>
                  <p className="text-white/70 text-sm">5 jours intensifs de chirurgies sur patients. Sessions en février et décembre chaque année.</p>
                  <a href="https://www.implantologycourses.com/" target="_blank" rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 text-sm mt-2">
                    implantologycourses.com <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
            <a href="tel:5145214141" className="btn-primary bg-accent-500 text-charcoal hover:bg-accent-400 inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> 514.521.4141
            </a>
          </div>
          <div>
            <img src="/images/clinique-2.jpg" alt="Dr Chaussé en formation" className="rounded-2xl shadow-2xl w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

// EMPLACEMENTS
function Emplacements() {
  const bureaux = [
    {
      nom: "Clinique dentaire Boulevard St-Joseph", ville: "Montréal (Plateau Mont-Royal)",
      adresse: "1277 Bd Saint-Joseph E, Montréal, QC H2J 1L9", tel: "514-521-4141",
      site: "cliniquedentaireboulevardsaintjoseph.ca",
      horaires: [
        { jour: "Lundi", heures: "8:30 - 16:00" }, { jour: "Mardi", heures: "7:30 - 17:00" },
        { jour: "Mercredi", heures: "7:30 - 18:30" }, { jour: "Jeudi", heures: "7:30 - 17:00" },
        { jour: "Vendredi", heures: "8:00 - 16:00" }, { jour: "Sam-Dim", heures: "Fermé" },
      ],
    },
    {
      nom: "Centre Dentaire St-Luc", ville: "Saint-Jean-sur-Richelieu",
      adresse: "413 Boul. Saint-Luc, Saint-Jean-sur-Richelieu, QC J2W 2A3", tel: "579 700-0915",
      site: "centredentairest-luc.com",
      horaires: [
        { jour: "Lundi", heures: "9:00 - 20:00" }, { jour: "Mardi", heures: "9:00 - 20:00" },
        { jour: "Mercredi", heures: "9:00 - 20:00" }, { jour: "Jeudi", heures: "9:00 - 20:00" },
        { jour: "Vendredi", heures: "8:00 - 16:00" }, { jour: "Sam-Dim", heures: "Fermé" },
      ],
    },
  ]
  return (
    <section id="emplacements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl text-charcoal mb-4">Où me trouver</h2>
          <p className="text-warm-gray text-lg">Je pratique dans deux emplacements pour mieux vous servir</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {bureaux.map((b, i) => (
            <div key={i} className="bg-cream rounded-2xl p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl text-charcoal">{b.nom}</h3>
                  <p className="text-dental-600 font-medium">{b.ville}</p>
                </div>
                <MapPin className="w-6 h-6 text-dental-500" />
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-warm-gray text-sm">{b.adresse}</p>
                <a href={`tel:${b.tel.replace(/\s/g, '')}`} className="flex items-center gap-2 text-charcoal font-medium">
                  <Phone className="w-4 h-4 text-dental-500" /> {b.tel}
                </a>
                <a href={`https://${b.site}`} target="_blank" rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-dental-600 hover:text-dental-700 text-sm">
                  <Globe className="w-4 h-4" /> {b.site}
                </a>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-dental-500" /> Heures d'ouverture
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {b.horaires.map((h, j) => (
                    <div key={j} className="flex justify-between">
                      <span className="text-warm-gray">{h.jour}</span>
                      <span className="text-charcoal">{h.heures}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAMILLE
function Famille() {
  return (
    <section id="famille" className="py-24 bg-gradient-to-b from-cream to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl text-charcoal mb-4">Ma vie, mes passions</h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            « Ma vie ne s'est pas arrêtée qu'à la médecine dentaire. Malgré toutes les reconstructions 
            et remodelages de milliers de sourires, il reste que les plus beaux sont ceux de 
            mon épouse, de mes quatre enfants, et de mes trois petits-enfants. »
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Heart, label: "Diane", desc: "Mon épouse" },
            { icon: Users, label: "4 enfants", desc: "Rachel, Mathias, Gaële, Thomas" },
            { icon: Star, label: "3 petits-enfants", desc: "Dont Camille" },
            { icon: Sparkles, label: "Thomas", desc: "Veut suivre mes traces!" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-dental-100 rounded-full flex items-center justify-center">
                <item.icon className="w-6 h-6 text-dental-600" />
              </div>
              <h4 className="font-semibold text-charcoal">{item.label}</h4>
              <p className="text-sm text-warm-gray">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-dental-600 rounded-3xl p-8 text-white text-center">
          <h3 className="font-display text-2xl mb-4">🤿 Nos passions</h3>
          <p className="text-white/80 text-lg">
            🏍️ Moto père-fille • 🌴 Voyages en famille • 🌊 Plongée sous-marine • 🌵 Aventures
          </p>
        </div>
        <div className="mt-12 text-center">
          <p className="font-display text-xl text-charcoal">« Votre sourire est souvent le reflet de votre personnalité. Prenez-en soin. »</p>
        </div>
      </div>
    </section>
  )
}

// TÉMOIGNAGES
function Temoignages() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="section-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl text-charcoal mb-4">Ce que disent mes patients</h2>
          <p className="text-warm-gray max-w-2xl mx-auto">
            Conformément au code des professions, nous vous invitons à consulter les avis authentiques sur des sites indépendants.
          </p>
        </div>
        <div className="flex justify-center mb-12">
          <a href="https://www.ratemds.com/doctor-ratings/42011/Dr-Serge-Chausse-Montreal-QC.html" 
            target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
            <Star className="w-5 h-5" /> Voir les avis sur RateMDs <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-cream rounded-2xl p-8">
            <h3 className="font-display text-xl mb-4">Réhabilitation tout céramique</h3>
            <p className="text-warm-gray mb-4">Un bel exemple d'une réhabilitation complète en zirconium et céramique</p>
            <div className="bg-dental-100 h-48 rounded-xl flex items-center justify-center text-dental-400">
              Photos avant/après à ajouter
            </div>
          </div>
          <div className="bg-cream rounded-2xl p-8">
            <h3 className="font-display text-xl mb-4">Réhabilitation All-On-Four</h3>
            <p className="text-warm-gray mb-4">« Ma vie a changée! »</p>
            <div className="bg-dental-100 h-48 rounded-xl flex items-center justify-center text-dental-400">
              Photos avant/après à ajouter
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// CONTACT
function Contact() {
  const [formStatus, setFormStatus] = useState('idle')
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', telephone: '', sujet: '', message: '' })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormStatus('success')
        setFormData({ prenom: '', nom: '', email: '', telephone: '', sujet: '', message: '' })
      } else { setFormStatus('error') }
    } catch { setFormStatus('error') }
  }

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4" />
          <h2 className="font-display text-4xl text-charcoal mb-4">Contactez-moi</h2>
          <p className="text-warm-gray text-lg">Une consultation gratuite vous enchantera!</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-display text-xl mb-6">Coordonnées principales</h3>
              <div className="space-y-4">
                <a href="tel:5145214141" className="flex items-center gap-4 text-charcoal hover:text-dental-600">
                  <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-dental-600" />
                  </div>
                  <div><p className="font-medium">514.521.4141</p><p className="text-sm text-warm-gray">Téléphone principal</p></div>
                </a>
                <a href="mailto:schausse@dentiste.com" className="flex items-center gap-4 text-charcoal hover:text-dental-600">
                  <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-dental-600" />
                  </div>
                  <div><p className="font-medium">schausse@dentiste.com</p><p className="text-sm text-warm-gray">Courriel</p></div>
                </a>
              </div>
            </div>
            <div className="bg-dental-600 text-white rounded-2xl p-8">
              <h3 className="font-display text-xl mb-4">Intéressé par une formation?</h3>
              <p className="text-white/80 mb-4">Cours personnalisés one-on-one ou formations intensives en République Dominicaine.</p>
              <a href="https://www.implantologycourses.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300">
                implantologycourses.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="font-display text-xl mb-6">Envoyez-moi un message</h3>
            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">Message envoyé avec succès!</p>
              </div>
            )}
            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">Erreur. Appelez-moi au 514.521.4141</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange}
                  placeholder="Prénom *" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none" />
                <input type="text" name="nom" value={formData.nom} onChange={handleChange}
                  placeholder="Nom *" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none" />
              </div>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="Courriel *" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none" />
              <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange}
                placeholder="Téléphone" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none" />
              <select name="sujet" value={formData.sujet} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none bg-white">
                <option value="">Sujet de votre message</option>
                <option value="rdv">Prise de rendez-vous</option>
                <option value="info">Demande d'information</option>
                <option value="formation">Formation / Tutorat</option>
                <option value="autre">Autre</option>
              </select>
              <textarea name="message" value={formData.message} onChange={handleChange}
                placeholder="Votre message *" required rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none resize-none" />
              <button type="submit" disabled={formStatus === 'submitting'}
                className={`btn-primary w-full ${formStatus === 'submitting' ? 'opacity-70' : ''}`}>
                {formStatus === 'submitting' ? 'Envoi...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// PAGE PRINCIPALE
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Certifications />
      <Services />
      <Formation />
      <Emplacements />
      <Famille />
      <Temoignages />
      <Contact />
    </main>
  )
}
