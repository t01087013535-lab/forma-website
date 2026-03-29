'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      lerp:            0.10,
      smoothWheel:     true,
      wheelMultiplier: 0.85,  // 포털 효과가 강조되도록 스크롤 속도 살짝 낮춤
      touchMultiplier: 1.5,
    })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    const rafId = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])
  return <>{children}</>
}
