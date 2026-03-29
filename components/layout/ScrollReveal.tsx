'use client'
/**
 * ScrollReveal — 섹션 전환 시 "안으로 빨려들어가는" 3D 포털 효과
 *
 * 진입: 축소(0.90) + 원근 기울기(rotateX 4°) + 어둠(0.58) → 자연 상태
 * 이탈: 자연 상태 → 확대(1.06) + 역기울기(-2.5°) + 어둠(0.72)
 *
 * perspective 컨테이너가 Z-depth 환경을 제공하고,
 * inner m.div 가 scale · rotateX · brightness 변환을 받습니다.
 */

import { useRef } from 'react'
import {
  m,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  /**
   * 효과 강도
   * - subtle : 부드러운 전환, 본문 전용
   * - medium : 기본 (기업 사이트 스탠다드)
   * - strong : 극적인 포털 효과 (히어로 등)
   */
  intensity?: 'subtle' | 'medium' | 'strong'
  /** true 이면 wrapper 만 렌더하고 모든 변환 비활성화 */
  disabled?: boolean
}

const CONFIGS = {
  subtle:  { scaleIn: 0.94, scaleOut: 1.04, rotIn: 2,   rotOut: -1.5, brightIn: 0.72, brightOut: 0.80 },
  medium:  { scaleIn: 0.90, scaleOut: 1.06, rotIn: 4,   rotOut: -2.5, brightIn: 0.58, brightOut: 0.72 },
  strong:  { scaleIn: 0.85, scaleOut: 1.10, rotIn: 6,   rotOut: -3.5, brightIn: 0.42, brightOut: 0.62 },
} as const

export function ScrollReveal({
  children,
  intensity = 'medium',
  disabled  = false,
}: ScrollRevealProps) {
  const ref           = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const cfg           = CONFIGS[intensity]

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  /* ─── 변환값 (prefers-reduced-motion 시 정적) ─────────────── */
  const scale   = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    prefersReduced || disabled ? [1, 1, 1, 1] : [cfg.scaleIn, 1, 1, cfg.scaleOut],
  )
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    prefersReduced || disabled ? [0, 0, 0, 0] : [cfg.rotIn, 0, 0, cfg.rotOut],
  )
  const bright  = useTransform(
    scrollYProgress,
    [0, 0.14, 0.86, 1],
    prefersReduced || disabled ? [1, 1, 1, 1] : [cfg.brightIn, 1, 1, cfg.brightOut],
  )

  const filter = useMotionTemplate`brightness(${bright})`

  if (disabled) return <div ref={ref}>{children}</div>

  return (
    /* perspective 컨테이너 — overflow: clip 으로 레이아웃 깨짐 방지 */
    <div
      ref={ref}
      style={{
        perspective:       '1100px',
        perspectiveOrigin: '50% 40%',
        overflow:          'clip',
      }}
    >
      <m.div
        style={{
          scale,
          rotateX,
          filter:          prefersReduced ? 'none' : filter,
          transformOrigin: '50% 60%',
          willChange:      'transform',
        }}
      >
        {children}
      </m.div>
    </div>
  )
}
