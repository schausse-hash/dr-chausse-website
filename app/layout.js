// ================================================================
// app/layout.js — REMPLACE TON layout.js ACTUEL
// Inclut: metadata globales, Open Graph, Twitter Cards,
//         Schema.org JSON-LD, Google Analytics
// ================================================================

import './globals.css'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import ConditionalLayout from '@/components/ConditionalLayout'
import { SchemaDentiste, SchemaFAQ } from '@/components/SchemaOrg'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// ── MÉTADONNÉES GLOBALES ──────────────────────────────────────────
export const metadata = {
  // ── Identité de base ──
  metadataBase: new URL('https://www.dentiste.com'),
  title: {
    default: 'Dr Serge Chaussé | Dentiste & Formateur en Implantologie — Montréal',
    template: '%s | Dr Serge Chaussé — Dentiste Montréal',
  },
  description: 'Dr Serge Chaussé, chirurgien dentiste depuis 1984 à Montréal. Spécialiste implants dentaires, CEREC 3D, All-on-4, orthodontie. Formateur international. Consultation gratuite.',
  keywords: [
    'dentiste Montréal',
    'chirurgien dentiste Montréal',
    'implants dentaires Montréal',
    'Dr Serge Chaussé',
    'CEREC Montréal',
    'All-on-4 Montréal',
    'orthodontie Montréal',
    'dentiste Plateau Mont-Royal',
    'formateur implantologie',
    'dentiste Saint-Jean-sur-Richelieu',
    'blanchiment dentaire Montréal',
    'réhabilitation dentaire Montréal',
  ],
  authors: [{ name: 'Dr Serge Chaussé', url: 'https://www.dentiste.com' }],
  creator: 'Dr Serge Chaussé',
  publisher: 'Dr Serge Chaussé',

  // ── Canonical & langue ──
  alternates: {
    canonical: 'https://www.dentiste.com',
    languages: { 'fr-CA': 'https://www.dentiste.com' },
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp) ──
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://www.dentiste.com',
    siteName: 'Dr Serge Chaussé — Dentiste & Formateur',
    title: 'Dr Serge Chaussé | Dentiste & Formateur en Implantologie — Montréal',
    description: 'Chirurgien dentiste depuis 1984 à Montréal. Implants, CEREC, All-on-4, orthodontie. Formateur international. Consultation gratuite!',
    images: [
      {
        url: '/images/og-image.jpg',   // Crée une image 1200×630px avec photo + logo
        width: 1200,
        height: 630,
        alt: 'Dr Serge Chaussé — Dentiste & Formateur Montréal',
        type: 'image/jpeg',
      },
    ],
  },

  // ── Twitter / X Card ──
  twitter: {
    card: 'summary_large_image',
    site: '@sergechausse',
    creator: '@sergechausse',
    title: 'Dr Serge Chaussé | Dentiste & Formateur — Montréal',
    description: 'Chirurgien dentiste depuis 1984. Implants, CEREC, All-on-4. Formateur international. Consultation gratuite!',
    images: ['/images/og-image.jpg'],
  },

  // ── Indexation ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Icônes ──
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // ── Vérification Google Search Console ──
  // (remplacer par ton vrai code après avoir ajouté le site dans Search Console)
  verification: {
    google: 'eBuF7NwtlMBYD-fZxMB_fuOjYHDWIFSgRbo0NpVLrec',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr-CA" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* ── Schema.org JSON-LD ── */}
        <SchemaDentiste />
        <SchemaFAQ />
      </head>
      <body>

        {/* ── Google Analytics ── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G-3K872PH6L4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6ERJEBXPZW', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ConditionalLayout>
          {children}
        </ConditionalLayout>

      </body>
    </html>
  )
}
