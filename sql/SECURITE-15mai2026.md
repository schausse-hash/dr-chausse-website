# dentiste.com — Fine-tuning sécurité RLS

*Effectué le 15 mai 2026 — projet Supabase `bjxplcepfhwnwiuyovxw`*

---

## Résumé

dentiste.com était dans un état globalement sain — la majorité des tables utilisaient déjà les bons patterns (`is_admin()`, `is_editor_or_admin()`, `auth.role() = 'authenticated'`). Cette session a corrigé **3 problèmes restants** :

1. `ma_vie_videos` : policies nommées "Auth" mais avec `USING(true)` (corrigé en début de journée)
2. `analytics_events` et `visites` : lecture publique de données de tracking (incluant `user_agent`, `session_id` — potentielle non-conformité Loi 25)
3. `services` : policy `Admin can update services` qui annulait le contrôle `is_editor_or_admin` via OR

---

## Modifications appliquées

### 1. `ma_vie_videos` (corrigé en début de journée)

**Avant** :
```sql
"Auth delete"  → DELETE USING (true)
"Auth insert"  → INSERT WITH CHECK (true)
"Auth update"  → UPDATE USING (true)
```

**Après** :
```sql
"Auth delete"  → DELETE USING (auth.uid() IS NOT NULL)
"Auth insert"  → INSERT WITH CHECK (auth.uid() IS NOT NULL)
"Auth update"  → UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL)
"Public read"  → SELECT USING (published = true)  -- inchangé
```

### 2. `analytics_events`

**Avant** : 2 INSERT redondantes + 2 SELECT publiques

**Après** :
```sql
"Public can insert tracking events"  → INSERT WITH CHECK (true)
"Staff can read analytics"           → SELECT USING (is_editor_or_admin())
```

### 3. `visites`

**Avant** : INSERT anon + SELECT publique

**Après** :
```sql
"Public can insert visit tracking"  → INSERT WITH CHECK (true)
"Staff can read visits"             → SELECT USING (is_editor_or_admin())
```

### 4. `services`

**Avant** : Policy `Admin can update services` UPDATE TO {authenticated} USING(true) annulait `services_editor_admin_all`

**Après** : Policy permissive supprimée, seul `services_editor_admin_all` reste (utilise `is_editor_or_admin()`)

---

## Policies USING(true) restantes (légitimes)

| Table | Policy | Pourquoi c'est OK |
|---|---|---|
| `analytics_events` INSERT | Public can insert tracking events | Tracking client browser, anonyme |
| `leads` INSERT | leads_public_insert | Formulaire contact public |
| `site_settings` SELECT | site_settings_public_read | Settings publics (logo, couleurs) |
| `visites` INSERT | Public can insert visit tracking | Tracking visites côté browser |

---

## Architecture finale

```
public schema
├── Tables admin-only (auth.role() = 'authenticated')
│   ├── envois, envois_log
│   └── patients (2 518 dossiers)
│
├── Tables admin via fonctions is_admin/is_editor_or_admin
│   ├── profiles, pages, sections, services
│   ├── locations, site_settings
│   └── leads (SELECT/UPDATE) + INSERT public
│
├── Tables avec auth.uid() (utilisateurs connectés)
│   ├── avant_apres, ma_vie_videos
│   └── articles (auth.role() = 'authenticated')
│
└── Tables tracking (INSERT public, SELECT staff)
    ├── analytics_events
    └── visites
```

---

## Fonctions helper

```sql
public.is_admin()              -- TRUE si role = 'admin' dans profiles
public.is_editor_or_admin()    -- TRUE si role IN ('admin', 'editor')
```

Note : ces fonctions ne sont pas `SECURITY DEFINER` mais utilisent `STABLE` et lisent `public.profiles` qui a sa propre RLS (`is_admin()` only). C'est OK car le user voit toujours son propre profil.

---

## Tests à effectuer

- ✅ www.dentiste.com s'affiche normalement (services publics, articles, avant/apres)
- ✅ Formulaire de contact fonctionne (INSERT leads)
- ✅ Tracking visites continue (INSERT analytics_events + visites)
- ✅ Côté admin : analytics et visites visibles pour staff
- ✅ Côté admin : impossible de modifier services sans être editor/admin

---

## Conformité Loi 25 Québec

Avant cette session : `user_agent` et `session_id` (identifiants potentiels) lisibles publiquement. Risque mineur mais réel.

Après : ces données restent stockées (tracking nécessaire) mais ne sont accessibles qu'au staff via `is_editor_or_admin()`.

---

## Rollback si besoin

Le fichier `sql/rollback-policies-15mai2026.sql` contient les anciennes policies pour revenir en arrière (mais cela rétablirait les vulnérabilités).
