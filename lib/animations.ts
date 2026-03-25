// lib/animations.ts
// prefersReducedMotion은 컴포넌트 내부에서 useReducedMotion()으로 평가합니다.
// 모듈 최상위 window 평가를 제거해 SSR hydration 불일치를 방지합니다.

const duration = 0.6
const durationFast = 0.35

export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger = (staggerChildren = 0.1) => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren: 0.1 } },
})

export const textRevealVariant = {
  hidden:  { y: '110%' },
  visible: { y: '0%', transition: { duration, ease: [0.22, 1, 0.36, 1] } },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
}

export const viewportConfig = { once: true, margin: '-80px' }

// prefers-reduced-motion 활성화 시 사용하는 zero-motion variants
export const reducedFadeUp = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export const reducedScaleIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export const reducedTextReveal = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

// durationFast는 향후 사용을 위해 export 유지
export { durationFast }
