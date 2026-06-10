'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'
import type { WorkCase } from '@/lib/data/work'

export function WorkOutcome({ outcome }: { outcome: WorkCase['outcome'] }) {
  const prefersReduced = useReducedMotion()

  return (
    <section aria-label="Outcome metrics" className="px-6 md:px-16 pb-32">
      <div className="max-w-[1400px] mx-auto">
        <p
          className="font-mono text-[10px] tracking-[5px] mb-10"
          style={{ color: 'rgba(26,28,25,0.35)' }}
        >
          OUTCOME — THREE SIGNALS
        </p>

        <div className="grid md:grid-cols-3 gap-x-12 gap-y-12">
          {outcome.map((item, i) => (
            <m.div
              key={item.label}
              className="section-divider pt-8"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: i * 0.08 }}
            >
              <p
                className="font-mono text-[10px] tracking-[5px] mb-5"
                style={{ color: 'rgba(26,28,25,0.4)' }}
              >
                {String(i + 1).padStart(2, '0')} — {item.label.toUpperCase()}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: '#1a1c19',
                }}
              >
                {item.value}
              </p>
              <p
                className="mt-5 text-[14px] leading-[1.6] max-w-[28ch]"
                style={{
                  fontFamily: 'var(--font-korean)',
                  color: 'rgba(26,28,25,0.65)',
                }}
              >
                {item.detail}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
