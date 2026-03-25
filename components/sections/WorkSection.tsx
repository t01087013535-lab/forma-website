'use client'
// components/sections/WorkSection.tsx
import { m, useReducedMotion } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import { portfolioItems } from '@/lib/portfolio-data'
import { viewportConfig } from '@/lib/animations'

export function WorkSection() {
  const prefersReduced = useReducedMotion()
  const projects = portfolioItems

  // 그리드 슬롯별 프로젝트 인덱스
  const main    = projects[0]
  const side    = projects[1]
  const bottomL = projects[2]
  const bottomR = projects[3]

  const cardBase =
    'bg-zinc-900/40 border border-white/5 rounded-[32px] p-10 hover:border-white/20 transition-all overflow-hidden relative'

  return (
    <section
      id="work"
      className="py-[clamp(80px,12vw,160px)]"
      style={{ background: 'var(--color-dark-bg)' }}
      aria-label="포트폴리오"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">

        {/* 섹션 헤더 */}
        <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-8">
          <h2 className="text-4xl font-bold tracking-tighter text-[#ededed]">
            Selected Work
          </h2>
          <p className="text-zinc-500 font-mono text-sm">
            / {projects.length.toString().padStart(2, '0')} PROJECTS
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* 메인 카드 — col-span-8 */}
          {main && (
            <m.div
              className={`md:col-span-8 h-[500px] ${cardBase} group cursor-pointer`}
              whileHover={{ y: prefersReduced ? 0 : -10 }}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={viewportConfig}
            >
              {/* hover gradient overlay — Stitch blue */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px]"
                style={{ background: 'linear-gradient(135deg, var(--color-blue-dim), transparent)' }}
                aria-hidden="true"
              />

              <div className="relative h-full flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="inline-block border px-3 py-1 rounded-full text-[11px] font-mono tracking-widest mb-4"
                      style={{ borderColor: 'var(--color-blue-glow)', background: 'var(--color-blue-dim)', color: 'var(--color-blue)' }}
                    >
                      LIVE
                    </span>
                    <h3 className="text-2xl font-bold text-[#ededed] mb-2">{main.name}</h3>
                    {main.nameEn && (
                      <p className="text-zinc-500 text-sm font-mono">{main.nameEn}</p>
                    )}
                  </div>
                  {main.url && (
                    <a
                      href={main.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${main.name} 사이트 방문`}
                      className="p-2 rounded-full border border-white/10 hover:border-white/30 transition-colors"
                    >
                      <ExternalLink size={16} className="text-zinc-400" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2" aria-label="사용 기술">
                  {main.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 text-[10px] border border-white/10 font-mono text-zinc-400"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </m.div>
          )}

          {/* 사이드 카드 — col-span-4 */}
          {side && (
            <m.div
              className={`md:col-span-4 h-[500px] ${cardBase} flex flex-col justify-between`}
              whileHover={{ y: prefersReduced ? 0 : -10 }}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={viewportConfig}
            >
              <div className="flex items-center justify-center flex-1">
                <Lock size={32} className="text-white/10" aria-hidden="true" />
              </div>
              <div className="border-t border-white/5 pt-6">
                <p className="font-mono text-[10px] tracking-[3px] text-zinc-600 mb-1">
                  {side.index}
                </p>
                <p className="text-zinc-500 text-sm">Coming Soon</p>
              </div>
            </m.div>
          )}

          {/* 하단 좌측 — col-span-6 */}
          {bottomL && (
            <m.div
              className={`md:col-span-6 h-[400px] ${cardBase} flex flex-col justify-between`}
              whileHover={{ y: prefersReduced ? 0 : -10 }}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={viewportConfig}
            >
              <div className="flex items-center justify-center flex-1">
                <Lock size={28} className="text-white/10" aria-hidden="true" />
              </div>
              <div className="border-t border-white/5 pt-6">
                <p className="font-mono text-[10px] tracking-[3px] text-zinc-600 mb-1">
                  {bottomL.index}
                </p>
                <p className="text-zinc-500 text-sm">Coming Soon</p>
              </div>
            </m.div>
          )}

          {/* 하단 우측 — col-span-6 (기술 태그) */}
          {bottomR && (
            <m.div
              className={`md:col-span-6 h-[400px] ${cardBase} flex flex-col justify-between`}
              whileHover={{ y: prefersReduced ? 0 : -10 }}
              transition={prefersReduced ? { duration: 0.01 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={viewportConfig}
            >
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-wrap gap-2 justify-center max-w-[300px]" aria-label="보유 기술 스택">
                  {['NEXT.JS', 'TYPESCRIPT', 'REACT 19', 'TAILWIND V4', 'SUPABASE', 'FASTAPI', 'VERCEL'].map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-white/5 text-[10px] border border-white/10 font-mono text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/5 pt-6">
                <p className="font-mono text-[10px] tracking-[3px] text-zinc-600 mb-1">
                  {bottomR.index}
                </p>
                <p className="text-zinc-500 text-sm">Coming Soon</p>
              </div>
            </m.div>
          )}

        </div>
      </div>
    </section>
  )
}
