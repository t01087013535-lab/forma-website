'use client'
import { useRef, useState } from 'react'
import { m } from 'framer-motion'

export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ rotateX: -y * 8, rotateY: x * 8 })
  }

  function handleMouseLeave() { setTilt({ rotateX: 0, rotateY: 0 }) }

  return (
    <m.div
      ref={ref}
      className={className}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </m.div>
  )
}
