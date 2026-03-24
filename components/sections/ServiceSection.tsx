'use client'
// components/sections/ServiceSection.tsx
import { m } from 'framer-motion'
import { Pencil, Code2, Rocket } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { TextReveal } from '@/components/ui/TextReveal'
import { stagger, viewportConfig } from '@/lib/animations'

const services = [
  {
    icon: Pencil,
    title: '기획·디자인',
    desc: '사용자 경험 설계와 브랜드 정체성을 함께 만듭니다. 전략부터 UI까지 일관된 비전으로.',
  },
  {
    icon: Code2,
    title: '풀스택 개발',
    desc: 'Next.js · FastAPI · Supabase — 처음부터 끝까지 직접 구축합니다. 추가 비용 없이.',
  },
  {
    icon: Rocket,
    title: '배포·운영 컨설팅',
    desc: 'Vercel 배포, 성능 최적화, 지속적인 개선. 런칭 이후에도 함께합니다.',
  },
]

const techTags = ['Next.js', 'React 19', 'Tailwind v4', 'TypeScript', 'Supabase', 'FastAPI', 'Vercel']

export function ServiceSection() {
  return (
    <section id="service" className="py-[clamp(80px,12vw,160px)]" style={{ background: 'var(--color-bg)' }} aria-label="서비스">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <div className="mb-16">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: '#666', marginBottom: 16 }}>
            SERVICE
          </p>
          <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            <TextReveal>웹의 처음부터 끝까지,</TextReveal>
            <TextReveal delay={0.1}>
              <span style={{ WebkitTextStroke: '1.5px #0d0d0d', color: 'transparent' }}>하나의 팀이 책임집니다</span>
            </TextReveal>
          </h2>
        </div>

        <m.ul
          className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          role="list"
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <li key={title} role="listitem">
              <GlassCard className="flex h-full flex-col p-8">
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: 'var(--color-gold-dim)' }}
                >
                  <Icon size={22} style={{ color: 'var(--color-gold)' }} aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-[17px] font-bold" style={{ color: 'var(--color-ink)' }}>{title}</h3>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--color-ink-muted)' }}>{desc}</p>
              </GlassCard>
            </li>
          ))}
        </m.ul>

        <m.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          aria-label="사용 기술 스택"
        >
          {techTags.map(tag => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(0,0,0,0.1)] bg-white px-4 py-1.5 text-[11px] font-semibold tracking-[1px]"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {tag}
            </span>
          ))}
        </m.div>
      </div>
    </section>
  )
}
