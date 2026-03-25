import { ImageResponse } from 'next/og'

export const alt = 'FORMA by Taedong — 풀스택 웹 컨설팅'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0d0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 320,
            height: 320,
            borderRadius: 48,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(192,169,106,0.05))',
            border: '1px solid rgba(255,255,255,0.05)',
            transform: 'rotate(18deg)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(192,169,106,0.03))',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
          }}
        />

        {/* 메인 콘텐츠 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 8,
              color: '#c0a96a',
              marginBottom: 24,
              display: 'flex',
            }}
          >
            FULL-STACK WEB CONSULTING
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: -6,
              lineHeight: 0.9,
              display: 'flex',
            }}
          >
            FORMA
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#777777',
              marginTop: 24,
              letterSpacing: 4,
              display: 'flex',
            }}
          >
            by Taedong
          </div>
        </div>

        {/* 하단 태그라인 */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#c0a96a',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: '#595959',
              letterSpacing: 2,
              display: 'flex',
            }}
          >
            오류에서 설계로, 설계에서 완성으로
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
