import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface UserState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  clearUser: () => void
  fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: true,
  
  setUser: (user) => set({ user }),
  
  setLoading: (loading) => set({ loading }),
  
  clearUser: () => set({ user: null }),
  
  fetchUser: async () => {
    try {
      set({ loading: true })
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      
      if (error) {
        console.error('Error fetching user:', error)
        set({ user: null, loading: false })
        return
      }
      
      set({ user: data.user, loading: false })
    } catch (error) {
      console.error('Error in fetchUser:', error)
      set({ user: null, loading: false })
    }
  }
}))