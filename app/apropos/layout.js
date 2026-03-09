// app/apropos/layout.js
export const metadata = {
  title: 'À propos — Dr Serge Chaussé | Dentiste & Formateur Montréal',
  description: 'Découvrez le parcours du Dr Serge Chaussé, dentiste depuis 1984 à Montréal. Spécialiste en implants dentaires, CEREC, All-on-4. Plus de 42 ans d\'expérience.',
  keywords: 'Dr Serge Chaussé dentiste, dentiste Montréal Plateau, implants dentaires Montréal, formateur implantologie',
  alternates: { canonical: 'https://www.dentiste.com/apropos' },
  openGraph: {
    title: 'À propos — Dr Serge Chaussé',
    description: 'Plus de 42 ans d\'expertise en soins dentaires à Montréal.',
    url: 'https://www.dentiste.com/apropos',
    images: [{ url: '/images/portrait-principal.jpg', width: 1200, height: 630, alt: 'Dr Serge Chaussé' }],
  },
}
export default function AProposLayout({ children }) {
  return <>{children}</>
}
