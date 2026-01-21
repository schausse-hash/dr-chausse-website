import './globals.css'

export const metadata = {
  title: 'Dr Serge Chaussé | Dentiste à Montréal | Implants Dentaires & Soins Esthétiques',
  description: 'Dr Serge Chaussé, dentiste d\'expérience à Montréal. Spécialiste en implants dentaires, dentisterie au laser, blanchiment et soins esthétiques. Plus de 35 ans d\'expertise.',
  keywords: 'dentiste Montréal, Dr Serge Chaussé, implants dentaires, blanchiment dents, dentisterie laser, CEREC, orthodontie',
  authors: [{ name: 'Dr Serge Chaussé' }],
  openGraph: {
    title: 'Dr Serge Chaussé | Dentiste à Montréal',
    description: 'Plus de 35 ans d\'expertise en soins dentaires de qualité',
    url: 'https://www.dentiste.com',
    siteName: 'Dr Serge Chaussé - Dentiste',
    locale: 'fr_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
