'use client'
import { m, useReducedMotion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { viewportConfig } from '@/lib/animations'
import type { ServicePackage } from '@/lib/data/services'

interface ServicePackageListProps {
  items: ServicePackage[]
}

export function ServicePackageList({ items }: ServicePackageListProps) {
  const prefersReduced = useReducedMotion()

  function openContact() {
    window.dispatchEvent(new Event('open-contact-modal'))
  }

  return (
    <section aria-label="컨설팅 패키지" className="px-6 md:px-16 pb-32">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16">
        <aside className="md:col-span-3 md:sticky md:top-32 md:self-start">
          <p
            className="font-mono text-[10px] tracking-[5px]"
            style={{ color: 'rgba(26,28,25,0.4)' }}
          >
            THE OFFERINGS
          </p>
          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group inline-flex items-baseline gap-3 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-3"
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    color: 'rgba(26,28,25,0.85)',
                  }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[3px]"
                    style={{ color: 'rgba(26,28,25,0.35)' }}
                  >
                    {item.index}
                  </span>
                  <span className="text-[18px] md:text-[19px] group-hover:italic transition-[font-style] duration-200">
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="md:col-span-9 flex flex-col gap-40 md:gap-56">
          {items.map((item, i) => (
            <article
              key={item.id}
              id={item.id}
              aria-labelledby={`${item.id}-title`}
              className="scroll-mt-32 section-divider pt-16"
            >
              <m.p
                className="font-mono text-[10px] tracking-[5px] mb-6"
                style={{ color: 'rgba(103,94,63,0.75)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportConfig}
                transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5 }}
              >
                {item.index} — {item.kicker.toUpperCase()}
              </m.p>

              <div style={{ overflow: 'hidden' }}>
                <m.h2
                  id={`${item.id}-title`}
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontWeight: 300,
                    fontSize: 'clamp(2.25rem, 5vw, 4.25rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                    color: '#1a1c19',
                  }}
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '110%' }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={prefersReduced ? { duration: 0.01 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.title}
                </m.h2>
              </div>

              <p
                className="mt-3 italic text-[15px]"
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  color: 'rgba(26,28,25,0.55)',
                }}
              >
                {item.subtitle}
              </p>

              <p
                className="mt-8 max-w-[56ch] text-[15px] md:text-[16px] leading-[1.7]"
                style={{
                  fontFamily: 'var(--font-korean)',
                  color: 'rgba(26,28,25,0.78)',
                }}
              >
                {item.summary}
              </p>

              <div className="mt-12 grid md:grid-cols-3 gap-8 section-divider pt-10">
                <MetadataColumn label="Timeline" value={item.timeline} />
                <MetadataColumn label="Stack" value={item.stack.join(' · ')} />
                <MetadataColumn label="Investment" value={item.priceNote} muted />
              </div>

              <div className="mt-12">
                <p
                  className="font-mono text-[10px] tracking-[5px] mb-5"
                  style={{ color: 'rgba(26,28,25,0.4)' }}
                >
                  DELIVERABLES
                </p>
                <ul className="space-y-2">
                  {item.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-baseline gap-4 text-[15px] md:text-[16px] leading-[1.65]"
                      style={{
                        fontFamily: 'var(--font-korean)',
                        color: 'rgba(26,28,25,0.78)',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block w-[18px] h-[1px] translate-y-[-4px]"
                        style={{ background: 'rgba(26,28,25,0.4)' }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {i === items.length - 1 && (
                <div className="mt-16">
                  <MagneticButton
                    className="inline-flex items-center gap-3 px-8 py-4"
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
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function MetadataColumn({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <p
        className="font-mono text-[10px] tracking-[5px] mb-3"
        style={{ color: 'rgba(26,28,25,0.35)' }}
      >
        {label.toUpperCase()}
      </p>
      <p
        className="text-[15px] md:text-[16px] leading-[1.5]"
        style={{
          fontFamily: 'var(--font-newsreader)',
          color: muted ? 'rgba(26,28,25,0.55)' : 'rgba(26,28,25,0.88)',
          fontStyle: muted ? 'italic' : 'normal',
        }}
      >
        {value}
      </p>
    </div>
  )
}
