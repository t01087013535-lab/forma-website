'use client'
import { m, useReducedMotion } from 'framer-motion'

import { MagneticButton } from '@/components/ui/MagneticButton'
import { viewportConfig } from '@/lib/animations'

export function RoadmapCTA() {
  const prefersReduced = useReducedMotion()

  function openContact() {
    window.dispatchEvent(new Event('open-contact-modal'))
  }

  return (
    <section
      aria-label="로드맵 마무리"
      className="px-6 md:px-16 py-32 md:py-44 section-divider"
    >
      <div className="max-w-[1400px] mx-auto">
        <div style={{ overflow: 'hidden' }}>
          <m.p
            className="max-w-[24ch]"
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontWeight: 300,
              fontSize: 'clamp(1.875rem, 4.5vw, 4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1a1c19',
            }}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '60%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={
              prefersReduced ? { duration: 0.01 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
            }
          >
            미팅은 목표가 아니라 <span style={{ fontStyle: 'italic' }}>증거</span>다.
          </m.p>
        </div>

        <m.p
          className="mt-8 max-w-[52ch] text-[16px] leading-[1.75]"
          style={{ fontFamily: 'var(--font-korean-serif)', color: 'rgba(26,28,25,0.7)' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.8, delay: 0.2 }}
        >
          5년 동안 만들 것은 만남이 아니라, 만나야 할 이유다. 이 로드맵은
          매년 갱신되며, 누적된 자산은 미팅 성사 여부와 무관하게 태동그룹의
          것으로 남는다.
        </m.p>

        <m.div
          className="mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.4 }}
        >
          <MagneticButton
            className="inline-flex items-center gap-3 px-8 py-4"
            style={{
              background: '#1a1c19',
              color: '#f8f6f1',
              fontFamily: 'var(--font-korean)',
              fontSize: 14,
              letterSpacing: '0.06em',
            }}
            onClick={openContact}
          >
            로드맵에 관해 대화하기
            <span aria-hidden="true">→</span>
          </MagneticButton>
        </m.div>
      </div>
    </section>
  )
}
