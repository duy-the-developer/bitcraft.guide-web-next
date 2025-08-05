import { redirect } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function PrivatePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect({ href: '/login', locale })
  }

  return <p>Hello {data.user!.email}</p>
}
