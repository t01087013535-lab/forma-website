'use client'
import { m, useReducedMotion } from 'framer-motion'

export function HeroSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-40 pb-24"
      style={{ background: 'var(--color-dark-bg)' }}
      aria-label="히어로"
    >
      {/* 배경 글로우 — Stitch #137fec */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full -z-10"
        style={{ background: 'var(--color-blue-glow)', filter: 'blur(140px)' }}
        aria-hidden="true"
      />

      {/* 콘텐츠 */}
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">

        {/* 배지 */}
        <m.div
          className="mb-8"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.1 }}
        >
          <span
            className="inline-block border px-4 py-1.5 rounded-full text-[12px] font-mono tracking-widest"
            style={{ borderColor: 'var(--color-blue-glow)', background: 'var(--color-blue-dim)', color: 'var(--color-blue)' }}
          >
            BASED IN SEOUL / DIGITAL STUDIO
          </span>
        </m.div>

        {/* 헤드라인 — Cormorant Garamond */}
        <m.h1
          className="mb-8 text-6xl md:text-8xl font-light tracking-tight"
          style={{ lineHeight: 0.88, color: '#ededed', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          당신의 비전에<br />
          <span style={{ color: 'var(--color-blue)', fontStyle: 'italic', fontWeight: 500 }}>형태를 부여합니다</span>
        </m.h1>

        {/* 서브카피 */}
        <m.p
          className="mb-12 max-w-[480px] text-lg md:text-xl leading-relaxed text-zinc-400"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.4 }}
        >
          수백 번의 실패가 쌓여 하나의 기술이 됐습니다.<br />
          그 기술로 당신의 비즈니스를 웹에 새겨드립니다.
        </m.p>

        {/* CTA */}
        <m.div
          className="flex flex-wrap gap-4"
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.55 }}
        >
          <a
            href="#work"
            className="rounded-full border border-white/20 px-7 py-3.5 text-[13px] font-semibold tracking-[1px] text-[#ededed] transition-all duration-200 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
          >
            포트폴리오 보기
          </a>
          <a
            href="#contact"
            className="rounded-full px-7 py-3.5 text-[13px] font-semibold tracking-[1px] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            style={{
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--color-blue)',
              color: '#fff',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0f6fd4')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-blue)')}
          >
            프로젝트 문의 →
          </a>
        </m.div>
      </div>
    </section>
  )
}
