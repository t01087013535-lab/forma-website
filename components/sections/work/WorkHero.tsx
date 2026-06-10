'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'
import type { WorkCase } from '@/lib/data/work'

export function WorkHero({ work }: { work: WorkCase }) {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label={`${work.client} 케이스 히어로`}
      className="px-6 md:px-16 pt-40 pb-20 md:pt-48 md:pb-28"
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
          CASE STUDY — {work.client.toUpperCase()}
        </m.p>

        <div style={{ overflow: 'hidden' }}>
          <m.h1
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(2.75rem, 7.5vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#1a1c19',
            }}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '110%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {work.title}
          </m.h1>
        </div>

        <m.p
          className="mt-8 max-w-[52ch] text-[17px] leading-[1.55]"
          style={{
            fontFamily: 'var(--font-korean-serif)',
            color: 'rgba(26,28,25,0.78)',
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.8, delay: 0.25 }}
        >
          {work.subtitle}
        </m.p>

        <p
          className="mt-4 max-w-[56ch] text-[15px] leading-[1.7]"
          style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.65)' }}
        >
          {work.lede}
        </p>

        <dl
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 section-divider pt-10"
          aria-label="프로젝트 메타데이터"
        >
          <MetaItem label="Period" value={work.period} />
          <MetaItem label="Role" value={work.role} />
          <MetaItem label="Client" value={work.client} />
          <MetaItem label="Stack" value={work.stack.join(' · ')} />
        </dl>
      </div>
    </section>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        className="font-mono text-[10px] tracking-[5px] mb-3"
        style={{ color: 'rgba(26,28,25,0.35)' }}
      >
        {label.toUpperCase()}
      </dt>
      <dd
        className="text-[14px] md:text-[15px] leading-[1.5]"
        style={{
          fontFamily: 'var(--font-newsreader)',
          color: 'rgba(26,28,25,0.85)',
        }}
      >
        {value}
      </dd>
    </div>
  )
}
