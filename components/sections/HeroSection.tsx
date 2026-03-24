'use client'
import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { GlassCard } from '@/components/ui/GlassCard'
import { TextReveal } from '@/components/ui/TextReveal'

const stats: { value: string; label: string }[] = [
  { value: '5+',   label: 'PROJECTS'      },
  { value: '100%', label: 'VERCEL DEPLOY'  },
  { value: '0→∞', label: 'ERROR TO SKILL' },
]

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const geo1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-80px'])
  const geo2Y = useTransform(scrollYProgress, [0, 1], ['0px', '-40px'])
  const geo3Y = useTransform(scrollYProgress, [0, 1], ['0px', '-120px'])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen overflow-hidden pt-40 pb-24"
      style={{ background: 'var(--color-bg)' }}
      aria-label="히어로"
    >
      {/* 3D 기하학 오브젝트 */}
      <m.div
        className="pointer-events-none absolute -top-16 -right-16"
        style={{ y: geo1Y, willChange: 'transform' }}
        aria-hidden="true"
      >
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 40,
            transform: 'rotate(18deg) perspective(800px) rotateX(18deg) rotateY(-18deg)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(235,230,220,0.4))',
            border: '1px solid rgba(0,0,0,0.07)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.06)',
          }}
        />
      </m.div>

      <m.div
        className="pointer-events-none absolute -bottom-20 -left-16"
        style={{ y: geo2Y, willChange: 'transform' }}
        aria-hidden="true"
      >
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            transform: 'perspective(600px) rotateX(25deg) rotateY(10deg)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(230,225,215,0.2))',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
        />
      </m.div>

      <m.div
        className="pointer-events-none absolute"
        style={{ top: 220, right: 160, y: geo3Y, willChange: 'transform' }}
        aria-hidden="true"
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 14,
            transform: 'rotate(12deg) perspective(400px) rotateX(20deg) rotateY(-10deg)',
            background: 'rgba(192,169,106,0.08)',
            border: '1px solid rgba(192,169,106,0.3)',
            boxShadow: '0 8px 24px rgba(192,169,106,0.15)',
          }}
        />
      </m.div>

      {/* 콘텐츠 */}
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        {/* 키커 */}
        <m.div
          className="mb-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--color-gold)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: 4,
              color: '#666',
              fontWeight: 600,
            }}
          >
            FULL-STACK WEB CONSULTING
          </span>
        </m.div>

        {/* 헤드라인 */}
        <h1
          className="mb-8"
          style={{
            fontSize: 'var(--text-display)',
            lineHeight: 0.92,
            fontWeight: 900,
            letterSpacing: '-0.04em',
          }}
        >
          <TextReveal delay={0.1}>오류에서</TextReveal>
          <TextReveal delay={0.2}>
            <span style={{ WebkitTextStroke: '2px #0d0d0d', color: 'transparent' }}>
              설계로
            </span>
          </TextReveal>
          <TextReveal delay={0.3}>
            <span style={{ color: 'var(--color-gold)' }}>완성으로</span>
          </TextReveal>
        </h1>

        {/* 서브카피 */}
        <m.p
          className="mb-12 max-w-[440px] text-[16px] leading-[1.7]"
          style={{ color: 'var(--color-ink-muted)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          수백 번의 실패가 쌓여 하나의 기술이 됐습니다.<br />
          그 기술로 당신의 비즈니스를 웹에 새겨드립니다.
        </m.p>

        {/* 스탯 카드 */}
        <m.div
          className="mb-14 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          role="list"
          aria-label="주요 지표"
        >
          {stats.map(({ value, label }) => (
            <GlassCard key={label} animate={false} className="px-5 py-3.5">
              <div
                role="listitem"
                aria-label={`${label}: ${value}`}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: '-0.05em',
                    color: 'var(--color-ink)',
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: 2,
                    color: '#777',
                    marginTop: 2,
                  }}
                >
                  {label}
                </div>
              </div>
            </GlassCard>
          ))}
        </m.div>

        {/* CTA */}
        <m.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="#work"
            className="rounded-full border border-[#0d0d0d] px-7 py-3.5 text-[13px] font-semibold tracking-[1px] text-[#0d0d0d] transition-all duration-200 hover:bg-[#0d0d0d] hover:text-white hover:scale-[0.98]"
            style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
          >
            포트폴리오 보기
          </a>
          <MagneticButton
            href="#contact"
            className="rounded-full bg-[#0d0d0d] px-7 py-3.5 text-[13px] font-semibold tracking-[1px] text-white"
          >
            프로젝트 문의 →
          </MagneticButton>
        </m.div>
      </div>
    </section>
  )
}
