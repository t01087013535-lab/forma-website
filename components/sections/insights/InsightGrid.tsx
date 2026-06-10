'use client'
import { useMemo, useState } from 'react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { CategoryFilter } from './CategoryFilter'
import { InsightCard } from './InsightCard'
import { insightArticles, type InsightCategory } from '@/lib/data/insights'

const PAGE_SIZE = 6

export function InsightGrid() {
  const [category, setCategory] = useState<InsightCategory>('all')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    if (category === 'all') return insightArticles
    return insightArticles.filter((a) => a.category === category)
  }, [category])

  const shown = filtered.slice(0, visible)
  const hasMore = visible < filtered.length

  function onCategoryChange(next: InsightCategory) {
    setCategory(next)
    setVisible(PAGE_SIZE)
  }

  return (
    <section aria-label="Insights articles" className="pb-32">
      <CategoryFilter value={category} onChange={onCategoryChange} />

      <div className="px-6 md:px-16 max-w-[1400px] mx-auto mt-16">
        <ul
          className="grid gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3"
          aria-live="polite"
          aria-busy="false"
        >
          {shown.map((article, i) => (
            <li key={article.slug}>
              <InsightCard article={article} index={i} />
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p
            className="mt-16 text-center text-[14px]"
            style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.55)' }}
          >
            이 카테고리에는 아직 글이 없습니다.
          </p>
        )}

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <MagneticButton
              className="inline-flex items-center gap-3 px-7 py-3.5"
              style={{
                border: '1px solid rgba(26,28,25,0.3)',
                color: '#1a1c19',
                background: 'transparent',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '4px',
                textTransform: 'uppercase',
              }}
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
            >
              Load more
              <span aria-hidden="true">↓</span>
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  )
}
