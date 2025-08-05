import { AppSidebar } from '@/components/app-sidebar'
import { AuthProvider } from '@/components/auth-provider'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { I18N_CONFIG, type Locale } from '@/i18n/config'
import { getSearchGameData } from '@/lib/spacetime-db-new/modules/search/flows'
import { geistSans } from '@/styles/typography'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'

export function generateStaticParams() {
  return I18N_CONFIG.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  // Validate that the incoming `locale` parameter is valid
  if (!I18N_CONFIG.locales.includes(locale as Locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  const t = await getTranslations()

  return {
    title: t('header.title'),
    description: t('header.subtitle')
  }
}

export type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params
  // Enable static rendering
  setRequestLocale(locale)

  // Validate that the incoming `locale` parameter is valid
  if (!I18N_CONFIG.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  const searchData = await getSearchGameData()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              <SidebarProvider>
                <AppSidebar searchData={searchData} />
                <SidebarInset className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </SidebarInset>
              </SidebarProvider>
              <Analytics />
              <Toaster />
            </AuthProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
