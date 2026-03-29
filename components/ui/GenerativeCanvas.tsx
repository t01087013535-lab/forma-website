'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  speed: number
  offset: number
}

interface GenerativeCanvasProps {
  className?: string
  /** 'dark' = white particles on dark bg (hero dark)
   *  'light' = subtle dark particles on light bg (hero light) */
  variant?: 'dark' | 'light'
}

/**
 * 3D Generative Motion Canvas
 * Flow-field particles + bezier ribbons + mouse repulsion
 * No external dependencies — pure Canvas 2D + requestAnimationFrame
 */
export function GenerativeCanvas({ className, variant = 'dark' }: GenerativeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cvs = canvas as HTMLCanvasElement
    const c   = ctx   as CanvasRenderingContext2D
    const isLight = variant === 'light'

    let animId: number
    let particles: Particle[] = []
    let time = 0

    /* ── resize ─────────────────────────────────── */
    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w   = cvs.offsetWidth
      const h   = cvs.offsetHeight
      cvs.width  = w * dpr
      cvs.height = h * dpr
      c.scale(dpr, dpr)
      initParticles(w, h)
    }

    function initParticles(w: number, h: number) {
      particles = Array.from({ length: 55 }, () => ({
        x:       Math.random() * w,
        y:       Math.random() * h,
        vx:      (Math.random() - 0.5) * 0.4,
        vy:      (Math.random() - 0.5) * 0.4,
        size:    Math.random() * 3.5 + 2.5,
        opacity: Math.random() * 0.45 + 0.04,
        speed:   Math.random() * 0.35 + 0.10,
        offset:  Math.random() * Math.PI * 2,
      }))
    }

    /* ── breathing layer (slow gold pulse) ───── */
    function drawBreathingLayer() {
      const w = cvs.offsetWidth
      const h = cvs.offsetHeight
      const circles = [
        { cx: w * 0.25, cy: h * 0.35, r: 200, speed: 0.18, phase: 0 },
        { cx: w * 0.72, cy: h * 0.65, r: 280, speed: 0.12, phase: 2.1 },
        { cx: w * 0.55, cy: h * 0.20, r: 160, speed: 0.22, phase: 4.3 },
      ]
      for (const bc of circles) {
        const opacity = Math.max(0, 0.05 * (0.5 + 0.5 * Math.sin(time * bc.speed + bc.phase)))
        const grad = c.createRadialGradient(bc.cx, bc.cy, 0, bc.cx, bc.cy, bc.r)
        grad.addColorStop(0, `rgba(103,94,63,${opacity})`)
        grad.addColorStop(1, 'rgba(103,94,63,0)')
        c.fillStyle = grad
        c.beginPath()
        c.arc(bc.cx, bc.cy, bc.r, 0, Math.PI * 2)
        c.fill()
      }
    }

    /* ── flow field angle ─────────────────────── */
    function flowAngle(x: number, y: number, t: number): number {
      const s = 0.0028
      return (
        Math.sin(x * s + t * 0.22) * Math.cos(y * s * 1.4 + t * 0.17) * Math.PI * 2 +
        Math.sin(x * s * 0.55 + y * s * 0.85 + t * 0.09) * Math.PI * 0.6 +
        Math.cos(x * s * 0.3  + t * 0.13) * Math.sin(y * s * 0.7 + t * 0.11) * Math.PI * 0.4
      )
    }

    /* ── main draw loop ───────────────────────── */
    function draw() {
      const w = cvs.offsetWidth
      const h = cvs.offsetHeight
      time += 0.0025

      /* trail fade */
      if (isLight) {
        c.fillStyle = 'rgba(250, 250, 245, 0.06)'
      } else {
        c.fillStyle = 'rgba(0, 0, 0, 0.022)'
      }
      c.fillRect(0, 0, w, h)

      /* breathing gold layer */
      if (!isLight) drawBreathingLayer()

      /* ─ flowing ribbon layers ─ */
      for (let i = 0; i < 6; i++) {
        c.beginPath()
        const sy = h * (0.08 + i * 0.165)
        c.moveTo(-80, sy)

        const cp1x = w * 0.18 + Math.sin(time * 0.32 + i * 1.25) * w * 0.20
        const cp1y = sy      + Math.cos(time * 0.25 + i * 0.85) * h * 0.14
        const cp2x = w * 0.57 + Math.cos(time * 0.20 + i * 0.68) * w * 0.14
        const cp2y = sy      + Math.sin(time * 0.28 + i * 1.60) * h * 0.20
        const ex   = w + 80
        const ey   = h * (0.12 + i * 0.16) + Math.cos(time * 0.17 + i * 2.0) * h * 0.24

        c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey)

        const alpha = isLight
          ? Math.max(0, 0.025 + Math.sin(time * 0.38 + i * 1.05) * 0.012)
          : Math.max(0, 0.007 + Math.sin(time * 0.38 + i * 1.05) * 0.004)

        c.strokeStyle = isLight
          ? `rgba(26, 28, 25, ${alpha})`
          : `rgba(250, 250, 245, ${alpha})`
        c.lineWidth   = 90 + Math.sin(time * 0.23 + i) * 35
        c.stroke()
      }

      /* ─ bronze accent ribbon ─ */
      c.beginPath()
      c.moveTo(-80, h * 0.42)
      c.bezierCurveTo(
        w * 0.28 + Math.sin(time * 0.18) * w * 0.12,  h * 0.28 + Math.cos(time * 0.14) * h * 0.16,
        w * 0.68 + Math.cos(time * 0.16) * w * 0.10,  h * 0.58 + Math.sin(time * 0.20) * h * 0.14,
        w + 80, h * 0.52 + Math.sin(time * 0.15) * h * 0.10
      )
      const ga = isLight
        ? Math.max(0, 0.06 + Math.sin(time * 0.28) * 0.025)
        : Math.max(0, 0.045 + Math.sin(time * 0.28) * 0.018)
      c.strokeStyle = `rgba(103, 94, 63, ${ga})`
      c.lineWidth   = 140
      c.stroke()

      /* ─ thin accent line ─ */
      c.beginPath()
      c.moveTo(-80, h * 0.65)
      c.bezierCurveTo(
        w * 0.3  + Math.sin(time * 0.22 + 2) * w * 0.15, h * 0.50 + Math.cos(time * 0.18) * h * 0.15,
        w * 0.72 + Math.cos(time * 0.19 + 1) * w * 0.10, h * 0.75 + Math.sin(time * 0.23) * h * 0.10,
        w + 80, h * 0.60
      )
      c.strokeStyle = isLight
        ? `rgba(26, 28, 25, ${0.06 + Math.sin(time * 0.5) * 0.02})`
        : `rgba(250, 250, 245, ${0.025 + Math.sin(time * 0.5) * 0.01})`
      c.lineWidth   = 1.5
      c.stroke()

      /* ─ particles ─ */
      const mouse = mouseRef.current
      for (const p of particles) {
        const angle = flowAngle(p.x, p.y, time)
        p.vx += Math.cos(angle) * p.speed * 0.055
        p.vy += Math.sin(angle) * p.speed * 0.055

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 16000) {
          const d = Math.sqrt(d2) || 1
          const f = (126 - d) / 126
          p.vx += (dx / d) * f * 1.4
          p.vy += (dy / d) * f * 1.4
        }

        p.vx *= 0.92
        p.vy *= 0.92
        p.x  += p.vx
        p.y  += p.vy

        if (p.x < -6) p.x = w + 6
        if (p.x > w + 6) p.x = -6
        if (p.y < -6) p.y = h + 6
        if (p.y > h + 6) p.y = -6

        const baseA = isLight ? p.opacity * 0.22 : p.opacity
        const a = baseA * (0.55 + Math.sin(time * 1.4 + p.offset) * 0.45)

        c.beginPath()
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        c.fillStyle = isLight
          ? `rgba(26, 28, 25, ${Math.max(0, a)})`
          : `rgba(250, 250, 245, ${Math.max(0, a)})`
        c.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    function onMouseMove(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onMouseLeave() { mouseRef.current = { x: -9999, y: -9999 } }

    const ro = new ResizeObserver(resize)
    ro.observe(cvs)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    cvs.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      cvs.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
