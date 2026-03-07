import { servicesData, servicesList } from '../../../lib/services-data';
import Link from 'next/link';

export async function generateStaticParams() {
  const params = [];
  const services = servicesList['fr'] || [];
  for (const service of services) {
    params.push({ slug: service.slug });
  }
  return params;
}

function getServiceBySlug(slug) {
  const localeData = servicesData['fr'];
  return Object.values(localeData).find(s => s.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
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
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#faf8f5' }}>
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
            Page non trouvée
          </h1>
          <Link href="/services" style={{ color: '#287b55' }}>
            ← Retour aux services
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
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #c9a962, transparent)', transform: 'translate(20%, -20%)' }}/>

          <div className="relative max-w-5xl mx-auto px-6 py-20">
            <nav className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
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
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  style={{ backgroundColor: '#c9a962', color: '#1a4131' }}
                >
                  Prendre rendez-vous
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white"
                  style={{ border: '1px solid rgba(255,255,255,0.4)' }}
                >
                  Nous contacter
                </Link>
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
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#287b55' }}>Dr Serge Chaussé</p>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                DMD, Université de Montréal · 40 ans d&apos;expérience · Formateur international certifié Trinon depuis 2007
              </p>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#f3f4f6' }}>
                <a href="tel:5145214141" className="text-sm font-semibold" style={{ color: '#287b55' }}>514.521.4141</a>
              </div>
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        <div className="py-16" style={{ backgroundColor: '#f0f7f3' }}>
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
              Pourquoi choisir ce traitement?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.benefits.map((b, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
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
            Le déroulement du traitement
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {service.process.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold" style={{ backgroundColor: '#287b55', color: 'white' }}>
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: '#1a4131' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{step.desc}</p>
              </div>
            ))}
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
            Avant / Après
          </h2>
          <p className="text-center mb-10" style={{ color: '#6b7280' }}>Cas réels traités par Dr Chaussé</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[1,2,3].map(n => (
              <div key={n} className="rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: '#e5e7eb' }}>
                <div className="grid grid-cols-2">
                  <div className="aspect-square flex flex-col items-center justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9ca3af' }}>Avant</span>
                  </div>
                  <div className="aspect-square flex flex-col items-center justify-center" style={{ backgroundColor: '#f0f7f3' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#287b55' }}>Après</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium" style={{ color: '#1a4131' }}>Cas {n}</p>
                  <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>Photos à ajouter</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="py-16" style={{ backgroundColor: '#f0f7f3' }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {service.faq.map((item, i) => (
                <details key={i} className="bg-white rounded-2xl shadow-sm group" style={{ border: '1px solid #e5e7eb' }}>
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold pr-4" style={{ color: '#1a4131' }}>{item.q}</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#287b55', color: 'white' }}>+</span>
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
          <div className="rounded-3xl p-12 text-center" style={{ background: 'linear-gradient(135deg, #287b55, #1a4131)' }}>
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Prêt à transformer votre sourire?
            </h2>
            <p className="text-lg mb-8 opacity-80 text-white">
              Consultez Dr Chaussé pour un plan de traitement personnalisé.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:5145214141"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: '#c9a962', color: '#1a4131' }}
              >
                514.521.4141
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold text-white"
                style={{ border: '1px solid rgba(255,255,255,0.4)' }}
              >
                Voir tous les services
              </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
