# Résumé de session — Dr Chaussé Website
## Date : 9 mars 2026

---

## 🌐 Domaine
- **Domaine live** : `https://www.dentiste.com`
- **Registraire** : Network Solutions
- **Hébergement** : Vercel (projet `dr-chausse-website`)
- **DNS configurés** : Enregistrements A (`@`, `www`, `*`) → `76.76.21.21`
- **Ancien site** : dentiste.com (hébergé ailleurs) — contenu récupéré via HTTrack avant bascule

---

## 📄 Pages créées ou modifiées

### `/avantapres` — nouvelle page
- Fichier : `app/avantapres/page.jsx`
- Hero vert, section avis RateMDs, grille de cas cliniques avant/après
- Tableau `cas[]` à remplir avec les vraies photos (champ `photo:`)
- Analytics : `track('page_view', '/avantapres')`

### `/apropos` — modifiée
- Fichier : `app/apropos/page.jsx`
- **Photo remplacée par vidéo YouTube** : `https://www.youtube.com/watch?v=k649xMCcHLo`
- Iframe embed avec `aspect-video`, `rounded-2xl`, `allowFullScreen`

### `/blog` — nouvelle page
- Fichier : `app/blog/page.jsx`
- **Server Component** — fetche RSS Blogspot automatiquement toutes les heures
- Source : `https://docchausse.blogspot.com/feeds/posts/default?alt=rss&max-results=20`
- Affiche : titre, date, extrait, image, catégories, lien externe
- Revalidation : `{ next: { revalidate: 3600 } }`

### `/confidentialite` — nouvelle page
- Fichier : `app/confidentialite/page.jsx`
- Politique de confidentialité conforme **Loi 25 Québec** + **RGPD**
- Couvre : cookies, Google Analytics, formulaire contact, droits des utilisateurs
- `robots: { index: false }` — page non indexée par Google

### Page principale `/` — modifiée
- Cadre vert (cliniques) retiré de la section Contact
- Formulaire centré, max-width `2xl`, courriel + téléphone sur même rangée
- Nouvelle option "Demande de rendez-vous" dans le select sujet

---

## 🧩 Composants créés

### `components/CookieBanner.jsx`
- Bannière fixe en bas de page (z-50)
- Boutons : **Accepter** / **Refuser**
- Mémorise le choix dans `localStorage` (`cookie-consent`)
- Intègre `gtag('consent', 'update')` pour activer/désactiver Google Analytics
- Lien vers `/confidentialite`
- Apparaît après 1 seconde, ne réapparaît plus après choix

### `components/SchemaOrg.jsx`
- `SchemaDentiste()` — Schema.org complet : Physician + 2× Dentist + WebSite
- `SchemaFAQ()` — 4 questions/réponses pour résultats enrichis Google
- `SchemaFormation()` — Schema Course pour la page `/formation`
- Injecté dans `app/layout.js` via `<head>`

---

## 🔍 SEO — Fichiers déployés

| Fichier | Destination | Description |
|---|---|---|
| `layout_seo.js` | `app/layout.js` | Metadata globales, OG, Twitter Cards, Schema, GA |
| `sitemap.js` | `app/sitemap.js` | Sitemap automatique Next.js 14 |
| `robots.js` | `app/robots.js` | Robots.txt + blocage bots IA |
| `apropos_layout.js` | `app/apropos/layout.js` | Metadata page À propos |
| `formation_layout.js` | `app/formation/layout.js` | Metadata page Formation |
| `avantapres_layout.js` | `app/avantapres/layout.js` | Metadata page Avant/Après |

### Domaine dans tous les fichiers SEO
```
https://www.dentiste.com
```

### Mots-clés cibles principaux
- `dentiste Montréal`, `implants dentaires Montréal`
- `Dr Serge Chaussé`, `CEREC Montréal`, `All-on-4 Montréal`
- `dentiste Plateau Mont-Royal`
- `formation implantologie`, `formateur dentiste Montréal`
- `dentiste Saint-Jean-sur-Richelieu`

---

## 📊 Google Search Console
- **Propriété ajoutée** : `dentiste.com` (type Domaine)
- **Code TXT** de vérification ajouté dans DNS Network Solutions
- **À faire** : soumettre le sitemap → `https://www.dentiste.com/sitemap.xml`

---

## 🗂️ Structure des fichiers — État actuel

```
dr-chausse-website/
├── app/
│   ├── layout.js                ✅ SEO complet + CookieBanner
│   ├── page.js                  ✅ Hero + Emplacements + Contact (sans cadre vert)
│   ├── sitemap.js               ✅ nouveau
│   ├── robots.js                ✅ nouveau
│   ├── apropos/
│   │   ├── page.jsx             ✅ vidéo YouTube
│   │   └── layout.js            ✅ metadata SEO
│   ├── formation/
│   │   ├── page.jsx             ✅ existant
│   │   └── layout.js            ✅ metadata SEO
│   ├── avantapres/
│   │   ├── page.jsx             ✅ nouveau
│   │   └── layout.js            ✅ metadata SEO
│   ├── blog/
│   │   └── page.jsx             ✅ nouveau (RSS Blogspot)
│   └── confidentialite/
│       └── page.jsx             ✅ nouveau
└── components/
    ├── Navigation.jsx           (ajouter lien Blog + Avant/Après)
    ├── Footer.jsx               ✅ corrigé (lien implantologycourses)
    ├── SchemaOrg.jsx            ✅ nouveau
    └── CookieBanner.jsx         ✅ nouveau
```

---

## ⚠️ À faire prochainement

- [ ] Ajouter **"Blog"** dans `Navigation.jsx` → `/blog`
- [ ] Créer image Open Graph `/public/images/og-image.jpg` (1200×630px)
- [ ] Remplacer `REMPLACER_PAR_TON_CODE_SEARCH_CONSOLE` dans `layout.js`
- [ ] Soumettre sitemap dans Google Search Console
- [ ] Ajouter les vraies photos avant/après dans `app/avantapres/page.jsx` (tableau `cas[]`)
- [ ] Récupérer contenu/images de l'ancien `dentiste.com` via HTTrack
- [ ] Intégration YouTube sur d'autres pages (`/ma-vie` — déjà prévu)

---

## 🔑 Infos techniques importantes

| Élément | Valeur |
|---|---|
| Google Analytics | `G-6ERJEBXPZW` |
| Vidéo YouTube apropos | `k649xMCcHLo` |
| IP Vercel | `76.76.21.21` |
| RSS Blogspot | `https://docchausse.blogspot.com/feeds/posts/default?alt=rss` |
| Supabase buckets photos | `famille`, `voyages`, `plongee`, `aventures` |
