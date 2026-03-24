'use client'
import { useEffect, useState } from 'react'
import { m } from 'framer-motion'

const navLinks = [
  { href: '#work',    label: 'Work'    },
  { href: '#story',   label: 'Story'   },
  { href: '#service', label: 'Service' },
]

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <m.header
      className="fixed top-0 left-0 right-0 z-50 px-8 pt-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
        style={{
          background:           scrolled ? 'rgba(255,255,255,0.55)' : 'transparent',
          backdropFilter:       scrolled ? 'blur(20px)'             : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)'             : 'none',
          border:               scrolled ? '1px solid rgba(255,255,255,0.85)' : '1px solid transparent',
          boxShadow:            scrolled ? '0 4px 30px rgba(0,0,0,0.06)'     : 'none',
        }}
        aria-label="주 네비게이션"
      >
        {/* 로고 */}
        <a href="#" className="text-[11px] font-bold tracking-[4px] text-[#0d0d0d]">
          FORMA<span style={{ color: 'var(--color-gold)' }}>.</span>
        </a>

        {/* 링크 */}
        <ul className="hidden gap-7 md:flex" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[11px] font-medium tracking-[2px] text-[#6b6b6b] transition-colors hover:text-[#0d0d0d]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="rounded-full bg-[#0d0d0d] px-5 py-2.5 text-[10px] font-bold tracking-[2px] text-white transition-opacity hover:opacity-75"
        >
          프로젝트 문의 →
        </a>
      </nav>
    </m.header>
  )
}
