'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

const principles = [
  { num: 'I',   text: '형태는\n의도에서 온다' },
  { num: 'II',  text: '아름다움은\n정밀함의 부산물' },
  { num: 'III', text: '모든 픽셀은\n근거를 가진다' },
]

export function OriginSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="origin"
      aria-label="FORMA의 기원"
      style={{ background: 'transparent', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-32 w-full">

        {/* 상단 레이블 */}
        <m.p
          className="font-mono text-[9px] tracking-[5px] mb-16"
          style={{ color: 'rgba(26,28,25,0.18)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
        >
          THE NAME — FORMA
        </m.p>

        {/* 대형 라틴어 어원 */}
        <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
          <m.h2
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(4.5rem, 14vw, 16rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              color: '#1a1c19',
            }}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '110%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            forma
          </m.h2>
        </div>

        {/* 라틴어 정의 */}
        <m.p
          className="text-[13px] mb-20"
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontStyle: 'italic',
            color: 'var(--color-accent)',
            letterSpacing: '0.02em',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.2 }}
        >
          라틴어 — <em style={{ fontStyle: 'normal', color: 'rgba(103,94,63,0.7)' }}>형태, 모양, 아름다움</em>
        </m.p>

        {/* 2단 그리드: 어원 설명 + 브랜드 계보 */}
        <m.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.7, delay: 0.15 }}
        >
          {/* 좌: 어원과 철학 */}
          <div>
            <p
              className="text-[15px]"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontStyle: 'italic',
                color: 'rgba(26,28,25,0.42)',
                lineHeight: 2.0,
              }}
            >
              로마 건축가들이 설계도를 "forma"라 불렀습니다.<br />
              모든 위대한 구조물은<br />
              보이지 않는 형태에서 시작됩니다.<br />
              우리는 그 이름을 계승합니다.
            </p>
          </div>

          {/* 우: 브랜드 계보 */}
          <div className="flex items-center">
            <div
              style={{
                borderLeft: '1px solid rgba(103,94,63,0.22)',
                paddingLeft: '2rem',
              }}
            >
              <p
                className="font-mono text-[9px] tracking-[4px] mb-1"
                style={{ color: 'rgba(103,94,63,0.50)' }}
              >
                태동 2.0
              </p>
              <p
                className="text-[12px] mb-6"
                style={{ color: 'rgba(26,28,25,0.22)' }}
              >
                개발 팀 / Engineering
              </p>

              {/* 연결 선 */}
              <div
                style={{
                  width: '1px',
                  height: '2.5rem',
                  background: 'linear-gradient(to bottom, rgba(103,94,63,0.3), rgba(103,94,63,0.08))',
                  marginLeft: '-2rem',
                  marginBottom: '0',
                }}
                aria-hidden="true"
              />

              <div style={{ marginTop: '0', paddingLeft: '0' }}>
                <p
                  className="font-mono text-[9px] tracking-[4px] mb-1 mt-0"
                  style={{ color: 'var(--color-accent)' }}
                >
                  FORMA
                </p>
                <p
                  className="text-[12px]"
                  style={{ color: 'rgba(26,28,25,0.22)' }}
                >
                  클라이언트 스튜디오 / Studio
                </p>
              </div>
            </div>
          </div>
        </m.div>

        {/* 구분선 */}
        <div
          style={{ borderTop: '1px solid rgba(26,28,25,0.06)', marginBottom: '4rem' }}
          aria-hidden="true"
        />

        {/* 세 가지 원칙 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {principles.map((item, i) => (
            <m.div
              key={item.num}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.7, delay: i * 0.10, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-mono text-[8px] tracking-[4px] mb-4"
                style={{ color: 'rgba(103,94,63,0.35)' }}
              >
                {item.num}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  color: 'rgba(26,28,25,0.52)',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-line',
                }}
              >
                {item.text}
              </p>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  )
}
