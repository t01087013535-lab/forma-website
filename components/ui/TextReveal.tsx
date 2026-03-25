'use client'
import { m, useReducedMotion } from 'framer-motion'
import { textRevealVariant, reducedTextReveal, viewportConfig } from '@/lib/animations'

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const prefersReduced = useReducedMotion()
  const baseVariant = prefersReduced ? reducedTextReveal : textRevealVariant

  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <m.span
        className={className}
        style={{ display: 'block' }}
        variants={{
          ...baseVariant,
          visible: {
            ...baseVariant.visible,
            transition: {
              ...(baseVariant.visible as { transition: object }).transition,
              delay,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {children}
      </m.span>
    </span>
  )
}
