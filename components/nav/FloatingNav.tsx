'use client'
import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

const navLinks = [
  { href: '#work',    label: 'WORK'    },
  { href: '#story',   label: 'STORY'   },
  { href: '#service', label: 'SERVICE' },
]

export function FloatingNav() {
  const prefersReduced = useReducedMotion()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const firstLinkRef              = useRef<HTMLAnchorElement>(null)
  const hamburgerRef              = useRef<HTMLButtonElement>(null)
  const menuRef                   = useRef<HTMLDivElement>(null)

  function handleMenuKeyDown(e: React.KeyboardEvent) {
    if (!menuOpen) return
    if (e.key !== 'Tab') return
    const focusables = menuRef.current?.querySelectorAll<HTMLElement>('a, button')
    if (!focusables || focusables.length === 0) return
    const first = focusables[0]
    const last  = focusables[focusables.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      firstLinkRef.current?.focus()
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMenuOpen(false)
          hamburgerRef.current?.focus()
        }
      }
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [menuOpen])

  return (
    <m.header
      className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 pt-6"
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-[#0d0d0d] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      >
        본문으로 바로가기
      </a>
      <div className="relative mx-auto max-w-[1400px]">
        <nav
          className="flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
          style={{
            background:           scrolled ? 'rgba(0,0,0,0.6)'              : 'transparent',
            backdropFilter:       scrolled ? 'blur(24px)'                   : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px)'                   : 'none',
            border:               scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
            boxShadow:            scrolled ? '0 4px 30px rgba(0,0,0,0.3)'   : 'none',
          }}
          aria-label="주 네비게이션"
        >
          {/* 로고 */}
          <a href="#hero" className="text-[11px] font-bold tracking-[4px] text-[#ededed]">
            FORMA<span style={{ color: 'var(--color-gold)' }}>.</span>
          </a>

          {/* 데스크톱 링크 */}
          <ul className="hidden gap-7 md:flex" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[13px] font-medium tracking-widest text-zinc-400 transition-colors hover:text-[#ededed]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* 데스크톱 CTA — Stitch blue */}
          <a
            href="#contact"
            className="hidden rounded-full px-5 py-2 text-[13px] font-semibold text-white transition-all duration-200 md:block focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            style={{ background: 'var(--color-blue)' }}
          >
            프로젝트 문의 →
          </a>

          {/* 모바일 햄버거 버튼 */}
          <button
            ref={hamburgerRef}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            type="button"
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span
                className="block h-0.5 w-5 bg-[#ededed] transition-all duration-300"
                style={{ transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-0.5 w-5 bg-[#ededed] transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-5 bg-[#ededed] transition-all duration-300"
                style={{ transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
              />
            </span>
          </button>
        </nav>

        {/* 모바일 드롭다운 메뉴 */}
        {menuOpen && (
          <div
            ref={menuRef}
            id="mobile-nav-menu"
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl md:hidden"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            role="menu"
            onKeyDown={handleMenuKeyDown}
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map(({ href, label }, index) => (
                <li key={href} role="none">
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={href}
                    className="block rounded-xl px-4 py-3 text-[13px] font-medium tracking-widest text-zinc-400 transition-colors hover:bg-white/5 hover:text-[#ededed]"
                    role="menuitem"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li role="none" className="mt-2 border-t border-white/10 pt-2">
                <a
                  href="#contact"
                  className="block rounded-full px-4 py-3 text-center text-[13px] font-semibold text-white"
                  style={{ background: 'var(--color-blue)' }}
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
