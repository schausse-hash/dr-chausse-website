-- =====================================================================
-- dentiste.com — ROLLBACK des policies (état avant remédiation 15 mai 2026)
-- =====================================================================
-- À utiliser SI BESOIN pour revenir à l'état d'avant la remédiation.
-- ⚠️ Cela rétablirait les vulnérabilités précédentes :
--   - ma_vie_videos modifiable par n'importe qui (USING true)
--   - analytics_events et visites lisibles publiquement
--   - services UPDATE permis sans contrôle is_editor_or_admin
--
-- Exécuter dans Supabase SQL Editor (projet bjxplcepfhwnwiuyovxw).
-- =====================================================================

-- 1) D'abord supprimer les nouvelles policies
DROP POLICY IF EXISTS "Public can insert tracking events" ON public.analytics_events;
DROP POLICY IF EXISTS "Staff can read analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Public can insert visit tracking" ON public.visites;
DROP POLICY IF EXISTS "Staff can read visits" ON public.visites;
DROP POLICY IF EXISTS "Auth delete" ON public.ma_vie_videos;
DROP POLICY IF EXISTS "Auth insert" ON public.ma_vie_videos;
DROP POLICY IF EXISTS "Auth update" ON public.ma_vie_videos;

-- 2) Recréer les anciennes (avec leurs vulnérabilités)

-- ma_vie_videos — versions USING(true) d'avant le 15 mai
CREATE POLICY "Auth delete"
  ON public.ma_vie_videos FOR DELETE TO public USING (true);

CREATE POLICY "Auth insert"
  ON public.ma_vie_videos FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Auth update"
  ON public.ma_vie_videos FOR UPDATE TO public USING (true);

-- analytics_events — versions originales (doublons + lecture publique)
CREATE POLICY "Insertion anonyme"
  ON public.analytics_events FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "insert_public"
  ON public.analytics_events FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Lecture"
  ON public.analytics_events FOR SELECT TO anon USING (true);

CREATE POLICY "read_authenticated"
  ON public.analytics_events FOR SELECT TO anon, authenticated USING (true);

-- visites — versions originales
CREATE POLICY "Insertion anonyme"
  ON public.visites FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Lecture"
  ON public.visites FOR SELECT TO anon USING (true);

-- services — policy permissive qui annulait is_editor_or_admin
CREATE POLICY "Admin can update services"
  ON public.services FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);
