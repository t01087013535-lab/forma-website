'use client'

import { useReducedMotion } from 'framer-motion'

interface VideoBackgroundProps {
  videoSrc?: string
  opacity?: number
}

export function VideoBackground({
  videoSrc = '/textures/forma-bg-white',
  opacity = 0.35,
}: VideoBackgroundProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) return null

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{
        position:     'fixed',
        inset:        0,
        width:        '100%',
        height:       '100%',
        objectFit:    'cover',
        opacity,
        mixBlendMode: 'multiply',
        zIndex:       -1,
        pointerEvents:'none',
      }}
    >
      <source src={`${videoSrc}.webm`} type="video/webm" />
      <source src={`${videoSrc}.mp4`}  type="video/mp4"  />
    </video>
  )
}
