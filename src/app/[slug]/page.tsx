import { notFound } from 'next/navigation'
import StaticPage from '@/components/StaticPage'
import { siteContentService } from '@/services/site-content.service'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return siteContentService.getStaticPageSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const page = siteContentService.getStaticPageContent(slug)

  if (!page) {
    return {}
  }

  return {
    title: `${page.title} | WorkAttend`,
    description: page.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = siteContentService.getStaticPageContent(slug)

  if (!page) {
    notFound()
  }

  return <StaticPage page={page} />
}
