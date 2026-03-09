// ================================================================
// EXEMPLES D'INTÉGRATION dans page.js
// Ajouter useAnalytics() dans chaque composant concerné
// ================================================================

// 1. IMPORT EN HAUT DU FICHIER
// import { useAnalytics } from '@/hooks/useAnalytics'


// 2. CLICS TÉLÉPHONE — dans Contact() et Emplacements()
// const { track } = useAnalytics()
//
// <a href="tel:5145214141"
//    onClick={() => track('click_phone', '514-521-4141')}
//    className="...">
//   514.521.4141
// </a>


// 3. SOUMISSION FORMULAIRE — dans handleSubmit()
// if (response.ok) {
//   track('form_submit', formData.sujet || 'sans-sujet')  // ← ajouter cette ligne
//   setFormStatus('success')
//   ...
// }


// 4. CLICS CLINIQUES — dans Emplacements()
// <div onClick={() => track('click_clinic', b.ville)} ...>


// 5. BOUTON RENDEZ-VOUS HERO
// <a href="#contact"
//    onClick={() => track('click_rdv', 'hero')}
//    className="...">
//   Prendre rendez-vous
// </a>


// 6. PAGE VIEW AUTOMATIQUE — dans layout.js
// 'use client'
// import { useEffect } from 'react'
// import { useAnalytics } from '@/hooks/useAnalytics'
//
// function PageViewTracker() {
//   const { track } = useAnalytics()
//   useEffect(() => { track('page_view') }, [track])
//   return null
// }
//
// // Puis dans RootLayout :
// <body>
//   <PageViewTracker />
//   <ConditionalLayout>{children}</ConditionalLayout>
// </body>
