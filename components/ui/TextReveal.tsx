'use client'
import { m } from 'framer-motion'
import { textRevealVariant, viewportConfig } from '@/lib/animations'

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <m.span
        className={className}
        style={{ display: 'block' }}
        variants={{
          ...textRevealVariant,
          visible: {
            ...textRevealVariant.visible,
            transition: {
              ...(textRevealVariant.visible as { transition: object }).transition,
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
