'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  BuildingsIcon,
  CaretDownIcon,
  FolderOpenIcon,
  GearIcon,
  SignOutIcon,
  SlidersIcon
} from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/client'
import { useUserStore } from '@/stores/user-store'

export function UserProfile() {
  const { user } = useUserStore()
  const router = useRouter()
  const t = useTranslations()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) return null

  const getInitials = () => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    return user.email?.charAt(0).toUpperCase() || 'U'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-accent h-auto w-full justify-start p-2"
        >
          <div className="flex w-full items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.full_name || user.email || ''}
              />
              <AvatarFallback className="text-xs">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-sm font-medium">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </div>
              <div className="text-muted-foreground truncate text-xs">
                {user.email}
              </div>
            </div>
            <CaretDownIcon className="h-4 w-4 shrink-0" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{t('auth.personal')}</DropdownMenuLabel>
        <DropdownMenuItem disabled>
          <GearIcon className="mr-2 h-4 w-4" />
          {t('auth.accountSettings')}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <SlidersIcon className="mr-2 h-4 w-4" />
          {t('auth.appPreferences')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{t('auth.settlement')}</DropdownMenuLabel>
        <DropdownMenuItem disabled>
          <FolderOpenIcon className="mr-2 h-4 w-4" />
          {t('auth.projects')}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <BuildingsIcon className="mr-2 h-4 w-4" />
          {t('auth.settlement')}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}>
          <SignOutIcon className="mr-2 h-4 w-4" />
          {t('auth.signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
