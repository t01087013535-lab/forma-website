'use client'
// components/sections/StorySection.tsx
import { m, useReducedMotion } from 'framer-motion'
import { Flame, ClipboardList, Settings, Wrench, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { stagger, fadeUp, viewportConfig, reducedFadeUp } from '@/lib/animations'

interface Step {
  icon: LucideIcon
  title: string
  desc: string
  isLast?: boolean
}

const steps: Step[] = [
  { icon: Flame,         title: '첫 프로젝트',  desc: '무수한 오류와\n마주침'           },
  { icon: ClipboardList, title: '오류 기록',    desc: '실패를 체계적으로\n정리'          },
  { icon: Settings,      title: '패턴 발견',    desc: '반복 문제 →\n해결 공식화'         },
  { icon: Wrench,        title: '스킬화',       desc: '해결책을\n재사용 도구로'          },
  { icon: Sparkles,      title: 'FORMA',        desc: '완전한 개발\n플랫폼 완성', isLast: true },
]

export function StorySection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="story"
      className="py-[clamp(80px,12vw,160px)]"
      style={{ background: '#0a0a0a' }}
      aria-label="우리의 서사"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <div className="mb-20">
          <p
            className="font-mono text-[11px] tracking-[4px] text-zinc-600 mb-4"
            style={{ fontFeatureSettings: "'ss01'" }}
          >
            STORY
          </p>
          <m.h2
            className="text-[clamp(36px,5.5vw,64px)] font-bold tracking-tight leading-[1.05] text-[#ededed]"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6 }}
          >
            모든 오류가<br />우리의 교과서였다
          </m.h2>
          <m.p
            className="mt-6 max-w-[480px] text-[16px] leading-[1.7] text-zinc-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6, delay: 0.3 }}
          >
            프로젝트마다 쌓아온 수백 번의 실패를 기록하고 체계화했습니다.
            그 과정이 쌓여 하나의 완성된 개발 플랫폼이 됐습니다.
          </m.p>
        </div>

        <m.ol
          className="flex flex-col gap-6 lg:flex-row lg:gap-0"
          variants={prefersReduced ? { hidden: {}, visible: {} } : stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {steps.map((step, i) => (
            <m.li
              key={step.title}
              className="relative flex flex-1 flex-col"
              variants={prefersReduced ? reducedFadeUp : fadeUp}
            >
              {i < steps.length - 1 && (
                <div
                  className="absolute top-[calc(1.5rem+20px)] left-[calc(50%+32px)] right-0 hidden h-px lg:block"
                  style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }}
                  aria-hidden="true"
                />
              )}
              <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 mx-0 md:mx-2 lg:mx-3 transition-shadow duration-200 hover:border-white/10">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: step.isLast ? 'rgba(192,169,106,0.15)' : 'rgba(255,255,255,0.05)' }}
                  aria-hidden="true"
                >
                  <step.icon
                    size={20}
                    style={{ color: step.isLast ? 'var(--color-gold)' : 'rgba(255,255,255,0.3)' }}
                  />
                </div>
                <p className="font-mono text-[9px] tracking-[3px] text-zinc-600 mb-1.5">
                  0{i + 1}
                </p>
                <h3
                  className="mb-2 text-[15px] font-bold"
                  style={{ color: step.isLast ? 'var(--color-gold)' : '#ededed' }}
                >
                  {step.title}
                </h3>
                <p className="whitespace-pre-line text-[13px] leading-[1.6] text-zinc-500">
                  {step.desc}
                </p>
              </div>
            </m.li>
          ))}
        </m.ol>
      </div>
    </section>
  )
}
