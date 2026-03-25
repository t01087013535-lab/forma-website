'use client'
import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export function CustomCursor() {
  const prefersReduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    if (prefersReduced) return

    function onMove(e: MouseEvent) { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    function onEnter() { setHovered(true) }
    function onLeave() { setHovered(false) }

    const interactables = document.querySelectorAll('a, button, [role="button"]')

    window.addEventListener('mousemove', onMove)
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [mouseX, mouseY, prefersReduced])

  if (prefersReduced) return null

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width:  hovered ? 48 : 16,
        height: hovered ? 48 : 16,
        background: hovered ? 'rgba(255,255,255,0.9)' : '#0d0d0d',
        borderRadius: '50%',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  )
}
