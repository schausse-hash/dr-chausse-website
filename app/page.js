'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Phone, Mail, MapPin, Globe,

  ChevronDown, ExternalLink
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
              Chirurgien dentiste et formateur en implantologie. 
              Il suffit d'un petit rien pour transformer votre sourire.
            </p>
           
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

// CERTIFICATIONS

// SERVICES

// FORMATION

// EMPLACEMENTS
function Emplacements() {
  const bureaux = [
    {
      nom: "Clinique dentaire Boulevard St-Joseph",
      ville: "Montréal (Plateau Mont-Royal)",
      adresse: "1277 Bd Saint-Joseph E, Montréal, QC H2J 1L9",
      tel: "514-521-4141",
      site: "cliniquedentaireboulevardsaintjoseph.ca",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.6!2d-73.5739!3d45.5322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a4e1b3b3b3b%3A0x0!2s1277+Bd+Saint-Joseph+E%2C+Montr%C3%A9al!5e0!3m2!1sfr!2sca!4v1700000000000",
    },
    {
      nom: "Centre Dentaire St-Luc",
      ville: "Saint-Jean-sur-Richelieu",
      adresse: "413 Boul. Saint-Luc, Saint-Jean-sur-Richelieu, QC J2W 2A3",
      tel: "450 349-3368",
      email: "centredentairest-luc@videotron.ca",
      site: "centredentairest-luc.com",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.4!2d-73.2637!3d45.3078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc924b1b1b1b1b1%3A0x0!2s413+Boul.+Saint-Luc%2C+Saint-Jean-sur-Richelieu!5e0!3m2!1sfr!2sca!4v1700000000001",
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
            <div key={i} className="bg-cream rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {/* Carte Google Maps */}
              <div className="h-52 w-full bg-gray-200">
                <iframe
                  src={b.mapSrc}
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={b.nom}
                />
              </div>
              {/* Infos */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-display text-xl text-charcoal">{b.nom}</h3>
                  <p className="text-dental-600 font-medium text-sm">{b.ville}</p>
                </div>
                <p className="text-warm-gray text-sm flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-dental-500 mt-0.5 shrink-0" /> {b.adresse}
                </p>
                <a href={`tel:${b.tel.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-charcoal font-medium hover:text-dental-600 transition-colors">
                  <Phone className="w-4 h-4 text-dental-500" /> {b.tel}
                </a>
                {b.email && (
                  <a href={`mailto:${b.email}`}
                    className="flex items-center gap-2 text-dental-600 hover:text-dental-700 text-sm">
                    <Mail className="w-4 h-4" /> {b.email}
                  </a>
                )}
                <a href={`https://${b.site}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-dental-600 hover:text-dental-700 text-sm">
                  <Globe className="w-4 h-4" /> {b.site}
                </a>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(b.adresse)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 bg-dental-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-dental-700 transition-colors">
                  <MapPin className="w-4 h-4" /> Obtenir l'itinéraire
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAMILLE

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

// ── CAPTCHA DENTAIRE ──────────────────────────────────────────────
const CAPTCHA_ITEMS = [
  { id: 'saine1',     label: 'Dent saine',  correct: true,  emoji: '🦷' },
  { id: 'saine2',     label: 'Dent saine',  correct: true,  emoji: '🦷' },
  { id: 'saine3',     label: 'Dent saine',  correct: true,  emoji: '🦷' },
  { id: 'cariee1',    label: 'Cariée',       correct: false, emoji: '🪥' },
  { id: 'couronne1',  label: 'Couronne',     correct: false, emoji: '👑' },
  { id: 'brosse1',    label: 'Brosse',       correct: false, emoji: '🖌️' },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function DentCaptcha({ onVerified }) {
  const [items] = useState(() => shuffle(CAPTCHA_ITEMS))
  const [selected, setSelected] = useState(new Set())
  const [status, setStatus] = useState('idle') // idle | error | success

  const toggle = (id) => {
    if (status === 'success') return
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setStatus('idle')
  }

  const verify = () => {
    const correct = items.filter(i => i.correct)
    const allCorrectSelected = correct.every(i => selected.has(i.id))
    const noWrongSelected = items.filter(i => !i.correct).every(i => !selected.has(i.id))
    if (allCorrectSelected && noWrongSelected) {
      setStatus('success')
      onVerified(true)
    } else {
      setStatus('error')
      onVerified(false)
    }
  }

  return (
    <div className={`rounded-xl p-4 border-2 transition-all ${
      status === 'success' ? 'border-green-400 bg-green-50' :
      status === 'error'   ? 'border-red-300 bg-red-50' :
                             'border-gray-200 bg-gray-50'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-dental-600 uppercase tracking-wider">
          🦷 Sélectionnez toutes les dents saines
        </p>
        {status === 'idle' && (
          <span className="text-[10px] text-gray-400">{selected.size} sélectionné{selected.size > 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {items.map(item => {
          const isSelected = selected.has(item.id)
          const isWrong = status === 'error' && isSelected && !item.correct
          const isGood  = status === 'success' && item.correct
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              disabled={status === 'success'}
              className={[
                'flex flex-col items-center justify-center rounded-lg py-1.5 px-1 border-2 transition-all text-center',
                status === 'success' ? 'cursor-default' : 'cursor-pointer',
                isGood                                    ? 'border-green-500 bg-green-100' :
                isWrong                                   ? 'border-red-400 bg-red-100'    :
                isSelected                                ? 'border-dental-500 bg-dental-50 scale-105 shadow-sm' :
                                                            'border-gray-200 bg-white hover:border-dental-300 hover:bg-dental-50',
              ].join(' ')}
            >
              <span className="text-lg leading-none">{item.emoji}</span>
              <span className={`text-[10px] mt-1 leading-tight ${isSelected ? 'text-dental-600 font-medium' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 min-h-[28px]">
        <div className="text-xs">
          {status === 'error'   && <span className="text-red-600 font-medium">⚠️ Mauvaise sélection — réessayez</span>}
          {status === 'success' && <span className="text-green-700 font-semibold">✅ Vérifié! Le bouton d'envoi est maintenant actif.</span>}
          {status === 'idle' && selected.size > 0 && <span className="text-gray-400">Cliquez Vérifier quand vous êtes prêt</span>}
          {status === 'idle' && selected.size === 0 && <span className="text-gray-400">Cliquez sur les dents saines 🦷</span>}
        </div>
        {status !== 'success' && (
          <button type="button" onClick={verify} disabled={selected.size === 0}
            className={`text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
              selected.size === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-dental-600 hover:bg-dental-700'
            }`}>
            Vérifier
          </button>
        )}
      </div>
    </div>
  )
}

// CONTACT
function Contact() {
  const [formStatus, setFormStatus] = useState('idle')
  const [captchaOk, setCaptchaOk] = useState(false)
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', telephone: '', sujet: '', message: '' })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
  e.preventDefault()
  if (!captchaOk) return
  setFormStatus('submitting')
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
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

          {/* COLONNE GAUCHE */}
          <div className="space-y-8">
           <div className="bg-dental-600 text-white rounded-2xl p-8">
           
    <h3 className="font-display text-xl mb-6">Les cliniques où je travaille</h3>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-lg">Clinique dentaire du boulevard Saint-Joseph — Montréal</p>
                  <p className="text-white/80 text-sm mt-1">1277 Bd Saint-Joseph E, Montréal, QC H2J 1L9</p>
                  <a href="tel:5145214141" className="text-accent-400 hover:text-accent-300 text-sm">514.521.4141</a>
                 <a href="mailto:info@centredentaireboulevardsaintjoseph.ca" className="text-accent-400 hover:text-accent-300 text-xs block mt-1">
 info@centredentaireboulevardsaintjoseph.ca
</a>
    <p className="text-white/60 text-xs mt-2">Lun–Jeu: 7h30–17h · Ven: 8h–16h</p>
    <a href="https://www.cliniquedentaireboulevardsaintjoseph.ca/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 text-xs mt-2">
                    cliniquedentaireboulevardsaintjoseph.ca/ <ExternalLink className="w-3 h-3" />
                  </a>            
    
    </div>
                <div className="border-t border-white/20 pt-6">
                  <p className="font-semibold text-lg">Saint-Jean-sur-Richelieu</p>
                  <p className="text-white/80 text-sm mt-1">413 Boul. Saint-Luc, Saint-Jean-sur-Richelieu, QC J2W 2A3</p>
                  <a href="tel:4503493368" className="text-accent-400 hover:text-accent-300 text-sm">450 349-3368</a>
                  <a href="mailto:centredentairest-luc@videotron.ca" className="text-accent-400 hover:text-accent-300 text-xs block mt-1">
  centredentairest-luc@videotron.ca
</a>
    <p className="text-white/60 text-xs mt-2">Lun–Jeu: 9h–20h · Ven: 8h–16h</p>
                  <a href="https://centredentairest-luc.com/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 text-xs mt-2">
                    centredentairest-luc.com <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE — FORMULAIRE */}
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
                <option value="formation">Formation / Tutorat</option>
                <option value="info">Demande d'information</option>
                <option value="autre">Autre</option>
              </select>
              <textarea name="message" value={formData.message} onChange={handleChange}
                placeholder="Votre message *" required rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dental-500 focus:border-transparent outline-none resize-none" />
              <DentCaptcha onVerified={setCaptchaOk} />
              {captchaOk ? (
                <button type="submit" disabled={formStatus === 'submitting'}
                  className={`btn-primary w-full ${formStatus === 'submitting' ? 'opacity-70' : ''}`}>
                  {formStatus === 'submitting' ? 'Envoi en cours...' : '✉️ Envoyer le message'}
                </button>
              ) : (
                <div className="w-full py-3 px-4 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 text-center">
                  <p className="text-sm text-gray-400">👆 Complétez la vérification ci-dessus pour envoyer</p>
                </div>
              )}
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
      <Emplacements />
      <Temoignages />
      <Contact />
    </main>
  )
}
