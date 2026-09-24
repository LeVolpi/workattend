import HeroScene from '@/components/HeroScene'
import HomeSections from '@/components/HomeSections'
import { siteContentService } from '@/services/site-content.service'

export default function HomePage() {
  const content = siteContentService.getHomePageContent()

  return (
    <main className="page-shell" aria-label="WorkAttend homepage preview">
      <HeroScene />
      <HomeSections content={content} />
    </main>
  )
}
