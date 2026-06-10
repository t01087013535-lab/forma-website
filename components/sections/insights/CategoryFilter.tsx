'use client'
import { categoryLabels, type InsightCategory } from '@/lib/data/insights'

interface CategoryFilterProps {
  value: InsightCategory
  onChange: (next: InsightCategory) => void
}

const order: InsightCategory[] = ['all', 'engineering', 'case-study', 'team-notes', 'agents']

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <nav
      aria-label="카테고리 필터"
      className="flex flex-wrap gap-x-8 gap-y-3 px-6 md:px-16 max-w-[1400px] mx-auto"
    >
      {order.map((cat) => {
        const isActive = cat === value
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-current={isActive ? 'page' : undefined}
            className="py-2 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-4"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: isActive ? '#1a1c19' : 'rgba(26,28,25,0.45)',
              borderBottom: isActive ? '1px solid #1a1c19' : '1px solid transparent',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
          >
            {categoryLabels[cat]}
          </button>
        )
      })}
    </nav>
  )
}
