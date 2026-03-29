'use client'
import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

const navLinks = [
  { href: '#work',    label: 'Work'    },
  { href: '#story',   label: 'Story'   },
  { href: '#service', label: 'Service' },
  { href: '#contact', label: 'Contact' },
]

export function FloatingNav() {
  const prefersReduced          = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const firstLinkRef            = useRef<HTMLAnchorElement>(null)
  const hamburgerRef            = useRef<HTMLButtonElement>(null)
  const menuRef                 = useRef<HTMLDivElement>(null)

  function openContactModal() {
    window.dispatchEvent(new Event('open-contact-modal'))
    setMenuOpen(false)
  }

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    if (!menuOpen) return
    if (e.key !== 'Tab') return
    const focusables = menuRef.current?.querySelectorAll<HTMLElement>('a, button')
    if (!focusables || focusables.length === 0) return
    const first = focusables[0]
    const last  = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus() }
  }

  useEffect(() => {
    function onResize() { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    firstLinkRef.current?.focus()
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); hamburgerRef.current?.focus() }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [menuOpen])

  return (
    <>
      {/* Skip link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ink/40"
        style={{ color: '#1a1c19' }}
      >
        본문으로 바로가기
      </a>

      {/* Floating nav — light frosted glass */}
      <m.header
        className="fixed top-6 left-1/2 z-50"
        style={{ transform: 'translateX(-50%)', width: '92%', maxWidth: '80rem' }}
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0.01 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-label="주 네비게이션"
      >
        <div
          className="flex items-center justify-between px-6 py-3 backdrop-blur-xl"
          style={{
            background: 'rgba(248,246,241,0.85)',
            borderBottom: '0.5px solid rgba(26,28,25,0.10)',
            boxShadow: '0 8px 32px -8px rgba(26,28,25,0.08)',
          }}
        >
          {/* 로고 */}
          <a
            href="#hero"
            className="transition-opacity duration-300 hover:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30"
            aria-label="FORMA 홈으로 이동"
          >
            <span
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontStyle: 'italic',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                color: '#1a1c19',
              }}
            >
              FORMA
            </span>
          </a>

          {/* 데스크톱 링크 */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30"
                  style={{ color: 'rgba(26,28,25,0.38)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1a1c19' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,28,25,0.38)' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* 모바일 햄버거 */}
          <button
            ref={hamburgerRef}
            type="button"
            className="md:hidden p-2 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30"
            style={{ color: 'rgba(26,28,25,0.70)' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <line x1="0" y1="1"  x2="22" y2="1"  />
              <line x1="0" y1="7"  x2="22" y2="7"  />
              <line x1="0" y1="13" x2="22" y2="13" />
            </svg>
          </button>
        </div>
      </m.header>

      {/* 모바일 풀스크린 메뉴 — light */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-nav-menu"
          role="menu"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-12"
          style={{ background: '#f8f6f1' }}
          onKeyDown={handleMenuKeyDown}
        >
          <button
            type="button"
            className="absolute top-8 right-8 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30 p-2"
            style={{ color: 'rgba(26,28,25,0.30)' }}
            onClick={() => setMenuOpen(false)}
            aria-label="메뉴 닫기"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1a1c19' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,28,25,0.30)' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <line x1="4" y1="4"  x2="28" y2="28" />
              <line x1="28" y1="4" x2="4"  y2="28" />
            </svg>
          </button>

          <ul className="flex flex-col gap-6 text-center" role="list">
            {navLinks.map(({ href, label }, idx) => (
              <li key={href} role="none">
                <m.a
                  ref={idx === 0 ? firstLinkRef : undefined}
                  href={href}
                  role="menuitem"
                  className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30"
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(48px, 12vw, 80px)',
                    fontWeight: 300,
                    letterSpacing: '-0.04em',
                    color: 'rgba(26,28,25,0.45)',
                    lineHeight: 1.05,
                  }}
                  onClick={() => setMenuOpen(false)}
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={prefersReduced ? { duration: 0.01 } : { delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1a1c19' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,28,25,0.45)' }}
                >
                  {label}
                </m.a>
              </li>
            ))}
            <li role="none">
              <m.button
                type="button"
                role="menuitem"
                className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/30"
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(48px, 12vw, 80px)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  color: '#675e3f',
                  lineHeight: 1.05,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={openContactModal}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReduced ? { duration: 0.01 } : { delay: navLinks.length * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Contact
              </m.button>
            </li>
          </ul>

          <p
            className="absolute bottom-10 font-mono text-[9px] tracking-[4px]"
            style={{ color: 'rgba(26,28,25,0.18)' }}
          >
            FORMA STUDIO — EST. 2024
          </p>
        </div>
      )}
    </>
  )
}
