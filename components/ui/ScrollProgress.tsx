'use client'
/**
 * ScrollProgress — 화면 상단 얇은 골드 진행 바
 * 스크롤 깊이에 따라 왼쪽 → 오른쪽으로 채워집니다.
 */

import { m, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export function ScrollProgress() {
  const prefersReduced       = useReducedMotion()
  const { scrollYProgress }  = useScroll()
  const scaleX               = useSpring(scrollYProgress, {
    stiffness: 200,
    damping:   40,
    restDelta: 0.0001,
  })

  if (prefersReduced) return null

  return (
    <m.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0%',
        position:        'fixed',
        top:             0,
        left:            0,
        right:           0,
        height:          '2px',
        background:      'rgba(205, 193, 155, 0.90)',
        zIndex:          60,
        pointerEvents:   'none',
      }}
    />
  )
}
