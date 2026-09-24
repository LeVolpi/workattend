"use client"

import { useEffect, useState } from 'react'

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 420)
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateVisibility)
    }
  }, [])

  return (
    <button
      className={`back-to-top${isVisible ? ' visible' : ''}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5l-7 7m7-7l7 7M12 5v14" />
      </svg>
    </button>
  )
}

export default BackToTop
