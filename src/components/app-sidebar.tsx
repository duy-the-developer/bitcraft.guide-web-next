'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { ChevronRight } from 'lucide-react'
import * as React from 'react'

import { EnhancedSearchForm } from '@/components/enhanced-search-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { SITE_CONFIG } from '@/config/site-config'
import type { SearchData } from '@/lib/spacetime-db-new/shared/dtos/search-dtos'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { AuthSection } from './auth-section'
// import { KofiWidget } from './kofi-widget'
import { Logo } from './logo'

// Type definitions for navigation items
type NavigationItem = {
  translationKey: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  external?: boolean
  comingSoon?: boolean
}

// Import Phosphor icons
import {
  BookOpenIcon,
  CalculatorIcon,
  DiscordLogoIcon,
  GithubLogoIcon,
  HammerIcon,
  HouseIcon,
  InfoIcon,
  TwitterLogoIcon
} from '@phosphor-icons/react'

// Navigation data with icons and descriptions
const data = {
  navMain: [
    {
      translationLabel: 'sidebar.navigation',
      children: [
        { translationKey: 'sidebar.mainPage', href: '/', icon: HouseIcon },
        { translationKey: 'sidebar.aboutUs', href: '/about', icon: InfoIcon }
        // { translationKey: 'sidebar.randomPage', href: '/random', icon: ShuffleIcon, comingSoon: true }
        // { translationKey: 'sidebar.contactUs', href: '/contact', icon: EnvelopeIcon }
      ]
    },
    // {
    //   translationLabel: 'sidebar.guides',
    //   children: [],
    //   description: 'sidebar.guidesComingSoon'
    // },
    {
      translationLabel: 'sidebar.compendium',
      children: [
        { translationKey: 'sidebar.codex', href: '/compendium/codex' },
        {
          translationKey: 'sidebar.compendiumTools',
          href: '/compendium/tools'
        },
        { translationKey: 'sidebar.resources', href: '/compendium/resources' },
        { translationKey: 'sidebar.buildings', href: '/compendium/buildings' },
        {
          translationKey: 'sidebar.deployables',
          href: '/compendium/collectibles/deployable'
        },
        { translationKey: 'sidebar.seeAll', href: '/compendium' }
      ]
    },
    {
      translationLabel: 'sidebar.tools',
      children: [
        {
          translationKey: 'sidebar.calculator',
          href: '/calculator',
          icon: CalculatorIcon
        },
        {
          translationKey: 'sidebar.projects',
          href: '/projects',
          icon: HammerIcon,
          comingSoon: true
        }
      ]
    },
    {
      translationLabel: 'sidebar.community',
      children: [
        {
          translationKey: 'sidebar.bitcraftGuideDiscord',
          href: SITE_CONFIG.links.discord,
          icon: DiscordLogoIcon,
          external: true
        },
        {
          translationKey: 'sidebar.bitcraftGuideGithub',
          href: SITE_CONFIG.links.github,
          icon: GithubLogoIcon,
          external: true
        },
        {
          translationKey: 'sidebar.bitcraftGuideTwitter',
          href: SITE_CONFIG.links.twitter,
          icon: TwitterLogoIcon,
          external: true
        }
      ]
    },
    {
      translationLabel: 'sidebar.recentChanges',
      children: [
        {
          translationKey: 'sidebar.changelog',
          href: '/changelog',
          icon: BookOpenIcon
        }
      ],
      description: 'sidebar.recentChangesDescription'
    }
  ]
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  searchData: SearchData
}

export function AppSidebar({ searchData, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const t = useTranslations()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    if (href === '/compendium') {
      return pathname === '/compendium'
    }

    return pathname.includes(href)
  }

  const renderNavigationItem = (item: NavigationItem) => {
    const Icon = item.icon
    return (
      <SidebarMenuItem key={item.href}>
        <Button
          variant={isActive(item.href) ? 'secondary' : 'ghost'}
          size="sm"
          className={cn(
            'h-8 w-full justify-start text-sm font-normal',
            isActive(item.href) && 'bg-accent'
          )}
          asChild={!item.comingSoon}
          disabled={item.comingSoon}
        >
          {item.comingSoon ? (
            <div className="flex w-full items-center">
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {t(item.translationKey)}
              <Badge variant="secondary" className="ml-auto text-xs">
                {t('sidebar.comingSoon')}
              </Badge>
            </div>
          ) : item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {t(item.translationKey)}
            </a>
          ) : (
            <Link href={item.href} className="flex items-center">
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {t(item.translationKey)}
            </Link>
          )}
        </Button>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="space-y-2">
        <div className="flex h-10 items-center">
          <Logo />
        </div>
        <EnhancedSearchForm searchData={searchData} />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((section) => (
          <Collapsible
            key={section.translationLabel}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {t(section.translationLabel)}{' '}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="ml-2">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.children.length > 0 ? (
                      section.children.map(renderNavigationItem)
                    ) : (
                      <div className="px-2 py-1">
                        <div className="text-muted-foreground text-xs">
                          {section.description && t(section.description)}
                        </div>
                      </div>
                    )}
                  </SidebarMenu>
                  {section.description && section.children.length > 0 && (
                    <div className="px-2 py-1">
                      <div className="text-muted-foreground text-xs">
                        {t(section.description)}
                      </div>
                    </div>
                  )}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      {/* Authentication Section */}
      <div className="border-t p-4">
        <AuthSection />
      </div>

      <SidebarRail />
    </Sidebar>
  )
}
