// app/avantapres/layout.js
export const metadata = {
  title: 'Avant / Après — Réhabilitations Dentaires | Dr Serge Chaussé',
  description: 'Résultats réels de réhabilitations dentaires complètes par Dr Serge Chaussé. Zirconium, céramique, All-on-4. Consultez les avis patients sur RateMDs.',
  keywords: 'avant après dentiste Montréal, réhabilitation dentaire, implants avant après, All-on-4 résultats, avis dentiste Montréal',
  alternates: { canonical: 'https://www.dentiste.com/avantapres' },
  openGraph: {
    title: 'Avant / Après — Dr Serge Chaussé',
    description: 'Transformations réelles. Des sourires qui parlent d\'eux-mêmes.',
    url: 'https://www.dentiste.com/avantapres',
  },
}
export default function AvantApresLayout({ children }) {
  return <>{children}</>
}
