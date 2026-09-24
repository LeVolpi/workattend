"use client"

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Benefit, HomePageContent, PricingPlan, Testimonial, TextCard } from '@/core/types/content'

type HomeSectionsProps = {
  content: HomePageContent
}

gsap.registerPlugin(ScrollTrigger)

const trustBadgeIcons = {
  'Dakar Software': (
    <>
      <path d="M7 6.5h18v17H7z" />
      <path d="M11 11h10M11 15h6M11 19h10" />
    </>
  ),
  'ISO-oriented delivery': (
    <>
      <path d="M16 4.5l9 4.5v6.7c0 5.2-3.5 9.7-9 11.8-5.5-2.1-9-6.6-9-11.8V9z" />
      <path d="M11.5 16.2l3 3 6-7" />
    </>
  ),
  'Mobile app access': (
    <>
      <path d="M11 4.5h10a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2v-19a2 2 0 0 1 2-2z" />
      <path d="M14 8h4M15 24h2" />
    </>
  ),
  'Customer support': (
    <>
      <path d="M7 16a9 9 0 0 1 18 0v5a2 2 0 0 1-2 2h-3v-8h5M7 16v5a2 2 0 0 0 2 2h3v-8H7" />
      <path d="M18.5 25.5H16" />
    </>
  ),
} as const

const benefitImages = [
  '/geofence-tracking.jpg',
  '/single-device-login.jpg',
  '/automated-reports.jpg',
] as const

const useCaseSlides = [
  'Technology',
  'Education',
  'Healthcare',
  'Retail',
  'Manufacturing',
  'Food & Beverages',
  'Hospitality',
  'Agriculture',
  'Construction',
] as const

const useCaseImages: Record<(typeof useCaseSlides)[number], string> = {
  Technology: '/Technology-opt.svg',
  Education: '/Education-opt.svg',
  Healthcare: '/Healthcare-opt.svg',
  Retail: '/Retail-opt.svg',
  Manufacturing: '/Manufacturing-opt.svg',
  'Food & Beverages': '/Food-and-Beverage-opt.svg',
  Hospitality: '/Hospitality-opt.svg',
  Agriculture: '/Agriculture-opt.svg',
  Construction: '/Construction-opt.svg',
}

type UseCaseCategory = keyof typeof useCaseImages
type IllustrationRegion = [x: number, y: number, width: number, height: number]

const useCaseDescriptions: Record<UseCaseCategory, string> = {
  Technology: 'Distributed tech teams can log work from anywhere while leaders keep projects, schedules and availability in sync.',
  Education: 'Schools can coordinate teaching and support staff across campuses while keeping daily attendance records accurate.',
  Healthcare: 'Care teams can cover rotating shifts across facilities while maintaining reliable attendance and staffing records.',
  Retail: 'Store teams can manage changing shifts across branches while regional leads monitor coverage and attendance.',
  Manufacturing: 'Production teams can track shift changes and attendance while supervisors maintain dependable floor coverage.',
  'Food & Beverages': 'Restaurant teams can coordinate fast-changing rosters while maintaining reliable coverage through every service.',
  Hospitality: 'Hospitality teams can align front and back-of-house shifts while keeping guest-facing operations fully staffed.',
  Agriculture: 'Field teams can record attendance across remote sites while coordinators follow seasonal work and daily coverage.',
  Construction: 'Site crews can register attendance wherever work happens while coordinators track staffing across active projects.',
}

const useCaseAnimationRegions: Record<UseCaseCategory, {
  pins: IllustrationRegion[]
  bases: IllustrationRegion[]
}> = {
  Technology: {
    pins: [[105, 30, 80, 115], [365, 30, 85, 115]],
    bases: [[25, 415, 225, 75], [295, 410, 230, 80]],
  },
  Education: {
    pins: [[105, 30, 85, 115]],
    bases: [[40, 400, 235, 85]],
  },
  Healthcare: {
    pins: [[70, 30, 90, 115]],
    bases: [[10, 400, 230, 85]],
  },
  Retail: {
    pins: [[65, 40, 95, 125]],
    bases: [[0, 410, 225, 85]],
  },
  Manufacturing: {
    pins: [[65, 30, 100, 125]],
    bases: [[0, 405, 225, 90]],
  },
  'Food & Beverages': {
    pins: [[80, 0, 85, 105]],
    bases: [[0, 420, 240, 80]],
  },
  Hospitality: {
    pins: [[80, 30, 100, 115]],
    bases: [[5, 405, 240, 90]],
  },
  Agriculture: {
    pins: [[65, 25, 100, 120], [510, 70, 95, 90], [345, 145, 45, 40], [210, 220, 50, 40]],
    bases: [[0, 405, 225, 90], [430, 385, 220, 95], [200, 325, 85, 65], [325, 245, 90, 65]],
  },
  Construction: {
    pins: [[55, 20, 105, 105], [520, 65, 100, 75]],
    bases: [[0, 405, 230, 90], [465, 380, 215, 105]],
  },
}

const logoRegion: IllustrationRegion = [475, 15, 215, 70]

type SectionHeadingProps = {
  kicker: string
  title: string
  centered?: boolean
}

function SectionHeading({ kicker, title, centered = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading${centered ? ' centered-heading' : ''}`}>
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>
    </div>
  )
}

function CompareCard({ card, variant }: { card: TextCard, variant: 'muted' | 'highlight' }) {
  return (
    <article className={`compare-card ${variant}-card`}>
      <span className="card-label">{card.label}</span>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
    </article>
  )
}

function BenefitCard({ benefit, index }: { benefit: Benefit, index: number }) {
  return (
    <article className="benefit-card">
      {benefitImages[index] ? (
        <div className="benefit-image-frame" aria-hidden="true">
        <img
          className="benefit-image"
          src={benefitImages[index]}
          alt=""
        />
        </div>
      ) : null}
      <div className="benefit-card-content">
        <span className="benefit-number">0{index + 1}</span>
        <h3>{benefit.title}</h3>
        <p>{benefit.text}</p>
      </div>
    </article>
  )
}

function DevicePreview() {
  return (
    <div className="device-preview" aria-hidden="true">
      <div className="phone-frame">
        <div className="phone-top" />
        <div className="status-pill">Checked in</div>
        <div className="map-card">
          <img src="/ping.svg" alt="" aria-hidden="true" />
        </div>
        <div className="time-card">08:57 AM</div>
        <div className="punch-button">Punch out</div>
      </div>

      <img className="dashboard-timesheet" src="/WA-timesheet1.svg" alt="" aria-hidden="true" />
    </div>
  )
}

function UseCaseIllustration({ category }: { category: UseCaseCategory }) {
  const illustrationRef = useRef<HTMLDivElement>(null)
  const [svgMarkup, setSvgMarkup] = useState<string | false | null>(null)
  const src = useCaseImages[category]

  useEffect(() => {
    const controller = new AbortController()

    fetch(src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${src}`)
        return response.text()
      })
      .then(setSvgMarkup)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setSvgMarkup(false)
      })

    return () => controller.abort()
  }, [src])

  useLayoutEffect(() => {
    if (!svgMarkup || !illustrationRef.current) return

    const svg = illustrationRef.current.querySelector('svg')
    if (!svg) return

    const viewBox = svg.viewBox.baseVal
    const regions = useCaseAnimationRegions[category]
    const activeLogoRegion: IllustrationRegion = category === 'Food & Beverages'
      ? [475, 0, 225, 65]
      : logoRegion
    const elements = Array.from(svg.querySelectorAll<SVGGraphicsElement>('path, polygon, rect, circle, ellipse, image'))
      .filter((element) => !element.closest('defs, [display="none"]'))

    const getNormalizedCenter = (element: SVGGraphicsElement) => {
      const box = element.getBBox()
      const elementMatrix = element.getScreenCTM()
      const svgMatrix = svg.getScreenCTM()
      if (!elementMatrix || !svgMatrix) return null

      const center = new DOMPoint(box.x + box.width / 2, box.y + box.height / 2)
        .matrixTransform(elementMatrix)
        .matrixTransform(svgMatrix.inverse())

      return {
        x: ((center.x - viewBox.x) / viewBox.width) * 700,
        y: ((center.y - viewBox.y) / viewBox.height) * 500,
      }
    }

    const isInside = (point: { x: number, y: number }, [x, y, width, height]: IllustrationRegion) => (
      point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height
    )

    elements.forEach((element) => {
      const center = getNormalizedCenter(element)
      if (!center) return

      const color = getComputedStyle(element).fill.replaceAll(' ', '').toLowerCase()
      const isAgricultureBackground = category === 'Agriculture'
        && (color === 'rgb(199,125,99)' || color === '#c77d63')
      if (isAgricultureBackground) return

      if (isInside(center, activeLogoRegion)) {
        element.classList.add('usecase-svg-logo')
        return
      }

      if (regions.pins.some((region) => isInside(center, region))) {
        element.classList.add('usecase-svg-pin')
        return
      }

      const isCoral = color === 'rgb(242,114,89)' || color === '#f27259'
      if (isCoral && regions.bases.some((region) => isInside(center, region))) {
        element.classList.add('usecase-svg-base')
      }
    })
  }, [category, svgMarkup])

  if (svgMarkup === false) {
    return <img className="usecase-illustration" src={src} alt={`${category} use case`} />
  }

  return (
    <div
      ref={illustrationRef}
      className="usecase-illustration"
      role="img"
      aria-label={`${category} use case`}
      dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
    />
  )
}

function UseCaseSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeCategory = useCaseSlides[activeIndex]

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % useCaseSlides.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [isPaused])

  return (
    <div
      className="usecase-slider"
      aria-label="WorkAttend use cases"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
      onFocus={() => setIsPaused(true)}
    >
      <article className="usecase-slide" id="usecase-slide" key={activeCategory}>
        <div className="usecase-slide-copy">
          <h3>{activeCategory}</h3>
          <p>WorkAttend helps {activeCategory.toLowerCase()} teams coordinate shifts, attendance and daily activity with clear mobile-first workflows.</p>
          <p>{useCaseDescriptions[activeCategory]}</p>
        </div>

        <div className="usecase-slide-art">
          <UseCaseIllustration category={activeCategory} />
        </div>
      </article>

      <div className="usecase-tabs" role="tablist" aria-label="Select use case category">
        {useCaseSlides.map((category, index) => (
          <button
            className={index === activeIndex ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls="usecase-slide"
            key={category}
            onClick={() => setActiveIndex(index)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

function PricingCard({
  featured,
  onActivate,
  plan,
}: {
  featured: boolean
  onActivate: () => void
  plan: PricingPlan
}) {
  return (
    <article
      className={`pricing-card${featured ? ' featured' : ''}`}
      onFocus={onActivate}
      onMouseEnter={onActivate}
    >
      {plan.featured ? <span className="pricing-badge">Most popular</span> : null}
      {featured && !plan.featured ? <span className="pricing-badge">Choose Plan</span> : null}

      <div className="pricing-card-head">
        <h3>{plan.name}</h3>
        <p className="pricing-price">{plan.price}</p>
        {plan.note ? <p className="pricing-note">{plan.note}</p> : null}
      </div>

      <ul className="pricing-summary">
        {plan.summary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <a className="pricing-cta" href="/contact">Contact Us</a>

      <div className="pricing-desktop-details">
        <p className="pricing-intro">{plan.intro}</p>
        <ul className="pricing-features">
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>

      <details className="pricing-details">
        <summary>
          <span>Plan details</span>
          <span className="pricing-details-arrow" aria-hidden="true" />
        </summary>
        <div className="pricing-details-content">
          <p className="pricing-intro">{plan.intro}</p>
          <ul className="pricing-features">
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </details>
    </article>
  )
}

function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeTestimonial = testimonials[activeIndex]

  useEffect(() => {
    if (testimonials.length < 2 || isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [isPaused, testimonials.length])

  if (!activeTestimonial) return null

  return (
    <div
      className="testimonials-slider"
      role="region"
      aria-label="Customer testimonials"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
    >
      <div className="testimonial-stage" aria-live="polite">
        <article className="testimonial-slide" key={activeTestimonial.company}>
          <blockquote>
            <p>{activeTestimonial.quote}</p>
          </blockquote>

          <div className="testimonial-client">
            <img
              src={activeTestimonial.logo}
              alt={activeTestimonial.logoAlt}
              width="250"
              height="100"
            />
            <div>
              <h3>{activeTestimonial.company}</h3>
              <p>{activeTestimonial.role}</p>
            </div>
          </div>
        </article>
      </div>

      <div className="testimonial-dots" aria-label="Choose a testimonial">
        {testimonials.map((testimonial, index) => (
          <button
            className={index === activeIndex ? 'active' : ''}
            type="button"
            aria-label={`Show testimonial from ${testimonial.company}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
            key={testimonial.company}
          />
        ))}
      </div>
    </div>
  )
}

function HomeSections({ content }: HomeSectionsProps) {
  const problemSectionRef = useRef<HTMLElement | null>(null)
  const benefitsSectionRef = useRef<HTMLElement | null>(null)
  const videoSectionRef = useRef<HTMLElement | null>(null)
  const compareGridRef = useRef<HTMLDivElement | null>(null)
  const benefitGridRef = useRef<HTMLDivElement | null>(null)
  const workflowSectionRef = useRef<HTMLElement | null>(null)
  const useCaseSectionRef = useRef<HTMLElement | null>(null)
  const previewSectionRef = useRef<HTMLElement | null>(null)
  const pricingSectionRef = useRef<HTMLElement | null>(null)
  const trustSectionRef = useRef<HTMLElement | null>(null)
  const testimonialsSectionRef = useRef<HTMLElement | null>(null)
  const finalCtaRef = useRef<HTMLElement | null>(null)
  const [featuredPricingPlan, setFeaturedPricingPlan] = useState(
    () => content.pricing.plans.find((plan) => plan.featured)?.name ?? content.pricing.plans[0]?.name ?? ''
  )

  useEffect(() => {
    const compareGrid = compareGridRef.current

    if (!compareGrid) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const cards = gsap.utils.toArray<HTMLElement>('.compare-card', compareGrid)

    const context = gsap.context(() => {
      if (reducedMotion.matches) {
        gsap.set(cards, { opacity: 1, x: 0 })
        return
      }

      gsap.set(cards, { opacity: 0 })
      gsap.set(cards[0], { x: -90 })
      gsap.set(cards[1], { x: 90 })

      gsap.to(cards, {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: compareGrid,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    }, compareGrid)

    return () => {
      context.revert()
    }
  }, [])

  useEffect(() => {
    const benefitGrid = benefitGridRef.current

    if (!benefitGrid) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const cards = gsap.utils.toArray<HTMLElement>('.benefit-card', benefitGrid)

    const context = gsap.context(() => {
      if (reducedMotion.matches) {
        gsap.set(cards, { opacity: 1, x: 0 })
        return
      }

      gsap.set(cards, { opacity: 0 })
      gsap.set(cards[0], { x: -90 })
      gsap.set(cards[1], { y: 90 })
      gsap.set(cards[2], { x: 90 })

      gsap.to(cards, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: benefitGrid,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    }, benefitGrid)

    return () => {
      context.revert()
    }
  }, [])

  useEffect(() => {
    const useCaseSection = useCaseSectionRef.current

    if (!useCaseSection) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const parallaxItems = gsap.utils.toArray<HTMLElement>('.usecase-parallax-item', useCaseSection)

    if (reducedMotion.matches) {
      gsap.set(parallaxItems, { y: 0 })
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(parallaxItems, { y: 72 }, {
        y: -56,
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: {
          trigger: useCaseSection,
          start: 'top 92%',
          end: 'bottom 8%',
          scrub: true,
        },
      })
    }, useCaseSection)

    return () => {
      context.revert()
    }
  }, [])

  useLayoutEffect(() => {
    const workflowSection = workflowSectionRef.current

    if (!workflowSection) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const overlay = workflowSection.querySelector<HTMLElement>('.workflow-overlay')
    const copy = workflowSection.querySelector<HTMLElement>('.workflow-copy')
    const steps = gsap.utils.toArray<HTMLElement>('.workflow-list li', workflowSection)
    const animatedItems = copy ? [copy, ...steps] : steps

    const context = gsap.context(() => {
      if (reducedMotion.matches) {
        gsap.set(overlay, { opacity: 1 })
        gsap.set(animatedItems, { opacity: 1, y: 0 })
        return
      }

      gsap.set(overlay, { opacity: 0 })
      gsap.set(animatedItems, { opacity: 0, y: 28 })

      gsap.timeline({
        delay: 0.2,
        scrollTrigger: {
          trigger: workflowSection,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
        .to(overlay, {
          opacity: 1,
          duration: 0.85,
          ease: 'power2.inOut',
        })
        .to(copy, {
          opacity: 1,
          y: 0,
          duration: 0.62,
          ease: 'power3.out',
        })
        .to(steps, {
          opacity: 1,
          y: 0,
          duration: 0.62,
          ease: 'power3.out',
          stagger: 0.3,
        })
    }, workflowSection)

    return () => {
      context.revert()
    }
  }, [])

  useLayoutEffect(() => {
    const sections = [
      problemSectionRef.current,
      benefitsSectionRef.current,
      videoSectionRef.current,
      previewSectionRef.current,
      pricingSectionRef.current,
      trustSectionRef.current,
      testimonialsSectionRef.current,
      finalCtaRef.current,
    ].filter((section): section is HTMLElement => Boolean(section))

    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const reveal = (
        section: HTMLElement | null,
        targets: gsap.TweenTarget | null | undefined,
        options: gsap.TweenVars = {},
      ) => {
        if (!section || !targets) return

        gsap.from(targets, {
          autoAlpha: 0,
          y: 24,
          duration: 0.72,
          ease: 'power3.out',
          stagger: 0.1,
          ...options,
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      reveal(problemSectionRef.current, problemSectionRef.current?.querySelector('.section-heading'))
      reveal(benefitsSectionRef.current, benefitsSectionRef.current?.querySelector('.section-heading'))

      const videoSection = videoSectionRef.current
      if (videoSection) {
        reveal(videoSection, [
          videoSection.querySelector('.section-heading'),
          videoSection.querySelector('.video-caption'),
          videoSection.querySelector('.video-frame'),
        ])
      }

      const previewSection = previewSectionRef.current
      if (previewSection) {
        reveal(previewSection, [
          previewSection.querySelector('.device-preview'),
          ...previewSection.querySelectorAll('.preview-copy > *'),
        ])

        gsap.from(previewSection.querySelector('.dashboard-timesheet'), {
          autoAlpha: 0,
          x: 48,
          rotate: 2,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: previewSection,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      const pricingSection = pricingSectionRef.current
      if (pricingSection) {
        reveal(pricingSection, pricingSection.querySelector('.section-heading'))
        reveal(pricingSection, pricingSection.querySelectorAll('.pricing-card'), { y: 0, stagger: 0.08 })
      }

      const trustSection = trustSectionRef.current
      if (trustSection) {
        reveal(trustSection, [
          ...trustSection.querySelectorAll(':scope > div:first-child > *'),
          ...trustSection.querySelectorAll('.trust-badges span'),
          ...trustSection.querySelectorAll('.trust-download > *'),
        ])
      }

      const testimonialsSection = testimonialsSectionRef.current
      if (testimonialsSection) {
        reveal(testimonialsSection, testimonialsSection.querySelector('.section-heading'))
        reveal(testimonialsSection, testimonialsSection.querySelector('.testimonials-slider'), { y: 0, delay: 0.08 })
      }

      const finalCta = finalCtaRef.current
      if (finalCta) {
        reveal(finalCta, finalCta, { scale: 0.985, y: 0 })
        reveal(finalCta, finalCta.querySelectorAll(':scope > *'), { delay: 0.12 })
      }
    })

    return () => {
      media.revert()
      gsap.set(sections, { clearProps: 'visibility,opacity,transform' })
    }
  }, [])

  return (
    <>
      <section ref={problemSectionRef} className="problem-section" id="why">
        <SectionHeading kicker={content.problem.kicker} title={content.problem.title} />

        <div ref={compareGridRef} className="compare-grid">
          <CompareCard card={content.problem.before} variant="muted" />
          <CompareCard card={content.problem.after} variant="highlight" />
        </div>
      </section>

      <section ref={benefitsSectionRef} className="benefits-section" id="features">
        <SectionHeading kicker={content.benefits.kicker} title={content.benefits.title} centered />

        <div ref={benefitGridRef} className="benefit-grid">
          {content.benefits.items.map((benefit, index) => (
            <BenefitCard benefit={benefit} index={index} key={benefit.title} />
          ))}
        </div>
      </section>

      <section ref={videoSectionRef} className="video-section" id="demo">
        <div className="video-copy">
          <SectionHeading kicker={content.demo.kicker} title={content.demo.title} />
          <p className="video-caption">{content.demo.text}</p>
        </div>

        <div className="video-frame">
          <video controls preload="metadata" playsInline poster="/cover-WA.jpg">
            <source src="/videos/WA-version-One.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section ref={workflowSectionRef} className="workflow-section" id="mobile">
        <div className="workflow-overlay" aria-hidden="true" />

        <div className="workflow-copy">
          <p className="section-kicker section-kicker-accent">{content.workflow.kicker}</p>
          <h2>{content.workflow.title}</h2>
          <p>{content.workflow.text}</p>
        </div>

        <ol className="workflow-list">
          {content.workflow.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section ref={useCaseSectionRef} className="usecase-section" id="use-cases">
        <div className="section-heading centered-heading">
          <p className="section-kicker usecase-parallax-item">{content.useCases.kicker}</p>
          <h2 className="usecase-parallax-item">{content.useCases.title}</h2>
        </div>

        <div className="usecase-parallax-item">
          <UseCaseSlider />
        </div>
      </section>

      <section ref={previewSectionRef} className="preview-section">
        <DevicePreview />

        <div className="preview-copy">
          <p className="section-kicker section-kicker-accent">{content.preview.kicker}</p>
          <h2>{content.preview.title}</h2>
          <p>{content.preview.text}</p>
        </div>
      </section>

      <section ref={pricingSectionRef} className="pricing-section" id="pricing">
        <SectionHeading kicker={content.pricing.kicker} title={content.pricing.title} centered />

        <div className="pricing-grid">
          {content.pricing.plans.map((plan) => (
            <PricingCard
              featured={plan.name === featuredPricingPlan}
              onActivate={() => setFeaturedPricingPlan(plan.name)}
              plan={plan}
              key={plan.name}
            />
          ))}
        </div>
      </section>

      <section ref={trustSectionRef} className="trust-section" id="support">
        <div>
          <p className="section-kicker section-kicker-accent">{content.trust.kicker}</p>
          <h2>{content.trust.title}</h2>
          <p>{content.trust.text}</p>
        </div>
        <div className="trust-badges" aria-label="Trust signals">
          {content.trust.badges.map((badge) => (
            <span key={badge}>
              <svg className="trust-badge-icon" viewBox="0 0 32 32" aria-hidden="true">
                {trustBadgeIcons[badge as keyof typeof trustBadgeIcons]}
              </svg>
              {badge}
            </span>
          ))}
        </div>
        <div className="trust-download">
          <p>{content.trust.integration}</p>
          <div className="store-buttons" aria-label="Download the WorkAttend mobile app">
            <a
              className="store-button"
              href="https://apps.apple.com/mt/app/dakargeopunch/id1488339099"
              target="_blank"
              rel="noreferrer"
              aria-label="Download WorkAttend on the App Store"
            >
              <svg className="store-button-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.05 12.54c-.03-2.79 2.28-4.15 2.39-4.22a5.13 5.13 0 0 0-4.04-2.19c-1.7-.18-3.35 1.02-4.21 1.02-.88 0-2.2-1-3.63-.97a5.35 5.35 0 0 0-4.5 2.75c-1.96 3.39-.5 8.38 1.38 11.12.94 1.34 2.03 2.84 3.46 2.79 1.4-.06 1.93-.9 3.62-.9 1.67 0 2.17.9 3.63.87 1.5-.03 2.45-1.35 3.35-2.7a11.1 11.1 0 0 0 1.53-3.11 4.84 4.84 0 0 1-2.98-4.46ZM14.29 4.33A4.87 4.87 0 0 0 15.4.82a4.96 4.96 0 0 0-3.2 1.67 4.65 4.65 0 0 0-1.14 3.38 4.1 4.1 0 0 0 3.23-1.54Z" />
              </svg>
              <span><small>Download on the</small>App Store</span>
            </a>
            <a
              className="store-button"
              href="https://play.google.com/store/apps/details?id=com.dakarpunch&amp;hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Get WorkAttend on Google Play"
            >
              <svg className="store-button-icon google-play-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path className="play-green" d="M3.55 2.2a1.7 1.7 0 0 0-.55 1.27v17.06c0 .5.2.95.55 1.28l9.37-9.81L3.55 2.2Z" />
                <path className="play-blue" d="m16.04 8.74-3.12 3.26 3.12 3.27 4.15-2.36c1.08-.61 1.08-1.2 0-1.82l-4.15-2.35Z" />
                <path className="play-yellow" d="M3.55 2.2 15.41 8.4l-2.49 3.6L3.55 2.2Z" />
                <path className="play-red" d="m3.55 21.8 11.86-6.2-2.49-3.6-9.37 9.8Z" />
              </svg>
              <span><small>Get it on</small>Google Play</span>
            </a>
          </div>
        </div>
      </section>

      <section ref={testimonialsSectionRef} className="testimonials-section" aria-labelledby="testimonials-title">
        <div className="section-heading centered-heading">
          <p className="section-kicker">{content.testimonials.kicker}</p>
          <h2 id="testimonials-title">{content.testimonials.title}</h2>
        </div>

        <TestimonialsSlider testimonials={content.testimonials.items} />
      </section>

      <section ref={finalCtaRef} className="final-cta">
        <p className="section-kicker final-cta-kicker">{content.finalCta.kicker}</p>
        <h2>{content.finalCta.title}</h2>
        <a href={content.finalCta.href}>{content.finalCta.label}</a>
      </section>
    </>
  )
}

export default HomeSections
