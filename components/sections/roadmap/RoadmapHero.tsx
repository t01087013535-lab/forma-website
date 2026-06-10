'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

export function RoadmapHero() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="로드맵 히어로"
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
          STRATEGIC ROADMAP — 2026–2031
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
            Road to <span style={{ fontStyle: 'italic' }}>Jensen Huang</span>.
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
          태동그룹의 세 사업을 NVIDIA 생태계로 정렬해, 5년 안에 젠슨 황과의
          실질적 미팅에 도달하는 경로 보고서. 미팅은 요청이 아니라 누적의
          결과로 설계한다.
        </m.p>

        <m.p
          className="mt-8 font-mono text-[10px] tracking-[3px]"
          style={{ color: 'rgba(26,28,25,0.35)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.5 }}
        >
          발행 2026.06 · 태동 2.0 · 1 OPERATOR + AGENT TEAMS
        </m.p>
      </div>
    </section>
  )
}
