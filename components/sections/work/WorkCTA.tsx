'use client'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { WorkCase } from '@/lib/data/work'

export function WorkCTA({ prev, next }: { prev?: WorkCase; next?: WorkCase }) {
  function openContact() {
    window.dispatchEvent(new Event('open-contact-modal'))
  }

  return (
    <section aria-label="Next steps" className="px-6 md:px-16 pb-24 pt-16">
      <div
        className="max-w-[1400px] mx-auto section-divider pt-14 grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <p
            className="font-mono text-[10px] tracking-[5px] mb-5"
            style={{ color: 'rgba(26,28,25,0.35)' }}
          >
            START — YOUR PROJECT
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-korean-serif)',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              lineHeight: 1.2,
              color: '#1a1c19',
            }}
          >
            비슷한 프로젝트를<br />의뢰하고 싶다면.
          </h2>
          <p
            className="mt-5 text-[15px] leading-[1.7] max-w-[40ch]"
            style={{ fontFamily: 'var(--font-korean)', color: 'rgba(26,28,25,0.65)' }}
          >
            한 번의 통화로 범위·일정·파트너십 방식을 먼저 맞춰봅니다.
            준비된 브리프가 없어도 괜찮습니다.
          </p>
          <div className="mt-8">
            <MagneticButton
              className="inline-flex items-center gap-3 px-7 py-3.5"
              style={{
                background: '#1a1c19',
                color: '#f8f6f1',
                fontFamily: 'var(--font-korean)',
                fontSize: 14,
                letterSpacing: '0.06em',
              }}
              onClick={openContact}
            >
              상담 요청하기
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>
        </div>

        <nav aria-label="다른 프로젝트" className="flex flex-col gap-4 md:items-end">
          {prev && (
            <a
              href={`/work/${prev.slug}`}
              className="inline-flex items-baseline gap-3 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-3"
              style={{ fontFamily: 'var(--font-newsreader)', color: 'rgba(26,28,25,0.85)' }}
            >
              <span
                className="font-mono text-[10px] tracking-[4px]"
                style={{ color: 'rgba(26,28,25,0.45)' }}
              >
                ← PREV
              </span>
              <span className="text-[18px] italic">{prev.client}</span>
            </a>
          )}
          {next && (
            <a
              href={`/work/${next.slug}`}
              className="inline-flex items-baseline gap-3 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-3"
              style={{ fontFamily: 'var(--font-newsreader)', color: 'rgba(26,28,25,0.85)' }}
            >
              <span
                className="font-mono text-[10px] tracking-[4px]"
                style={{ color: 'rgba(26,28,25,0.45)' }}
              >
                NEXT →
              </span>
              <span className="text-[18px] italic">{next.client}</span>
            </a>
          )}
        </nav>
      </div>
    </section>
  )
}
