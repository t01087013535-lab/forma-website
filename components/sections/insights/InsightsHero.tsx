'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

export function InsightsHero() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="Insights hero"
      className="px-6 md:px-16 pt-40 pb-20 md:pt-48 md:pb-24"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <m.p
          className="font-mono text-[10px] tracking-[5px] mb-10"
          style={{ color: 'rgba(26,28,25,0.22)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
        >
          INSIGHTS — WRITINGS FROM THE STUDIO
        </m.p>

        <div style={{ overflow: 'hidden' }}>
          <m.h1
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.035em',
              color: '#1a1c19',
            }}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '110%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            Notes on building <span style={{ fontStyle: 'italic' }}>the web</span>,<br />
            from error to form.
          </m.h1>
        </div>

        <m.p
          className="mt-10 max-w-[56ch] text-[16px] leading-[1.65]"
          style={{
            fontFamily: 'var(--font-korean-serif)',
            color: 'rgba(26,28,25,0.7)',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.8, delay: 0.3 }}
        >
          오류에서 설계로 — 태동의 작업 노트. 엔지니어링, 케이스 스터디,
          에이전트 실험, 그리고 팀이 배운 것들을 글로 남깁니다.
        </m.p>
      </div>
    </section>
  )
}
