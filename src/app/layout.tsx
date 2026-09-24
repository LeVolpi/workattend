import type { Metadata } from 'next'
import BackToTop from '@/components/BackToTop'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { siteContentService } from '@/services/site-content.service'
import '../index.css'
import '../App.css'

export const metadata: Metadata = {
  title: 'WorkAttend | Time and attendance app',
  description: 'WorkAttend is an easy-to-use time and attendance app for off-site teams and administrators.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { navigationItems, accountActions } = siteContentService.getLayoutContent()

  return (
    <html lang="it">
      <body>
        <Header navigationItems={navigationItems} accountActions={accountActions} />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
