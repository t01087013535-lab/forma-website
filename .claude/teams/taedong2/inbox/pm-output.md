# PM 산출물 — FORMA Round 3 잔여 이슈

## 백엔드 태스크
없음.

## 프론트엔드 태스크 (P0 우선)

### T1: TextReveal.tsx — reducedTextReveal 실제 사용
- lib/animations.ts에 reducedTextReveal이 있으나 컴포넌트에서 미사용
- useReducedMotion() + 조건 분기로 교체

### T2: GlassCard.tsx — variants reducedScaleIn 분기
- scaleIn 고정 사용 → prefersReduced ? reducedScaleIn : scaleIn

### T3: FloatingNav.tsx — 마운트 애니메이션 reduced-motion
- useReducedMotion import 없음, initial/animate 즉시 표시 분기 필요

### T4: HeroSection.tsx — 마운트 animate 6개 + parallax
- 모든 initial/animate에 prefersReduced 분기
- geo1Y/geo2Y/geo3Y: style={{ y: prefersReduced ? 0 : geoXY }}

### T5: MagneticButton.tsx — div 분기 focus ring
- role="button" div에 focus-visible:ring-2 클래스 누락

### T6: globals.css — 신규 CSS variable
- --color-bg-alt: #ede9e3
- --color-ink-subtle: #777777
- --color-gold-subtle: rgba(192,169,106,0.08)

### T7: HeroSection.tsx — 색상 CSS variable 교체 (T6 이후)
- #666 → var(--color-ink-muted), #777 → var(--color-ink-subtle)
- rgba(0,0,0,0.07) → var(--color-border)
- rgba(192,169,106,0.08) → var(--color-gold-subtle)

### T8: StorySection.tsx — 배경색 variable
- #ede9e3 → var(--color-bg-alt)

### T9: CustomCursor.tsx — 색상 variable (framer 호환 확인)
- #0d0d0d → var(--color-ink) (미동작 시 하드코딩 유지)

## 병렬 실행
T1, T2, T3, T4, T5, T6, T9 → 동시 실행 가능
T7, T8 → T6 완료 후

## 완료 기준
- prefers-reduced-motion 시 모든 진입 애니메이션 즉시 표시
- npm run build 통과
- vercel --prod --scope min-hyeok-lees-projects 배포 성공
