'use client'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'

import { categoryLabels, type Milestone } from '@/lib/data/roadmap'

interface MilestoneCardProps {
  milestone: Milestone
  isOpen: boolean
  onToggle: (id: string) => void
}

export function MilestoneCard({ milestone, isOpen, onToggle }: MilestoneCardProps) {
  const prefersReduced = useReducedMotion()
  const detailId = `${milestone.id}-detail`
  const isNvidia = milestone.category === 'nvidia'

  return (
    <div className="section-divider">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={detailId}
        onClick={() => onToggle(milestone.id)}
        className="w-full grid grid-cols-[1fr_auto] md:grid-cols-[140px_1fr_auto_auto] items-baseline gap-x-4 gap-y-1 py-5 text-left focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-4"
      >
        <span
          className="font-mono text-[10px] tracking-[2px] order-2 md:order-1 col-span-2 md:col-span-1"
          style={{ color: 'rgba(26,28,25,0.4)' }}
        >
          {milestone.quarter}
        </span>

        <span
          className="text-[16px] md:text-[17px] leading-[1.5] order-1 md:order-2"
          style={{ fontFamily: 'var(--font-korean)', color: '#1a1c19' }}
        >
          {milestone.title}
        </span>

        <span
          className="hidden md:inline-block font-mono text-[9px] tracking-[2px] px-2 py-[3px] order-3"
          style={{
            color: isNvidia ? '#675e3f' : 'rgba(26,28,25,0.5)',
            border: isNvidia
              ? '1px solid rgba(103,94,63,0.4)'
              : '1px solid rgba(26,28,25,0.18)',
          }}
        >
          {categoryLabels[milestone.category]}
        </span>

        <m.span
          aria-hidden="true"
          className="text-[18px] leading-none order-1 md:order-4 justify-self-end"
          style={{ color: 'rgba(26,28,25,0.5)' }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.25 }}
        >
          +
        </m.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            id={detailId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              prefersReduced ? { duration: 0.01 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-6 md:pl-[156px] max-w-[64ch]">
              <p
                className="text-[14px] leading-[1.7]"
                style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.72)' }}
              >
                {milestone.detail}
              </p>
              {milestone.nvidiaTouchpoint && (
                <p
                  className="mt-4 font-mono text-[10px] tracking-[2px] leading-[1.8]"
                  style={{ color: '#675e3f' }}
                >
                  NVIDIA TOUCHPOINT — {milestone.nvidiaTouchpoint}
                </p>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
