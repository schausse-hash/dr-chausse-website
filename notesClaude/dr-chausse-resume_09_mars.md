# Dr Chaussé Website — Résumé de session
## 9 mars 2026

## Stack
- **Framework**: Next.js 14.2.3, Tailwind CSS, Lucide React
- **Backend**: Supabase (auth + storage + database)
- **Déploiement**: Vercel
- **URL prod**: https://www.dentiste.com
- **GitHub**: schausse-hash/dr-chausse-website
- **Google Analytics**: G-6ERJEBXPZW

## Infos techniques
| Élément | Valeur |
|---|---|
| Couleur brand | `#287b55` |
| Font | Playfair Display |
| IP Vercel | `76.76.21.21` |
| Registraire DNS | Network Solutions |
| YouTube À propos | `k649xMCcHLo` |
| RSS Blog | `https://docchausse.blogspot.com/feeds/posts/default?alt=rss` |

## Cliniques
- **Montréal**: 1277 Bd Saint-Joseph E, H2J 1L9 | 514-521-4141
- **St-Jean-sur-Richelieu**: 413 Boul. Saint-Luc, J2W 2A3 | 450 349-3368

---

## Accompli aujourd'hui (9 mars)

### 🔧 Corrections
- **Menu admin** : corrigé en remplaçant `<Navigation />` + `<Footer />` par `<ConditionalLayout>` dans `app/layout.js`
- **Analytics** : ajout lien `← Retour à l'administration`
- **Login** : ajout bouton **"Mot de passe oublié?"** avec envoi email Supabase
- **Supabase Auth** : Site URL → `https://www.dentiste.com`, Redirect URLs configurées
- **RLS Storage** : bucket `images` — policies insert/select/delete ajoutées
- **Page /avantapres** : convertie de statique → dynamique (lecture Supabase)

### ✨ Nouvelles fonctionnalités
- **Onglet Avant/Après** dans l'admin : ajout/modification/suppression de cas cliniques, upload photos avant + après, ordre, publié/masqué
- **Table Supabase `avant_apres`** : id, titre, description, photo_avant_url, photo_apres_url, ordre, published
- **Toggle Avant/Après** sur la page publique `/avantapres` : boutons Avant/Après sur chaque carte

---

## Structure admin — État actuel
```
/admin
├── Onglet Services        ✅ liste + éditeur complet
├── Onglet Paramètres      ✅ site_settings
├── Onglet Ma vie          ✅ upload photos 4 buckets
├── Onglet Avant/Après     ✅ NOUVEAU — cas cliniques
└── Lien Analytics →       ✅ /admin/analytics (avec ← retour)
```

## Buckets Supabase Storage
| Bucket | Statut | Policies |
|---|---|---|
| famille | PUBLIC | 3 ✅ |
| voyages | PUBLIC | 3 ✅ |
| plongee | PUBLIC | 3 ✅ |
| aventures | PUBLIC | 3 ✅ |
| images | PUBLIC | 3 ✅ (ajoutées aujourd'hui) |

---

## À faire (prochaine session)

- [ ] Ajouter liens **Blog** + **Avant/Après** dans `Navigation.jsx`
- [ ] Intégration **vidéos YouTube** sur `/ma-vie`
- [ ] Créer image **og-image.jpg** (1200×630px)
- [ ] Valider **Google Search Console** (propagation DNS)
- [ ] Soumettre **sitemap** → `https://www.dentiste.com/sitemap.xml`
- [ ] Remplacer `REMPLACER_PAR_TON_CODE_SEARCH_CONSOLE` dans `app/layout.js`

---

## Notes importantes
- **Login admin** : utiliser l'**email complet** Supabase (pas "admin")
- **Mot de passe oublié** : bouton disponible sur `/admin`, redirige vers `dentiste.com/admin`
- **Git workflow** : toujours `git pull` avant `git push`, éditions sur GitHub.com pour éviter problèmes UTF-16/BOM PowerShell
