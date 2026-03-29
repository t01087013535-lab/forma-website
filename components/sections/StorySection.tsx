'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

const stats = [
  { value: '15+',  label: 'PROJECTS', ariaLabel: '15개 이상의 프로젝트' },
  { value: '3',    label: 'SERVICES', ariaLabel: '3가지 핵심 서비스' },
  { value: '100%', label: 'IN-HOUSE', ariaLabel: '100% 직접 개발' },
  { value: '2024', label: 'EST.',     ariaLabel: '2024년 설립' },
]

const steps = [
  {
    number: '01',
    title: '첫 프로젝트',
    titleEn: 'First Project',
    tag: 'ORIGIN',
    desc: '아무것도 없이 시작했습니다.\n모든 오류가 우리의 재료였습니다.',
  },
  {
    number: '02',
    title: '오류 기록',
    titleEn: 'Error Analysis',
    tag: 'ANALYSIS',
    desc: '실패를 체계화했습니다.\n아무도 기록하지 않는 방식으로.',
  },
  {
    number: '03',
    title: '패턴 발견',
    titleEn: 'Pattern Recognition',
    tag: 'RESEARCH',
    desc: '반복 뒤에는 공식이 있었습니다.\n우리는 그것을 찾아냈습니다.',
  },
  {
    number: '04',
    title: '스킬화',
    titleEn: 'Systemization',
    tag: 'BUILD',
    desc: '해결책을 도구로 만들었습니다.\n지식이 쌓이고 속도가 붙었습니다.',
  },
  {
    number: '05',
    title: 'FORMA',
    titleEn: 'The Platform',
    tag: 'PLATFORM',
    desc: '완전한 플랫폼의 완성.\n당신의 비전에 형태를 부여합니다.',
    isLast: true,
  },
]

export function StorySection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="story"
      style={{ background: 'transparent' }}
      aria-label="우리의 서사"
    >
      {/* 대형 헤드라인 */}
      <div className="px-6 md:px-16 pt-24 pb-20">
        <m.p
          className="font-mono text-[10px] tracking-[5px] mb-10"
          style={{ color: 'rgba(26,28,25,0.20)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
        >
          STORY — FORMA STUDIO
        </m.p>

        <m.h2
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontStyle: 'italic',
            fontSize: 'clamp(80px, 15vw, 220px)',
            fontWeight: 300,
            lineHeight: 0.86,
            letterSpacing: '-0.04em',
            color: '#1a1c19',
          }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          OUR<br />
          STORY
        </m.h2>
      </div>

      {/* 인트로 + 크리드 */}
      <div className="px-6 md:px-16 pt-4 pb-20 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
        <m.p
          className="text-[15px] max-w-lg"
          style={{ color: 'rgba(26,28,25,0.38)', lineHeight: 1.9 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.1 }}
        >
          실패의 기록이 방법론이 됐습니다.
          반복된 오류가 정밀함을 만들었습니다.
        </m.p>

        <m.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.2 }}
        >
          <span
            className="font-mono text-[9px] tracking-[3px] whitespace-nowrap shrink-0"
            style={{ color: 'rgba(26,28,25,0.20)' }}
          >
            The Forma Creed
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: 'rgba(26,28,25,0.08)' }}
            aria-hidden="true"
          />
        </m.div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ background: '#f0ede7', borderTop: '1px solid rgba(26,28,25,0.06)', borderBottom: '1px solid rgba(26,28,25,0.06)' }}
      >
        {stats.map((stat, i) => (
          <m.div
            key={stat.label}
            className="py-14 px-8 md:px-10 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: i * 0.06 }}
          >
            <span
              aria-label={stat.ariaLabel}
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#675e3f',
              }}
            >
              {stat.value}
            </span>
            <span
              className="font-mono text-[10px] tracking-[4px] mt-2"
              style={{ color: 'rgba(26,28,25,0.28)' }}
            >
              {stat.label}
            </span>
          </m.div>
        ))}
      </div>

      {/* 스텝 패널 (교차 분할) */}
      <ol>
        {steps.map((step, i) => {
          const isReverse = i % 2 === 1
          const panelBg   = i % 2 === 0 ? '#f0ede7' : '#f8f6f1'

          return (
            <li key={step.number}>
              <div
                className={
                  isReverse
                    ? 'flex flex-col md:flex-row-reverse items-stretch md:min-h-screen'
                    : 'flex flex-col md:flex-row items-stretch md:min-h-screen'
                }
              >
                {/* 이미지 placeholder 하프 */}
                <div
                  className="w-full md:w-1/2 relative overflow-hidden"
                  style={{
                    minHeight: 'clamp(280px, 55vw, 100vh)',
                    background: '#ece9e3',
                    border: '1px solid rgba(26,28,25,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.4em',
                      color: 'rgba(26,28,25,0.25)',
                      textTransform: 'uppercase',
                    }}
                  >
                    PORTFOLIO COMING SOON
                  </span>
                </div>

                {/* 콘텐츠 하프 */}
                <m.div
                  className="w-full md:w-1/2 flex flex-col justify-center relative overflow-hidden"
                  style={{
                    padding: 'clamp(48px, 8vw, 96px) clamp(32px, 5vw, 80px)',
                    background: panelBg,
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ ...viewportConfig, margin: '-10%' }}
                  transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, delay: 0.05 }}
                >
                  {/* 배경 대형 숫자 */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: '-0.05em',
                      left: '-0.02em',
                      fontFamily: 'var(--font-newsreader)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(8rem, 20vw, 20rem)',
                      lineHeight: 0.9,
                      WebkitTextStroke: '1px rgba(26,28,25,0.05)',
                      color: 'transparent',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    {step.number}
                  </span>

                  {/* 텍스트 콘텐츠 */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p
                      className="font-mono text-[9px] tracking-[4px] mb-8"
                      style={{ color: 'rgba(26,28,25,0.25)' }}
                    >
                      {step.tag}&ensp;—&ensp;{step.titleEn.toUpperCase()}
                    </p>

                    <h3
                      style={{
                        fontFamily: 'var(--font-newsreader)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(36px, 4.5vw, 72px)',
                        fontWeight: 300,
                        letterSpacing: '-0.025em',
                        lineHeight: 1.05,
                        color: '#675e3f',
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="mt-6 text-[14px] max-w-xs"
                      style={{
                        color: 'rgba(26,28,25,0.38)',
                        lineHeight: 1.9,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </m.div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
