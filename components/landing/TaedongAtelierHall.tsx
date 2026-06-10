'use client'

import { m, useReducedMotion } from 'framer-motion'

import type { CapabilityPanel, ExhibitionRoom } from '@/lib/taedong-exhibition'

export function TaedongAtelierHall({
  room,
  capabilities,
}: {
  room: ExhibitionRoom
  capabilities: CapabilityPanel[]
}) {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id={room.id}
      className="relative overflow-clip bg-[#0d1116] text-[#f5f0e8] lg:min-h-[175svh]"
      aria-labelledby="atelier-title"
    >
      <div className="flex min-h-svh items-center lg:sticky lg:top-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(196,144,78,0.16),_transparent_32%),linear-gradient(180deg,_#11171d_0%,_#0d1116_100%)]" />
        <div className="absolute inset-0 taedong-noise opacity-30" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d3a865]/20 bg-[radial-gradient(circle,_rgba(211,168,101,0.22),_transparent_62%)] blur-[10px]"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
          <m.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#8fa3b8]">
              {room.eyebrow}
            </p>
            <h2
              id="atelier-title"
              className="mt-5 max-w-xl text-[clamp(2.4rem,5.3vw,5rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
            >
              {room.title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#c4ccd3] md:text-lg">
              {room.description}
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {room.artifacts.map((artifact) => (
                <li
                  key={artifact}
                  className="rounded-full border border-white/10 bg-white/6 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#e5c993]"
                >
                  {artifact}
                </li>
              ))}
            </ul>
          </m.div>

          <div className="grid gap-4 md:grid-cols-2">
            {capabilities.map((capability, index) => (
              <m.article
                key={capability.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm md:p-7"
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { delay: index * 0.08, duration: 0.72, ease: [0.16, 1, 0.3, 1] }
                }
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#d3a865]">
                  {capability.material}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#f5f0e8]">
                  {capability.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#c4ccd3] md:text-base">
                  {capability.body}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-[#8fa3b8]">
                  {capability.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#d3a865]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </m.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
