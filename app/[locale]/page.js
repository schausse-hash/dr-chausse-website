import Link from 'next/link';
import { servicesList } from '../../../lib/services-data';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === 'fr' ? 'Nos Services | Dr Serge Chaussé Dentiste Montréal' : 'Our Services | Dr Serge Chaussé Dentist Montreal',
    description: locale === 'fr'
      ? 'Découvrez tous les services dentaires offerts par Dr Serge Chaussé à Montréal : implants, All-on-4, chirurgie osseuse, ATM, orthodontie, botox.'
      : 'Discover all dental services offered by Dr. Serge Chaussé in Montreal: implants, All-on-4, bone surgery, TMJ, orthodontics, botox.',
  };
}

const icons = {
  'implants-dentaires': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2C9 2 7 4 7 7c0 2 1 3.5 2 5l1 8h4l1-8c1-1.5 2-3 2-5 0-3-2-5-5-5z"/>
      <path d="M9 7h6M10 10h4"/>
    </svg>
  ),
  'all-on-4': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <rect x="3" y="8" width="4" height="10" rx="2"/>
      <rect x="10" y="6" width="4" height="12" rx="2"/>
      <rect x="17" y="8" width="4" height="10" rx="2"/>
      <path d="M5 8V6M12 6V4M19 8V6"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8v4l3 3"/>
    </svg>
  )
};

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const services = servicesList[locale] || servicesList['fr'];
  const isFr = locale === 'fr';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f5' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#1a4131' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #c9a962, transparent)', transform: 'translate(30%, -30%)' }}/>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, #287b55, transparent)', transform: 'translate(-30%, 30%)' }}/>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#c9a962' }}>
            {isFr ? 'Expertise dentaire complète' : 'Complete dental expertise'}
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isFr ? 'Nos spécialités' : 'Our specialties'}
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {isFr
              ? '40 ans d\'expertise au service de votre sourire. Chaque traitement, pensé pour vous.'
              : '40 years of expertise at the service of your smile. Every treatment, designed for you.'}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-2 w-full" style={{ backgroundColor: '#287b55' }}/>
              <div className="p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#f0f7f3', color: '#287b55' }}>
                  {service.icon}
                </div>
                <h2 className="text-xl font-semibold mb-3" style={{ color: '#1a4131', fontFamily: 'Playfair Display, serif' }}>
                  {service.title}
                </h2>
                <div className="flex items-center gap-2 mt-6" style={{ color: '#287b55' }}>
                  <span className="text-sm font-medium">{isFr ? 'En savoir plus' : 'Learn more'}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-3xl p-12 text-center text-white" style={{ background: 'linear-gradient(135deg, #287b55, #1a4131)' }}>
          <h2 className="text-3xl font-serif mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {isFr ? 'Pas sûr de quel traitement vous avez besoin?' : 'Not sure which treatment you need?'}
          </h2>
          <p className="mb-8 text-lg opacity-80">
            {isFr ? 'Une consultation suffit pour établir le plan idéal pour vous.' : 'One consultation is enough to establish the ideal plan for you.'}
          </p>
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
        </div>
      </div>
    </div>
  );
}
