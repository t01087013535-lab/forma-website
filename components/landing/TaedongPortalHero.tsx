'use client'

import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import type { ExhibitionRoom } from '@/lib/taedong-exhibition'
import { useIsDesktop } from '@/lib/use-is-desktop'

export function TaedongPortalHero({ room }: { room: ExhibitionRoom }) {
  const prefersReduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const animate = isDesktop && !prefersReduced
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const leftDoorX = useTransform(scrollYProgress, [0, 0.52], ['0%', '-86%'])
  const rightDoorX = useTransform(scrollYProgress, [0, 0.52], ['0%', '86%'])
  const glowY = useTransform(scrollYProgress, [0, 1], ['-6%', '18%'])
  const statueScale = useTransform(scrollYProgress, [0, 0.45], [0.88, 1.12])
  const statueOpacity = useTransform(scrollYProgress, [0.05, 0.45, 0.75], [0.2, 0.85, 0.06])
  const copyY = useTransform(scrollYProgress, [0, 0.45], [0, -24])
  const copyOpacity = useTransform(scrollYProgress, [0.08, 0.26, 0.7], [0, 1, 0.16])

  return (
    <section
      id={room.id}
      ref={sectionRef}
      className="relative overflow-clip bg-[#07111a] lg:min-h-[220svh]"
      aria-labelledby="portal-title"
    >
      <div className="relative lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(81,137,187,0.22),_transparent_36%),linear-gradient(180deg,_#0a1620_0%,_#07111a_58%,_#04080d_100%)]" />
        <div className="absolute inset-0 taedong-noise opacity-40" aria-hidden="true" />

        <m.div
          aria-hidden="true"
          className="absolute left-1/2 top-[14%] h-[56vw] w-[56vw] max-h-[40rem] max-w-[40rem] -translate-x-1/2 rounded-full bg-[#3b7ab0]/24 blur-[120px]"
          style={{ y: animate ? glowY : 0 }}
        />

        <div className="absolute inset-y-0 left-[6vw] hidden w-px bg-white/10 lg:block" aria-hidden="true" />
        <div className="absolute inset-y-0 right-[6vw] hidden w-px bg-white/10 lg:block" aria-hidden="true" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/8" aria-hidden="true" />

        <m.div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 hidden w-1/2 bg-[linear-gradient(180deg,_rgba(12,26,36,0.95),_rgba(24,41,56,0.98))] shadow-[40px_0_120px_rgba(0,0,0,0.42)] lg:block"
          style={{ x: animate ? leftDoorX : 0 }}
        />
        <m.div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(180deg,_rgba(12,26,36,0.95),_rgba(24,41,56,0.98))] shadow-[-40px_0_120px_rgba(0,0,0,0.42)] lg:block"
          style={{ x: animate ? rightDoorX : 0 }}
        />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-[34vh] w-[92vw] max-w-6xl -translate-x-1/2 rounded-t-[50%] bg-[radial-gradient(circle_at_center,_rgba(242,225,198,0.10),_transparent_65%)]"
        />

        <m.div
          aria-hidden="true"
          className="absolute left-1/2 top-[24%] h-[36vh] w-[26vw] min-w-[12rem] max-w-[20rem] -translate-x-1/2 rounded-[45%] border border-[#f3d8aa]/12 bg-[linear-gradient(180deg,_rgba(215,195,159,0.16),_rgba(39,57,72,0.02))] blur-[0.2px]"
          style={{ scale: animate ? statueScale : 1, opacity: animate ? statueOpacity : 0.16 }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between gap-12 px-5 pb-12 pt-28 md:px-10 lg:gap-0 lg:px-16 lg:pb-8 lg:pt-32">
          <m.div
            className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
            style={{ y: animate ? copyY : 0, opacity: animate ? copyOpacity : 1 }}
          >
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#9cb0c2]">
                {room.eyebrow}
              </p>
              <h1
                id="portal-title"
                className="mt-5 text-[clamp(3.3rem,9vw,8.6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#f7f2e8]"
              >
                고대 회랑을 지나
                <br />
                태동의 첫 장면으로.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#c6d1da] md:text-lg">
                {room.description}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-md md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#d0b06f]">
                {room.artifactLabel}
              </p>
              <p className="mt-5 text-lg leading-8 text-[#edf2f7] md:text-xl">
                {room.lede}
              </p>
              <ul className="mt-8 grid gap-3 text-sm text-[#aac0d0] md:grid-cols-3">
                {room.artifacts.map((artifact) => (
                  <li
                    key={artifact}
                    className="rounded-full border border-white/10 bg-[#0d1c28]/80 px-4 py-3 text-center font-mono uppercase tracking-[0.22em]"
                  >
                    {artifact}
                  </li>
                ))}
              </ul>
            </div>
          </m.div>

          <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6">
            <div className="hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-[#8ba1b4] md:flex">
              <span className="inline-block h-px w-12 bg-[#6f8396]" />
              Scroll to enter the next chamber
            </div>
            <div className="ml-auto rounded-full border border-[#f1dcb2]/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#f1dcb2]">
              {prefersReduced ? 'Reduced motion active' : room.accent}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
