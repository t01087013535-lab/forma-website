'use client'
import { useRef, useState } from 'react'
import { m } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    setPos({ x, y })
  }

  function handleMouseLeave() { setPos({ x: 0, y: 0 }) }

  const inner = (
    <m.div
      ref={ref}
      className={className}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </m.div>
  )

  if (href) return <a href={href}>{inner}</a>
  return inner
}
