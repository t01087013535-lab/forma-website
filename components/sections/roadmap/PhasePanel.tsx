'use client'
import { MilestoneCard } from '@/components/sections/roadmap/MilestoneCard'
import type { RoadmapPhase } from '@/lib/data/roadmap'

interface PhasePanelProps {
  phase: RoadmapPhase
  expandedId: string | null
  onToggle: (id: string) => void
}

export function PhasePanel({ phase, expandedId, onToggle }: PhasePanelProps) {
  return (
    <div>
      <p
        className="font-mono text-[10px] tracking-[5px]"
        style={{ color: 'rgba(103,94,63,0.75)' }}
      >
        YEAR {phase.year} — {phase.calendarYears} · {phase.themeEn.toUpperCase()}
      </p>

      <h3
        className="mt-4"
        style={{
          fontFamily: 'var(--font-newsreader)',
          fontWeight: 300,
          fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: '#1a1c19',
        }}
      >
        {phase.theme}
      </h3>

      <p
        className="mt-6 max-w-[60ch] text-[15px] md:text-[16px] leading-[1.7]"
        style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.78)' }}
      >
        {phase.objective}
      </p>

      <div className="mt-10">
        {phase.milestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            isOpen={expandedId === milestone.id}
            onToggle={onToggle}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
        {phase.kpis.map((kpi) => (
          <div key={kpi.id}>
            <p
              className="font-mono text-[9px] tracking-[3px]"
              style={{ color: 'rgba(26,28,25,0.4)' }}
            >
              {kpi.label.toUpperCase()}
            </p>
            <p
              className="mt-1 text-[22px]"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontWeight: 300,
                color: '#1a1c19',
              }}
            >
              {kpi.target}
              <span className="text-[14px] ml-1" style={{ color: 'rgba(26,28,25,0.55)' }}>
                {kpi.suffix}
              </span>
            </p>
          </div>
        ))}
      </div>

      <p
        className="mt-10 pt-6 text-[13px] leading-[1.6]"
        style={{
          fontFamily: 'var(--font-korean-serif)',
          fontStyle: 'italic',
          color: 'rgba(26,28,25,0.6)',
          borderTop: '1px solid rgba(26,28,25,0.12)',
        }}
      >
        다음 단계 진입 조건 — {phase.exitCriteria}
      </p>
    </div>
  )
}
