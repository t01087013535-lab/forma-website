'use client'
/**
 * SectionNav — 우측 고정 섹션 인디케이터
 * IntersectionObserver 로 활성 섹션을 감지해 해당 dot 을 강조합니다.
 * 클릭 시 해당 섹션으로 부드럽게 스크롤합니다.
 */

import { useEffect, useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',    label: '히어로',   dark: true  },
  { id: 'work',    label: '프로젝트', dark: false },
  { id: 'story',   label: '스토리',   dark: false },
  { id: 'service', label: '서비스',   dark: true  },
  { id: 'contact', label: '문의',     dark: true  },
] as const

export function SectionNav() {
  const prefersReduced = useReducedMotion()
  const [active, setActive] = useState<string>('hero')

  // 현재 활성 섹션의 배경색 설정값 (sections 배열의 dark 필드)
  const isDark = SECTIONS.find(s => s.id === active)?.dark ?? true

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        {
          rootMargin: '-30% 0px -30% 0px',
          threshold:  0,
        },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed right-7 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-[14px]"
      aria-label="섹션 이동"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        const dotColor = isDark ? 'rgba(245,245,240,0.90)' : 'rgba(26,26,26,0.80)'
        const dotFade  = isDark ? 'rgba(245,245,240,0.28)' : 'rgba(26,26,26,0.25)'

        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            aria-label={`${label} 섹션으로 이동`}
            aria-current={isActive ? 'true' : undefined}
            style={{
              background:   'transparent',
              border:       'none',
              padding:      '4px',
              cursor:       'pointer',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
            }}
          >
            <m.span
              aria-hidden="true"
              animate={{
                width:      isActive ? 8 : 4,
                height:     isActive ? 8 : 4,
                background: isActive ? dotColor : dotFade,
                boxShadow:  isActive
                  ? `0 0 0 2px ${isDark ? 'rgba(245,245,240,0.12)' : 'rgba(26,26,26,0.10)'}`
                  : 'none',
              }}
              transition={
                prefersReduced
                  ? { duration: 0.01 }
                  : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
              }
              style={{
                borderRadius: '50%',
                display:      'block',
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
