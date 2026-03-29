'use client'
import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@forma.kr'

const serviceTypes = [
  { value: 'design',    label: '기획 · 디자인' },
  { value: 'fullstack', label: '풀스택 개발' },
  { value: 'deploy',    label: '배포 · 운영' },
  { value: 'full',      label: '전체 패키지' },
]

const budgetRanges = [
  { value: 'under_5m',  label: '500만원 미만' },
  { value: '5m_10m',    label: '500 – 1,000만원' },
  { value: '10m_30m',   label: '1,000 – 3,000만원' },
  { value: 'over_30m',  label: '3,000만원 이상' },
]

const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(250,250,245,0.10)',
  color: 'var(--color-paper)',
  caretColor: 'var(--color-gold)',
  fontSize: '15px',
  width: '100%',
  outline: 'none',
  paddingBottom: '12px',
  transition: 'border-color 0.3s',
}

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(103,94,63,0.60)'
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.currentTarget.style.borderBottomColor = 'rgba(250,250,245,0.10)'
}

export function ContactSection() {
  const prefersReduced = useReducedMotion()
  const [submitted, setSubmitted]   = useState(false)
  const [service, setService]       = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: 'var(--color-ink)', minHeight: '100svh' }}
      aria-label="프로젝트 문의"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-16 py-20 min-h-[100svh] flex flex-col">

        {/* 상단 레이블 바 */}
        <div className="flex items-center justify-between mb-16 md:mb-24">
          <p className="font-mono text-[10px] tracking-[5px]" style={{ color: 'rgba(250,250,245,0.25)' }}>
            CONTACT
          </p>
          <a
            href={`mailto:${email}`}
            className="font-mono text-[10px] tracking-[2px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            style={{ color: 'rgba(250,250,245,0.25)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(250,250,245,0.70)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,250,245,0.25)')}
          >
            {email}
          </a>
        </div>

        {/* 메인 그리드 */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-32 items-start">

          {/* 좌측: 에디토리얼 헤드라인 */}
          <div className="lg:sticky lg:top-24">
            <m.h2
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontStyle: 'italic',
                fontSize: 'clamp(52px, 7.5vw, 110px)',
                fontWeight: 300,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: 'var(--color-paper)',
              }}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              프로젝트를<br />
              시작할<br />
              <em style={{ color: 'var(--color-cyan)' }}>준비됐나요?</em>
            </m.h2>

            <m.p
              className="text-[14px] mt-10 max-w-[320px]"
              style={{ color: 'rgba(250,250,245,0.40)', lineHeight: 1.9 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.2 }}
            >
              아이디어 단계여도 괜찮습니다.<br />
              기획부터 배포까지 함께합니다.
            </m.p>

            <m.div
              className="mt-12 hidden lg:flex flex-col gap-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5, delay: 0.3 }}
            >
              <p className="font-mono text-[9px] tracking-[3px]" style={{ color: 'rgba(250,250,245,0.20)' }}>
                EMAIL DIRECT
              </p>
              <a
                href={`mailto:${email}`}
                className="text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                style={{ color: 'rgba(250,250,245,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(250,250,245,0.90)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,250,245,0.45)')}
              >
                {email}
              </a>
            </m.div>
          </div>

          {/* 우측: 폼 */}
          {submitted ? (
            <m.div
              className="flex flex-col justify-start py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              role="status"
              aria-live="polite"
            >
              <p
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-paper)',
                  lineHeight: 1,
                }}
              >
                감사합니다.
              </p>
              <p className="text-[14px] mt-6" style={{ color: 'rgba(250,250,245,0.40)', lineHeight: 1.8 }}>
                빠른 시일 내에 연락드리겠습니다.
              </p>
            </m.div>
          ) : (
            <m.form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col"
              aria-label="프로젝트 문의 양식"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.15 }}
            >

              {/* 01 이름 */}
              <div className="py-8">
                <label htmlFor="c-name" className="font-mono text-[9px] tracking-[4px] block mb-4"
                  style={{ color: 'rgba(250,250,245,0.28)' }}>
                  01 — NAME / 이름
                </label>
                <input
                  id="c-name" name="name" type="text" required autoComplete="name"
                  placeholder="홍길동"
                  style={inputStyle}
                  className="placeholder:text-white/20"
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              {/* 02 이메일 */}
              <div className="py-8">
                <label htmlFor="c-email" className="font-mono text-[9px] tracking-[4px] block mb-4"
                  style={{ color: 'rgba(250,250,245,0.28)' }}>
                  02 — EMAIL / 이메일
                </label>
                <input
                  id="c-email" name="email" type="email" required autoComplete="email"
                  placeholder="hello@example.com"
                  style={inputStyle}
                  className="placeholder:text-white/20"
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              {/* 03 서비스 유형 */}
              <div className="py-8">
                <p className="font-mono text-[9px] tracking-[4px] mb-5"
                  style={{ color: 'rgba(250,250,245,0.28)' }}
                  id="c-service-label">
                  03 — SERVICE / 서비스 유형
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-labelledby="c-service-label"
                >
                  {serviceTypes.map(s => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setService(prev => prev === s.value ? '' : s.value)}
                      className="px-4 py-2 text-[11px] font-mono tracking-[1px] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                      style={{
                        borderRadius: 0,
                        border: service === s.value ? '1px solid rgba(103,94,63,0.45)' : '1px solid rgba(250,250,245,0.15)',
                        background: service === s.value ? 'rgba(103,94,63,0.12)' : 'transparent',
                        color: service === s.value ? 'var(--color-gold)' : 'rgba(250,250,245,0.55)',
                      }}
                      aria-pressed={service === s.value}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="service" value={service} />
              </div>

              {/* 04 예산 */}
              <div className="py-8">
                <label htmlFor="c-budget" className="font-mono text-[9px] tracking-[4px] block mb-4"
                  style={{ color: 'rgba(250,250,245,0.28)' }}>
                  04 — BUDGET / 예산 범위
                </label>
                <select
                  id="c-budget" name="budget"
                  defaultValue=""
                  style={{ ...inputStyle, appearance: 'none' } as React.CSSProperties}
                  className="cursor-pointer"
                  onFocus={onFocus} onBlur={onBlur}
                >
                  <option value="" disabled style={{ background: '#1a1c19', color: 'rgba(250,250,245,0.3)' }}>선택해주세요</option>
                  {budgetRanges.map(b => (
                    <option key={b.value} value={b.value} style={{ background: '#1a1c19', color: '#fafaf5' }}>{b.label}</option>
                  ))}
                </select>
              </div>

              {/* 05 메시지 */}
              <div className="py-8">
                <label htmlFor="c-message" className="font-mono text-[9px] tracking-[4px] block mb-4"
                  style={{ color: 'rgba(250,250,245,0.28)' }}>
                  05 — MESSAGE / 메시지
                </label>
                <textarea
                  id="c-message" name="message" required rows={4}
                  placeholder="어떤 프로젝트를 구상 중이신가요?"
                  className="resize-none placeholder:text-white/20"
                  style={{ ...inputStyle, lineHeight: '1.8' } as React.CSSProperties}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>

              {/* 제출 */}
              <div className="pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <p className="font-mono text-[9px] tracking-[3px]" style={{ color: 'rgba(250,250,245,0.18)' }}>
                  모든 문의에 48h 내 회신드립니다
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-10 py-4 text-[11px] tracking-[3px] uppercase font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
                  style={{
                    borderRadius: 0,
                    background: 'var(--color-paper)',
                    color: 'var(--color-ink)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0,219,233,0.15)'
                    e.currentTarget.style.color = 'var(--color-cyan)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--color-paper)'
                    e.currentTarget.style.color = 'var(--color-ink)'
                  }}
                >
                  문의 보내기
                  <ArrowUpRight size={12} aria-hidden="true" />
                </button>
              </div>
            </m.form>
          )}
        </div>

        {/* 하단 */}
        <div className="mt-20 pt-8">
          <p className="font-mono text-[9px] tracking-[4px] text-center" style={{ color: 'rgba(250,250,245,0.15)' }}>
            FORMA STUDIO — SEOUL, KOREA — EST. 2024
          </p>
        </div>
      </div>
    </section>
  )
}
