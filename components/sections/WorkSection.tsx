'use client'
// components/sections/WorkSection.tsx
import Image from 'next/image'
import { m } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import { TiltCard } from '@/components/ui/TiltCard'
import { TextReveal } from '@/components/ui/TextReveal'
import { portfolioItems } from '@/lib/portfolio-data'
import { stagger, fadeUp, viewportConfig } from '@/lib/animations'

export function WorkSection() {
  return (
    <section id="work" className="py-[clamp(80px,12vw,160px)]" style={{ background: 'var(--color-bg)' }} aria-label="포트폴리오">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <div className="mb-16">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: '#666', marginBottom: 16 }}>
            WORK
          </p>
          <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            <TextReveal>Vercel 위에 새긴</TextReveal>
            <TextReveal delay={0.1}>
              <span style={{ WebkitTextStroke: '1.5px #0d0d0d', color: 'transparent' }}>다섯 개의 증명</span>
            </TextReveal>
          </h2>
        </div>

        <m.ul
          className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 lg:overflow-visible overflow-x-auto pb-4"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          role="list"
        >
          {portfolioItems.map((item) => (
            <m.li key={item.index} variants={fadeUp} role="listitem">
              {item.isLive ? (
                <TiltCard className="group relative overflow-hidden rounded-2xl bg-white border border-[rgba(0,0,0,0.07)] transition-all duration-300 hover:border-[var(--color-gold)] hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg)]">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 33vw, 20vw"
                      />
                    ) : (
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f7f5f2, #ede9e3)' }} />
                    )}
                    <span
                      className="absolute top-3 left-3 rounded-full border border-[rgba(192,169,106,0.4)] bg-[rgba(192,169,106,0.1)] px-3 py-1 text-[9px] font-bold tracking-[2px]"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      LIVE
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <span className="text-[11px] font-bold tracking-[1px]" style={{ color: 'var(--color-ink)' }}>
                        {item.name}
                      </span>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${item.name} 사이트 방문`}
                        >
                          <ExternalLink size={14} style={{ color: 'var(--color-ink-muted)' }} />
                        </a>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-[var(--color-bg)] px-2.5 py-0.5 text-[9px] font-semibold tracking-[1px]"
                          style={{ color: 'var(--color-ink-muted)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-[#2a2a2a] bg-[#141414]">
                  <Lock size={20} style={{ color: '#333', marginBottom: 12 }} aria-hidden="true" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: '#333' }}>
                    {item.index}
                  </span>
                  <span style={{ fontSize: 11, color: '#444', marginTop: 4 }}>준비 중</span>
                </div>
              )}
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  )
}
