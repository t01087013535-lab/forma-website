'use client'
import { m, useReducedMotion } from 'framer-motion'
import { portfolioItems } from '@/lib/portfolio-data'

const PROJECT_LOCATIONS = [
  'Seoul, KR',
  'Digital',
  'Seoul, KR',
  'Digital',
]

// 벤토 그리드: col-8 16/9 | col-4 3/4 | col-4 square | col-8 16/9
const GRID_CONFIG = [
  { colClass: 'md:col-span-8', aspectClass: 'aspect-[16/9]' },
  { colClass: 'md:col-span-4', aspectClass: 'aspect-[3/4]'  },
  { colClass: 'md:col-span-4', aspectClass: 'aspect-square' },
  { colClass: 'md:col-span-8', aspectClass: 'aspect-[16/9]' },
]

export function WorkSection() {
  const prefersReduced = useReducedMotion()
  const items = portfolioItems.slice(0, 4)

  return (
    <section
      id="work"
      className="py-32 px-6 md:px-16"
      style={{ background: 'transparent' }}
      aria-label="포트폴리오"
    >
      <div className="max-w-[1600px] mx-auto">

        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-24">
          <m.h2
            style={{
              fontFamily: 'var(--font-newsreader)',
              fontStyle: 'italic',
              fontSize: 'clamp(64px, 11vw, 160px)',
              fontWeight: 300,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              color: '#1a1c19',
            }}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Selected<br />
            <em style={{ color: '#675e3f' }}>Creations.</em>
          </m.h2>

          <m.p
            className="text-[14px] max-w-[280px] md:text-right"
            style={{ color: 'rgba(26,28,25,0.32)', lineHeight: 1.85 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.15 }}
          >
            형태는 목적을 담습니다.<br />다섯 개의 구조물.
          </m.p>
        </div>

        {/* 벤토 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3">
          {items.map((project, i) => {
            const { colClass, aspectClass } = GRID_CONFIG[i]
            const location = PROJECT_LOCATIONS[i % PROJECT_LOCATIONS.length]

            return (
              <m.article
                key={project.index}
                className={`group cursor-pointer ${colClass}`}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* 이미지 컨테이너 */}
                <div
                  className={`relative overflow-hidden ${aspectClass}`}
                  style={{
                    background: '#ece9e3',
                    border: '1px solid rgba(26,28,25,0.08)',
                  }}
                >
                  {/* 이미지 placeholder */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
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

                  {/* 호버 오버레이 */}
                  <div
                    className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(to top, rgba(26,28,25,0.12) 0%, rgba(26,28,25,0.04) 55%, transparent 100%)' }}
                    aria-hidden="true"
                  />

                  {/* 호버 텍스트 — 이미지 안 하단 */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                  >
                    <p
                      className="font-mono text-[9px] tracking-[3px] mb-2"
                      style={{ color: 'rgba(26,28,25,0.45)' }}
                    >
                      {project.index} — {location}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-newsreader)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(18px, 2vw, 28px)',
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        color: '#1a1c19',
                      }}
                    >
                      {project.nameEn ?? project.name}
                    </h3>
                  </div>

                  {/* 인덱스 배지 — 평상시 */}
                  <div
                    className="absolute top-4 left-4 group-hover:opacity-0 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    <span
                      className="font-mono text-[9px] tracking-[3px]"
                      style={{ color: 'rgba(26,28,25,0.28)' }}
                    >
                      {project.index}
                    </span>
                  </div>

                  {/* LIVE 뱃지 */}
                  {project.isLive && project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} — 라이브 사이트 보기`}
                      className="absolute top-4 right-4 font-mono text-[8px] tracking-[2px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/40"
                      style={{
                        color: 'rgba(26,28,25,0.65)',
                        borderBottom: '1px solid rgba(26,28,25,0.25)',
                        paddingBottom: '1px',
                      }}
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </m.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
