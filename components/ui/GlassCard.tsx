'use client'
import { m } from 'framer-motion'
import { scaleIn, viewportConfig } from '@/lib/animations'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

export function GlassCard({ children, className = '', animate = true }: GlassCardProps) {
  const style: React.CSSProperties = {
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.85)',
    boxShadow: '0 4px 30px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
    borderRadius: '16px',
  }
  if (!animate) return <div style={style} className={className}>{children}</div>
  return (
    <m.div
      style={style}
      className={className}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </m.div>
  )
}
