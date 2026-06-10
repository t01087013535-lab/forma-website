'use client'
import { useEffect, useRef } from 'react'

import { animate, m, useInView, useReducedMotion } from 'framer-motion'

import { viewportConfig } from '@/lib/animations'
import { probabilityModel, summaryKpis } from '@/lib/data/roadmap-analysis'
import type { PhaseKpi } from '@/lib/data/roadmap'

const COUNTER_DURATION = 1.4

export function KpiDashboard() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-labelledby="kpi-heading"
      className="px-6 md:px-16 py-24 md:py-32 section-divider"
    >
      <div className="max-w-[1400px] mx-auto">
        <p
          className="font-mono text-[10px] tracking-[5px] mb-6"
          style={{ color: 'rgba(103,94,63,0.75)' }}
        >
          04 — METRICS
        </p>

        <h2
          id="kpi-heading"
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#1a1c19',
          }}
        >
          지표 대시보드
        </h2>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {summaryKpis.map((kpi) => (
            <KpiCounter key={kpi.id} kpi={kpi} prefersReduced={prefersReduced ?? false} />
          ))}
        </div>

        <div className="mt-24">
          <p
            className="font-mono text-[10px] tracking-[5px] mb-10"
            style={{ color: 'rgba(26,28,25,0.4)' }}
          >
            PROBABILITY LADDER — 단계별 성사 확률
          </p>

          <ul className="space-y-9">
            {probabilityModel.map((stage) => (
              <li key={stage.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <p
                    className="text-[15px] md:text-[16px]"
                    style={{ fontFamily: 'var(--font-korean)', color: '#1a1c19' }}
                  >
                    {stage.stage}
                  </p>
                  <p
                    className="text-[18px] shrink-0"
                    style={{
                      fontFamily: 'var(--font-newsreader)',
                      fontWeight: 300,
                      color: '#675e3f',
                    }}
                  >
                    {stage.probability}%
                  </p>
                </div>
                <div
                  className="mt-3 h-[3px] w-full"
                  style={{ background: 'rgba(26,28,25,0.1)' }}
                >
                  <m.div
                    className="h-full origin-left"
                    style={{ background: '#675e3f' }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: stage.probability / 100 }}
                    viewport={viewportConfig}
                    transition={
                      prefersReduced
                        ? { duration: 0.01 }
                        : { duration: 1, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                </div>
                <p
                  className="mt-2 text-[12px] leading-[1.6]"
                  style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.55)' }}
                >
                  {stage.note}
                </p>
              </li>
            ))}
          </ul>

          <p
            className="mt-14 max-w-[56ch] text-[14px] leading-[1.7] italic"
            style={{
              fontFamily: 'var(--font-korean-serif)',
              color: 'rgba(26,28,25,0.6)',
            }}
          >
            이 수치는 약속이 아니라, 매년 갱신하는 추정치다. 각 단계의 확률은
            앞 단계의 누적 성과 위에서만 유효하다.
          </p>
        </div>
      </div>
    </section>
  )
}

interface KpiCounterProps {
  kpi: PhaseKpi
  prefersReduced: boolean
}

function KpiCounter({ kpi, prefersReduced }: KpiCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(numberRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const node = numberRef.current
    if (!isInView || !node) return
    if (prefersReduced) {
      node.textContent = String(kpi.target)
      return
    }
    const controls = animate(0, kpi.target, {
      duration: COUNTER_DURATION,
      ease: 'easeOut',
      onUpdate: (value) => {
        node.textContent = String(Math.round(value))
      },
    })
    return () => controls.stop()
  }, [isInView, kpi.target, prefersReduced])

  return (
    <div>
      <p
        className="text-[clamp(2.5rem,5vw,4rem)] leading-none"
        style={{ fontFamily: 'var(--font-newsreader)', fontWeight: 300, color: '#1a1c19' }}
      >
        {/* SSR/no-JS 폴백: 최종값을 초기 렌더 — 애니메이션 시작 시 덮어씀 */}
        <span ref={numberRef}>{kpi.target}</span>
        <span className="text-[0.4em] ml-1" style={{ color: 'rgba(26,28,25,0.55)' }}>
          {kpi.suffix}
        </span>
      </p>
      <p
        className="mt-3 text-[13px]"
        style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.7)' }}
      >
        {kpi.label}
      </p>
      {kpi.note && (
        <p
          className="mt-1 font-mono text-[10px] tracking-[2px]"
          style={{ color: 'rgba(26,28,25,0.4)' }}
        >
          {kpi.note}
        </p>
      )}
    </div>
  )
}
