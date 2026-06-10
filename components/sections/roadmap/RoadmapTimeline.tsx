'use client'
import { useRef, useState, type KeyboardEvent } from 'react'

import { AnimatePresence, m, useReducedMotion } from 'framer-motion'

import { PhasePanel } from '@/components/sections/roadmap/PhasePanel'
import { fadeUp, reducedFadeUp, viewportConfig } from '@/lib/animations'
import { useIsDesktop } from '@/lib/use-is-desktop'
import type { RoadmapPhase } from '@/lib/data/roadmap'

interface RoadmapTimelineProps {
  phases: RoadmapPhase[]
}

export function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const isDesktop = useIsDesktop()
  const prefersReduced = useReducedMotion()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function selectYear(index: number) {
    setActiveIndex(index)
    setExpandedId(null)
  }

  function toggleMilestone(id: string) {
    setExpandedId((current) => (current === id ? null : id))
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const keyToIndex: Record<string, number> = {
      ArrowLeft: (activeIndex - 1 + phases.length) % phases.length,
      ArrowRight: (activeIndex + 1) % phases.length,
      Home: 0,
      End: phases.length - 1,
    }
    const next = keyToIndex[event.key]
    if (next === undefined) return
    event.preventDefault()
    selectYear(next)
    tabRefs.current[next]?.focus()
  }

  const activePhase = phases[activeIndex]

  return (
    <section
      aria-labelledby="timeline-heading"
      className="px-6 md:px-16 py-24 md:py-32 section-divider"
    >
      <div className="max-w-[1400px] mx-auto">
        <p
          className="font-mono text-[10px] tracking-[5px] mb-6"
          style={{ color: 'rgba(103,94,63,0.75)' }}
        >
          03 — THE ROADMAP
        </p>

        <h2
          id="timeline-heading"
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#1a1c19',
          }}
        >
          5개년 로드맵
        </h2>

        {isDesktop ? (
          <div className="mt-16">
            <div
              role="tablist"
              aria-label="로드맵 연차 선택"
              className="relative grid grid-cols-5"
              style={{ borderBottom: '1px solid rgba(26,28,25,0.15)' }}
            >
              <m.div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                style={{ background: 'rgba(103,94,63,0.3)' }}
                animate={{ scaleX: (activeIndex + 1) / phases.length }}
                transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
              />
              {phases.map((phase, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={phase.id}
                    ref={(node) => {
                      tabRefs.current[i] = node
                    }}
                    type="button"
                    role="tab"
                    id={`${phase.id}-tab`}
                    aria-selected={isActive}
                    aria-controls={`${phase.id}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectYear(i)}
                    onKeyDown={handleTabKeyDown}
                    className="relative pb-5 text-left focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-4"
                  >
                    <span
                      className="font-mono text-[10px] tracking-[3px] block"
                      style={{ color: isActive ? '#675e3f' : 'rgba(26,28,25,0.35)' }}
                    >
                      YEAR {phase.year}
                    </span>
                    <span
                      className="mt-2 block text-[17px]"
                      style={{
                        fontFamily: 'var(--font-korean)',
                        color: isActive ? '#1a1c19' : 'rgba(26,28,25,0.45)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {phase.theme}
                    </span>
                    {isActive && (
                      <m.span
                        aria-hidden="true"
                        layoutId="year-indicator"
                        className="absolute bottom-[-1px] left-0 h-[2px] w-full"
                        style={{ background: '#1a1c19' }}
                        transition={prefersReduced ? { duration: 0.01 } : { duration: 0.35 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={activePhase.id}
                role="tabpanel"
                id={`${activePhase.id}-panel`}
                aria-labelledby={`${activePhase.id}-tab`}
                tabIndex={0}
                className="mt-14 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-8"
                initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
                transition={prefersReduced ? { duration: 0.01 } : { duration: 0.35 }}
              >
                <PhasePanel
                  phase={activePhase}
                  expandedId={expandedId}
                  onToggle={toggleMilestone}
                />
              </m.div>
            </AnimatePresence>
          </div>
        ) : (
          <div
            className="mt-14 flex flex-col gap-20 pl-7"
            style={{ borderLeft: '1px solid rgba(26,28,25,0.15)' }}
          >
            {phases.map((phase) => (
              <m.div
                key={phase.id}
                className="relative"
                variants={prefersReduced ? reducedFadeUp : fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-[2px] left-[-32px] block w-[9px] h-[9px] rounded-full"
                  style={{ background: '#675e3f' }}
                />
                <PhasePanel
                  phase={phase}
                  expandedId={expandedId}
                  onToggle={toggleMilestone}
                />
              </m.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
