'use client'

import { m, useReducedMotion } from 'framer-motion'

import type { ExhibitionRoom } from '@/lib/taedong-exhibition'

const contactEmail = 'hello@taedong.ai.kr'

export function TaedongFinaleHall({ room }: { room: ExhibitionRoom }) {
  const prefersReduced = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <section
      id={room.id}
      className="relative overflow-clip bg-[#05080d] text-[#f8f4ed]"
      aria-labelledby="finale-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(210,171,95,0.20),_transparent_30%),linear-gradient(180deg,_#0a1118_0%,_#05080d_100%)]" />
      <div className="absolute inset-0 taedong-noise opacity-35" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-between px-5 py-24 md:px-10 lg:px-16">
        <m.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.84, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#d4ac68]">
            {room.eyebrow}
          </p>
          <h2
            id="finale-title"
            className="mt-6 max-w-5xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
          >
            태동은 브랜드를 설명하지 않는다.
            <br />
            기억되는 장면으로 남긴다.
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#c7d1d8] md:text-lg">
            {room.description}
          </p>
        </m.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#8ea3b7]">
              Final resonance
            </p>
            <ul className="mt-6 space-y-4 text-base leading-7 text-[#f2ede3]">
              {room.artifacts.map((artifact) => (
                <li key={artifact} className="flex items-center gap-4">
                  <span className="inline-block h-px w-10 bg-[#d4ac68]" />
                  {artifact}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <a
              href={`mailto:${contactEmail}`}
              className="rounded-full border border-[#d4ac68]/40 bg-[#d4ac68]/12 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.34em] text-[#f3dfba] transition-colors hover:bg-[#d4ac68]/22"
            >
              {room.hasPrimaryCta ? 'Start a brand conversation' : 'Brand conversation'}
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#8ea3b7]"
            >
              {contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-[#6f8294] md:flex-row md:items-center md:justify-between">
          <span>© {year} Taedong. Living museum landing.</span>
          <span>Seoul, Korea · Scroll-built narrative system</span>
        </div>
      </div>
    </section>
  )
}
