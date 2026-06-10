'use client'

import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'

interface LoadingOverlayProps {
  videoSrc?:    string
  minDuration?: number
  maxDuration?: number
}

export function LoadingOverlay({
  videoSrc    = '/textures/forma-loading',
  minDuration = 1800,
  maxDuration = 4000,
}: LoadingOverlayProps) {
  const [visible,     setVisible]     = useState(true)
  const [titleReady,  setTitleReady]  = useState(false)
  const [progress,    setProgress]    = useState(0)
  const prefersReduced = useReducedMotion()
  const dismissed      = useRef(false)
  const mountedAt      = useRef<number | null>(null)

  const dismiss = () => {
    if (dismissed.current) return
    dismissed.current = true
    setVisible(false)
  }

  /* ── 진행 바 애니메이션 & 하드 타임아웃 ── */
  useEffect(() => {
    const start    = Date.now()
    if (mountedAt.current === null) mountedAt.current = start
    const interval = setInterval(() => {
      setProgress(Math.min((Date.now() - start) / maxDuration, 1))
    }, 50)
    const timeout = setTimeout(dismiss, maxDuration)
    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [maxDuration])

  /* ── prefers-reduced-motion: 빠른 종료 ── */
  useEffect(() => {
    if (!prefersReduced) return
    const titleTimer = setTimeout(() => setTitleReady(true), 0)
    const dismissTimer = setTimeout(dismiss, 800)
    return () => { clearTimeout(titleTimer); clearTimeout(dismissTimer) }
  }, [prefersReduced])

  /* ── 영상 재생 준비 완료 핸들러 ── */
  const handleCanPlay = () => {
    const elapsed   = Date.now() - (mountedAt.current ?? Date.now())
    const remaining = Math.max(0, minDuration - elapsed)
    setTimeout(() => setTitleReady(true), 200)
    setTimeout(dismiss, remaining)
  }

  /* ── 영상 로드 실패 폴백 ── */
  const handleError = () => {
    setTimeout(() => setTitleReady(true), 200)
    setTimeout(dismiss, minDuration)
  }

  /* ── 애니메이션 값 ── */
  const titleAnim = prefersReduced
    ? { duration: 0.01 }
    : { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }

  const subtitleAnim = prefersReduced
    ? { duration: 0.01 }
    : { duration: 0.6, ease: 'easeOut', delay: 0.15 }

  const exitAnim = prefersReduced
    ? { opacity: 0, transition: { duration: 0.5 } }
    : {
        clipPath: 'inset(0 0 100% 0)',
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
      }

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={exitAnim}
          role="status"
          aria-live="polite"
          aria-label="FORMA 웹사이트 로딩 중"
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          1000,
            backgroundColor: '#000000',
            overflow:        'hidden',
          }}
        >
          {/* ── 텍스처 영상 ── */}
          {!prefersReduced && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlayThrough={handleCanPlay}
              onError={handleError}
              style={{
                position:   'absolute',
                inset:      0,
                width:      '100%',
                height:     '100%',
                objectFit:  'cover',
                opacity:    0.55,
                mixBlendMode: 'luminosity',
                zIndex:     1,
              }}
            >
              <source src={`${videoSrc}.webm`} type="video/webm" />
              <source src={`${videoSrc}.mp4`}  type="video/mp4"  />
            </video>
          )}

          {/* ── 폴백: 영상 없을 때 Gold 광원 ── */}
          {prefersReduced && (
            <div
              aria-hidden="true"
              style={{
                position:   'absolute',
                inset:      0,
                background: 'radial-gradient(ellipse at 50% 50%, rgba(103,94,63,0.12) 0%, transparent 70%)',
                zIndex:     1,
              }}
            />
          )}

          {/* ── 컬러 베일 (텍스트 대비) ── */}
          <div
            aria-hidden="true"
            style={{
              position:        'absolute',
              inset:           0,
              backgroundColor: '#000000',
              opacity:         0.45,
              zIndex:          2,
            }}
          />

          {/* ── 중앙 텍스트 ── */}
          <div
            style={{
              position:       'absolute',
              inset:          0,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              marginTop:      '-8vh',
              zIndex:         4,
            }}
          >
            {/* FORMA 타이틀 */}
            <m.h1
              initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
              animate={titleReady
                ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 }
                : {}
              }
              transition={titleAnim}
              style={{
                fontFamily:    'var(--font-serif)',
                fontStyle:     'italic',
                fontWeight:    300,
                fontSize:      'clamp(72px, 12vw, 160px)',
                letterSpacing: '0.25em',
                color:         '#f0f0eb',
                margin:        0,
                lineHeight:    1,
              }}
            >
              FORMA
            </m.h1>

            {/* 서브텍스트 */}
            <m.p
              initial={{ opacity: 0, y: 6 }}
              animate={titleReady ? { opacity: 0.85, y: 0 } : {}}
              transition={subtitleAnim}
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      'clamp(10px, 1.2vw, 13px)',
                letterSpacing: '0.35em',
                color:         '#675e3f',
                textTransform: 'uppercase',
                marginTop:     28,
                marginBottom:  0,
              }}
            >
              lat. forma — shape, figure, mould
            </m.p>
          </div>

          {/* ── 하단 진행 바 ── */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom:   48,
              left:     '50%',
              transform:'translateX(-50%)',
              width:    120,
              height:   1,
              overflow: 'hidden',
              zIndex:   4,
            }}
          >
            <m.div
              animate={{ scaleX: progress }}
              transition={{ duration: 0.05, ease: 'linear' }}
              style={{
                width:           '100%',
                height:          '100%',
                backgroundColor: '#675e3f',
                transformOrigin: 'left',
              }}
            />
          </m.div>

          <span className="sr-only">로딩 중입니다</span>
        </m.div>
      )}
    </AnimatePresence>
  )
}
