'use client'
// components/sections/ContactSection.tsx
import { m, useReducedMotion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TextReveal } from '@/components/ui/TextReveal'

const email    = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@forma.kr'
const kakaoUrl = process.env.NEXT_PUBLIC_KAKAO_URL

export function ContactSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-[clamp(100px,16vw,200px)]"
      style={{ background: 'var(--color-dark-bg)' }}
      aria-label="프로젝트 문의"
    >
      {/* 배경 스트로크 텍스트 */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(120px, 22vw, 280px)',
          fontWeight: 900,
          letterSpacing: '-0.06em',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          color: 'transparent',
          lineHeight: 1,
          fontFamily: 'var(--font-display)',
        }}
      >
        FORMA
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <p
          className="font-mono text-[11px] tracking-[4px] text-zinc-600 mb-6"
          style={{ fontFeatureSettings: "'ss01'" }}
        >
          CONTACT
        </p>

        <m.h2
          className="mb-8 md:mb-16"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'var(--text-h1)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#ededed',
          }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6 }}
        >
          <TextReveal>당신의 비전에</TextReveal>
          <TextReveal delay={0.1}>형태를 부여할</TextReveal>
          <TextReveal delay={0.2}>
            <span style={{ color: 'var(--color-gold)' }}>준비가 됐습니다</span>
          </TextReveal>
        </m.h2>

        <div className="flex flex-wrap items-center gap-6">
          <MagneticButton
            href={`mailto:${email}`}
            className="rounded-full px-8 py-4 text-[13px] font-bold tracking-[1px] text-white transition-all duration-200"
            style={{ background: 'var(--color-blue)' }}
          >
            프로젝트 시작하기 →
          </MagneticButton>

          {kakaoUrl && kakaoUrl !== '#' && (
            <a
              href={kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] tracking-[1px] text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Mail size={16} aria-hidden="true" />
              {email}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
