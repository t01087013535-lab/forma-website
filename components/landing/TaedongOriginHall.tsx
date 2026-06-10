'use client'

import { m, useReducedMotion } from 'framer-motion'

import type { ExhibitionPillar, ExhibitionRoom } from '@/lib/taedong-exhibition'

export function TaedongOriginHall({
  room,
  pillars,
}: {
  room: ExhibitionRoom
  pillars: ExhibitionPillar[]
}) {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id={room.id}
      className="relative overflow-clip bg-[#e8dcc8] text-[#13171a] lg:min-h-[170svh]"
      aria-labelledby="origin-title"
    >
      <div className="flex min-h-svh items-center lg:sticky lg:top-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.62),_transparent_44%),linear-gradient(180deg,_#e8dcc8_0%,_#d7c4aa_100%)]" />
        <div className="absolute inset-0 taedong-noise opacity-20" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-16">
          <m.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#6a6a68]">
              {room.eyebrow}
            </p>
            <h2
              id="origin-title"
              className="mt-5 max-w-xl text-[clamp(2.6rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
            >
              {room.title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#3e454b] md:text-lg">
              {room.description}
            </p>

            <div className="mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#7c664a]">
              <span className="inline-block h-px w-12 bg-[#7c664a]" />
              {room.accent}
            </div>
          </m.div>

          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <m.article
                key={pillar.title}
                className="rounded-[2rem] border border-[#231f1a]/10 bg-white/60 p-6 shadow-[0_24px_70px_rgba(55,40,16,0.08)] backdrop-blur-sm md:p-7"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { delay: index * 0.08, duration: 0.72, ease: [0.16, 1, 0.3, 1] }
                }
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#7d6d52]">
                  {pillar.metric}
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#11151a]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#40464c] md:text-base">
                  {pillar.body}
                </p>
              </m.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
