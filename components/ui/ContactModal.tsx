'use client'
import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@forma.kr'

/* ─────────────────────────────────────────────
   Elegant animated close button
   Outer ring draws clockwise on hover,
   X lines brighten simultaneously.
───────────────────────────────────────────── */
function CloseButton({ onClick, buttonRef }: { onClick: () => void; buttonRef?: React.RefObject<HTMLButtonElement | null> }) {
  const [hovered, setHovered] = useState(false)
  const RADIUS = 21
  const CIRCUM = 2 * Math.PI * RADIUS

  return (
    <m.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute top-6 right-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:rounded-full"
      aria-label="닫기 (Escape)"
      whileTap={{ scale: 0.92 }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48 }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        {/* Static faint base ring */}
        <circle
          cx="24" cy="24" r={RADIUS}
          stroke="rgba(245,245,240,0.10)"
          strokeWidth="0.75"
        />
        {/* Animated progress ring — draws on hover */}
        <circle
          cx="24" cy="24" r={RADIUS}
          stroke="rgba(245,245,240,0.50)"
          strokeWidth="0.75"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRCUM}
          strokeDashoffset={hovered ? 0 : CIRCUM}
          transform="rotate(-90 24 24)"
          style={{ transition: 'stroke-dashoffset 0.55s cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {/* X — left diagonal */}
        <line
          x1="17" y1="17" x2="31" y2="31"
          strokeWidth="1"
          strokeLinecap="round"
          stroke={hovered ? 'rgba(245,245,240,0.90)' : 'rgba(245,245,240,0.40)'}
          style={{ transition: 'stroke 0.2s' }}
        />
        {/* X — right diagonal */}
        <line
          x1="31" y1="17" x2="17" y2="31"
          strokeWidth="1"
          strokeLinecap="round"
          stroke={hovered ? 'rgba(245,245,240,0.90)' : 'rgba(245,245,240,0.40)'}
          style={{ transition: 'stroke 0.2s' }}
        />
      </svg>
    </m.button>
  )
}

export function ContactModal() {
  const prefersReduced             = useReducedMotion()
  const [isOpen, setIsOpen]        = useState(false)
  const [submitted, setSubmitted]  = useState(false)
  const closeButtonRef             = useRef<HTMLButtonElement>(null)
  const firstFocusRef              = useRef<HTMLInputElement>(null)
  const dialogRef                  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOpen() { setIsOpen(true); setSubmitted(false) }
    window.addEventListener('open-contact-modal', handleOpen)
    return () => window.removeEventListener('open-contact-modal', handleOpen)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => firstFocusRef.current?.focus(), 150)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key !== 'Tab') return
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last  = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  function close() { setIsOpen(false) }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  const easing = [0.22, 1, 0.36, 1] as const
  const dur    = prefersReduced ? 0.01 : 0.65

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── 배경 오버레이 ── */}
          <m.div
            className="fixed inset-0 z-[99]"
            style={{ background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0.01 : 0.4 }}
            onClick={close}
            aria-hidden="true"
          />

          {/* ── 모달 패널 ── */}
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="프로젝트 문의"
            className="fixed inset-0 z-[100] overflow-y-auto grid lg:grid-cols-[1fr_1fr] pointer-events-none"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: dur, ease: easing, delay: 0.05 }}
            style={{ pointerEvents: 'none' }}
          >

            {/* ── 왼쪽: 에디토리얼 패널 ── */}
            <div
              className="relative hidden lg:flex flex-col justify-end overflow-hidden pointer-events-auto"
              style={{ pointerEvents: 'auto' }}
              onClick={e => e.stopPropagation()}
            >
              {/* 배경 이미지 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.30, filter: 'grayscale(0.4)' }}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.30) 50%, rgba(10,10,10,0.10) 100%)' }}
              />

              {/* 장식 배경 문자 */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-0.15em',
                  left: '-0.05em',
                  fontFamily: 'var(--font-newsreader)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(14rem, 30vw, 28rem)',
                  lineHeight: 0.85,
                  WebkitTextStroke: '1px rgba(245,245,240,0.06)',
                  color: 'transparent',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                F
              </span>

              {/* 텍스트 콘텐츠 */}
              <div className="relative z-10 p-14">
                <p className="font-mono text-[10px] tracking-[5px] mb-8" style={{ color: 'rgba(245,245,240,0.28)' }}>
                  FORMA STUDIO
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(40px, 5vw, 68px)',
                    fontWeight: 300,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: 'var(--color-paper)',
                  }}
                >
                  Let&apos;s<br />
                  <em style={{ color: 'rgba(205,193,155,0.92)' }}>Evolve.</em>
                </h2>
                <p className="mt-5 text-[13px] leading-loose max-w-xs" style={{ color: 'rgba(245,245,240,0.35)' }}>
                  프로젝트 아이디어가 있으신가요?<br />
                  어떤 단계에 있더라도 연락주세요.
                </p>
                <div className="mt-10 flex flex-col gap-1">
                  <p className="font-mono text-[9px] tracking-[3px]" style={{ color: 'rgba(245,245,240,0.22)' }}>
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="text-[13px] transition-colors duration-200"
                    style={{ color: 'rgba(245,245,240,0.50)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,240,0.85)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,240,0.50)' }}
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* ── 오른쪽: 폼 패널 ── */}
            <div
              className="relative flex flex-col justify-center p-8 lg:p-14 pointer-events-auto"
              style={{ background: '#0a0a0a', minHeight: '100vh' }}
              onClick={e => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <CloseButton onClick={close} buttonRef={closeButtonRef} />

              {/* 모바일 헤더 */}
              <div className="mb-10 lg:hidden">
                <p className="font-mono text-[9px] tracking-[4px] mb-4" style={{ color: 'rgba(245,245,240,0.25)' }}>
                  CONTACT
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(32px, 8vw, 48px)',
                    fontWeight: 300,
                    letterSpacing: '-0.025em',
                    color: 'var(--color-paper)',
                  }}
                >
                  Let&apos;s Evolve.
                </h2>
              </div>

              {submitted ? (
                /* ── 제출 완료 ── */
                <m.div
                  className="text-center py-12 max-w-sm mx-auto"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easing }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-newsreader)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(36px, 6vw, 60px)',
                      fontWeight: 300,
                      letterSpacing: '-0.03em',
                      color: 'var(--color-paper)',
                      lineHeight: 1.1,
                    }}
                  >
                    감사합니다.
                  </p>
                  <p className="mt-4 text-[13px] leading-loose" style={{ color: 'rgba(245,245,240,0.38)' }}>
                    빠른 시일 내에 연락드리겠습니다.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-10 inline-flex items-center gap-3 rounded-full px-8 py-3 font-mono text-[9px] tracking-[3px] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                    style={{ border: '1px solid rgba(245,245,240,0.14)', color: 'rgba(245,245,240,0.40)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(245,245,240,0.06)'
                      el.style.color = 'rgba(245,245,240,0.80)'
                      el.style.borderColor = 'rgba(245,245,240,0.28)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'transparent'
                      el.style.color = 'rgba(245,245,240,0.40)'
                      el.style.borderColor = 'rgba(245,245,240,0.14)'
                    }}
                  >
                    닫기
                  </button>
                </m.div>
              ) : (
                /* ── 폼 ── */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-9 max-w-[460px] w-full"
                >
                  <p className="font-mono text-[9px] tracking-[4px] hidden lg:block" style={{ color: 'rgba(245,245,240,0.18)' }}>
                    NEW PROJECT
                  </p>

                  {([
                    { id: 'modal-name',  name: 'name',  type: 'text',  label: '이름', labelEn: 'NAME',    placeholder: '홍길동',            autoComplete: 'name'  },
                    { id: 'modal-email', name: 'email', type: 'email', label: '이메일', labelEn: 'EMAIL',   placeholder: 'hello@example.com', autoComplete: 'email' },
                  ] as const).map((field, i) => (
                    <div key={field.id} className="flex flex-col gap-2.5">
                      <label
                        htmlFor={field.id}
                        className="font-mono text-[9px] tracking-[3px] flex items-center gap-2"
                        style={{ color: 'rgba(245,245,240,0.25)' }}
                      >
                        {field.label}
                        <span style={{ color: 'rgba(245,245,240,0.12)' }}>/ {field.labelEn}</span>
                      </label>
                      <input
                        ref={i === 0 ? firstFocusRef : undefined}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        required
                        autoComplete={field.autoComplete}
                        className="bg-transparent pb-3.5 text-[14px] transition-colors focus:outline-none placeholder:text-white/15"
                        style={{
                          borderBottom: '1px solid rgba(245,245,240,0.10)',
                          color: 'rgba(245,245,240,0.85)',
                          caretColor: 'rgba(205,193,155,0.8)',
                        }}
                        placeholder={field.placeholder}
                        onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(205,193,155,0.45)')}
                        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,240,0.10)')}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-2.5">
                    <label
                      htmlFor="modal-message"
                      className="font-mono text-[9px] tracking-[3px] flex items-center gap-2"
                      style={{ color: 'rgba(245,245,240,0.25)' }}
                    >
                      프로젝트 내용
                      <span style={{ color: 'rgba(245,245,240,0.12)' }}>/ MESSAGE</span>
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      required
                      rows={4}
                      className="resize-none bg-transparent pb-3.5 text-[14px] leading-relaxed transition-colors focus:outline-none placeholder:text-white/15"
                      style={{
                        borderBottom: '1px solid rgba(245,245,240,0.10)',
                        color: 'rgba(245,245,240,0.85)',
                        caretColor: 'rgba(205,193,155,0.8)',
                      }}
                      placeholder="어떤 프로젝트를 구상 중이신가요?"
                      onFocus={e => (e.currentTarget.style.borderBottomColor = 'rgba(205,193,155,0.45)')}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,240,0.10)')}
                    />
                  </div>

                  {/* 제출 + 닫기 */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-mono text-[10px] tracking-[3px] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                      style={{ background: 'rgba(245,245,240,0.94)', color: '#0a0a0a' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'rgba(205,193,155,0.90)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'rgba(245,245,240,0.94)'
                      }}
                    >
                      보내기
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* 우아한 닫기 텍스트 버튼 */}
                    <button
                      type="button"
                      onClick={close}
                      className="group flex items-center gap-2 focus-visible:outline-none focus-visible:underline"
                      style={{ color: 'rgba(245,245,240,0.22)', transition: 'color 0.25s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,240,0.55)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,240,0.22)' }}
                      aria-label="닫기"
                    >
                      <span
                        className="font-mono text-[9px] tracking-[3px] uppercase"
                        style={{ display: 'block', lineHeight: 1 }}
                      >
                        닫기
                      </span>
                      {/* 장식 선 */}
                      <span
                        style={{
                          display: 'block',
                          width: 20,
                          height: '1px',
                          background: 'currentColor',
                          transition: 'width 0.3s cubic-bezier(0.22,1,0.36,1)',
                        }}
                        className="group-hover:!w-8"
                      />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
