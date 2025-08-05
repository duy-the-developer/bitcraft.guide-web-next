'use client'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { SignInIcon } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'

export function SigninButton() {
  const t = useTranslations()

  return (
    <Button className="w-full justify-start" asChild>
      <Link href="/login" className="flex items-center">
        <SignInIcon className="mr-2 h-4 w-4" />
        {t('auth.signIn')}
      </Link>
    </Button>
  )
}
