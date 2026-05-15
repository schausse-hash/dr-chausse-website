-- =====================================================================
-- dentiste.com — DUMP COMPLET SÉCURITÉ (policies + fonctions)
-- =====================================================================
-- Projet Supabase : bjxplcepfhwnwiuyovxw (dentiste)
-- URL : https://bjxplcepfhwnwiuyovxw.supabase.co
-- Généré le : 15 mai 2026
--
-- Ce fichier permet de RECRÉER intégralement les policies RLS et
-- fonctions actuelles. À utiliser pour :
--   - Restaurer la sécurité sur une nouvelle instance Supabase
--   - Vérifier l'état actuel vs. cible
--   - Documentation et audit
--
-- ⚠️ AVANT d'exécuter ce script sur une autre BD : s'assurer que les
--    tables existent déjà.
-- =====================================================================


-- =====================================================================
-- SECTION 1 : FONCTIONS HELPER
-- =====================================================================

-- 1.1 — is_admin()
--      Retourne TRUE si l'utilisateur courant a le rôle 'admin'
--      Utilise public.profiles

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role = 'admin'
  );
$function$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;


-- 1.2 — is_editor_or_admin()
--      Retourne TRUE si rôle 'admin' ou 'editor'

CREATE OR REPLACE FUNCTION public.is_editor_or_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  select exists (
    select 1 from public.profiles p
    where p.user_id = auth.uid() and p.role in ('admin','editor')
  );
$function$;

GRANT EXECUTE ON FUNCTION public.is_editor_or_admin() TO anon, authenticated, service_role;


-- =====================================================================
-- SECTION 2 : ENABLE RLS sur toutes les tables
-- =====================================================================

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avant_apres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.envois ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.envois_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ma_vie_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visites ENABLE ROW LEVEL SECURITY;


-- =====================================================================
-- SECTION 3 : POLICIES RLS (état au 15 mai 2026 après remédiation)
-- =====================================================================

-- ===== analytics_events =====
DROP POLICY IF EXISTS "Public can insert tracking events" ON public.analytics_events;
CREATE POLICY "Public can insert tracking events"
  ON public.analytics_events FOR INSERT TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can read analytics" ON public.analytics_events;
CREATE POLICY "Staff can read analytics"
  ON public.analytics_events FOR SELECT TO public
  USING (is_editor_or_admin());

-- ===== articles =====
DROP POLICY IF EXISTS "articles_admin_all" ON public.articles;
CREATE POLICY "articles_admin_all"
  ON public.articles FOR ALL TO public
  USING (auth.role() = 'authenticated'::text);

DROP POLICY IF EXISTS "articles_public_read" ON public.articles;
CREATE POLICY "articles_public_read"
  ON public.articles FOR SELECT TO public
  USING (published = true);

-- ===== avant_apres =====
DROP POLICY IF EXISTS "avant_apres_auth_delete" ON public.avant_apres;
CREATE POLICY "avant_apres_auth_delete"
  ON public.avant_apres FOR DELETE TO public
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "avant_apres_auth_insert" ON public.avant_apres;
CREATE POLICY "avant_apres_auth_insert"
  ON public.avant_apres FOR INSERT TO public
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "avant_apres_public_read" ON public.avant_apres;
CREATE POLICY "avant_apres_public_read"
  ON public.avant_apres FOR SELECT TO public
  USING (published = true);

DROP POLICY IF EXISTS "avant_apres_auth_update" ON public.avant_apres;
CREATE POLICY "avant_apres_auth_update"
  ON public.avant_apres FOR UPDATE TO public
  USING (auth.uid() IS NOT NULL);

-- ===== envois =====
DROP POLICY IF EXISTS "admin seulement" ON public.envois;
CREATE POLICY "admin seulement"
  ON public.envois FOR ALL TO public
  USING (auth.role() = 'authenticated'::text);

-- ===== envois_log =====
DROP POLICY IF EXISTS "admin seulement" ON public.envois_log;
CREATE POLICY "admin seulement"
  ON public.envois_log FOR ALL TO public
  USING (auth.role() = 'authenticated'::text);

-- ===== leads =====
DROP POLICY IF EXISTS "leads_public_insert" ON public.leads;
CREATE POLICY "leads_public_insert"
  ON public.leads FOR INSERT TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "leads_editor_admin_select" ON public.leads;
CREATE POLICY "leads_editor_admin_select"
  ON public.leads FOR SELECT TO public
  USING (is_editor_or_admin());

DROP POLICY IF EXISTS "leads_editor_admin_update" ON public.leads;
CREATE POLICY "leads_editor_admin_update"
  ON public.leads FOR UPDATE TO public
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

-- ===== locations =====
DROP POLICY IF EXISTS "locations_editor_admin_all" ON public.locations;
CREATE POLICY "locations_editor_admin_all"
  ON public.locations FOR ALL TO public
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

DROP POLICY IF EXISTS "locations_public_read_active" ON public.locations;
CREATE POLICY "locations_public_read_active"
  ON public.locations FOR SELECT TO public
  USING (is_active = true);

-- ===== ma_vie_videos =====
DROP POLICY IF EXISTS "Auth delete" ON public.ma_vie_videos;
CREATE POLICY "Auth delete"
  ON public.ma_vie_videos FOR DELETE TO public
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Auth insert" ON public.ma_vie_videos;
CREATE POLICY "Auth insert"
  ON public.ma_vie_videos FOR INSERT TO public
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Public read" ON public.ma_vie_videos;
CREATE POLICY "Public read"
  ON public.ma_vie_videos FOR SELECT TO public
  USING (published = true);

DROP POLICY IF EXISTS "Auth update" ON public.ma_vie_videos;
CREATE POLICY "Auth update"
  ON public.ma_vie_videos FOR UPDATE TO public
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ===== pages =====
DROP POLICY IF EXISTS "pages_editor_admin_all" ON public.pages;
CREATE POLICY "pages_editor_admin_all"
  ON public.pages FOR ALL TO public
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

DROP POLICY IF EXISTS "pages_public_read_published" ON public.pages;
CREATE POLICY "pages_public_read_published"
  ON public.pages FOR SELECT TO public
  USING (published = true);

-- ===== patients =====
DROP POLICY IF EXISTS "admin seulement" ON public.patients;
CREATE POLICY "admin seulement"
  ON public.patients FOR ALL TO public
  USING (auth.role() = 'authenticated'::text);

-- ===== profiles =====
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
CREATE POLICY "profiles_admin_all"
  ON public.profiles FOR ALL TO public
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "profiles_admin_select" ON public.profiles;
CREATE POLICY "profiles_admin_select"
  ON public.profiles FOR SELECT TO public
  USING (is_admin());

-- ===== sections =====
DROP POLICY IF EXISTS "sections_editor_admin_all" ON public.sections;
CREATE POLICY "sections_editor_admin_all"
  ON public.sections FOR ALL TO public
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

DROP POLICY IF EXISTS "sections_public_read_published_parent" ON public.sections;
CREATE POLICY "sections_public_read_published_parent"
  ON public.sections FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM pages p
    WHERE p.id = sections.page_id AND p.published = true
  ));

-- ===== services =====
DROP POLICY IF EXISTS "services_editor_admin_all" ON public.services;
CREATE POLICY "services_editor_admin_all"
  ON public.services FOR ALL TO public
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

DROP POLICY IF EXISTS "services_public_read_published" ON public.services;
CREATE POLICY "services_public_read_published"
  ON public.services FOR SELECT TO public
  USING (published = true);

-- ===== site_settings =====
DROP POLICY IF EXISTS "site_settings_admin_all" ON public.site_settings;
CREATE POLICY "site_settings_admin_all"
  ON public.site_settings FOR ALL TO public
  USING (is_editor_or_admin())
  WITH CHECK (is_editor_or_admin());

DROP POLICY IF EXISTS "site_settings_public_read" ON public.site_settings;
CREATE POLICY "site_settings_public_read"
  ON public.site_settings FOR SELECT TO public
  USING (true);

-- ===== visites =====
DROP POLICY IF EXISTS "Public can insert visit tracking" ON public.visites;
CREATE POLICY "Public can insert visit tracking"
  ON public.visites FOR INSERT TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can read visits" ON public.visites;
CREATE POLICY "Staff can read visits"
  ON public.visites FOR SELECT TO public
  USING (is_editor_or_admin());


-- =====================================================================
-- SECTION 4 : VÉRIFICATION POST-EXÉCUTION
-- =====================================================================

-- Compter les policies (doit retourner ~31)
SELECT COUNT(*) AS nb_policies FROM pg_policies WHERE schemaname = 'public';

-- Lister les fonctions helper
SELECT proname FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND proname IN ('is_admin', 'is_editor_or_admin')
ORDER BY proname;

-- Identifier les policies USING(true) restantes (doivent être 4 légitimes)
SELECT tablename, policyname, cmd FROM pg_policies
WHERE schemaname = 'public' AND (qual = 'true' OR with_check = 'true');

-- Fin du dump
