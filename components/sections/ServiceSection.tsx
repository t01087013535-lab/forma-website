'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

const services = [
  {
    index: '01',
    title: 'UI/UX Design',
    desc: '전략에서 픽셀까지.\n일관된 하나의 비전으로.',
    tags: ['UX Research', 'Brand Identity', 'UI System'],
  },
  {
    index: '02',
    title: 'Full-Stack',
    desc: '설계부터 배포까지.\n모두 직접 구축합니다.',
    tags: ['Next.js', 'FastAPI', 'Supabase'],
  },
  {
    index: '03',
    title: 'Consulting',
    desc: '런칭 이후에도 함께합니다.\n성장의 전 과정에서.',
    tags: ['Vercel', 'CI/CD', 'Monitoring'],
  },
]

export function ServiceSection() {
  const prefersReduced = useReducedMotion()

  function openContactModal() {
    window.dispatchEvent(new Event('open-contact-modal'))
  }

  return (
    <section
      id="service"
      style={{ background: 'transparent' }}
      aria-label="서비스"
    >
      {/* 헤더 */}
      <div className="px-6 md:px-16 pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <m.p
              className="font-mono text-[10px] tracking-[5px] mb-10"
              style={{ color: 'rgba(26,28,25,0.18)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
            >
              SERVICES — FORMA STUDIO
            </m.p>

            <m.h2
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontStyle: 'italic',
                fontSize: 'clamp(56px, 10vw, 140px)',
                fontWeight: 300,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: '#1a1c19',
              }}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              What We<br />
              <em style={{ color: 'var(--color-accent)' }}>Do Best.</em>
            </m.h2>
          </div>

          <m.p
            className="text-[14px] max-w-[260px]"
            style={{ color: 'rgba(26,28,25,0.28)', lineHeight: 1.85 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.2 }}
          >
            단순한 에이전시가 아닙니다. 기획부터 배포까지 전 과정을 완전히 소화하는 풀스택 스튜디오입니다.
          </m.p>
        </div>
      </div>

      {/* 서비스 패널 목록 */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        {services.map((svc, i) => (
          <m.div
            key={svc.index}
            className="py-16 flex flex-col md:flex-row md:items-start md:justify-between gap-8"
            style={{
              borderTop: i === 0 ? '1px solid rgba(26,28,25,0.07)' : undefined,
              borderBottom: '1px solid rgba(26,28,25,0.07)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 번호 + 타이틀 */}
            <div className="md:w-1/2">
              <p
                className="font-mono text-[10px] tracking-[4px] mb-6"
                style={{ color: 'rgba(26,28,25,0.22)' }}
              >
                {svc.index} / {services.length.toString().padStart(2, '0')}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(2rem, 4vw, 4rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: '#1a1c19',
                }}
              >
                {svc.title}
              </h3>
            </div>

            {/* 설명 + 태그 + CTA */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <p
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: 'rgba(26,28,25,0.38)',
                  maxWidth: '28rem',
                  whiteSpace: 'pre-line',
                }}
              >
                {svc.desc}
              </p>

              <div className="flex flex-wrap gap-2" aria-label="기술 태그">
                {svc.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 font-mono text-[9px] tracking-wider"
                    style={{
                      border: '1px solid rgba(103,94,63,0.25)',
                      color: 'rgba(103,94,63,0.65)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={openContactModal}
                className="group flex items-center gap-4 transition-all duration-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 self-start"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                aria-label={`${svc.title} 문의하기`}
              >
                <span
                  className="font-mono text-[10px] tracking-[4px] uppercase transition-colors duration-300"
                  style={{ color: 'rgba(26,28,25,0.28)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,28,25,0.28)' }}
                >
                  Explore Detail
                </span>
                <span
                  className="h-px transition-all duration-700 origin-left group-hover:w-10"
                  style={{ width: '2rem', display: 'block', background: 'rgba(103,94,63,0.35)' }}
                  aria-hidden="true"
                />
              </button>
            </div>
          </m.div>
        ))}
      </div>

      {/* 하단 CTA */}
      <m.div
        className="max-w-[1400px] mx-auto px-6 md:px-16 py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportConfig}
        transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.3 }}
      >
        <p className="font-mono text-[10px] tracking-[4px]" style={{ color: 'rgba(26,28,25,0.12)' }}>
          FORMA STUDIO — 모든 서비스는 직접 수행됩니다
        </p>

        <button
          type="button"
          onClick={openContactModal}
          className="group relative inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
          aria-label="프로젝트 시작하기"
        >
          <span
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: 'rgba(103,94,63,0.60)',
              transition: 'color 0.35s',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(103,94,63,0.60)' }}
          >
            프로젝트 시작하기
          </span>

          <span
            className="flex items-center justify-center transition-all duration-300"
            style={{
              width: 40,
              height: 40,
              border: '1px solid rgba(103,94,63,0.20)',
              color: 'rgba(103,94,63,0.45)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(103,94,63,0.08)'
              el.style.borderColor = 'rgba(103,94,63,0.45)'
              el.style.color = 'var(--color-accent)'
              el.style.transform = 'rotate(45deg)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'transparent'
              el.style.borderColor = 'rgba(103,94,63,0.20)'
              el.style.color = 'rgba(103,94,63,0.45)'
              el.style.transform = 'rotate(0deg)'
            }}
            aria-hidden="true"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </m.div>
    </section>
  )
}
