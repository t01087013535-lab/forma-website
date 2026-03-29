'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

const capabilities = [
  {
    index: '01',
    label: 'Motion Architecture',
    body: 'Interfaces that breathe — purposeful animation choreography that guides, not distracts.',
  },
  {
    index: '02',
    label: 'Visual Logic',
    body: 'Every structural decision serves both form and function. Beauty as a byproduct of clarity.',
  },
  {
    index: '03',
    label: 'System Thinking',
    body: 'Scalable design systems and engineering patterns built for longevity, not just launch.',
  },
  {
    index: '04',
    label: 'Process Refinement',
    body: 'Hundreds of failures distilled into repeatable craft. Precision is our default mode.',
  },
]

export function ValuesSection() {
  const prefersReduced = useReducedMotion() ?? false

  return (
    <section
      aria-label="핵심 역량"
      style={{
        background: 'transparent',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 96px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-10 items-start">

        {/* 좌: 헤드라인 + 역량 그리드 (col-span-8) */}
        <div className="md:col-span-8">

          {/* 레이블 */}
          <m.p
            className="font-mono text-[10px] tracking-[5px] mb-8"
            style={{ color: 'rgba(26,28,25,0.22)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
          >
            FORMA — 우리의 방식
          </m.p>

          {/* 메인 헤드라인 */}
          <m.h2
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 5.5vw, 6rem)',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: '#1a1c19',
              marginBottom: 'clamp(40px, 6vw, 72px)',
            }}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Beyond the<br />
            <em style={{ color: 'var(--color-accent)' }}>Surface.</em>
          </m.h2>

          {/* 2×2 역량 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {capabilities.map((cap, i) => (
              <m.div
                key={cap.index}
                className="flex flex-col gap-4"
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={
                  prefersReduced
                    ? { duration: 0.01 }
                    : { duration: 0.7, delay: i * 0.10, ease: [0.16, 1, 0.3, 1] }
                }
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-[9px] tracking-[2px]"
                    style={{ color: '#675e3f', opacity: 0.7 }}
                  >
                    {cap.index}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(26,28,25,0.08)' }} aria-hidden="true" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    color: '#1a1c19',
                    lineHeight: 1.15,
                  }}
                >
                  {cap.label}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(26,28,25,0.40)' }}
                >
                  {cap.body}
                </p>
              </m.div>
            ))}
          </div>
        </div>

        {/* 우: 이미지 placeholder (col-span-4) */}
        <m.div
          className="md:col-span-4 relative"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative overflow-hidden aspect-[3/4]"
            style={{
              background: '#ece9e3',
              border: '1px solid rgba(26,28,25,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.4em',
                color: 'rgba(26,28,25,0.25)',
                textTransform: 'uppercase',
              }}
            >
              PORTFOLIO COMING SOON
            </span>
          </div>
        </m.div>

      </div>
    </section>
  )
}
