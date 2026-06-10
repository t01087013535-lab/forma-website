'use client'
import { m, useReducedMotion } from 'framer-motion'

import { fadeUp, reducedFadeUp, stagger, viewportConfig } from '@/lib/animations'
import { strategyPaths } from '@/lib/data/roadmap-analysis'

export function StrategySection() {
  const prefersReduced = useReducedMotion()
  const variant = prefersReduced ? reducedFadeUp : fadeUp

  return (
    <section
      aria-labelledby="strategy-heading"
      className="px-6 md:px-16 py-24 md:py-32 section-divider"
    >
      <div className="max-w-[1400px] mx-auto">
        <p
          className="font-mono text-[10px] tracking-[5px] mb-6"
          style={{ color: 'rgba(103,94,63,0.75)' }}
        >
          02 — STRATEGY
        </p>

        <h2
          id="strategy-heading"
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#1a1c19',
          }}
        >
          전략 논리
        </h2>

        <p
          className="mt-8 max-w-[60ch] text-[16px] md:text-[17px] leading-[1.75]"
          style={{ fontFamily: 'var(--font-korean-serif)', color: 'rgba(26,28,25,0.8)' }}
        >
          젠슨 황과의 미팅은 콜드 아웃리치로 성사되지 않는다. 이 로드맵의
          전제는 하나다 — <em style={{ fontStyle: 'normal', color: '#675e3f' }}>
          NVIDIA 생태계 내부에서 주목할 만한 사례가 되는 것</em>. 미팅은 그
          누적의 부산물이다. 네 개의 경로를 병행한다.
        </p>

        <m.ol
          className="mt-16 space-y-0"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {strategyPaths.map((path) => (
            <m.li
              key={path.id}
              variants={variant}
              className="grid md:grid-cols-12 gap-4 md:gap-10 py-10 section-divider"
            >
              <div className="md:col-span-1">
                <span
                  className="font-mono text-[11px] tracking-[3px]"
                  style={{ color: 'rgba(26,28,25,0.35)' }}
                >
                  {path.index}
                </span>
              </div>

              <div className="md:col-span-4">
                <h3
                  className="text-[20px] md:text-[22px]"
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    color: '#1a1c19',
                  }}
                >
                  {path.title}
                </h3>
                <p
                  className="mt-3 inline-block font-mono text-[10px] tracking-[3px] px-3 py-1"
                  style={{
                    color: '#675e3f',
                    border: '1px solid rgba(103,94,63,0.35)',
                  }}
                >
                  실현 가능성 · {path.feasibility}
                </p>
              </div>

              <div className="md:col-span-7">
                <p
                  className="text-[15px] leading-[1.7]"
                  style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.78)' }}
                >
                  {path.body}
                </p>
                <p
                  className="mt-4 text-[13px] leading-[1.6] italic"
                  style={{
                    fontFamily: 'var(--font-korean-serif)',
                    color: 'rgba(26,28,25,0.55)',
                  }}
                >
                  근거 — {path.evidence}
                </p>
              </div>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  )
}
