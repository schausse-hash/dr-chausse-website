// components/SchemaOrg.jsx
// À ajouter dans app/layout.js (racine) pour toutes les pages
// ET dans chaque page pour des données spécifiques

'use client'

// ── SCHEMA PRINCIPAL — Dentiste local (à mettre dans app/layout.js) ──
export function SchemaDentiste() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ── Personne / Médecin ────────────────────────────────────
      {
        "@type": "Physician",
        "@id": "https://www.dentiste.com/#docteur",
        "name": "Dr Serge Chaussé",
        "alternateName": "Serge Chaussé DMD",
        "description": "Dentiste chirurgien spécialisé en implantologie et formateur international depuis 1984 à Montréal.",
        "image": "https://www.dentiste.com/images/portrait-principal.jpg",
        "url": "https://www.dentiste.com",
        "telephone": "+15145214141",
        "email": "schausse@dentiste.com",
        "jobTitle": "Chirurgien dentiste & Formateur en implantologie",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Université de Montréal",
          "department": "Faculté de médecine dentaire"
        },
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Doctorat en médecine dentaire (DMD)",
            "educationalLevel": "Doctoral",
            "dateCreated": "1984"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Fellow AAID — American Academy of Implant Dentistry"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Diplomate ABOI — American Board of Oral Implantology"
          }
        ],
        "memberOf": {
          "@type": "Organization",
          "name": "Ordre des dentistes du Québec"
        },
        "sameAs": [
          "https://x.com/sergechausse",
          "https://www.linkedin.com/in/serge-chausse/",
          "https://www.youtube.com/@sergechausse",
          "https://www.ratemds.com/best-doctors/qc/montreal/?text=chausse"
        ]
      },

      // ── Clinique Montréal ─────────────────────────────────────
      {
        "@type": "Dentist",
        "@id": "https://www.dentiste.com/#clinique-montreal",
        "name": "Clinique dentaire du boulevard Saint-Joseph",
        "alternateName": "Centre dentaire Serge Chaussé — Montréal",
        "url": "https://www.cliniquedentaireboulevardsaintjoseph.ca/",
        "telephone": "+15145214141",
        "email": "info@centredentaireboulevardsaintjoseph.ca",
        "image": "https://www.dentiste.com/images/clinique-montreal.jpg",
        "priceRange": "$$",
        "currenciesAccepted": "CAD",
        "paymentAccepted": "Cash, Credit Card, Debit Card",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1277 Boulevard Saint-Joseph Est",
          "addressLocality": "Montréal",
          "addressRegion": "QC",
          "postalCode": "H2J 1L9",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.5290,
          "longitude": -73.5839
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "07:30",
            "closes": "17:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Friday",
            "opens": "08:00",
            "closes": "16:00"
          }
        ],
        "medicalSpecialty": [
          "Implantologie dentaire",
          "Chirurgie orale",
          "Prosthodontie",
          "Orthodontie",
          "CEREC 3D"
        ],
        "hasMap": "https://maps.google.com/?q=1277+Bd+Saint-Joseph+E,+Montréal,+QC+H2J+1L9",
        "doctor": { "@id": "https://www.dentiste.com/#docteur" }
      },

      // ── Clinique Saint-Jean-sur-Richelieu ─────────────────────
      {
        "@type": "Dentist",
        "@id": "https://www.dentiste.com/#clinique-stJean",
        "name": "Centre dentaire Saint-Luc",
        "alternateName": "Clinique dentaire Saint-Jean-sur-Richelieu",
        "url": "https://centredentairest-luc.com/",
        "telephone": "+14503493368",
        "email": "centredentairest-luc@videotron.ca",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "413 Boulevard Saint-Luc",
          "addressLocality": "Saint-Jean-sur-Richelieu",
          "addressRegion": "QC",
          "postalCode": "J2W 2A3",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.3230,
          "longitude": -73.2644
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
            "opens": "09:00",
            "closes": "20:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Friday",
            "opens": "08:00",
            "closes": "16:00"
          }
        ],
        "doctor": { "@id": "https://www.dentiste.com/#docteur" }
      },

      // ── Site web ──────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": "https://www.dentiste.com/#website",
        "url": "https://www.dentiste.com",
        "name": "Dr Serge Chaussé — Dentiste & Formateur",
        "description": "Site officiel du Dr Serge Chaussé, dentiste chirurgien et formateur international en implantologie à Montréal.",
        "inLanguage": "fr-CA",
        "publisher": { "@id": "https://www.dentiste.com/#docteur" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.dentiste.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── SCHEMA PAGE FORMATION (à ajouter dans app/formation/page.jsx) ──
export function SchemaFormation() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Formation en implantologie dentaire — Dr Serge Chaussé",
    "description": "Formation hands-on en chirurgie implantaire avec le Dr Serge Chaussé. Tutorat personnalisé, cours en République Dominicaine.",
    "provider": {
      "@type": "Person",
      "name": "Dr Serge Chaussé",
      "url": "https://www.dentiste.com"
    },
    "educationalLevel": "Professionnel",
    "inLanguage": "fr",
    "url": "https://www.dentiste.com/formation",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "CAD",
      "seller": {
        "@type": "Person",
        "name": "Dr Serge Chaussé"
      }
    }
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── SCHEMA FAQ (à personnaliser et ajouter dans page.js accueil) ──
export function SchemaFAQ() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien coûte un implant dentaire à Montréal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le coût d'un implant dentaire varie selon la complexité du cas. Le Dr Chaussé offre une consultation gratuite pour évaluer votre situation et vous présenter un plan de traitement personnalisé."
        }
      },
      {
        "@type": "Question",
        "name": "Est-ce que le Dr Chaussé accepte de nouveaux patients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, le Dr Serge Chaussé accepte de nouveaux patients dans ses deux cliniques à Montréal (514.521.4141) et Saint-Jean-sur-Richelieu (450 349-3368)."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que la technique All-on-4?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'All-on-4 est une technique de réhabilitation dentaire complète utilisant seulement 4 implants pour supporter une prothèse fixe complète. Le Dr Chaussé est certifié par le Dr Paulo Malo, inventeur de cette technique."
        }
      },
      {
        "@type": "Question",
        "name": "Le Dr Chaussé offre-t-il de la formation en implantologie?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, le Dr Chaussé est formateur international depuis plus de 17 ans. Il offre des cours hands-on personnalisés, participe aux formations Trinon en Allemagne et organise des cours en République Dominicaine."
        }
      }
    ]
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
