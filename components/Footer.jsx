import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const socialLinks = [
  { href: 'https://www.facebook.com/', icon: Facebook, label: 'Facebook' },
  { href: 'https://x.com/sergechausse', icon: XIcon, label: 'X' },
  { href: 'https://www.youtube.com/@sergechausse', icon: Youtube, label: 'YouTube' },
  { href: 'https://www.linkedin.com/in/serge-chausse/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/', icon: Instagram, label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl mb-4">Dr Serge Chaussé</h3>
            <p className="text-white/60 mb-4">Dentiste avec plus de 40 ans d'expérience et formateur international en implantologie.</p>
            <p className="text-white/60 text-sm mb-6">« J'ai enfin trouvé mon dentiste! »</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-dental-600 transition-colors"
                  aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="/apropos" className="hover:text-white">À propos</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/formation" className="hover:text-white">Formation</a></li>
              <li><a href="/avantapres" className="hover:text-white">Avant Après</a></li>
              <li><a href="/#emplacements" className="hover:text-white">Emplacements</a></li>
              <li><a href="/ma-vie" className="hover:text-white">Ma vie</a></li>
              <li><a href="/#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="tel:5145214141" className="hover:text-white">📞 514.521.4141</a></li>
              <li><a href="mailto:schausse@dentiste.com" className="hover:text-white">📧 schausse@dentiste.com</a></li>
              <li className="pt-2">
                <a href="https://www.implantologycourses.com/" target="_blank" rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-300">Cours Hands-on à l'international</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© 2026 Dr Serge Chaussé. Tous droits réservés.</p>
          <p>Membre de l'Ordre des dentistes du Québec</p>
        </div>
      </div>
    </footer>
  )
}
