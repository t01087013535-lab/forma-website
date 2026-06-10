'use client'
import { m, useReducedMotion } from 'framer-motion'
import { categoryLabels, type InsightArticle } from '@/lib/data/insights'

interface InsightCardProps {
  article: InsightArticle
  index: number
}

export function InsightCard({ article, index }: InsightCardProps) {
  const prefersReduced = useReducedMotion()
  const date = new Date(article.date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const titleFont =
    article.lang === 'ko' ? 'var(--font-korean-serif)' : 'var(--font-newsreader)'

  return (
    <m.article
      className="group section-divider pt-8 pb-6 flex flex-col justify-between min-h-[260px]"
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={prefersReduced ? { duration: 0.01 } : { duration: 0.55, delay: (index % 3) * 0.06 }}
    >
      <div>
        <p
          className="font-mono text-[10px] tracking-[4px] mb-5"
          lang={article.lang === 'ko' ? 'ko' : undefined}
          style={{ color: 'rgba(103,94,63,0.9)', textTransform: 'uppercase' }}
        >
          {categoryLabels[article.category]}
        </p>
        <h3
          lang={article.lang}
          style={{
            fontFamily: titleFont,
            fontWeight: article.lang === 'ko' ? 400 : 300,
            fontSize: 'clamp(1.25rem, 1.6vw, 1.6rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: '#1a1c19',
          }}
        >
          <a
            href={`/insights/${article.slug}`}
            className="focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-3"
          >
            {article.title}
          </a>
        </h3>
        <p
          className="mt-4 text-[14px] leading-[1.55] max-w-[40ch]"
          lang={article.lang === 'ko' ? 'ko' : undefined}
          style={{
            fontFamily: article.lang === 'ko' ? 'var(--font-korean)' : 'var(--font-sans)',
            color: 'rgba(26,28,25,0.65)',
          }}
        >
          {article.lede}
        </p>
      </div>

      <div
        className="mt-8 flex items-center justify-between text-[11px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(26,28,25,0.5)' }}
      >
        <span>{article.author}</span>
        <time dateTime={article.date}>{date}</time>
      </div>
    </m.article>
  )
}
