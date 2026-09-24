import { accountActions, homePageContent, navigationItems, staticPages } from '@/mocks/site-content'

export const siteContentRepository = {
  getNavigation() {
    return navigationItems
  },
  getAccountActions() {
    return accountActions
  },
  getHomePage() {
    return homePageContent
  },
  getStaticPages() {
    return staticPages
  },
  getStaticPage(slug: string) {
    return staticPages.find((page) => page.slug === slug)
  },
}
