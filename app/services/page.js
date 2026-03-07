import Link from 'next/link';
import { servicesList } from '../../lib/services-data';

export const metadata = {
  title: 'Nos Services | Dr Serge Chaussé Dentiste Montréal',
  description: 'Découvrez tous les services dentaires offerts par Dr Serge Chaussé à Montréal : implants, All-on-4, chirurgie osseuse, ATM, orthodontie, botox.',
};

export default function ServicesPage() {
  const services = servicesList['fr'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f5' }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#1a4131' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, #c9a962, transparent)', transform: 'translate(30%, -30%)' }}/>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: '#c9a962' }}>
            Expertise dentaire complète
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Nos spécialités
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            40 ans d&apos;expertise au service de votre sourire. Chaque traitement, pensé pour vous.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
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
                  <span className="text-sm font-medium">En savoir plus</span>
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
            Pas sûr de quel traitement vous avez besoin?
          </h2>
          <p className="mb-8 text-lg opacity-80">
            Une consultation suffit pour établir le plan idéal pour vous.
          </p>
          <a
            href="tel:5145214141"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: '#c9a962', color: '#1a4131' }}
          >
            514.521.4141
          </a>
        </div>
      </div>
    </div>
  );
}
