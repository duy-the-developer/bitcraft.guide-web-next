'use client'

import { useUserStore } from '@/stores/user-store'
import { SigninButton } from './signin-button'
import { UserProfile } from './user-profile'

export function AuthSection() {
  const { user, loading } = useUserStore()

  if (loading) {
    return (
      <div className="flex items-center space-x-2 p-2">
        <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />
        <div className="flex-1 space-y-1">
          <div className="bg-muted h-3 animate-pulse rounded" />
          <div className="bg-muted h-2 w-3/4 animate-pulse rounded" />
        </div>
      </div>
    )
  }

  return user ? <UserProfile /> : <SigninButton />
}
