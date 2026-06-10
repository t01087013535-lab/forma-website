'use client'

import { useRef } from 'react'
import { MotionValue, m, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import type { CollectionWork, ExhibitionRoom } from '@/lib/taedong-exhibition'
import { useIsDesktop } from '@/lib/use-is-desktop'

function WorkCard({
  progress,
  index,
  work,
  animate,
}: {
  progress: MotionValue<number>
  index: number
  work: CollectionWork
  animate: boolean
}) {
  const direction = index % 2 === 0 ? 1 : -1
  const y = useTransform(progress, [0, 0.45 + index * 0.08], [80 + index * 24, 0])
  const x = useTransform(progress, [0, 0.45 + index * 0.08], [direction * 96, 0])
  const rotate = useTransform(progress, [0, 0.45 + index * 0.08], [direction * 5, 0])
  const scale = useTransform(progress, [0, 0.45 + index * 0.08], [0.92, 1])

  return (
    <m.article
      className="rounded-[2rem] border border-white/10 bg-[#111a24]/78 p-6 shadow-[0_32px_90px_rgba(0,0,0,0.36)] backdrop-blur-md md:p-8"
      style={animate ? { y, x, rotate, scale } : undefined}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#d4ac68]">
        {work.subtitle}
      </p>
      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#f8f4ed]">
        {work.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[#c7d2dc] md:text-base">
        {work.body}
      </p>
      <p className="mt-5 text-sm leading-7 text-[#90a5b7]">
        {work.outcome}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {work.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/10 bg-white/6 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#dfe8ef]"
          >
            {tag}
          </li>
        ))}
      </ul>
    </m.article>
  )
}

export function TaedongCollectionHall({
  room,
  works,
}: {
  room: ExhibitionRoom
  works: CollectionWork[]
}) {
  const prefersReduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const animate = isDesktop && !prefersReduced
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const headingY = useTransform(scrollYProgress, [0, 1], [48, -48])

  return (
    <section
      id={room.id}
      ref={sectionRef}
      className="relative overflow-clip bg-[#09111a] text-[#f6f1e8] lg:min-h-[190svh]"
      aria-labelledby="gallery-title"
    >
      <div className="flex min-h-svh items-center lg:sticky lg:top-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(77,113,150,0.18),_transparent_28%),radial-gradient(circle_at_85%_25%,_rgba(204,163,88,0.14),_transparent_25%),linear-gradient(180deg,_#0b1420_0%,_#081018_100%)]" />
        <div className="absolute inset-0 taedong-noise opacity-35" aria-hidden="true" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-16">
          <m.div style={{ y: animate ? headingY : 0 }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#8aa0b6]">
              {room.eyebrow}
            </p>
            <h2
              id="gallery-title"
              className="mt-5 max-w-lg text-[clamp(2.5rem,5.6vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
            >
              {room.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#c5d0d8] md:text-lg">
              {room.description}
            </p>
            <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#d4ac68]">
                Curatorial note
              </p>
              <p className="mt-4 text-sm leading-7 text-[#c5d0d8]">
                각 사례는 카드 목록이 아니라 벽면에서 앞으로 돌출되는 전시 패널처럼 배치된다.
                사용자는 “무엇을 했는가”보다 “어떤 인상을 남기는가”를 먼저 체감한다.
              </p>
            </div>
          </m.div>

          <div className="grid gap-4 self-center">
            {works.map((work, index) => (
              <WorkCard key={work.title} progress={scrollYProgress} index={index} work={work} animate={animate} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
