// app/confidentialite/page.jsx

export const metadata = {
  title: 'Politique de confidentialité | Dr Serge Chaussé',
  description: 'Politique de confidentialité et utilisation des cookies sur le site du Dr Serge Chaussé.',
  robots: { index: false }, // Ne pas indexer cette page
}

export default function ConfidentialitePage() {
  return (
    <main className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">

        <div className="section-divider mb-6" />
        <h1 className="font-display text-4xl text-charcoal mb-4">Politique de confidentialité</h1>
        <p className="text-warm-gray mb-12">Dernière mise à jour : mars 2026</p>

        <div className="prose prose-lg max-w-none space-y-10 text-charcoal">

          <section>
            <h2 className="font-display text-2xl mb-3">1. Informations recueillies</h2>
            <p className="text-warm-gray leading-relaxed">
              Ce site recueille des données anonymes de navigation (pages visitées, durée, 
              appareil utilisé) via Google Analytics. Ces données ne permettent pas de vous 
              identifier personnellement.
            </p>
            <p className="text-warm-gray leading-relaxed mt-3">
              Lorsque vous remplissez le formulaire de contact, nous recueillons votre nom, 
              courriel, numéro de téléphone et le contenu de votre message, uniquement pour 
              vous répondre.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">2. Témoins (cookies)</h2>
            <p className="text-warm-gray leading-relaxed">
              Ce site utilise les types de cookies suivants :
            </p>
            <ul className="mt-4 space-y-3 text-warm-gray">
              <li className="flex items-start gap-3">
                <span className="text-dental-600 font-bold mt-0.5">•</span>
                <span><strong className="text-charcoal">Cookies analytiques</strong> — Google Analytics (G-6ERJEBXPZW) pour mesurer l'audience de façon anonyme.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-dental-600 font-bold mt-0.5">•</span>
                <span><strong className="text-charcoal">Cookies de session</strong> — pour mémoriser vos préférences (ex: choix des cookies).</span>
              </li>
            </ul>
            <p className="text-warm-gray leading-relaxed mt-4">
              Vous pouvez refuser les cookies analytiques via la bannière affichée lors de 
              votre première visite. Votre choix est mémorisé pour vos visites futures.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">3. Utilisation des données</h2>
            <p className="text-warm-gray leading-relaxed">
              Les données recueillies sont utilisées uniquement pour :
            </p>
            <ul className="mt-4 space-y-2 text-warm-gray">
              <li className="flex items-start gap-3">
                <span className="text-dental-600 font-bold">•</span>
                Répondre à vos demandes de contact
              </li>
              <li className="flex items-start gap-3">
                <span className="text-dental-600 font-bold">•</span>
                Améliorer le contenu et l'expérience du site
              </li>
              <li className="flex items-start gap-3">
                <span className="text-dental-600 font-bold">•</span>
                Analyser le trafic de façon anonyme
              </li>
            </ul>
            <p className="text-warm-gray leading-relaxed mt-4 font-medium">
              Vos données ne sont jamais vendues, louées ou partagées à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">4. Conservation des données</h2>
            <p className="text-warm-gray leading-relaxed">
              Les messages de contact sont conservés le temps nécessaire pour traiter votre 
              demande. Les données analytiques sont conservées 26 mois par Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">5. Vos droits</h2>
            <p className="text-warm-gray leading-relaxed">
              Conformément à la Loi sur la protection des renseignements personnels dans 
              le secteur privé (Québec — Loi 25), vous avez le droit de :
            </p>
            <ul className="mt-4 space-y-2 text-warm-gray">
              <li className="flex items-start gap-3"><span className="text-dental-600 font-bold">•</span> Accéder à vos données personnelles</li>
              <li className="flex items-start gap-3"><span className="text-dental-600 font-bold">•</span> Demander la correction de vos données</li>
              <li className="flex items-start gap-3"><span className="text-dental-600 font-bold">•</span> Demander la suppression de vos données</li>
              <li className="flex items-start gap-3"><span className="text-dental-600 font-bold">•</span> Retirer votre consentement en tout temps</li>
            </ul>
            <p className="text-warm-gray leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à{' '}
              <a href="mailto:schausse@dentiste.com" className="text-dental-600 hover:underline">
                schausse@dentiste.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">6. Contact</h2>
            <p className="text-warm-gray leading-relaxed">
              Dr Serge Chaussé<br />
              1277 Bd Saint-Joseph E, Montréal, QC H2J 1L9<br />
              <a href="tel:5145214141" className="text-dental-600 hover:underline">514.521.4141</a><br />
              <a href="mailto:schausse@dentiste.com" className="text-dental-600 hover:underline">schausse@dentiste.com</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
