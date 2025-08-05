'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useUserStore } from '@/stores/user-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser, setUser } = useUserStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    // Initial user fetch on app load
    fetchUser()

    // Listen for auth state changes (for client-side signout)
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('AUTH STATE CHANGED:', _event)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [fetchUser, setUser, supabase.auth])

  // Handle auth success redirect from login
  useEffect(() => {
    const authSuccess = searchParams?.get('auth')
    if (authSuccess === 'success') {
      console.log('Detected auth success, fetching user')
      // Clean up the URL parameter
      const url = new URL(window.location.href)
      url.searchParams.delete('auth')
      router.replace(url.pathname + url.search)
      
      // Fetch updated user data
      fetchUser()
    }
  }, [searchParams, router, fetchUser])

  return <>{children}</>
}