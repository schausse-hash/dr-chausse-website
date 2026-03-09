import { createClient } from '@/lib/supabase/server'
import AvantApresClient from './AvantApresClient'

export const revalidate = 60

export default async function AvantApresPage() {
  const supabase = createClient()
  const { data: cas } = await supabase
    .from('avant_apres')
    .select('*')
    .eq('published', true)
    .order('ordre')

  return <AvantApresClient cas={cas || []} />
}
