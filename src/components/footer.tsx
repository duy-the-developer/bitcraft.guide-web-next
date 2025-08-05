import { Container } from '@/components/container'
import { SITE_CONFIG } from '@/config/site-config'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-background border-t py-6">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="text-muted-foreground text-center text-sm md:text-left">
              © 2025 Duy Nguyen. {t('footer.allRightsReserved')}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {t('footer.discord')}
              </a>
              <a
                href={SITE_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {t('footer.github')}
              </a>
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {t('footer.twitter')}
              </a>
            </div>
          </div>
          <div className="text-muted-foreground text-center text-xs md:text-right">
            <p>{t('footer.unofficialDisclaimer')}</p>
            <p className="mt-1">{t('footer.assetsDisclaimer')}</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
