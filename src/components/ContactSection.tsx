"use client"

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ContactForm from '@/components/ContactForm'

function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const panel = section.querySelector('.contact-panel')
      const copy = section.querySelector('.contact-copy')
      const form = section.querySelector('.contact-form')

      gsap.from(panel, {
        autoAlpha: 0,
        scale: 0.985,
        duration: 0.75,
        ease: 'power3.out',
      })
      gsap.from([copy, form], {
        autoAlpha: 0,
        x: (index) => index === 0 ? -28 : 28,
        duration: 0.7,
        delay: 0.12,
        ease: 'power3.out',
        stagger: 0.08,
      })
    })

    return () => media.revert()
  }, [])

  return (
    <section ref={sectionRef} className="contact-section">
      <div className="contact-panel">
        <div className="contact-copy">
          <p className="section-kicker">Request information</p>
          <h1>Let’s talk about your team.</h1>
          <p>Tell us what you need from your time and attendance workflow. The WorkAttend team will help you identify the right setup and pricing plan.</p>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}

export default ContactSection
