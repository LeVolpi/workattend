import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'Contact Us | WorkAttend',
  description: 'Request information about WorkAttend plans, setup and time and attendance workflows.',
}

export default function ContactPage() {
  return (
    <main className="page-shell contact-page">
      <ContactSection />
    </main>
  )
}
