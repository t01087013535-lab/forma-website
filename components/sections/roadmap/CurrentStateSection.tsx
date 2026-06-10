'use client'
import { useState } from 'react'

import { AnimatePresence, m, useReducedMotion } from 'framer-motion'

import { fadeUp, reducedFadeUp, stagger, viewportConfig } from '@/lib/animations'
import { businessUnits, type BusinessUnit } from '@/lib/data/roadmap-analysis'

type UnitView = 'strengths' | 'gaps'

export function CurrentStateSection() {
  const prefersReduced = useReducedMotion()
  const variant = prefersReduced ? reducedFadeUp : fadeUp

  return (
    <section
      aria-labelledby="current-state-heading"
      className="px-6 md:px-16 py-24 md:py-32 section-divider"
    >
      <div className="max-w-[1400px] mx-auto">
        <p
          className="font-mono text-[10px] tracking-[5px] mb-6"
          style={{ color: 'rgba(103,94,63,0.75)' }}
        >
          01 — CURRENT STATE
        </p>

        <h2
          id="current-state-heading"
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#1a1c19',
          }}
        >
          현 사업 분석
        </h2>

        <p
          className="mt-8 max-w-[56ch] text-[15px] md:text-[16px] leading-[1.7]"
          style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.78)' }}
        >
          태동그룹은 세 개의 축으로 움직인다. 현금흐름을 만드는 FORMA, NVIDIA
          생태계로 들어갈 기술 차량 NEXUS, 그리고 1인 운영의 한계를 푸는
          Automation Stack. 각 축의 강점과 보완점을 토글로 비교할 수 있다.
        </p>

        <m.div
          className="mt-16 grid md:grid-cols-3 gap-8"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {businessUnits.map((unit) => (
            <m.div key={unit.id} variants={variant}>
              <BusinessUnitCard unit={unit} prefersReduced={prefersReduced ?? false} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

interface BusinessUnitCardProps {
  unit: BusinessUnit
  prefersReduced: boolean
}

function BusinessUnitCard({ unit, prefersReduced }: BusinessUnitCardProps) {
  const [view, setView] = useState<UnitView>('strengths')
  const listId = `${unit.id}-list`
  const items = view === 'strengths' ? unit.strengths : unit.gaps

  return (
    <article
      aria-labelledby={`${unit.id}-name`}
      className="flex flex-col h-full p-8"
      style={{ background: '#f0ede7' }}
    >
      <p
        className="font-mono text-[10px] tracking-[3px]"
        style={{ color: 'rgba(26,28,25,0.35)' }}
      >
        {unit.index} · {unit.role.toUpperCase()}
      </p>

      <h3
        id={`${unit.id}-name`}
        className="mt-4 text-[24px] md:text-[26px]"
        style={{
          fontFamily: 'var(--font-newsreader)',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          color: '#1a1c19',
        }}
      >
        {unit.name}
      </h3>

      <p
        className="mt-4 text-[14px] leading-[1.65]"
        style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.7)' }}
      >
        {unit.summary}
      </p>

      <div className="mt-8 flex gap-6" role="group" aria-label={`${unit.name} 분석 보기 전환`}>
        <ViewToggle
          label="강점"
          isActive={view === 'strengths'}
          controls={listId}
          onClick={() => setView('strengths')}
        />
        <ViewToggle
          label="보완"
          isActive={view === 'gaps'}
          controls={listId}
          onClick={() => setView('gaps')}
        />
      </div>

      <div className="mt-5 flex-1" style={{ minHeight: 132 }}>
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={view}
            id={listId}
            className="space-y-2"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.25 }}
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 text-[14px] leading-[1.6]"
                style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.78)' }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-[14px] h-[1px] shrink-0 translate-y-[-4px]"
                  style={{
                    background: view === 'strengths' ? '#675e3f' : 'rgba(26,28,25,0.4)',
                  }}
                />
                {item}
              </li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>

      <p
        className="mt-8 pt-5 text-[12px] leading-[1.6]"
        style={{
          fontFamily: 'var(--font-korean)',
          color: '#675e3f',
          borderTop: '1px solid rgba(26,28,25,0.12)',
        }}
      >
        NVIDIA 연관성 — {unit.nvidiaRelevance}
      </p>
    </article>
  )
}

interface ViewToggleProps {
  label: string
  isActive: boolean
  controls: string
  onClick: () => void
}

function ViewToggle({ label, isActive, controls, onClick }: ViewToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-controls={controls}
      className="py-1 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-4"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '3px',
        color: isActive ? '#1a1c19' : 'rgba(26,28,25,0.45)',
        borderBottom: isActive ? '1px solid #1a1c19' : '1px solid transparent',
        transition: 'color 0.2s ease, border-color 0.2s ease',
      }}
    >
      {label}
    </button>
  )
}
