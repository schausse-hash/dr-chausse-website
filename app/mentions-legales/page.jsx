// app/mentions-legales/page.jsx

export const metadata = {
  title: 'Mentions légales | Dr Serge Chaussé',
  description: 'Mentions légales du site dentiste.com, exploité par Gestion Serge Chaussé inc.',
  robots: { index: false }, // Ne pas indexer cette page
}

export default function MentionsLegalesPage() {
  return (
    <main className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">

        <div className="section-divider mb-6" />
        <h1 className="font-display text-4xl text-charcoal mb-4">Mentions légales</h1>
        <p className="text-warm-gray mb-12">Dernière mise à jour : octobre 2026</p>

        <div className="prose prose-lg max-w-none space-y-10 text-charcoal">

          <section>
            <h2 className="font-display text-2xl mb-3">1. Exploitant du site</h2>
            <p className="text-warm-gray leading-relaxed">
              Le site <strong className="text-charcoal">dentiste.com</strong> est exploité par :
            </p>
            <p className="text-warm-gray leading-relaxed mt-3">
              <strong className="text-charcoal">Gestion Serge Chaussé inc.</strong><br />
              Numéro d'entreprise du Québec (NEQ) : 1171303119<br />
              Siège social : 1277 Bd Saint-Joseph E, Montréal, QC H2J 1L9
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">2. Contact</h2>
            <p className="text-warm-gray leading-relaxed">
              Courriel :{' '}
              <a href="mailto:schausse@dentiste.com" className="text-dental-600 hover:underline">
                schausse@dentiste.com
              </a><br />
              Téléphone :{' '}
              <a href="tel:5145214141" className="text-dental-600 hover:underline">514.521.4141</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">3. Pratique professionnelle</h2>
            <p className="text-warm-gray leading-relaxed">
              Les services dentaires présentés sur ce site sont rendus par le Dr Serge Chaussé,
              membre de l'Ordre des dentistes du Québec.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">4. Propriété intellectuelle</h2>
            <p className="text-warm-gray leading-relaxed">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos) est la propriété
              de Gestion Serge Chaussé inc. ou de ses partenaires et ne peut être reproduit sans
              autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">5. Renseignements personnels</h2>
            <p className="text-warm-gray leading-relaxed">
              Le traitement des renseignements personnels est décrit dans notre{' '}
              <a href="/confidentialite" className="text-dental-600 hover:underline">
                politique de confidentialité
              </a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
