'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export const socialLinks = [
  { href: 'https://www.facebook.com/', icon: Facebook, label: 'Facebook' },
  { href: 'https://x.com/sergechausse', icon: XIcon, label: 'X' },
  { href: 'https://www.youtube.com/@sergechausse', icon: Youtube, label: 'YouTube' },
  { href: 'https://www.linkedin.com/in/serge-chausse/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/', icon: Instagram, label: 'Instagram' },
]

const navLinks = [
  { href: '/#accueil', label: 'Accueil' },
  { href: '/apropos', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/#formation', label: 'Formation' },
  { href: '/#emplacements', label: 'Emplacements' },
  { href: '/ma-vie', label: 'Ma vie' },
  { href: '/#contact', label: 'Contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      {/* Barre sociale */}
      <div className={`transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-end items-center space-x-3 pb-2">
          <span className="text-xs text-white/70">English</span>
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors" aria-label={social.label}>
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Barre principale */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className={`font-display text-xl font-semibold transition-colors ${
            isScrolled ? 'text-dental-700' : 'text-white'
          }`}>Dr Serge Chaussé</span>
          <span className={`text-xs tracking-widest uppercase transition-colors ${
            isScrolled ? 'text-warm-gray' : 'text-white/70'
          }`}>Dentiste • Formateur</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-charcoal hover:text-dental-600' : 'text-white/90 hover:text-white'
              }`}>{link.label}</a>
          ))}
          <a href="tel:5145214141" className="btn-primary text-xs py-3 px-6">514.521.4141</a>
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen
            ? <X className={`w-6 h-6 ${isScrolled ? 'text-charcoal' : 'text-white'}`} />
            : <Menu className={`w-6 h-6 ${isScrolled ? 'text-charcoal' : 'text-white'}`} />
          }
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl">
          <div className="px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="block text-lg text-charcoal hover:text-dental-600"
                onClick={() => setIsMobileMenuOpen(false)}>{link.label}</a>
            ))}
            <div className="flex space-x-4 pt-4 border-t">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="text-gray-500 hover:text-dental-600">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <a href="tel:5145214141" className="btn-primary inline-block mt-4 text-center">Appeler</a>
          </div>
        </div>
      )}
    </nav>
  )
}
