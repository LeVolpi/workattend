"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sceneTitleLines = [
  'Employee attendance tracking via',
  'spreadsheet is tedious. It is now easier',
  'for admins to track off-site employees.',
]

const heroTitle = 'YOUR TIME MATTERS.'

const timesheetDescription = 'WorkAttend provides real-time attendance information showing employees present during the day, time spent on projects or at individual customer locations. Easy-to-use reports help you to analyse employee time in various dimensions and levels of detail.'

const sceneTitleCharacterCount = sceneTitleLines.join('').length
const sceneTitleLineOffsets = sceneTitleLines.map((_, lineIndex) =>
  sceneTitleLines.slice(0, lineIndex).join('').length,
)

const girlStartX = 920
const girlEndX = 375
const girlY = 266
const girlTimesheetX = 720
const girlTimesheetY = 390
const girlTimesheetWidth = 120
const girlTimesheetHeight = 180
const squareX = 340
const squareY = 545
const timesheetCellColors = ['#EDEFF3', '#31AEA5', '#F04C58']

gsap.registerPlugin(ScrollTrigger)

function HeroScene() {
  const [cityLoaded, setCityLoaded] = useState(false)
  const [timesheetGridLoaded, setTimesheetGridLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const copyRef = useRef<HTMLDivElement | null>(null)
  const pingRef = useRef<HTMLImageElement | null>(null)
  const scrollHintRef = useRef<HTMLDivElement | null>(null)
  const sunCircleRef = useRef<SVGCircleElement | null>(null)
  const cityRef = useRef<HTMLObjectElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const squareRef = useRef<SVGGElement | null>(null)
  const mascotRef = useRef<SVGImageElement | null>(null)
  const sceneTitleRef = useRef<SVGGElement | null>(null)
  const timesheetRef = useRef<HTMLDivElement | null>(null)
  const timesheetDescriptionRef = useRef<HTMLParagraphElement | null>(null)
  const timesheetPiecesRef = useRef<HTMLElement[]>([])
  const heroTitleLettersRef = useRef<HTMLSpanElement[]>([])
  const titleCharactersRef = useRef<SVGTSpanElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const copy = copyRef.current
    const ping = pingRef.current
    const scrollHint = scrollHintRef.current
    const sunCircle = sunCircleRef.current
    const city = cityRef.current
    const mapPins = city?.contentDocument?.querySelectorAll<SVGGElement>('.map-pin')
    const backdrop = backdropRef.current
    const square = squareRef.current
    const mascot = mascotRef.current
    const sceneTitle = sceneTitleRef.current
    const timesheet = timesheetRef.current
    const timesheetDescriptionElement = timesheetDescriptionRef.current
    const timesheetPieces = timesheetPiecesRef.current
    const timesheetGrid = timesheetPieces[1] as HTMLObjectElement | undefined
    const timesheetCells = timesheetGrid?.contentDocument?.querySelectorAll<SVGPathElement>('.timesheet-cells path')

    if (!section || !copy || !ping || !scrollHint || !sunCircle || !city || !mapPins || mapPins.length !== 4 || !backdrop || !square || !mascot || !sceneTitle || !timesheet || !timesheetDescriptionElement || timesheetPieces.length !== 3 || !timesheetCells || timesheetCells.length < 12) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactLayout = window.matchMedia('(max-width: 760px)')

    let handleVisibilityChange: (() => void) | undefined
    let timesheetVisibilityObserver: IntersectionObserver | undefined

    const context = gsap.context(() => {
      gsap.set(copy, { opacity: 1, y: 0 })
      gsap.set(ping, { opacity: 1, x: 0, y: 0, scale: 1, transformOrigin: '50% 82%' })
      gsap.set(scrollHint, { opacity: 1, y: 0 })
      gsap.set(sunCircle, { opacity: 0.25 })
      gsap.set(city, { opacity: 0.3 })
      gsap.set(mapPins, { opacity: 0, y: 24 })
      gsap.set(backdrop, { opacity: 0 })
      gsap.set(square, { opacity: 0, scale: 0.45, transformOrigin: '50% 50%' })
      gsap.set(mascot, { attr: { x: girlStartX, y: girlY, width: 200, height: 300 }, opacity: 0 })
      gsap.set(titleCharactersRef.current, { opacity: 0 })
      gsap.set(timesheet, { opacity: 0 })
      gsap.set(timesheetPieces, { opacity: 0, x: 0, y: 0, scale: 1 })
      gsap.set(timesheetPieces[0], { y: -44 })
      gsap.set(timesheetPieces[1], { y: 44, scale: 0.985 })
      gsap.set(timesheetPieces[2], { x: 54 })
      gsap.set(timesheetDescriptionElement, { opacity: 0, y: 20 })

      if (!reducedMotion.matches) {
        gsap.to(heroTitleLettersRef.current, {
          scale: 1.08,
          duration: 0.42,
          ease: 'power2.out',
          stagger: {
            each: 0.045,
            yoyo: true,
            repeat: 1,
          },
          repeat: -1,
          repeatDelay: 4.5,
        })
      }

      if (compactLayout.matches) {
        gsap.set(ping, { opacity: 0 })
        gsap.set(scrollHint, { opacity: 0 })
        gsap.set(mapPins, { opacity: 1, y: 0 })
        return
      }

      if (reducedMotion.matches) {
        gsap.set(ping, { opacity: 0, y: 0, scale: 1 })
        gsap.set(scrollHint, { opacity: 0 })
        gsap.set(square, { opacity: 0, scale: 0.45 })
        gsap.set(sunCircle, { opacity: 0.8 })
        gsap.set(city, { opacity: 1 })
        gsap.set(mapPins, { opacity: 1, y: 0 })
        gsap.set(backdrop, { opacity: 1 })
        gsap.set(mascot, {
          attr: {
            x: girlTimesheetX,
            y: girlTimesheetY,
            width: girlTimesheetWidth,
            height: girlTimesheetHeight,
          },
          opacity: 1,
        })
        gsap.set(sceneTitle, { opacity: 0 })
        gsap.set(timesheet, { opacity: 1 })
        gsap.set(timesheetPieces, { opacity: 1, x: 0, y: 0, scale: 1 })
        gsap.set(timesheetDescriptionElement, { opacity: 1, y: 0 })
        return
      }

      const pingPulse = gsap.to(ping, {
        scale: 1.1,
        duration: 1.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        paused: true,
      })

      const animatedCells = [...timesheetCells]
      for (let cellIndex = animatedCells.length - 1; cellIndex > 0; cellIndex -= 1) {
        const randomIndex = Math.floor(Math.random() * (cellIndex + 1))
        ;[animatedCells[cellIndex], animatedCells[randomIndex]] = [animatedCells[randomIndex], animatedCells[cellIndex]]
      }
      animatedCells.length = 12

      const timesheetCellLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatRefresh: true,
      })
        .to(animatedCells, {
          attr: {
            fill: (_cellIndex, cell) => {
              const currentColor = cell.getAttribute('fill')?.toUpperCase()
              const availableColors = timesheetCellColors.filter((color) => color !== currentColor)
              return availableColors[Math.floor(Math.random() * availableColors.length)]
            },
          },
          duration: 0.45,
          ease: 'power1.inOut',
          stagger: {
            each: 0.045,
            from: 'random',
          },
        })
        .to({}, { duration: 4.5 })

      let timesheetInView = true

      const syncTimesheetCellLoop = (sceneTimeline: gsap.core.Timeline) => {
        const composedAt = sceneTimeline.labels.timesheetComposed ?? Number.POSITIVE_INFINITY
        const shouldPlay = document.visibilityState === 'visible'
          && timesheetInView
          && sceneTimeline.time() >= composedAt

        if (shouldPlay && timesheetCellLoop.paused()) {
          timesheetCellLoop.restart()
        } else if (!shouldPlay && !timesheetCellLoop.paused()) {
          timesheetCellLoop.pause(0)
        }
      }

      const timeline = gsap.timeline({
        onUpdate: () => {
          const timesheetTransition = timeline.labels.timesheetTransition ?? Number.POSITIVE_INFINITY

          if (timeline.time() >= 1.2 && timeline.time() < timesheetTransition) {
            pingPulse.play()
          } else {
            pingPulse.pause(0)
            gsap.set(ping, { scale: 1 })
          }

          syncTimesheetCellLoop(timeline)
        },
        scrollTrigger: {
          trigger: section,
          start: () => `top ${section.offsetTop}px`,
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          scrub: 1,
          onToggle: () => syncTimesheetCellLoop(timeline),
        },
      })

      handleVisibilityChange = () => syncTimesheetCellLoop(timeline)
      document.addEventListener('visibilitychange', handleVisibilityChange)

      timesheetVisibilityObserver = new IntersectionObserver(([entry]) => {
        timesheetInView = entry.isIntersecting
        syncTimesheetCellLoop(timeline)
      })
      timesheetVisibilityObserver.observe(section)

      timeline.to(copy, { opacity: 0, y: -28, duration: 0.2, ease: 'none' }, 0)
      timeline.to(scrollHint, { opacity: 0, y: -10, duration: 0.12, ease: 'none' }, 0)
      timeline.to(ping, { y: () => Math.max(0, Math.min(window.innerHeight * 0.35, 280) - 55), duration: 1.2, ease: 'power1.inOut' }, 0)
      timeline.to(sunCircle, { opacity: 0.8, duration: 0.2, ease: 'none' }, 0.2)
      timeline.to(city, { opacity: 1, duration: 0.8, ease: 'none' }, 0.2)
      timeline.to(mapPins, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.16,
      }, 0.32)
      timeline.to(square, { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.8)' }, 0.2)
      timeline.to(mascot, { attr: { x: girlEndX, y: girlY }, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.2)
      timeline.to(
        titleCharactersRef.current,
        {
          opacity: 1,
          duration: 0.001,
          ease: 'none',
          stagger: sceneTitleCharacterCount > 1 ? 1.26 / (sceneTitleCharacterCount - 1) : 0,
        },
        0,
      )
      timeline
        .to({}, { duration: 1.5, ease: 'none' }, 1.26)
        .addLabel('timesheetTransition')
        .to([ping, square, sceneTitle], {
          opacity: 0,
          duration: 0.38,
          ease: 'power2.inOut',
        })
        .to(backdrop, {
          opacity: 1,
          duration: 0.55,
          ease: 'power2.inOut',
        }, '<')
        .to(mascot, {
          attr: {
            x: girlTimesheetX,
            y: girlTimesheetY,
            width: girlTimesheetWidth,
            height: girlTimesheetHeight,
          },
          duration: 0.6,
          ease: 'power3.inOut',
        }, '<')
        .set(timesheet, { opacity: 1 })
        .to(timesheetPieces, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.72,
          ease: 'power3.out',
          stagger: 0.12,
        })
        .to(timesheetDescriptionElement, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        }, '-=0.32')
        .addLabel('timesheetComposed')
        .to({}, { duration: 1, ease: 'none' })
    }, section)

    return () => {
      if (handleVisibilityChange) {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
      timesheetVisibilityObserver?.disconnect()
      context.revert()
    }
  }, [cityLoaded, timesheetGridLoaded])

  return (
    <section ref={sectionRef} className="hero-scroll" aria-labelledby="hero-title">
      <div className="hero-sticky">
        <img ref={pingRef} className="hero-ping" src="/ping.svg" alt="" aria-hidden="true" />

        <div
          ref={copyRef}
          className="hero-copy"
        >
          <p className="hero-kicker">Mobile time and attendance</p>
          <h1 id="hero-title" className="hero-title">
            {[...heroTitle].map((character, characterIndex) => (
              <span
                aria-hidden="true"
                className="hero-title-letter"
                key={`${character}-${characterIndex}`}
                ref={(element) => {
                  if (element) {
                    heroTitleLettersRef.current[characterIndex] = element
                  }
                }}
              >
                {character === ' ' ? '\u00a0' : character}
              </span>
            ))}
            <span className="sr-only">{heroTitle}</span>
          </h1>
          <p className="hero-lede">
            WorkAttend is an easy-to-use time and attendance app
          </p>
          <a
            className="hero-cta"
            href="https://portal.workattend.com/Company/Register"
          >
            Get Started Now
          </a>
          <div ref={scrollHintRef} className="hero-scroll-hint" aria-hidden="true">
            <span className="hero-mouse-icon">
              <span className="hero-mouse-wheel" />
            </span>
            <span>scroll</span>
            <span className="hero-scroll-arrow" />
          </div>
        </div>

        <div className="hero-stage">
          <svg className="hero-sun" viewBox="0 0 124 124" aria-hidden="true">
            <circle ref={sunCircleRef} cx="62" cy="62" r="62" fill="#ffd76d" />
          </svg>

          <div className="hero-scene" aria-hidden="true">
            <object
              ref={cityRef}
              data="/city_opt.svg"
              type="image/svg+xml"
              aria-hidden="true"
              onLoad={() => setCityLoaded(true)}
            />
          </div>

          <div ref={backdropRef} className="hero-interface-backdrop" aria-hidden="true" />

          <div ref={timesheetRef} className="hero-timesheet">
            <p ref={timesheetDescriptionRef} className="hero-timesheet-description">
              {timesheetDescription}
            </p>
            <div className="hero-timesheet-graphic" aria-label="WorkAttend timesheet interface" role="img">
              {['top', 'grid', 'actions'].map((piece, pieceIndex) => {
                const sharedProps = {
                  'aria-hidden': true,
                  className: `hero-timesheet-piece hero-timesheet-piece-${piece}`,
                  ref: (element: HTMLElement | null) => {
                    if (element) timesheetPiecesRef.current[pieceIndex] = element
                  },
                }

                if (piece === 'grid') {
                  return (
                    <object
                      key={piece}
                      {...sharedProps}
                      data="/WA-timesheet1.svg"
                      type="image/svg+xml"
                      onLoad={() => setTimesheetGridLoaded(true)}
                    />
                  )
                }

                return <img key={piece} {...sharedProps} alt="" src="/WA-timesheet1.svg" />
              })}
            </div>
          </div>

          <svg className="hero-animation-layer" viewBox="0 0 920 620" aria-hidden="true">
            <defs>
              <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#1c355e" floodOpacity="0.16" />
              </filter>
            </defs>

            <g ref={squareRef} opacity="0">
              <image
                className="svg-square"
                href="/square.svg"
                x={squareX}
                y={squareY}
                width="246"
                height="60"
              />
            </g>

            <image
              ref={mascotRef}
              className="svg-girl shadow"
              href="/girl_running_opt.svg"
              x={girlStartX}
              y={girlY}
              width="200"
              height="300"
              opacity="0"
              filter="url(#softShadow)"
            />

            <g ref={sceneTitleRef}>
              <text x="460" y="72" textAnchor="middle" className="scene-title" xmlSpace="preserve">
                {sceneTitleLines.map((line, lineIndex) => (
                  <tspan key={line} x="460" dy={lineIndex === 0 ? 0 : 36}>
                    {[...line].map((character, characterIndex) => (
                      <tspan
                        key={`${lineIndex}-${characterIndex}`}
                        ref={(element) => {
                          if (element) {
                            titleCharactersRef.current[sceneTitleLineOffsets[lineIndex] + characterIndex] = element
                          }
                        }}
                        opacity="0"
                      >
                        {character}
                      </tspan>
                    ))}
                  </tspan>
                ))}
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroScene
