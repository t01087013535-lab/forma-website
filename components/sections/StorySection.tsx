'use client'
// components/sections/StorySection.tsx
import { m, useReducedMotion } from 'framer-motion'
import { Flame, ClipboardList, Settings, Wrench, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TextReveal } from '@/components/ui/TextReveal'
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
    <section id="story" className="py-[clamp(80px,12vw,160px)]" style={{ background: 'var(--color-bg-alt)' }} aria-label="우리의 서사">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">
        <div className="mb-20">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--color-ink-muted)', marginBottom: 16, fontFeatureSettings: "'ss01'" }}>
            STORY
          </p>
          <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            <TextReveal>모든 오류가</TextReveal>
            <TextReveal delay={0.1}>우리의 교과서였다</TextReveal>
          </h2>
          <m.p
            className="mt-6 max-w-[480px] text-[16px] leading-[1.7]"
            style={{ color: 'var(--color-ink-muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.3 }}
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
                  style={{ background: 'linear-gradient(90deg, var(--color-border), transparent)' }}
                  aria-hidden="true"
                />
              )}
              <div className="rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white/70 p-6 mx-0 md:mx-2 lg:mx-3 backdrop-blur-sm transition-shadow duration-200 hover:shadow-md">
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: 'var(--color-gold-dim)' }}
                  aria-hidden="true"
                >
                  <step.icon
                    size={20}
                    style={{ color: step.isLast ? 'var(--color-gold)' : 'var(--color-ink-muted)' }}
                  />
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 3, color: 'var(--color-ink-muted)', marginBottom: 6 }}>
                  0{i + 1}
                </p>
                <h3 className="mb-2 text-[15px] font-bold" style={{ color: step.isLast ? 'var(--color-gold)' : 'var(--color-ink)' }}>
                  {step.title}
                </h3>
                <p className="whitespace-pre-line text-[13px] leading-[1.6]" style={{ color: 'var(--color-ink-muted)' }}>
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
