# Résumé de séance — Site Dr Serge Chaussé
**Dernière mise à jour :** 15 mai 2026
**Sessions documentées :** 12 mars + 21 mars + 15 mai 2026
**Projet :** dentiste.com · Next.js 14 · GitHub `schausse-hash/dr-chausse-website`
**Supabase :** `bjxplcepfhwnwiuyovxw` (dentiste)

---

## 🔒 SESSION 5 — SÉCURITÉ RLS (15 mai 2026)

### Contexte
Suite à l'annonce Supabase du 30 octobre 2026 (nouvelles tables `public` nécessiteront des `GRANT` explicites), audit complet effectué sur les 3 projets Supabase (LBMA, dentiste.com, FaceHub). dentiste.com était globalement en bon état grâce aux fonctions `is_admin()` / `is_editor_or_admin()`, mais il restait du **fine-tuning** à faire.

### ✅ 3 problèmes corrigés

#### 5.1 — `ma_vie_videos` : policies nommées « Auth » mais avec USING(true)
Le nom disait "Auth delete/insert/update" mais la condition était `true` → n'importe qui avec la clé anon pouvait modifier les vidéos. Corrigé en remplaçant par `auth.uid() IS NOT NULL`.

#### 5.2 — `analytics_events` et `visites` : lecture publique du tracking
Ces tables contiennent `user_agent`, `session_id`, `referrer`, `page`. Sous la Loi 25, `user_agent` peut être considéré comme identifiant. Avant : lecture publique. Après :
```sql
INSERT WITH CHECK (true)                 -- tracking côté browser OK
SELECT USING (is_editor_or_admin())      -- lecture staff seulement
```

#### 5.3 — `services` : policy permissive qui annulait le contrôle
La table `services` avait `services_editor_admin_all` (via `is_editor_or_admin()`) MAIS aussi `Admin can update services` UPDATE TO {authenticated} `USING(true)`. Les policies étant en OR, la deuxième annulait le contrôle de la première pour UPDATE. **Supprimée.**

### Concepts clés appris
- **Policies en OR** : si plusieurs policies couvrent la même opération, il suffit qu'**une seule** retourne TRUE pour autoriser l'action. Donc avoir une policy stricte ET une policy permissive = la permissive l'emporte.
- **Loi 25 Québec** : `user_agent`, `session_id`, IP, etc. peuvent être considérés comme identifiants → à restreindre.

### Audit final propre

4 policies `USING(true)` restantes, toutes **légitimes** :

| Table | Policy | Pourquoi |
|---|---|---|
| `analytics_events` INSERT | Public can insert tracking events | Tracking browser anonyme |
| `leads` INSERT | leads_public_insert | Formulaire contact public |
| `site_settings` SELECT | site_settings_public_read | Settings publics (logo, couleurs) |
| `visites` INSERT | Public can insert visit tracking | Tracking visites |

### Fichiers créés ce jour
- `sql/SECURITE-15mai2026.md` — documentation de la remédiation
- `sql/rollback-policies-15mai2026.sql` — rollback si besoin
- `sql/dump-securite-15mai2026.sql` — dump complet idempotent (fonctions + policies)
- `resume-seance-dr-chausse-15mai2026.md` — ce document

---

## 📦 SESSION 4 — Système patients + envois de masse (21 mars 2026)

### Contexte
Import de la liste de patients `liste_ouvert_2025.xls` (exporté du logiciel dentaire) dans Supabase, avec système d'envoi de masse via Resend.

### Analyse du fichier source
- **1 524 dossiers** originaux (patients et familles)
- **10 colonnes :** `traiter`, `nom`, `prenom`, `courriel`, `adresse`, `telephone`, `ville`, `province`, `code_postal`, `patid`
- Champ `prenom` vide dans tous les dossiers — le nom complet est dans `nom`
- **282 dossiers familles** avec plusieurs courriels séparés par `;`
- **Décision :** séparer chaque courriel = un dossier individuel
- Après séparation + déduplication : **2 518 dossiers uniques** (2 517 avec courriel)

### Tables Supabase créées

**`patients`**
```sql
CREATE TABLE patients (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patid       INTEGER,
  nom         TEXT NOT NULL,
  courriel    TEXT UNIQUE,
  telephone   TEXT,
  adresse     TEXT,
  ville       TEXT,
  province    TEXT,
  code_postal TEXT,
  actif       BOOLEAN DEFAULT true,
  desabonne   BOOLEAN DEFAULT false,   -- désabonnement infolettre (Loi 25)
  source      TEXT DEFAULT 'import_2025',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
```

**`envois`** — historique des campagnes (sujet, nb_envoyes, nb_erreurs, statut)
**`envois_log`** — log détaillé par destinataire (`envoye` | `erreur` | `rebondi`)

RLS activé sur les 3 tables (`auth.role() = 'authenticated'`).

### Index importants
```sql
-- Index partiel sur courriel (permet plusieurs NULL sans conflit)
CREATE UNIQUE INDEX idx_patients_courriel ON patients(courriel) WHERE courriel IS NOT NULL;

-- Index fonctionnel sur nom — OBLIGATOIRE
-- Les champs "Famille X, Y, Z..." dépassent la limite btree de 2704 bytes
CREATE INDEX idx_patients_nom ON patients(LEFT(nom, 100));
```

### Import des données — obstacles rencontrés

| Problème | Cause | Solution |
|----------|-------|----------|
| `duplicate key — patients_courriel_key` | Import partiel existant | `TRUNCATE TABLE patients RESTART IDENTITY CASCADE` |
| `index row size 5424 exceeds maximum 2704` | Noms de famille très longs | `DROP INDEX idx_patients_nom` + recréer avec `LEFT(nom, 100)` |
| Import CSV bloqué à 1 433 / 2 518 | Timeout Supabase Table Editor | INSERT SQL par blocs de 200 avec `ON CONFLICT DO NOTHING` |

Résultat final : ✅ **2 518 dossiers importés**

### Fichiers créés

| Fichier | Destination dans le repo |
|---------|--------------------------|
| `01_supabase_patients.sql` | Référence SQL — création des 3 tables |
| `patients_import_propre.csv` | CSV nettoyé (2 518 lignes) |
| `app/api/patients/send-mass/route.js` | API envoi de masse |
| `app/api/desabonnement/route.js` | Désabonnement public (Loi 25) |
| `components/AdminPatients.jsx` | Onglet admin Patients |

### Route API — Envoi de masse (`/api/patients/send-mass`)
- Auth Supabase requise (POST)
- Fetche tous les patients `actif = true`, `desabonne = false`, courriel non null
- Envoi via Resend — **batch de 50**, pause 1 sec entre chaque batch
- Variables disponibles dans le message : `{{nom}}`, `{{prenom}}`
- **Lien de désabonnement ajouté automatiquement** en pied de chaque courriel
- Log de chaque envoi dans `envois_log`
- Sender : `Dr Serge Chaussé <schausse@dentiste.com>`

### Route API — Désabonnement (`/api/desabonnement`)
- Route **publique** (sans auth)
- `GET /api/desabonnement?email=xxx` → `desabonne = true` dans Supabase
- Redirige vers `/desabonnement-confirme` (page à créer)
- Obligatoire — **Loi 25 Québec**

### Composant AdminPatients (`components/AdminPatients.jsx`)
Onglet `👥 Patients` intégré dans `app/admin/page.js` :
- Liste paginée (50 par page) avec recherche nom / courriel / ville
- Activation / désactivation individuelle
- Compteur de destinataires actifs en temps réel
- Éditeur de message HTML avec variables `{{nom}}` et `{{prenom}}`
- Historique des 20 derniers envois (date, sujet, nb envoyés, erreurs)

---

## 🔍 SESSION 3 — Contenu services SQL (12 mars 2026)

### Script SQL exécuté
Contenu complet inséré pour les 9 services via `UPDATE ... WHERE slug = '...'` :

| Slug | Titre |
|------|-------|
| `implants-dentaires` | Implants dentaires |
| `chirurgie-osseuse` | Chirurgie osseuse & Greffe |
| `chirurgie-dents-de-sagesse` | Chirurgie des dents de sagesse |
| `botox-esthetique` | Botox esthétique et thérapeutique |
| `orthodontie-invisalign` | Orthodontie & Invisalign |
| `parodontie` | Parodontie |
| `rehabilitation-complete` | Réhabilitation complète |
| `all-on-4` | All-on-4 |
| `douleur-atm-botox` | Douleur ATM & Botox thérapeutique |

Chaque service contient : `excerpt`, `content` (3 sections avec titre/texte/liste), `seo_title`, `seo_description`

### Bug corrigé — `content.map is not a function`
Supabase retourne `content` comme string JSON au lieu d'array.

**Fix dans `app/admin/page.js` — `ServiceEditor` :**
```js
const [form, setForm] = useState({
  ...service,
  content: typeof service.content === 'string'
    ? JSON.parse(service.content)
    : (service.content || [])
})
```

**Fix dans `app/services/[slug]/page.js` :**
```js
const content = Array.isArray(service.content)
  ? service.content
  : typeof service.content === 'string'
    ? JSON.parse(service.content)
    : []
```

### Schema FAQ — Doublon corrigé
**Problème :** `SchemaFAQ` était dans `app/layout.js` (toutes les pages) → doublon détecté par Google.
**Fix :** retiré du layout, ajouté dans `app/page.js` seulement. ✅ 1 élément valide dans Search Console.

---

## 🔎 SESSION 2 — Google Business Profile (12 mars 2026)

- Fiche "Centre Dentaire Serge Chaussé" — 4.9 ⭐ 393 avis
- Le site pointe vers `cliniquedentaireboulevardsaintjoseph.ca` (acheteurs)
- Les acheteurs gardent le nom "Centre Dentaire Serge Chaussé" sur leur site
- **Décision :** laisser la fiche telle quelle — les avis restent liés à la clinique physique
- `dentiste.com` = vitrine personnelle Dr Serge Chaussé (distincte)

---

## 🌐 SESSION 1 — Google Search Console & Redirections (12 mars 2026)

### Problèmes réglés
- **3 erreurs 404** corrigées via redirections 301 dans `next.config.js`
- **FAQ schema en double** corrigé
- **Validation demandée** dans Search Console pour les 404 ✅

### Redirections 301 — `next.config.js`
**144 anciennes URLs** de l'ancien site redirigées intelligemment :
- Implants → `/services/implants-dentaires`
- All-on-4 → `/services/all-on-4`
- Chirurgie osseuse → `/services/chirurgie-osseuse`
- Dents de sagesse → `/services/chirurgie-dents-de-sagesse`
- Orthodontie → `/services/orthodontie-invisalign`
- Parodontie → `/services/parodontie`
- Réhabilitation → `/services/rehabilitation-complete`
- Blanchiment/laser → `/services`
- Couronnes/CEREC → `/services`
- Équipe/À propos → `/apropos`
- Contact/RDV → `/#contact`
- Famille/projets → `/ma-vie`
- Accueil → `/`

### État Search Console
- ✅ Page indexée, HTTPS ok, FAQ 1 élément valide
- ✅ Validation 404 commencée (11/03/2026)
- 144 "Page avec redirection" — Google re-crawlera automatiquement

---

## 🚧 À faire — Prochaines séances

### 🔴 Urgent
- [ ] **Fix page publique services** — `app/services/[slug]/page.js` — JSON.parse si string
- [ ] **Page `/desabonnement-confirme`** — page de confirmation après désabonnement
- [ ] **Images services** — ajouter une image principale par service dans l'admin
- [ ] **5 articles blog** — entrer dans l'admin

### 🟡 Moyen terme
- [ ] **Premier envoi de masse** — tester avec un petit groupe (ex: filtrer par ville)
- [ ] **YouTube** — intégrer vidéos sur pages services
- [ ] **Pagination blog** — si beaucoup d'articles

### 🟢 Optionnel
- [ ] **Version anglaise** — structure `locale` déjà en place
- [ ] **Prise de RDV en ligne** — Calendly ou système custom

### ✅ Terminé le 15 mai 2026
- [x] ~~RLS policies redondantes et conflits~~
- [x] ~~Tracking analytics_events / visites trop ouvert~~
- [x] ~~Services UPDATE policy permissive~~
- [x] ~~ma_vie_videos USING(true)~~

---

## 📌 IDs et références importants

| Élément | Valeur |
|---|---|
| Supabase projet | `bjxplcepfhwnwiuyovxw` |
| URL production | `www.dentiste.com` (Vercel) |
| GitHub | `schausse-hash/dr-chausse-website` |
| Stack | Next.js 14 + Supabase + Resend + Vercel |
| User admin | `schausse@gmail.com` |
| Tables principales | `patients` (2 518), `articles`, `services` (9), `pages`, `sections`, `locations`, `leads`, `avant_apres`, `ma_vie_videos`, `envois`, `envois_log`, `analytics_events`, `visites`, `site_settings`, `profiles` |
| Documentation sécurité | `sql/SECURITE-15mai2026.md` |
| Dump complet | `sql/dump-securite-15mai2026.sql` |
| Rollback | `sql/rollback-policies-15mai2026.sql` |
| Fonctions Postgres | `is_admin()`, `is_editor_or_admin()` (basées sur `profiles.role`) |

---

## 💡 Conventions de code

- **Auth admin** : Supabase Auth (pas localStorage comme LBMA)
- **Rôles** : `admin`, `editor`, autres (stockés dans `profiles.role`)
- **Pattern policies** : utiliser `is_editor_or_admin()` ou `is_admin()` selon le niveau
- **Loi 25** : conformité requise — désabonnement obligatoire, lien automatique en pied de courriel
- **Sender courriel** : `Dr Serge Chaussé <schausse@dentiste.com>` via Resend
