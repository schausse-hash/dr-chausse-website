# 🔍 Guide SEO Complet — Dr Serge Chaussé
## Fichiers à déployer

### 1. MÉTADONNÉES PAR PAGE
| Fichier à créer | Destination |
|---|---|
| `apropos_layout.js` | → `app/apropos/layout.js` |
| `formation_layout.js` | → `app/formation/layout.js` |
| `avantapres_layout.js` | → `app/avantapres/layout.js` |

### 2. SCHEMA.ORG
| Fichier | Destination |
|---|---|
| `SchemaOrg.jsx` | → `components/SchemaOrg.jsx` |

### 3. SITEMAP + ROBOTS
| Fichier | Destination |
|---|---|
| `sitemap.js` | → `app/sitemap.js` |
| `robots.js` | → `app/robots.js` |

### 4. LAYOUT GLOBAL
| Fichier | Destination |
|---|---|
| `layout.js` | → `app/layout.js` (remplace l'existant) |

---

## ⚡ Actions manuelles requises

### A. Google Search Console (PRIORITÉ #1)
1. Aller sur https://search.google.com/search-console
2. Ajouter propriété → ton domaine
3. Copier le code de vérification
4. Dans `layout.js`, remplacer `REMPLACER_PAR_TON_CODE_SEARCH_CONSOLE`
5. Soumettre ton sitemap: `https://www.dentiste.com/sitemap.xml`

### B. Image Open Graph
Créer `/public/images/og-image.jpg` (1200×630px)
→ Photo du Dr Chaussé + logo + "Dentiste Montréal depuis 1984"

### C. Domaine dans les fichiers
Remplacer `https://www.dentiste.com` par ton vrai domaine dans:
- `layout.js` (metadataBase)
- `sitemap.js`
- `robots.js`
- tous les `layout.js` de pages

---

## 🏆 Impact attendu

| Action | Impact SEO |
|---|---|
| Schema.org Dentist | ⭐⭐⭐⭐⭐ Apparaît dans Google Maps, Knowledge Panel |
| Métadonnées par page | ⭐⭐⭐⭐⭐ Title/description dans les résultats |
| Search Console | ⭐⭐⭐⭐⭐ Indexation contrôlée, erreurs visibles |
| Sitemap | ⭐⭐⭐⭐ Google découvre toutes tes pages |
| Open Graph | ⭐⭐⭐ Partages réseaux sociaux avec image |
| FAQ Schema | ⭐⭐⭐⭐ Résultats enrichis avec questions/réponses |

---

## 🔑 Mots-clés cibles (par priorité)

### Montréal - Haute intention
- "dentiste implant Montréal"
- "implants dentaires Montréal coût"
- "dentiste Plateau Mont-Royal"
- "Dr Serge Chaussé dentiste"

### Saint-Jean-sur-Richelieu
- "dentiste Saint-Jean-sur-Richelieu"
- "implants dentaires Saint-Jean"

### Formation (niche très précise)
- "formation implantologie Montréal"
- "cours chirurgie implantaire"
- "formateur All-on-4 Canada"
