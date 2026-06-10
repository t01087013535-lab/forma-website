'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

export function ServicesHero() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="서비스 소개"
      className="px-6 md:px-16 pt-40 pb-24 md:pt-48 md:pb-32"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <m.p
          className="font-mono text-[10px] tracking-[5px] mb-10"
          style={{ color: 'rgba(26,28,25,0.18)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
        >
          SERVICES — 01 / 03
        </m.p>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-8" style={{ overflow: 'hidden' }}>
            <m.h1
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(2.75rem, 7vw, 6.5rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: '#1a1c19',
              }}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '110%' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              Consulting that<br />
              <span style={{ fontStyle: 'normal' }}>stays past launch.</span>
            </m.h1>
          </div>

          <m.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.8, delay: 0.25 }}
          >
            <p
              className="text-[15px] md:text-[16px] leading-[1.65]"
              style={{
                fontFamily: 'var(--font-korean)',
                color: 'rgba(26,28,25,0.72)',
              }}
            >
              태동은 기업의 웹을 설계하고, 제품을 구축하고, 운영까지
              함께합니다. 세 가지 컨설팅 패키지는 각각 다른 단계의
              파트너십이지만, 모두 같은 원칙에서 출발합니다 —
              오류에서 설계로, 설계에서 완성으로.
            </p>
          </m.div>
        </div>
      </div>
    </section>
  )
}
