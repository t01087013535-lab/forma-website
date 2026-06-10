'use client'
import { m, useReducedMotion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'
import type { WorkCase } from '@/lib/data/work'

export function WorkGallery({ gallery }: { gallery: WorkCase['gallery'] }) {
  const prefersReduced = useReducedMotion()

  return (
    <section aria-label="Gallery" className="px-6 md:px-16 pb-32">
      <div className="max-w-[1400px] mx-auto">
        <p
          className="font-mono text-[10px] tracking-[5px] mb-10"
          style={{ color: 'rgba(26,28,25,0.35)' }}
        >
          GALLERY — {gallery.length.toString().padStart(2, '0')} FRAMES
        </p>

        <ul className="grid md:grid-cols-2 gap-8 md:gap-10">
          {gallery.map((img, i) => (
            <m.li
              key={img.src}
              className={i % 3 === 0 ? 'md:col-span-2' : ''}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.8, delay: (i % 4) * 0.05 }}
            >
              <figure
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: img.ratio,
                  background: 'rgba(26,28,25,0.06)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover img-grayscale"
                />
              </figure>
              <figcaption
                className="mt-3 text-[12px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(26,28,25,0.5)',
                  letterSpacing: '2px',
                }}
              >
                {String(i + 1).padStart(2, '0')} — {img.alt}
              </figcaption>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
