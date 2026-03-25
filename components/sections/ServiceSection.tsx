'use client'
// components/sections/ServiceSection.tsx
import { m, useReducedMotion } from 'framer-motion'
import { Pencil, Code2, Rocket } from 'lucide-react'
import { stagger, viewportConfig } from '@/lib/animations'

const services = [
  {
    icon: Pencil,
    title: '기획·디자인',
    desc: '사용자 경험 설계와 브랜드 정체성을 함께 만듭니다. 전략부터 UI까지 일관된 비전으로.',
  },
  {
    icon: Code2,
    title: '풀스택 개발',
    desc: 'Next.js · FastAPI · Supabase — 처음부터 끝까지 직접 구축합니다. 추가 비용 없이.',
  },
  {
    icon: Rocket,
    title: '배포·운영 컨설팅',
    desc: 'Vercel 배포, 성능 최적화, 지속적인 개선. 런칭 이후에도 함께합니다.',
  },
]

export function ServiceSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="service"
      className="py-32 bg-white text-black rounded-[48px] mx-4 mb-4"
      aria-label="서비스"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-16">

        <m.h2
          className="text-5xl font-light tracking-tight mb-20 text-center"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={prefersReduced ? { duration: 0.01 } : { duration: 0.6 }}
        >
          웹의 처음부터 끝까지,<br />
          하나의 팀이 책임집니다
        </m.h2>

        <m.ul
          className="grid gap-16 md:grid-cols-3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          role="list"
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <li key={title} role="listitem">
              <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: 'rgba(19,127,236,0.10)' }}
              >
                <Icon size={22} style={{ color: 'var(--color-blue)' }} aria-hidden="true" />
              </div>
              <h4 className="mb-3 text-[17px] font-bold text-black">{title}</h4>
              <p className="text-sm leading-[1.7] text-zinc-600">{desc}</p>
            </li>
          ))}
        </m.ul>

      </div>
    </section>
  )
}
