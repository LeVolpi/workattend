"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { StaticPageContent } from '@/core/types/content'

gsap.registerPlugin(ScrollTrigger)

type StaticPageProps = {
  page: StaticPageContent
}

export default function StaticPage({ page }: StaticPageProps) {
  const pageRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const pageElement = pageRef.current
    if (!pageElement) return

    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(pageElement.querySelectorAll('.static-hero > *'), {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      })

      const content = pageElement.querySelector('.static-content')
      gsap.from(pageElement.querySelectorAll('.static-content > .benefit-card'), {
        autoAlpha: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: content,
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => media.revert()
  }, [])

  return (
    <main ref={pageRef} className="page-shell static-page">
      <section className="static-hero">
        <p className="section-kicker">{page.kicker}</p>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </section>
      <section className="static-content" aria-label={`${page.title} content`}>
        {page.sections.map((section) => (
          <article className="benefit-card" key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
