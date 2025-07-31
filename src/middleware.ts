import createMiddleware from 'next-intl/middleware'
import { type NextRequest } from 'next/server'
import { I18N_CONFIG } from './i18n/config'
import { routing } from './i18n/routing'
import { updateSession } from './utils/supabase/middleware'

const handleI18nRouting = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request)

  // A `response` can now be passed here
  return await updateSession(request, response)
}

export const config = {
  // Only run middleware on:
  // - Root path (/) for locale detection and redirection
  // - All localized paths (dynamically generated from i18n config)
  matcher: ['/', `/(${I18N_CONFIG.locales.join('|')})/:path*`]
}
