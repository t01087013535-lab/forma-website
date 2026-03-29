'use client'

interface TaedongLogoProps {
  /** 'light' = white on dark bg, 'dark' = ink on light bg */
  variant?: 'light' | 'dark'
  /** Show sub-label beneath name */
  showSubtext?: boolean
  /** Language for the wordmark */
  lang?: 'ko' | 'en'
  /** Base size (symbol height in px) */
  size?: number
  className?: string
}

// Neural Embryo symbol — 3 agent nodes (PM/Dev/QA) at 120° + central AI core + pulse rings
function NeuralEmbryoSymbol({ color, size }: { color: string; size: number }) {
  // Equilateral triangle inscribed in r=9 circle, apex pointing up
  const cx = 16, cy = 16, r = 9
  const n1 = { x: cx,                      y: cy - r }                          // top (PM)
  const n2 = { x: cx + r * Math.sin(2 * Math.PI / 3), y: cy + r * Math.cos(2 * Math.PI / 3) } // bottom-right (Dev)
  const n3 = { x: cx - r * Math.sin(2 * Math.PI / 3), y: cy + r * Math.cos(2 * Math.PI / 3) } // bottom-left (QA)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {/* Pulse rings */}
      <circle cx={cx} cy={cy} r="13" stroke={color} strokeWidth="0.5" opacity="0.12" />
      <circle cx={cx} cy={cy} r="9.5" stroke={color} strokeWidth="0.5" opacity="0.22" />

      {/* Inter-node edges */}
      <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke={color} strokeWidth="0.7" opacity="0.45" />
      <line x1={n2.x} y1={n2.y} x2={n3.x} y2={n3.y} stroke={color} strokeWidth="0.7" opacity="0.45" />
      <line x1={n3.x} y1={n3.y} x2={n1.x} y2={n1.y} stroke={color} strokeWidth="0.7" opacity="0.45" />

      {/* Spokes to core */}
      <line x1={n1.x} y1={n1.y} x2={cx} y2={cy} stroke={color} strokeWidth="0.7" opacity="0.55" />
      <line x1={n2.x} y1={n2.y} x2={cx} y2={cy} stroke={color} strokeWidth="0.7" opacity="0.55" />
      <line x1={n3.x} y1={n3.y} x2={cx} y2={cy} stroke={color} strokeWidth="0.7" opacity="0.55" />

      {/* Agent nodes */}
      <circle cx={n1.x} cy={n1.y} r="2.2" fill={color} />
      <circle cx={n2.x} cy={n2.y} r="2.2" fill={color} />
      <circle cx={n3.x} cy={n3.y} r="2.2" fill={color} />

      {/* Central AI core — filled + inner ring */}
      <circle cx={cx} cy={cy} r="3.2" fill={color} />
      <circle cx={cx} cy={cy} r="1.4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  )
}

export function TaedongLogo({
  variant = 'dark',
  showSubtext = false,
  lang = 'ko',
  size = 26,
  className,
}: TaedongLogoProps) {
  const color    = variant === 'light' ? '#f5f5f0' : '#1a1a1a'
  const wordmark = lang === 'ko' ? '태동' : 'TAEDONG'
  const subtext  = lang === 'ko' ? 'AI-NATIVE MULTI-AGENT' : 'THE QUICKENING'

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', userSelect: 'none' }}
    >
      <NeuralEmbryoSymbol color={color} size={size} />

      <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: lang === 'ko'
              ? "'Pretendard', 'Apple SD Gothic Neo', sans-serif"
              : "'Cormorant Garamond', Georgia, serif",
            fontSize:     lang === 'ko' ? `${size * 0.72}px` : `${size * 0.80}px`,
            fontWeight:   700,
            letterSpacing: lang === 'ko' ? '0.06em' : '0.28em',
            color,
            lineHeight:   1,
          }}
        >
          {wordmark}
        </span>

        {showSubtext && (
          <span
            style={{
              fontFamily:    "'SF Mono', 'Fira Code', monospace",
              fontSize:      '7px',
              letterSpacing: '0.18em',
              color,
              opacity:       0.38,
              marginTop:     '4px',
              whiteSpace:    'nowrap',
            }}
          >
            {subtext}
          </span>
        )}
      </span>
    </span>
  )
}
