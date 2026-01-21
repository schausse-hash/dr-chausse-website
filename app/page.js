'use client'

import { useState, useEffect } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles,
  Shield,
  Heart,
  Star,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#apropos', label: 'À propos' },
    { href: '#services', label: 'Services' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#accueil" className="flex flex-col">
          <span className={`font-display text-2xl tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-dental-700' : 'text-white'
          }`}>
            Dr Serge Chaussé
          </span>
          <span className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
            isScrolled ? 'text-warm-gray' : 'text-white/70'
          }`}>
            Chirurgien-Dentiste
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 underline-elegant ${
                isScrolled ? 'text-charcoal hover:text-dental-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:5145214141"
            className={`btn-primary text-xs ${isScrolled ? '' : 'bg-white/20 hover:bg-white/30'}`}
          >
            514.521.4141
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-charcoal' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-charcoal' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl">
          <div className="px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-lg text-charcoal hover:text-dental-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:5145214141"
              className="btn-primary inline-block mt-4"
            >
              Appeler maintenant
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero Section
function Hero() {
  return (
    <section id="accueil" className="hero-pattern min-h-screen flex items-center relative overflow-hidden grain-overlay">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-dental-400/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 py-32 lg:py-40 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 animate-fade-in">
              <Award className="w-4 h-4 text-[#c9a962]" />
              <span className="text-sm tracking-wide">Plus de 35 ans d'expérience</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight animate-fade-in-up">
              Votre sourire,
              <br />
              <span className="text-[#c9a962]">mon expertise</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-lg animate-fade-in-up stagger-2">
              Une approche personnalisée combinant technologies de pointe et savoir-faire 
              artisanal pour transformer votre sourire.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <a href="#contact" className="btn-primary">
                Prendre rendez-vous
              </a>
              <a href="#services" className="btn-outline border-white/30 text-white hover:bg-white hover:text-dental-700">
                Découvrir nos services
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 animate-fade-in-up stagger-4">
              <div>
                <div className="font-display text-3xl text-[#c9a962]">35+</div>
                <div className="text-sm text-white/60">Années d'expérience</div>
              </div>
              <div>
                <div className="font-display text-3xl text-[#c9a962]">10k+</div>
                <div className="text-sm text-white/60">Patients satisfaits</div>
              </div>
              <div>
                <div className="font-display text-3xl text-[#c9a962]">100%</div>
                <div className="text-sm text-white/60">Engagement qualité</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="hidden lg:block relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-dental-400/30 to-dental-600/30 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="font-display text-5xl text-white/80">SC</span>
                </div>
                <p className="text-white/60 text-sm">Photo du Dr Chaussé</p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-dental-600" />
                </div>
                <div>
                  <div className="font-semibold text-charcoal">Certifié</div>
                  <div className="text-sm text-warm-gray">Ordre des dentistes du Québec</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/50" />
      </div>
    </section>
  )
}

// About Section
function About() {
  return (
    <section id="apropos" className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-dental-100 rounded-3xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dental-100 to-dental-200">
                <span className="font-display text-8xl text-dental-300">SC</span>
              </div>
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-dental-300 rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#c9a962] rounded-br-3xl" />
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="decorative-line mb-4" />
              <h2 className="font-display text-4xl lg:text-5xl text-charcoal mb-6">
                À propos du
                <br />
                <span className="text-dental-600">Dr Serge Chaussé</span>
              </h2>
            </div>
            
            <div className="space-y-4 text-lg text-warm-gray">
              <p>
                Diplômé de l'Université de Montréal, le Dr Serge Chaussé exerce la dentisterie 
                avec passion depuis plus de 35 ans. Son engagement envers l'excellence et 
                l'innovation l'a conduit à maîtriser les techniques les plus avancées en 
                implantologie et dentisterie esthétique.
              </p>
              <p>
                Il suffit d'un petit rien pour transformer votre sourire et pour que vous 
                puissiez projeter l'image d'une personne sûre d'elle et bien dans sa peau. 
                Lorsque votre image vous plaît, toute votre allure s'en ressent.
              </p>
            </div>
            
            {/* Philosophy points */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Heart, text: 'Approche humaine et personnalisée' },
                { icon: Sparkles, text: 'Technologies de pointe' },
                { icon: Shield, text: 'Sécurité et confort optimaux' },
                { icon: Star, text: 'Excellence et précision' },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-dental-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-dental-600" />
                  </div>
                  <span className="text-sm text-charcoal">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function Services() {
  const services = [
    {
      title: 'Implants Dentaires',
      description: 'Les implants offrent une solution permanente et naturelle pour remplacer les dents manquantes. Qualité de vie améliorée avec une apparence et un fonctionnement similaires aux dents naturelles.',
      features: ['Remplacement d\'une seule dent', 'Remplacement de plusieurs dents', 'Prothèses sur implants'],
      icon: '🦷'
    },
    {
      title: 'Dentisterie au Laser',
      description: 'Technologie de pointe pour des traitements plus précis, moins invasifs et plus confortables. Idéal pour les traitements de gencives et la chirurgie mineure.',
      features: ['Traitement des gencives', 'Chirurgie minimale', 'Récupération rapide'],
      icon: '✨'
    },
    {
      title: 'Blanchiment Professionnel',
      description: 'Retrouvez un sourire éclatant grâce à notre système de blanchiment professionnel. Résultats visibles en une seule séance.',
      features: ['Blanchiment en cabinet', 'Kit à domicile', 'Résultats durables'],
      icon: '💎'
    },
    {
      title: 'Couronnes CEREC',
      description: 'Obturations et couronnes en céramique réalisées en une seule visite grâce à la technologie CEREC assistée par ordinateur.',
      features: ['Une seule visite', 'Céramique haute qualité', 'Esthétique naturelle'],
      icon: '👑'
    },
    {
      title: 'Orthodontie',
      description: 'Solutions orthodontiques modernes pour aligner vos dents et corriger votre occlusion, adaptées à tous les âges.',
      features: ['Appareils discrets', 'Aligneurs transparents', 'Suivi personnalisé'],
      icon: '😊'
    },
    {
      title: 'Chirurgie Osseuse',
      description: 'Interventions chirurgicales spécialisées pour préparer les fondations nécessaires aux implants ou corriger des anomalies osseuses.',
      features: ['Greffe osseuse', 'Élévation de sinus', 'Régénération tissulaire'],
      icon: '🏥'
    },
  ]

  return (
    <section id="services" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="decorative-line mx-auto mb-4" />
          <h2 className="font-display text-4xl lg:text-5xl text-charcoal mb-6">
            Services offerts par le
            <br />
            <span className="text-dental-600">Dr Chaussé</span>
          </h2>
          <p className="text-lg text-warm-gray">
            Des soins dentaires complets utilisant les technologies les plus avancées 
            pour des résultats exceptionnels et durables.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-hover gradient-border rounded-2xl p-8 bg-white"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="font-display text-2xl text-charcoal mb-3">
                {service.title}
              </h3>
              <p className="text-warm-gray mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-charcoal">
                    <CheckCircle2 className="w-4 h-4 text-dental-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-warm-gray mb-6">
            Vous avez des questions sur nos services ?
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center">
            Contactez-nous
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  )
}

// Expertise Section (What Dr. Chaussé can correct)
function Expertise() {
  const problems = [
    'Dents manquantes, dents trop espacées, trouble général de l\'occlusion',
    'Dents ébréchées, fissurées ou usées',
    'Obturations inesthétiques',
    'Dents irrémédiablement tachées ou décolorées',
    'Malposition dentaire',
  ]

  return (
    <section id="expertise" className="py-24 lg:py-32 bg-dental-900 text-white relative overflow-hidden grain-overlay">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-dental-800/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="decorative-line mb-4" />
              <h2 className="font-display text-4xl lg:text-5xl mb-6">
                Transformez votre sourire
              </h2>
              <p className="text-xl text-white/80">
                Aujourd'hui, les matériaux et techniques de pointe permettent d'obtenir 
                des changements notables. Conjugués à ma compétence, à mon expérience 
                et à mon savoir-faire — une savante combinaison de science et d'art — 
                ils peuvent littéralement redessiner votre sourire.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-[#c9a962]">
                Le Dr Chaussé peut corriger :
              </h3>
              <ul className="space-y-3">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#c9a962] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-white/90">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <a href="#contact" className="btn-primary inline-flex items-center">
              Consultation gratuite
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
          
          {/* Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-dental-700 to-dental-800 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <span className="quote-mark">"</span>
                <p className="font-display text-2xl italic text-white/90 mt-4">
                  Il suffit d'un petit rien pour transformer votre sourire
                </p>
                <p className="text-[#c9a962] mt-4">— Dr Serge Chaussé</p>
              </div>
            </div>
            {/* Stats card */}
            <div className="absolute -bottom-8 -right-8 bg-white text-charcoal rounded-2xl p-6 shadow-2xl max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-dental-100 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-dental-600" />
                </div>
                <div>
                  <div className="font-display text-3xl text-dental-600">98%</div>
                  <div className="text-sm text-warm-gray">Taux de satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="decorative-line mb-4" />
              <h2 className="font-display text-4xl lg:text-5xl text-charcoal mb-6">
                Prenez
                <br />
                <span className="text-dental-600">rendez-vous</span>
              </h2>
              <p className="text-lg text-warm-gray">
                N'hésitez pas à communiquer avec nous pour toute question 
                ou pour prendre rendez-vous. Notre équipe se fera un plaisir 
                de vous accueillir.
              </p>
            </div>
            
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-dental-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">Téléphone</h3>
                  <a href="tel:5145214141" className="text-dental-600 hover:text-dental-700 text-lg">
                    514.521.4141
                  </a>
                  <p className="text-sm text-warm-gray">Sans frais: 1.877.521.4141</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-dental-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">Courriel</h3>
                  <a href="mailto:info@drchausse.com" className="text-dental-600 hover:text-dental-700">
                    info@drchausse.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-dental-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">Adresse</h3>
                  <p className="text-warm-gray">
                    1277 Boulevard Saint-Joseph Est
                    <br />
                    Montréal, Québec
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-dental-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-dental-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal">Heures d'ouverture</h3>
                  <p className="text-warm-gray">
                    Lundi au vendredi: 9h - 17h
                    <br />
                    Sur rendez-vous
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <h3 className="font-display text-2xl text-charcoal mb-6">
              Demande de rendez-vous
            </h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Courriel
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition"
                  placeholder="votre@courriel.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition"
                  placeholder="514-000-0000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Service souhaité
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition bg-white">
                  <option value="">Sélectionnez un service</option>
                  <option value="implants">Implants dentaires</option>
                  <option value="laser">Dentisterie au laser</option>
                  <option value="blanchiment">Blanchiment</option>
                  <option value="cerec">Couronnes CEREC</option>
                  <option value="orthodontie">Orthodontie</option>
                  <option value="chirurgie">Chirurgie osseuse</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Décrivez brièvement votre demande..."
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl mb-4">Dr Serge Chaussé</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Plus de 35 ans d'expertise au service de votre sourire. 
              Technologies de pointe et approche personnalisée.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#apropos" className="hover:text-white transition">À propos</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="#expertise" className="hover:text-white transition">Expertise</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>1277 Blv. Saint-Joseph E</li>
              <li>Montréal, Québec</li>
              <li className="pt-2">
                <a href="tel:5145214141" className="text-dental-400 hover:text-dental-300">
                  514.521.4141
                </a>
              </li>
              <li>
                <a href="mailto:info@drchausse.com" className="text-dental-400 hover:text-dental-300">
                  info@drchausse.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© 2025 Dr Serge Chaussé. Tous droits réservés.</p>
          <p className="mt-4 md:mt-0">
            Membre de l'Ordre des dentistes du Québec
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Expertise />
      <Contact />
      <Footer />
    </main>
  )
}
