// lib/animations.ts
// NOTE: prefersReducedMotion은 클라이언트에서만 평가됩니다.
// SSR에서는 false(기본값)로 fallback — 클라이언트에서 hydration 후 올바르게 동작.
const prefersReducedMotionValue =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const duration = prefersReducedMotionValue ? 0 : 0.6
const durationFast = prefersReducedMotionValue ? 0 : 0.35

export const fadeUp = {
  hidden:  { opacity: 0, y: prefersReducedMotionValue ? 0 : 32 },
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
  hidden:  { opacity: 0, scale: prefersReducedMotionValue ? 1 : 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
}

export const viewportConfig = { once: true, margin: '-80px' }
