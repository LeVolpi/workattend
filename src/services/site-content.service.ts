import { siteContentRepository } from '@/repositories/site-content.repository'

export const siteContentService = {
  getLayoutContent() {
    return {
      navigationItems: siteContentRepository.getNavigation(),
      accountActions: siteContentRepository.getAccountActions(),
    }
  },
  getHomePageContent() {
    return siteContentRepository.getHomePage()
  },
  getStaticPageContent(slug: string) {
    return siteContentRepository.getStaticPage(slug)
  },
  getStaticPageSlugs() {
    return siteContentRepository.getStaticPages().map((page) => page.slug)
  },
}
