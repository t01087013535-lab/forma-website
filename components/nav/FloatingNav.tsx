'use client'
import { useEffect, useState } from 'react'
import { m } from 'framer-motion'

const navLinks = [
  { href: '#work',    label: 'Work'    },
  { href: '#story',   label: 'Story'   },
  { href: '#service', label: 'Service' },
]

export function FloatingNav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <m.header
      className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 pt-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-auto max-w-[1400px]">
        <nav
          className="flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
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

          {/* 데스크톱 링크 */}
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

          {/* 데스크톱 CTA */}
          <a
            href="#contact"
            className="hidden rounded-full bg-[#0d0d0d] px-5 py-2.5 text-[10px] font-bold tracking-[2px] text-white transition-opacity hover:opacity-75 md:block"
          >
            프로젝트 문의 →
          </a>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            type="button"
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span
                className="block h-0.5 w-5 bg-[#0d0d0d] transition-all duration-300"
                style={{ transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-0.5 w-5 bg-[#0d0d0d] transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-5 bg-[#0d0d0d] transition-all duration-300"
                style={{ transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
              />
            </span>
          </button>
        </nav>

        {/* 모바일 드롭다운 메뉴 */}
        {menuOpen && (
          <div
            id="mobile-nav-menu"
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/80 bg-white/90 p-4 backdrop-blur-xl md:hidden"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
            role="menu"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href} role="none">
                  <a
                    href={href}
                    className="block rounded-xl px-4 py-3 text-[13px] font-medium tracking-[2px] text-[#666] transition-colors hover:bg-[var(--color-bg)] hover:text-[#0d0d0d]"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li role="none" className="mt-2 border-t border-[rgba(0,0,0,0.06)] pt-2">
                <a
                  href="#contact"
                  className="block rounded-full bg-[#0d0d0d] px-4 py-3 text-center text-[12px] font-bold tracking-[2px] text-white"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  프로젝트 문의 →
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </m.header>
  )
}
