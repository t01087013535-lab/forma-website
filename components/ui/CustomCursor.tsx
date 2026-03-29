'use client'
import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

type CursorState = 'default' | 'hover'

export function CustomCursor() {
  const prefersReduced        = useReducedMotion()
  const [state, setState]     = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  /* Outer ring — slow, elegant follower */
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 22 })
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 22 })

  /* Dot — snappy */
  const dotX = useSpring(mouseX, { stiffness: 700, damping: 40 })
  const dotY = useSpring(mouseY, { stiffness: 700, damping: 40 })

  useEffect(() => {
    if (prefersReduced) return

    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    function onLeave()  { setVisible(false) }
    function onEnter()  { setVisible(true) }
    function onInteractEnter() { setState('hover') }
    function onInteractLeave() { setState('default') }

    const els = document.querySelectorAll<HTMLElement>('a, button, [role="button"], input, textarea, select')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    els.forEach(el => {
      el.addEventListener('mouseenter', onInteractEnter)
      el.addEventListener('mouseleave', onInteractLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      els.forEach(el => {
        el.removeEventListener('mouseenter', onInteractEnter)
        el.removeEventListener('mouseleave', onInteractLeave)
      })
    }
  }, [mouseX, mouseY, prefersReduced])

  if (prefersReduced) return null

  const isHover = state === 'hover'

  return (
    <>
      {/* ── Outer ring (slow follower) ── */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(240,240,235,0.45)',
          borderRadius: '50%',
        }}
        animate={{
          width:       isHover ? 60 : 36,
          height:      isHover ? 60 : 36,
          opacity:     visible ? 1 : 0,
          borderColor: isHover
            ? 'rgba(240,240,235,0.90)'
            : 'rgba(240,240,235,0.40)',
          background:  isHover ? 'rgba(240,240,235,0.05)' : 'transparent',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Center dot (fast) ── */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          background: 'rgba(240,240,235,0.95)',
        }}
        animate={{
          width:   isHover ? 5 : 3,
          height:  isHover ? 5 : 3,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />
    </>
  )
}
