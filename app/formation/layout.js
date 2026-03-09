// app/formation/layout.js
export const metadata = {
  title: 'Formation en Implantologie — Dr Serge Chaussé | Formateur International',
  description: 'Formation hands-on en chirurgie implantaire avec Dr Serge Chaussé. Cours en République Dominicaine, tutorat personnalisé, clinicien Trinon Allemagne depuis 2007.',
  keywords: 'formation implantologie, cours implants dentaires, tutorat chirurgie implantaire, formateur dentiste Montréal, hands-on implantology',
  alternates: { canonical: 'https://www.dentiste.com/formation' },
  openGraph: {
    title: 'Formation en Implantologie — Dr Serge Chaussé',
    description: 'Formation hands-on en chirurgie implantaire depuis 2007. Cours République Dominicaine.',
    url: 'https://www.dentiste.com/formation',
    images: [{ url: '/images/clinique-2.jpg', width: 1200, height: 630, alt: 'Dr Chaussé en formation' }],
  },
}
export default function FormationLayout({ children }) {
  return <>{children}</>
}
