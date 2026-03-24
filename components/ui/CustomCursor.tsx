'use client'
import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    function onMove(e: MouseEvent) { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    function onEnter() { setHovered(true) }
    function onLeave() { setHovered(false) }
    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => { window.removeEventListener('mousemove', onMove) }
  }, [mouseX, mouseY])

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
