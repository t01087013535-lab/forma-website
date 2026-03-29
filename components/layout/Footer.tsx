'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@forma.kr'

const navLinks = [
  { href: '#hero',    label: 'Home'    },
  { href: '#work',    label: 'Work'    },
  { href: '#story',   label: 'Story'   },
  { href: '#service', label: 'Service' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Behance',   href: '#' },
]

export function Footer() {
  const prefersReduced = useReducedMotion()
  const year = new Date().getFullYear()

  function openContactModal() {
    window.dispatchEvent(new Event('open-contact-modal'))
  }

  return (
    <footer role="contentinfo" style={{ background: '#f8f6f1', position: 'relative', overflow: 'hidden' }}>

      {/* 배경 대형 FORMA 워터마크 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '6rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-newsreader)',
          fontStyle: 'italic',
          fontWeight: 800,
          fontSize: 'clamp(8rem, 22vw, 22rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(26,28,25,0.05)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        FORMA
      </div>

      {/* 메인 CTA 섹션 */}
      <div className="relative z-10 px-6 md:px-16 pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto">

          {/* 상단 레이블 */}
          <m.p
            className="font-mono text-[9px] tracking-[5px] mb-12"
            style={{ color: 'rgba(26,28,25,0.18)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
          >
            INITIATE PROJECT
          </m.p>

          {/* 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-10">

            {/* 좌: CTA (col-span-7) */}
            <m.div
              className="md:col-span-7"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  color: '#1a1c19',
                  marginBottom: '1.5rem',
                }}
              >
                Ready to build<br />
                the artifact?
              </h2>

              <a
                href={`mailto:${email}`}
                className="font-mono text-[11px] tracking-[3px] uppercase transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/20"
                style={{ color: '#675e3f' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.5' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                {email}
              </a>

              <div className="mt-10">
                <button
                  type="button"
                  onClick={openContactModal}
                  className="inline-flex items-center gap-4 font-mono text-[10px] tracking-[4px] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/20 px-6 py-3"
                  style={{
                    background: '#1a1c19',
                    color: '#f8f6f1',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = '#675e3f'
                    el.style.color = '#f8f6f1'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = '#1a1c19'
                    el.style.color = '#f8f6f1'
                  }}
                >
                  프로젝트 시작하기
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </m.div>

            {/* 우: 소셜 + 내비 (col-span-5) */}
            <m.div
              className="md:col-span-5 grid grid-cols-2 gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.2 }}
            >
              {/* 소셜 */}
              <div>
                <p className="font-mono text-[9px] tracking-[3px] mb-5" style={{ color: 'rgba(26,28,25,0.20)' }}>
                  FOLLOW
                </p>
                <ul className="flex flex-col gap-3" role="list">
                  {socialLinks.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[12px] transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                        style={{ color: 'rgba(26,28,25,0.30)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1a1c19' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,28,25,0.30)' }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 내비 */}
              <div>
                <p className="font-mono text-[9px] tracking-[3px] mb-5" style={{ color: 'rgba(26,28,25,0.20)' }}>
                  NAVIGATE
                </p>
                <nav aria-label="페이지 내 이동">
                  <ul className="flex flex-col gap-3" role="list">
                    {navLinks.map(link => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-[12px] transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                          style={{ color: 'rgba(26,28,25,0.30)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1a1c19' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(26,28,25,0.30)' }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </m.div>

          </div>
        </div>
      </div>

      {/* 하단 바 */}
      <div
        className="relative z-10 px-6 md:px-16 py-6"
        style={{ borderTop: '1px solid rgba(26,28,25,0.08)' }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-mono text-[9px] tracking-[2px]" style={{ color: 'rgba(26,28,25,0.22)' }}>
            © {year} FORMA by Taedong. All rights reserved.
          </p>
          <p className="font-mono text-[9px] tracking-[2px]" style={{ color: 'rgba(26,28,25,0.14)' }}>
            SEOUL, KOREA — 37.5665°N / 126.9780°E
          </p>
        </div>
      </div>

    </footer>
  )
}
