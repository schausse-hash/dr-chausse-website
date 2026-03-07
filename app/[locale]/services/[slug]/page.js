import { servicesData, servicesList } from '../../../../lib/services-data';
import Link from 'next/link';

export async function generateStaticParams() {
  const params = [];
  for (const locale of ['fr', 'en']) {
    const services = servicesList[locale] || [];
    for (const service of services) {
      params.push({ locale, slug: service.slug });
    }
  }
  return params;
}

function getServiceBySlug(locale, slug) {
  const localeData = servicesData[locale] || servicesData['fr'];
  return Object.values(localeData).find(s => s.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(locale, slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(locale, slug);
  const isFr = locale === 'fr';

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#faf8f5' }}>
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
            {isFr ? 'Page non trouvée' : 'Page not found'}
          </h1>
          <Link href={`/${locale}/services`} style={{ color: '#287b55' }}>
            {isFr ? '← Retour aux services' : '← Back to services'}
          </Link>
        </div>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.title,
    description: service.metaDescription,
    performer: {
      '@type': 'Dentist',
      name: 'Dr Serge Chaussé',
      telephone: '+15145214141',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1277 Bd Saint-Joseph E',
        addressLocality: 'Montréal',
        addressRegion: 'QC',
        postalCode: 'H2J 1L9',
        addressCountry: 'CA',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen" style={{ backgroundColor: '#faf8f5' }}>

        {/* HERO */}
        <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a4131 0%, #287b55 60%, #226346 100%)', minHeight: '420px' }}>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c9a962, transparent)', transform: 'translate(20%, -20%)' }}/>
          <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent)' }}/>

          <div className="relative max-w-5xl mx-auto px-6 py-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {isFr ? 'Accueil' : 'Home'}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/services`} className="hover:text-white transition-colors">
                {isFr ? 'Services' : 'Services'}
              </Link>
              <span>/</span>
              <span className="text-white">{service.title}</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ backgroundColor: 'rgba(201,169,98,0.2)', color: '#c9a962', border: '1px solid rgba(201,169,98,0.4)' }}>
                {service.hero.tagline}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {service.title}
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {service.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href="tel:5145214141"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: '#c9a962', color: '#1a4131' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                  {isFr ? 'Prendre rendez-vous' : 'Book appointment'}
                </a>
                <a
                  href={`/${locale}#contact`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all hover:bg-white hover:text-green-900"
                  style={{ border: '1px solid rgba(255,255,255,0.4)' }}
                >
                  {isFr ? 'Nous contacter' : 'Contact us'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* INTRO */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2">
              <p className="text-lg leading-relaxed" style={{ color: '#374151' }}>
                {service.intro}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: '#e5e7eb' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#287b55' }}>
                {isFr ? 'Dr Serge Chaussé' : 'Dr. Serge Chaussé'}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                {isFr ? 'DMD, Université de Montréal · 40 ans d\'expérience · Formateur international certifié Trinon depuis 2007' : 'DMD, Université de Montréal · 40 years of experience · Certified Trinon international trainer since 2007'}
              </p>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#f3f4f6' }}>
                <a href="tel:5145214141" className="text-sm font-semibold" style={{ color: '#287b55' }}>
                  514.521.4141
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        <div className="py-16" style={{ backgroundColor: '#f0f7f3' }}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
              {isFr ? 'Pourquoi choisir ce traitement?' : 'Why choose this treatment?'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.benefits.map((b, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color: '#1a4131' }}>{b.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PROCESS */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
            {isFr ? 'Le déroulement du traitement' : 'Treatment process'}
          </h2>
          <div className="relative">
            {/* Ligne de connexion */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5" style={{ backgroundColor: '#e5e7eb', margin: '0 80px' }}/>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {service.process.map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold relative z-10" style={{ backgroundColor: '#287b55', color: 'white' }}>
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: '#1a4131' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VIDEO */}
        {service.videoId && (
          <div className="py-16" style={{ backgroundColor: '#1a4131' }}>
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                {service.videoTitle}
              </h2>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${service.videoId}`}
                  title={service.videoTitle}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* AVANT/APRES */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
            {isFr ? 'Avant / Après' : 'Before / After'}
          </h2>
          <p className="text-center mb-10" style={{ color: '#6b7280' }}>
            {isFr ? 'Cas réels traités par Dr Chaussé' : 'Real cases treated by Dr. Chaussé'}
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[1,2,3].map(n => (
              <div key={n} className="rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: '#e5e7eb' }}>
                <div className="grid grid-cols-2">
                  <div className="aspect-square flex flex-col items-center justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                    <span className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#9ca3af' }}>
                      {isFr ? 'Avant' : 'Before'}
                    </span>
                    <svg className="w-10 h-10" style={{ color: '#d1d5db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div className="aspect-square flex flex-col items-center justify-center" style={{ backgroundColor: '#f0f7f3' }}>
                    <span className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#287b55' }}>
                      {isFr ? 'Après' : 'After'}
                    </span>
                    <svg className="w-10 h-10" style={{ color: '#287b55' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium" style={{ color: '#1a4131' }}>
                    {isFr ? `Cas ${n}` : `Case ${n}`}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                    {isFr ? 'Photos à ajouter' : 'Photos to be added'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="py-16" style={{ backgroundColor: '#f0f7f3' }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
              {isFr ? 'Questions fréquentes' : 'Frequently asked questions'}
            </h2>
            <div className="space-y-4">
              {service.faq.map((item, i) => (
                <details key={i} className="bg-white rounded-2xl shadow-sm group" style={{ border: '1px solid #e5e7eb' }}>
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold pr-4" style={{ color: '#1a4131' }}>{item.q}</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform group-open:rotate-45" style={{ backgroundColor: '#287b55', color: 'white' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="leading-relaxed" style={{ color: '#6b7280' }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="rounded-3xl p-12 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #287b55, #1a4131)' }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #c9a962, transparent 50%)' }}/>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {isFr ? 'Prêt à transformer votre sourire?' : 'Ready to transform your smile?'}
              </h2>
              <p className="text-lg mb-8 opacity-80 text-white">
                {isFr ? 'Consultez Dr Chaussé pour un plan de traitement personnalisé.' : 'Consult Dr. Chaussé for a personalized treatment plan.'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="tel:5145214141"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: '#c9a962', color: '#1a4131' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                  514.521.4141
                </a>
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white transition-all hover:bg-white hover:text-green-900"
                  style={{ border: '1px solid rgba(255,255,255,0.4)' }}
                >
                  {isFr ? 'Voir tous les services' : 'See all services'}
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
