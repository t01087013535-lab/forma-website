'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

interface Block {
  label: string
  title: string
  body: string
}

export function WorkNarrative({ challenge, approach }: { challenge: string; approach: string }) {
  const prefersReduced = useReducedMotion()
  const blocks: Block[] = [
    { label: 'CHALLENGE', title: '문제', body: challenge },
    { label: 'APPROACH', title: '접근', body: approach },
  ]

  return (
    <section aria-label="Challenge and approach" className="px-6 md:px-16 pb-24">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
        {blocks.map((block, i) => (
          <m.article
            key={block.label}
            className="section-divider pt-10"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.7, delay: i * 0.08 }}
          >
            <p
              className="font-mono text-[10px] tracking-[5px] mb-5"
              style={{ color: 'rgba(103,94,63,0.9)' }}
            >
              {block.label}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-korean-serif)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.12,
                color: '#1a1c19',
              }}
            >
              {block.title}
            </h2>
            <p
              className="mt-6 text-[15px] md:text-[16px] leading-[1.8]"
              style={{
                fontFamily: 'var(--font-korean)',
                color: 'rgba(26,28,25,0.78)',
              }}
            >
              {block.body}
            </p>
          </m.article>
        ))}
      </div>
    </section>
  )
}
