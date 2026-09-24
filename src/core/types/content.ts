export type TextCard = {
  label: string
  title: string
  text: string
}

export type Benefit = {
  title: string
  text: string
}

export type PricingPlan = {
  name: string
  price: string
  note?: string
  summary: string[]
  intro: string
  features: string[]
  featured?: boolean
}

export type Testimonial = {
  company: string
  role: string
  quote: string
  logo: string
  logoAlt: string
}

export type TrustBadge =
  | 'Dakar Software'
  | 'ISO-oriented delivery'
  | 'Mobile app access'
  | 'Customer support'

export type HomePageContent = {
  problem: {
    kicker: string
    title: string
    before: TextCard
    after: TextCard
  }
  benefits: {
    kicker: string
    title: string
    items: Benefit[]
  }
  demo: {
    kicker: string
    title: string
    text: string
  }
  workflow: {
    kicker: string
    title: string
    text: string
    steps: string[]
  }
  useCases: {
    kicker: string
    title: string
    items: string[]
  }
  preview: {
    kicker: string
    title: string
    text: string
  }
  pricing: {
    kicker: string
    title: string
    plans: PricingPlan[]
  }
  trust: {
    kicker: string
    title: string
    text: string
    integration: string
    badges: TrustBadge[]
  }
  testimonials: {
    kicker: string
    title: string
    items: Testimonial[]
  }
  finalCta: {
    kicker: string
    title: string
    label: string
    href: string
  }
}

export type StaticPageContent = {
  slug: string
  title: string
  kicker: string
  description: string
  sections: Array<{
    title: string
    text: string
  }>
}
