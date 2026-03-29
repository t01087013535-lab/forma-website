'use client'
import { useRef, useState, useEffect } from 'react'
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'

/* ── Text scramble hook ─────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
function useScramble(target: string, started: boolean, duration = 1400) {
  const [text, setText] = useState(target)
  useEffect(() => {
    if (!started) return
    let frame = 0
    const total = Math.ceil(duration / 16)
    const id = setInterval(() => {
      setText(
        target.split('').map((char, i) => {
          if (char === ' ' || char === '\n') return char
          if (frame / total > i / target.length) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (++frame >= total) { setText(target); clearInterval(id) }
    }, 16)
    return () => clearInterval(id)
  }, [target, started, duration])
  return text
}

export function HeroSection() {
  const prefersReduced = useReducedMotion() ?? false
  const sectionRef     = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)

  const { scrollY } = useScroll()
  const logoY   = useTransform(scrollY, [0, 600], prefersReduced ? [0, 0] : [0, -40])
  const contentY = useTransform(scrollY, [0, 600], prefersReduced ? [0, 0] : [0, -24])

  const line1 = useScramble('비전에', ready && !prefersReduced)
  const line2 = useScramble('형태를.', ready && !prefersReduced, 1800)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 500)
    return () => clearTimeout(t)
  }, [])

  function openContactModal() {
    window.dispatchEvent(new Event('open-contact-modal'))
  }
  function scrollToWork() {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100svh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      aria-label="히어로"
    >

      {/* ── FORMA masthead ── */}
      <m.div
        style={{ y: logoY }}
        className="relative z-20 px-6 md:px-12 pt-28 md:pt-32"
        initial={{ opacity: 0, y: prefersReduced ? 0 : -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0.01 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          aria-label="FORMA"
          style={{
            fontFamily:    'var(--font-newsreader)',
            fontStyle:     'italic',
            fontWeight:    300,
            fontSize:      'clamp(88px, 14vw, 196px)',
            letterSpacing: '0.06em',
            lineHeight:    0.92,
            color:         '#1a1c19',
            userSelect:    'none',
          }}
        >
          FORMA
        </h1>

        {/* horizontal rule beneath FORMA */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height:         '1px',
            background:     'rgba(26,28,25,0.12)',
            transformOrigin:'left',
            marginTop:      '1.25rem',
          }}
        />
      </m.div>

      {/* ── Middle: headline + body ── */}
      <m.div
        className="relative z-20 flex-1 flex items-end px-6 md:px-12 pb-12 md:pb-16"
        style={{ y: contentY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, delay: 0.5, ease: 'easeOut' }}
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 items-end">

          {/* Korean headline — scramble */}
          <div className="md:col-span-7">
            <p
              style={{
                fontFamily:    'var(--font-korean-serif)',
                fontWeight:    800,
                fontSize:      'clamp(2.4rem, 5.5vw, 6.5rem)',
                lineHeight:    1.08,
                letterSpacing: '-0.02em',
                color:         '#1a1c19',
              }}
            >
              <m.span
                className="block"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReduced ? { duration: 0.01 } : { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              >
                {line1}
              </m.span>
              <m.span
                className="block"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReduced ? { duration: 0.01 } : { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
              >
                {line2}
              </m.span>
            </p>
          </div>

          {/* Right: tagline + CTAs */}
          <m.div
            className="md:col-span-5 flex flex-col gap-8 md:pl-6"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eyebrow */}
            <p
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.625rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color:         'rgba(26,28,25,0.38)',
              }}
            >
              풀스택 웹 컨설팅 스튜디오
            </p>

            <p
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontStyle:  'italic',
                fontSize:   '0.9375rem',
                lineHeight: 1.8,
                color:      'rgba(26,28,25,0.52)',
                maxWidth:   '22rem',
              }}
            >
              아이디어는 형태를 얻는 순간<br />
              현실이 됩니다.
            </p>

            <div className="flex flex-col gap-5">
              {/* Primary CTA */}
              <MagneticButton
                onClick={openContactModal}
                className="group self-start flex items-center gap-4 transition-all duration-700 cursor-none"
              >
                <span
                  style={{
                    fontFamily:    'var(--font-newsreader)',
                    fontStyle:     'italic',
                    fontSize:      '0.75rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color:         '#1a1c19',
                    transition:    'color 0.3s',
                  }}
                >
                  Start Journey
                </span>
                <span
                  className="h-px transition-all duration-700 origin-left group-hover:w-14"
                  style={{ width: '2.5rem', display: 'block', background: 'rgba(26,28,25,0.22)' }}
                  aria-hidden="true"
                />
                <svg
                  width="13" height="13" viewBox="0 0 14 14" fill="none"
                  aria-hidden="true"
                  className="-ml-2 group-hover:ml-0 group-hover:translate-x-1 transition-all duration-700"
                >
                  <path d="M1 7H13M8 2l5 5-5 5" stroke="#1a1c19" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={scrollToWork}
                className="self-start transition-opacity duration-300 hover:opacity-40 focus-visible:outline-none cursor-none"
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.5625rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color:         'rgba(26,28,25,0.30)',
                  background:    'none',
                  border:        'none',
                  padding:       0,
                }}
              >
                View Portfolio ↓
              </button>
            </div>
          </m.div>

        </div>
      </m.div>

      {/* ── Bottom bar: meta info ── */}
      <m.div
        className="relative z-20 px-6 md:px-12 pb-8 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 1.4 }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color:         'rgba(26,28,25,0.20)',
          }}
        >
          EST. 2024
        </span>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-10 w-px"
            style={{
              background: 'linear-gradient(to bottom, rgba(26,28,25,0.45), transparent)',
              animation:  prefersReduced ? 'none' : 'scroll-pulse 2s ease-in-out infinite',
            }}
          />
        </div>

        <span
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color:         'rgba(26,28,25,0.20)',
          }}
        >
          FORMA © 2024
        </span>
      </m.div>

    </section>
  )
}
