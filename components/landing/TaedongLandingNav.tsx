'use client'

import { useEffect, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

import { buildExhibitionNavigation } from '@/lib/taedong-exhibition'

const navigationItems = buildExhibitionNavigation()
const contactEmail = 'hello@taedong.ai.kr'

export function TaedongLandingNav() {
  const prefersReduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string>('portal')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    navigationItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id)
          }
        },
        {
          rootMargin: '-35% 0px -35% 0px',
          threshold: 0,
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <a
        href="#portal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-[#f5efe2] focus:px-4 focus:py-2 focus:text-sm focus:text-[#09121b]"
      >
        본문으로 바로가기
      </a>

      <m.header
        className="fixed inset-x-0 top-0 z-[100] px-4 py-4 md:px-6"
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#0b1620]/70 px-4 py-3 backdrop-blur-xl md:px-6">
          <button
            type="button"
            onClick={() => scrollToSection('portal')}
            className="flex items-center gap-3 text-left"
            aria-label="태동 랜딩 맨 위로 이동"
          >
            <span className="font-serif text-xl italic tracking-[-0.04em] text-[#f7f2e8] md:text-2xl">
              TAEDONG
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.34em] text-[#8ea1b3] md:block">
              Living Museum
            </span>
          </button>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="전시실 이동">
            {navigationItems.map(({ id, label }) => {
              const isActive = activeId === id

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] transition-colors"
                  style={{ color: isActive ? '#f5efe2' : '#7f92a4' }}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {label}
                </button>
              )
            })}
          </nav>

          <a
            href={`mailto:${contactEmail}`}
            className="rounded-full border border-[#8fa9bc]/40 bg-[#d1a85f]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#f1dcb2] transition-colors hover:bg-[#d1a85f]/20"
          >
            Brand Inquiry
          </a>
        </div>
      </m.header>

      <nav
        className="fixed right-4 top-1/2 z-[90] hidden -translate-y-1/2 flex-col gap-3 xl:flex"
        aria-label="전시 진행 표시"
      >
        {navigationItems.map(({ id, label }) => {
          const isActive = activeId === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className="flex items-center gap-3"
              aria-label={`${label} 구간으로 이동`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className="block h-px transition-all"
                style={{
                  width: isActive ? '44px' : '20px',
                  background: isActive ? 'rgba(241, 220, 178, 0.92)' : 'rgba(142, 161, 179, 0.42)',
                }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.28em] transition-colors"
                style={{ color: isActive ? '#f5efe2' : '#7f92a4' }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
